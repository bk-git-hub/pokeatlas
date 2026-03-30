import {
  getEvolutionChainRaw,
  getPokemonListRaw,
  getPokemonRaw,
  getPokemonSpeciesRaw,
  getPokemonTypeRaw,
} from "@/lib/pokeapi/client";
import { isPokeApiNotFoundError } from "@/lib/pokeapi/client";
import type { NamedApiResource } from "@/lib/pokeapi/types";

import type {
  PokemonBrowseFilterOptions,
  PokemonDetail,
  PokemonLookup,
  PokemonSummary,
  PokemonSummaryPage,
} from "./models";
import { pokemonNormalizer } from "./normalize";

type ListPokemonSummariesOptions = {
  limit?: number;
  offset?: number;
} & PokemonBrowseFilterOptions;

type PokemonCatalogEntry = {
  id: number;
  slug: string;
};

let fullPokemonCatalogEntriesPromise: Promise<PokemonCatalogEntry[]> | null = null;
const typePokemonCatalogEntriesPromises = new Map<
  string,
  Promise<PokemonCatalogEntry[]>
>();

function normalizeBrowseQuery(query?: string) {
  return query?.trim().toLowerCase() ?? "";
}

function normalizeBrowseType(type?: string | null) {
  return type?.trim().toLowerCase() || null;
}

function buildOffsetWindow(
  totalCount: number,
  limit: number,
  offset: number,
) {
  const nextOffset = offset + limit < totalCount ? offset + limit : null;
  const previousOffset = offset > 0 ? Math.max(0, offset - limit) : null;

  return {
    nextOffset,
    previousOffset,
  };
}

function parsePokemonIdFromResourceUrl(url: string) {
  const match = url.match(/\/pokemon\/(\d+)\/?$/);

  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}

function toPokemonCatalogEntry(resource: NamedApiResource): PokemonCatalogEntry | null {
  const id = parsePokemonIdFromResourceUrl(resource.url);

  if (id === null) {
    return null;
  }

  return {
    id,
    slug: resource.name,
  };
}

function mapPokemonCatalogEntries(resources: NamedApiResource[]) {
  return resources.flatMap((resource) => {
    const entry = toPokemonCatalogEntry(resource);
    return entry ? [entry] : [];
  });
}

function comparePokemonCatalogEntries(
  left: PokemonCatalogEntry,
  right: PokemonCatalogEntry,
) {
  return left.id - right.id || left.slug.localeCompare(right.slug);
}

function normalizeDexQuery(query: string) {
  const normalizedQuery = query.replace(/^#/, "");

  if (!normalizedQuery || !/^\d+$/.test(normalizedQuery)) {
    return null;
  }

  return normalizedQuery;
}

function matchesBrowseQuery(entry: PokemonCatalogEntry, query: string) {
  if (!query) {
    return true;
  }

  if (entry.slug.includes(query)) {
    return true;
  }

  const dexQuery = normalizeDexQuery(query);

  if (!dexQuery) {
    return false;
  }

  return (
    String(entry.id).includes(dexQuery) ||
    String(entry.id).padStart(4, "0").includes(dexQuery)
  );
}

async function loadFullPokemonCatalogEntries() {
  const initialPage = await getPokemonListRaw(1, 0);

  if (initialPage.count <= initialPage.results.length) {
    return mapPokemonCatalogEntries(initialPage.results);
  }

  const fullCatalog = await getPokemonListRaw(initialPage.count, 0);
  return mapPokemonCatalogEntries(fullCatalog.results);
}

async function listPokemonSearchCatalogEntries() {
  if (!fullPokemonCatalogEntriesPromise) {
    fullPokemonCatalogEntriesPromise = loadFullPokemonCatalogEntries().catch((error) => {
      fullPokemonCatalogEntriesPromise = null;
      throw error;
    });
  }

  return fullPokemonCatalogEntriesPromise;
}

async function loadTypePokemonCatalogEntries(type: string) {
  const typeResponse = await getPokemonTypeRaw(type);

  return typeResponse.pokemon
    .flatMap(({ pokemon }) => {
      const entry = toPokemonCatalogEntry(pokemon);
      return entry ? [entry] : [];
    })
    .sort(comparePokemonCatalogEntries);
}

async function listTypePokemonCatalogEntries(type: string) {
  const cachedEntriesPromise = typePokemonCatalogEntriesPromises.get(type);

  if (cachedEntriesPromise) {
    return cachedEntriesPromise;
  }

  const entriesPromise = loadTypePokemonCatalogEntries(type).catch((error) => {
    typePokemonCatalogEntriesPromises.delete(type);
    throw error;
  });

  typePokemonCatalogEntriesPromises.set(type, entriesPromise);
  return entriesPromise;
}

export function resetPokemonCatalogCacheForTesting() {
  fullPokemonCatalogEntriesPromise = null;
  typePokemonCatalogEntriesPromises.clear();
}

async function listFilteredPokemonSummaries({
  limit,
  offset,
  query,
  type,
}: Required<Pick<ListPokemonSummariesOptions, "limit" | "offset">> &
  PokemonBrowseFilterOptions): Promise<PokemonSummaryPage> {
  const normalizedQuery = normalizeBrowseQuery(query);
  const normalizedType = normalizeBrowseType(type);
  const resource = `/pokemon/browse?limit=${limit}&offset=${offset}&q=${normalizedQuery}&type=${normalizedType ?? ""}`;

  try {
    const catalogEntries = normalizedType
      ? await listTypePokemonCatalogEntries(normalizedType)
      : await listPokemonSearchCatalogEntries();
    const filteredEntries = normalizedQuery
      ? catalogEntries.filter((entry) => matchesBrowseQuery(entry, normalizedQuery))
      : catalogEntries;
    const pageEntries = filteredEntries.slice(offset, offset + limit);
    const items = await Promise.all(
      pageEntries.map(({ slug }) => getPokemonSummary(slug)),
    );
    const window = buildOffsetWindow(filteredEntries.length, limit, offset);

    return {
      totalCount: filteredEntries.length,
      nextOffset: window.nextOffset,
      previousOffset: window.previousOffset,
      items,
    };
  } catch (error) {
    throw toServiceError(error, resource);
  }
};

export class PokemonServiceError extends Error {
  status: number | null;
  resource: string;

  constructor(message: string, resource: string, status: number | null = null) {
    super(message);
    this.name = "PokemonServiceError";
    this.resource = resource;
    this.status = status;
  }
}

function normalizeLookup(lookup: PokemonLookup) {
  return typeof lookup === "number" ? String(lookup) : lookup.trim().toLowerCase();
}

function parseOffsetFromListUrl(url: string | null) {
  if (!url) {
    return null;
  }

  try {
    const parsedUrl = new URL(url);
    const offsetParam = parsedUrl.searchParams.get("offset");

    return offsetParam ? Number(offsetParam) : 0;
  } catch {
    return null;
  }
}

function toServiceError(error: unknown, resource: string) {
  if (error instanceof PokemonServiceError) {
    return error;
  }

  if (isPokeApiNotFoundError(error)) {
    return new PokemonServiceError(
      `Failed to fetch Pokemon resource: ${resource}`,
      resource,
      404,
    );
  }

  return new PokemonServiceError(
    `Failed to fetch Pokemon resource: ${resource}`,
    resource,
    null,
  );
}

async function getPokemonSummary(lookup: PokemonLookup): Promise<PokemonSummary> {
  const resource = `/pokemon/${normalizeLookup(lookup)}/`;

  try {
    const rawPokemon = await getPokemonRaw(lookup);
    return pokemonNormalizer.summary(rawPokemon);
  } catch (error) {
    throw toServiceError(error, resource);
  }
}

async function getPokemonDetail(lookup: PokemonLookup): Promise<PokemonDetail> {
  const normalizedLookup = normalizeLookup(lookup);

  try {
    const rawPokemon = await getPokemonRaw(normalizedLookup);
    const rawSpecies = await getPokemonSpeciesRaw(rawPokemon.species.name);

    return pokemonNormalizer.detail(rawPokemon, rawSpecies);
  } catch (error) {
    throw toServiceError(error, `/pokemon/${normalizedLookup}/`);
  }
}

async function getPokemonDetailPageData(lookup: PokemonLookup) {
  const normalizedLookup = normalizeLookup(lookup);

  try {
    const rawPokemon = await getPokemonRaw(normalizedLookup);
    const rawSpecies = await getPokemonSpeciesRaw(rawPokemon.species.name);
    const evolutionChain = await getEvolutionChainRaw(rawSpecies.evolution_chain.url);

    return pokemonNormalizer.detailPageData(rawPokemon, rawSpecies, evolutionChain);
  } catch (error) {
    throw toServiceError(error, `/pokemon/${normalizedLookup}/`);
  }
}

async function listPokemonSummaries({
  limit = 20,
  offset = 0,
  query,
  type,
}: ListPokemonSummariesOptions = {}): Promise<PokemonSummaryPage> {
  if (normalizeBrowseQuery(query) || normalizeBrowseType(type)) {
    return listFilteredPokemonSummaries({
      limit,
      offset,
      query,
      type,
    });
  }

  const resource = `/pokemon?limit=${limit}&offset=${offset}`;

  try {
    const listResponse = await getPokemonListRaw(limit, offset);
    const items = await Promise.all(
      listResponse.results.map(({ name }) => getPokemonSummary(name)),
    );

    return {
      totalCount: listResponse.count,
      nextOffset: parseOffsetFromListUrl(listResponse.next),
      previousOffset: parseOffsetFromListUrl(listResponse.previous),
      items,
    };
  } catch (error) {
    throw toServiceError(error, resource);
  }
}

export const pokemonService = {
  getSummary: getPokemonSummary,
  getDetail: getPokemonDetail,
  getDetailPageData: getPokemonDetailPageData,
  listSummaries: listPokemonSummaries,
};

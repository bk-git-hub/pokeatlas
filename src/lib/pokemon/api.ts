import {
  getEvolutionChainRaw,
  getPokemonListRaw,
  getPokemonRaw,
  getPokemonSpeciesRaw,
} from "@/lib/pokeapi/client";
import { isPokeApiNotFoundError } from "@/lib/pokeapi/client";

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

const FILTERED_BROWSE_CATALOG_LIMIT = 151;

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

function matchesBrowseFilters(
  pokemon: PokemonSummary,
  query: string,
  type: string | null,
) {
  if (query && !pokemon.slug.includes(query)) {
    return false;
  }

  if (type && !pokemon.types.some((entry) => entry.slug === type)) {
    return false;
  }

  return true;
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
    const listResponse = await getPokemonListRaw(FILTERED_BROWSE_CATALOG_LIMIT, 0);
    const candidateEntries = normalizedQuery
      ? listResponse.results.filter(({ name }) => name.includes(normalizedQuery))
      : listResponse.results;
    const candidateItems = await Promise.all(
      candidateEntries.map(({ name }) => getPokemonSummary(name)),
    );
    const filteredItems = candidateItems.filter((pokemon) =>
      matchesBrowseFilters(pokemon, normalizedQuery, normalizedType),
    );
    const pageItems = filteredItems.slice(offset, offset + limit);
    const window = buildOffsetWindow(filteredItems.length, limit, offset);

    return {
      totalCount: filteredItems.length,
      nextOffset: window.nextOffset,
      previousOffset: window.previousOffset,
      items: pageItems,
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
    const [rawPokemon, rawSpecies] = await Promise.all([
      getPokemonRaw(normalizedLookup),
      getPokemonSpeciesRaw(normalizedLookup),
    ]);

    return pokemonNormalizer.detail(rawPokemon, rawSpecies);
  } catch (error) {
    throw toServiceError(error, `/pokemon/${normalizedLookup}/`);
  }
}

async function getPokemonDetailPageData(lookup: PokemonLookup) {
  const normalizedLookup = normalizeLookup(lookup);

  try {
    const [rawPokemon, rawSpecies] = await Promise.all([
      getPokemonRaw(normalizedLookup),
      getPokemonSpeciesRaw(normalizedLookup),
    ]);
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

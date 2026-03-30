import {
  getEvolutionChainRaw,
  getPokemonListRaw,
  getPokemonRaw,
  getPokemonSpeciesRaw,
} from "@/lib/pokeapi/client";
import { isPokeApiNotFoundError } from "@/lib/pokeapi/client";

import type {
  PokemonDetail,
  PokemonLookup,
  PokemonSummary,
  PokemonSummaryPage,
} from "./models";
import { pokemonNormalizer } from "./normalize";

type ListPokemonSummariesOptions = {
  limit?: number;
  offset?: number;
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
}: ListPokemonSummariesOptions = {}): Promise<PokemonSummaryPage> {
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

import type {
  EvolutionChainApiResponse,
  PokemonApiResponse,
  PokemonListApiResponse,
  PokemonSpeciesApiResponse,
} from "./types";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

export class PokeApiNotFoundError extends Error {
  constructor(path: string) {
    super(`PokeAPI resource not found: ${path}`);
    this.name = "PokeApiNotFoundError";
  }
}

async function fetchPokeApi<T>(path: string): Promise<T> {
  const response = await fetch(`${POKEAPI_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (response.status === 404) {
    throw new PokeApiNotFoundError(path);
  }

  if (!response.ok) {
    throw new Error(`PokeAPI request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

async function fetchPokeApiByUrl<T>(url: string): Promise<T> {
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

  if (response.status === 404) {
    throw new PokeApiNotFoundError(url);
  }

  if (!response.ok) {
    throw new Error(`PokeAPI request failed: ${response.status} ${response.statusText}`);
  }

  return (await response.json()) as T;
}

export function getPokemonRaw(nameOrId: string | number) {
  return fetchPokeApi<PokemonApiResponse>(
    `/pokemon/${encodeURIComponent(String(nameOrId).toLowerCase())}`,
  );
}

export function getPokemonListRaw(limit: number, offset = 0) {
  const params = new URLSearchParams({
    limit: String(limit),
    offset: String(offset),
  });

  return fetchPokeApi<PokemonListApiResponse>(`/pokemon?${params.toString()}`);
}

export function getPokemonSpeciesRaw(nameOrId: string | number) {
  return fetchPokeApi<PokemonSpeciesApiResponse>(
    `/pokemon-species/${encodeURIComponent(String(nameOrId).toLowerCase())}`,
  );
}

export function getEvolutionChainRaw(url: string) {
  return fetchPokeApiByUrl<EvolutionChainApiResponse>(url);
}

export async function getPokemonDetailBundleRaw(nameOrId: string | number) {
  const [pokemon, species] = await Promise.all([
    getPokemonRaw(nameOrId),
    getPokemonSpeciesRaw(nameOrId),
  ]);
  const evolutionChain = await getEvolutionChainRaw(species.evolution_chain.url);

  return {
    pokemon,
    species,
    evolutionChain,
  };
}

export function isPokeApiNotFoundError(error: unknown): error is PokeApiNotFoundError {
  return error instanceof PokeApiNotFoundError;
}

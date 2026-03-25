import type {
  PokemonApiResponse,
  PokemonListApiResponse,
  PokemonSpeciesApiResponse,
} from "./types";

const POKEAPI_BASE_URL = "https://pokeapi.co/api/v2";

async function fetchPokeApi<T>(path: string): Promise<T> {
  const response = await fetch(`${POKEAPI_BASE_URL}${path}`, {
    headers: {
      Accept: "application/json",
    },
    next: {
      revalidate: 3600,
    },
  });

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

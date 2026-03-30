import { beforeEach, describe, expect, it, vi } from "vitest";

import type {
  PokemonApiResponse,
  PokemonListApiResponse,
  PokemonSpeciesApiResponse,
  PokemonTypeApiResponse,
} from "@/lib/pokeapi/types";
import {
  getPokemonListRaw,
  getPokemonRaw,
  getPokemonSpeciesRaw,
  getPokemonTypeRaw,
} from "@/lib/pokeapi/client";

import { pokemonService, resetPokemonCatalogCacheForTesting } from "./api";

vi.mock("@/lib/pokeapi/client", () => ({
  getEvolutionChainRaw: vi.fn(),
  getPokemonListRaw: vi.fn(),
  getPokemonRaw: vi.fn(),
  getPokemonSpeciesRaw: vi.fn(),
  getPokemonTypeRaw: vi.fn(),
  isPokeApiNotFoundError: vi.fn(() => false),
}));

const mockedGetPokemonListRaw = vi.mocked(getPokemonListRaw);
const mockedGetPokemonRaw = vi.mocked(getPokemonRaw);
const mockedGetPokemonSpeciesRaw = vi.mocked(getPokemonSpeciesRaw);
const mockedGetPokemonTypeRaw = vi.mocked(getPokemonTypeRaw);

function createPokemonListResponse(
  entries: Array<string | { id: number; name: string }>,
  count = entries.length,
): PokemonListApiResponse {
  return {
    count,
    next: null,
    previous: null,
    results: entries.map((entry, index) => {
      const name = typeof entry === "string" ? entry : entry.name;
      const id = typeof entry === "string" ? index + 1 : entry.id;

      return {
        name,
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
      };
    }),
  };
}

function createPokemonTypeResponse(
  entries: Array<{ id: number; name: string; slot?: number }>,
): PokemonTypeApiResponse {
  return {
    id: 16,
    name: "dragon",
    pokemon: entries.map(({ id, name, slot = 1 }) => ({
      slot,
      pokemon: {
        name,
        url: `https://pokeapi.co/api/v2/pokemon/${id}/`,
      },
    })),
  };
}

function createPokemonResponse(
  id: number,
  name: string,
  speciesName = name,
): PokemonApiResponse {
  return {
    id,
    name,
    height: 19,
    weight: 950,
    base_experience: 270,
    order: id,
    abilities: [],
    species: {
      name: speciesName,
      url: `https://pokeapi.co/api/v2/pokemon-species/${id}/`,
    },
    stats: [],
    types: [
      {
        slot: 1,
        type: {
          name: "dragon",
          url: "https://pokeapi.co/api/v2/type/16/",
        },
      },
      {
        slot: 2,
        type: {
          name: "ground",
          url: "https://pokeapi.co/api/v2/type/5/",
        },
      },
    ],
    sprites: {
      front_default: null,
      other: {},
    },
  };
}

function createPokemonSpeciesResponse(name: string): PokemonSpeciesApiResponse {
  return {
    id: 445,
    name,
    color: {
      name: "blue",
      url: "https://pokeapi.co/api/v2/pokemon-color/2/",
    },
    habitat: {
      name: "cave",
      url: "https://pokeapi.co/api/v2/pokemon-habitat/1/",
    },
    shape: {
      name: "upright",
      url: "https://pokeapi.co/api/v2/pokemon-shape/6/",
    },
    generation: {
      name: "generation-iv",
      url: "https://pokeapi.co/api/v2/generation/4/",
    },
    evolves_from_species: {
      name: "gabite",
      url: "https://pokeapi.co/api/v2/pokemon-species/444/",
    },
    evolution_chain: {
      url: "https://pokeapi.co/api/v2/evolution-chain/111/",
    },
    flavor_text_entries: [
      {
        flavor_text: "It flies at speeds equal to a jet fighter plane.",
        language: {
          name: "en",
          url: "https://pokeapi.co/api/v2/language/9/",
        },
        version: {
          name: "diamond",
          url: "https://pokeapi.co/api/v2/version/12/",
        },
      },
    ],
    genera: [
      {
        genus: "Mach Pokemon",
        language: {
          name: "en",
          url: "https://pokeapi.co/api/v2/language/9/",
        },
      },
    ],
    is_legendary: false,
    is_mythical: false,
    capture_rate: 45,
    base_happiness: 70,
  };
}

describe("pokemonService.listSummaries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetPokemonCatalogCacheForTesting();
  });

  it("searches the full catalog when a query targets pokemon beyond the first 151 entries", async () => {
    mockedGetPokemonListRaw
      .mockResolvedValueOnce(createPokemonListResponse(["bulbasaur"], 1025))
      .mockResolvedValueOnce(
        createPokemonListResponse(
          [
            { id: 1, name: "bulbasaur" },
            { id: 6, name: "charizard" },
            { id: 445, name: "garchomp" },
          ],
          1025,
        ),
      );
    mockedGetPokemonRaw.mockResolvedValue(createPokemonResponse(445, "garchomp"));

    const summaryPage = await pokemonService.listSummaries({
      limit: 12,
      query: "garchomp",
    });

    expect(mockedGetPokemonListRaw).toHaveBeenNthCalledWith(1, 1, 0);
    expect(mockedGetPokemonListRaw).toHaveBeenNthCalledWith(2, 1025, 0);
    expect(mockedGetPokemonRaw).toHaveBeenCalledTimes(1);
    expect(mockedGetPokemonRaw).toHaveBeenCalledWith("garchomp");
    expect(summaryPage.totalCount).toBe(1);
    expect(summaryPage.items).toEqual([
      expect.objectContaining({
        id: 445,
        slug: "garchomp",
        name: "Garchomp",
        dexNumber: "#0445",
      }),
    ]);
  });

  it("matches dex-number queries against catalog ids", async () => {
    mockedGetPokemonListRaw
      .mockResolvedValueOnce(createPokemonListResponse(["bulbasaur"], 1025))
      .mockResolvedValueOnce(
        createPokemonListResponse(
          [
            { id: 1, name: "bulbasaur" },
            { id: 6, name: "charizard" },
            { id: 445, name: "garchomp" },
          ],
          1025,
        ),
      );
    mockedGetPokemonRaw.mockResolvedValue(createPokemonResponse(445, "garchomp"));

    const summaryPage = await pokemonService.listSummaries({
      limit: 12,
      query: "445",
    });

    expect(mockedGetPokemonRaw).toHaveBeenCalledTimes(1);
    expect(mockedGetPokemonRaw).toHaveBeenCalledWith("garchomp");
    expect(summaryPage.totalCount).toBe(1);
    expect(summaryPage.items[0]).toEqual(
      expect.objectContaining({
        id: 445,
        slug: "garchomp",
      }),
    );
  });

  it("uses the type endpoint and only fetches summaries for the paginated slice", async () => {
    mockedGetPokemonTypeRaw.mockResolvedValue(
      createPokemonTypeResponse([
        { id: 149, name: "dragonite" },
        { id: 445, name: "garchomp" },
      ]),
    );
    mockedGetPokemonRaw.mockResolvedValue(createPokemonResponse(445, "garchomp"));

    const summaryPage = await pokemonService.listSummaries({
      limit: 1,
      offset: 1,
      type: "dragon",
    });

    expect(mockedGetPokemonTypeRaw).toHaveBeenCalledTimes(1);
    expect(mockedGetPokemonTypeRaw).toHaveBeenCalledWith("dragon");
    expect(mockedGetPokemonListRaw).not.toHaveBeenCalled();
    expect(mockedGetPokemonRaw).toHaveBeenCalledTimes(1);
    expect(mockedGetPokemonRaw).toHaveBeenCalledWith("garchomp");
    expect(summaryPage.totalCount).toBe(2);
    expect(summaryPage.items).toEqual([
      expect.objectContaining({
        id: 445,
        slug: "garchomp",
      }),
    ]);
  });
});

describe("pokemonService.getDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    resetPokemonCatalogCacheForTesting();
  });

  it("resolves species data from the base species when a searched pokemon is a form", async () => {
    mockedGetPokemonRaw.mockResolvedValue(
      createPokemonResponse(10058, "garchomp-mega", "garchomp"),
    );
    mockedGetPokemonSpeciesRaw.mockResolvedValue(
      createPokemonSpeciesResponse("garchomp"),
    );

    const detail = await pokemonService.getDetail("garchomp-mega");

    expect(mockedGetPokemonRaw).toHaveBeenCalledWith("garchomp-mega");
    expect(mockedGetPokemonSpeciesRaw).toHaveBeenCalledTimes(1);
    expect(mockedGetPokemonSpeciesRaw).toHaveBeenCalledWith("garchomp");
    expect(detail).toEqual(
      expect.objectContaining({
        slug: "garchomp-mega",
        name: "Garchomp Mega",
        evolutionChainId: 111,
        evolvesFrom: "Gabite",
      }),
    );
  });
});

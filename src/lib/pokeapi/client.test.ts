import { describe, expect, it } from "vitest";
import { http, HttpResponse } from "msw";

import type { PokemonApiResponse } from "@/lib/pokeapi/types";
import { server } from "@/test/msw/server";

import { getPokemonRaw, PokeApiNotFoundError } from "./client";

const pokeApiBaseUrl = "https://pokeapi.co/api/v2";

const pikachuFixture: PokemonApiResponse = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  base_experience: 112,
  order: 35,
  abilities: [],
  species: {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon-species/25/",
  },
  stats: [],
  types: [
    {
      slot: 1,
      type: {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
    },
  ],
  sprites: {
    front_default: "https://img.example/pikachu.png",
    other: {},
  },
};

describe("getPokemonRaw", () => {
  it("returns parsed JSON for a successful PokeAPI request", async () => {
    server.use(
      http.get(`${pokeApiBaseUrl}/pokemon/pikachu`, () =>
        HttpResponse.json(pikachuFixture),
      ),
    );

    await expect(getPokemonRaw("pikachu")).resolves.toEqual(pikachuFixture);
  });

  it("maps 404 responses to PokeApiNotFoundError", async () => {
    server.use(
      http.get(`${pokeApiBaseUrl}/pokemon/missingno`, () =>
        new HttpResponse(null, { status: 404 }),
      ),
    );

    await expect(getPokemonRaw("missingno")).rejects.toBeInstanceOf(
      PokeApiNotFoundError,
    );
  });
});

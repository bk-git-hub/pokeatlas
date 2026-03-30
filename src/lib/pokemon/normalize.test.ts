import { describe, expect, it } from "vitest";

import type {
  EvolutionChainApiResponse,
  PokemonApiResponse,
  PokemonSpeciesApiResponse,
} from "../pokeapi/types";

import {
  normalizePokemonDetail,
  normalizePokemonDetailPageData,
  normalizePokemonSummary,
} from "./normalize";

const pokemonFixture: PokemonApiResponse = {
  id: 25,
  name: "pikachu",
  height: 4,
  weight: 60,
  base_experience: 112,
  order: 35,
  abilities: [
    {
      is_hidden: false,
      slot: 1,
      ability: {
        name: "static",
        url: "https://pokeapi.co/api/v2/ability/9/",
      },
    },
    {
      is_hidden: true,
      slot: 3,
      ability: {
        name: "lightning-rod",
        url: "https://pokeapi.co/api/v2/ability/31/",
      },
    },
  ],
  sprites: {
    front_default: "https://img.example/front.png",
    other: {
      "official-artwork": {
        front_default: "https://img.example/artwork.png",
        front_shiny: null,
      },
    },
  },
  species: {
    name: "pikachu",
    url: "https://pokeapi.co/api/v2/pokemon-species/25/",
  },
  stats: [
    {
      base_stat: 35,
      effort: 0,
      stat: {
        name: "hp",
        url: "https://pokeapi.co/api/v2/stat/1/",
      },
    },
    {
      base_stat: 90,
      effort: 2,
      stat: {
        name: "speed",
        url: "https://pokeapi.co/api/v2/stat/6/",
      },
    },
  ],
  types: [
    {
      slot: 1,
      type: {
        name: "electric",
        url: "https://pokeapi.co/api/v2/type/13/",
      },
    },
  ],
};

const speciesFixture: PokemonSpeciesApiResponse = {
  id: 25,
  name: "pikachu",
  color: {
    name: "yellow",
    url: "https://pokeapi.co/api/v2/pokemon-color/10/",
  },
  genera: [
    {
      genus: "Mouse Pokemon",
      language: {
        name: "en",
        url: "https://pokeapi.co/api/v2/language/9/",
      },
    },
  ],
  flavor_text_entries: [
    {
      flavor_text: "When several of these POKeMON gather,\ftheir electricity could build and cause lightning storms.",
      language: {
        name: "en",
        url: "https://pokeapi.co/api/v2/language/9/",
      },
      version: {
        name: "red",
        url: "https://pokeapi.co/api/v2/version/1/",
      },
    },
  ],
  evolution_chain: {
    url: "https://pokeapi.co/api/v2/evolution-chain/10/",
  },
  habitat: {
    name: "forest",
    url: "https://pokeapi.co/api/v2/pokemon-habitat/2/",
  },
  is_legendary: false,
  is_mythical: false,
  shape: {
    name: "quadruped",
    url: "https://pokeapi.co/api/v2/pokemon-shape/8/",
  },
};

const evolutionChainFixture: EvolutionChainApiResponse = {
  id: 10,
  baby_trigger_item: null,
  chain: {
    evolution_details: [],
    evolves_to: [
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: null,
            min_level: 18,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: null,
            time_of_day: "",
            trade_species: null,
            trigger: {
              name: "level-up",
              url: "https://pokeapi.co/api/v2/evolution-trigger/1/",
            },
            turn_upside_down: false,
          },
        ],
        evolves_to: [
          {
            evolution_details: [
              {
                gender: null,
                held_item: null,
                known_move: null,
                known_move_type: null,
                location: null,
                min_affection: null,
                min_beauty: null,
                min_happiness: null,
                min_level: null,
                needs_overworld_rain: false,
                party_species: null,
                party_type: null,
                relative_physical_stats: null,
                time_of_day: "",
                trade_species: null,
                trigger: {
                  name: "use-item",
                  url: "https://pokeapi.co/api/v2/evolution-trigger/3/",
                },
                turn_upside_down: false,
                item: {
                  name: "thunder-stone",
                  url: "https://pokeapi.co/api/v2/item/83/",
                },
              },
            ],
            evolves_to: [],
            is_baby: false,
            species: {
              name: "raichu",
              url: "https://pokeapi.co/api/v2/pokemon-species/26/",
            },
          },
        ],
        is_baby: false,
        species: {
          name: "pikachu",
          url: "https://pokeapi.co/api/v2/pokemon-species/25/",
        },
      },
      {
        evolution_details: [
          {
            gender: null,
            held_item: null,
            item: null,
            known_move: null,
            known_move_type: null,
            location: null,
            min_affection: null,
            min_beauty: null,
            min_happiness: 220,
            min_level: null,
            needs_overworld_rain: false,
            party_species: null,
            party_type: null,
            relative_physical_stats: null,
            time_of_day: "",
            trade_species: null,
            trigger: {
              name: "level-up",
              url: "https://pokeapi.co/api/v2/evolution-trigger/1/",
            },
            turn_upside_down: false,
          },
        ],
        evolves_to: [],
        is_baby: false,
        species: {
          name: "pikachu-rock-star",
          url: "https://pokeapi.co/api/v2/pokemon-species/10080/",
        },
      },
    ],
    is_baby: true,
    species: {
      name: "pichu",
      url: "https://pokeapi.co/api/v2/pokemon-species/172/",
    },
  },
};

describe("normalizePokemonSummary", () => {
  it("maps raw pokemon payloads to stable summary fields", () => {
    expect(normalizePokemonSummary(pokemonFixture)).toEqual({
      id: 25,
      slug: "pikachu",
      name: "pikachu",
      displayName: "Pikachu",
      dexNumber: "#0025",
      artworkUrl: "https://img.example/artwork.png",
      primaryType: "electric",
      types: ["electric"],
    });
  });
});

describe("normalizePokemonDetail", () => {
  it("combines pokemon and species payloads into a detail model", () => {
    expect(normalizePokemonDetail(pokemonFixture, speciesFixture)).toEqual({
      id: 25,
      slug: "pikachu",
      name: "pikachu",
      displayName: "Pikachu",
      dexNumber: "#0025",
      artworkUrl: "https://img.example/artwork.png",
      primaryType: "electric",
      types: ["electric"],
      baseExperience: 112,
      heightMeters: 0.4,
      weightKilograms: 6,
      abilities: [
        {
          name: "static",
          isHidden: false,
          slot: 1,
        },
        {
          name: "lightning-rod",
          isHidden: true,
          slot: 3,
        },
      ],
      stats: [
        {
          name: "hp",
          baseValue: 35,
          effort: 0,
        },
        {
          name: "speed",
          baseValue: 90,
          effort: 2,
        },
      ],
      color: "yellow",
      genus: "Mouse Pokemon",
      flavorText:
        "When several of these POKeMON gather, their electricity could build and cause lightning storms.",
      habitat: "forest",
      shape: "quadruped",
      isLegendary: false,
      isMythical: false,
      evolutionChainId: "10",
    });
  });
});

describe("normalizePokemonDetailPageData", () => {
  it("preserves branching evolution data in the normalized detail shape", () => {
    expect(
      normalizePokemonDetailPageData(
        pokemonFixture,
        speciesFixture,
        evolutionChainFixture,
      ),
    ).toMatchObject({
      pokemon: {
        slug: "pikachu",
        evolutionChainId: "10",
      },
      evolutionChain: {
        slug: "pichu",
        isBaby: true,
        isCurrent: false,
        evolvesTo: [
          {
            slug: "pikachu",
            isCurrent: true,
            requirements: ["Level 18"],
            evolvesTo: [
              {
                slug: "raichu",
                requirements: ["Use Thunder Stone"],
              },
            ],
          },
          {
            slug: "pikachu-rock-star",
            requirements: ["High friendship (220+)"],
          },
        ],
      },
    });
  });
});

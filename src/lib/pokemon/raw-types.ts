export type NamedApiResource = {
  name: string;
  url: string;
};

export type RawPokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
};

export type RawPokemonResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  types: Array<{
    slot: number;
    type: NamedApiResource;
  }>;
  abilities: Array<{
    is_hidden: boolean;
    slot: number;
    ability: NamedApiResource;
  }>;
  stats: Array<{
    base_stat: number;
    effort: number;
    stat: NamedApiResource;
  }>;
  sprites: {
    front_default: string | null;
    other?: {
      dream_world?: {
        front_default: string | null;
      };
      "official-artwork"?: {
        front_default: string | null;
        front_shiny?: string | null;
      };
    };
  };
  species: NamedApiResource;
};

export type RawPokemonSpeciesResponse = {
  id: number;
  name: string;
  color: NamedApiResource | null;
  habitat: NamedApiResource | null;
  shape: NamedApiResource | null;
  generation: NamedApiResource | null;
  evolves_from_species: NamedApiResource | null;
  evolution_chain: {
    url: string;
  };
  flavor_text_entries: Array<{
    flavor_text: string;
    language: NamedApiResource;
    version: NamedApiResource;
  }>;
  genera: Array<{
    genus: string;
    language: NamedApiResource;
  }>;
  is_legendary: boolean;
  is_mythical: boolean;
  capture_rate: number;
  base_happiness: number;
};

export type EvolutionDetailApiResponse = {
  gender: number | null;
  held_item: NamedApiResource | null;
  item: NamedApiResource | null;
  known_move: NamedApiResource | null;
  known_move_type: NamedApiResource | null;
  location: NamedApiResource | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean;
  party_species: NamedApiResource | null;
  party_type: NamedApiResource | null;
  relative_physical_stats: number | null;
  time_of_day: string;
  trade_species: NamedApiResource | null;
  trigger: NamedApiResource;
  turn_upside_down: boolean;
};

export type EvolutionChainLinkApiResponse = {
  evolution_details: EvolutionDetailApiResponse[];
  evolves_to: EvolutionChainLinkApiResponse[];
  is_baby: boolean;
  species: NamedApiResource;
};

export type EvolutionChainApiResponse = {
  id: number;
  baby_trigger_item: NamedApiResource | null;
  chain: EvolutionChainLinkApiResponse;
};

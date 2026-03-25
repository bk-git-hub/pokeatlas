export type NamedApiResource = {
  name: string;
  url: string;
};

export type PokemonTypeSlot = {
  slot: number;
  type: NamedApiResource;
};

export type PokemonAbilitySlot = {
  is_hidden: boolean;
  slot: number;
  ability: NamedApiResource;
};

export type PokemonStatSlot = {
  base_stat: number;
  effort: number;
  stat: NamedApiResource;
};

export type PokemonSprites = {
  front_default: string | null;
  other?: {
    "official-artwork"?: {
      front_default: string | null;
      front_shiny?: string | null;
    };
  };
};

export type PokemonApiResponse = {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  abilities: PokemonAbilitySlot[];
  sprites: PokemonSprites;
  species: NamedApiResource;
  stats: PokemonStatSlot[];
  types: PokemonTypeSlot[];
};

export type PokemonListApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NamedApiResource[];
};

export type FlavorTextEntry = {
  flavor_text: string;
  language: NamedApiResource;
  version: NamedApiResource;
};

export type GenusEntry = {
  genus: string;
  language: NamedApiResource;
};

export type PokemonSpeciesApiResponse = {
  id: number;
  name: string;
  color: NamedApiResource;
  genera: GenusEntry[];
  flavor_text_entries: FlavorTextEntry[];
  evolution_chain: {
    url: string;
  };
  habitat: NamedApiResource | null;
  is_legendary: boolean;
  is_mythical: boolean;
  shape: NamedApiResource | null;
};

export type PokemonTypeName =
  | "bug"
  | "dark"
  | "dragon"
  | "electric"
  | "fairy"
  | "fighting"
  | "fire"
  | "flying"
  | "ghost"
  | "grass"
  | "ground"
  | "ice"
  | "normal"
  | "poison"
  | "psychic"
  | "rock"
  | "steel"
  | "water";

export type PokemonStatName =
  | "hp"
  | "attack"
  | "defense"
  | "special-attack"
  | "special-defense"
  | "speed";

export type PokemonAbility = {
  name: string;
  isHidden: boolean;
  slot: number;
};

export type PokemonStat = {
  name: PokemonStatName;
  baseValue: number;
  effort: number;
};

export type PokemonSummary = {
  id: number;
  slug: string;
  name: string;
  displayName: string;
  dexNumber: string;
  artworkUrl: string | null;
  primaryType: PokemonTypeName;
  types: PokemonTypeName[];
};

export type PokemonDetail = PokemonSummary & {
  baseExperience: number;
  heightMeters: number;
  weightKilograms: number;
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  color: string | null;
  genus: string | null;
  flavorText: string | null;
  habitat: string | null;
  shape: string | null;
  isLegendary: boolean;
  isMythical: boolean;
  evolutionChainId: string | null;
};

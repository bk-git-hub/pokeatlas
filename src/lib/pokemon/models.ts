export type PokemonLookup = number | string;

export type PokemonType = {
  slot: number;
  slug: string;
  name: string;
};

export type PokemonAbility = {
  slot: number;
  slug: string;
  name: string;
  isHidden: boolean;
};

export type PokemonStats = {
  hp: number;
  attack: number;
  defense: number;
  specialAttack: number;
  specialDefense: number;
  speed: number;
  total: number;
};

export type PokemonSummary = {
  id: number;
  slug: string;
  name: string;
  dexNumber: string;
  imageUrl: string | null;
  primaryType: PokemonType | null;
  types: PokemonType[];
  stats: PokemonStats;
};

export type PokemonDetail = PokemonSummary & {
  abilities: PokemonAbility[];
  heightMeters: number;
  weightKilograms: number;
  flavorText: string | null;
  genus: string | null;
  generation: string | null;
  color: string | null;
  habitat: string | null;
  shape: string | null;
  evolvesFrom: string | null;
  evolutionChainId: number | null;
  captureRate: number | null;
  baseHappiness: number | null;
};

export type PokemonSummaryPage = {
  totalCount: number;
  nextOffset: number | null;
  previousOffset: number | null;
  items: PokemonSummary[];
};

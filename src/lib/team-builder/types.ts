import type { PokemonDetail, PokemonSummary } from "@/lib/pokemon";

export type TeamPokemonEntry = Pick<
  PokemonSummary,
  "id" | "slug" | "name" | "dexNumber" | "imageUrl" | "primaryType" | "types" | "stats"
>;

export function toTeamPokemonEntry(
  pokemon: PokemonSummary | PokemonDetail,
): TeamPokemonEntry {
  return {
    id: pokemon.id,
    slug: pokemon.slug,
    name: pokemon.name,
    dexNumber: pokemon.dexNumber,
    imageUrl: pokemon.imageUrl,
    primaryType: pokemon.primaryType,
    types: pokemon.types,
    stats: pokemon.stats,
  };
}

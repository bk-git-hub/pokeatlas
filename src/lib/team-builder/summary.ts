import type { TeamPokemonEntry } from "./types";

export type TeamTypeDistribution = {
  slug: string;
  name: string;
  count: number;
};

export type TeamCompositionSummary = {
  membersCount: number;
  openSlots: number;
  duplicateTypeSlots: number;
  typeDistribution: TeamTypeDistribution[];
  totalStats: TeamPokemonEntry["stats"];
  averageStats: TeamPokemonEntry["stats"];
};

const TEAM_SLOT_LIMIT = 6;
const EMPTY_STATS = {
  hp: 0,
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
  total: 0,
} satisfies TeamPokemonEntry["stats"];

export function summarizeTeam(
  team: TeamPokemonEntry[],
): TeamCompositionSummary {
  const typeMap = new Map<string, TeamTypeDistribution>();
  const totalStats = { ...EMPTY_STATS };

  for (const pokemon of team) {
    for (const type of pokemon.types) {
      const current = typeMap.get(type.slug);

      if (current) {
        current.count += 1;
      } else {
        typeMap.set(type.slug, {
          slug: type.slug,
          name: type.name,
          count: 1,
        });
      }
    }

    totalStats.hp += pokemon.stats.hp;
    totalStats.attack += pokemon.stats.attack;
    totalStats.defense += pokemon.stats.defense;
    totalStats.specialAttack += pokemon.stats.specialAttack;
    totalStats.specialDefense += pokemon.stats.specialDefense;
    totalStats.speed += pokemon.stats.speed;
    totalStats.total += pokemon.stats.total;
  }

  const membersCount = team.length;
  const averageDivisor = membersCount || 1;
  const typeDistribution = [...typeMap.values()].sort(
    (left, right) => right.count - left.count || left.name.localeCompare(right.name),
  );

  return {
    membersCount,
    openSlots: Math.max(0, TEAM_SLOT_LIMIT - membersCount),
    duplicateTypeSlots: typeDistribution.filter((entry) => entry.count > 1).length,
    typeDistribution,
    totalStats,
    averageStats: {
      hp: Math.round(totalStats.hp / averageDivisor),
      attack: Math.round(totalStats.attack / averageDivisor),
      defense: Math.round(totalStats.defense / averageDivisor),
      specialAttack: Math.round(totalStats.specialAttack / averageDivisor),
      specialDefense: Math.round(totalStats.specialDefense / averageDivisor),
      speed: Math.round(totalStats.speed / averageDivisor),
      total: Math.round(totalStats.total / averageDivisor),
    },
  };
}

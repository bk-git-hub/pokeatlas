import { describe, expect, it } from "vitest";

import { summarizeTeam } from "./summary";
import type { TeamPokemonEntry } from "./types";

const teamFixture: TeamPokemonEntry[] = [
  {
    id: 6,
    slug: "charizard",
    name: "Charizard",
    dexNumber: "#006",
    imageUrl: null,
    primaryType: { slot: 1, slug: "fire", name: "Fire" },
    types: [
      { slot: 1, slug: "fire", name: "Fire" },
      { slot: 2, slug: "flying", name: "Flying" },
    ],
    stats: {
      hp: 78,
      attack: 84,
      defense: 78,
      specialAttack: 109,
      specialDefense: 85,
      speed: 100,
      total: 534,
    },
  },
  {
    id: 149,
    slug: "dragonite",
    name: "Dragonite",
    dexNumber: "#149",
    imageUrl: null,
    primaryType: { slot: 1, slug: "dragon", name: "Dragon" },
    types: [
      { slot: 1, slug: "dragon", name: "Dragon" },
      { slot: 2, slug: "flying", name: "Flying" },
    ],
    stats: {
      hp: 91,
      attack: 134,
      defense: 95,
      specialAttack: 100,
      specialDefense: 100,
      speed: 80,
      total: 600,
    },
  },
];

describe("summarizeTeam", () => {
  it("summarizes type counts and open slots", () => {
    const summary = summarizeTeam(teamFixture);

    expect(summary.membersCount).toBe(2);
    expect(summary.openSlots).toBe(4);
    expect(summary.duplicateTypeSlots).toBe(1);
    expect(summary.typeDistribution[0]).toEqual({
      slug: "flying",
      name: "Flying",
      count: 2,
    });
  });

  it("aggregates total and average stats", () => {
    const summary = summarizeTeam(teamFixture);

    expect(summary.totalStats.total).toBe(1134);
    expect(summary.averageStats.total).toBe(567);
    expect(summary.averageStats.speed).toBe(90);
  });

  it("returns empty summary values for an empty team", () => {
    const summary = summarizeTeam([]);

    expect(summary.membersCount).toBe(0);
    expect(summary.openSlots).toBe(6);
    expect(summary.typeDistribution).toEqual([]);
    expect(summary.totalStats.total).toBe(0);
  });
});

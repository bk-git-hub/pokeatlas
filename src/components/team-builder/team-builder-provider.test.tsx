import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";

import type { TeamPokemonEntry } from "@/lib/team-builder/types";

import { TeamBuilderProvider, useTeamBuilder } from "./team-builder-provider";

const teamFixtures = Array.from({ length: 7 }, (_, index) =>
  createTeamPokemonEntry(index + 1),
);

function createTeamPokemonEntry(id: number): TeamPokemonEntry {
  return {
    id,
    slug: `pokemon-${id}`,
    name: `Pokemon ${id}`,
    dexNumber: `#${String(id).padStart(4, "0")}`,
    imageUrl: null,
    primaryType: {
      slot: 1,
      slug: id % 2 === 0 ? "water" : "fire",
      name: id % 2 === 0 ? "Water" : "Fire",
    },
    types: [
      {
        slot: 1,
        slug: id % 2 === 0 ? "water" : "fire",
        name: id % 2 === 0 ? "Water" : "Fire",
      },
    ],
    stats: {
      hp: 60 + id,
      attack: 70 + id,
      defense: 50 + id,
      specialAttack: 80 + id,
      specialDefense: 65 + id,
      speed: 90 + id,
      total: 415 + id * 6,
    },
  };
}

function TeamBuilderHarness() {
  const { addPokemon, clearTeam, hasPokemon, isFull, removePokemon, team } =
    useTeamBuilder();

  return (
    <div>
      <div>Team count: {team.length}</div>
      <div>Team full: {String(isFull)}</div>
      <div>Has first Pokemon: {String(hasPokemon(teamFixtures[0].slug))}</div>

      {teamFixtures.map((pokemon) => (
        <button
          key={pokemon.slug}
          type="button"
          onClick={() => addPokemon(pokemon)}
        >
          Add {pokemon.name}
        </button>
      ))}

      <button
        type="button"
        onClick={() => removePokemon(teamFixtures[0].slug)}
      >
        Remove first Pokemon
      </button>

      <button type="button" onClick={clearTeam}>
        Clear team
      </button>
    </div>
  );
}

describe("TeamBuilderProvider", () => {
  it("adds Pokemon, ignores duplicates, and enforces the six-slot limit", async () => {
    const user = userEvent.setup();

    render(
      <TeamBuilderProvider>
        <TeamBuilderHarness />
      </TeamBuilderProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Add Pokemon 1" }));
    await user.click(screen.getByRole("button", { name: "Add Pokemon 1" }));

    expect(screen.getByText("Team count: 1")).toBeInTheDocument();
    expect(screen.getByText("Has first Pokemon: true")).toBeInTheDocument();

    for (const pokemon of teamFixtures.slice(1)) {
      await user.click(
        screen.getByRole("button", { name: `Add ${pokemon.name}` }),
      );
    }

    expect(screen.getByText("Team count: 6")).toBeInTheDocument();
    expect(screen.getByText("Team full: true")).toBeInTheDocument();
  });

  it("removes Pokemon and clears the team", async () => {
    const user = userEvent.setup();

    render(
      <TeamBuilderProvider>
        <TeamBuilderHarness />
      </TeamBuilderProvider>,
    );

    await user.click(screen.getByRole("button", { name: "Add Pokemon 1" }));
    await user.click(screen.getByRole("button", { name: "Add Pokemon 2" }));

    expect(screen.getByText("Team count: 2")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", { name: "Remove first Pokemon" }),
    );
    expect(screen.getByText("Team count: 1")).toBeInTheDocument();
    expect(screen.getByText("Has first Pokemon: false")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Clear team" }));
    expect(screen.getByText("Team count: 0")).toBeInTheDocument();
    expect(screen.getByText("Team full: false")).toBeInTheDocument();
  });
});

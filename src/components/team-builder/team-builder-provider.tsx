"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { TeamPokemonEntry } from "@/lib/team-builder/types";

const TEAM_SLOT_LIMIT = 6;

type TeamBuilderContextValue = {
  team: TeamPokemonEntry[];
  isFull: boolean;
  addPokemon: (pokemon: TeamPokemonEntry) => void;
  removePokemon: (slug: string) => void;
  clearTeam: () => void;
  hasPokemon: (slug: string) => boolean;
};

const TeamBuilderContext = createContext<TeamBuilderContextValue | null>(null);

export function TeamBuilderProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [team, setTeam] = useState<TeamPokemonEntry[]>([]);

  const value = useMemo<TeamBuilderContextValue>(
    () => ({
      team,
      isFull: team.length >= TEAM_SLOT_LIMIT,
      addPokemon(pokemon) {
        setTeam((current) => {
          if (
            current.length >= TEAM_SLOT_LIMIT ||
            current.some((entry) => entry.slug === pokemon.slug)
          ) {
            return current;
          }

          return [...current, pokemon];
        });
      },
      removePokemon(slug) {
        setTeam((current) => current.filter((entry) => entry.slug !== slug));
      },
      clearTeam() {
        setTeam([]);
      },
      hasPokemon(slug) {
        return team.some((entry) => entry.slug === slug);
      },
    }),
    [team],
  );

  return (
    <TeamBuilderContext.Provider value={value}>
      {children}
    </TeamBuilderContext.Provider>
  );
}

export function useTeamBuilder() {
  const context = useContext(TeamBuilderContext);

  if (!context) {
    throw new Error("useTeamBuilder must be used within a TeamBuilderProvider");
  }

  return context;
}

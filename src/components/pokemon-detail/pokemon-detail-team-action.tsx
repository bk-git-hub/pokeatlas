"use client";

import { ActionLink } from "@/components/ui/action-link";
import { useTeamBuilder } from "@/components/team-builder/team-builder-provider";
import { toTeamPokemonEntry } from "@/lib/team-builder/types";
import type { PokemonDetail } from "@/lib/pokemon";

type PokemonDetailTeamActionProps = {
  pokemon: PokemonDetail;
};

export function PokemonDetailTeamAction({
  pokemon,
}: PokemonDetailTeamActionProps) {
  const { addPokemon, hasPokemon, isFull, removePokemon } = useTeamBuilder();
  const isAdded = hasPokemon(pokemon.slug);
  const isDisabled = !isAdded && isFull;

  function handleTeamAction() {
    if (isAdded) {
      removePokemon(pokemon.slug);
      return;
    }

    addPokemon(toTeamPokemonEntry(pokemon));
  }

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleTeamAction}
        disabled={isDisabled}
        className="ui-action ui-action--primary min-h-11 px-5 disabled:cursor-not-allowed disabled:opacity-45"
      >
        {isAdded ? "Remove from team" : isFull ? "Team full" : "Add to team"}
      </button>
      <ActionLink href="/team-builder" variant="secondary" className="px-5">
        Open team builder
      </ActionLink>
      <div className="text-sm leading-7 text-slate-300">
        {isAdded
          ? "This Pokemon is already in your current six-slot team."
          : isFull
            ? "Your team already has six Pokemon. Remove one from the builder before adding another."
            : "Add this Pokemon to your team and keep building from the team builder."}
      </div>
    </div>
  );
}

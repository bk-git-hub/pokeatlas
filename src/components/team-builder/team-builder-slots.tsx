"use client";

import Image from "next/image";

import { ActionLink } from "@/components/ui/action-link";
import { Panel } from "@/components/ui/panel";

import { useTeamBuilder } from "./team-builder-provider";

const TEAM_SLOT_LIMIT = 6;

export function TeamBuilderSlots() {
  const { team, removePokemon, clearTeam } = useTeamBuilder();

  return (
    <Panel className="section-shell px-6 py-6 sm:px-8">
      <div className="space-y-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Current team
            </div>
            <div className="mt-2 text-sm leading-7 text-slate-300">
              {team.length === 0
                ? "No Pokemon added yet."
                : `${team.length} of ${TEAM_SLOT_LIMIT} slots filled.`}
            </div>
          </div>

          <div className="flex gap-3">
            <ActionLink href="/team-builder" variant="secondary" className="px-4">
              Reset search
            </ActionLink>
            <button
              type="button"
              onClick={clearTeam}
              disabled={team.length === 0}
              className="ui-action ui-action--secondary min-h-11 px-4 disabled:cursor-not-allowed disabled:opacity-45"
            >
              Clear team
            </button>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: TEAM_SLOT_LIMIT }, (_, index) => {
            const pokemon = team[index];

            return pokemon ? (
              <Panel
                key={pokemon.slug}
                className="card-surface border border-white/10 p-4"
                tone="card"
              >
                <div className="flex items-start gap-4">
                  <div className="flex h-20 w-20 items-center justify-center rounded-[1.25rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(122,187,255,0.18),_rgba(255,255,255,0.02)_60%)] p-2">
                    {pokemon.imageUrl ? (
                      <Image
                        src={pokemon.imageUrl}
                        alt={`${pokemon.name} official artwork`}
                        width={96}
                        height={96}
                        className="h-16 w-16 object-contain"
                        sizes="96px"
                      />
                    ) : (
                      <div className="text-center text-xs text-slate-400">No art</div>
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="font-mono text-xs uppercase tracking-[0.22em] text-sky-200/80">
                      Slot {index + 1}
                    </div>
                    <div className="mt-2 text-xl font-semibold text-white">
                      {pokemon.name}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {pokemon.types.map((type) => (
                        <span
                          key={type.slug}
                          className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
                        >
                          {type.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
                  <div className="text-sm text-slate-300">
                    Total stats:{" "}
                    <span className="font-semibold text-white">
                      {pokemon.stats.total}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removePokemon(pokemon.slug)}
                    className="ui-action ui-action--secondary min-h-11 px-4"
                  >
                    Remove
                  </button>
                </div>
              </Panel>
            ) : (
              <Panel
                key={`empty-${index + 1}`}
                className="rounded-[1.5rem] border border-dashed border-white/10 p-4"
                tone="soft"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  Slot {index + 1}
                </div>
                <div className="mt-4 text-base font-semibold text-white">
                  Open slot
                </div>
                <div className="mt-2 text-sm leading-7 text-slate-300">
                  Search from this page or add from a Pokemon detail page.
                </div>
              </Panel>
            );
          })}
        </div>
      </div>
    </Panel>
  );
}

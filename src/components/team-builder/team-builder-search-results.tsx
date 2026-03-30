"use client";

import Image from "next/image";

import { Panel } from "@/components/ui/panel";
import { toTeamPokemonEntry } from "@/lib/team-builder/types";
import type { TeamPokemonEntry } from "@/lib/team-builder/types";
import type { PokemonSummary } from "@/lib/pokemon";

import { useTeamBuilder } from "./team-builder-provider";

type TeamBuilderSearchResultsProps = {
  query: string;
  results: PokemonSummary[];
};

export function TeamBuilderSearchResults({
  query,
  results,
}: TeamBuilderSearchResultsProps) {
  const { addPokemon, hasPokemon, isFull } = useTeamBuilder();

  return (
    <Panel className="section-shell px-6 py-6 sm:px-8">
      <div className="space-y-5">
        <div className="space-y-2">
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Search results
          </div>
          <div className="text-sm leading-7 text-slate-300">
            {query
              ? `Showing candidates for "${query}".`
              : "Search by Pokemon name to add candidates into the current team."}
          </div>
        </div>

        {query ? (
          results.length > 0 ? (
            <div className="grid gap-3 lg:grid-cols-2">
              {results.map((pokemon) => (
                <SearchResultCard
                  key={pokemon.slug}
                  pokemon={pokemon}
                  isAdded={hasPokemon(pokemon.slug)}
                  isFull={isFull}
                  onAdd={addPokemon}
                />
              ))}
            </div>
          ) : (
            <Panel className="rounded-[1.5rem] border border-white/10 p-4" tone="soft">
              <div className="text-base font-semibold text-white">
                No Pokemon matched that search.
              </div>
              <div className="mt-2 text-sm leading-7 text-slate-300">
                Try a broader name query to surface more results.
              </div>
            </Panel>
          )
        ) : (
          <Panel className="rounded-[1.5rem] border border-white/10 p-4" tone="soft">
            <div className="text-base font-semibold text-white">
              Search before you add.
            </div>
            <div className="mt-2 text-sm leading-7 text-slate-300">
              Search here to add Pokemon into the team, then refine individual
              picks from their full profiles when needed.
            </div>
          </Panel>
        )}
      </div>
    </Panel>
  );
}

type SearchResultCardProps = {
  pokemon: PokemonSummary;
  isAdded: boolean;
  isFull: boolean;
  onAdd: (pokemon: TeamPokemonEntry) => void;
};

function SearchResultCard({
  pokemon,
  isAdded,
  isFull,
  onAdd,
}: SearchResultCardProps) {
  const isDisabled = isAdded || isFull;

  return (
    <Panel className="card-surface border border-white/10 p-4" tone="card">
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
            {pokemon.dexNumber}
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
          <span className="font-semibold text-white">{pokemon.stats.total}</span>
        </div>
        <button
          type="button"
          onClick={() => onAdd(toTeamPokemonEntry(pokemon))}
          disabled={isDisabled}
          className="ui-action ui-action--primary min-h-11 px-4 disabled:cursor-not-allowed disabled:opacity-45"
        >
          {isAdded ? "Added" : isFull ? "Team full" : "Add to team"}
        </button>
      </div>
    </Panel>
  );
}

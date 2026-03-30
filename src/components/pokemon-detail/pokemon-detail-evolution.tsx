import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import type { PokemonDetail } from "@/lib/pokemon";

type PokemonDetailEvolutionProps = {
  pokemon: PokemonDetail;
};

export function PokemonDetailEvolution({
  pokemon,
}: PokemonDetailEvolutionProps) {
  return (
    <Panel className="section-shell px-6 py-8 sm:px-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.9fr)] lg:items-start">
        <div className="space-y-4">
          <Eyebrow>Evolution context</Eyebrow>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            A lighter first read on how {pokemon.name} fits its line
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate-300">
            This first pass keeps evolution intentionally simple. You can see
            where {pokemon.name} sits relative to its immediate predecessor
            while the richer chain treatment stays scoped for a later feature.
          </p>
        </div>

        <Panel
          className="rounded-[1.5rem] border border-white/10 p-5"
          tone="soft"
        >
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Evolution chain
          </div>
          <div className="mt-3 text-3xl font-semibold text-white">
            {pokemon.evolutionChainId !== null
              ? `Chain #${pokemon.evolutionChainId}`
              : "Unknown chain"}
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            This page currently focuses on direct context instead of rendering
            the full branching chain.
          </p>
        </Panel>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Panel
          className="rounded-[1.5rem] border border-white/10 p-5"
          tone="soft"
        >
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Previous evolution
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">
            {pokemon.evolvesFrom ?? `${pokemon.name} starts this visible line`}
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            {pokemon.evolvesFrom
              ? `${pokemon.name} evolves from ${pokemon.evolvesFrom}.`
              : `No prior species is exposed in the current normalized detail model for ${pokemon.name}.`}
          </p>
          {pokemon.evolvesFrom ? (
            <div className="mt-5">
              <ActionLink
                href={`/pokedex/${toPokemonSlug(pokemon.evolvesFrom)}`}
                variant="secondary"
              >
                Open {pokemon.evolvesFrom}
              </ActionLink>
            </div>
          ) : null}
        </Panel>

        <Panel
          className="rounded-[1.5rem] border border-white/10 p-5"
          tone="soft"
        >
          <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
            Detail-page note
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">
            Evolution UI is intentionally narrow in PK-004
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            The route now has a real evolution section, but it avoids fake
            completeness until the service layer is expanded with normalized
            chain nodes and branching awareness.
          </p>
        </Panel>
      </div>
    </Panel>
  );
}

function toPokemonSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

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
            See how {pokemon.name} fits into its evolution line
          </h2>
          <p className="max-w-3xl text-base leading-8 text-slate-300">
            This view keeps the focus on the most useful context: where
            {` ${pokemon.name} `} sits in its line and which species comes
            directly before it.
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
            This page highlights direct lineage so the profile stays easy to
            scan.
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
              : `${pokemon.name} starts this visible part of the line.`}
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
            Current view
          </div>
          <div className="mt-3 text-2xl font-semibold text-white">
            A focused look at the surrounding evolution context
          </div>
          <p className="mt-3 text-sm leading-7 text-slate-300">
            Use this section to check the immediate line around
            {` ${pokemon.name} `} without leaving the profile.
          </p>
        </Panel>
      </div>
    </Panel>
  );
}

function toPokemonSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

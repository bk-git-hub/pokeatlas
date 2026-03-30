import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";

import { featuredPokemon } from "@/content/home";

export function HomeSpotlight() {
  return (
    <section
      id="spotlight"
      className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(18rem,1.05fr)]"
    >
      <Panel className="section-shell overflow-hidden p-6 sm:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          aria-hidden="true"
        >
          <div className="absolute left-8 top-8 h-16 w-16 rounded-full border border-white/15" />
          <div className="absolute left-20 top-20 h-48 w-48 rounded-full border border-white/8" />
          <div className="absolute inset-x-8 bottom-8 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
        </div>

        <div className="relative mx-auto flex max-w-sm flex-col items-center text-center">
          <div className="mb-6 rounded-full border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs uppercase tracking-[0.35em] text-slate-200">
            {featuredPokemon.dex}
          </div>
          <div className="pokemon-emblem mb-6">
            <div className="pokemon-emblem__core" />
          </div>
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            {featuredPokemon.name}
          </h2>
          <p className="mt-3 max-w-xs text-sm leading-7 text-slate-300 sm:text-base">
            {featuredPokemon.tagline}
          </p>
        </div>
      </Panel>

      <Panel className="section-shell p-6 sm:p-8">
        <Eyebrow>Featured spotlight</Eyebrow>
        <div className="mt-5 max-w-2xl space-y-5">
          <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
            A curated hero keeps the first release fast while still feeling
            alive.
          </h2>
          <p className="text-base leading-8 text-slate-300 sm:text-lg">
            {featuredPokemon.summary}
          </p>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-3">
          {featuredPokemon.traits.map((trait) => (
            <li
              key={trait}
              className="ui-panel ui-panel--card border border-white/10 bg-white/5 px-4 py-4 text-sm leading-6 text-slate-200"
            >
              {trait}
            </li>
          ))}
        </ul>
      </Panel>
    </section>
  );
}

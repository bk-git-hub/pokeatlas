import Image from "next/image";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import type { PokemonDetail } from "@/lib/pokemon";

type PokemonQuickViewProps = {
  pokemon: PokemonDetail;
};

export function PokemonQuickView({ pokemon }: PokemonQuickViewProps) {
  const stats = [
    ["HP", pokemon.stats.hp],
    ["ATK", pokemon.stats.attack],
    ["DEF", pokemon.stats.defense],
    ["SPD", pokemon.stats.speed],
  ] as const;

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-start">
        <Panel className="section-shell px-6 py-6 sm:px-8">
          <div className="space-y-5">
            <Eyebrow>
              {pokemon.dexNumber}
              {pokemon.generation ? ` ${pokemon.generation}` : ""}
            </Eyebrow>

            <div className="space-y-3">
              <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                {pokemon.name}
              </h1>
              <p className="text-base leading-8 text-slate-300">
                {pokemon.flavorText ??
                  `${pokemon.name} is ready for a quick profile preview.`}
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              {pokemon.types.map((type) => (
                <span
                  key={type.slug}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-slate-100"
                >
                  {type.name}
                </span>
              ))}
            </div>

            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              <QuickFact
                label="Genus"
                value={pokemon.genus ?? "Unknown species record"}
              />
              <QuickFact
                label="Height"
                value={`${pokemon.heightMeters.toFixed(1)} m`}
              />
              <QuickFact
                label="Weight"
                value={`${pokemon.weightKilograms.toFixed(1)} kg`}
              />
              <QuickFact label="Total" value={String(pokemon.stats.total)} />
            </div>
          </div>
        </Panel>

        <Panel className="card-surface border border-white/10 p-6" tone="card">
          <div className="flex min-h-72 items-center justify-center rounded-[1.75rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(122,187,255,0.22),_rgba(255,255,255,0.03)_60%)] p-6">
            {pokemon.imageUrl ? (
              <Image
                src={pokemon.imageUrl}
                alt={`${pokemon.name} official artwork`}
                width={280}
                height={280}
                className="h-auto max-h-72 w-full max-w-72 object-contain"
                sizes="(max-width: 1024px) 220px, 280px"
                priority
              />
            ) : (
              <div className="text-center text-sm leading-6 text-slate-400">
                Artwork unavailable
              </div>
            )}
          </div>
          <div className="mt-5 text-sm leading-7 text-slate-300">
            Core battle identity, species cues, and a direct path to the full
            profile.
          </div>
          <div className="mt-5">
            <a
              href={`/pokedex/${pokemon.slug}`}
              className="ui-action ui-action--primary"
            >
              Open full profile
            </a>
          </div>
        </Panel>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(18rem,0.85fr)]">
        <Panel className="section-shell px-6 py-6 sm:px-8">
          <div className="space-y-5">
            <Eyebrow>Battle snapshot</Eyebrow>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map(([label, value]) => (
                <QuickFact key={label} label={label} value={String(value)} />
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="section-shell px-6 py-6 sm:px-8">
          <div className="space-y-5">
            <Eyebrow>Abilities</Eyebrow>
            <div className="grid gap-3">
              {pokemon.abilities.map((ability) => (
                <Panel
                  key={ability.slug}
                  className="rounded-[1.25rem] border border-white/10 p-4"
                  tone="soft"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="text-base font-semibold text-white">
                        {ability.name}
                      </div>
                      <div className="mt-1 text-sm text-slate-300">
                        {ability.isHidden ? "Hidden ability" : "Standard ability"}
                      </div>
                    </div>
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-100">
                      Slot {ability.slot}
                    </span>
                  </div>
                </Panel>
              ))}
            </div>
          </div>
        </Panel>
      </div>
    </div>
  );
}

type QuickFactProps = {
  label: string;
  value: string;
};

function QuickFact({ label, value }: QuickFactProps) {
  return (
    <Panel className="rounded-[1.25rem] border border-white/10 p-4" tone="soft">
      <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
        {label}
      </div>
      <div className="mt-3 text-lg font-semibold text-white">{value}</div>
    </Panel>
  );
}

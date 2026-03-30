import Image from "next/image";

import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import type { PokemonDetail } from "@/lib/pokemon";

type PokemonDetailHeroProps = {
  pokemon: PokemonDetail;
};

export function PokemonDetailHero({ pokemon }: PokemonDetailHeroProps) {
  return (
    <Panel className="section-shell overflow-hidden px-6 py-8 sm:px-8 lg:px-10 lg:py-10">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        aria-hidden="true"
      >
        <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(255,209,102,0.8),_rgba(255,209,102,0))]" />
        <div className="absolute bottom-10 right-10 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(122,187,255,0.24),_rgba(8,12,24,0))]" />
      </div>

      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-center">
        <div className="space-y-6">
          <div className="flex flex-wrap gap-3">
            <ActionLink href="/pokedex" variant="secondary">
              Back to Pokedex
            </ActionLink>
            {pokemon.evolvesFrom ? (
              <ActionLink
                href={`/pokedex/${toPokemonSlug(pokemon.evolvesFrom)}`}
                variant="secondary"
              >
                View {pokemon.evolvesFrom}
              </ActionLink>
            ) : null}
          </div>

          <div className="space-y-4">
            <Eyebrow>
              {pokemon.dexNumber}
              {pokemon.generation ? ` ${pokemon.generation}` : ""}
            </Eyebrow>

            <div className="space-y-3">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
                {pokemon.name}
              </h1>
              <p className="max-w-3xl text-base leading-8 text-slate-300 sm:text-lg">
                {pokemon.flavorText ??
                  `${pokemon.name} now has a dedicated profile inside PokeAtlas, with a stronger read on its stats, biology, and core battle identity.`}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {pokemon.types.map((type) => (
              <span
                key={type.slug}
                className="rounded-full border border-white/10 bg-white/6 px-4 py-2 text-sm font-medium text-slate-100"
              >
                {type.name}
              </span>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <MetricCard
              label="Genus"
              value={pokemon.genus ?? "Unknown species record"}
            />
            <MetricCard
              label="Height"
              value={`${pokemon.heightMeters.toFixed(1)} m`}
            />
            <MetricCard
              label="Weight"
              value={`${pokemon.weightKilograms.toFixed(1)} kg`}
            />
            <MetricCard
              label="Total Stats"
              value={String(pokemon.stats.total)}
            />
          </div>
        </div>

        <Panel
          className="card-surface border border-white/10 p-6 sm:p-8"
          tone="card"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.3em] text-sky-200/80">
                canonical detail
              </p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Official artwork, identity cues, and the first evolution-aware
                summary.
              </p>
            </div>
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-100">
              PK-004
            </span>
          </div>

          <div className="mt-6 flex min-h-80 items-center justify-center rounded-[2rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(122,187,255,0.2),_rgba(255,255,255,0.03)_60%)] p-8">
            {pokemon.imageUrl ? (
              <Image
                src={pokemon.imageUrl}
                alt={`${pokemon.name} official artwork`}
                width={360}
                height={360}
                className="h-auto max-h-80 w-full max-w-80 object-contain"
                sizes="(max-width: 1024px) 260px, 360px"
                priority
              />
            ) : (
              <div className="pokemon-emblem" aria-hidden="true">
                <div className="pokemon-emblem__core" />
              </div>
            )}
          </div>
        </Panel>
      </div>
    </Panel>
  );
}

type MetricCardProps = {
  label: string;
  value: string;
};

function MetricCard({ label, value }: MetricCardProps) {
  return (
    <Panel className="rounded-[1.5rem] border border-white/10 p-4" tone="soft">
      <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
        {label}
      </div>
      <div className="mt-3 text-lg font-semibold text-white">{value}</div>
    </Panel>
  );
}

function toPokemonSlug(value: string) {
  return value.toLowerCase().replace(/\s+/g, "-");
}

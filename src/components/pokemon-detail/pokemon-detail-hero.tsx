import Image from "next/image";

import { ActionLink } from "@/components/ui/action-link";
import type { PokemonDetail } from "@/lib/pokemon/types";

type PokemonDetailHeroProps = {
  pokemon: PokemonDetail;
};

function toTypeLabel(type: PokemonDetail["types"][number]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function PokemonDetailHero({ pokemon }: PokemonDetailHeroProps) {
  const descriptor = [
    pokemon.genus,
    pokemon.habitat ? `Habitat: ${pokemon.habitat}` : null,
    pokemon.shape ? `Shape: ${pokemon.shape}` : null,
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <section className="panel-strong grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_18rem] lg:items-end">
      <div className="space-y-5">
        <div className="space-y-3">
          <p className="section-eyebrow">Pokemon Detail</p>
          <div className="flex flex-wrap items-center gap-3">
            <span className="surface-chip border border-[var(--color-border-soft)] bg-white/80 text-[var(--color-text-primary)]">
              {pokemon.dexNumber}
            </span>
            {pokemon.isLegendary ? (
              <span className="surface-chip surface-chip-highlight">
                Legendary
              </span>
            ) : null}
            {pokemon.isMythical ? (
              <span className="surface-chip surface-chip-highlight">
                Mythical
              </span>
            ) : null}
          </div>
          <h1 className="display-title">{pokemon.displayName}</h1>
          <p className="body-copy max-w-3xl">
            {pokemon.flavorText ??
              "Detailed species flavor text is unavailable for this Pokemon right now."}
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className="surface-chip border border-[var(--color-border-soft)] bg-white/78 text-[var(--color-text-primary)]"
            >
              {toTypeLabel(type)}
            </span>
          ))}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <div className="metric-card">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
              Height
            </p>
            <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
              {pokemon.heightMeters.toFixed(1)} m
            </p>
          </div>
          <div className="metric-card">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
              Weight
            </p>
            <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
              {pokemon.weightKilograms.toFixed(1)} kg
            </p>
          </div>
          <div className="metric-card">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
              Base EXP
            </p>
            <p className="mt-2 text-2xl font-semibold text-[var(--color-text-primary)]">
              {pokemon.baseExperience}
            </p>
          </div>
        </div>

        {descriptor ? (
          <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
            {descriptor}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-3">
          <ActionLink href="/pokedex" variant="secondary">
            Back to Pokedex
          </ActionLink>
        </div>
      </div>

      <div className="panel-soft mx-auto flex w-full max-w-72 items-center justify-center p-6">
        {pokemon.artworkUrl ? (
          <Image
            src={pokemon.artworkUrl}
            alt={`${pokemon.displayName} official artwork`}
            width={288}
            height={288}
            sizes="(max-width: 768px) 60vw, 18rem"
            priority
            className="h-auto w-full object-contain"
          />
        ) : (
          <div className="flex h-64 w-full items-center justify-center rounded-[1.5rem] border border-dashed border-[var(--color-border-soft)] bg-white/70 text-6xl font-semibold text-[var(--color-text-primary)]">
            {pokemon.displayName.charAt(0)}
          </div>
        )}
      </div>
    </section>
  );
}

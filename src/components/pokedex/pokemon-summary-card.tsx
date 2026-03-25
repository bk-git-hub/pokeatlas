import type { PokemonSummary } from "@/lib/pokemon/types";

type PokemonSummaryCardProps = {
  pokemon: PokemonSummary;
};

function toTypeLabel(type: PokemonSummary["types"][number]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function PokemonSummaryCard({ pokemon }: PokemonSummaryCardProps) {
  return (
    <article className="panel-soft flex h-full flex-col gap-5 p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-1">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
            {pokemon.dexNumber}
          </p>
          <h2 className="text-xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
            {pokemon.displayName}
          </h2>
          <p className="text-sm leading-6 text-[var(--color-text-secondary)]">
            Slug: {pokemon.slug}
          </p>
        </div>
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--color-border-soft)] bg-white/80 text-2xl font-semibold text-[var(--color-text-primary)]">
          {pokemon.displayName.charAt(0)}
        </div>
      </div>

      <div className="mt-auto flex flex-wrap gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type}
            className="surface-chip border border-[var(--color-border-soft)] bg-white/78 text-[var(--color-text-primary)]"
          >
            {toTypeLabel(type)}
          </span>
        ))}
      </div>
    </article>
  );
}

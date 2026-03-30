import { SectionHeading } from "@/components/ui/section-heading";
import type { PokemonDetail } from "@/lib/pokemon/types";

type PokemonDetailStatsProps = {
  pokemon: PokemonDetail;
};

function toStatLabel(name: string) {
  return name
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

export function PokemonDetailStats({ pokemon }: PokemonDetailStatsProps) {
  const maxStat = Math.max(...pokemon.stats.map((stat) => stat.baseValue), 1);

  return (
    <section className="panel-soft space-y-5 p-6 sm:p-8" aria-labelledby="detail-stats-heading">
      <SectionHeading
        eyebrow="Battle Profile"
        title="Stats that define how this Pokemon performs."
        titleId="detail-stats-heading"
        description="Base stats and ability slots are normalized from the raw detail payload so this section stays presentation-only."
      />

      <div className="grid gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <div className="space-y-4">
          {pokemon.stats.map((stat) => (
            <div key={stat.name} className="space-y-2">
              <div className="flex items-center justify-between gap-4">
                <p className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {toStatLabel(stat.name)}
                </p>
                <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
                  {stat.baseValue}
                </p>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-white/75">
                <div
                  className="h-full rounded-full bg-[var(--color-accent-secondary)]"
                  style={{ width: `${Math.max(12, (stat.baseValue / maxStat) * 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="panel-strong space-y-4 p-5">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
              Abilities
            </p>
            <ul className="space-y-3">
              {pokemon.abilities.map((ability) => (
                <li key={`${ability.slot}-${ability.name}`} className="rounded-2xl border border-[var(--color-border-soft)] bg-white/80 px-4 py-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-semibold text-[var(--color-text-primary)]">
                      {ability.name}
                    </p>
                    <span className="text-xs uppercase tracking-[0.2em] text-[var(--color-text-secondary)]">
                      Slot {ability.slot}
                    </span>
                  </div>
                  {ability.isHidden ? (
                    <p className="mt-1 text-sm leading-6 text-[var(--color-text-secondary)]">
                      Hidden ability
                    </p>
                  ) : null}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

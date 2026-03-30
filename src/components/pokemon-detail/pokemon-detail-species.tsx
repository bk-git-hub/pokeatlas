import { SectionHeading } from "@/components/ui/section-heading";
import type { PokemonDetail } from "@/lib/pokemon/types";

type PokemonDetailSpeciesProps = {
  pokemon: PokemonDetail;
};

export function PokemonDetailSpecies({ pokemon }: PokemonDetailSpeciesProps) {
  return (
    <section className="panel-soft space-y-5 p-6 sm:p-8" aria-labelledby="detail-species-heading">
      <SectionHeading
        eyebrow="Species Context"
        title="Species details that give the Pokemon more character."
        titleId="detail-species-heading"
        description="Flavor, habitat, and species flags sit beside the battle profile so the detail page reads as one complete reference."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="panel-strong space-y-3 p-5">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
            Flavor Text
          </p>
          <p className="body-copy">
            {pokemon.flavorText ??
              "Flavor text is unavailable for this Pokemon right now."}
          </p>
        </div>

        <div className="grid gap-4">
          <div className="panel-strong p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
              Species
            </p>
            <dl className="mt-4 grid gap-3">
              <div className="flex items-center justify-between gap-4">
                <dt className="text-sm leading-7 text-[var(--color-text-secondary)]">Genus</dt>
                <dd className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {pokemon.genus ?? "Unknown"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-sm leading-7 text-[var(--color-text-secondary)]">Color</dt>
                <dd className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {pokemon.color ?? "Unknown"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-sm leading-7 text-[var(--color-text-secondary)]">Habitat</dt>
                <dd className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {pokemon.habitat ?? "Unknown"}
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt className="text-sm leading-7 text-[var(--color-text-secondary)]">Shape</dt>
                <dd className="text-sm font-semibold text-[var(--color-text-primary)]">
                  {pokemon.shape ?? "Unknown"}
                </dd>
              </div>
            </dl>
          </div>

          <div className="panel-strong p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
              Classification
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="surface-chip border border-[var(--color-border-soft)] bg-white/78 text-[var(--color-text-primary)]">
                {pokemon.isLegendary ? "Legendary" : "Standard"}
              </span>
              <span className="surface-chip border border-[var(--color-border-soft)] bg-white/78 text-[var(--color-text-primary)]">
                {pokemon.isMythical ? "Mythical" : "Non-mythical"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

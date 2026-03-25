import { PageShell } from "@/components/ui/page-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import type { PokemonSummary } from "@/lib/pokemon/types";

import { PokedexEmptyState } from "./pokedex-empty-state";
import { PokedexPagination } from "./pokedex-pagination";
import { PokedexSearchForm } from "./pokedex-search-form";
import { PokemonSummaryCard } from "./pokemon-summary-card";

type PokedexPageProps = {
  pokemon: PokemonSummary[];
  page: number;
  totalPages: number;
  totalCount: number;
  query: string;
  resultRangeLabel: string;
};

export function PokedexPage({
  pokemon,
  page,
  totalPages,
  totalCount,
  query,
  resultRangeLabel,
}: PokedexPageProps) {
  const hasResults = pokemon.length > 0;

  return (
    <PageShell>
      <section className="space-y-5">
        <SectionHeading
          eyebrow="Pokedex Browse"
          title="Browse a focused slice of the Pokedex without losing the shape of the whole roster."
          titleAs="h1"
          description={
            <>
              This first pass stays utility-first: server-rendered summaries,
              URL pagination, and a deliberately shallow name search so PK-003
              can still own the richer filtering experience.
            </>
          }
        />
        <div className="panel-soft flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-[var(--color-text-primary)]">
              {query ? `${totalCount} matches in the shallow search set` : `${totalCount} Pokemon available`}
            </p>
            <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
              {hasResults
                ? `${resultRangeLabel} on page ${page}.`
                : "Search checks names only and does not include PK-003 filtering yet."}
            </p>
          </div>
          <span className="surface-chip border border-[var(--color-border-soft)] bg-white/78 text-[var(--color-text-primary)]">
            {query ? "Searches first 151 names" : "24 summaries per page"}
          </span>
        </div>
      </section>

      <PokedexSearchForm defaultValue={query} />

      {hasResults ? (
        <>
          <section
            className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            aria-label="Pokemon browse results"
          >
            {pokemon.map((entry) => (
              <PokemonSummaryCard key={entry.id} pokemon={entry} />
            ))}
          </section>
          <PokedexPagination page={page} totalPages={totalPages} query={query} />
        </>
      ) : (
        <PokedexEmptyState query={query} />
      )}
    </PageShell>
  );
}

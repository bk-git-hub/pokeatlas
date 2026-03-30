"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { PageShell } from "@/components/ui/page-shell";
import { Panel } from "@/components/ui/panel";
import type { PokemonSummary } from "@/lib/pokemon";

import { TeamBuilderSearchForm } from "./team-builder-search-form";
import { TeamBuilderSearchResults } from "./team-builder-search-results";
import { TeamBuilderSlots } from "./team-builder-slots";
import { TeamBuilderSummary } from "./team-builder-summary";

type TeamBuilderPageProps = {
  query: string;
  searchResults: PokemonSummary[];
};

export function TeamBuilderPage({
  query,
  searchResults,
}: TeamBuilderPageProps) {
  return (
    <PageShell>
      <Panel className="section-shell px-6 py-8 sm:px-8 lg:px-10">
        <div className="space-y-4">
          <Eyebrow>PK-008 Team Builder</Eyebrow>
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
                Draft a six-slot team without leaving the app’s core flow.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
                Search and add Pokemon directly from the builder, refine picks
                from detail pages, and keep the composition summary honest to
                the normalized data already in the product.
              </p>
            </div>

            <Panel className="w-full max-w-sm border border-white/10 p-5" tone="soft">
              <div className="text-sm uppercase tracking-[0.25em] text-sky-200/80">
                Builder mode
              </div>
              <div className="mt-3 text-3xl font-semibold text-white">
                6 slots
              </div>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                Session-scoped drafting only. Persistence and deeper coverage
                math stay out of scope for PK-008.
              </p>
            </Panel>
          </div>
        </div>
      </Panel>

      <TeamBuilderSearchForm query={query} />
      <TeamBuilderSearchResults query={query} results={searchResults} />
      <TeamBuilderSlots />
      <TeamBuilderSummary />
    </PageShell>
  );
}

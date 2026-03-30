"use client";

import { PokedexEmptyState } from "@/components/pokedex/pokedex-empty-state";
import { Panel } from "@/components/ui/panel";

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="page-shell">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <PokedexEmptyState
          title="The Pokedex could not load this view."
          description="Retry the page or jump back to the first page to keep exploring."
          actionHref="/pokedex?page=1"
          actionLabel="Open page 1"
          eyebrow="Pokedex"
        />
        <Panel className="section-shell px-6 py-6 sm:px-8" tone="soft">
          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="ui-action ui-action--primary"
            >
              Retry loading
            </button>
          </div>
        </Panel>
      </div>
    </main>
  );
}

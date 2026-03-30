"use client";

import { PokedexEmptyState } from "@/components/pokedex/pokedex-empty-state";
import { ModalShell } from "@/components/ui/modal-shell";

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <ModalShell title="Quick view unavailable">
      <div className="space-y-4">
        <PokedexEmptyState
          eyebrow="Quick view fallback"
          title="This quick view could not be loaded right now."
          description="Retry the quick view request or return to the browse grid."
          actionHref="/pokedex"
          actionLabel="Return to the Pokedex"
        />
        <div className="flex justify-center">
          <button
            type="button"
            onClick={reset}
            className="ui-action ui-action--secondary"
          >
            Retry quick view
          </button>
        </div>
      </div>
    </ModalShell>
  );
}

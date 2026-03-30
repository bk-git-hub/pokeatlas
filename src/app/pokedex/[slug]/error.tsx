"use client";

import { ActionLink } from "@/components/ui/action-link";

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="app-shell">
      <div className="app-container">
        <section className="panel-strong flex flex-col gap-5 p-8 sm:p-10">
          <div className="space-y-3">
            <p className="section-eyebrow">Detail unavailable</p>
            <h1 className="section-title">
              The detail route could not load this Pokemon right now.
            </h1>
            <p className="body-copy max-w-2xl">
              The canonical detail page depends on several upstream resources.
              Retry the request or return to the Pokedex.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="button"
              onClick={reset}
              className="cta-link cta-link-primary"
            >
              Retry loading
            </button>
            <ActionLink href="/pokedex" variant="secondary">
              Back to Pokedex
            </ActionLink>
          </div>

          <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
            If this keeps happening, try again in a moment. Detailed upstream
            errors stay out of the public UI on purpose.
          </p>
        </section>
      </div>
    </main>
  );
}

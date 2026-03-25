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
            <p className="section-eyebrow">Pokedex unavailable</p>
            <h1 className="section-title">
              The browse route could not load Pokemon right now.
            </h1>
            <p className="body-copy max-w-2xl">
              The first data-backed page hit an upstream issue while loading the
              current browse slice. Retry the request or return to the home
              route.
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
            <ActionLink href="/" variant="secondary">
              Back to home
            </ActionLink>
          </div>

          <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
            If this keeps happening, try again in a moment. We are keeping the
            detailed upstream error out of the public UI on purpose.
          </p>
        </section>
      </div>
    </main>
  );
}

"use client";

import { ActionLink } from "@/components/ui/action-link";
import { Panel } from "@/components/ui/panel";

type ErrorProps = {
  reset: () => void;
};

export default function Error({ reset }: ErrorProps) {
  return (
    <main className="page-shell">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <Panel className="section-shell px-6 py-10 text-center sm:px-8">
          <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4">
            <div className="text-xs uppercase tracking-[0.25em] text-sky-200/75">
              Detail fallback
            </div>
            <h1 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              This Pokemon profile could not be loaded right now.
            </h1>
            <p className="text-base leading-8 text-slate-300">
              The detail route depends on multiple upstream Pokemon resources.
              Retry the request or return to the Pokedex.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={reset}
                className="inline-flex min-h-11 items-center justify-center rounded-full border border-transparent bg-[linear-gradient(135deg,_rgba(122,187,255,0.92),_rgba(68,140,255,0.88))] px-6 text-sm font-medium text-slate-950 transition hover:brightness-110"
              >
                Retry loading
              </button>
              <ActionLink href="/pokedex" variant="secondary">
                Return to the Pokedex
              </ActionLink>
            </div>
          </div>
        </Panel>
      </div>
    </main>
  );
}

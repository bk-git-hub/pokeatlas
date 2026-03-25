import Link from "next/link";

import { quickEntryPoints } from "./home-content";

export function HomeEntryPoints() {
  return (
    <section
      id="journeys"
      className="grid scroll-mt-24 gap-4 lg:grid-cols-3"
      aria-labelledby="journeys-heading"
    >
      <div className="lg:col-span-3 flex items-end justify-between gap-4">
        <div className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
            Main paths
          </p>
          <h2
            id="journeys-heading"
            className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]"
          >
            Jump into the part of the product that matches your question.
          </h2>
        </div>
      </div>

      {quickEntryPoints.map((entry) => (
        <article
          key={entry.title}
          className="group rounded-[1.75rem] border border-white/60 bg-white/80 p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] transition-transform duration-200 hover:-translate-y-1"
        >
          <div className="flex h-full flex-col gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                {entry.kicker}
              </p>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                {entry.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                {entry.description}
              </p>
            </div>
            <div className="mt-auto">
              <Link
                href={entry.href}
                className="inline-flex min-h-11 items-center rounded-full border border-[var(--line)] px-4 text-sm font-semibold text-[var(--foreground)] transition-colors duration-200 hover:border-[var(--brand-sky)] hover:bg-[var(--surface)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-sky)]"
              >
                Open this path
              </Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

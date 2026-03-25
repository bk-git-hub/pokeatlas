import Link from "next/link";

import { journeySections } from "./home-content";

export function HomeJourneySections() {
  return (
    <section className="space-y-5" aria-labelledby="journey-detail-heading">
      <div className="max-w-2xl space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
          Product promise
        </p>
        <h2
          id="journey-detail-heading"
          className="text-3xl font-semibold tracking-[-0.04em] text-[var(--foreground)]"
        >
          PokeAtlas is framed as a decision tool from the first screen.
        </h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {journeySections.map((section) => (
          <article
            id={section.id}
            key={section.id}
            className="scroll-mt-24 rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)] p-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)]"
          >
            <div className="flex h-full flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted-foreground)]">
                Step {section.step}
              </span>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                {section.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--muted-foreground)]">
                {section.description}
              </p>
              <div className="mt-auto pt-4">
                <Link
                  href="/#journeys"
                  className="text-sm font-semibold text-[var(--accent-strong)] underline decoration-[var(--brand-gold)] underline-offset-4"
                >
                  Back to all journeys
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

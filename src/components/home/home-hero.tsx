import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";

import { heroStats } from "./home-content";

export function HomeHero() {
  return (
    <section className="panel-strong relative overflow-hidden rounded-[var(--radius-panel)] px-6 py-8 sm:px-10 sm:py-12 lg:px-12 lg:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-accent-highlight)] to-transparent"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-16 h-48 w-48 rounded-full bg-[radial-gradient(circle,_rgba(251,146,60,0.28)_0%,_rgba(251,146,60,0)_70%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-20 bottom-0 h-56 w-56 rounded-full bg-[radial-gradient(circle,_rgba(56,189,248,0.22)_0%,_rgba(56,189,248,0)_72%)]"
      />

      <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_22rem] lg:items-end">
        <div className="space-y-8">
          <SectionHeading
            eyebrow="PokeAtlas"
            title="The front door for smarter Pokemon browsing, comparison, and team planning."
            titleAs="h1"
            wrapperClassName="space-y-5"
            description={
              <p className="max-w-2xl">
                Start with a broad sweep, drop into a curated spotlight, then
                move through the major PokeAtlas journeys from one clear landing
                page.
              </p>
            }
          />

          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/#journeys" variant="primary">
              Explore journeys
            </ActionLink>
            <ActionLink href="/#spotlight" variant="secondary">
              View featured spotlight
            </ActionLink>
          </div>

          <dl className="grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div key={stat.label} className="metric-card">
                <dt className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--color-text-secondary)]">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="panel-soft relative p-6">
          <div
            aria-hidden="true"
            className="absolute right-6 top-6 h-16 w-16 rounded-full border-[10px] border-[var(--color-accent-primary)] bg-white shadow-[inset_0_-10px_0_rgba(248,250,252,0.9)]"
          >
            <div className="absolute inset-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[var(--color-accent-primary)] bg-white" />
          </div>
          <div className="space-y-6">
            <SectionHeading
              eyebrow="Home brief"
              title="Strong first impression, zero dead-end clicks."
              titleClassName="max-w-xs text-2xl tracking-[-0.03em]"
            />
            <div className="space-y-3 text-sm leading-7 text-[var(--color-text-secondary)]">
              <p>
                Each CTA stays on the home route for now, so the page previews
                the product shape without routing users into unfinished flows.
              </p>
              <p>
                The layout is static and server-rendered, which keeps the first
                paint lean while leaving room for richer browse features later.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import Link from "next/link";

import { heroStats } from "./home-content";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden rounded-[2rem] border border-white/50 bg-[var(--surface-strong)] px-6 py-8 shadow-[0_30px_90px_rgba(15,23,42,0.14)] sm:px-10 sm:py-12 lg:px-12 lg:py-14">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--brand-gold)] to-transparent"
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
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--muted-foreground)]">
              PokeAtlas
            </p>
            <div className="space-y-4">
              <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-[var(--foreground)] sm:text-5xl lg:text-6xl">
                The front door for smarter Pokemon browsing, comparison, and
                team planning.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-[var(--muted-foreground)] sm:text-lg">
                Start with a broad sweep, drop into a curated spotlight, then
                move through the major PokeAtlas journeys from one clear landing
                page.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/#journeys"
              className="inline-flex min-h-12 items-center justify-center rounded-full bg-[var(--brand-red)] px-6 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-red)]"
            >
              Explore journeys
            </Link>
            <Link
              href="/#spotlight"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-[var(--line)] bg-white/70 px-6 text-sm font-semibold text-[var(--foreground)] transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--brand-sky)]"
            >
              View featured spotlight
            </Link>
          </div>

          <dl className="grid gap-3 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/60 bg-white/72 px-4 py-4 backdrop-blur"
              >
                <dt className="text-xs font-medium uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                  {stat.label}
                </dt>
                <dd className="mt-2 text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative rounded-[1.75rem] border border-white/60 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(255,247,237,0.84))] p-6 shadow-[0_18px_45px_rgba(15,23,42,0.12)]">
          <div
            aria-hidden="true"
            className="absolute right-6 top-6 h-16 w-16 rounded-full border-[10px] border-[var(--brand-red)] bg-white shadow-[inset_0_-10px_0_rgba(248,250,252,0.9)]"
          >
            <div className="absolute inset-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-[var(--brand-red)] bg-white" />
          </div>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[var(--muted-foreground)]">
                Home brief
              </p>
              <h2 className="mt-3 max-w-xs text-2xl font-semibold tracking-[-0.03em] text-[var(--foreground)]">
                Strong first impression, zero dead-end clicks.
              </h2>
            </div>
            <div className="space-y-3 text-sm leading-7 text-[var(--muted-foreground)]">
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

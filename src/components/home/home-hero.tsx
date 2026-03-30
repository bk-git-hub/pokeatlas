import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";

import { heroHighlights, heroMetrics } from "@/content/home";

export function HomeHero() {
  return (
    <Panel className="section-shell overflow-hidden px-6 py-10 sm:px-10 sm:py-14 lg:px-14 lg:py-16">
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-1/2 lg:block"
        aria-hidden="true"
      >
        <div className="absolute bottom-12 right-24 h-56 w-56 rounded-full border border-white/20" />
        <div className="absolute bottom-24 right-0 h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(122,187,255,0.3),_rgba(8,12,24,0))]" />
      </div>

      <div className="grid gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)] lg:items-end">
        <div className="space-y-7">
          <Eyebrow>PokeAtlas</Eyebrow>
          <div className="space-y-5">
            <h1 className="max-w-3xl text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl lg:text-7xl">
              Explore Pokemon with a cleaner Pokedex, sharper profiles, and a
              team builder built for actual decisions.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              PokeAtlas gives you one place to browse the roster, inspect key
              details fast, and shape a balanced six-slot lineup without
              wrestling raw API output.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <ActionLink href="/pokedex" variant="primary">
              Browse the Pokedex
            </ActionLink>
            <ActionLink href="#spotlight" variant="secondary">
              Meet the spotlight
            </ActionLink>
          </div>

          <ul className="grid gap-3 text-sm text-slate-200 sm:grid-cols-3">
            {heroHighlights.map((highlight) => (
              <li
                key={highlight}
                className="ui-panel ui-panel--card card-surface min-h-24 border border-white/10 px-4 py-4 leading-6"
              >
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <Panel
          className="card-surface border border-white/10 p-6 sm:p-8"
          tone="card"
        >
          <div className="mb-6 flex items-center justify-between">
            <p className="font-mono text-xs uppercase tracking-[0.35em] text-sky-200/80">
              product snapshot
            </p>
            <span className="rounded-full border border-amber-300/30 bg-amber-300/10 px-3 py-1 text-xs font-medium text-amber-100">
              Curated spotlight
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {heroMetrics.map((metric) => (
              <Panel key={metric.label} className="rounded-3xl p-4" tone="soft">
                <div className="text-3xl font-semibold text-white">
                  {metric.value}
                </div>
                <div className="mt-2 text-sm leading-6 text-slate-300">
                  {metric.label}
                </div>
              </Panel>
            ))}
          </div>
        </Panel>
      </div>
    </Panel>
  );
}

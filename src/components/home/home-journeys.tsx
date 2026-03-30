import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";

import { journeyCards, signals } from "@/content/home";

export function HomeJourneys() {
  return (
    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
      <Panel id="journeys" className="section-shell p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <Eyebrow>Core journeys</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Choose how you want to explore.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-slate-300 sm:text-base">
            Browse the roster, open full Pokemon profiles, or start building a
            team from the same product surface.
          </p>
        </div>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          {journeyCards.map((journey) => (
            <Panel
              key={journey.name}
              className="card-surface flex h-full flex-col border border-white/10 p-5"
              tone="card"
            >
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-xl font-semibold text-white">
                  {journey.name}
                </h3>
                <span className="rounded-full border border-sky-300/25 bg-sky-300/10 px-3 py-1 text-xs font-medium text-sky-100">
                  {journey.status}
                </span>
              </div>
              <p className="mt-4 flex-1 text-sm leading-7 text-slate-300">
                {journey.description}
              </p>
              <ActionLink className="mt-6" href={journey.href} variant="inline">
                Open this area
              </ActionLink>
            </Panel>
          ))}
        </div>
      </Panel>

      <Panel id="signals" className="section-shell p-6 sm:p-8">
        <Eyebrow>What you can do here</Eyebrow>
        <div className="mt-5 space-y-4">
          {signals.map((signal) => (
            <Panel
              key={signal.title}
              className="border border-white/10 p-5"
              tone="soft"
            >
              <h3 className="text-lg font-semibold text-white">
                {signal.title}
              </h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">
                {signal.body}
              </p>
            </Panel>
          ))}
        </div>
      </Panel>
    </section>
  );
}

import { SectionHeading } from "@/components/ui/section-heading";

import { spotlight } from "./home-content";

export function HomeSpotlight() {
  return (
    <section
      id={spotlight.id}
      className="panel-inverse grid scroll-mt-24 gap-6 rounded-[var(--radius-panel)] px-6 py-8 sm:px-8 lg:grid-cols-[minmax(0,1fr)_20rem] lg:px-10"
      aria-labelledby="spotlight-heading"
    >
      <div className="space-y-6">
        <div className="space-y-4">
          <SectionHeading
            eyebrow="Curated spotlight"
            title={spotlight.name}
            inverse
            titleId="spotlight-heading"
            wrapperClassName="space-y-3"
          />
          <div className="flex flex-wrap items-baseline gap-3">
            <span className="text-sm font-medium uppercase tracking-[0.24em] text-white/55">
              {spotlight.index}
            </span>
          </div>
          <p className="max-w-2xl text-base leading-8 text-slate-200">
            {spotlight.summary}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          {spotlight.types.map((type) => (
            <span key={type} className="surface-chip surface-chip-inverse">
              {type}
            </span>
          ))}
          <span className="surface-chip surface-chip-highlight">
            {spotlight.category}
          </span>
        </div>

        <ul className="space-y-3 text-sm leading-7 text-slate-200">
          {spotlight.traits.map((trait) => (
            <li key={trait} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-2 h-2.5 w-2.5 rounded-full bg-[var(--color-accent-highlight)]"
              />
              <span>{trait}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-[var(--radius-card)] border border-white/10 bg-[var(--color-surface-inverse-overlay)] p-5 backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/55">
              Spotlight stats
            </p>
            <p className="mt-2 text-xl font-semibold tracking-[-0.03em]">
              Built to show comparisons clearly
            </p>
          </div>
          <div
            aria-hidden="true"
            className="h-16 w-16 rounded-full bg-[radial-gradient(circle,_rgba(248,250,252,0.92)_0%,_rgba(248,250,252,0.15)_68%,_rgba(248,250,252,0)_72%)]"
          />
        </div>

        <dl className="mt-8 space-y-5">
          {spotlight.stats.map((stat) => (
            <div key={stat.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <dt className="text-white/70">{stat.label}</dt>
                <dd className="font-semibold">{stat.value}</dd>
              </div>
              <div className="h-2 rounded-full bg-white/10">
                <div
                  className="h-2 rounded-full bg-gradient-to-r from-[var(--color-accent-highlight)] via-[var(--color-accent-primary)] to-[var(--color-accent-secondary)]"
                  style={{ width: `${stat.value}%` }}
                />
              </div>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

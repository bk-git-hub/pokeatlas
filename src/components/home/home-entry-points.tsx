import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";

import { quickEntryPoints } from "./home-content";

export function HomeEntryPoints() {
  return (
    <section
      id="journeys"
      className="grid scroll-mt-24 gap-4 lg:grid-cols-3"
      aria-labelledby="journeys-heading"
    >
      <div className="lg:col-span-3">
        <SectionHeading
          eyebrow="Main paths"
          title="Jump into the part of the product that matches your question."
          titleId="journeys-heading"
          wrapperClassName="max-w-2xl space-y-3"
        />
      </div>

      {quickEntryPoints.map((entry) => (
        <article
          key={entry.title}
          className="panel-soft group p-6 transition-transform duration-200 hover:-translate-y-1"
        >
          <div className="flex h-full flex-col gap-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                {entry.kicker}
              </p>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                {entry.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
                {entry.description}
              </p>
            </div>
            <div className="mt-auto">
              <ActionLink href={entry.href} variant="subtle" className="min-h-11 px-4">
                Open this path
              </ActionLink>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}

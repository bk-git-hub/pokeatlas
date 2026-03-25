import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";

import { journeySections } from "./home-content";

export function HomeJourneySections() {
  return (
    <section className="space-y-5" aria-labelledby="journey-detail-heading">
      <SectionHeading
        eyebrow="Product promise"
        title="PokeAtlas is framed as a decision tool from the first screen."
        titleId="journey-detail-heading"
        wrapperClassName="max-w-2xl space-y-3"
      />

      <div className="grid gap-4 lg:grid-cols-3">
        {journeySections.map((section) => (
          <article
            id={section.id}
            key={section.id}
            className="panel-strong scroll-mt-24 p-6"
          >
            <div className="flex h-full flex-col gap-4">
              <span className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
                Step {section.step}
              </span>
              <h3 className="text-2xl font-semibold tracking-[-0.03em] text-[var(--color-text-primary)]">
                {section.title}
              </h3>
              <p className="text-sm leading-7 text-[var(--color-text-secondary)]">
                {section.description}
              </p>
              <div className="mt-auto pt-4">
                <ActionLink
                  href="/#journeys"
                  variant="subtle"
                  className="text-link-accent min-h-0 justify-start border-none bg-transparent px-0 py-0 hover:bg-transparent"
                >
                  Back to all journeys
                </ActionLink>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

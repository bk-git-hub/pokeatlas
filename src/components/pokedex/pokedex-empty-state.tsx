import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";

type PokedexEmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  eyebrow?: string;
  query?: string;
  type?: string | null;
};

export function PokedexEmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  eyebrow = "Pokedex",
  query,
  type,
}: PokedexEmptyStateProps) {
  const hasFilters = Boolean(query || type);

  return (
    <Panel className="section-shell px-6 py-10 text-center sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          {title}
        </h2>
        <p className="text-base leading-8 text-slate-300">{description}</p>
        {hasFilters ? (
          <div className="flex flex-wrap justify-center gap-2">
            {query ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-100">
                Query: {query}
              </span>
            ) : null}
            {type ? (
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-100">
                Type: {type}
              </span>
            ) : null}
          </div>
        ) : null}
        {actionHref && actionLabel ? (
          <ActionLink href={actionHref} variant="primary">
            {actionLabel}
          </ActionLink>
        ) : null}
      </div>
    </Panel>
  );
}

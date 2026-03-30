import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";

type PokedexEmptyStateProps = {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
  eyebrow?: string;
};

export function PokedexEmptyState({
  title,
  description,
  actionHref,
  actionLabel,
  eyebrow = "Browse fallback",
}: PokedexEmptyStateProps) {
  return (
    <Panel className="section-shell px-6 py-10 text-center sm:px-8">
      <div className="mx-auto flex max-w-2xl flex-col items-center space-y-4">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
          {title}
        </h2>
        <p className="text-base leading-8 text-slate-300">{description}</p>
        {actionHref && actionLabel ? (
          <ActionLink href={actionHref} variant="primary">
            {actionLabel}
          </ActionLink>
        ) : null}
      </div>
    </Panel>
  );
}

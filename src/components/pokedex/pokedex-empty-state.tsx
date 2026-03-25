import { ActionLink } from "@/components/ui/action-link";

type PokedexEmptyStateProps = {
  query: string;
};

export function PokedexEmptyState({ query }: PokedexEmptyStateProps) {
  return (
    <section className="panel-strong flex flex-col gap-4 p-8 text-center sm:p-10">
      <p className="section-eyebrow">No results</p>
      <h2 className="section-title">
        No Pokemon matched “{query}” in this shallow browse search.
      </h2>
      <p className="body-copy mx-auto max-w-2xl">
        PK-002 keeps search intentionally narrow. This pass only checks names
        inside the first 151 Pokemon so the browse route stays fast and easy to
        reason about before PK-003 adds fuller narrowing tools.
      </p>
      <div className="flex justify-center">
        <ActionLink href="/pokedex" variant="secondary">
          Back to the full browse page
        </ActionLink>
      </div>
    </section>
  );
}

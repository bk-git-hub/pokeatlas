import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";

type PokedexHeaderProps = {
  currentPage: number;
  totalCount: number;
  query: string;
  type: string | null;
};

export function PokedexHeader({
  currentPage,
  totalCount,
  query,
  type,
}: PokedexHeaderProps) {
  const hasFilters = Boolean(query || type);

  return (
    <Panel className="section-shell overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
      <div className="space-y-4">
        <Eyebrow>{hasFilters ? "PK-003 Browse Filters" : "PK-002 Pokedex Browse"}</Eyebrow>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {hasFilters
                ? "Refine the roster without leaving the browse flow."
                : "Explore a calmer slice of the Pokedex."}
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {hasFilters
                ? "Search by name and narrow by primary type while keeping the same server-rendered browse route, card layout, and shareable URLs."
                : "Browse normalized Pokemon summaries with a cleaner card layout, useful stat snapshots, and URL-driven pagination that is easy to revisit and share."}
            </p>
            {hasFilters ? (
              <div className="flex flex-wrap gap-2 pt-2">
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
          </div>

          <Panel
            className="w-full max-w-sm border border-white/10 p-5"
            tone="soft"
          >
            <div className="text-sm uppercase tracking-[0.25em] text-sky-200/80">
              Browse status
            </div>
            <div className="mt-3 text-3xl font-semibold text-white">
              {totalCount.toLocaleString()}
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              {hasFilters
                ? `Pokemon match the current filter set. You are on page ${currentPage}.`
                : `Pokemon available through the normalized browse layer. You are on page ${currentPage}.`}
            </p>
          </Panel>
        </div>
      </div>
    </Panel>
  );
}

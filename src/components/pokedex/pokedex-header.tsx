import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";

type PokedexHeaderProps = {
  currentPage: number;
  totalCount: number;
};

export function PokedexHeader({
  currentPage,
  totalCount,
}: PokedexHeaderProps) {
  return (
    <Panel className="section-shell overflow-hidden px-6 py-8 sm:px-8 lg:px-10">
      <div className="space-y-4">
        <Eyebrow>PK-002 Pokedex Browse</Eyebrow>
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl space-y-3">
            <h1 className="text-4xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              Explore a calmer slice of the Pokedex.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              Browse normalized Pokemon summaries with a cleaner card layout,
              useful stat snapshots, and URL-driven pagination that is easy to
              revisit and share.
            </p>
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
              Pokemon available through the normalized browse layer. You are on
              page {currentPage}.
            </p>
          </Panel>
        </div>
      </div>
    </Panel>
  );
}

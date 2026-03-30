import { ActionLink } from "@/components/ui/action-link";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import type { BrowseTypeFilter } from "@/lib/pokedex/query";

type PokedexControlsProps = {
  query: string;
  type: BrowseTypeFilter | null;
  typeOptions: readonly BrowseTypeFilter[];
};

export function PokedexControls({
  query,
  type,
  typeOptions,
}: PokedexControlsProps) {
  return (
    <Panel className="section-shell px-6 py-6 sm:px-8" tone="section">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-3">
          <Eyebrow>Search and filter</Eyebrow>
          <div className="max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            Search by name or dex number, then narrow the roster by type.
          </div>
        </div>

        <form action="/pokedex" className="grid gap-3 sm:grid-cols-[minmax(0,1.2fr)_13rem_auto]">
          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Search name
            </span>
            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Search by name or dex number"
              className="min-h-12 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-sky-300/60 focus:bg-white/8"
            />
          </label>

          <label className="space-y-2">
            <span className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Type
            </span>
            <select
              name="type"
              defaultValue={type ?? ""}
              className="min-h-12 w-full rounded-full border border-white/10 bg-[#0d1628] px-4 text-sm text-white outline-none transition focus:border-sky-300/60"
            >
              <option value="">All types</option>
              {typeOptions.map((typeOption) => (
                <option key={typeOption} value={typeOption}>
                  {capitalizeLabel(typeOption)}
                </option>
              ))}
            </select>
          </label>

          <div className="flex gap-3 sm:items-end">
            <button type="submit" className="ui-action ui-action--primary min-h-12 px-5">
              Apply
            </button>
            {query || type ? (
              <ActionLink href="/pokedex" variant="secondary" className="min-h-12 px-5">
                Clear
              </ActionLink>
            ) : null}
          </div>
        </form>
      </div>
    </Panel>
  );
}

function capitalizeLabel(value: string) {
  return value.slice(0, 1).toUpperCase() + value.slice(1);
}

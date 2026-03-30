import Link from "next/link";

type PokedexSearchFormProps = {
  defaultValue: string;
};

export function PokedexSearchForm({ defaultValue }: PokedexSearchFormProps) {
  return (
    <form
      action="/pokedex"
      className="panel-soft flex flex-col gap-3 p-4 sm:flex-row sm:items-end"
      role="search"
    >
      <label className="flex-1 space-y-2">
        <span className="text-sm font-semibold text-[var(--color-text-primary)]">
          Search by Pokemon name
        </span>
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Search this browse view"
          className="w-full rounded-2xl border border-[var(--color-border-soft)] bg-white/82 px-4 py-3 text-sm text-[var(--color-text-primary)] outline-none transition-colors placeholder:text-[var(--color-text-secondary)] focus:border-[var(--color-accent-secondary)]"
        />
      </label>
      <div className="flex gap-3">
        <button
          type="submit"
          className="cta-link cta-link-primary"
        >
          Search
        </button>
        {defaultValue ? (
          <Link href="/pokedex" className="cta-link cta-link-secondary">
            Clear
          </Link>
        ) : null}
      </div>
    </form>
  );
}

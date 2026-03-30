type TeamBuilderSearchFormProps = {
  query: string;
};

export function TeamBuilderSearchForm({
  query,
}: TeamBuilderSearchFormProps) {
  return (
    <form
      action="/team-builder"
      className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]"
    >
      <label className="space-y-2">
        <span className="text-xs uppercase tracking-[0.22em] text-slate-400">
          Search Pokemon
        </span>
        <input
          type="search"
          name="q"
          defaultValue={query}
          placeholder="Search by Pokemon name"
          className="min-h-12 w-full rounded-full border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-sky-300/60 focus:bg-white/8"
        />
      </label>

      <div className="flex gap-3 sm:items-end">
        <button
          type="submit"
          className="ui-action ui-action--primary min-h-12 px-5"
        >
          Search
        </button>
        {query ? (
          <a href="/team-builder" className="ui-action ui-action--secondary min-h-12 px-5">
            Clear
          </a>
        ) : null}
      </div>
    </form>
  );
}

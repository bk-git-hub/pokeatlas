import { PokedexEmptyState } from "@/components/pokedex/pokedex-empty-state";

export default function NotFound() {
  return (
    <main className="page-shell">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <PokedexEmptyState
          eyebrow="Detail fallback"
          title="That Pokemon could not be found."
          description="The requested profile does not map to a known Pokemon slug or dex lookup in the current PokeAtlas data source."
          actionHref="/pokedex"
          actionLabel="Return to the Pokedex"
        />
      </div>
    </main>
  );
}

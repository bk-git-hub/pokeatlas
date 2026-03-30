import type { Metadata } from "next";

import { PokedexEmptyState } from "@/components/pokedex/pokedex-empty-state";
import { PokedexHeader } from "@/components/pokedex/pokedex-header";
import { PokedexPagination } from "@/components/pokedex/pokedex-pagination";
import { PokemonSummaryCard } from "@/components/pokedex/pokemon-summary-card";
import { pokemonService, PokemonServiceError } from "@/lib/pokemon";
import { parseBrowsePage } from "@/lib/pokedex/query";

const PAGE_SIZE = 24;

type PokedexPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Pokedex Browse | PokeAtlas",
  description:
    "Browse normalized Pokemon summaries with shareable pagination in PokeAtlas.",
};

export default async function PokedexPage({
  searchParams,
}: PokedexPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseBrowsePage(resolvedSearchParams);
  const state = await getPokedexPageState(currentPage);

  if (state.kind === "error") {
    return (
      <main className="page-shell">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <PokedexEmptyState
            title="The Pokedex is temporarily unavailable."
            description={state.description}
            actionHref="/pokedex?page=1"
            actionLabel="Try the first page"
          />
        </div>
      </main>
    );
  }

  if (state.kind === "empty") {
    return (
      <main className="page-shell">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <PokedexEmptyState
            title="That page has no Pokemon on it."
            description="The requested page falls outside the current browse window. Jump back to the first page and keep exploring from there."
            actionHref="/pokedex?page=1"
            actionLabel="Return to page 1"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <PokedexHeader
          currentPage={currentPage}
          totalCount={state.summaryPage.totalCount}
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {state.summaryPage.items.map((pokemon) => (
            <PokemonSummaryCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </section>

        <PokedexPagination
          currentPage={currentPage}
          totalPages={state.totalPages}
        />
      </div>
    </main>
  );
}

type PokedexPageState =
  | {
      kind: "ready";
      summaryPage: Awaited<ReturnType<typeof pokemonService.listSummaries>>;
      totalPages: number;
    }
  | {
      kind: "empty";
    }
  | {
      kind: "error";
      description: string;
    };

async function getPokedexPageState(
  currentPage: number,
): Promise<PokedexPageState> {
  const offset = (currentPage - 1) * PAGE_SIZE;

  try {
    const summaryPage = await pokemonService.listSummaries({
      limit: PAGE_SIZE,
      offset,
    });
    const totalPages = Math.max(1, Math.ceil(summaryPage.totalCount / PAGE_SIZE));

    if (summaryPage.items.length === 0) {
      return { kind: "empty" };
    }

    return {
      kind: "ready",
      summaryPage,
      totalPages,
    };
  } catch (error) {
    return {
      kind: "error",
      description:
        error instanceof PokemonServiceError
          ? "PokeAtlas could not load the current Pokedex slice from the Pokemon service. Please try again in a moment."
          : "Something unexpected happened while loading the browse route.",
    };
  }
}

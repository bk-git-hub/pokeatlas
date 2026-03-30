import type { Metadata } from "next";

import { PokedexControls } from "@/components/pokedex/pokedex-controls";
import { PokedexEmptyState } from "@/components/pokedex/pokedex-empty-state";
import { PokedexHeader } from "@/components/pokedex/pokedex-header";
import { PokedexPagination } from "@/components/pokedex/pokedex-pagination";
import { PokemonSummaryCard } from "@/components/pokedex/pokemon-summary-card";
import { pokemonService, PokemonServiceError } from "@/lib/pokemon";
import {
  browseTypeFilters,
  parseBrowsePage,
  parseBrowseQuery,
  parseBrowseType,
} from "@/lib/pokedex/query";

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
  const query = parseBrowseQuery(resolvedSearchParams);
  const type = parseBrowseType(resolvedSearchParams);
  const state = await getPokedexPageState({
    currentPage,
    query,
    type,
  });

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
          <PokedexHeader
            currentPage={currentPage}
            totalCount={state.totalCount}
            query={query}
            type={type}
          />
          <PokedexControls
            query={query}
            type={type}
            typeOptions={browseTypeFilters}
          />
          <PokedexEmptyState
            title={
              state.reason === "filters"
                ? "No Pokemon matched that filter set."
                : "That page has no Pokemon on it."
            }
            description={
              state.reason === "filters"
                ? "Try a broader name search, switch to another primary type, or clear the filters to reopen the full browse catalog."
                : "The requested page falls outside the current browse window. Jump back to the first page and keep exploring from there."
            }
            actionHref={
              state.reason === "filters" ? "/pokedex" : createBrowseHref(1, query, type)
            }
            actionLabel={
              state.reason === "filters" ? "Clear filters" : "Return to page 1"
            }
            eyebrow={state.reason === "filters" ? "No matches" : "Browse fallback"}
            query={query}
            type={type}
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
          query={query}
          type={type}
        />
        <PokedexControls
          query={query}
          type={type}
          typeOptions={browseTypeFilters}
        />

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {state.summaryPage.items.map((pokemon) => (
            <PokemonSummaryCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </section>

        <PokedexPagination
          currentPage={currentPage}
          totalPages={state.totalPages}
          query={query}
          type={type}
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
      reason: "filters" | "page";
      totalCount: number;
    }
  | {
      kind: "error";
      description: string;
    };

type GetPokedexPageStateOptions = {
  currentPage: number;
  query: string;
  type: typeof browseTypeFilters[number] | null;
};

async function getPokedexPageState({
  currentPage,
  query,
  type,
}: GetPokedexPageStateOptions): Promise<PokedexPageState> {
  const offset = (currentPage - 1) * PAGE_SIZE;

  try {
    const summaryPage = await pokemonService.listSummaries({
      limit: PAGE_SIZE,
      offset,
      query,
      type,
    });
    const totalPages = Math.max(1, Math.ceil(summaryPage.totalCount / PAGE_SIZE));

    if (summaryPage.items.length === 0) {
      return {
        kind: "empty",
        reason: summaryPage.totalCount === 0 ? "filters" : "page",
        totalCount: summaryPage.totalCount,
      };
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

function createBrowseHref(
  page: number,
  query: string,
  type: typeof browseTypeFilters[number] | null,
) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));

  if (query) {
    searchParams.set("q", query);
  }

  if (type) {
    searchParams.set("type", type);
  }

  return `/pokedex?${searchParams.toString()}`;
}

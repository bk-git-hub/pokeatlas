import type { Metadata } from "next";

import { PokedexControls } from "@/components/pokedex/pokedex-controls";
import { PokedexEmptyState } from "@/components/pokedex/pokedex-empty-state";
import { PokedexHeader } from "@/components/pokedex/pokedex-header";
import { PokedexPagination } from "@/components/pokedex/pokedex-pagination";
import { PokemonSummaryCard } from "@/components/pokedex/pokemon-summary-card";
import { PokemonQuickView } from "@/components/pokemon-detail/pokemon-quick-view";
import { ModalShell } from "@/components/ui/modal-shell";
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
  title: "Browse the Pokedex",
  description:
    "Search, filter, and page through the Pokedex in PokeAtlas to find the Pokemon you want faster.",
  alternates: {
    canonical: "/pokedex",
  },
  openGraph: {
    title: "Browse the Pokedex",
    description:
      "Search, filter, and page through the Pokedex in PokeAtlas to find the Pokemon you want faster.",
    url: "/pokedex",
  },
  twitter: {
    title: "Browse the Pokedex",
    description:
      "Search, filter, and page through the Pokedex in PokeAtlas to find the Pokemon you want faster.",
  },
};

export default async function PokedexPage({
  searchParams,
}: PokedexPageProps) {
  const resolvedSearchParams = await searchParams;
  const currentPage = parseBrowsePage(resolvedSearchParams);
  const query = parseBrowseQuery(resolvedSearchParams);
  const type = parseBrowseType(resolvedSearchParams);
  const quickView = parseQuickView(resolvedSearchParams);
  const state = await getPokedexPageState({
    currentPage,
    query,
    type,
  });
  const quickViewState = quickView
    ? await getQuickViewState(quickView)
    : null;

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
                ? "Try a broader name or dex-number search, switch to another type, or clear the filters to reopen the full browse catalog."
                : "The requested page falls outside the current browse window. Jump back to the first page and keep exploring from there."
            }
            actionHref={
              state.reason === "filters" ? "/pokedex" : createBrowseHref(1, query, type)
            }
            actionLabel={
              state.reason === "filters" ? "Clear filters" : "Return to page 1"
            }
            eyebrow={state.reason === "filters" ? "No matches" : "Pokedex"}
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
            <PokemonSummaryCard
              key={pokemon.id}
              pokemon={pokemon}
              quickViewHref={createBrowseHref(
                currentPage,
                query,
                type,
                pokemon.slug,
              )}
            />
          ))}
        </section>

        <PokedexPagination
          currentPage={currentPage}
          totalPages={state.totalPages}
          query={query}
          type={type}
        />
      </div>
      {quickViewState ? (
        <QuickViewModal
          state={quickViewState}
          fallbackHref={createBrowseHref(currentPage, query, type)}
        />
      ) : null}
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

type QuickViewState =
  | {
      kind: "ready";
      pokemon: Awaited<ReturnType<typeof pokemonService.getDetail>>;
    }
  | {
      kind: "not-found";
    }
  | {
      kind: "error";
      description: string;
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
          : "Something unexpected happened while loading the Pokedex.",
      };
  }
}

async function getQuickViewState(lookup: string): Promise<QuickViewState> {
  try {
    const pokemon = await pokemonService.getDetail(lookup);
    return { kind: "ready", pokemon };
  } catch (error) {
    if (error instanceof PokemonServiceError && error.status === 404) {
      return { kind: "not-found" };
    }

    return {
      kind: "error",
      description:
        error instanceof PokemonServiceError
          ? "PokeAtlas could not load this Pokemon quick view from the Pokemon service. Please try again in a moment."
          : "Something unexpected happened while loading this Pokemon quick view.",
    };
  }
}

function parseQuickView(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const raw = searchParams["quick-view"];
  if (Array.isArray(raw)) {
    return raw[0] || null;
  }

  return raw || null;
}

function createBrowseHref(
  page: number,
  query: string,
  type: typeof browseTypeFilters[number] | null,
  quickView?: string | null,
) {
  const searchParams = new URLSearchParams();
  searchParams.set("page", String(page));

  if (query) {
    searchParams.set("q", query);
  }

  if (type) {
    searchParams.set("type", type);
  }

  if (quickView) {
    searchParams.set("quick-view", quickView);
  }

  return `/pokedex?${searchParams.toString()}`;
}

type QuickViewModalProps = {
  state: QuickViewState;
  fallbackHref: string;
};

function QuickViewModal({ state, fallbackHref }: QuickViewModalProps) {
  if (state.kind === "not-found") {
    return (
      <ModalShell title="Pokemon not found" fallbackHref={fallbackHref}>
        <PokedexEmptyState
          eyebrow="Quick view"
          title="That Pokemon could not be found."
          description="The requested quick view does not map to a known Pokemon profile in the current PokeAtlas data source."
          actionHref={fallbackHref}
          actionLabel="Return to the Pokedex"
        />
      </ModalShell>
    );
  }

  if (state.kind === "error") {
    return (
      <ModalShell title="Quick view unavailable" fallbackHref={fallbackHref}>
        <PokedexEmptyState
          eyebrow="Quick view"
          title="This quick view is temporarily unavailable."
          description={state.description}
          actionHref={fallbackHref}
          actionLabel="Return to the Pokedex"
        />
      </ModalShell>
    );
  }

  return (
    <ModalShell
      title={`${state.pokemon.name} quick view`}
      fallbackHref={fallbackHref}
    >
      <PokemonQuickView pokemon={state.pokemon} />
    </ModalShell>
  );
}

import { cache } from "react";

import { PokedexEmptyState } from "@/components/pokedex/pokedex-empty-state";
import { PokemonQuickView } from "@/components/pokemon-detail/pokemon-quick-view";
import { ModalShell } from "@/components/ui/modal-shell";
import { pokemonService, PokemonServiceError } from "@/lib/pokemon";

type QuickViewPageProps = {
  params: Promise<{ pokemon: string }>;
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

const getQuickViewState = cache(
  async (lookup: string): Promise<QuickViewState> => {
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
  },
);

export default async function QuickViewPage({ params }: QuickViewPageProps) {
  const { pokemon } = await params;
  const state = await getQuickViewState(pokemon);

  if (state.kind === "not-found") {
    return (
      <ModalShell title="Pokemon not found">
        <PokedexEmptyState
          eyebrow="Quick view fallback"
          title="That Pokemon could not be found."
          description="The requested quick view does not map to a known Pokemon profile in the current PokeAtlas data source."
          actionHref="/pokedex"
          actionLabel="Return to the Pokedex"
        />
      </ModalShell>
    );
  }

  if (state.kind === "error") {
    return (
      <ModalShell title="Quick view unavailable">
        <PokedexEmptyState
          eyebrow="Quick view fallback"
          title="This quick view is temporarily unavailable."
          description={state.description}
          actionHref="/pokedex"
          actionLabel="Return to the Pokedex"
        />
      </ModalShell>
    );
  }

  return (
    <ModalShell title={`${state.pokemon.name} quick view`}>
      <PokemonQuickView pokemon={state.pokemon} />
    </ModalShell>
  );
}

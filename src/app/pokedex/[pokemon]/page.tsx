import { cache } from "react";

import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { PokedexEmptyState } from "@/components/pokedex/pokedex-empty-state";
import { PokemonDetailEvolution } from "@/components/pokemon-detail/pokemon-detail-evolution";
import { PokemonDetailHero } from "@/components/pokemon-detail/pokemon-detail-hero";
import { PokemonDetailProfile } from "@/components/pokemon-detail/pokemon-detail-profile";
import { PokemonDetailStats } from "@/components/pokemon-detail/pokemon-detail-stats";
import { pokemonService, PokemonServiceError } from "@/lib/pokemon";

type PokemonDetailPageProps = {
  params: Promise<{ pokemon: string }>;
};

type PokemonDetailState =
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

const getPokemonDetailState = cache(
  async (lookup: string): Promise<PokemonDetailState> => {
    try {
      const pokemon = await pokemonService.getDetail(lookup);

      return {
        kind: "ready",
        pokemon,
      };
    } catch (error) {
      if (error instanceof PokemonServiceError && error.status === 404) {
        return { kind: "not-found" };
      }

      return {
        kind: "error",
        description:
          error instanceof PokemonServiceError
            ? "PokeAtlas could not load this Pokemon profile from the Pokemon service. Please try again in a moment."
            : "Something unexpected happened while loading this Pokemon profile.",
      };
    }
  },
);

export async function generateMetadata({
  params,
}: PokemonDetailPageProps): Promise<Metadata> {
  const { pokemon } = await params;
  const state = await getPokemonDetailState(pokemon);

  if (state.kind !== "ready") {
    return {
      title: "Pokemon Detail | PokeAtlas",
      description:
        "Explore a Pokemon profile with stats, species context, and evolution cues in PokeAtlas.",
    };
  }

  return {
    title: `${state.pokemon.name} | PokeAtlas`,
    description:
      state.pokemon.flavorText ??
      `Explore ${state.pokemon.name} in PokeAtlas with stats, abilities, species context, and evolution cues.`,
  };
}

export default async function PokemonDetailPage({
  params,
}: PokemonDetailPageProps) {
  const { pokemon } = await params;
  const state = await getPokemonDetailState(pokemon);

  if (state.kind === "not-found") {
    notFound();
  }

  if (state.kind === "error") {
    return (
      <main className="page-shell">
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
          <PokedexEmptyState
            eyebrow="Detail fallback"
            title="This Pokemon profile is temporarily unavailable."
            description={state.description}
            actionHref="/pokedex"
            actionLabel="Return to the Pokedex"
          />
        </div>
      </main>
    );
  }

  return (
    <main className="page-shell">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <PokemonDetailHero pokemon={state.pokemon} />
        <PokemonDetailStats pokemon={state.pokemon} />
        <PokemonDetailProfile pokemon={state.pokemon} />
        <PokemonDetailEvolution pokemon={state.pokemon} />
      </div>
    </main>
  );
}

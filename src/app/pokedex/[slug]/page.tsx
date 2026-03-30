import { notFound } from "next/navigation";

import { PokemonDetailPage } from "@/components/pokemon-detail/pokemon-detail-page";
import {
  getPokemonDetailBundleRaw,
  isPokeApiNotFoundError,
} from "@/lib/pokeapi/client";
import { normalizePokemonDetailPageData } from "@/lib/pokemon/normalize";

type PokemonDetailPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function normalizeSlug(slug: string) {
  return decodeURIComponent(slug).trim().toLowerCase();
}

async function loadPokemonDetail(slug: string) {
  try {
    const rawDetail = await getPokemonDetailBundleRaw(slug);

    return normalizePokemonDetailPageData(
      rawDetail.pokemon,
      rawDetail.species,
      rawDetail.evolutionChain,
    );
  } catch (error) {
    if (isPokeApiNotFoundError(error)) {
      notFound();
    }

    throw error;
  }
}

export default async function Page({ params }: PokemonDetailPageProps) {
  const { slug } = await params;
  const normalizedSlug = normalizeSlug(slug);

  if (!normalizedSlug) {
    notFound();
  }

  const detail = await loadPokemonDetail(normalizedSlug);

  return <PokemonDetailPage detail={detail} />;
}

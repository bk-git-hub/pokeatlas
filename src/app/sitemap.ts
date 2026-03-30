import type { MetadataRoute } from "next";

import { getPokemonListRaw } from "@/lib/pokeapi/client";
import { absoluteUrl, buildPokemonDetailPath } from "@/lib/metadata/site";

export const revalidate = 86400;

async function getCanonicalPokemonSlugs() {
  const { count } = await getPokemonListRaw(1, 0);
  const { results } = await getPokemonListRaw(count, 0);

  return results.map((pokemon) => pokemon.name);
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: absoluteUrl("/pokedex"),
      lastModified,
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/team-builder"),
      lastModified,
      changeFrequency: "weekly",
      priority: 0.7,
    },
  ];

  const pokemonSlugs = await getCanonicalPokemonSlugs();

  return [
    ...staticRoutes,
    ...pokemonSlugs.map((slug) => ({
      url: absoluteUrl(buildPokemonDetailPath(slug)),
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}

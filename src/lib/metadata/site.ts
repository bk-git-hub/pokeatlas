const DEFAULT_SITE_URL = "https://pokeatlas.app";

export const SITE_NAME = "PokeAtlas";
export const SITE_DESCRIPTION =
  "Browse the Pokedex, inspect shareable Pokemon profiles, and draft stronger teams in PokeAtlas.";

function normalizeSiteUrl(value: string) {
  const trimmedValue = value.trim().replace(/\/+$/, "");

  if (!trimmedValue) {
    return DEFAULT_SITE_URL;
  }

  if (trimmedValue.startsWith("http://") || trimmedValue.startsWith("https://")) {
    return trimmedValue;
  }

  return `https://${trimmedValue}`;
}

export function getSiteUrl() {
  return normalizeSiteUrl(
    process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL ?? DEFAULT_SITE_URL,
  );
}

export function getMetadataBase() {
  return new URL(getSiteUrl());
}

export function absoluteUrl(path: string) {
  return new URL(path, getMetadataBase()).toString();
}

export function buildPokemonDetailPath(slug: string) {
  return `/pokedex/${slug}`;
}

export function buildPokemonOgImagePath(slug: string) {
  return `${buildPokemonDetailPath(slug)}/opengraph-image`;
}

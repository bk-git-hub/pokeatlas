import type {
  PokemonApiResponse,
  PokemonSpeciesApiResponse,
} from "../pokeapi/types";

import type {
  PokemonAbility,
  PokemonDetail,
  PokemonStat,
  PokemonStatName,
  PokemonSummary,
  PokemonTypeName,
} from "./types";

const ENGLISH_LANGUAGE = "en";
const OFFICIAL_ARTWORK_KEY = "official-artwork";

function toTitleCase(value: string) {
  return value
    .split("-")
    .map((segment) => segment.charAt(0).toUpperCase() + segment.slice(1))
    .join(" ");
}

function toDexNumber(id: number) {
  return `#${String(id).padStart(4, "0")}`;
}

function toPokemonTypeName(value: string): PokemonTypeName {
  return value as PokemonTypeName;
}

function toPokemonStatName(value: string): PokemonStatName {
  return value as PokemonStatName;
}

function normalizeFlavorText(entries: PokemonSpeciesApiResponse["flavor_text_entries"]) {
  const englishEntry = entries.find((entry) => entry.language.name === ENGLISH_LANGUAGE);

  return englishEntry
    ? englishEntry.flavor_text.replace(/\f/g, " ").replace(/\s+/g, " ").trim()
    : null;
}

function normalizeGenus(entries: PokemonSpeciesApiResponse["genera"]) {
  const englishEntry = entries.find((entry) => entry.language.name === ENGLISH_LANGUAGE);
  return englishEntry?.genus ?? null;
}

function normalizeEvolutionChainId(url: string) {
  const match = url.match(/\/evolution-chain\/(\d+)\/?$/);
  return match?.[1] ?? null;
}

function normalizeArtworkUrl(sprites: PokemonApiResponse["sprites"]) {
  return (
    sprites.other?.[OFFICIAL_ARTWORK_KEY]?.front_default ??
    sprites.front_default ??
    null
  );
}

function normalizeAbilities(
  abilities: PokemonApiResponse["abilities"],
): PokemonAbility[] {
  return abilities
    .toSorted((left, right) => left.slot - right.slot)
    .map((ability) => ({
      name: ability.ability.name,
      isHidden: ability.is_hidden,
      slot: ability.slot,
    }));
}

function normalizeStats(stats: PokemonApiResponse["stats"]): PokemonStat[] {
  return stats.map((stat) => ({
    name: toPokemonStatName(stat.stat.name),
    baseValue: stat.base_stat,
    effort: stat.effort,
  }));
}

export function normalizePokemonSummary(raw: PokemonApiResponse): PokemonSummary {
  const types = raw.types
    .toSorted((left, right) => left.slot - right.slot)
    .map((typeSlot) => toPokemonTypeName(typeSlot.type.name));

  return {
    id: raw.id,
    slug: raw.name,
    name: raw.name,
    displayName: toTitleCase(raw.name),
    dexNumber: toDexNumber(raw.id),
    artworkUrl: normalizeArtworkUrl(raw.sprites),
    primaryType: types[0],
    types,
  };
}

export function normalizePokemonDetail(
  raw: PokemonApiResponse,
  species: PokemonSpeciesApiResponse,
): PokemonDetail {
  const summary = normalizePokemonSummary(raw);

  return {
    ...summary,
    baseExperience: raw.base_experience,
    heightMeters: raw.height / 10,
    weightKilograms: raw.weight / 10,
    abilities: normalizeAbilities(raw.abilities),
    stats: normalizeStats(raw.stats),
    color: species.color.name,
    genus: normalizeGenus(species.genera),
    flavorText: normalizeFlavorText(species.flavor_text_entries),
    habitat: species.habitat?.name ?? null,
    shape: species.shape?.name ?? null,
    isLegendary: species.is_legendary,
    isMythical: species.is_mythical,
    evolutionChainId: normalizeEvolutionChainId(species.evolution_chain.url),
  };
}

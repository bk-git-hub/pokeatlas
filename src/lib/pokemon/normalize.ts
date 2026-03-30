import type {
  EvolutionChainApiResponse,
  EvolutionChainLinkApiResponse,
  EvolutionDetailApiResponse,
  PokemonApiResponse,
  PokemonSpeciesApiResponse,
} from "../pokeapi/types";

import type {
  PokemonAbility,
  PokemonDetailPageData,
  PokemonEvolutionNode,
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

function normalizeResourceId(url: string) {
  const match = url.match(/\/(\d+)\/?$/);
  return match ? Number.parseInt(match[1], 10) : null;
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

function normalizeEvolutionRequirements(details: EvolutionDetailApiResponse[]) {
  return details.flatMap((detail) => {
    const requirements: string[] = [];

    if (detail.min_level) {
      requirements.push(`Level ${detail.min_level}`);
    }

    if (detail.item) {
      requirements.push(`Use ${toTitleCase(detail.item.name)}`);
    }

    if (detail.held_item) {
      requirements.push(`Hold ${toTitleCase(detail.held_item.name)}`);
    }

    if (detail.trade_species) {
      requirements.push(`Trade for ${toTitleCase(detail.trade_species.name)}`);
    }

    if (detail.known_move) {
      requirements.push(`Know ${toTitleCase(detail.known_move.name)}`);
    }

    if (detail.location) {
      requirements.push(`At ${toTitleCase(detail.location.name)}`);
    }

    if (detail.min_happiness) {
      requirements.push(`High friendship (${detail.min_happiness}+)`);
    }

    if (detail.min_affection) {
      requirements.push(`High affection (${detail.min_affection}+)`);
    }

    if (detail.time_of_day) {
      requirements.push(`During the ${detail.time_of_day}`);
    }

    if (!requirements.length) {
      requirements.push(toTitleCase(detail.trigger.name));
    }

    return requirements;
  });
}

function normalizeEvolutionNode(
  raw: EvolutionChainLinkApiResponse,
  currentSlug: string,
  requirements: string[] = [],
): PokemonEvolutionNode {
  const id = normalizeResourceId(raw.species.url);

  return {
    id,
    slug: raw.species.name,
    displayName: toTitleCase(raw.species.name),
    dexNumber: id ? toDexNumber(id) : null,
    isBaby: raw.is_baby,
    isCurrent: raw.species.name === currentSlug,
    requirements,
    evolvesTo: raw.evolves_to.map((child) =>
      normalizeEvolutionNode(
        child,
        currentSlug,
        normalizeEvolutionRequirements(child.evolution_details),
      ),
    ),
  };
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

export function normalizePokemonEvolutionChain(
  raw: EvolutionChainApiResponse,
  currentSlug: string,
): PokemonEvolutionNode | null {
  if (!raw.chain) {
    return null;
  }

  return normalizeEvolutionNode(raw.chain, currentSlug);
}

export function normalizePokemonDetailPageData(
  raw: PokemonApiResponse,
  species: PokemonSpeciesApiResponse,
  evolutionChain: EvolutionChainApiResponse,
): PokemonDetailPageData {
  const pokemon = normalizePokemonDetail(raw, species);

  return {
    pokemon,
    evolutionChain: normalizePokemonEvolutionChain(evolutionChain, raw.name),
  };
}

const DEFAULT_PAGE = 1;
const BROWSE_TYPE_FILTERS = [
  "normal",
  "fire",
  "water",
  "electric",
  "grass",
  "ice",
  "fighting",
  "poison",
  "ground",
  "flying",
  "psychic",
  "bug",
  "rock",
  "ghost",
  "dragon",
  "dark",
  "steel",
  "fairy",
] as const;

type SearchParamValue = string | string[] | undefined;
export type BrowseTypeFilter = (typeof BROWSE_TYPE_FILTERS)[number];

function getSingleValue(value: SearchParamValue) {
  return Array.isArray(value) ? value[0] : value;
}

function parsePositiveInteger(value: string | undefined, fallback: number) {
  const parsedValue = Number(value);

  if (!Number.isInteger(parsedValue) || parsedValue < 1) {
    return fallback;
  }

  return parsedValue;
}

export function parseBrowsePage(
  searchParams: Record<string, SearchParamValue>,
) {
  return parsePositiveInteger(getSingleValue(searchParams.page), DEFAULT_PAGE);
}

export function parseBrowseQuery(
  searchParams: Record<string, SearchParamValue>,
) {
  return (getSingleValue(searchParams.q) ?? "").trim().toLowerCase();
}

export function parseBrowseType(
  searchParams: Record<string, SearchParamValue>,
): BrowseTypeFilter | null {
  const type = (getSingleValue(searchParams.type) ?? "").trim().toLowerCase();

  if (!type || !BROWSE_TYPE_FILTERS.includes(type as BrowseTypeFilter)) {
    return null;
  }

  return type as BrowseTypeFilter;
}

export const browseTypeFilters = BROWSE_TYPE_FILTERS;

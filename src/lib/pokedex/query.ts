const DEFAULT_PAGE = 1;

type SearchParamValue = string | string[] | undefined;

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

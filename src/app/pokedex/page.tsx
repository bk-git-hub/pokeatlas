import { PokedexPage } from "@/components/pokedex/pokedex-page";
import { getPokemonListRaw, getPokemonRaw } from "@/lib/pokeapi/client";
import { normalizePokemonSummary } from "@/lib/pokemon/normalize";

const PAGE_SIZE = 24;
const SHALLOW_SEARCH_LIMIT = 151;

type SearchParamValue = string | string[] | undefined;

type PokedexPageProps = {
  searchParams?: Promise<{
    page?: SearchParamValue;
    q?: SearchParamValue;
  }>;
};

function readStringParam(value: SearchParamValue) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}

function parsePageParam(value: SearchParamValue) {
  const page = Number.parseInt(readStringParam(value), 10);
  return Number.isFinite(page) && page > 0 ? page : 1;
}

function parseQueryParam(value: SearchParamValue) {
  return readStringParam(value).trim().toLowerCase();
}

function clampPage(page: number, totalPages: number) {
  return Math.min(Math.max(page, 1), Math.max(totalPages, 1));
}

function formatRangeLabel(start: number, end: number, total: number) {
  return `Showing ${start}-${end} of ${total}`;
}

export default async function Page({ searchParams }: PokedexPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const requestedPage = parsePageParam(resolvedSearchParams.page);
  const query = parseQueryParam(resolvedSearchParams.q);

  if (query) {
    const list = await getPokemonListRaw(SHALLOW_SEARCH_LIMIT, 0);
    const filteredEntries = list.results.filter((entry) =>
      entry.name.includes(query),
    );

    const totalCount = filteredEntries.length;
    const totalPages = Math.max(1, Math.ceil(totalCount / PAGE_SIZE));
    const page = clampPage(requestedPage, totalPages);
    const startIndex = (page - 1) * PAGE_SIZE;
    const pageEntries = filteredEntries.slice(startIndex, startIndex + PAGE_SIZE);
    const pagePokemon = await Promise.all(
      pageEntries.map((entry) => getPokemonRaw(entry.name)),
    );
    const pokemon = pagePokemon.map(normalizePokemonSummary);
    const rangeLabel = totalCount
      ? formatRangeLabel(startIndex + 1, startIndex + pokemon.length, totalCount)
      : "No matches";

    return (
      <PokedexPage
        pokemon={pokemon}
        page={page}
        totalPages={totalPages}
        totalCount={totalCount}
        query={query}
        resultRangeLabel={rangeLabel}
      />
    );
  }

  const totalPageList = await getPokemonListRaw(PAGE_SIZE, (requestedPage - 1) * PAGE_SIZE);
  const totalPages = Math.max(1, Math.ceil(totalPageList.count / PAGE_SIZE));
  const page = clampPage(requestedPage, totalPages);
  const offset = (page - 1) * PAGE_SIZE;
  const list = page === requestedPage ? totalPageList : await getPokemonListRaw(PAGE_SIZE, offset);
  const pagePokemon = await Promise.all(
    list.results.map((entry) => getPokemonRaw(entry.name)),
  );
  const pokemon = pagePokemon.map(normalizePokemonSummary);
  const rangeLabel = formatRangeLabel(
    offset + 1,
    offset + pokemon.length,
    list.count,
  );

  return (
    <PokedexPage
      pokemon={pokemon}
      page={page}
      totalPages={totalPages}
      totalCount={list.count}
      query=""
      resultRangeLabel={rangeLabel}
    />
  );
}

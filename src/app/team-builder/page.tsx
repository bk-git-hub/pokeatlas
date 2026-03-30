import type { Metadata } from "next";

import { TeamBuilderPage } from "@/components/team-builder/team-builder-page";
import { pokemonService } from "@/lib/pokemon";

type TeamBuilderRouteProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
};

export const metadata: Metadata = {
  title: "Team Builder | PokeAtlas",
  description:
    "Draft a six-slot Pokemon team, search for additions, and review a lightweight composition summary in PokeAtlas.",
};

function getQuery(
  searchParams: Record<string, string | string[] | undefined>,
) {
  const rawValue = searchParams.q;
  const query = Array.isArray(rawValue) ? rawValue[0] ?? "" : rawValue ?? "";
  return query.trim().toLowerCase();
}

export default async function TeamBuilderRoute({
  searchParams,
}: TeamBuilderRouteProps) {
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const query = getQuery(resolvedSearchParams);

  const searchResults = query
    ? (await pokemonService.listSummaries({
        limit: 12,
        query,
      })).items
    : [];

  return <TeamBuilderPage query={query} searchResults={searchResults} />;
}

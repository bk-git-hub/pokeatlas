import { PageShell } from "@/components/ui/page-shell";
import type { PokemonDetailPageData } from "@/lib/pokemon/types";

import { PokemonDetailEvolution } from "./pokemon-detail-evolution";
import { PokemonDetailHero } from "./pokemon-detail-hero";
import { PokemonDetailSpecies } from "./pokemon-detail-species";
import { PokemonDetailStats } from "./pokemon-detail-stats";

type PokemonDetailPageProps = {
  detail: PokemonDetailPageData;
};

export function PokemonDetailPage({ detail }: PokemonDetailPageProps) {
  return (
    <PageShell>
      <PokemonDetailHero pokemon={detail.pokemon} />
      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
        <div className="grid gap-4">
          <PokemonDetailStats pokemon={detail.pokemon} />
          <PokemonDetailEvolution evolutionChain={detail.evolutionChain} />
        </div>
        <PokemonDetailSpecies pokemon={detail.pokemon} />
      </section>
    </PageShell>
  );
}

import Image from "next/image";

import { ActionLink } from "@/components/ui/action-link";
import { Panel } from "@/components/ui/panel";
import type { PokemonSummary } from "@/lib/pokemon";

type PokemonSummaryCardProps = {
  pokemon: PokemonSummary;
};

export function PokemonSummaryCard({ pokemon }: PokemonSummaryCardProps) {
  const detailHref = `/pokedex/${pokemon.slug}`;

  return (
    <Panel
      className="card-surface flex h-full flex-col border border-white/10 p-5"
      tone="card"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-sky-200/75">
            {pokemon.dexNumber}
          </div>
          <h2 className="mt-3 text-2xl font-semibold text-white">
            {pokemon.name}
          </h2>
        </div>
        <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200">
          {pokemon.primaryType?.name ?? "Unknown"}
        </div>
      </div>

      <div className="mt-5 flex min-h-40 items-center justify-center rounded-[1.5rem] border border-white/10 bg-[radial-gradient(circle_at_top,_rgba(122,187,255,0.18),_rgba(255,255,255,0.02)_60%)] p-4">
        {pokemon.imageUrl ? (
          <Image
            src={pokemon.imageUrl}
            alt={`${pokemon.name} official artwork`}
            width={220}
            height={220}
            className="h-40 w-40 object-contain"
            sizes="(max-width: 768px) 160px, 220px"
          />
        ) : (
          <div className="text-center text-sm leading-6 text-slate-400">
            Artwork unavailable
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {pokemon.types.map((type) => (
          <span
            key={type.slug}
            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-200"
          >
            {type.name}
          </span>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2">
        <StatCell label="HP" value={pokemon.stats.hp} />
        <StatCell label="ATK" value={pokemon.stats.attack} />
        <StatCell label="SPD" value={pokemon.stats.speed} />
      </div>

      <div className="mt-6 flex items-center justify-between gap-4 border-t border-white/10 pt-4">
        <div className="text-sm text-slate-300">
          Total stats:{" "}
          <span className="font-semibold text-white">{pokemon.stats.total}</span>
        </div>
        <div className="flex items-center gap-3">
          <ActionLink href={detailHref} variant="secondary" className="px-4">
            Quick view
          </ActionLink>
          <a href={detailHref} className="ui-action ui-action--inline">
            Open profile
          </a>
        </div>
      </div>
    </Panel>
  );
}

type StatCellProps = {
  label: string;
  value: number;
};

function StatCell({ label, value }: StatCellProps) {
  return (
    <Panel className="p-3 text-center" tone="soft">
      <div className="text-xs uppercase tracking-[0.2em] text-slate-400">
        {label}
      </div>
      <div className="mt-2 text-xl font-semibold text-white">{value}</div>
    </Panel>
  );
}

import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import type { PokemonDetail } from "@/lib/pokemon";

type PokemonDetailStatsProps = {
  pokemon: PokemonDetail;
};

const MAX_BASE_STAT = 255;

export function PokemonDetailStats({ pokemon }: PokemonDetailStatsProps) {
  const statRows = [
    { label: "HP", value: pokemon.stats.hp },
    { label: "Attack", value: pokemon.stats.attack },
    { label: "Defense", value: pokemon.stats.defense },
    { label: "Sp. Attack", value: pokemon.stats.specialAttack },
    { label: "Sp. Defense", value: pokemon.stats.specialDefense },
    { label: "Speed", value: pokemon.stats.speed },
  ];

  return (
    <Panel className="section-shell px-6 py-8 sm:px-8">
      <div className="space-y-6">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <Eyebrow>Battle readout</Eyebrow>
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
              Base stat profile
            </h2>
          </div>
          <Panel
            className="rounded-[1.5rem] border border-white/10 px-5 py-4"
            tone="soft"
          >
            <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
              Total
            </div>
            <div className="mt-2 text-3xl font-semibold text-white">
              {pokemon.stats.total}
            </div>
          </Panel>
        </div>

        <div className="grid gap-4">
          {statRows.map((stat) => (
            <StatRow key={stat.label} label={stat.label} value={stat.value} />
          ))}
        </div>
      </div>
    </Panel>
  );
}

type StatRowProps = {
  label: string;
  value: number;
};

function StatRow({ label, value }: StatRowProps) {
  const width = `${Math.max(12, Math.round((value / MAX_BASE_STAT) * 100))}%`;

  return (
    <div className="grid gap-3 md:grid-cols-[8rem_minmax(0,1fr)_4rem] md:items-center">
      <div className="text-sm font-medium uppercase tracking-[0.22em] text-slate-300">
        {label}
      </div>
      <div className="h-3 rounded-full bg-white/8">
        <div
          className="h-full rounded-full bg-[linear-gradient(90deg,_rgba(255,209,102,1),_rgba(255,123,84,0.9))]"
          style={{ width }}
        />
      </div>
      <div className="text-right text-lg font-semibold text-white">{value}</div>
    </div>
  );
}

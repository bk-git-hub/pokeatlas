import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import type { PokemonDetail } from "@/lib/pokemon";

type PokemonDetailProfileProps = {
  pokemon: PokemonDetail;
};

export function PokemonDetailProfile({
  pokemon,
}: PokemonDetailProfileProps) {
  const profileFacts = [
    { label: "Primary Type", value: pokemon.primaryType?.name ?? "Unknown" },
    { label: "Color", value: pokemon.color ?? "Unknown" },
    { label: "Habitat", value: pokemon.habitat ?? "Unknown" },
    { label: "Shape", value: pokemon.shape ?? "Unknown" },
    {
      label: "Capture Rate",
      value:
        pokemon.captureRate !== null ? String(pokemon.captureRate) : "Unknown",
    },
    {
      label: "Base Happiness",
      value:
        pokemon.baseHappiness !== null
          ? String(pokemon.baseHappiness)
          : "Unknown",
    },
  ];

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(18rem,0.95fr)]">
      <Panel className="section-shell px-6 py-8 sm:px-8">
        <div className="space-y-5">
          <Eyebrow>Species profile</Eyebrow>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {profileFacts.map((fact) => (
              <Panel
                key={fact.label}
                className="rounded-[1.5rem] border border-white/10 p-4"
                tone="soft"
              >
                <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
                  {fact.label}
                </div>
                <div className="mt-3 text-lg font-semibold text-white">
                  {fact.value}
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </Panel>

      <Panel className="section-shell px-6 py-8 sm:px-8">
        <div className="space-y-5">
          <Eyebrow>Abilities</Eyebrow>
          <div className="grid gap-3">
            {pokemon.abilities.map((ability) => (
              <Panel
                key={ability.slug}
                className="rounded-[1.5rem] border border-white/10 p-4"
                tone="soft"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-semibold text-white">
                      {ability.name}
                    </div>
                    <div className="mt-1 text-sm text-slate-300">
                      {ability.isHidden ? "Hidden ability" : "Standard ability"}
                    </div>
                  </div>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-sky-100">
                    Slot {ability.slot}
                  </span>
                </div>
              </Panel>
            ))}
          </div>
        </div>
      </Panel>
    </div>
  );
}

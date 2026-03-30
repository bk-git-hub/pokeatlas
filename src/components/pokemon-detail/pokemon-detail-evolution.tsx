import { SectionHeading } from "@/components/ui/section-heading";
import type { PokemonEvolutionNode } from "@/lib/pokemon/types";

type PokemonDetailEvolutionProps = {
  evolutionChain: PokemonEvolutionNode | null;
};

type EvolutionNodeCardProps = {
  node: PokemonEvolutionNode;
  depth?: number;
};

function EvolutionNodeCard({ node, depth = 0 }: EvolutionNodeCardProps) {
  return (
    <li className="space-y-3">
      <div className="rounded-[1.5rem] border border-[var(--color-border-soft)] bg-white/82 p-4 shadow-[var(--shadow-soft)]">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--color-text-secondary)]">
              {node.dexNumber ?? "Unknown dex"}
            </p>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)]">
              {node.displayName}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {node.isCurrent ? (
              <span className="surface-chip surface-chip-highlight">
                Current detail
              </span>
            ) : null}
            {node.isBaby ? (
              <span className="surface-chip border border-[var(--color-border-soft)] bg-white/78 text-[var(--color-text-primary)]">
                Baby stage
              </span>
            ) : null}
          </div>
        </div>

        {node.requirements.length ? (
          <ul className="mt-4 flex flex-wrap gap-2">
            {node.requirements.map((requirement) => (
              <li
                key={requirement}
                className="surface-chip border border-[var(--color-border-soft)] bg-white/78 text-[var(--color-text-primary)]"
              >
                {requirement}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      {node.evolvesTo.length ? (
        <ul
          className="grid gap-3 border-l border-dashed border-[var(--color-border-soft)] pl-4"
          style={{ marginLeft: depth ? 12 : 0 }}
        >
          {node.evolvesTo.map((child) => (
            <EvolutionNodeCard key={`${child.slug}-${child.dexNumber ?? "unknown"}`} node={child} depth={depth + 1} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function PokemonDetailEvolution({
  evolutionChain,
}: PokemonDetailEvolutionProps) {
  return (
    <section className="panel-soft space-y-5 p-6 sm:p-8" aria-labelledby="detail-evolution-heading">
      <SectionHeading
        eyebrow="Evolution Path"
        title="Branching evolution data stays intact so the chain reads like the real roster."
        titleId="detail-evolution-heading"
        description="The normalized model preserves branch structure instead of flattening every species into a single line."
      />

      {evolutionChain ? (
        <ul className="space-y-3">
          <EvolutionNodeCard node={evolutionChain} />
        </ul>
      ) : (
        <div className="panel-strong p-5">
          <p className="body-copy">
            Evolution data is unavailable for this Pokemon right now.
          </p>
        </div>
      )}
    </section>
  );
}

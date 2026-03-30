"use client";

import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import { summarizeTeam } from "@/lib/team-builder/summary";

import { useTeamBuilder } from "./team-builder-provider";

export function TeamBuilderSummary() {
  const { team } = useTeamBuilder();
  const summary = summarizeTeam(team);

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1.05fr)_minmax(18rem,0.95fr)]">
      <Panel className="section-shell px-6 py-6 sm:px-8">
        <div className="space-y-5">
          <Eyebrow>Composition summary</Eyebrow>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            <SummaryFact label="Members" value={String(summary.membersCount)} />
            <SummaryFact label="Open slots" value={String(summary.openSlots)} />
            <SummaryFact
              label="Duplicate types"
              value={String(summary.duplicateTypeSlots)}
            />
            <SummaryFact
              label="Average total"
              value={String(summary.averageStats.total)}
            />
          </div>
        </div>
      </Panel>

      <Panel className="section-shell px-6 py-6 sm:px-8">
        <div className="space-y-5">
          <Eyebrow>Type distribution</Eyebrow>
          {summary.typeDistribution.length > 0 ? (
            <div className="grid gap-3">
              {summary.typeDistribution.map((entry) => (
                <Panel
                  key={entry.slug}
                  className="rounded-[1.25rem] border border-white/10 p-4"
                  tone="soft"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="text-base font-semibold text-white">
                      {entry.name}
                    </div>
                    <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm font-medium text-sky-100">
                      {entry.count}
                    </div>
                  </div>
                </Panel>
              ))}
            </div>
          ) : (
            <div className="text-sm leading-7 text-slate-300">
              Type distribution will appear once you add Pokemon to the team.
            </div>
          )}
        </div>
      </Panel>
    </div>
  );
}

function SummaryFact({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <Panel className="rounded-[1.25rem] border border-white/10 p-4" tone="soft">
      <div className="text-xs uppercase tracking-[0.22em] text-slate-400">
        {label}
      </div>
      <div className="mt-3 text-lg font-semibold text-white">{value}</div>
    </Panel>
  );
}

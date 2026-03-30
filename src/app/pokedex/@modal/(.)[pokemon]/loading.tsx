import { ModalShell } from "@/components/ui/modal-shell";
import { Panel } from "@/components/ui/panel";

export default function Loading() {
  return (
    <ModalShell title="Loading quick view">
      <div className="space-y-6">
        <Panel className="section-shell px-6 py-6 sm:px-8">
          <div className="space-y-4">
            <div className="h-4 w-40 rounded-full bg-white/10" />
            <div className="h-12 max-w-xl rounded-3xl bg-white/10" />
            <div className="h-5 max-w-2xl rounded-3xl bg-white/10" />
            <div className="flex gap-2">
              <div className="h-9 w-24 rounded-full bg-white/10" />
              <div className="h-9 w-24 rounded-full bg-white/10" />
            </div>
          </div>
        </Panel>
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <Panel className="section-shell px-6 py-6 sm:px-8">
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => (
                <div
                  key={index}
                  className="h-24 rounded-[1.25rem] bg-white/10"
                />
              ))}
            </div>
          </Panel>
          <Panel className="card-surface border border-white/10 p-6" tone="card">
            <div className="h-80 rounded-[1.75rem] bg-white/10" />
          </Panel>
        </div>
      </div>
    </ModalShell>
  );
}

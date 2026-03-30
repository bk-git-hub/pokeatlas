import { Panel } from "@/components/ui/panel";

export default function Loading() {
  return (
    <main className="page-shell">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <Panel className="section-shell px-6 py-8 sm:px-8 lg:px-10">
          <div className="space-y-4">
            <div className="h-4 w-40 rounded-full bg-white/10" />
            <div className="h-12 max-w-2xl rounded-3xl bg-white/10" />
            <div className="h-5 max-w-3xl rounded-3xl bg-white/10" />
          </div>
        </Panel>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 9 }, (_, index) => (
            <Panel
              key={index}
              className="card-surface border border-white/10 p-5"
              tone="card"
            >
              <div className="space-y-4">
                <div className="h-4 w-16 rounded-full bg-white/10" />
                <div className="h-8 w-40 rounded-3xl bg-white/10" />
                <div className="h-40 rounded-[1.5rem] bg-white/10" />
                <div className="flex gap-2">
                  <div className="h-8 w-20 rounded-full bg-white/10" />
                  <div className="h-8 w-20 rounded-full bg-white/10" />
                </div>
              </div>
            </Panel>
          ))}
        </section>
      </div>
    </main>
  );
}

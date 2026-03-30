import { Panel } from "@/components/ui/panel";

export default function Loading() {
  return (
    <main className="page-shell">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <Panel className="section-shell px-6 py-8 sm:px-8 lg:px-10">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] lg:items-center">
            <div className="space-y-4">
              <div className="h-4 w-44 rounded-full bg-white/10" />
              <div className="h-16 max-w-2xl rounded-3xl bg-white/10" />
              <div className="h-5 max-w-3xl rounded-3xl bg-white/10" />
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                {Array.from({ length: 4 }, (_, index) => (
                  <div
                    key={index}
                    className="h-24 rounded-[1.5rem] bg-white/10"
                  />
                ))}
              </div>
            </div>
            <div className="h-96 rounded-[2rem] bg-white/10" />
          </div>
        </Panel>

        <Panel className="section-shell px-6 py-8 sm:px-8">
          <div className="space-y-4">
            <div className="h-4 w-40 rounded-full bg-white/10" />
            <div className="h-12 w-56 rounded-3xl bg-white/10" />
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="h-10 rounded-full bg-white/10" />
            ))}
          </div>
        </Panel>
      </div>
    </main>
  );
}

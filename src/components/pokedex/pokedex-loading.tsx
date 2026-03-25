import { PageShell } from "@/components/ui/page-shell";

export function PokedexLoading() {
  return (
    <PageShell>
      <section className="space-y-4">
        <div className="h-4 w-24 rounded-full bg-white/70" />
        <div className="h-12 max-w-2xl rounded-3xl bg-white/70" />
        <div className="h-6 max-w-3xl rounded-3xl bg-white/50" />
      </section>
      <div className="panel-soft flex flex-col gap-3 p-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-2">
          <div className="h-4 w-40 rounded-full bg-white/70" />
          <div className="h-12 w-full rounded-2xl bg-white/70" />
        </div>
        <div className="h-12 w-32 rounded-full bg-white/70" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className="panel-soft flex min-h-56 flex-col gap-5 p-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-2">
                <div className="h-4 w-16 rounded-full bg-white/70" />
                <div className="h-8 w-32 rounded-full bg-white/70" />
                <div className="h-4 w-24 rounded-full bg-white/50" />
              </div>
              <div className="h-14 w-14 rounded-2xl bg-white/70" />
            </div>
            <div className="mt-auto flex gap-2">
              <div className="h-9 w-20 rounded-full bg-white/70" />
              <div className="h-9 w-24 rounded-full bg-white/50" />
            </div>
          </div>
        ))}
      </div>
    </PageShell>
  );
}

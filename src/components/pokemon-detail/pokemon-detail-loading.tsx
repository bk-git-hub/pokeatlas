import { PageShell } from "@/components/ui/page-shell";

export function PokemonDetailLoading() {
  return (
    <PageShell>
      <section className="panel-strong grid gap-6 p-6 sm:p-8 lg:grid-cols-[minmax(0,1.1fr)_18rem] lg:items-end">
        <div className="space-y-4">
          <div className="h-4 w-32 rounded-full bg-white/70" />
          <div className="h-14 max-w-3xl rounded-4xl bg-white/75" />
          <div className="h-6 max-w-2xl rounded-3xl bg-white/60" />
          <div className="flex flex-wrap gap-2 pt-2">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="h-10 w-24 rounded-full bg-white/70"
              />
            ))}
          </div>
        </div>
        <div className="mx-auto h-64 w-full max-w-72 rounded-[2rem] bg-white/75" />
      </section>

      <section className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <div className="grid gap-4">
          <div className="panel-soft h-96 p-6" />
          <div className="panel-soft h-64 p-6" />
        </div>
        <div className="grid gap-4">
          <div className="panel-soft h-72 p-6" />
          <div className="panel-soft h-72 p-6" />
        </div>
      </section>
    </PageShell>
  );
}

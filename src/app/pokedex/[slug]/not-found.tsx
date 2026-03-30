import { ActionLink } from "@/components/ui/action-link";
import { PageShell } from "@/components/ui/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <section className="panel-strong flex flex-col gap-5 p-8 text-center sm:p-10">
        <div className="space-y-3">
          <p className="section-eyebrow">Pokemon not found</p>
          <h1 className="section-title">
            This Pokedex entry does not point to a known Pokemon.
          </h1>
          <p className="body-copy mx-auto max-w-2xl">
            The slug or id in the URL did not match a valid Pokemon record. Go
            back to the browse route and pick another entry.
          </p>
        </div>
        <div className="flex justify-center">
          <ActionLink href="/pokedex" variant="secondary">
            Return to Pokedex
          </ActionLink>
        </div>
      </section>
    </PageShell>
  );
}

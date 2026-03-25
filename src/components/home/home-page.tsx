import { PageShell } from "@/components/ui/page-shell";

import { HomeEntryPoints } from "./home-entry-points";
import { HomeHero } from "./home-hero";
import { HomeJourneySections } from "./home-journey-sections";
import { HomeSpotlight } from "./home-spotlight";

export function HomePage() {
  return (
    <PageShell>
        <HomeHero />
        <HomeEntryPoints />
        <HomeSpotlight />
        <HomeJourneySections />
    </PageShell>
  );
}

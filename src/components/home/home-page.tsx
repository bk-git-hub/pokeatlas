import { HomeEntryPoints } from "./home-entry-points";
import { HomeHero } from "./home-hero";
import { HomeJourneySections } from "./home-journey-sections";
import { HomeSpotlight } from "./home-spotlight";

export function HomePage() {
  return (
    <main className="relative flex-1 overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[32rem] bg-[radial-gradient(circle_at_top,rgba(253,224,71,0.18),rgba(253,224,71,0)_54%),radial-gradient(circle_at_18%_18%,rgba(248,113,113,0.18),rgba(248,113,113,0)_30%)]"
      />
      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 py-6 sm:px-8 sm:py-8 lg:gap-10 lg:px-10 lg:py-10">
        <HomeHero />
        <HomeEntryPoints />
        <HomeSpotlight />
        <HomeJourneySections />
      </div>
    </main>
  );
}

import type { Metadata } from "next";

import { HomeHero } from "@/components/home/home-hero";
import { HomeJourneys } from "@/components/home/home-journeys";
import { HomeSpotlight } from "@/components/home/home-spotlight";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import { SITE_NAME } from "@/lib/metadata/site";

export const metadata: Metadata = {
  title: "Landing Experience",
  description:
    "Step into PokeAtlas to browse the Pokedex, inspect polished Pokemon profiles, and build a stronger six-slot plan.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Step into PokeAtlas to browse the Pokedex, inspect polished Pokemon profiles, and build a stronger six-slot plan.",
    url: "/",
  },
  twitter: {
    title: SITE_NAME,
    description:
      "Step into PokeAtlas to browse the Pokedex, inspect polished Pokemon profiles, and build a stronger six-slot plan.",
  },
};

export default function Home() {
  return (
    <main className="page-shell">
      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <HomeHero />
        <HomeSpotlight />
        <HomeJourneys />
        <Panel className="section-shell px-6 py-8 sm:px-8">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="space-y-3">
              <Eyebrow>Why this page matters</Eyebrow>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                The first screen now feels like the beginning of a product, not
                the beginning of a tutorial.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              This homepage is intentionally static for the first milestone, but
              the structure is ready for richer data, browse routes, comparison
              tools, and collection features as later chunks land.
            </p>
          </div>
        </Panel>
      </div>
    </main>
  );
}

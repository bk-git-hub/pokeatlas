import type { Metadata } from "next";

import { HomeHero } from "@/components/home/home-hero";
import { HomeJourneys } from "@/components/home/home-journeys";
import { HomeSpotlight } from "@/components/home/home-spotlight";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Panel } from "@/components/ui/panel";
import { SITE_NAME } from "@/lib/metadata/site";

export const metadata: Metadata = {
  title: "Pokemon Explorer",
  description:
    "Browse the Pokedex, open detailed Pokemon profiles, and build a six-slot team in PokeAtlas.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: SITE_NAME,
    description:
      "Browse the Pokedex, open detailed Pokemon profiles, and build a six-slot team in PokeAtlas.",
    url: "/",
  },
  twitter: {
    title: SITE_NAME,
    description:
      "Browse the Pokedex, open detailed Pokemon profiles, and build a six-slot team in PokeAtlas.",
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
              <Eyebrow>Why PokeAtlas works</Eyebrow>
              <h2 className="max-w-3xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                The product starts with a clear view of what you can explore
                right now.
              </h2>
            </div>
            <p className="max-w-2xl text-base leading-8 text-slate-300">
              The homepage keeps the focus on browsing, detailed profiles, and
              team building so the rest of the app feels easy to enter from the
              first page.
            </p>
          </div>
        </Panel>
      </div>
    </main>
  );
}

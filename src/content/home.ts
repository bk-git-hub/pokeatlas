export const heroMetrics = [
  { value: "1025", label: "Pokemon ready to spotlight" },
  { value: "3", label: "launch journeys framed on day one" },
  { value: "100%", label: "server-rendered first impression" },
];

export const heroHighlights = [
  "Browse the Pokedex without feeling buried in raw data.",
  "Compare battle traits side by side when choices get close.",
  "Draft a six-slot team with a clearer sense of type coverage.",
];

export const featuredPokemon = {
  dex: "#006",
  name: "Charizard",
  tagline: "The launch spotlight stays big, fast, and unmistakable.",
  summary:
    "Charizard anchors the first homepage pass because it instantly signals exploration, stats, and team-building energy without needing a remote data dependency.",
  traits: ["Fire / Flying", "534 total base stats", "Iconic final evolution"],
};

export const journeyCards = [
  {
    name: "Pokedex Browse",
    status: "Live",
    href: "/pokedex",
    description:
      "Scan a calmer overview of the roster with searchable cards, cleaner summaries, and room for deeper filters later.",
  },
  {
    name: "Compare Lab",
    status: "Planned",
    href: "#signals",
    description:
      "Put key traits side by side so the tradeoffs between favorites feel obvious before you commit to a team.",
  },
  {
    name: "Team Builder",
    status: "Planned",
    href: "#signals",
    description:
      "Shape a six-slot lineup with enough structure to understand role balance and coverage at a glance.",
  },
];

export const signals = [
  {
    title: "Product-first framing",
    body: "The landing page explains why PokeAtlas exists before asking anyone to learn an interface.",
  },
  {
    title: "Static by design",
    body: "The first pass avoids fragile data dependencies while leaving the spotlight section easy to upgrade later.",
  },
  {
    title: "Ready for the next chunks",
    body: "Browse, compare, and team-building are introduced in a way that can absorb future routes without rewriting the story.",
  },
];

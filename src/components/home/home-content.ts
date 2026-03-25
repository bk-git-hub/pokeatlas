export const heroStats = [
  { label: "Pokemon tracked", value: "1,000+" },
  { label: "Team ideas queued", value: "48" },
  { label: "Battle prep speed", value: "< 60s" },
] as const;

export const quickEntryPoints = [
  {
    href: "/#browse",
    title: "Browse the atlas",
    kicker: "Pokedex flow",
    description:
      "Scan the roster by role, region, and vibe before dropping into deeper details.",
  },
  {
    href: "/#compare",
    title: "Compare contenders",
    kicker: "Matchup flow",
    description:
      "Line up strengths, tradeoffs, and standout stats to spot the right pick faster.",
  },
  {
    href: "/#team-builder",
    title: "Shape a squad",
    kicker: "Team-builder flow",
    description:
      "Move from single favorites to balanced lineups with clear coverage goals in mind.",
  },
] as const;

export const spotlight = {
  id: "spotlight",
  name: "Lucario",
  index: "#0448",
  category: "Aura Tracker",
  types: ["Fighting", "Steel"],
  summary:
    "A sharp first spotlight for PokeAtlas: popular enough to feel familiar, flexible enough to demonstrate browsing, comparison, and team-planning workflows.",
  traits: [
    "Strong mixed-attacker identity for compare flows",
    "Clear resistances and weaknesses for team-building context",
    "Recognizable silhouette that anchors the home page visually",
  ],
  stats: [
    { label: "Attack", value: 110 },
    { label: "Speed", value: 90 },
    { label: "Sp. Atk", value: 115 },
  ],
} as const;

export const journeySections = [
  {
    id: "browse",
    step: "01",
    title: "Find a direction fast",
    description:
      "The home page should hand users a clean first choice: explore broadly, chase a matchup, or start assembling a roster.",
  },
  {
    id: "compare",
    step: "02",
    title: "See tradeoffs before committing",
    description:
      "PokeAtlas is positioned as a decision surface, not just a static encyclopedia. The compare journey should feel visible from the first scroll.",
  },
  {
    id: "team-builder",
    step: "03",
    title: "Turn favorites into team decisions",
    description:
      "The landing page points users toward synergy and coverage thinking without pretending the full builder exists yet.",
  },
] as const;

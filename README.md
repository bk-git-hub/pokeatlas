# PokeAtlas

PokeAtlas is a Next.js App Router PokeAPI explorer focused on three connected product flows:

- browse the Pokedex with search, filtering, and pagination
- open richer Pokemon detail pages and quick-view modals
- draft a six-slot team with lightweight composition feedback

This repository is organized like a real frontend product rather than a minimal API demo. It includes a normalization layer for external data, route-level loading and error states, metadata and sharing support, and a working test setup for unit, component, and browser flows.

## Features

- Landing page with product framing, spotlight content, and guided entry points
- Pokedex browse route with:
  - URL-based search
  - type filtering
  - pagination
  - empty and failure states
- Pokemon detail route with:
  - artwork
  - stats
  - species profile data
  - evolution context
  - metadata per Pokemon
  - generated Open Graph image
- Intercepted quick-view modal from the browse route
- Team builder route with:
  - session-scoped six-slot drafting
  - search-driven add flow
  - remove and clear actions
  - type distribution and aggregate stat summary
- Public-facing metadata support:
  - canonical URLs
  - Open Graph
  - Twitter cards
  - `robots.txt`
  - `sitemap.xml`

## Routes

- `/`
- `/pokedex`
- `/pokedex/[pokemon]`
- `/pokedex/[pokemon]/opengraph-image`
- `/team-builder`

The Pokedex also uses an intercepted modal route for quick view:

- `/pokedex/@modal/(.)[pokemon]`

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS 4
- Vitest
- React Testing Library
- MSW
- Playwright
- axe-core for browser accessibility smoke checks

## Architecture Notes

### Data Normalization

Raw PokeAPI responses are converted into app-facing models under `src/lib/pokemon/`. This keeps UI components decoupled from upstream response shape changes and lets browse, detail, and team-builder features share the same normalized data structures.

### Route Design

- `src/app/pokedex/page.tsx` handles browse state and server-rendered listing
- `src/app/pokedex/[pokemon]/page.tsx` handles detail state and per-Pokemon metadata
- `src/app/pokedex/@modal/(.)[pokemon]/page.tsx` handles quick-view modal rendering
- `src/app/team-builder/page.tsx` handles search-driven team drafting

### State Design

The team builder uses a shared client provider so detail pages and the dedicated team-builder route can work against the same in-session draft state.

### Metadata

Site-level metadata helpers live in `src/lib/metadata/site.ts`. The app currently supports canonical URLs, social metadata, a generated Open Graph image for Pokemon detail pages, and route-based `robots` and `sitemap` output.

## Project Structure

```text
src/
  app/
    page.tsx
    robots.ts
    sitemap.ts
    pokedex/
      page.tsx
      [pokemon]/
      @modal/
    team-builder/
      page.tsx
  components/
    home/
    pokedex/
    pokemon-detail/
    team-builder/
    ui/
  lib/
    metadata/
    pokeapi/
    pokedex/
    pokemon/
    team-builder/
  test/
    msw/
    setup/
tests/
  e2e/
```

## Getting Started

### Requirements

- Node.js 20+
- pnpm

### Install

```bash
pnpm install
```

### Run Development Server

```bash
pnpm dev
```

Open `http://localhost:3000`.

## Environment

The metadata base URL defaults to `https://pokeatlas.app`.

You can override it with:

- `NEXT_PUBLIC_SITE_URL`
- `SITE_URL`

## Scripts

```bash
pnpm dev
pnpm build
pnpm start
pnpm lint
pnpm test
pnpm test:watch
pnpm test:coverage
pnpm test:e2e:install
pnpm test:e2e
pnpm test:e2e:headed
```

## Testing

### Current Coverage

Unit and component tests currently cover:

- browse query parsing
- PokeAPI client error mapping
- Pokemon service behavior
- Pokemon normalization
- team-builder summary logic
- team-builder provider state behavior

Browser E2E coverage currently includes:

- home page smoke test
- empty team-builder route smoke test
- browser accessibility smoke checks for those pages

### Test Files

- `src/lib/pokedex/query.test.ts`
- `src/lib/pokeapi/client.test.ts`
- `src/lib/pokemon/api.test.ts`
- `src/lib/pokemon/normalize.test.ts`
- `src/lib/team-builder/summary.test.ts`
- `src/components/team-builder/team-builder-provider.test.tsx`
- `tests/e2e/home-and-team-builder.spec.ts`

## Notes

- The team builder is session-scoped and does not currently persist across reloads.
- The test stack is ready for broader route and modal coverage, but only a small E2E smoke set is implemented today.
- Internal planning and scratch docs may exist locally, but this README is intentionally scoped to the public-facing repository surface.

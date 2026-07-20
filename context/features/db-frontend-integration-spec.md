# DB → Frontend Integration Specification (React Query)

## Overview

Replace the static imports from `src/data/portfolio-data.ts` (`experiences`,
`education`, `skillCategories`) in the Experience, Education, and Skills
sections with data read from the Neon database — already populated by the
DB-1 seed (`@context/features/seed-spec.md`). Fetch through Prisma and
cache/prefetch with TanStack React Query, per the DB-1 row in
`project-overview.md` §4: *"Content served from DB instead of
`portfolio-data.ts`."* This content only ever changes via a manual seed
re-run or (later) admin edits, so the goal is avoiding repeat DB round-trips,
not tracking real-time freshness.

## Scope

- **In scope:** `Experience`, `Education`, `SkillCategory` tables → Prisma →
  React Query → the three matching sections.
- **Out of scope:** `Profile` (name/tagline/bio/personalLine) — the bio and
  tagline are locale-specific and still live in `messages/{locale}.json`; the
  seeded `Profile` row is English-only and isn't wired to per-locale
  rendering. `contactChannels`, `siteName`, `cvHref` in `portfolio-data.ts`
  stay static — they're locale-independent facts, not narrative content, so
  there's no DB round-trip to save by moving them. Admin CMS write access
  (NextAuth-gated editing) is a separate future feature.

## Requirements

- Install `@tanstack/react-query`.
- `src/lib/db/portfolio.ts` — Prisma fetch functions: `getExperiences()`,
  `getEducation()`, `getSkillCategories()`, each ordered by `order` asc,
  using the existing `src/lib/prisma.ts` singleton.
- `src/lib/query-client.ts` — per-request `QueryClient` factory for server
  use (per TanStack's Next.js App Router SSR guide) + shared query key
  constants (`["experiences"]`, `["education"]`, `["skill-categories"]`).
- A client `QueryClientProvider` (`src/components/query-provider.tsx`,
  `"use client"`) mounted once in `app/[locale]/layout.tsx`. Default
  `staleTime: Infinity` — this data doesn't change without a reseed.
- In `page.tsx`: prefetch all three queries server-side
  (`queryClient.prefetchQuery`), then wrap the section tree in
  `<HydrationBoundary state={dehydrate(queryClient)}>` so the sections never
  issue a real network request on first load.
- Convert `Experience`, `Education`, `Skills` sections to `"use client"` and
  read data via `useSuspenseQuery` with the matching key/fetcher. The
  client-side fetcher needs a route handler (`/api/portfolio/experience`,
  `/api/portfolio/education`, `/api/portfolio/skills`) since Prisma can't run
  in the browser — the server-side prefetch bypasses these routes entirely by
  calling `getExperiences()` etc. directly.
- Reuse the existing `Experience`/`Education`/`SkillCategory` types (from
  `portfolio-data.ts`, or swap to Prisma's generated types) as the query
  return type — no shape drift between the static and DB-backed versions.
- Keep the `Reveal` (Framer Motion) wrapper and existing markup/styling
  untouched — only the content source changes.

## References

- `@context/features/seed-spec.md` — where the seeded rows come from
- `@context/features/database-spec.md` — schema setup
- `prisma/schema.prisma` — `Experience`, `Education`, `SkillCategory` models
- `src/lib/prisma.ts` — existing Prisma singleton (adapter-backed, don't
  instantiate a second client)
- `src/data/portfolio-data.ts` — current static source + types being
  replaced (`contactChannels`/`siteName`/`cvHref` stay here)
- [TanStack Query — Next.js App Router SSR guide](https://tanstack.com/query/latest/docs/framework/react/guides/ssr) —
  prefetch + `HydrationBoundary` pattern this spec follows

## Notes

- Ladder check: for content this static, Next.js's own `fetch`/
  `unstable_cache` revalidation would cover "avoid refetching" with less code
  and no client bundle addition. React Query is used here because it was
  explicitly requested — it also sets up the cache layer that a future
  admin-edit flow (DB-1's "authenticated admin editing") would want to
  invalidate on write.
- The three sections become client components to use `useSuspenseQuery`. If
  losing pure server rendering for them isn't wanted, the lazy alternative is
  a server-only fetch wrapped in `unstable_cache`/`revalidate` — no
  react-query, no route handlers, same DB-round-trip savings.
- The `/api/portfolio/*` route handlers only matter after the hydrated cache
  goes stale or is invalidated — until a write path (admin CMS) exists to
  trigger that, they're dead code after first paint. Worth confirming that
  trade-off is wanted before building the routes.

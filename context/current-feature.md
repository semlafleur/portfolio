# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

Not Started

## Goals

<!-- Goals & requirements -->

## Notes

<!-- Any extra notes -->

## History

<!-- Keep this updated. Earliest to latest -->

- **Wired DB → frontend via React Query (DB-1 continued)** on
  `feature/db-frontend-integration`, per
  `context/features/db-frontend-integration-spec.md`. The Experience,
  Education, and Skills sections now read from the seeded Neon DB instead of
  the static arrays in `src/data/portfolio-data.ts` (those arrays stay in
  the repo as the seed source, unchanged). Added `src/lib/db/portfolio.ts`
  (Prisma fetch functions, `Date` fields converted back to the existing
  `"YYYY-MM"` string shape so the query result types match
  `portfolio-data.ts`'s `Experience`/`Education`/`SkillCategory` types
  exactly — no shape drift), `src/lib/query-client.ts` (query keys +
  per-request `QueryClient` factory, `staleTime: Infinity` since this
  content only changes via a reseed), and `src/components/query-provider.tsx`
  mounted in `app/[locale]/layout.tsx`. `page.tsx` prefetches all three
  queries server-side and wraps the section tree in a `HydrationBoundary` so
  the client never issues a real network request on first load; the three
  sections became `"use client"` and read via `useSuspenseQuery`, falling
  back to new `/api/portfolio/{experience,education,skills}` route handlers
  only if the hydrated cache ever goes stale (no admin write path exists yet
  to actually trigger that). `npm run build` confirmed `/en`/`/it`/`/de`
  still prerender as static (SSG, 1h revalidate) with the Prisma prefetch
  baked in at build time. Notable bug hit and fixed: the dev server's
  `src/lib/prisma.ts` hot-reload-safe singleton had cached a broken
  `PrismaClient` instance on `globalThis` from before an `npx prisma
  generate` was run (stale generated client, `prisma.experience` etc.
  `undefined`) — `prefetchQuery` swallows query errors by default, so the
  cache silently stayed empty and the client fell back to a relative
  `fetch()` during SSR, crashing with "Failed to parse URL". Fixed by
  restarting the dev server (the global singleton only resets on process
  restart, not on file change / HMR). Verified with `npm run build`,
  `npm run lint`, and a live browser pass (curl + Chrome) confirming real DB
  content (Goodcode SA, SUPSI, Languages, etc.) renders in the initial SSR
  HTML. Out of scope / deferred: `Profile` (bio/tagline stay locale-specific
  in `messages/*.json`, not wired to the DB row), `contactChannels`/
  `siteName`/`cvHref` (stay static, locale-independent facts), and admin CMS
  write access to invalidate the query cache.

- **Seeded the dev Neon DB (`prisma/seed.ts`)** on `feature/db-seed-data`, per
  `context/features/seed-spec.md`. Populates real portfolio content sourced
  from `src/data/portfolio-data.ts` and `messages/en.json` — no fabricated
  data: an admin `User` row (name + email + `emailVerified`; the model has no
  password field, auth is OAuth-only via `Account`), a single `Profile` row
  (tagline/bio assembled from `messages/en.json`'s `hero`/`about` keys, HTML
  `<b>` emphasis tags stripped since the DB value is plain text), 4
  `Experience` rows, 2 `Education` rows, and 7 `SkillCategory` rows, each with
  `order` set from array index. Followed `scripts/test-db.ts`'s existing
  pattern (standalone `PrismaClient` + `PrismaNeon` adapter + `dotenv/config`)
  rather than importing the app's `src/lib/prisma.ts` singleton, since that
  singleton relies on Next.js's automatic env loading and `DATABASE_URL` is
  undefined without an explicit `dotenv/config` import when run standalone via
  `tsx`. Idempotent: `User`/`Profile` use `upsert`, `Experience`/`Education`/
  `SkillCategory` use `deleteMany` + `createMany` (no natural unique key to
  upsert against) — verified safe to re-run by running it twice and confirming
  row counts stay stable via `scripts/test-db.ts`. Verified with `npm run
  build` and `npm run lint`. Deferred / out of scope: wiring the app's
  components to read from the DB instead of `portfolio-data.ts` (still the
  Phase 2 static-import path), and seeding the production Neon branch.

- **Completed Prisma 7 + Neon PostgreSQL setup (DB-1)** on
  `feature/db-prisma-neon-setup`. Installed
  `prisma@7.8.0`, `@prisma/client@7.8.0`, `@prisma/adapter-neon`,
  `@neondatabase/serverless`, `ws` (+ `@types/ws`, `dotenv` dev deps). Ran
  `npx prisma init` and read the actual CLI-generated output rather than
  relying on training-data knowledge of Prisma 7 (WebFetch to the docs was
  unavailable this session) — confirmed the breaking changes already noted in
  `project-overview.md`: generator provider is `prisma-client` with an
  explicit `output` (`src/generated/prisma`, gitignored, auto-added by
  `prisma init`); `datasource` has no `url` in `schema.prisma`; the
  connection string lives in `prisma.config.ts` (`datasource.url`, loaded via
  `dotenv/config`) for the CLI, while the generated `PrismaClient` requires an
  explicit driver `adapter` at runtime — `prisma.config.ts`'s url is only
  consulted by the CLI (migrate/introspect), not by the app. Wrote DB-1 scope
  only (Foundation + CMS, per the sub-phase table): NextAuth models (`User`,
  `Account`, `Session`, `VerificationToken`) and portfolio content models
  (`Profile`, `Experience`, `Education`, `SkillCategory`) — DB-2 (analytics)
  and DB-3 (pgvector/RAG) deferred until those features are built. Added
  `src/lib/prisma.ts`: a dev-hot-reload-safe singleton using `PrismaNeon`
  (`@prisma/adapter-neon`) over a WebSocket (`ws`), matching the adapter's own
  README example. Ran `prisma migrate dev --name init` against the user's
  real Neon dev-branch database (pooled connection string, `-pooler` host —
  worked fine for DDL + advisory locks, no direct/unpooled URL needed).
  Notable bug hit and fixed during verification: `prisma migrate dev` does
  **not** automatically re-run `prisma generate` in v7 — after hand-editing
  `schema.prisma` to add the real models (post `prisma init`, which only
  scaffolds an empty schema), the generated client in
  `src/generated/prisma/internal/class.ts` still had the stale empty
  `inlineSchema`/`runtimeDataModel`, so every model accessor
  (`prisma.user`, etc.) was `undefined` until an explicit `npx prisma
  generate` was re-run. Added `scripts/test-db.ts` (run via `npx tsx
  scripts/test-db.ts`) as a standing sanity check — instantiates the real
  adapter-backed client and prints `.count()` for all 8 models against the
  live Neon DB (all returned 0 on the fresh database). `tsx` itself was left
  uninstalled (resolved on demand via `npx`) rather than added as a
  devDependency. Verified with `npm run build` and `npm run lint`. Deferred /
  out of scope: DB-2/DB-3 schema, seeding `portfolio-data.ts` into the DB,
  NextAuth wiring, and the production Neon branch (only the dev branch
  `DATABASE_URL` was configured, per the documented dev/prod branch split).

- Project setup and boilerplate cleanup
- Implemented Phase 1 UI shell on `feature/portfolio-phase-1-ui`: shadcn/ui init
  (button, dropdown-menu, dialog), teal accent token + dark-mode-default theme
  in `globals.css`, `next-themes` wired to a sun/moon toggle, restructured
  `app/` into `app/[locale]/` with a `proxy.ts` redirect from `/` to `/en`
  (locales scaffolded but not yet translated — real i18n lands in Phase 3),
  sticky display-only Nav (logo, section links, language pills, ⌘K hint,
  Download CV link, mobile dropdown menu), and the six placeholder sections
  (Hero, About, Experience, Education, Skills, Contact). Verified with
  `npm run build`, `npm run lint`, and a live browser pass (desktop + a
  simulated mobile breakpoint) in both themes.
- **Completed Phase 2 content + animated timeline** on
  `feature/portfolio-phase-2` (merged to `main`, branch deleted). Filled every
  section with real content sourced from `src/data/portfolio-data.ts` (extended
  with profile/about/contact/section-intro copy — no hardcoded strings in
  components): Hero (tagline with emphasized keywords + Get in touch / Download
  CV CTAs), About (bio + personal line + Quick facts card), Experience (vertical
  teal timeline with milestone dots, per-role cards, monospace date ranges,
  teal-bulleted highlights and stack chips, staggered on-scroll fade/slide via
  Framer Motion / `motion`), Education (SUPSI + CPT cards), Skills (7 category
  cards with chips), Contact (display-only Name/Email/Message form + email /
  phone / LinkedIn / GitHub links + Download CV), and a Footer (copyright, static
  GitHub signal, social icon links). Added reusable `Section` shell,
  `SectionHeading`, `Chip`, `Reveal` (client motion wrapper), inline GitHub /
  LinkedIn brand icons (this lucide build ships no brand glyphs), and a
  `lib/dates.ts` month/range formatter. All React components written as arrow
  functions (new coding-standards rule). Fixed the GitHub link to
  `github.com/semlafleur`. Verified with `npm run build`, `npm run lint`, and a
  live browser pass across all sections in light + dark themes and a 390px
  mobile breakpoint. Deferred to a later phase: real i18n, functional contact
  form (Resend), live GitHub fetch, and per-locale CV PDFs (links point at
  `/cv-en.pdf`, not yet added).
- **Completed Phase 3 — functional interactivity, i18n, SEO** on
  `feature/portfolio-phase-3`. Wired real `next-intl` locale-prefix routing
  (`/en`, `/it`, `/de`) with browser-locale detection via `src/proxy.ts`
  (renamed from Middleware in Next 16) and a locale cookie; every UI and
  narrative string moved into `messages/{en,it,de}.json` (`portfolio-data.ts`
  now holds only locale-independent facts — contact channels, `siteName`, and
  a `cvHref(locale)` helper). Nav's language pills and mobile menu are now
  functional (`next-intl`'s `useRouter`/`usePathname` swap locale while
  preserving scroll position). Built a `cmdk`-based command palette (⌘K, click
  trigger in Nav) with fuzzy search, keyboard nav, and grouped actions:
  jump-to-section, toggle theme, switch language, download CV, copy email,
  open LinkedIn/GitHub — state lifted into a `CommandPaletteProvider` context
  so Nav and the palette share open/close state. Contact form is now
  functional: client component posts to a new `/api/contact` Route Handler
  (Zod validation, honeypot field, in-memory per-IP rate limit, Resend email)
  with idle/submitting/success/error states; the route degrades gracefully
  (503 with a clear message) when `RESEND_API_KEY` is unset. Added GitHub
  integration lite (`src/lib/github.ts`): server-side fetch of public repos /
  total stars / last push, `revalidate: 3600`, rendered in the Footer with a
  static fallback line if the fetch fails. Added per-locale SEO via
  `generateMetadata` (title, description, canonical, hreflang alternates, OG,
  Twitter card) and a dynamic OG image at `app/[locale]/opengraph-image.tsx`
  via `next/og`. Notable bug found and fixed: an async Server Component
  fetching its own data while nested as a direct child of a Client Component
  boundary broke Turbopack's static prerendering of `/en` ("Expected a
  suspended thenable"); fixed by lifting the GitHub fetch up to the page-level
  Server Component and passing the result into `Footer` as a prop. All new
  components follow the arrow-function coding-standards rule. Verified with
  `npm run build`, `npm run lint`, and a manual live-browser pass by the user
  (language switching, command palette, contact form, in both themes).
  Deferred / out of scope: real `cv-{locale}.pdf` files (must be supplied by
  the user — not fabricated), the actual Vercel deploy + custom domain +
  secrets (`RESEND_API_KEY`, optional `GITHUB_TOKEN`, `NEXT_PUBLIC_SITE_URL`),
  and a formal Lighthouse audit.

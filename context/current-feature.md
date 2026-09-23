# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

Not Started

## Goals

## Notes

## History

<!-- Keep this updated. Earliest to latest -->

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

- **Investigated and closed (won't-fix)** the console error reported in
  `context/bugfix/script-tag-warning-on-locale-switch.md` ("Encountered a
  script tag while rendering React component", seen on every locale switch).
  Root cause: `next-themes` 0.4.6 renders its no-flash-of-wrong-theme snippet
  as a raw JSX `<script>` element; Turbopack's dev server recreates that DOM
  node client-side on the first post-hydration route transition instead of
  reusing the server-hydrated one, tripping a React-19 development-only
  warning. Confirmed via a side-by-side `npm run build` + `npm run start`
  test (separate port) that the warning never appears in production and
  theme state applies correctly in both dev and prod across every locale
  switch tested — no functional impact, cosmetic dev-console noise only.
  User chose to accept as-is rather than add workaround code (e.g. a custom
  `next/script`-based no-flash injection) for a purely cosmetic, dev-only
  issue. No code changed.

- **Migrated and seeded the production Neon branch**, closing the
  "seeding the production Neon branch" item deferred since DB-1. Ran
  `prisma migrate deploy` (schema) and `prisma/seed.ts` (data) against the
  prod `DATABASE_URL` (from `.env.prod`, gitignored, not committed) — same
  idempotent seed script already used for dev, no new code. Verified with
  `scripts/test-db.ts` against prod: 1 `User`, 1 `Profile`, 4 `Experience`,
  2 `Education`, 7 `SkillCategory`, matching dev's row counts. First
  attempted a direct `pg_dump --data-only | psql` copy from dev to prod
  (using derived direct, non-`-pooler` Neon connection strings) but it hit a
  real blocker: local `pg_dump` is v17.4 (Homebrew) while the Neon server is
  Postgres 18.4, and `pg_dump` refuses to run against a newer major-version
  server; Homebrew itself is currently broken on this machine's macOS
  version (26.5.2, unrecognized by the installed Homebrew, so `brew
  search`/`install` fail) so a v18 client wasn't readily installable.
  Fixing Homebrew/installing Postgres 18 client was judged out of scope for
  this task, so fell back to the Prisma-based path instead — no local
  binary version dependency, same result. No code changed; only prod DB
  data.

- **Added the animated "neural constellation" hero background** on
  `feature/hero-constellation-background`, per
  `context/features/animation-feature.md`. New canvas-based
  `src/components/hero-constellation-background.tsx`, mounted behind the
  hero `<h1>` (`aria-hidden="true"`, absolutely positioned, `z-0` under the
  existing hero content): glowing nodes drifting and bouncing off the
  container edges, teal connector lines between nodes within
  `connectionDistance`, occasional "synaptic" pulses traveling along a
  connection, per-node depth (`radius`/`opacity` varying 0..1) for a subtle
  3D feel, and a mouse-parallax offset on the whole layer (eased toward the
  cursor position, capped at 14px). All colors are derived at runtime from
  `--primary` via new `src/hooks/use-theme-color.ts` (`useSyncExternalStore`
  + `MutationObserver` on `<html class>`, since `next-themes` toggles a
  `.dark` class rather than `data-theme`, and `--primary`/`--teal` is a hex
  literal in `globals.css` rather than HSL — parsed to an `"r g b"` string
  for use in `rgba(...)`) — no hardcoded color in the component itself, so
  it follows dark/light mode and any future palette change automatically.
  New `src/hooks/use-prefers-reduced-motion.ts` (`useSyncExternalStore` over
  `matchMedia`) freezes the canvas to a single static frame and skips the
  animation loop entirely when the user has reduced motion enabled. The
  effect is SSR-safe (canvas sizing, node seeding, and all
  `window`/`document` access happen inside `useEffect`), resizes via
  `ResizeObserver` on the container, and cleans up
  `requestAnimationFrame`/`ResizeObserver`/mouse-listener on unmount.
  Verified with `npm run build`, `npm run lint`, and a live browser pass in
  both themes confirming the node color switches from `#14b8a6` (light) to
  `#5eead4` (dark) when toggling `next-themes`, with no console errors from
  the app. Out of scope this iteration (per spec): a React Three
  Fiber/Bloom version, cursor repel/attract interaction, and multi-cluster
  node layout.

- **Wired the real CV + made the About location generic** on
  `feature/real-cv-download-switzerland`. The Download CV button previously
  pointed at `cvHref(locale)` → `/cv-{en,it,de}.pdf`, none of which existed
  (`public/` was empty, so every download 404'd). Added the real
  `public/resume.pdf` (a single English CV — no per-locale PDFs fabricated)
  and replaced the locale-aware helper with a plain constant
  `cvHref = "/resume.pdf"` in `src/data/portfolio-data.ts`; updated the five
  call sites (nav ×2, hero, contact, command palette) from `cvHref(locale)`
  to `cvHref`. Since the value no longer depends on locale, the now-dead
  `useLocale()` hook + its `next-intl` import were removed from `hero.tsx`
  and `contact.tsx` (nav keeps `locale` for the language pills). Also made
  the About location generic: `about.p1` and the Quick-facts
  `about.factBasedValue` no longer say "Ticino / Basel" — now
  "Switzerland" / "Svizzera" / "Schweiz" across `messages/{en,it,de}.json`
  (the "Based in" / "Sede" / "Standort" labels left untouched). Verified with
  `npm run build` (clean) and `npm run lint` (0 warnings). Note: the original
  `resume.pdf` the user dropped at the repo root is left untracked (not
  deleted, not committed) — only the `public/` copy is versioned.

- **Brought the site to CV parity and made AI/LLM tooling first-class content**
  on `feature/cv-parity-ai-tools`. Source of truth was the real
  `public/resume.pdf`; its text was extracted with macOS PDFKit via
  `osascript -l JavaScript` (`$.PDFDocument`) because `pdftoppm`/poppler isn't
  installed and Homebrew is still broken on this machine — worth remembering
  for any future PDF read here. Five open questions were resolved by the user
  up front: align the role title *and* English level to the CV, keep Elysium
  on the site even though the CV omits it, add the SUPSI detail bullet (paying
  for a migration), and reverse the earlier ❌ decision on a Projects section.
  **(A) Data + copy:** `skillCategories` went 7 → 11 — new `AI / LLM Tools`
  (Claude, GitHub Copilot, AI-assisted code review, AI-assisted documentation),
  `Testing & QA`, `APIs`, `Build Tools` — plus the items missing from existing
  categories (SQL, Spring WebFlux/Security, Hibernate/JPA, Spring Boot 3.3/6,
  SQL Server, Azure, Helm). `AI / LLM Tools` is deliberately **first** in the
  render order rather than buried 9th, since surfacing it was the explicit ask.
  Experience `highlights` were rewritten from the CV's fuller wording,
  including the Goodcode Testing & QA bullet, the Goodcode Claude/AI-tooling
  bullet, and the EOC compliance-testing bullet. Across
  `messages/{en,it,de}.json`: role → *Full Stack Software Engineer* (title +
  metadata + OG), English → C1 (Quick facts now reads
  `🇮🇹 Native · 🇬🇧 C1 · 🇩🇪 A2`), "technology & open source" added to
  `personalLine`, a new `about.aiLine` paragraph on AI tooling, and a new
  "AI tooling" quick fact. **(B) Education detail:** added
  `Education.highlights String[]` (migration `education_highlights`) + seed +
  `lib/db/portfolio.ts` mapping + a bulleted render in `education.tsx`; SUPSI
  carries the evening-PAP bullet, CPT's array is intentionally empty (the CV
  gives it no detail — nothing fabricated). **(C) Projects section:** new
  `Project` model (title, description, stack, year, nullable `note`, order;
  migration `add_project`), seeded with the CV's NFT Marketplace course
  project, plus `getProjects`, a `projects` query key, page-level prefetch
  inside the existing `HydrationBoundary`, `/api/portfolio/projects` route
  handler, a `projects.tsx` client section, a nav link, a command-palette
  jump-to entry (`FolderGit2`), and eyebrow/heading copy in all three locales.
  It sits between Skills and Contact, matching the CV's order, and ships with
  a single card in a two-column grid — the user accepted that rather than
  padding it with invented projects. **(D)** `context/project-overview.md`
  updated to match: role, C1, refreshed skills table, a new Projects subsection,
  the decision table flipped ❌ → ✅, and `Education.highlights` + `Project`
  added to the illustrative schema. Notable snag: the first
  `prisma migrate dev` for `Project` failed with a Postgres advisory-lock
  timeout (P1002) on the pooled Neon connection — a plain retry worked, no
  fix needed. Also re-confirmed the DB-1 lesson that `migrate dev` does not
  re-run `prisma generate` in v7. Verified with `npm run build` (clean, all
  three locales still SSG with a 1h revalidate), `npm run lint` (0 warnings),
  `prisma migrate status` in sync, both the **dev and production** Neon
  branches migrated (`migrate deploy`) and reseeded to identical counts
  (1 user, 1 profile, 4 experience, 2 education, 1 project, 11 skill
  categories — `scripts/test-db.ts` gained a `project` count), and a live
  browser pass against `next start` in both themes plus SSR-HTML greps
  confirming no `MISSING_MESSAGE`/`IntlError` in IT or DE. One browser-testing
  gotcha worth recording: driving a **non-focused** Chrome tab throttles
  `requestAnimationFrame`, which freezes the `Reveal` (Framer Motion) entrance
  animations part-way and makes cards look faded or missing in screenshots —
  the DOM was correct all along, and a `rAF` probe confirmed the throttling
  rather than an app bug. Copy tweak after review: the `aiLine` phrase
  "not a line on a CV" (and its IT/DE equivalents) was removed at the user's
  request. The root `resume.pdf` remains untracked, as in the previous feature.

- **Made the contact form actually deliver** on `fix/contact-form-delivery`. The
  form had been shipped "functional" back in Phase 3 but had never sent a single
  email: `.env` only ever held `DATABASE_URL`, so every submission hit the
  route's `RESEND_API_KEY` guard and returned 503 ("The contact form isn't
  configured yet"). The user suspected as much and asked to verify — the code
  read confirmed it before anything was changed. Mostly a **configuration** fix
  (the user created the Resend account and generated the key themselves; Claude
  never handled the credential, only named the variable to paste it into), with
  one real code fix on top. **The code fix:** `resend.emails.send()` was awaited
  inside a `try/catch` with its **return value discarded**. Per the Resend docs
  (fetched via Context7), the SDK "returns a `{ data, error }` object instead of
  throwing" — try/catch only covers network-level failures. So an API-level
  rejection left `catch` untouched and the route replied `{ success: true }`:
  the visitor read "message sent" while nothing arrived. Proven, not assumed, by
  a throwaway probe script run against the real key, sending to a non-account
  address: `threw? no` / `403 validation_error`. Fixed by destructuring
  `const { error } = await resend.emails.send(...)` and returning 502 when set,
  with a shared `failed()` arrow helper so the network and API paths report
  identically. **Config:** `RESEND_API_KEY` + `CONTACT_TO_EMAIL` in local `.env`
  (gitignored — never staged), and the same two added to Vercel
  (Production + Preview) via `vercel link` + `vercel env add`, reading values
  out of `.env` without echoing them. `.env.example` gained documentation for
  `RESEND_FROM_EMAIL` / `CONTACT_TO_EMAIL`, which the route already read but
  nothing recorded. **Sandbox constraint worth remembering:** on Resend's shared
  `onboarding@resend.dev` sender, delivery only works to the email the Resend
  account is registered with (`sam993.lafleur@gmail.com` here) — hence
  `CONTACT_TO_EMAIL` overriding the route's `semlafleur@hotmail.com` default.
  Verifying a domain in Resend lifts this with no code change, just the two vars.
  **Two testing gotchas, both worth recording.** (1) A `curl` test exercises the
  route but skips the client component entirely, so it does not prove the form
  works — the real browser pass was only done during `/feature review`, and it
  was right to treat the goal as unmet until then. (2) During that pass the
  first browser submit returned `200` in **8ms**; real Resend calls in the same
  log take 300–460ms. The gap was the tell: the Chrome `find` tool's element
  refs were off by one field and had typed into the hidden `company` honeypot,
  so the route correctly returned its decoy `{ success: true }` **without
  sending**. Reading only the JSON would have certified a send that never
  happened — the honeypot was working exactly as designed. Redone on a freshly
  reloaded page it logged `457ms` and delivered. Verified with `npm run build`
  (clean, all three locales still SSG at 1h revalidate), `npm run lint`
  (0 warnings), and a real browser submission confirmed by the user in their
  inbox with a correct `Reply-To` pointing at the sender's address. Merging to
  `main` and pushing triggered a Vercel production deploy on its own (the
  project is Git-connected), and the live endpoint at `www.slafleur.dev`
  (the apex 308-redirects, so `curl` needs `-L`) returned 200 with the error
  check in place. Out of scope / deferred: the in-memory rate limiter (`src/lib/rate-limit.ts` is
  best-effort and near-useless across serverless instances — swap for Upstash
  Redis if spam ever becomes real), a second notification channel, persisting
  submissions to Neon, and Resend domain verification. The root `resume.pdf`
  remains untracked, as in the previous two features.

- **Synced the portfolio with the new CV** on `feature/new-cv-sync`. Source of
  truth was a new `resume (3).pdf` dropped at the repo root; this time the two
  pages were read directly with the `Read` tool's `pages` parameter (renders the
  PDF as images) rather than the macOS-PDFKit-via-`osascript` trick the previous
  CV-parity feature needed — simpler, and worth reaching for first next time.
  The new PDF was copied over `public/resume.pdf`; the root copy stays untracked,
  as with the previous two features. **Four decisions were asked up front rather
  than assumed**, because the new CV *contradicts* earlier deliberate choices:
  it shrinks Technical Skills to 8 categories and **drops AI / LLM Tools
  entirely** (which the site renders first, by an explicit earlier decision), and
  its header now reads "Basel, Switzerland" (the site was deliberately made
  generic one feature ago). User's calls: keep the site's 11 categories and the
  `aiLine` untouched and only *add* new items; add Zivildienst **both** as a
  timeline card and as a standalone availability line; **stay generic** on
  location; and take **Interests only** from the CV's two new sections — no
  References section, since it would publish a third party's email and LinkedIn
  on a public page. **(A) New content:** a `Zivildienst (Swiss Civilian Service)`
  entry (Jan – Dec 2026) is now the first Experience row, carrying the CV's four
  bullets (mandatory service, Goodcode contract still active / available from
  1 Jan 2027, and the three assignments). It is the **first entry with an empty
  `stack`**, which exposed a latent layout bug: `experience.tsx` rendered the
  chip container unconditionally, so an empty stack still emitted a `mt-4` spacer
  — fixed with a `exp.stack.length > 0 &&` guard. Availability is surfaced twice:
  a teal pill under the Hero role (`hero.availability`) and an "Available from ·
  January 2027" quick fact. **(B) Corrections:** EOC Full Stack role end date
  Mar → **Apr 2024**, EOC Trainee start May → **Sep 2017**, and both EOC roles
  plus Goodcode retitled *Full Stack Developer* → *Full Stack Software Engineer*.
  The user flagged mid-spec that **neither EOC role is senior** — "senior" turned
  out to exist only as loose shorthand in the spec draft, never in the site, the
  messages files, or the seed; the spec was reworded and the rule written into
  `project-overview.md` so it cannot drift. Engagement detail (Goodcode *80%
  until Aug 2025 alongside the SUPSI BSc, 100% since Sep 2025* — the "alongside
  BSc" part added by the user, who noted the 80% period overlapped the degree
  that ended the same month; EOC *60% alongside the BSc*; Elysium *part-time*)
  went in as a **first highlight bullet rather than a new DB column** — no
  migration, no schema change, no UI work. **(C) Copy** across
  `messages/{en,it,de}.json`: taglines and `about.p2` rewritten to lead with the
  new CV's backend-first summary (Java / Spring Boot and Node.js underneath,
  TypeScript / React on top, serverless AWS **and Kubernetes**), SEO
  `metadata.description` gained Java / Spring Boot to match, `personalLine`
  absorbed the CV's Interests, German became *A2 (improving)*, and the SUPSI
  education bullet replaced the evening-PAP line with "Completed while working
  part-time as a software engineer." Skills gained **Zustand** and **TanStack
  Query**; `APIs` was renamed **APIs & Architecture** with Microservices /
  Serverless / Multi-tenant systems added. "Spring Boot 3.x" was deliberately
  *not* added — the site already says "Spring Boot 3.3/6", the same fact stated
  more precisely. **Two findings came out of `/feature review`, both fixed
  before merge.** (1) The Elysium bullet had been written as *"Part-time
  alongside studies and the EOC role."* — but the CV says only `part-time`. The
  overlap is real from the dates, yet the source never states it, so the
  inference was trimmed back to "Part-time." Worth remembering as a standing
  rule for CV work: **the dates supporting a claim is not the same as the CV
  making it.** (2) `context/project-overview.md` had silently gone stale in
  seven places (old EOC dates, old role titles, the PAP bullet, the `APIs`
  category, no Zivildienst, old tagline, German A2) — the previous CV feature
  kept that doc in sync but this feature's spec never listed it, so it drifted.
  Updated in full. Verified with `npm run build` (clean, all three locales still
  SSG at 1h revalidate), `npm run lint` (0 warnings), **both** Neon branches
  reseeded to identical counts (1 user, 1 profile, 5 experience, 2 education,
  1 project, 11 skill categories), SSR-HTML greps across `/en`, `/it` and `/de`
  showing the new content with **zero** `MISSING_MESSAGE`/`IntlError`, and a
  live browser pass confirming the availability pill renders and the
  stack-less Zivildienst card has no chip row. The only console error came from
  a Chrome extension, not the app. **Known limitation, deliberately not coded
  around:** the availability copy is hardcoded, so after 1 Jan 2027 the pill will
  still read "Available from 1 January 2027" — date logic for a single one-off
  event wasn't worth it; it is a one-line edit in three JSON files. Noted in
  `project-overview.md`. **Pre-existing and untouched:** DB-sourced content
  (company names, highlights, locations) still renders in English on all three
  locales — the translation layer covers `messages/*.json` only.

- **Localized the DB-sourced content and removed the availability pill** on
  `feature/localize-db-content`. Closes the "pre-existing, not from this change"
  item carried over from the CV-sync feature: Experience / Education / Projects /
  Skills came from the DB and rendered in **English on all three locales**, so
  `/it` and `/de` were UI-translated but content-English. **Research first:**
  Prisma ships no canonical translation pattern, but next-intl's design docs
  endorse the split actually built here — *"manage content like blog posts or
  marketing copy in a CMS, while managing UI labels in next-intl"*, passing the
  negotiated locale into the content query — and explicitly discourage arrays of
  strings in message files, which is exactly what `highlights` is. That killed
  the "move the prose into `messages/*.json`" option. Four storage designs were
  put to the user with schema previews (locale column · translation tables ·
  JSON columns · message files); they chose the **locale column**, translating
  **everything** (prose, skill categories, degrees, locations **and** job
  titles), with Claude drafting IT **and** DE. **Two extra English leaks the
  original note had missed** were found while grounding the spec and folded in:
  (1) `src/lib/dates.ts` hardcoded `MONTHS = ["Jan", …]` **and** the literal
  `"Present"`, so every date range read English regardless of the DB — replaced
  with native `Intl.DateTimeFormat` plus a `common.present` key (`Present` /
  `Presente` / `Heute`), giving `gen 2026` and `Jan. 2026`; and (2) the React
  Query keys were **locale-blind** (`["experiences"]`), so the moment content
  varied by language the cache would have served one language's rows to another
  — keys became functions of locale. That second one was the real trap: it would
  have shipped as an intermittent, hard-to-reproduce bug. **Schema:** `locale`
  on the four content models, `@@unique([locale, order])`, `@@index([order])`
  widened to `[locale, order]`; `Profile` deliberately left out (nothing renders
  it). **Source-file shape:** the arrays are *not* copied three times — shared
  facts (dates, stack, company/institution names) stay written once and only
  translatable fields sit under `i18n: { en, it, de }`, which the seed flattens
  into one row per locale; a date edit is still a one-line change. The query
  return types are byte-identical to before, so no component changed shape.
  `SkillCategory.items` went per-locale beyond the spec, because
  "AI-assisted code review" and "Multi-tenant systems" are prose, not product
  names, and would otherwise have stayed English. **Migration gotcha worth
  recording:** `prisma migrate dev` **cannot run in this non-interactive shell**
  — it insists on prompting before adding unique constraints, and
  `--create-only` prompts too. The way through is
  `prisma migrate diff --from-config-datasource --to-schema prisma/schema.prisma
  --script` (note: `--from-url` was **removed** in v7), writing the SQL into a
  hand-made `prisma/migrations/<timestamp>_name/` folder and applying it with
  `migrate deploy`. The generated SQL was read before applying — additive only,
  4 columns + 8 indexes, no data-destroying drops. `@default("en")` was added to
  the locale columns so the NOT NULL column could land on already-populated
  tables; a seed that ever forgot `locale` would now collide on the unique
  constraint and fail loudly rather than corrupt silently. **Review caught
  nothing broken but proved it rather than assuming**, via throwaway `tsx`
  scripts: no missing locale on any of the 19 entries; highlight/item counts
  identical across locales (so no bullet was silently dropped in translation);
  only the 2 intended prose categories diverge from the English item lists, so
  no typo crept into the other nine tech lists; and the 10 strings still
  identical to English are all legitimately so (`Part-time.` is the Italian
  loanword; `Frontend`/`Backend`/`DevOps & Cloud`/`Testing & QA` are
  untranslated in IT/DE tech usage). The message files had been rewritten with a
  Python `json.dump`, which can mass-reformat — checked, and the diff is
  **+3/−3 lines** each with indent and key order intact. Verified with
  `npm run build` (clean, all three locales still SSG at 1h), `npm run lint`
  (0 warnings), `prisma migrate status` in sync, both Neon branches migrated and
  reseeded to identical counts (1 user, 1 profile, **15** experience, **6**
  education, **3** project, **33** skill categories), SSR-HTML greps showing
  **0 hits** for six English phrases across `/it` and `/de` and zero
  `MISSING_MESSAGE`/`IntlError`, API routes returning the right language for
  `?locale=` and falling back to `en` on missing *or* garbage input, and a live
  browser pass switching **EN → IT → DE** and confirming the timeline re-rendered
  in each language — the cache-key fix doing its job. Only console errors came
  from a Chrome extension. **Also removed**, per the user: the
  "Available from 1 January 2027" Hero pill **and** the About → Quick facts row
  (back to 5 rows), the three dead message keys in all three locales, and the
  stale "Availability pill" line in `context/project-overview.md`. The
  Zivildienst timeline bullet keeps its own CV-sourced availability sentence.
  **Known and accepted:** the German is Claude's drafting, unverified by a native
  speaker (the user's own call — they are A2); Swiss orthography used throughout
  (`massgeschneidert`, not `maßgeschneidert`). **Open stylistic inconsistency
  flagged, not silently resolved:** the project title is localized in German
  (`NFT-Marktplatz`) but left as `NFT Marketplace` in Italian.

- **Rewrote the About copy in a sober register** on `feature/sober-about-copy`.
  The user rejected the existing About text outright. The request was genuinely
  ambiguous — *"fai qualcosa di più discreto"* (tone it down) sat next to
  *"pompa molto la mia posizione qui"*, which reads either as the **reason**
  ("it oversells me") or as a **second, opposite instruction** ("strengthen my
  positioning"). Those produce opposite copy, so rather than guess, three full
  drafts were put to the user as previews (sober/factual · discreet-but-stronger
  positioning · ultra-minimal). They chose **sober — just the facts**, plus
  **delete the AI paragraph entirely** and **keep the personal line**. Worth
  remembering: for a pure-copy task the tone *is* the deliverable, so guessing
  the register would have made the whole thing useless if wrong. **The rewrite:**
  `about.heading`, `p1` and `p2` replaced in all three locales, ~130 → **~60
  words**. Cut: *"A developer who ships"* / *"Uno sviluppatore che consegna"* /
  *"Ein Entwickler, der liefert"*, *"products people actually rely on"*,
  *"CI/CD I own end-to-end"*, and the whole *"I've learned where to lean on them
  and where to verify everything myself"* line. What remains names the domains
  (hospital EHR, Web3 e-commerce, SaaS on AWS) and the stack, with no adjectives.
  Every claim traces to `public/resume.pdf`; nothing invented. `about.aiLine` was
  deleted from `messages/{en,it,de}.json` and its `<p>` removed from
  `about.tsx` — AI / LLM Tools still renders **first** in the Skills grid and in
  the Goodcode experience bullet, so no fact was lost. **A copy conflict the
  approved draft would have shipped:** its heading was *"Chi sono."* — which is
  already the **eyebrow** printed directly above it (EN `About`, IT `Chi sono`,
  DE `Über mich`), so the section would have said the same words twice; naming
  the role instead would have duplicated the Hero. Resolved with headings that
  duplicate neither — `What I work on.` / `Di cosa mi occupo.` /
  `Woran ich arbeite.` — flagged to the user rather than applied silently.
  **Two stale lines in `context/project-overview.md`** were found while checking
  what depended on this copy and fixed in the same pass: line 118 still quoted
  the **pre-CV-sync** personal line ("gym & training … technology & open
  source"), and the `#### About` description still promised a "Short 2–3
  paragraph bio", which the rewrite makes untrue. **Dependency checked before
  editing, not after:** `prisma/seed.ts:42` builds `Profile.bio` from
  `` `${en.about.p1} ${en.about.p2}` `` and `personalLine` from
  `en.about.personalLine`, but never reads `aiLine` — so deleting that key could
  not break the seed. Both Neon branches were reseeded anyway so `Profile.bio`
  stops holding the old promotional text (the row is still rendered nowhere).
  Message files were edited with **targeted `Edit` calls rather than a Python
  `json.dump`**, per the lesson from the previous feature that a dump can
  silently mass-reformat — diffs held to **+3/−4 lines** each. Verified with
  `npm run build` (clean, all three locales still SSG), `npm run lint`
  (0 warnings), a grep confirming **no `aiLine` reference survives** in code or
  messages, all three message files still valid JSON at 12 namespaces, an
  SSR-HTML parse confirming exactly **3 paragraphs** in the About section per
  locale with zero `MISSING_MESSAGE`/`IntlError`, and a live browser pass on
  `/it` confirming the eyebrow and heading no longer collide. **Flagged, not
  fixed:** halving the prose leaves the left column noticeably shorter than the
  Quick facts card beside it, so About now sits a little asymmetric on desktop —
  a layout tweak if it bothers the user, deliberately not "fixed" by padding the
  copy back out. **Left in scope-adjacent but untouched:** the Hero tagline
  (rewritten from the CV one feature earlier; the complaint was about About
  specifically) and the compact "AI tooling · Claude · GitHub Copilot" quick
  fact, since the ask was to drop the AI *paragraph*, not the row.

- **Redesigned the portfolio, inspired by leoparpeix.com** on
  `feature/redesign-leoparpeix`, per
  `context/features/redesign-leoparpeix-spec.md`. **Research constraint worth
  recording:** the reference site could not be opened from this network —
  Sunrise Surf Protect DNS-sinkholes `leoparpeix.com` as **Malware** (a
  `Whalebone Sinkhole CA` cert and a "Sunrise - warning" page), and the Wayback
  Machine timed out. The block was **not bypassed**; the stack was pieced
  together from public write-ups (Awwwards SOTD 14 Sep 2026, mesh3d,
  landing.love) and an unofficial GitHub clone: Three.js/WebGL + GLSL, GSAP,
  Lenis, Vue 3 + Vite (inferred from the clone only). **User decisions up
  front:** *inspired*, not a full redesign (same sections); evolve the existing
  constellation into 3D rather than use models; keep dark-first + teal; `motion`
  instead of GSAP; no sound. **(1) Editorial typography/layout:** left-aligned
  hero with the name split over two lines at up to `text-9xl` (surname in muted
  grey) and the role as a teal eyebrow; `SectionHeading` gained an `index` prop
  for a numbered "01–06" marker on a full-width rule, plus a word-by-word
  masked slide-up (`aria-label` on the `h2`, split words `aria-hidden`);
  roomier `Section` padding; teal hover borders on cards/chips and an animated
  underline on nav links. **(2) Scroll:** new `smooth-scroll.tsx` mounts
  `ReactLenis root` with `anchors: { offset: -64 }` plus
  `MotionConfig reducedMotion="user"`, and skips Lenis entirely under reduced
  motion; the ⌘K jump-to-section routes through `lenis.scrollTo` (native
  `scrollIntoView` fallback) and the cmdk list got `data-lenis-prevent`; a
  `useScroll`-driven teal progress line sits under the nav; `Reveal` got a
  longer editorial ease. **(3) 3D hero:** new `hero-constellation-3d.tsx`
  (React Three Fiber v9 + three r186): 90 nodes as soft round point sprites
  (custom GLSL, size/opacity fall off with depth), per-frame neighbour lines
  with distance-based alpha, "synaptic" pulses, a gentle yaw sway and mouse
  parallax, teal from `useThemeColor`, `frameloop="never"` while off-screen
  via `IntersectionObserver`. New `hero-background.tsx` picks the scene: 3D
  when WebGL2 exists, the untouched 2D canvas otherwise, and always the 2D
  static frame under reduced motion; three/R3F load through `next/dynamic`
  (`ssr: false`). **React Compiler lint gotcha:** building the three.js buffers
  in `useMemo` and mutating them in `useFrame` tripped
  `react-hooks/immutability` and `react-hooks/purity`; the clean fix (no
  eslint-disable) was a module-level `createScene()` factory called inside an
  effect, stored in a ref and attached to an empty `<group>` imperatively, so
  nothing mutable is read during render. **Added after the first review, at
  the user's request:** a procedural floating laptop (light-grey body, dark
  screen with teal "code" lines) and a React atom logo (three flattened tori +
  nucleus) in `hero-floating-objects.tsx`, bobbing/spinning around the name
  and repositioned from viewport fractions (beside the name in landscape, above
  and below it in portrait). **Two real bugs found and fixed after the user
  reported the constellation not filling a PC screen:** (a) since the original
  2D feature (`714ee74`) the backdrop lived *inside* the `max-w-6xl` Section, so
  it was clipped to the 1152px content column — the hero is now a full-width
  `relative overflow-hidden` wrapper holding the backdrop, with only the text
  in the Section; (b) the "camera drift" was a continuous yaw, so after ~40s
  the wide-but-shallow node volume was seen side-on and collapsed into a
  central band — replaced by a ±0.2 rad sine sway, and the volume's half-width
  now follows the viewport (`max(9, vw/2 + 1)`, the +1 covering the ±0.6
  parallax shift), rescaling x on resize instead of piling nodes on the edges.
  Line opacity was later raised 0.35 → 0.6 (3D and 2D fallback) and the laptop
  moved to light grey with metalness 0.6 → 0.2, since a metallic material with
  no environment map renders dark whatever its colour. **Performance —
  measured, and accepted by the user:** Lighthouse mobile against local
  `next start`, two to three runs each, with `main` built in a throwaway
  worktree as the baseline: score 87–89 vs 93–96, TBT 250–300ms vs 40–60ms,
  LCP 2.9–3.3s vs 2.8–3.2s (so the spec's < 2.5s LCP target is unmet on
  **both** — not a regression), CLS 0, accessibility 100. Mounting the 3D on
  `requestIdleCallback` (300ms `setTimeout` on Safari) moved its long task
  after hydration but did **not** lower lab TBT, because TTI extends over any
  later long task; three.js is ~900 KB raw and R3F imports all of it.
  Loading 3D on first interaction was offered and declined (the hero would
  start empty). New deps: `lenis`, `three`, `@react-three/fiber`,
  `@types/three` — no `drei`, no `transpilePackages` needed. **Testing gotchas
  worth recording:** (1) the Chrome-extension tab stayed
  `visibilityState: hidden` with **0 rAF/s**, so animation screenshots were
  frozen or black — verification moved to headless Chrome (`--screenshot`,
  `--virtual-time-budget`) and a throwaway `puppeteer-core` script (needed to
  set `localStorage.theme` for the light-theme shot); (2) headless Chrome
  enforces a minimum window width (~500px), so a "390px" screenshot is silently
  cropped — the nav's right side missing was the tell; (3) headless screenshots
  of `#hash` URLs come out fully black — `main` produced the byte-identical
  image, so it is a harness quirk, not an app bug; (4) Turbopack refuses a
  `node_modules` symlink pointing outside the project root, so the baseline
  worktree used an APFS clone (`cp -Rc`) instead; (5) the first Lighthouse run
  read 44 / LCP 9s — a cold-start outlier that later runs did not reproduce.
  Verified with `npm run lint` (0 warnings), `npx tsc --noEmit`, `npm run build`
  (clean, `/en`, `/it`, `/de` still SSG at 1h), SSR-HTML greps with zero
  `MISSING_MESSAGE`/`IntlError`, the Lenis anchor landing Experience exactly
  under the 64px nav, and headless screenshots at 600, 1440, 1920 (after 45s of
  animation) and 2560px in dark and light plus a reduced-motion run.
  **Not verified by Claude, left to the user:** a real phone, and scrolling
  with the mobile menu or ⌘K dialog open (Lenis vs. the dialog scroll lock).
  The root `resume.pdf` / `resume (3).pdf` remain untracked, as before.

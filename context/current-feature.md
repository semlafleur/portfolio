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

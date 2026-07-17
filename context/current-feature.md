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

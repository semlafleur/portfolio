# Current Feature

## Status

<!-- Not Started|In Progress|Completed -->

In Progress

## Goals

<!-- Goals & requirements -->

**Phase 2 of 3 — fill each section with real content + build the animated
experience timeline.** Still display-only (no functional forms or i18n yet).
Match the reference screenshots and the dark-by-default theme from Phase 1.

- All content read from `src/data/portfolio-data.ts` — no hardcoded copy in components
- **Hero** — name (Samuele La Fleur), role (Full Stack Developer), tagline from
  the CV summary, primary CTA (contact / download CV)
- **About** — 2–3 paragraph bio ending with the discreet personal line
  ("Off the keyboard: gym & training, music across genres, AC Milan.")
- **Experience** — vertical timeline: thin teal line, dotted milestones, one
  entry per experience (company, role, location, dates, highlights, stack chips).
  Subtle on-scroll fade/slide animations with Framer Motion
- **Education** — SUPSI + CPT entries, clean and minimal
- **Skills** — categorized (Languages, Frontend, Backend, Databases,
  DevOps & Cloud, Tools, Methodologies) rendered as tags/chips
- **Contact** — display-only form UI (Name, Email, Message) + direct links
  (email, phone, LinkedIn, GitHub) + Download CV button
- **Footer** — social links + optional lite GitHub activity signal (static for now)
- Stack chips / tags styled consistently with the teal accent
- Keep everything responsive

## Notes

<!-- Any extra notes -->

- Full spec: `context/features/portfolio-phase-2.spec.md`
- Reference screenshots: `startSection`, `aboutSection`, `experienceSection`,
  `educationSection`, `skills`, `contactSection` under `context/screenshots/`
- Forms, i18n, and GitHub live-fetch remain deferred to a later phase

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

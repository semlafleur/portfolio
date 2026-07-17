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

# Current Feature

Portfolio UI — Phase 1

## Status

<!-- Not Started|In Progress|Completed -->

Completed

## Goals

<!-- Goals & requirements -->

- Next.js App Router project already scaffolded (TypeScript + Tailwind)
- ShadCN UI initialization and base components (button, dropdown, dialog)
- Global layout and styles (`app/[locale]/layout.tsx`)
- Sticky top nav (display only): logo/name on the left; on the right a
  dark/light toggle, an EN/IT/DE language switcher, a ⌘K hint, and a "Download CV" link
- Dark mode by default via `next-themes`, with the sun/moon toggle wired to it
- Teal accent color set up as a Tailwind token (`#14B8A6` light / `#5EEAD4` dark)
- Inter (or Geist) font configured
- Single-page scroll shell with empty section placeholders in order:
  Hero, About, Experience, Education, Skills, Contact — each just an
  `<h2>` with the section name for now (real content comes in phase 2)
- Fully responsive: mobile-first, nav collapses to a compact menu on small screens

## Notes

<!-- Any extra notes -->

Spec: @context/features/portfolio-phase-1-spec.md

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

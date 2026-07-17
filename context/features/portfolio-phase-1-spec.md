# Portfolio UI — Phase 1 Spec

## Overview
This is phase 1 of 3 for building the portfolio front-end. This phase sets up the
project scaffolding, global layout, theming, and non-functional placeholders for
each section. Use the screenshots referenced below for how it should look.

## Requirements for phase 1
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

## References
- @context/screenshots/startSection.png
- @context/screenshots/searchWithCommandK.png
- @context/project-overview.md
- @src/data/portfolio-data.ts
- @context/features/portfolio-phase-2-spec.md
- @context/features/portfolio-phase-3-spec.md

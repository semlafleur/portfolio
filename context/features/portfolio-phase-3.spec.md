# Portfolio UI — Phase 3 Spec

## Overview
This is phase 3 of 3 for building the portfolio front-end. Phases 1 and 2 produced
a fully styled, content-complete single-page site that is still display-only. This
phase makes the interactive features functional: command palette, i18n, working
contact form, SEO, and final polish. Use the screenshots referenced below for how
it should look.

## Requirements for phase 3
- **Command palette (⌘K)** — `cmdk` with fuzzy search and keyboard nav
  (↑ ↓ Enter Esc). Actions: jump-to-section, toggle theme, switch language,
  download CV, copy email, open LinkedIn/GitHub
- **Internationalization** — `next-intl` with locale-prefix routing
  (`/en`, `/it`, `/de`), browser-locale detection on first visit. All UI strings
  and narrative copy moved into `messages/en.json`, `messages/it.json`,
  `messages/de.json`. Language switcher in nav now functional
- **Dynamic CV** — download the PDF matching the active locale
  (`cv-en.pdf`, `cv-it.pdf`, `cv-de.pdf`)
- **Contact form (functional)** — Route Handler `/api/contact` + Resend,
  Zod validation, honeypot field, server-side rate limit
- **GitHub integration (lite)** — server-side fetch of public repos / total stars /
  last push via GitHub REST API, cached with `revalidate: 3600`, shown as a
  discreet activity signal in About or Footer
- **SEO + Open Graph** — per-locale Metadata API + dynamic OG image via `next/og`
- **Polish & performance** — lazy loading, `next/image` optimization, server
  components where possible, accessibility audit (contrast, focus states, aria
  labels), target Lighthouse 100/100/100/100
- **Deploy** — Vercel + custom domain + env vars (`RESEND_API_KEY`, etc.);
  enable Vercel Analytics as a stopgap

## References
- @context/screenshots/searchWithCommandK.png
- @context/screenshots/contactSection.png
- @context/project-overview.md
- @src/data/portfolio-data.ts
- @context/features/portfolio-phase-1-spec.md
- @context/features/portfolio-phase-2-spec.md

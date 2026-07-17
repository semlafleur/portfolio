# Portfolio UI — Phase 2 Spec

## Overview
This is phase 2 of 3 for building the portfolio front-end. Phase 1 set up the
scaffolding, global layout, theming, and empty section placeholders. This phase
fills each section with real content sourced from the data file, and builds the
animated experience timeline. Everything is still display-only (no functional
forms or i18n yet). Use the screenshots referenced below for how it should look.

## Requirements for phase 2
- All content read from `src/data/portfolio-data.ts` (no hardcoded copy in components)
- **Hero section** — name (Samuele La Fleur), role (Full Stack Developer),
  tagline from the CV summary, primary CTA (contact / download CV)
- **About section** — 2–3 paragraph bio, with the discreet personal line at the end
  ("Off the keyboard: gym & training, music across genres, AC Milan.")
- **Experience section** — vertical timeline: thin teal line, dotted milestones,
  one entry per experience (company, role, location, dates, highlights, stack chips).
  Subtle on-scroll animations with Framer Motion (fade/slide)
- **Education section** — SUPSI + CPT entries, clean and minimal
- **Skills section** — categorized (Languages, Frontend, Backend, Databases,
  DevOps & Cloud, Tools, Methodologies) rendered as tags/chips
- **Contact section** — form (Name, Email, Message) as display-only UI + direct
  links (email, phone, LinkedIn, GitHub) + Download CV button
- **Footer** — social links + optional lite GitHub activity signal (static for now)
- Stack chips / tags styled consistently with the teal accent
- Keep everything responsive and matching the dark-by-default theme from phase 1

## References
- @context/screenshots/startSection.png
- @context/screenshots/aboutSection.png
- @context/screenshots/experienceSection.png
- @context/screenshots/educationSection.png
- @context/screenshots/skills.png
- @context/screenshots/contactSection.png
- @context/project-overview.md
- @src/data/portfolio-data.ts
- @context/features/portfolio-phase-1-spec.md
- @context/features/portfolio-phase-3-spec.md

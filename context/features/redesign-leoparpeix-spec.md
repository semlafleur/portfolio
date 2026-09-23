# Spec — Portfolio redesign inspired by leoparpeix.com

## Reference

- **Site:** https://www.leoparpeix.com/ — portfolio by Léo Parpeix (art director &
  interactive designer, Paris), built with dev Thoma Lecornu. Awwwards **Site of
  the Day, 14 Sep 2026** (7.69; animations/transitions 8.40, accessibility 7.00,
  WPO 7.20).
- **Look:** light mode, minimal, strong typography, clean layouts, 3D elements
  (animals / architecture), animation, page transitions, micro-interactions,
  sound design.
- ⚠️ **Couldn't open the live site from this machine.** The Sunrise network
  (Surf Protect) flags `leoparpeix.com` as **Malware** and serves a warning page
  instead. That is probably a false positive (the site just won SOTD), but it was
  not bypassed. Wayback Machine also timed out. Everything below comes from public
  write-ups (Awwwards, mesh3d, landing.love) and a public clone. **Before `start`,
  open the site yourself on another network** and take screenshots into
  `context/screenshots/leoparpeix/` so the design is grounded in the real pages.

## Tech used by the reference (best evidence)

| Area | Reference | Source |
|------|-----------|--------|
| 3D / rendering | **Three.js + WebGL**, custom GLSL shaders (fluid sim, water deformation), Draco-compressed `.glb` models | mesh3d, Awwwards tags, clone repo |
| Animation | **GSAP** | clone repo |
| Smooth scroll | **Lenis** | clone repo |
| Framework | Vue 3 + Vite + Pinia (SPA) | clone repo (**inferred** — the clone is a recreation, not the original source) |
| Assets | Blender models (3 3D artists), After Effects, a sound designer, a copywriter | Awwwards / search credits |

## Feasibility

**Yes, doable in our stack. No framework change needed.** Vue isn't required;
every piece has a React/Next equivalent:

| Reference | Our equivalent |
|-----------|----------------|
| Three.js | `three` + `@react-three/fiber` + `@react-three/drei` (client-only, `dynamic(..., { ssr: false })`) |
| GLSL shaders | `shaderMaterial` from drei, `.glsl` as template strings (no loader plugin) |
| GSAP | `gsap` + `@gsap/react` (`useGSAP`). GSAP is now free, including SplitText |
| Lenis | `lenis` (`lenis/react`) |
| Page transitions | Single page today, so section-level scroll choreography. No router transitions |
| Sound | Optional, **muted by default**, toggle in the nav |

Existing `motion` (Framer) could cover the simpler reveals. Using both GSAP and
motion means two animation libraries, so pick one during `start` (see Q4).

**What makes it hard isn't the code, it's the assets and the tradeoffs:**
1. **3D models and sound.** The reference uses bespoke work by 3 3D artists and
   a sound designer. We have none. Options: free CC0 models (Poly Pizza,
   Sketchfab CC0), procedural/shader-only visuals (no models), or evolving the
   existing hero constellation into 3D.
2. **Performance.** The project targets Lighthouse 100. A WebGL-heavy site won't
   hit that (the reference itself scores 7.2/10 WPO). We need lazy loading, a
   static fallback, and a small bundle budget.
3. **Accessibility.** `prefers-reduced-motion` must disable Lenis, GSAP
   choreography, and 3D motion (the hook already exists:
   `src/hooks/use-prefers-reduced-motion.ts`). Content stays real DOM text, never
   rendered into the canvas.
4. **Audience fit.** Recruiters scan fast. A creative-agency site risks hiding
   the content (experience/skills) behind the show. That clashes with the current
   "Vercel / Linear minimal" direction in `project-overview.md`.
5. **Design direction change.** The reference is light mode; ours is dark-first
   with a teal accent.

## Decisions (user, 2026-09-23)

| Question | Decision |
|----------|----------|
| Scope | **Inspired**: new typography, layout rhythm, animations, 3D hero. Same sections and structure |
| 3D | **Evolve the existing hero constellation into 3D**. No external models |
| Theme | **Keep dark-first + teal** (no switch to light) |
| Animation | **`motion`** (already installed). **No GSAP** |
| Sound | **None** |

## Goals

- New visual language inspired by the reference: bold editorial typography,
  generous whitespace, strong grid, hover micro-interactions. Keep the dark-first
  palette and teal accent from `globals.css`
- Smooth scroll with **Lenis** (`lenis/react`), off under `prefers-reduced-motion`
- Scroll-driven reveals / text splits with **`motion`** (`useScroll`,
  `useTransform`), extending the existing `Reveal` instead of adding a second one
- **3D constellation hero**: port `hero-constellation-background.tsx` from 2D
  canvas to **React Three Fiber** (`three` + `@react-three/fiber`). Nodes in 3D
  space, depth/perspective, slow camera drift, mouse parallax, teal from
  `useThemeColor`. Lazy-loaded (`next/dynamic`, `ssr: false`), with the current
  2D canvas (or a static frame) as the fallback for reduced motion and no-WebGL
- Every existing feature keeps working: i18n EN/IT/DE, DB content, ⌘K, contact
  form, theme toggle, SEO/OG
- No accessibility regression; performance budget: LCP < 2.5s on mobile, and the
  3D bundle stays off the critical path
- Delivered in steps: typography/layout → Lenis + motion reveals → 3D
  constellation

## New dependencies (only these)

- `three`, `@react-three/fiber` (+ `@types/three`). `drei` only if it measurably
  saves code
- `lenis`

## Out of scope

- GSAP, sound, 3D models, light-first theme (decided against)
- Copying the reference's assets, copy, or code (inspiration only, not a clone)
- Multi-page routing / page transitions (the site stays single-page)
- Content changes (CV data stays as it is)

## Sources

- https://www.awwwards.com/sites/leo-parpeix-portfolio-2026
- https://mesh3d.gallery/website/leo-parpeix-art-director-interactive-designer
- https://www.landing.love/sites/leoparpeix/
- https://github.com/CW-Ankit/leoparpeix-clone (unofficial recreation)

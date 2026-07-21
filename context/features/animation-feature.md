# Animated "neural constellation" hero background

## Overview

Add an animated background behind the hero name: glowing nodes connected by
lines (neural network / constellation effect), with pulses traveling along
the connections. All colors (nodes, lines, glow, pulses) derive from the
theme's primary color at runtime — no hardcoded hex in the component — so
the effect automatically adapts to dark/light mode and to any future
palette change.

## Confirmed project facts (checked before implementation)

- Theme switching uses a `.dark` class on `<html>` (`next-themes`,
  `@custom-variant dark (&:is(.dark *))` in `src/app/globals.css`) — not
  `data-theme`.
- `--primary` is **not** HSL. In `src/app/globals.css` it resolves to
  `--teal`, which is a **hex** literal: `#14b8a6` (light, `:root`) and
  `#5eead4` (dark, `.dark`). The spec's own snippet assumed HSL — that
  assumption is wrong for this repo. The color-reading hook must parse hex
  (`#rrggbb`) to an `"r g b"` string, not HSL-to-RGB.

## Functional requirements

1. Full-bleed canvas positioned behind the hero name text: `position:
   absolute`, `z-index` below the text.
2. N nodes (default 50–60) moving slowly and continuously inside the
   canvas, bouncing off the edges.
3. Connection lines between nodes within a maximum distance
   (`connectionDistance`), with opacity inversely proportional to distance.
4. Glowing pulses that periodically travel from one node to a nearby node
   along the connection line ("synaptic signal" effect).
5. Slight depth effect: nodes with variable size/opacity (simulating a
   pseudo z-axis).
6. Subtle parallax on mouse movement (offset of the whole layer, not
   individual nodes).
7. All colors (node, line, glow, pulse) derive from a single source: the
   theme's primary color (`--primary`, resolved via `--teal`), read at
   runtime.

## Non-functional requirements

- **Performance**: 60fps on desktop, controlled degradation on mobile.
- **Accessibility**: respect `prefers-reduced-motion` — if active, show a
  static version (fixed nodes and lines, no animation) or fully disable
  the effect.
- **No impact on TTI/LCP**: the canvas must not block rendering of the
  text, which is the priority element.
- **SSR-safe**: no access to `window`/`document` outside `useEffect`
  (avoid hydration mismatches).
- **Responsive to window resize.**
- **Responsive to theme changes** (dark/light) without a page reload.

## Handling the primary color

Read `--primary` from computed style at runtime (never hand-write the
color in the component) and normalize to an `"r g b"` string so
`rgba(r, g, b, alpha)` can be built dynamically per element (node, line,
glow, pulse) with different alpha values. Since `--primary` resolves to a
hex literal in this repo (see confirmed facts above), the conversion is
hex → `"r g b"`, not HSL → RGB.

Recompute the color when the `dark` class on `<html>` changes, via a
`MutationObserver` on the `class` attribute (decouples the hook from
whatever triggers the theme change — no dependency on `next-themes`
internals).

## Component architecture

```
src/components/
  hero-constellation-background.tsx   <- client component, canvas + animation
src/hooks/
  use-prefers-reduced-motion.ts       <- reusable hook
  use-theme-color.ts                  <- hook returning the current primary color, updates on theme change
```

`hero-constellation-background.tsx` is a client component (`"use client"`),
mounted inside the hero section, behind the name text:

```tsx
<section className="relative">
  <HeroConstellationBackground />
  <h1 className="relative z-10">Samuele</h1>
</section>
```

## Component props

| Prop                 | Type      | Default | Description                                       |
| --------------------- | --------- | ------- | --------------------------------------------------- |
| `nodeCount`          | `number`  | `55`    | Number of nodes                                    |
| `connectionDistance` | `number`  | `110`   | Max distance (px) to draw a connection             |
| `pulseFrequency`     | `number`  | `0.03`  | Per-frame probability of spawning a new pulse      |
| `speed`              | `number`  | `0.25`  | Node movement speed                                |
| `disableOnMobile`    | `boolean` | `false` | If `true`, don't mount the effect below a breakpoint |

## Implementation plan

1. `use-theme-color`: expose the current primary color as an `"r g b"`
   string, reactive to theme changes (hex → rgb parse + `MutationObserver`
   on `<html class>`).
2. `use-prefers-reduced-motion`: detect the user preference
   (`matchMedia("(prefers-reduced-motion: reduce)")`, reactive to changes).
3. `hero-constellation-background.tsx`:
   - Canvas sized via `ResizeObserver` on the container (never
     content-dependent dimensions — always `100%`/`100%` of parent, to
     avoid layout shift).
   - Initialize nodes with random position/velocity.
   - `requestAnimationFrame` loop: update positions → draw lines → draw
     active pulses → draw nodes with glow.
   - If `prefers-reduced-motion` is true: draw a single static frame and
     don't start the loop.
   - Clean up `requestAnimationFrame` and `ResizeObserver` in the
     `useEffect` return.
4. Integrate into the hero, behind the text, `aria-hidden="true"` on the
   canvas (purely decorative).
5. Manual testing: dark/light mode, window resize, `prefers-reduced-motion`
   enabled via devtools, CPU throttling to check mobile degradation.

## Acceptance criteria

- [ ] Animation color automatically changes if the theme's primary color
      changes (no hardcoded hex in the component).
- [ ] Visually consistent in both dark and light mode.
- [ ] No hydration mismatch errors in the console.
- [ ] With `prefers-reduced-motion: reduce` enabled, the animation doesn't
      start (or is static).
- [ ] No layout shift caused by the canvas (dimensions always
      `100%`/`100%` of the parent container, never content-dependent).
- [ ] Proper cleanup: no `requestAnimationFrame` leak when the component
      unmounts (e.g. page change via router).

## Future extensions (out of scope for this iteration)

- Version using React Three Fiber + `@react-three/postprocessing` (Bloom)
  for real 3D depth instead of simulated depth.
- Stronger interaction: nodes repelling/attracting on cursor proximity.
- Variant with multiple node "clusters" to suggest a more organic network
  structure.

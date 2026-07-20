# Script Tag Console Error on Language Switch

## 1. Description

Every time the locale is switched (EN/IT/DE), Next.js logs a console error
in the browser:

> Console Error: Encountered a script tag while rendering React component.
> Scripts inside React components are never executed when rendering on the
> client. Consider using template tag instead
> (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template).

The error originates from `src/app/[locale]/layout.tsx` (`RootLayout`,
around the `<body>` / `NextIntlClientProvider` / `ThemeProvider` tree, line
~83). The stack trace points into `next-themes`' `ThemeProvider`
(`src/components/theme-provider.tsx`, a thin wrapper around
`next-themes`'s `ThemeProvider`) — `next-themes` injects an inline
`<script>` tag (server-side) to set the theme class before hydration and
avoid a flash of the wrong theme.

## 2. Actual Behavior

Switching the language (via the Nav language pills, mobile menu, or the
command palette) triggers this React console error on every switch. The
script tag next-themes renders for the no-flash-of-wrong-theme trick is
apparently being reconciled by React on the client during the locale
navigation, which React doesn't allow.

## 3. Expected Behavior

Switching locale should not produce any console errors. Theme should still
apply instantly without a flash, but without React attempting to
render/diff the `<script>` tag on the client.

## References

- `src/app/[locale]/layout.tsx` — `RootLayout`, where `ThemeProvider` /
  `NextIntlClientProvider` are mounted
- `src/components/theme-provider.tsx` — `next-themes` wrapper
- `next-themes` docs on the no-flash script injection

## Investigation

Reproduced in `npm run dev` (Turbopack): the warning fires exactly once, on
the very first client-side navigation after page load (any locale pair,
first switch only — never again in the same session). Read `next-themes`
0.4.6's source (`node_modules/next-themes/dist/index.mjs`): its internal
memoized `_` component always renders a raw `<script>` JSX element
(`t.createElement("script", ...)`) to set the theme class before hydration
and avoid a flash.

Decisive test: built and ran production (`npm run build && npm run start`
on a separate port) and repeated the same locale switches — **zero console
errors**, theme still applied correctly every time. This confirms the
warning is a **React development-mode-only check** (stripped in production
builds) that fires because Turbopack's dev server recreates that `<script>`
DOM node client-side on the first post-hydration route transition, instead
of reusing the server-hydrated one. It's a known upstream limitation in how
`next-themes` 0.4.6 renders its no-flash script (plain JSX `<script>`
instead of `next/script`/React 19 resource hoisting), combined with a
React-19-only dev warning — not a bug in this codebase's code, and not
reproducible in production.

No functional impact: theme state applies and persists correctly in both
dev and prod, across every locale switch tested.

## Status

Closed — Won't Fix. Confirmed dev-mode-only React warning (stripped in
production builds), no functional impact on theme behavior. User decision:
accept as-is rather than add workaround code for a cosmetic issue.

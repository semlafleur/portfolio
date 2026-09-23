# Spec — Link preview (Open Graph) that actually works

## Request

When the portfolio link is shared (WhatsApp, LinkedIn, Telegram, Slack, iMessage…)
it should unfurl into a card with title, description and a small image.

## Finding: the feature exists, but it is broken in production

Phase 3 already added per-locale `generateMetadata` (title, description, OG,
Twitter card, canonical, hreflang) and a dynamic OG image at
`src/app/[locale]/opengraph-image.tsx`. The live HTML on `www.slafleur.dev/en`
(checked 2026-09-23) shows why no preview appears:

```
<meta property="og:image" content="http://localhost:3000/en/opengraph-image?…">
<meta property="og:url"   content="http://localhost:3000/en">
<link rel="canonical"     href="http://localhost:3000/en">
```

- **Root cause:** `src/app/[locale]/layout.tsx:23` sets
  `metadataBase` from `process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"`,
  and `NEXT_PUBLIC_SITE_URL` was never set on Vercel (`vercel env ls` has no
  such variable; it was listed as deferred in Phase 3). Every absolute URL in
  the metadata falls back to localhost, so crawlers can't fetch the image and
  show a bare link.
- **Side effect, also fixed by this:** `canonical` and `hreflang` point to
  localhost too, which is wrong for SEO.
- The image route itself works on the live domain
  (`/en/opengraph-image` → `200 image/png`, 1200×630).

## Other gaps found

- **The OG image is plain:** default font (the `fontWeight: 700` doesn't render
  because no font is loaded), no teal beyond the "SL" dot, and nothing that
  echoes the redesign.
- **Favicon is still the default Create Next App one** (`src/app/favicon.ico`,
  added in the initial commit). Some apps (Slack, Telegram, Google results) show
  this small icon next to the link.
- **Square crops:** WhatsApp and iMessage often show a small square thumbnail
  cropped from the centre of the 1200×630 image, so key content should sit
  in the centre.
- `og:locale` is `en` / `it` / `de`; the OG convention is `en_US`-style
  (`en_US`, `it_CH`, `de_CH`). Minor.

## Goals

- `metadataBase` resolves to `https://www.slafleur.dev` in production:
  og:image, og:url, twitter:image, canonical and hreflang are all absolute
  production URLs
- Redesigned OG image in the site's style: dark background, teal accent,
  editorial name, role, per locale (EN/IT/DE), with the content centred so a
  square thumbnail crop still reads
- Replace the default Next.js favicon with an "SL" icon (plus `apple-icon`)
  generated via Next's metadata file conventions
- `og:locale` in `xx_YY` form
- Verified live after deploy: meta tags in the HTML, image URL returns 200,
  and a real preview check (opengraph.xyz / LinkedIn Post Inspector / a
  WhatsApp message)

## Decisions (user, 2026-09-23)

| Question | Decision |
|----------|----------|
| Photo or logo in the preview | **Logo**: the "SL" mark in a designed card, no personal photo |
| Base URL | **`NEXT_PUBLIC_SITE_URL=https://www.slafleur.dev` set on Vercel** (Production only, done 2026-09-23). No code change to the fallback; it takes effect on the next build |

## Out of scope

- Per-section share images (the site is single-page)
- `sitemap.xml` / `robots.txt` (separate SEO feature)

## Notes

- Local Next docs: `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/01-metadata/{opengraph-image,app-icons}.md`
  and `04-functions/generate-metadata.md` (`metadataBase`).
- Crawlers cache previews: WhatsApp and LinkedIn may keep the old (empty)
  preview for a while; LinkedIn Post Inspector forces a re-scrape.

# 🗂️ Portfolio — Project Overview

**Samuele La Fleur · Full Stack Developer**

> A modern, product-like personal portfolio. Minimal aesthetic with a teal accent, focused on **skills + experience + education**. Built with Next.js, shipped in two phases: a fast-deployable **MVP** first, then an incremental **post-launch roadmap** of advanced features added while the site is already live.

---

## 📑 Table of Contents

1. [Problem](#1--problem)
2. [Users](#2--users)
3. [Features](#3--features)
4. [Data Model](#4--data-model)
5. [Architecture](#5--architecture)
6. [Tech Stack](#6--tech-stack)
7. [UI / UX](#7--ui--ux)
8. [Repo Structure & Docs](#8--repo-structure--docs)
9. [Roadmap & Next Steps](#9--roadmap--next-steps)

---

## 1. 🎯 Problem

A professional link to share with recruiters and contacts — showing who you are and what you can do, in a way that's more modern and alive than a PDF CV. A **digital business card** that reinforces the CV and, over time, becomes a showcase of technical skill through the portfolio itself.

---

## 2. 👥 Users

| User | Need | Behaviour |
|------|------|-----------|
| **Recruiters / HR** | Coherent stack and role history | Fast scan |
| **Hiring managers** | Real, demonstrable experience | Deeper read |
| **Direct contacts** *(Riccardo, Giovanni @ Roche, …)* | Quick sense of the person | Informal, link shared in chat |

**Language:** **EN** as default (Basel target, English-friendly companies). Translations in **IT** (Italian-speaking contacts, Ticino) and **DE** (German-speaking recruiters).

---

## 3. 🧩 Features

### 📄 Site sections (Phase 1)

#### Hero
- **Name:** Samuele La Fleur
- **Role:** Full Stack Developer
- **Tagline** *(from CV Professional Summary)* — e.g. *"4+ years building scalable web and mobile applications across healthcare, Web3, and SaaS. TypeScript, React, Node.js, cloud-native on AWS."*
- **Primary CTA:** contact / download CV

#### About
Short 2–3 paragraph bio, based on the CV Professional Summary.

#### Experience — timeline
Faithful to the CV:

**1 · Goodcode SA** — Full Stack Developer · Manno, Switzerland · *Apr 2024 – Present*
- EdilControl v2 (serverless AWS, multi-tenant, GitHub Actions pipeline)
- Freename (Web3 e-commerce, on-chain minting, PDF invoice pipeline)
- PDF generation microservice
- Mobile app release management
- **Stack:** TypeScript · React · Next.js · NestJS · Spring Boot · AngularJS · PostgreSQL · AWS Lambda · AWS SAM · GitHub Actions · Docker

**2 · Elysium (Startup)** — Front-End Developer · Lugano · *Dec 2022 – Jan 2024*
- Cross-platform mobile wallet (fiat + crypto)
- **Stack:** TypeScript · React Native · Expo · Redux

**3 · Ente Ospedaliero Cantonale (EOC)** — Full Stack Developer · Bellinzona · *Sep 2021 – Mar 2024*
- EHR system, developer tooling web app, custom Flowable BPM client (50+ departments), Node.js → Spring Boot migration
- **Stack:** TypeScript · React · Next.js · Spring Boot · Node.js · MongoDB · Redux · Feathers · MUI · Jenkins · Docker · Rancher · Kubernetes

**4 · Ente Ospedaliero Cantonale (EOC)** — Trainee Software Developer · Bellinzona · *May 2017 – Aug 2021*
- 4-year apprenticeship + final thesis on the REGA application
- **Stack:** TypeScript · React · Node.js · MongoDB · Redux · Feathers · MUI · Docker

#### Education
- **SUPSI** — BSc in Computer Science · Lugano · *Sep 2021 – Aug 2025*
- **Centro Professionale Tecnico (CPT)** — AFC Software Developer with Federal Diploma · Locarno · *Sep 2017 – Jun 2021*

#### Skills / Stack

| Category | Technologies |
|----------|--------------|
| **Languages** | JavaScript / TypeScript · Java · C++ · C · PHP · Bash |
| **Frontend** | React · Next.js · AngularJS · React Native · Redux Toolkit · Tailwind CSS · Material UI |
| **Backend** | Node.js · NestJS · Spring Boot · Feathers |
| **Databases** | PostgreSQL · MongoDB · MySQL · Oracle |
| **DevOps & Cloud** | AWS · Lambda · AWS SAM · Docker · Kubernetes · Rancher · Jenkins · GitHub Actions |
| **Tools** | Git · GitHub · Bitbucket · Jira · VS Code · IntelliJ IDEA · Studio 3T |
| **Methodologies** | Scrum · Agile · CI/CD |

#### Spoken languages
- 🇮🇹 **Italian** — Native
- 🇬🇧 **English** — Professional working proficiency (B2)
- 🇩🇪 **German** — Basic (A2)

#### Personal *(light touch)*
A discreet line at the end of About:
> *"Off the keyboard: gym & training, music across genres, AC Milan."*

#### Contact
Integrated form + direct info:
- **Form** fields: Name, Email, Message → sent via email service (Resend)
- 📧 **Email:** semlafleur@hotmail.com
- 📱 **Phone:** +41 78 772 6025
- 💼 **LinkedIn:** [linkedin.com/in/samuele-la-fleur](https://linkedin.com/in/samuele-la-fleur)
- 🐙 **GitHub:** [github.com/samuelelafleur](https://github.com/samuelelafleur)
- ⬇️ **Download CV (PDF)** button

---

### 🚀 Phase 1 — MVP *(deployable immediately)*

High-impact / low–medium-effort features for the first release:

| Feature | Notes |
|---------|-------|
| 🌗 **Dark / Light mode** | Sun/moon toggle in nav, `next-themes`, preference persistence |
| 🌐 **Multi-language EN/IT/DE** | Locale-prefix routing (`/en`, `/it`, `/de`) via `next-intl`, browser detection on first visit, UI + narrative translations |
| ⌘K **Command palette** | `cmdk` — jump-to-section, toggle theme, switch language, download CV, copy email, open LinkedIn/GitHub. Fuzzy search + keyboard nav (↑ ↓ Enter Esc) |
| 🔗 **SEO + Open Graph** | Per-locale Metadata API + dynamic OG image via `next/og` |
| 📅 **Animated experience timeline** | Vertical timeline, teal line, on-scroll animations with Framer Motion (subtle fade/slide) |
| 📄 **Dynamic CV** | Download the PDF matching the active locale (`cv-en.pdf`, `cv-it.pdf`, `cv-de.pdf`), contextual button in nav + Contact |
| 🐙 **GitHub integration (lite)** | Live fetch via GitHub REST API (public repos, total stars, last push). Cached with `revalidate` to respect rate limits. No dedicated projects section — just an aggregated "activity signal" in About or Footer |
| ⚡ **Performance & accessibility** | Target Lighthouse 100/100/100/100 — lazy loading, `next/image`, server components where possible, verified contrast, focus states, aria labels |
| 📱 **Responsive** | Mobile-first, clean breakpoints, nav collapses to a compact menu on small screens |

---

### 🔮 Phase 2 — Future roadmap *(post-launch, incremental)*

Ambitious features added while the site is already live and shareable. Each becomes a mini-project worth telling on its own.

#### 🤖 AI Assistant
Chatbot that knows the portfolio via **RAG** (embeddings of CV + project descriptions).
- **UI:** streaming responses, session history, starter suggestions (*"What technologies do you use?"*, *"Tell me about EOC"*), markdown + syntax highlighting.
- **Free API options** *(evaluate when we get there):*

  | Provider | Why |
  |----------|-----|
  | **Groq** | Fast free tier, Llama 3.x / Mixtral, great streaming |
  | **Google Gemini Flash** | Free tier ~1500 req/day, good multilingual |
  | **Cloudflare Workers AI** | Free tier, easy if hosting on Cloudflare |
  | **OpenRouter** | Model aggregator, some free |

- Abstract the provider behind the **Vercel AI SDK** so swapping is trivial.
- Server-side **rate limit** (per user / IP) is mandatory to prevent abuse.

#### 📊 Analytics dashboard
Usage metrics (visits, CV downloads, link clicks, referrer, device).
- Backend: **Spring Boot + PostgreSQL** for collection & aggregation — a chance to show the full stack end-to-end.
- **UI:** Vercel-style cards + Recharts/Plotly charts.
- **Low-effort stopgap meanwhile:** Vercel Analytics or Plausible (privacy-friendly, zero backend).

#### 💻 Live React playground
Mini editor with live preview for React components (Button, Card, Badge…). Visitors edit code and see the result instantly.
- Library: **Sandpack** (CodeSandbox) or **react-live**.

#### 📱 PWA
Installable, offline mode, manifest, icons, splash screen — via **next-pwa** or a custom service worker.

---

### 📌 Finalized decisions

| Decision | Status |
|----------|--------|
| **Structure** — single-page scroll, sticky nav (Home · About · Experience · Education · Skills · Contact) | ✅ |
| **Selected Projects** section | ❌ CV-only showcase (real projects live inside the experience entries) |
| **Contact** — integrated form + direct links | ✅ |
| **Dark mode** with toggle | ✅ |
| **Multi-language** EN + IT + DE | ✅ |
| **Command palette ⌘K** | ✅ Phase 1 |
| **SEO + OG image** | ✅ Phase 1 |
| **AI Assistant** (free API) | ⏳ Phase 2 |
| **Analytics dashboard** (Spring Boot + PostgreSQL) | ⏳ Phase 2 · Vercel Analytics as stopgap |
| **Live playground** | ⏳ Phase 2 |
| **PWA** | ⏳ Phase 2 |

---

## 4. 🗃️ Data Model

### Phase 1 — static content in the repo
No DB, no backend. Structured content only:
- TS/JSON files for experience, education, skills (one per section — easy to update)
- Translation files in `messages/` (`en.json`, `it.json`, `de.json`) for UI + narrative copy
- CV PDFs in `/public`, one per language (`cv-en.pdf`, `cv-it.pdf`, `cv-de.pdf`)

The Phase 1 content shapes, typed in TypeScript:

```typescript
// data/experience.ts
export type Experience = {
  company: string;
  role: string;
  location: string;
  startDate: string;   // "2024-04"
  endDate: string | null; // null = present
  highlights: string[];
  stack: string[];
};

// data/education.ts
export type Education = {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
};

// data/skills.ts
export type SkillCategory = {
  category: string;    // "Frontend"
  items: string[];
};
```

### Phase 2 — persistence introduced

When the AI Assistant and Analytics dashboard land, a real datastore enters. The models below are illustrative Prisma schemas for the analytics backend and the RAG vector store — the vector store may instead be handled by a managed service (Upstash Vector) or pre-computed JSON embeddings for a dataset this small.

```prisma
// prisma/schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  extensions = [pgvector(map: "vector")]
}

/// ── Analytics ──────────────────────────────

enum EventType {
  PAGE_VIEW
  CV_DOWNLOAD
  LINK_CLICK
  CONTACT_SUBMIT
  CHAT_MESSAGE
}

model AnalyticsEvent {
  id        String    @id @default(cuid())
  type      EventType
  locale    String    // "en" | "it" | "de"
  path      String    // e.g. "/en#experience"
  referrer  String?
  device    String?   // "mobile" | "desktop" | "tablet"
  country   String?
  meta      Json?     // link target, CV variant, etc.
  createdAt DateTime  @default(now())

  @@index([type, createdAt])
  @@index([createdAt])
}

/// Optional daily rollups for fast dashboard reads
model DailyMetric {
  id        String    @id @default(cuid())
  date      DateTime  @db.Date
  type      EventType
  count     Int       @default(0)

  @@unique([date, type])
}

/// ── RAG vector store (pgvector) ────────────

model PortfolioChunk {
  id        String                      @id @default(cuid())
  source    String   // "experience" | "cv" | "skills" | "about"
  content   String   // the chunked text
  embedding Unsupported("vector(1536)")?
  createdAt DateTime                    @default(now())

  @@index([source])
}

model ChatSession {
  id        String        @id @default(cuid())
  visitorId String        // anonymous / cookie-based
  messages  ChatMessage[]
  createdAt DateTime      @default(now())
}

model ChatMessage {
  id        String      @id @default(cuid())
  session   ChatSession @relation(fields: [sessionId], references: [id], onDelete: Cascade)
  sessionId String
  role      String      // "user" | "assistant"
  content   String
  createdAt DateTime    @default(now())

  @@index([sessionId, createdAt])
}
```

---

## 5. 🏗️ Architecture

### Phase 1 — frontend-only (Vercel)

```
┌──────────────────────────────────────────────────────────┐
│                        Visitor                             │
└───────────────────────────┬──────────────────────────────┘
                            │
                            ▼
┌──────────────────────────────────────────────────────────┐
│                Next.js App (Vercel)                        │
│                                                            │
│   app/[locale]/  ── Server Components ── static content    │
│         │                                   (data/*.ts)    │
│         ├── Hero · About · Experience · Education · Skills │
│         ├── ⌘K command palette (cmdk)                      │
│         ├── next-intl (EN/IT/DE)  ·  next-themes (dark)    │
│         └── next/og  →  dynamic OG image                   │
│                                                            │
│   Route Handlers                                           │
│         ├── /api/contact ──────► Resend  (email)           │
│         └── (server fetch) ────► GitHub REST API           │
│                                   revalidate: 3600         │
└──────────────────────────────────────────────────────────┘
```

### Phase 2 — full-stack add-ons

```
┌──────────────┐        ┌──────────────────────┐
│  Next.js     │  chat  │  Vercel AI SDK        │
│  (Vercel)    │───────►│  → Groq / Gemini /    │
│              │        │    Cloudflare AI      │
│   AI chat UI │◄───────│  + RAG retrieval      │
│              │        └──────────┬───────────┘
│   Analytics  │                   │ embeddings
│   dashboard  │                   ▼
│   (Recharts) │        ┌──────────────────────┐
└──────┬───────┘        │ Vector store         │
      │ events         │ (pgvector / Upstash) │
      ▼                 └──────────────────────┘
┌──────────────────────┐
│  Spring Boot API     │───► PostgreSQL
│  (Railway / Render)  │     (events + rollups)
└──────────────────────┘
```

---

## 6. 🛠️ Tech Stack

### Phase 1 — frontend-only, deployed on Vercel

| Concern | Choice |
|---------|--------|
| **Framework** | Next.js (App Router, TypeScript) |
| **Styling** | Tailwind CSS + shadcn/ui for base components (form, ⌘K dialog, dropdown) |
| **Content** | Structured TS/JSON files |
| **Icons** | [lucide-react](https://lucide.dev) |
| **Font** | Inter or Geist |
| **Dark mode** | [`next-themes`](https://github.com/pacocoursey/next-themes) |
| **i18n** | [`next-intl`](https://next-intl.dev) — locale-prefix routing |
| **Command palette** | [`cmdk`](https://cmdk.paco.me) |
| **Animation** | [`framer-motion`](https://www.framer.com/motion/) |
| **SEO / OG image** | `next/og` + per-locale Metadata API |
| **Contact form** | Route Handler `/api/contact` + [Resend](https://resend.com) + Zod validation + honeypot + rate limit |
| **GitHub data** | GitHub REST API, server-side fetch with `revalidate: 3600` |
| **Hosting** | [Vercel](https://vercel.com) |
| **Custom domain** | Recommended — `samuelelafleur.dev` / `.ch` |
| **Analytics (stopgap)** | Vercel Analytics or Plausible |

### Phase 2 — add-ons

| Concern | Choice |
|---------|--------|
| **AI** | Vercel AI SDK abstraction + free provider (Groq / Gemini Flash / Cloudflare Workers AI) |
| **RAG** | Portfolio embeddings (pre-computed or via provider), lightweight vector store (pgvector or Upstash Vector) |
| **Analytics backend** | Spring Boot + PostgreSQL on Railway / Render / VPS |
| **Playground** | Sandpack or react-live |
| **PWA** | next-pwa |

---

## 7. 🎨 UI / UX

**Visual direction:** minimal, clean, generous whitespace, readable typography.
**Inspiration:** Vercel · Linear · Raycast · Notion · Stripe · Arc — minimal design, light blur/glassmorphism, curated micro-interactions, fluid transitions, rounded corners, soft shadows.

### Palette

| Mode | Background | Text | Accent |
|------|-----------|------|--------|
| **Light** | white / off-white | dark grey / black | teal |
| **Dark** | black / near-black | light grey | teal |

**Accent — teal** on links, primary buttons, hover, details:
- `#14B8A6` — `teal-500` (light)
- `#5EEAD4` — `teal-300` (on dark)

### Detail
- **Typography:** modern sans-serif (Inter / Geist), sharp hierarchy
- **Layout:** simple grid, subtle transitions, no intrusive animation
- **Experience timeline:** vertical, minimal, thin teal line, dotted milestones, animated on scroll
- **Sticky top nav:** smooth scroll to sections + dark/light toggle + language switcher + `⌘K` hint + CV link
- **Dark/light toggle:** sun/moon icon, soft transition
- **Language switcher:** compact dropdown or EN/IT/DE buttons
- **Command palette:** discreet `⌘K` hint in nav on desktop

## design refences
 ### Screenshots / mockups
    Refer to the screenshots below is the base for the design direction. The final implementation may differ slightly, but the overall aesthetic and layout should remain consistent.
references: [Screenshots]
    - @context/screenshots/aboutSection.png
    - @context/screenshots/experienceSection.png
    - @context/screenshots/educationSection.png
    - @context/screenshots/skills.png
    - @context/screenshots/startSection.png
    - @context/screenshots/contactSection.png
    - @context/screenshots/searchWithCommandK.png

---

## 8. 📂 Repo Structure & Docs

```
portfolio/
├── app/
│   └── [locale]/
│       ├── layout.tsx
│       ├── page.tsx
│       └── api/
│           └── contact/route.ts
├── components/
│   ├── nav.tsx
│   ├── hero.tsx
│   ├── experience-timeline.tsx
│   ├── command-palette.tsx
│   └── ...
├── data/
│   ├── experience.ts
│   ├── education.ts
│   └── skills.ts
├── messages/
│   ├── en.json
│   ├── it.json
│   └── de.json
├── public/
│   ├── cv-en.pdf
│   ├── cv-it.pdf
│   └── cv-de.pdf
├── CONTEXT.md          # for Claude Code: stack, design direction, conventions, phases
├── README.md           # setup / deploy + env vars
└── ...
```

**Documentation:**
- **README** — setup/deploy + env var notes (`RESEND_API_KEY`, later `GROQ_API_KEY`, etc.)
- **`data/`** — separate files per section, so one update = one file
- **`messages/`** — `en.json`, `it.json`, `de.json`
- **`CONTEXT.md`** — for Claude Code: stack + design direction + conventions + phase roadmap
- **Roadmap in GitHub issues** — track Phase 2 features as milestones

---

## 9. ✅ Roadmap & Next Steps

### Phase 1 — MVP

1. **Define exact palette** — precise teal (light + dark) + grey scale
2. **Project scaffolding** — `create-next-app` (TypeScript + Tailwind + App Router), set up `next-themes` + `next-intl`, folder structure (`app/[locale]/`, `components/`, `data/`, `messages/`, `public/`)
3. **Set up data** — typed TS files in `data/` for experience, education, skills
4. **Set up i18n** — `messages/{en,it,de}.json` with keys for UI + narrative copy
5. **Components in order** — Layout/Nav (theme + language switcher + ⌘K hint) → Hero → About → Experience (timeline with Framer Motion) → Education → Skills → Contact (form) → Footer
6. **Command palette (⌘K)** — `cmdk`: jump-to-section, theme, language, download CV, copy email, LinkedIn/GitHub
7. **SEO + OG image** — per-locale Metadata API + `next/og` dynamic image
8. **Contact form** — Route Handler + Resend + Zod + honeypot + rate limit
9. **GitHub integration lite** — server-side fetch with revalidate, discreet display
10. **Polish & performance** — Framer Motion transitions, lazy loading, image optimization, responsive check, accessibility audit, Lighthouse 100
11. **Deploy** — Vercel + custom domain + env vars
12. **CV PDFs** — updated in `/public` per locale (SUPSI degree ✅ completed)

### Phase 2 — post-launch, incremental

1. **Analytics stopgap** — enable Vercel Analytics to collect data while designing the dashboard
2. **AI Assistant** — pick free provider (Groq/Gemini/Cloudflare) + Vercel AI SDK + portfolio RAG + streaming chat UI + rate limit
3. **Analytics dashboard** — Spring Boot + PostgreSQL, migrate off Vercel Analytics, card UI + Recharts
4. **Live React playground** — Sandpack, 4–5 demo components
5. **PWA** — next-pwa, manifest, icons, offline fallback

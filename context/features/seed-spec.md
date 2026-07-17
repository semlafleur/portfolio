# Seed Data Specification

## Overview

Create a seed script (`prisma/seed.ts`) to populate the database with the real portfolio content — sourced from `src/data/portfolio-data.ts` and `messages/en.json`, per the note in `project-overview.md` §4: *"Once DB-1 lands, `portfolio-data.ts` becomes the seed source."* No fabricated data — every value below already exists in the repo.

## Requirements

### Admin User (NextAuth)

The `User` model has no password field (auth is OAuth via `Account`, not credentials) — seed only the row itself, no hash.

- **Email:** semlafleur@hotmail.com
- **Name:** Samuele La Fleur
- **emailVerified:** current date

### Profile (single row)

Sourced from `messages/en.json` (`hero`, `about`) + `portfolio-data.ts` (`contactChannels`).

| Field | Value |
| --- | --- |
| name | Samuele La Fleur |
| role | Full Stack Developer |
| tagline | "4+ years building scalable web and mobile applications across healthcare, Web3, and SaaS. TypeScript, React, Node.js, cloud-native on AWS." |
| bio | `about.p1` + `about.p2` joined |
| personalLine | "Off the keyboard: gym & training, music across genres, AC Milan." |
| email | semlafleur@hotmail.com |
| phone | +41 78 772 6025 |
| linkedin | https://linkedin.com/in/samuele-la-fleur |
| github | https://github.com/semlafleur |

### Experience (4 rows, `order` = array index)

1. **Goodcode SA** — Full Stack Developer · Manno, Switzerland · 2024-04 → present
2. **Elysium (Startup)** — Front-End Developer · Lugano · 2022-12 → 2024-01
3. **Ente Ospedaliero Cantonale (EOC)** — Full Stack Developer · Bellinzona · 2021-09 → 2024-03
4. **Ente Ospedaliero Cantonale (EOC)** — Trainee Software Developer · Bellinzona · 2017-05 → 2021-08

`highlights` and `stack` copied verbatim from the `experiences` array in `portfolio-data.ts`. `startDate`/`endDate` ("YYYY-MM" strings) convert to `Date` (day 1 of month; `endDate: null` stays `null` = present).

### Education (2 rows, `order` = array index)

1. **SUPSI** — BSc in Computer Science · Lugano · 2021-09 → 2025-08
2. **Centro Professionale Tecnico (CPT)** — AFC Software Developer with Federal Diploma · Locarno · 2017-09 → 2021-06

### SkillCategory (7 rows, `order` = array index)

Copied verbatim from the `skillCategories` array in `portfolio-data.ts`:

| # | Category | Items |
| --- | --- | --- |
| 1 | Languages | JavaScript / TypeScript, Java, C++, C, PHP, Bash |
| 2 | Frontend | React, Next.js, AngularJS, React Native, Redux Toolkit, Tailwind CSS, Material UI |
| 3 | Backend | Node.js, NestJS, Spring Boot, Feathers |
| 4 | Databases | PostgreSQL, MongoDB, MySQL, Oracle |
| 5 | DevOps & Cloud | AWS, Lambda, AWS SAM, Docker, Kubernetes, Rancher, Jenkins, GitHub Actions |
| 6 | Tools | Git, GitHub, Bitbucket, Jira, VS Code, IntelliJ IDEA, Studio 3T |
| 7 | Methodologies | Scrum, Agile, CI/CD |

## Notes

- Prisma 7 removed automatic seeding on migrate — the script is invoked explicitly (`npx tsx prisma/seed.ts`, matching how `scripts/test-db.ts` is already run in this repo).
- Reuse the existing `src/lib/prisma.ts` adapter-backed client — don't instantiate a second `PrismaClient`.
- Make the script idempotent (`upsert` keyed on unique fields, or delete-then-create) so it's safe to re-run in dev.

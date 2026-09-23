export const locales = ["en", "it", "de"] as const;
export type Locale = (typeof locales)[number];

/** Narrows an untrusted value (URL param, route param) to a Locale. */
export const toLocale = (value: string | null | undefined): Locale =>
  locales.includes(value as Locale) ? (value as Locale) : "en";

// ── Runtime shapes ──────────────────────────────────────────────
// What `lib/db/portfolio.ts` returns and what the section components
// consume. Flat and locale-free: the locale is resolved by the query.

export type Experience = {
  company: string;
  role: string;
  location: string;
  startDate: string; // "2024-04"
  endDate: string | null; // null = present
  highlights: string[];
  stack: string[];
};

export type Education = {
  institution: string;
  degree: string;
  location: string;
  startDate: string;
  endDate: string;
  highlights: string[];
};

export type SkillCategory = {
  category: string; // "Frontend"
  items: string[];
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  year: string;
  note: string | null;
};

export type ContactChannel = {
  type: "email" | "phone" | "linkedin" | "github";
  label: string;
  href: string;
};

// ── Seed shapes ─────────────────────────────────────────────────
// Locale-independent facts (dates, stack, proper nouns) are written once;
// only the translatable fields live under `i18n`. `prisma/seed.ts` flattens
// each entry into one row per locale. Keeping the shared facts in a single
// place is what stops the three locales drifting apart.

type Translated<T> = { i18n: Record<Locale, T> };

export type ExperienceSeed = Omit<
  Experience,
  "role" | "location" | "highlights"
> &
  Translated<Pick<Experience, "role" | "location" | "highlights">>;

export type EducationSeed = Omit<
  Education,
  "degree" | "location" | "highlights"
> &
  Translated<Pick<Education, "degree" | "location" | "highlights">>;

export type ProjectSeed = Omit<Project, "title" | "description" | "note"> &
  Translated<Pick<Project, "title" | "description" | "note">>;

// `items` is translated too: most entries are product names that stay
// identical, but a few are prose ("AI-assisted code review",
// "Multi-tenant systems") that must read naturally per locale.
export type SkillCategorySeed = Translated<SkillCategory>;

export const experiences: ExperienceSeed[] = [
  {
    company: "Zivildienst (Swiss Civilian Service)",
    startDate: "2026-01",
    endDate: "2026-12",
    stack: [],
    i18n: {
      en: {
        role: "Civilian service assignment",
        location: "Switzerland",
        highlights: [
          "Mandatory Swiss civilian service. Employment contract with Goodcode SA remains active; available for a new role from 1 January 2027.",
          "Kitchen & Activities Assistant — Basel Lighthouse, Basel (Sep – Dec 2026).",
          "Administrative Assistant — Casa Anziani di Sementina, Sementina (Jul – Aug 2026).",
          "Caretaker Assistant — Casa Anziani Comunale di Bellinzona, Bellinzona (Jan – Jun 2026).",
        ],
      },
      it: {
        role: "Servizio civile",
        location: "Svizzera",
        highlights: [
          "Servizio civile svizzero obbligatorio. Il contratto di lavoro con Goodcode SA resta attivo; disponibile per un nuovo ruolo dal 1° gennaio 2027.",
          "Aiuto cucina e animazione — Basel Lighthouse, Basel (set – dic 2026).",
          "Assistente amministrativo — Casa Anziani di Sementina, Sementina (lug – ago 2026).",
          "Assistente custode — Casa Anziani Comunale di Bellinzona, Bellinzona (gen – giu 2026).",
        ],
      },
      de: {
        role: "Zivildiensteinsatz",
        location: "Schweiz",
        highlights: [
          "Obligatorischer Schweizer Zivildienst. Der Arbeitsvertrag mit Goodcode SA bleibt aktiv; verfügbar für eine neue Stelle ab 1. Januar 2027.",
          "Küchen- und Betreuungsassistent — Basel Lighthouse, Basel (Sep – Dez 2026).",
          "Verwaltungsassistent — Casa Anziani di Sementina, Sementina (Jul – Aug 2026).",
          "Hauswartassistent — Casa Anziani Comunale di Bellinzona, Bellinzona (Jan – Jun 2026).",
        ],
      },
    },
  },
  {
    company: "Goodcode SA",
    startDate: "2024-04",
    endDate: null,
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "NestJS",
      "Spring Boot",
      "AngularJS",
      "PostgreSQL",
      "AWS Lambda",
      "AWS SAM",
      "GitHub Actions",
      "Docker",
    ],
    i18n: {
      en: {
        role: "Full Stack Software Engineer",
        location: "Manno, Switzerland",
        highlights: [
          "80% until Aug 2025 alongside the SUPSI BSc, 100% since Sep 2025.",
          "Architected EdilControl v2, a construction site management platform, on a serverless AWS stack (Lambda + SAM). Built a fully automated multi-tenant deployment pipeline triggered by a single GitHub Actions publish, replacing a 5-minute manual process of multiple error-prone steps and provisioning backend, frontend, database and related services from one parameterizable template.",
          "Contributed to Freename, a Web3 e-commerce platform for blockchain domain sales: implemented on-chain custody and multi-chain minting, and rebuilt the automated PDF invoice generation pipeline, eliminating recurring critical bugs and significantly improving generation time.",
          "Built a standalone microservice for dynamic PDF generation from HTML templates, now reused across several internal projects, with unit and integration tests (JUnit 5, Mockito, Jest) wired into the CI/CD pipeline.",
          "Owned release management and ongoing support for the company mobile application, ensuring regular updates, bug fixes and stability.",
          "AI / LLM tools: Claude used day-to-day for code review assistance and documentation generation.",
        ],
      },
      it: {
        role: "Sviluppatore Full Stack",
        location: "Manno, Svizzera",
        highlights: [
          "80% fino ad agosto 2025 in parallelo al Bachelor SUPSI, 100% da settembre 2025.",
          "Progettata l'architettura di EdilControl v2, piattaforma per la gestione dei cantieri, su stack AWS serverless (Lambda + SAM). Realizzata una pipeline di deployment multi-tenant completamente automatizzata, attivata da una singola publish di GitHub Actions, che ha sostituito un processo manuale di 5 minuti fatto di più passaggi soggetti a errore, effettuando il provisioning di backend, frontend, database e servizi correlati da un unico template parametrizzabile.",
          "Contribuito a Freename, piattaforma e-commerce Web3 per la vendita di domini blockchain: implementati custody on-chain e minting multi-chain, e ricostruita la pipeline automatica di generazione delle fatture PDF, eliminando bug critici ricorrenti e migliorando sensibilmente i tempi di generazione.",
          "Realizzato un microservizio standalone per la generazione dinamica di PDF da template HTML, oggi riutilizzato in diversi progetti interni, con test unitari e di integrazione (JUnit 5, Mockito, Jest) integrati nella pipeline CI/CD.",
          "Gestite le release e il supporto continuo dell'applicazione mobile aziendale, garantendo aggiornamenti regolari, correzione dei bug e stabilità.",
          "Strumenti AI / LLM: Claude usato quotidianamente come supporto alla code review e alla generazione di documentazione.",
        ],
      },
      de: {
        role: "Full-Stack-Softwareentwickler",
        location: "Manno, Schweiz",
        highlights: [
          "80% bis August 2025 neben dem SUPSI-Bachelor, 100% seit September 2025.",
          "EdilControl v2, eine Plattform für das Baustellenmanagement, auf einem serverlosen AWS-Stack (Lambda + SAM) architektiert. Eine vollständig automatisierte Multi-Tenant-Deployment-Pipeline aufgebaut, die durch einen einzigen GitHub-Actions-Publish ausgelöst wird und einen fünfminütigen manuellen Prozess aus mehreren fehleranfälligen Schritten ersetzt; Backend, Frontend, Datenbank und zugehörige Dienste werden aus einer einzigen parametrisierbaren Vorlage bereitgestellt.",
          "An Freename mitgewirkt, einer Web3-E-Commerce-Plattform für den Verkauf von Blockchain-Domains: On-Chain-Custody und Multi-Chain-Minting implementiert sowie die automatisierte PDF-Rechnungspipeline neu aufgebaut, wodurch wiederkehrende kritische Fehler beseitigt und die Generierungszeit deutlich verbessert wurde.",
          "Einen eigenständigen Microservice für die dynamische PDF-Generierung aus HTML-Vorlagen entwickelt, der heute in mehreren internen Projekten wiederverwendet wird, mit Unit- und Integrationstests (JUnit 5, Mockito, Jest) in der CI/CD-Pipeline.",
          "Release-Management und laufenden Support für die mobile Unternehmens-App verantwortet und so regelmässige Updates, Fehlerbehebungen und Stabilität sichergestellt.",
          "KI-/LLM-Werkzeuge: Claude täglich zur Unterstützung bei Code-Reviews und zur Dokumentationserstellung eingesetzt.",
        ],
      },
    },
  },
  {
    company: "Elysium (Startup)",
    startDate: "2022-12",
    endDate: "2024-01",
    stack: ["TypeScript", "React Native", "Expo", "Redux"],
    i18n: {
      en: {
        role: "Front-End Developer",
        location: "Lugano, Switzerland",
        highlights: [
          "Part-time.",
          "Built a cross-platform mobile wallet for Android and iOS, letting users manage fiat currencies and cryptocurrencies from a single interface.",
        ],
      },
      it: {
        role: "Sviluppatore Front-End",
        location: "Lugano, Svizzera",
        highlights: [
          "Part-time.",
          "Realizzato un wallet mobile cross-platform per Android e iOS, che permette di gestire valute fiat e criptovalute da un'unica interfaccia.",
        ],
      },
      de: {
        role: "Frontend-Entwickler",
        location: "Lugano, Schweiz",
        highlights: [
          "Teilzeit.",
          "Eine plattformübergreifende Mobile-Wallet für Android und iOS entwickelt, mit der Nutzer Fiat-Währungen und Kryptowährungen über eine einzige Oberfläche verwalten können.",
        ],
      },
    },
  },
  {
    company: "Ente Ospedaliero Cantonale (EOC)",
    startDate: "2021-09",
    endDate: "2024-04",
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Spring Boot",
      "Node.js",
      "MongoDB",
      "Redux",
      "Feathers",
      "MUI",
      "Jenkins",
      "Docker",
      "Rancher",
      "Kubernetes",
    ],
    i18n: {
      en: {
        role: "Full Stack Software Engineer",
        location: "Bellinzona, Switzerland",
        highlights: [
          "60% alongside the SUPSI BSc.",
          "Designed and implemented a fully custom client for managing Flowable BPM processes, adopted hospital-wide across 50+ departments for medical consultations, insurance requests, inpatient management and staff task coordination. Led the backend migration from Node.js to Spring Boot to meet the resulting scale and reliability requirements.",
          "Contributed to the Electronic Health Record (EHR) system on both frontend and backend, improving UX, code quality and performance, with automated tests on critical clinical flows to support reliability and compliance.",
          "Developed an internal developer tooling web app (Next.js) used by the whole engineering team to manage and resolve EHR tickets, streamlining support workflows.",
        ],
      },
      it: {
        role: "Sviluppatore Full Stack",
        location: "Bellinzona, Svizzera",
        highlights: [
          "60% in parallelo al Bachelor SUPSI.",
          "Progettato e realizzato un client completamente su misura per la gestione dei processi BPM Flowable, adottato in tutto l'ospedale da oltre 50 reparti per consulenze mediche, richieste assicurative, gestione dei degenti e coordinamento delle attività del personale. Guidata la migrazione del backend da Node.js a Spring Boot per soddisfare i requisiti di scala e affidabilità che ne sono derivati.",
          "Contribuito al sistema di Cartella Clinica Elettronica (EHR) sia lato frontend sia lato backend, migliorando UX, qualità del codice e prestazioni, con test automatici sui flussi clinici critici a supporto di affidabilità e conformità.",
          "Sviluppata un'applicazione web di tooling interno (Next.js) usata da tutto il team di sviluppo per gestire e risolvere i ticket dell'EHR, semplificando i flussi di supporto.",
        ],
      },
      de: {
        role: "Full-Stack-Softwareentwickler",
        location: "Bellinzona, Schweiz",
        highlights: [
          "60% neben dem SUPSI-Bachelor.",
          "Einen vollständig massgeschneiderten Client für die Verwaltung von Flowable-BPM-Prozessen entworfen und umgesetzt, der spitalweit in über 50 Abteilungen für medizinische Konsultationen, Versicherungsanfragen, Patientenmanagement und die Koordination von Mitarbeitenden eingesetzt wird. Die Backend-Migration von Node.js zu Spring Boot geleitet, um den daraus entstandenen Anforderungen an Skalierbarkeit und Zuverlässigkeit gerecht zu werden.",
          "Am System der elektronischen Patientenakte (EHR) im Frontend und Backend mitgewirkt und dabei UX, Codequalität und Performance verbessert, mit automatisierten Tests für kritische klinische Abläufe zur Sicherung von Zuverlässigkeit und Compliance.",
          "Eine interne Developer-Tooling-Webanwendung (Next.js) entwickelt, die vom gesamten Engineering-Team zur Verwaltung und Lösung von EHR-Tickets genutzt wird und Support-Abläufe vereinfacht.",
        ],
      },
    },
  },
  {
    company: "Ente Ospedaliero Cantonale (EOC)",
    startDate: "2017-09",
    endDate: "2021-08",
    stack: [
      "TypeScript",
      "React",
      "Node.js",
      "MongoDB",
      "Redux",
      "Feathers",
      "MUI",
      "Docker",
    ],
    i18n: {
      en: {
        role: "Trainee Software Developer",
        location: "Bellinzona, Switzerland",
        highlights: [
          "Four-year apprenticeship within the EOC engineering team. Final thesis project: digitalized REGA emergency rescue reports and integrated them into the EOC internal infrastructure.",
        ],
      },
      it: {
        role: "Apprendista sviluppatore software",
        location: "Bellinzona, Svizzera",
        highlights: [
          "Apprendistato quadriennale all'interno del team di sviluppo dell'EOC. Progetto di tesi finale: digitalizzati i rapporti di soccorso d'emergenza REGA e integrati nell'infrastruttura interna dell'EOC.",
        ],
      },
      de: {
        role: "Lernender Softwareentwickler",
        location: "Bellinzona, Schweiz",
        highlights: [
          "Vierjährige Lehre im Engineering-Team des EOC. Abschlussarbeit: Digitalisierung der REGA-Rettungseinsatzberichte und deren Integration in die interne Infrastruktur des EOC.",
        ],
      },
    },
  },
];

export const education: EducationSeed[] = [
  {
    institution: "SUPSI",
    startDate: "2021-09",
    endDate: "2025-08",
    i18n: {
      en: {
        degree: "Bachelor of Science in Computer Science",
        location: "Lugano, Switzerland",
        highlights: ["Completed while working part-time as a software engineer."],
      },
      it: {
        degree: "Bachelor of Science in Informatica",
        location: "Lugano, Svizzera",
        highlights: ["Conseguito lavorando part-time come sviluppatore software."],
      },
      de: {
        degree: "Bachelor of Science in Informatik",
        location: "Lugano, Schweiz",
        highlights: [
          "Berufsbegleitend absolviert, parallel zur Teilzeitarbeit als Softwareentwickler.",
        ],
      },
    },
  },
  {
    institution: "Centro Professionale Tecnico (CPT)",
    startDate: "2017-09",
    endDate: "2021-06",
    i18n: {
      en: {
        degree: "AFC Software Developer with Federal Diploma",
        location: "Locarno, Switzerland",
        highlights: [],
      },
      it: {
        degree: "Sviluppatore software AFC con attestato federale di capacità",
        location: "Locarno, Svizzera",
        highlights: [],
      },
      de: {
        degree: "Softwareentwickler EFZ mit eidgenössischem Fähigkeitszeugnis",
        location: "Locarno, Schweiz",
        highlights: [],
      },
    },
  },
];

// Order drives the render sequence of the Skills grid. "AI / LLM Tools" is
// deliberately first — it's the differentiator, not a footnote.
export const skillCategories: SkillCategorySeed[] = [
  {
    i18n: {
      en: {
        category: "AI / LLM Tools",
        items: [
          "Claude",
          "GitHub Copilot",
          "AI-assisted code review",
          "AI-assisted documentation",
        ],
      },
      it: {
        category: "Strumenti AI / LLM",
        items: [
          "Claude",
          "GitHub Copilot",
          "Code review assistita da AI",
          "Documentazione assistita da AI",
        ],
      },
      de: {
        category: "KI-/LLM-Werkzeuge",
        items: [
          "Claude",
          "GitHub Copilot",
          "KI-gestützte Code-Reviews",
          "KI-gestützte Dokumentation",
        ],
      },
    },
  },
  {
    i18n: {
      en: {
        category: "Languages",
        items: ["JavaScript / TypeScript", "Java", "C++", "C", "PHP", "SQL", "Bash"],
      },
      it: {
        category: "Linguaggi",
        items: ["JavaScript / TypeScript", "Java", "C++", "C", "PHP", "SQL", "Bash"],
      },
      de: {
        category: "Programmiersprachen",
        items: ["JavaScript / TypeScript", "Java", "C++", "C", "PHP", "SQL", "Bash"],
      },
    },
  },
  {
    i18n: {
      en: {
        category: "Frontend",
        items: [
          "React",
          "Next.js",
          "AngularJS",
          "React Native",
          "Redux Toolkit",
          "Zustand",
          "TanStack Query",
          "Tailwind CSS",
          "Material UI",
        ],
      },
      it: {
        category: "Frontend",
        items: [
          "React",
          "Next.js",
          "AngularJS",
          "React Native",
          "Redux Toolkit",
          "Zustand",
          "TanStack Query",
          "Tailwind CSS",
          "Material UI",
        ],
      },
      de: {
        category: "Frontend",
        items: [
          "React",
          "Next.js",
          "AngularJS",
          "React Native",
          "Redux Toolkit",
          "Zustand",
          "TanStack Query",
          "Tailwind CSS",
          "Material UI",
        ],
      },
    },
  },
  {
    i18n: {
      en: {
        category: "Backend",
        items: [
          "Node.js",
          "NestJS",
          "Spring Boot 3.3/6",
          "Spring WebFlux",
          "Spring Security",
          "Hibernate / JPA",
          "Feathers",
        ],
      },
      it: {
        category: "Backend",
        items: [
          "Node.js",
          "NestJS",
          "Spring Boot 3.3/6",
          "Spring WebFlux",
          "Spring Security",
          "Hibernate / JPA",
          "Feathers",
        ],
      },
      de: {
        category: "Backend",
        items: [
          "Node.js",
          "NestJS",
          "Spring Boot 3.3/6",
          "Spring WebFlux",
          "Spring Security",
          "Hibernate / JPA",
          "Feathers",
        ],
      },
    },
  },
  {
    i18n: {
      en: {
        category: "APIs & Architecture",
        items: ["REST", "GraphQL", "Microservices", "Serverless", "Multi-tenant systems"],
      },
      it: {
        category: "API e architettura",
        items: ["REST", "GraphQL", "Microservizi", "Serverless", "Sistemi multi-tenant"],
      },
      de: {
        category: "APIs & Architektur",
        items: ["REST", "GraphQL", "Microservices", "Serverless", "Multi-Tenant-Systeme"],
      },
    },
  },
  {
    i18n: {
      en: {
        category: "Databases",
        items: ["PostgreSQL", "MongoDB", "MySQL", "Oracle", "SQL Server"],
      },
      it: {
        category: "Database",
        items: ["PostgreSQL", "MongoDB", "MySQL", "Oracle", "SQL Server"],
      },
      de: {
        category: "Datenbanken",
        items: ["PostgreSQL", "MongoDB", "MySQL", "Oracle", "SQL Server"],
      },
    },
  },
  {
    i18n: {
      en: {
        category: "DevOps & Cloud",
        items: [
          "AWS",
          "Lambda",
          "AWS SAM",
          "Azure",
          "Docker",
          "Kubernetes",
          "Helm",
          "Rancher",
          "Jenkins",
          "GitHub Actions",
        ],
      },
      it: {
        category: "DevOps & Cloud",
        items: [
          "AWS",
          "Lambda",
          "AWS SAM",
          "Azure",
          "Docker",
          "Kubernetes",
          "Helm",
          "Rancher",
          "Jenkins",
          "GitHub Actions",
        ],
      },
      de: {
        category: "DevOps & Cloud",
        items: [
          "AWS",
          "Lambda",
          "AWS SAM",
          "Azure",
          "Docker",
          "Kubernetes",
          "Helm",
          "Rancher",
          "Jenkins",
          "GitHub Actions",
        ],
      },
    },
  },
  {
    i18n: {
      en: {
        category: "Testing & QA",
        items: ["JUnit 5", "Mockito", "Jest", "TDD", "Testing in CI/CD"],
      },
      it: {
        category: "Testing & QA",
        items: ["JUnit 5", "Mockito", "Jest", "TDD", "Testing in CI/CD"],
      },
      de: {
        category: "Testing & QA",
        items: ["JUnit 5", "Mockito", "Jest", "TDD", "Testing in CI/CD"],
      },
    },
  },
  {
    i18n: {
      en: { category: "Build Tools", items: ["Maven", "Gradle"] },
      it: { category: "Strumenti di build", items: ["Maven", "Gradle"] },
      de: { category: "Build-Werkzeuge", items: ["Maven", "Gradle"] },
    },
  },
  {
    i18n: {
      en: {
        category: "Tools",
        items: ["Git", "GitHub", "Bitbucket", "Jira", "VS Code", "IntelliJ IDEA", "Studio 3T"],
      },
      it: {
        category: "Strumenti",
        items: ["Git", "GitHub", "Bitbucket", "Jira", "VS Code", "IntelliJ IDEA", "Studio 3T"],
      },
      de: {
        category: "Werkzeuge",
        items: ["Git", "GitHub", "Bitbucket", "Jira", "VS Code", "IntelliJ IDEA", "Studio 3T"],
      },
    },
  },
  {
    i18n: {
      en: { category: "Methodologies", items: ["Scrum", "Agile", "CI/CD"] },
      it: { category: "Metodologie", items: ["Scrum", "Agile", "CI/CD"] },
      de: { category: "Methoden", items: ["Scrum", "Agile", "CI/CD"] },
    },
  },
];

export const projects: ProjectSeed[] = [
  {
    stack: ["TypeScript", "React", "Next.js", "Solidity (Hardhat)", "Web3.js", "AWS"],
    year: "2025",
    i18n: {
      en: {
        title: "NFT Marketplace",
        description:
          "Cross-chain NFT marketplace with listing, bidding/auction, and multi-chain wallet integration.",
        note: "Course project",
      },
      it: {
        title: "NFT Marketplace",
        description:
          "Marketplace NFT cross-chain con listing, offerte/aste e integrazione di wallet multi-chain.",
        note: "Progetto universitario",
      },
      de: {
        title: "NFT-Marktplatz",
        description:
          "Cross-Chain-NFT-Marktplatz mit Listing, Geboten/Auktionen und Multi-Chain-Wallet-Integration.",
        note: "Studienprojekt",
      },
    },
  },
];

// Display name, reused where the brand appears (nav, footer aria labels).
export const siteName = "Samuele La Fleur";

// Single CV for all locales. Swap to a per-locale map here if translated CVs
// are added.
export const cvHref = "/resume.pdf";

// Locale-independent contact facts (addresses / URLs). The surrounding copy
// (intro, form labels) is translated in messages/{locale}.json.
export const contactChannels: ContactChannel[] = [
  {
    type: "email",
    label: "semlafleur@hotmail.com",
    href: "mailto:semlafleur@hotmail.com",
  },
  { type: "phone", label: "+41 78 772 6025", href: "tel:+41787726025" },
  {
    type: "linkedin",
    label: "linkedin.com/in/samuele-la-fleur",
    href: "https://linkedin.com/in/samuele-la-fleur",
  },
  {
    type: "github",
    label: "github.com/semlafleur",
    href: "https://github.com/semlafleur",
  },
];

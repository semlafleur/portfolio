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

export const experiences: Experience[] = [
  {
    company: "Zivildienst (Swiss Civilian Service)",
    role: "Civilian service assignment",
    location: "Switzerland",
    startDate: "2026-01",
    endDate: "2026-12",
    highlights: [
      "Mandatory Swiss civilian service. Employment contract with Goodcode SA remains active; available for a new role from 1 January 2027.",
      "Kitchen & Activities Assistant — Basel Lighthouse, Basel (Sep – Dec 2026).",
      "Administrative Assistant — Casa Anziani di Sementina, Sementina (Jul – Aug 2026).",
      "Caretaker Assistant — Casa Anziani Comunale di Bellinzona, Bellinzona (Jan – Jun 2026).",
    ],
    stack: [],
  },
  {
    company: "Goodcode SA",
    role: "Full Stack Software Engineer",
    location: "Manno, Switzerland",
    startDate: "2024-04",
    endDate: null,
    highlights: [
      "80% until Aug 2025 alongside the SUPSI BSc, 100% since Sep 2025.",
      "Architected EdilControl v2, a construction site management platform, on a serverless AWS stack (Lambda + SAM). Built a fully automated multi-tenant deployment pipeline triggered by a single GitHub Actions publish, replacing a 5-minute manual process of multiple error-prone steps and provisioning backend, frontend, database and related services from one parameterizable template.",
      "Contributed to Freename, a Web3 e-commerce platform for blockchain domain sales: implemented on-chain custody and multi-chain minting, and rebuilt the automated PDF invoice generation pipeline, eliminating recurring critical bugs and significantly improving generation time.",
      "Built a standalone microservice for dynamic PDF generation from HTML templates, now reused across several internal projects, with unit and integration tests (JUnit 5, Mockito, Jest) wired into the CI/CD pipeline.",
      "Owned release management and ongoing support for the company mobile application, ensuring regular updates, bug fixes and stability.",
      "AI / LLM tools: Claude used day-to-day for code review assistance and documentation generation.",
    ],
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
  },
  {
    company: "Elysium (Startup)",
    role: "Front-End Developer",
    location: "Lugano, Switzerland",
    startDate: "2022-12",
    endDate: "2024-01",
    highlights: [
      "Part-time.",
      "Built a cross-platform mobile wallet for Android and iOS, letting users manage fiat currencies and cryptocurrencies from a single interface.",
    ],
    stack: ["TypeScript", "React Native", "Expo", "Redux"],
  },
  {
    company: "Ente Ospedaliero Cantonale (EOC)",
    role: "Full Stack Software Engineer",
    location: "Bellinzona, Switzerland",
    startDate: "2021-09",
    endDate: "2024-04",
    highlights: [
      "60% alongside the SUPSI BSc.",
      "Designed and implemented a fully custom client for managing Flowable BPM processes, adopted hospital-wide across 50+ departments for medical consultations, insurance requests, inpatient management and staff task coordination. Led the backend migration from Node.js to Spring Boot to meet the resulting scale and reliability requirements.",
      "Contributed to the Electronic Health Record (EHR) system on both frontend and backend, improving UX, code quality and performance, with automated tests on critical clinical flows to support reliability and compliance.",
      "Developed an internal developer tooling web app (Next.js) used by the whole engineering team to manage and resolve EHR tickets, streamlining support workflows.",
    ],
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
  },
  {
    company: "Ente Ospedaliero Cantonale (EOC)",
    role: "Trainee Software Developer",
    location: "Bellinzona, Switzerland",
    startDate: "2017-09",
    endDate: "2021-08",
    highlights: [
      "Four-year apprenticeship within the EOC engineering team. Final thesis project: digitalized REGA emergency rescue reports and integrated them into the EOC internal infrastructure.",
    ],
    stack: ["TypeScript", "React", "Node.js", "MongoDB", "Redux", "Feathers", "MUI", "Docker"],
  },
];

export const education: Education[] = [
  {
    institution: "SUPSI",
    degree: "Bachelor of Science in Computer Science",
    location: "Lugano, Switzerland",
    startDate: "2021-09",
    endDate: "2025-08",
    highlights: ["Completed while working part-time as a software engineer."],
  },
  {
    institution: "Centro Professionale Tecnico (CPT)",
    degree: "AFC Software Developer with Federal Diploma",
    location: "Locarno, Switzerland",
    startDate: "2017-09",
    endDate: "2021-06",
    highlights: [],
  },
];

// Order drives the render sequence of the Skills grid. "AI / LLM Tools" is
// deliberately first — it's the differentiator, not a footnote.
export const skillCategories: SkillCategory[] = [
  {
    category: "AI / LLM Tools",
    items: [
      "Claude",
      "GitHub Copilot",
      "AI-assisted code review",
      "AI-assisted documentation",
    ],
  },
  {
    category: "Languages",
    items: ["JavaScript / TypeScript", "Java", "C++", "C", "PHP", "SQL", "Bash"],
  },
  {
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
  {
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
  {
    category: "APIs & Architecture",
    items: ["REST", "GraphQL", "Microservices", "Serverless", "Multi-tenant systems"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Oracle", "SQL Server"],
  },
  {
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
  {
    category: "Testing & QA",
    items: ["JUnit 5", "Mockito", "Jest", "TDD", "Testing in CI/CD"],
  },
  {
    category: "Build Tools",
    items: ["Maven", "Gradle"],
  },
  {
    category: "Tools",
    items: ["Git", "GitHub", "Bitbucket", "Jira", "VS Code", "IntelliJ IDEA", "Studio 3T"],
  },
  {
    category: "Methodologies",
    items: ["Scrum", "Agile", "CI/CD"],
  },
];

export const projects: Project[] = [
  {
    title: "NFT Marketplace",
    description:
      "Cross-chain NFT marketplace with listing, bidding/auction, and multi-chain wallet integration.",
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Solidity (Hardhat)",
      "Web3.js",
      "AWS",
    ],
    year: "2025",
    note: "Course project",
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

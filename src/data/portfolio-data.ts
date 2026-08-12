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
    company: "Goodcode SA",
    role: "Full Stack Developer",
    location: "Manno, Switzerland",
    startDate: "2024-04",
    endDate: null,
    highlights: [
      "Architected EdilControl v2 on a serverless AWS stack (Lambda + SAM), with automated multi-tenant deployment via GitHub Actions that removed manual provisioning.",
      "Contributed to Freename Web3 e-commerce: on-chain custody and multi-chain minting; redesigned the PDF invoice generation pipeline to cut bugs and improve performance.",
      "Built a standalone microservice for dynamic PDF generation from HTML templates, reused across internal projects.",
      "Owned release management and ongoing support for the mobile application, ensuring regular updates and stability.",
      "Testing & QA: unit and integration tests (JUnit 5, Mockito, Jest) wired into CI/CD, with TDD in critical areas.",
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
    location: "Lugano",
    startDate: "2022-12",
    endDate: "2024-01",
    highlights: ["Cross-platform mobile wallet (fiat + crypto)"],
    stack: ["TypeScript", "React Native", "Expo", "Redux"],
  },
  {
    company: "Ente Ospedaliero Cantonale (EOC)",
    role: "Full Stack Developer",
    location: "Bellinzona",
    startDate: "2021-09",
    endDate: "2024-03",
    highlights: [
      "Contributed to the Electronic Health Record (EHR) frontend and backend to improve UX, quality, and performance.",
      "Developed an internal tooling web app (Next.js) for engineering ticket management and support workflows.",
      "Designed and implemented the hospital-wide Flowable BPM client (50+ departments); led the backend migration from Node.js to Spring Boot for scale and reliability.",
      "Automated tests for critical flows to support compliance and reliability in healthcare environments.",
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
    location: "Bellinzona",
    startDate: "2017-05",
    endDate: "2021-08",
    highlights: [
      "Four-year apprenticeship; final thesis digitalized REGA emergency rescue reports and integrated them into the EOC infrastructure.",
    ],
    stack: ["TypeScript", "React", "Node.js", "MongoDB", "Redux", "Feathers", "MUI", "Docker"],
  },
];

export const education: Education[] = [
  {
    institution: "SUPSI",
    degree: "BSc in Computer Science",
    location: "Lugano",
    startDate: "2021-09",
    endDate: "2025-08",
    highlights: [
      "Evening PAP course (Professional Awareness Program), balancing academics with a full-time job — degree completed while employed.",
    ],
  },
  {
    institution: "Centro Professionale Tecnico (CPT)",
    degree: "AFC Software Developer with Federal Diploma",
    location: "Locarno",
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
    category: "APIs",
    items: ["REST", "GraphQL"],
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

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
};

export type SkillCategory = {
  category: string; // "Frontend"
  items: string[];
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
      "EdilControl v2 (serverless AWS, multi-tenant, GitHub Actions pipeline)",
      "Freename (Web3 e-commerce, on-chain minting, PDF invoice pipeline)",
      "PDF generation microservice",
      "Mobile app release management",
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
      "EHR system, developer tooling web app, custom Flowable BPM client (50+ departments)",
      "Node.js to Spring Boot migration",
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
    highlights: ["4-year apprenticeship + final thesis on the REGA application"],
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
  },
  {
    institution: "Centro Professionale Tecnico (CPT)",
    degree: "AFC Software Developer with Federal Diploma",
    location: "Locarno",
    startDate: "2017-09",
    endDate: "2021-06",
  },
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Languages",
    items: ["JavaScript / TypeScript", "Java", "C++", "C", "PHP", "Bash"],
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
    items: ["Node.js", "NestJS", "Spring Boot", "Feathers"],
  },
  {
    category: "Databases",
    items: ["PostgreSQL", "MongoDB", "MySQL", "Oracle"],
  },
  {
    category: "DevOps & Cloud",
    items: ["AWS", "Lambda", "AWS SAM", "Docker", "Kubernetes", "Rancher", "Jenkins", "GitHub Actions"],
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

// Display name, reused where the brand appears (nav, footer aria labels).
export const siteName = "Samuele La Fleur";

// Locale-aware CV path — resolves to /cv-en.pdf, /cv-it.pdf or /cv-de.pdf.
// (The narrative copy for each section now lives in messages/{locale}.json.)
export const cvHref = (locale: string) => `/cv-${locale}.pdf`;

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

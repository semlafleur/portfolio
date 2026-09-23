import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  experiences,
  education,
  projects,
  skillCategories,
  contactChannels,
  locales,
} from "../src/data/portfolio-data";
import en from "../messages/en.json";

neonConfig.webSocketConstructor = ws;
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const channel = (type: (typeof contactChannels)[number]["type"]) =>
  contactChannels.find((c) => c.type === type)?.label;

const toDate = (yearMonth: string | null) =>
  yearMonth ? new Date(`${yearMonth}-01`) : null;

const run = async () => {
  await prisma.user.upsert({
    where: { email: "semlafleur@hotmail.com" },
    update: {},
    create: {
      email: "semlafleur@hotmail.com",
      name: "Samuele La Fleur",
      emailVerified: new Date(),
    },
  });

  const existingProfile = await prisma.profile.findFirst();
  const profileData = {
    name: "Samuele La Fleur",
    role: en.hero.role,
    tagline: en.hero.tagline.replace(/<\/?b>/g, ""),
    bio: `${en.about.p1} ${en.about.p2}`,
    personalLine: en.about.personalLine,
    email: channel("email")!,
    phone: channel("phone"),
    linkedin: channel("linkedin"),
    github: channel("github"),
  };
  await prisma.profile.upsert({
    where: { id: existingProfile?.id ?? "" },
    update: profileData,
    create: profileData,
  });

  // Each entry is written once per locale: the locale-independent facts are
  // shared, only the `i18n` slice differs. `locale` + `order` is unique.
  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: locales.flatMap((locale) =>
      experiences.map((e, order) => ({
        locale,
        company: e.company,
        role: e.i18n[locale].role,
        location: e.i18n[locale].location,
        startDate: toDate(e.startDate)!,
        endDate: toDate(e.endDate),
        highlights: e.i18n[locale].highlights,
        stack: e.stack,
        order,
      })),
    ),
  });

  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: locales.flatMap((locale) =>
      education.map((ed, order) => ({
        locale,
        institution: ed.institution,
        degree: ed.i18n[locale].degree,
        location: ed.i18n[locale].location,
        startDate: toDate(ed.startDate)!,
        endDate: toDate(ed.endDate),
        highlights: ed.i18n[locale].highlights,
        order,
      })),
    ),
  });

  await prisma.project.deleteMany();
  await prisma.project.createMany({
    data: locales.flatMap((locale) =>
      projects.map((p, order) => ({
        locale,
        title: p.i18n[locale].title,
        description: p.i18n[locale].description,
        stack: p.stack,
        year: p.year,
        note: p.i18n[locale].note,
        order,
      })),
    ),
  });

  await prisma.skillCategory.deleteMany();
  await prisma.skillCategory.createMany({
    data: locales.flatMap((locale) =>
      skillCategories.map((s, order) => ({
        locale,
        category: s.i18n[locale].category,
        items: s.i18n[locale].items,
        order,
      })),
    ),
  });

  const perLocale = (n: number) => n * locales.length;
  console.log("Seed complete:", {
    locales: locales.length,
    experiences: perLocale(experiences.length),
    education: perLocale(education.length),
    projects: perLocale(projects.length),
    skillCategories: perLocale(skillCategories.length),
  });
  await prisma.$disconnect();
};

run();

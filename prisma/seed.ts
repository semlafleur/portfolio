import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "../src/generated/prisma/client";
import {
  experiences,
  education,
  skillCategories,
  contactChannels,
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

  await prisma.experience.deleteMany();
  await prisma.experience.createMany({
    data: experiences.map((e, order) => ({
      company: e.company,
      role: e.role,
      location: e.location,
      startDate: toDate(e.startDate)!,
      endDate: toDate(e.endDate),
      highlights: e.highlights,
      stack: e.stack,
      order,
    })),
  });

  await prisma.education.deleteMany();
  await prisma.education.createMany({
    data: education.map((ed, order) => ({
      institution: ed.institution,
      degree: ed.degree,
      location: ed.location,
      startDate: toDate(ed.startDate)!,
      endDate: toDate(ed.endDate),
      order,
    })),
  });

  await prisma.skillCategory.deleteMany();
  await prisma.skillCategory.createMany({
    data: skillCategories.map((s, order) => ({
      category: s.category,
      items: s.items,
      order,
    })),
  });

  console.log("Seed complete:", {
    experiences: experiences.length,
    education: education.length,
    skillCategories: skillCategories.length,
  });
  await prisma.$disconnect();
};

run();

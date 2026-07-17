import "dotenv/config";
import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import ws from "ws";
import { PrismaClient } from "../src/generated/prisma/client";

neonConfig.webSocketConstructor = ws;
const adapter = new PrismaNeon({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const run = async () => {
  const counts = {
    user: await prisma.user.count(),
    account: await prisma.account.count(),
    session: await prisma.session.count(),
    verificationToken: await prisma.verificationToken.count(),
    profile: await prisma.profile.count(),
    experience: await prisma.experience.count(),
    education: await prisma.education.count(),
    skillCategory: await prisma.skillCategory.count(),
  };
  console.log("Connected to Neon. Row counts:", counts);
  await prisma.$disconnect();
};

run();

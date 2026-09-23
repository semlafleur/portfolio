import { prisma } from "@/lib/prisma";
import type {
  Education as EducationEntry,
  Experience as ExperienceEntry,
  Locale,
  Project as ProjectEntry,
  SkillCategory as SkillCategoryEntry,
} from "@/data/portfolio-data";

const toYearMonth = (date: Date) => date.toISOString().slice(0, 7);

export const getExperiences = async (
  locale: Locale,
): Promise<ExperienceEntry[]> => {
  const rows = await prisma.experience.findMany({
    where: { locale },
    orderBy: { order: "asc" },
  });
  return rows.map((row) => ({
    company: row.company,
    role: row.role,
    location: row.location,
    startDate: toYearMonth(row.startDate),
    endDate: row.endDate ? toYearMonth(row.endDate) : null,
    highlights: row.highlights,
    stack: row.stack,
  }));
};

export const getEducation = async (
  locale: Locale,
): Promise<EducationEntry[]> => {
  const rows = await prisma.education.findMany({
    where: { locale },
    orderBy: { order: "asc" },
  });
  return rows.map((row) => ({
    institution: row.institution,
    degree: row.degree,
    location: row.location,
    startDate: toYearMonth(row.startDate),
    endDate: row.endDate ? toYearMonth(row.endDate) : "",
    highlights: row.highlights,
  }));
};

export const getProjects = async (locale: Locale): Promise<ProjectEntry[]> => {
  const rows = await prisma.project.findMany({
    where: { locale },
    orderBy: { order: "asc" },
  });
  return rows.map((row) => ({
    title: row.title,
    description: row.description,
    stack: row.stack,
    year: row.year,
    note: row.note,
  }));
};

export const getSkillCategories = async (
  locale: Locale,
): Promise<SkillCategoryEntry[]> => {
  const rows = await prisma.skillCategory.findMany({
    where: { locale },
    orderBy: { order: "asc" },
  });
  return rows.map((row) => ({
    category: row.category,
    items: row.items,
  }));
};

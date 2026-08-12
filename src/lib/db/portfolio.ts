import { prisma } from "@/lib/prisma";
import type {
  Education as EducationEntry,
  Experience as ExperienceEntry,
  Project as ProjectEntry,
  SkillCategory as SkillCategoryEntry,
} from "@/data/portfolio-data";

const toYearMonth = (date: Date) => date.toISOString().slice(0, 7);

export const getExperiences = async (): Promise<ExperienceEntry[]> => {
  const rows = await prisma.experience.findMany({ orderBy: { order: "asc" } });
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

export const getEducation = async (): Promise<EducationEntry[]> => {
  const rows = await prisma.education.findMany({ orderBy: { order: "asc" } });
  return rows.map((row) => ({
    institution: row.institution,
    degree: row.degree,
    location: row.location,
    startDate: toYearMonth(row.startDate),
    endDate: row.endDate ? toYearMonth(row.endDate) : "",
    highlights: row.highlights,
  }));
};

export const getProjects = async (): Promise<ProjectEntry[]> => {
  const rows = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return rows.map((row) => ({
    title: row.title,
    description: row.description,
    stack: row.stack,
    year: row.year,
    note: row.note,
  }));
};

export const getSkillCategories = async (): Promise<SkillCategoryEntry[]> => {
  const rows = await prisma.skillCategory.findMany({ orderBy: { order: "asc" } });
  return rows.map((row) => ({
    category: row.category,
    items: row.items,
  }));
};

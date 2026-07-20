import { NextResponse } from "next/server";
import { getSkillCategories } from "@/lib/db/portfolio";

export const GET = async () => NextResponse.json(await getSkillCategories());

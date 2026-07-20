import { NextResponse } from "next/server";
import { getExperiences } from "@/lib/db/portfolio";

export const GET = async () => NextResponse.json(await getExperiences());

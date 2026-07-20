import { NextResponse } from "next/server";
import { getEducation } from "@/lib/db/portfolio";

export const GET = async () => NextResponse.json(await getEducation());

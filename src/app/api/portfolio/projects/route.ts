import { NextResponse } from "next/server";
import { getProjects } from "@/lib/db/portfolio";

export const GET = async () => NextResponse.json(await getProjects());

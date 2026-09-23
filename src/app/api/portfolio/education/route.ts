import { NextResponse } from "next/server";
import { getEducation } from "@/lib/db/portfolio";
import { toLocale } from "@/data/portfolio-data";

export const GET = async (request: Request) => {
  const locale = toLocale(new URL(request.url).searchParams.get("locale"));
  return NextResponse.json(await getEducation(locale));
};

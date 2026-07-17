import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Resend } from "resend";
import { contactFormSchema } from "@/lib/validations/contact";
import { checkRateLimit } from "@/lib/rate-limit";

export const POST = async (request: NextRequest) => {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  // Honeypot: real visitors never see or fill this field; bots usually do.
  if (
    typeof body === "object" &&
    body !== null &&
    "company" in body &&
    (body as Record<string, unknown>).company
  ) {
    return NextResponse.json({ success: true });
  }

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { success: false, error: parsed.error.issues[0]?.message ?? "Invalid input." },
      { status: 400 }
    );
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set; contact form cannot send email.");
    return NextResponse.json(
      {
        success: false,
        error: "The contact form isn't configured yet — please email me directly.",
      },
      { status: 503 }
    );
  }

  const { name, email, message } = parsed.data;
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? "Portfolio <onboarding@resend.dev>",
      to: process.env.CONTACT_TO_EMAIL ?? "semlafleur@hotmail.com",
      replyTo: email,
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
  } catch (error) {
    console.error("Failed to send contact email", error);
    return NextResponse.json(
      { success: false, error: "Could not send your message. Please try again." },
      { status: 502 }
    );
  }

  return NextResponse.json({ success: true });
};

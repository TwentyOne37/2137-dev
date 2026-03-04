import { NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name,
      email,
      projectType,
      budget,
      details,
      telegram,
      twitter,
    } = body;

    const telegramVal = typeof telegram === "string" ? telegram.trim() : "";
    const twitterVal = typeof twitter === "string" ? twitter.trim() : "";

    if (!name || !email || !projectType || !budget || !details) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, projectType, budget, details" },
        { status: 400 }
      );
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Email service not configured" },
        { status: 500 }
      );
    }

    const resend = new Resend(apiKey);

    const optionalFields = [
      telegramVal && `Telegram: ${telegramVal}`,
      twitterVal && `Twitter: ${twitterVal}`,
    ]
      .filter(Boolean)
      .join("\n");

    const text = [
      `Name: ${name}`,
      `Email: ${email}`,
      `Project type: ${projectType}`,
      `Budget: ${budget}`,
      "",
      "Details:",
      details,
      optionalFields && "",
      optionalFields,
    ]
      .filter(Boolean)
      .join("\n");

    const { error } = await resend.emails.send({
      from: process.env.RESEND_FROM ?? "2137.dev <onboarding@resend.dev>",
      to: ["krzysztof@2137.dev"],
      replyTo: email,
      subject: `Inquiry: ${projectType} from ${name}`,
      text,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to send" },
      { status: 500 }
    );
  }
}

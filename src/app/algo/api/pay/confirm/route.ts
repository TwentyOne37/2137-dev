import { NextResponse } from "next/server";
import { escapeHtml, sendTelegram } from "@/lib/telegram";

const MAX_FIELD_LEN = 200;

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, MAX_FIELD_LEN);
}

export async function POST(request: Request) {
  const body = await request.json();

  const ref = sanitize(body.ref);
  const email = sanitize(body.email);
  const telegram = sanitize(body.telegram);
  const twitter = sanitize(body.twitter);
  const amount = process.env.PAYMENT_AMOUNT ?? "50";

  if (!ref) {
    return NextResponse.json({ error: "missing ref" }, { status: 400 });
  }

  if (!email && !telegram && !twitter) {
    return NextResponse.json({ error: "missing contact" }, { status: 400 });
  }

  // Message 1: Contact card
  const contactLines = [
    email && `Email: ${escapeHtml(email)}`,
    telegram && `Telegram: ${escapeHtml(telegram)}`,
    twitter && `Twitter: ${escapeHtml(twitter)}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendTelegram(
    `<b>New founding member signup</b>\n\n` +
      `Ref: <code>${escapeHtml(ref)}</code>\n` +
      `${contactLines}`,
  );

  // Message 2: Payment reference
  await sendTelegram(
    `<b>Payment pending — ${escapeHtml(ref)}</b>\n\n` +
      `Amount: <code>${amount} USDC</code>\n` +
      `Memo: <code>${escapeHtml(ref)}</code>\n` +
      `User claims payment sent.\n` +
      `Verify on-chain or wait for Helius webhook.`,
  );

  return NextResponse.json({ ok: true });
}

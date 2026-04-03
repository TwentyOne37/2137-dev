import { NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: Request) {
  const signature = request.headers.get("X-CC-Webhook-Signature") ?? "";
  const rawBody = await request.text();

  // Verify HMAC-SHA256 signature
  const secret = process.env.COINBASE_WEBHOOK_SECRET;
  if (!secret) {
    console.error("COINBASE_WEBHOOK_SECRET not configured");
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const computed = crypto
    .createHmac("sha256", secret)
    .update(rawBody)
    .digest("hex");

  try {
    if (
      !crypto.timingSafeEqual(
        Buffer.from(computed, "hex"),
        Buffer.from(signature, "hex"),
      )
    ) {
      return NextResponse.json({ error: "invalid signature" }, { status: 401 });
    }
  } catch {
    return NextResponse.json({ error: "invalid signature" }, { status: 401 });
  }

  // Parse event
  const event = JSON.parse(rawBody);

  // Only act on confirmed charges
  if (event.event?.type !== "charge:confirmed") {
    return NextResponse.json({ ok: true });
  }

  const charge = event.event.data;
  const amount =
    charge.pricing?.local?.amount && charge.pricing?.local?.currency
      ? `${charge.pricing.local.amount} ${charge.pricing.local.currency}`
      : "unknown";
  const confirmedAt = charge.confirmed_at ?? new Date().toISOString();
  const chargeId = charge.id ?? "N/A";
  const name = charge.metadata?.name ?? charge.name ?? "";

  const text = [
    `<b>New payment confirmed!</b>`,
    ``,
    `Amount: <code>${amount}</code>`,
    name ? `Name: ${name}` : null,
    `Time: ${confirmedAt}`,
    `Charge: <code>${chargeId}</code>`,
  ]
    .filter((line) => line !== null)
    .join("\n");

  // Send Telegram notification (fire and forget)
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (botToken && chatId) {
    try {
      await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: chatId,
            text,
            parse_mode: "HTML",
          }),
        },
      );
    } catch (err) {
      console.error("Telegram notification failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}

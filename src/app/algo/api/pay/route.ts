import { NextResponse } from "next/server";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const MAX_FIELD_LEN = 200;

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, MAX_FIELD_LEN);
}

export async function POST(request: Request) {
  const recipient = process.env.OWNER_WALLET;
  if (!recipient) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const body = await request.json();
  const email = sanitize(body.email);
  const telegram = sanitize(body.telegram);
  const twitter = sanitize(body.twitter);

  if (!email && !telegram && !twitter) {
    return NextResponse.json(
      { error: "Provide at least one contact method" },
      { status: 400 },
    );
  }

  const ref = crypto.randomUUID().slice(0, 8);
  const amount = process.env.PAYMENT_AMOUNT ?? "50";

  const url =
    `solana:${recipient}` +
    `?amount=${amount}` +
    `&spl-token=${USDC_MINT}` +
    `&memo=${encodeURIComponent(ref)}` +
    `&label=${encodeURIComponent("algo-trader")}` +
    `&message=${encodeURIComponent("Founding Member Access")}`;

  return NextResponse.json({ url, ref, amount });
}

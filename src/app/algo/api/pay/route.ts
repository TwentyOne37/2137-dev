import { NextResponse } from "next/server";
import { createSession } from "@/lib/payment-store";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export async function POST(request: Request) {
  const recipient = process.env.OWNER_WALLET;
  if (!recipient) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const body = await request.json();
  const { email, telegram, twitter } = body;

  if (!email && !telegram && !twitter) {
    return NextResponse.json(
      { error: "Provide at least one contact method" },
      { status: 400 },
    );
  }

  const ref = createSession({ email, telegram, twitter });
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

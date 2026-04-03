import { NextResponse } from "next/server";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export function GET() {
  const recipient = process.env.OWNER_WALLET;
  if (!recipient) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const amount = process.env.PAYMENT_AMOUNT ?? "50";
  const memo = "algo-trader founding member";
  const label = "algo-trader";
  const message = "Founding Member Access";

  const url =
    `solana:${recipient}` +
    `?amount=${amount}` +
    `&spl-token=${USDC_MINT}` +
    `&memo=${encodeURIComponent(memo)}` +
    `&label=${encodeURIComponent(label)}` +
    `&message=${encodeURIComponent(message)}`;

  return NextResponse.json({ url, recipient, amount, memo });
}

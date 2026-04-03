import { NextResponse } from "next/server";
import { sendTelegram } from "@/lib/telegram";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";

export async function POST(request: Request) {
  // Verify webhook auth token set when creating the Helius webhook
  const auth = request.headers.get("authorization") ?? "";
  const secret = process.env.HELIUS_WEBHOOK_SECRET;
  if (!secret || auth !== secret) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const ownerWallet = process.env.OWNER_WALLET;
  if (!ownerWallet) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  // Helius Enhanced Webhooks send an array of enriched transactions
  const transactions: any[] = await request.json();

  for (const tx of transactions) {
    const transfers = tx.tokenTransfers ?? [];
    for (const transfer of transfers) {
      if (
        transfer.mint === USDC_MINT &&
        transfer.toUserAccount === ownerWallet &&
        transfer.tokenAmount > 0
      ) {
        const time = tx.timestamp
          ? new Date(tx.timestamp * 1000).toISOString()
          : new Date().toISOString();

        await sendTelegram(
          `<b>USDC payment confirmed!</b>\n\n` +
            `Amount: <code>${transfer.tokenAmount} USDC</code>\n` +
            `From: <code>${transfer.fromUserAccount ?? "unknown"}</code>\n` +
            `Time: ${time}\n` +
            `Tx: <code>${tx.signature ?? "N/A"}</code>`,
        );
      }
    }
  }

  return NextResponse.json({ ok: true });
}

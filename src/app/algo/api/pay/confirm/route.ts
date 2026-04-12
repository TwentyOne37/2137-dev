import { NextResponse } from "next/server";
import { Connection } from "@solana/web3.js";
import { Resend } from "resend";
import { escapeHtml, sendTelegram } from "@/lib/telegram";
import BetaWelcomeEmail from "@/emails/beta-welcome";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const MAX_FIELD_LEN = 200;

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, MAX_FIELD_LEN);
}

function getExpectedAmount(discountCode: string): number {
  const base = parseFloat(process.env.PAYMENT_AMOUNT ?? "50");
  if (!discountCode) return base;

  const codes = (process.env.DISCOUNT_CODES || "").split(",").filter(Boolean);
  for (const entry of codes) {
    const [code, pctOff] = entry.split(":");
    if (code.toUpperCase() === discountCode.toUpperCase()) {
      const percent = parseFloat(pctOff) || 0;
      return Math.max(base * (1 - percent / 100), 0.01);
    }
  }
  return base;
}

export async function POST(request: Request) {
  const body = await request.json();

  const signature = sanitize(body.signature);
  const payer = sanitize(body.payer);
  const email = sanitize(body.email);
  const telegram = sanitize(body.telegram);
  const twitter = sanitize(body.twitter);
  const discountCode = sanitize(body.discountCode);

  if (!signature) {
    return NextResponse.json({ error: "missing signature" }, { status: 400 });
  }
  if (!payer) {
    return NextResponse.json({ error: "missing payer" }, { status: 400 });
  }
  if (!email && !telegram && !twitter) {
    return NextResponse.json({ error: "missing contact" }, { status: 400 });
  }

  const ownerWallet = process.env.OWNER_WALLET;
  if (!ownerWallet) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  // ── Step 1: Verify on-chain ──
  const rpcUrl =
    process.env.NEXT_PUBLIC_SOLANA_RPC ||
    "https://api.mainnet-beta.solana.com";
  const connection = new Connection(rpcUrl);

  let tx;
  try {
    tx = await connection.getTransaction(signature, {
      commitment: "confirmed",
      maxSupportedTransactionVersion: 0,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: "failed to fetch transaction: " + (err?.message ?? "") },
      { status: 502 },
    );
  }

  if (!tx || !tx.meta) {
    return NextResponse.json(
      { error: "transaction not found or not confirmed yet" },
      { status: 404 },
    );
  }

  if (tx.meta.err) {
    return NextResponse.json(
      { error: "transaction failed on-chain" },
      { status: 400 },
    );
  }

  // Check USDC balance change for owner wallet
  const postBalances = tx.meta.postTokenBalances || [];
  const preBalances = tx.meta.preTokenBalances || [];

  const ownerPost = postBalances.find(
    (b) => b.owner === ownerWallet && b.mint === USDC_MINT,
  );
  const ownerPre = preBalances.find(
    (b) => b.owner === ownerWallet && b.mint === USDC_MINT,
  );

  const preAmount = ownerPre?.uiTokenAmount?.uiAmount ?? 0;
  const postAmount = ownerPost?.uiTokenAmount?.uiAmount ?? 0;
  const received = postAmount - preAmount;

  const expectedAmount = getExpectedAmount(discountCode);
  if (received < expectedAmount * 0.99) {
    return NextResponse.json(
      {
        error: `amount mismatch: expected ${expectedAmount}, received ${received.toFixed(2)}`,
      },
      { status: 400 },
    );
  }

  const amountUsd = received.toFixed(2);

  // ── Step 2: Grant access on algo-trader ──
  const grantUrl = process.env.ACCESS_GRANT_URL;
  const grantSecret = process.env.ACCESS_GRANT_SECRET;

  if (grantUrl && grantSecret) {
    try {
      const grantRes = await fetch(grantUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-grant-secret": grantSecret,
        },
        body: JSON.stringify({
          wallet: payer,
          email,
          telegram,
          twitter,
          amountUsd,
          discountCode,
          txSignature: signature,
        }),
      });

      if (!grantRes.ok) {
        const err = await grantRes.json().catch(() => ({}));
        console.error("[grant] failed:", err);
      }
    } catch (err) {
      console.error("[grant] error:", err);
    }
  }

  // ── Step 3: Send confirmation email ──
  if (email) {
    try {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const from = process.env.RESEND_FROM || "algo-trader <onboarding@resend.dev>";
      await resend.emails.send({
        from,
        to: email,
        subject: "You're in — algo-trader beta access confirmed",
        react: BetaWelcomeEmail({
          wallet: payer,
          amountUsd,
          txSignature: signature,
          date: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        }),
      });
    } catch (err) {
      console.error("[email] send error:", err);
    }
  }

  // ── Step 4: Telegram notification ──
  const contactLines = [
    email && `Email: ${escapeHtml(email)}`,
    telegram && `Telegram: ${escapeHtml(telegram)}`,
    twitter && `Twitter: ${escapeHtml(twitter)}`,
  ]
    .filter(Boolean)
    .join("\n");

  await sendTelegram(
    `<b>New beta member</b>\n\n` +
      `Amount: <code>${amountUsd} USDC</code>` +
      (discountCode ? ` (code: ${escapeHtml(discountCode)})` : "") +
      `\n` +
      `Wallet: <code>${escapeHtml(payer)}</code>\n` +
      `Tx: <code>${escapeHtml(signature)}</code>\n` +
      `${contactLines}\n\n` +
      `https://solscan.io/tx/${escapeHtml(signature)}`,
  );

  return NextResponse.json({ ok: true, granted: true });
}

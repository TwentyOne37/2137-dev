import { Connection, PublicKey } from "@solana/web3.js";
import { getSession } from "./payment-store";

const USDC_MINT = "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v";
const TOKEN_PROGRAM = new PublicKey(
  "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
);
const ATA_PROGRAM = new PublicKey(
  "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL",
);
const POLL_INTERVAL = 15_000;

function getATA(owner: PublicKey, mint: PublicKey): PublicKey {
  const [ata] = PublicKey.findProgramAddressSync(
    [owner.toBuffer(), TOKEN_PROGRAM.toBuffer(), mint.toBuffer()],
    ATA_PROGRAM,
  );
  return ata;
}

async function sendTelegram(text: string) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;
  try {
    await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" }),
    });
  } catch (e) {
    console.error("[pay-watcher] telegram error:", e);
  }
}

export function startWatcher() {
  const wallet = process.env.OWNER_WALLET;
  if (!wallet) {
    console.warn("[pay-watcher] OWNER_WALLET not set, skipping");
    return;
  }

  const rpc =
    process.env.HELIUS_RPC_URL ?? "https://api.mainnet-beta.solana.com";
  const conn = new Connection(rpc, "confirmed");
  const owner = new PublicKey(wallet);
  const ata = getATA(owner, new PublicKey(USDC_MINT));

  let lastSig: string | undefined;

  async function poll() {
    try {
      const sigs = await conn.getSignaturesForAddress(
        ata,
        { limit: 10, ...(lastSig ? { until: lastSig } : {}) },
        "confirmed",
      );

      if (sigs.length === 0) return;
      lastSig = sigs[0].signature;

      for (const { signature } of sigs) {
        const tx = await conn.getParsedTransaction(signature, {
          maxSupportedTransactionVersion: 0,
        });
        if (!tx?.meta) continue;

        // Compare pre/post USDC balances for our wallet
        const pre = tx.meta.preTokenBalances?.find(
          (b) => b.owner === wallet && b.mint === USDC_MINT,
        );
        const post = tx.meta.postTokenBalances?.find(
          (b) => b.owner === wallet && b.mint === USDC_MINT,
        );

        const preBal = pre?.uiTokenAmount?.uiAmount ?? 0;
        const postBal = post?.uiTokenAmount?.uiAmount ?? 0;
        const received = postBal - preBal;

        if (received <= 0) continue;

        // Find sender: account whose USDC balance decreased
        const sender = tx.meta.preTokenBalances?.find((b) => {
          if (b.owner === wallet || b.mint !== USDC_MINT) return false;
          const postMatch = tx.meta!.postTokenBalances?.find(
            (p) => p.accountIndex === b.accountIndex,
          );
          const postAmt = postMatch?.uiTokenAmount?.uiAmount ?? 0;
          return (b.uiTokenAmount?.uiAmount ?? 0) > postAmt;
        });

        // Extract memo if present
        const memoIx = tx.transaction.message.instructions.find(
          (ix: any) => ix.program === "spl-memo",
        );
        const memo =
          memoIx && "parsed" in memoIx ? String(memoIx.parsed) : "";

        const time = tx.blockTime
          ? new Date(tx.blockTime * 1000).toISOString()
          : new Date().toISOString();

        // Look up contact info from payment session
        const session = memo ? getSession(memo) : undefined;
        const contactLines = session
          ? [
              session.email && `Email: ${session.email}`,
              session.telegram && `Telegram: ${session.telegram}`,
              session.twitter && `Twitter: ${session.twitter}`,
            ]
              .filter(Boolean)
              .join("\n")
          : "";

        await sendTelegram(
          `<b>USDC payment received!</b>\n\n` +
            `Amount: <code>${received} USDC</code>\n` +
            `From: <code>${sender?.owner ?? "unknown"}</code>\n` +
            `Time: ${time}\n` +
            (contactLines ? `\n<b>Contact:</b>\n${contactLines}\n` : "") +
            (memo && !session ? `Memo: ${memo}\n` : "") +
            `\nTx: <code>${signature}</code>`,
        );
      }
    } catch (e) {
      console.error("[pay-watcher] poll error:", e);
    }
  }

  // Seed cursor to latest signature so we don't replay history on boot
  conn
    .getSignaturesForAddress(ata, { limit: 1 }, "confirmed")
    .then((sigs) => {
      if (sigs.length > 0) lastSig = sigs[0].signature;
      console.log(
        `[pay-watcher] watching ${ata.toBase58()} every ${POLL_INTERVAL / 1000}s`,
      );
      setInterval(poll, POLL_INTERVAL);
    })
    .catch((e) => console.error("[pay-watcher] failed to start:", e));
}

"use client";

import { useState, useCallback } from "react";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useWalletModal } from "@solana/wallet-adapter-react-ui";
import {
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import {
  getAssociatedTokenAddressSync,
  createTransferInstruction,
  createAssociatedTokenAccountIdempotentInstruction,
} from "@solana/spl-token";

const USDC_MINT = new PublicKey(
  "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v",
);
const USDC_DECIMALS = 6;

interface PayButtonProps {
  recipientWallet: string;
  amount: string;
  contact: { email: string; telegram: string; twitter: string };
  onSuccess: (sig: string, ref: string) => void;
}

export default function PayButton({
  recipientWallet,
  amount,
  contact,
  onSuccess,
}: PayButtonProps) {
  const { connection } = useConnection();
  const { publicKey, sendTransaction, connected } = useWallet();
  const { setVisible } = useWalletModal();
  const [status, setStatus] = useState<
    "idle" | "connecting" | "sending" | "confirming" | "done" | "error"
  >("idle");
  const [error, setError] = useState("");

  const handlePay = useCallback(async () => {
    // Step 1: ensure wallet is connected
    if (!connected || !publicKey) {
      setStatus("connecting");
      setVisible(true);
      return;
    }

    setStatus("sending");
    setError("");

    try {
      const recipient = new PublicKey(recipientWallet);
      const amountLamports = Math.round(
        parseFloat(amount) * 10 ** USDC_DECIMALS,
      );

      // Derive ATAs
      const senderAta = getAssociatedTokenAddressSync(
        USDC_MINT,
        publicKey,
      );
      const recipientAta = getAssociatedTokenAddressSync(
        USDC_MINT,
        recipient,
      );

      const tx = new Transaction();

      // Idempotent: creates ATA if needed, no-op if it exists (no RPC call)
      tx.add(
        createAssociatedTokenAccountIdempotentInstruction(
          publicKey,
          recipientAta,
          recipient,
          USDC_MINT,
        ),
      );

      // USDC transfer
      tx.add(
        createTransferInstruction(
          senderAta,
          recipientAta,
          publicKey,
          amountLamports,
        ),
      );

      // Add memo with ref for tracking
      const ref = crypto.randomUUID().slice(0, 8);
      tx.add({
        keys: [],
        programId: new PublicKey(
          "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
        ),
        data: Buffer.from(ref),
      });

      const signature = await sendTransaction(tx, connection);
      setStatus("confirming");

      await connection.confirmTransaction(signature, "confirmed");

      // Notify backend
      fetch("/api/pay/confirm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ref,
          signature,
          payer: publicKey.toBase58(),
          ...contact,
        }),
      }).catch(() => {});

      setStatus("done");
      onSuccess(signature, ref);
    } catch (err: any) {
      setStatus("error");
      if (err?.message?.includes("User rejected")) {
        setError("Transaction cancelled");
      } else if (err?.message?.includes("insufficient")) {
        setError("Insufficient USDC balance");
      } else {
        setError(err?.message ?? "Transaction failed");
      }
    }
  }, [
    connected,
    publicKey,
    connection,
    sendTransaction,
    setVisible,
    recipientWallet,
    amount,
    contact,
    onSuccess,
  ]);

  // After wallet connects via modal, auto-trigger pay
  const wallet = useWallet();
  if (status === "connecting" && wallet.connected && wallet.publicKey) {
    setStatus("idle");
    setTimeout(handlePay, 100);
  }

  const labels: Record<string, string> = {
    idle: `Pay ${amount} USDC`,
    connecting: "Connect Wallet...",
    sending: "Approve in wallet...",
    confirming: "Confirming...",
    done: "Paid",
    error: `Pay ${amount} USDC`,
  };

  const isLoading = ["connecting", "sending", "confirming"].includes(status);

  return (
    <div>
      <button
        onClick={handlePay}
        disabled={isLoading || status === "done"}
        className="w-full rounded bg-[#ffb800] py-3.5 text-[12px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0a200] disabled:opacity-50"
      >
        {isLoading && (
          <span className="mr-2 inline-block h-3 w-3 animate-spin rounded-full border-2 border-black/30 border-t-black" />
        )}
        {labels[status]}
      </button>
      {error && (
        <p className="mt-2 text-center text-[12px] text-red-400">{error}</p>
      )}
    </div>
  );
}

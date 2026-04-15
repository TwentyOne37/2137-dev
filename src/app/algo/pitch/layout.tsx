import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "algo-trader · Solana Roast Pitch",
  description:
    "The 10x Dexscreener. Real-time Solana DEX trading terminal with sub-second charts, 10 Rust-computed indicators, strategy builder, paper-to-live execution, and an x402 API for autonomous agents.",
  openGraph: {
    title: "algo-trader · Solana Roast Pitch",
    description:
      "The 10x Dexscreener. Built for humans and AI agents.",
    type: "website",
  },
};

export default function PitchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

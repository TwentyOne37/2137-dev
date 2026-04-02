import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "algo-trader — Real-Time Trading Terminal for PumpSwap",
  description:
    "The first TradingView-like charting experience for Solana memecoins. Live candles, 7 technical indicators, strategy builder, and automated execution on PumpSwap.",
  openGraph: {
    title: "algo-trader — Real-Time Trading Terminal for PumpSwap",
    description:
      "Live candles, 7 technical indicators, strategy builder, and automated execution on PumpSwap. Built on Helius gRPC with sub-second latency.",
    type: "website",
    siteName: "algo-trader",
  },
  twitter: {
    card: "summary_large_image",
    title: "algo-trader — Real-Time Trading Terminal for PumpSwap",
    description:
      "The first TradingView-like charting experience for Solana memecoins. Live candles, technical indicators, and automated strategies.",
    creator: "@TwentyOne_37",
  },
};

export default function AlgoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

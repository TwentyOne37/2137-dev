import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shard · Rebrand Proposal",
  description:
    "Shard — real-time Solana trading terminal for humans and autonomous agents. Rebrand proposal companion to the Solana Foundation grant via Superteam Poland. Shipping for Colosseum Frontier, May 11, 2026.",
  openGraph: {
    title: "Shard · Rebrand Proposal",
    description:
      "Trade the breaks before they show. Vision, milestones, and what the grant unlocks — all delivered by May 11.",
    type: "website",
    siteName: "Shard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shard · Rebrand Proposal",
    description:
      "Trade the breaks before they show. Real-time Solana trading terminal for humans and autonomous agents.",
    creator: "@TwentyOne_37",
  },
};

export default function ShardRebrandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

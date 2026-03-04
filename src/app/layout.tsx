import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2137.dev — Solana / Backend / AI Agency | Rescue Contracts Open",
  description:
    "Solana, Backend & AI engineering. Rescue contracts open. 7 years building production systems. Fixed-scope consulting.",
  openGraph: {
    title: "2137.dev — Solana / Backend / AI Agency | Rescue Contracts Open",
    description:
      "Solana, Backend & AI engineering. Rescue contracts open. Fixed-scope consulting.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

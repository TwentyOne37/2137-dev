import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2137.dev — Solana / Backend / AI Agency | Fixed-scope Consulting",
  description:
    "Solana, Backend & AI engineering. 7 years building production systems. Fixed-scope consulting for startups and crypto.",
  metadataBase: new URL("https://2137.dev"),
  openGraph: {
    title: "2137.dev — Solana / Backend / AI Agency | Fixed-scope Consulting",
    description:
      "Solana, Backend & AI engineering. 7 years building production systems. Fixed-scope consulting.",
    type: "website",
    siteName: "2137.dev",
  },
  twitter: {
    card: "summary_large_image",
    title: "2137.dev — Solana / Backend / AI Agency | Fixed-scope Consulting",
    description:
      "Solana, Backend & AI engineering. 7 years building production systems. Fixed-scope consulting.",
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

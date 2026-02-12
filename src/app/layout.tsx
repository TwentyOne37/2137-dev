import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "2137.dev — Backend & Solana Engineering",
  description:
    "Senior backend and blockchain engineer. 7 years building production systems. Fixed-scope consulting for startups and crypto projects.",
  openGraph: {
    title: "2137.dev — Backend & Solana Engineering",
    description:
      "Senior backend and blockchain engineer. Fixed-scope consulting.",
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

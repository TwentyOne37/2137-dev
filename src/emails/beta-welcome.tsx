import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Button,
  Hr,
  Link,
  Preview,
} from "@react-email/components";

interface BetaWelcomeEmailProps {
  wallet: string;
  amountUsd: string;
  txSignature: string;
  date: string;
}

export default function BetaWelcomeEmail({
  wallet,
  amountUsd,
  txSignature,
  date,
}: BetaWelcomeEmailProps) {
  const shortWallet = `${wallet.slice(0, 4)}..${wallet.slice(-4)}`;
  const shortTx = `${txSignature.slice(0, 4)}..${txSignature.slice(-4)}`;

  return (
    <Html>
      <Head />
      <Preview>Your algo-trader beta access is confirmed</Preview>
      <Body style={body}>
        <Container style={container}>
          <Text style={brand}>2137.DEV</Text>
          <Text style={heading}>Welcome to the beta.</Text>
          <Text style={subheading}>
            Your payment has been confirmed on-chain.
          </Text>

          <Section style={receipt}>
            <Text style={receiptLabel}>RECEIPT</Text>
            <Text style={receiptRow}>
              Amount:{" "}
              <span style={{ color: "#ffb800" }}>{amountUsd} USDC</span>
            </Text>
            <Text style={receiptRow}>
              Wallet:{" "}
              <span style={{ fontFamily: "monospace", color: "#5a7490" }}>
                {shortWallet}
              </span>
            </Text>
            <Text style={receiptRow}>
              Tx:{" "}
              <Link
                href={`https://solscan.io/tx/${txSignature}`}
                style={{ fontFamily: "monospace", color: "#5a7490" }}
              >
                {shortTx} ↗
              </Link>
            </Text>
            <Text style={receiptRow}>Date: {date}</Text>
          </Section>

          <Section style={{ textAlign: "center" as const, marginTop: "32px" }}>
            <Button href="https://algo.2137.dev/terminal" style={ctaButton}>
              Open your terminal →
            </Button>
          </Section>

          <Text style={hint}>
            Sign in with the same wallet you used to pay.
          </Text>

          <Hr style={{ borderColor: "#1e2d3d", marginTop: "32px" }} />

          <Text style={footer}>
            Questions? Reply to this email or reach out on Telegram.
          </Text>
          <Text style={footerSub}>2137.dev · Amsterdam</Text>
        </Container>
      </Body>
    </Html>
  );
}

const body = {
  backgroundColor: "#0a0a0a",
  margin: 0,
  padding: 0,
  fontFamily:
    'ui-monospace, "Cascadia Mono", "Segoe UI Mono", "Liberation Mono", Menlo, Monaco, Consolas, monospace',
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  padding: "40px 20px",
};

const brand = {
  color: "#ffb800",
  fontSize: "14px",
  fontWeight: 700 as const,
  letterSpacing: "0.15em",
  textAlign: "center" as const,
  margin: "0",
};

const heading = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: 700 as const,
  textAlign: "center" as const,
  marginTop: "24px",
};

const subheading = {
  color: "#6b8299",
  fontSize: "14px",
  textAlign: "center" as const,
  marginTop: "8px",
};

const receipt = {
  backgroundColor: "#111827",
  borderRadius: "8px",
  padding: "20px",
  marginTop: "32px",
  border: "1px solid #1e2d3d",
};

const receiptLabel = {
  color: "#4a5e78",
  fontSize: "10px",
  letterSpacing: "0.2em",
  textTransform: "uppercase" as const,
  margin: "0 0 12px",
};

const receiptRow = {
  color: "#ffffff",
  fontSize: "13px",
  margin: "4px 0",
};

const ctaButton = {
  backgroundColor: "#22c55e",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: 700 as const,
  padding: "14px 32px",
  borderRadius: "8px",
  textDecoration: "none",
};

const hint = {
  color: "#4a5e78",
  fontSize: "12px",
  textAlign: "center" as const,
  marginTop: "16px",
};

const footer = {
  color: "#364a5e",
  fontSize: "11px",
  textAlign: "center" as const,
  marginTop: "16px",
};

const footerSub = {
  color: "#253545",
  fontSize: "11px",
  textAlign: "center" as const,
  marginTop: "8px",
};

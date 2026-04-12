import { NextResponse } from "next/server";

const MAX_FIELD_LEN = 200;

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, MAX_FIELD_LEN);
}

function getAdjustedAmount(discountCode: string): {
  amount: string;
  discountApplied: boolean;
  percentOff: number;
} {
  const base = parseFloat(process.env.PAYMENT_AMOUNT ?? "50");
  if (!discountCode) return { amount: String(base), discountApplied: false, percentOff: 0 };

  const codes = (process.env.DISCOUNT_CODES || "").split(",").filter(Boolean);
  for (const entry of codes) {
    const [code, pctOff] = entry.split(":");
    if (code.toUpperCase() === discountCode.toUpperCase()) {
      const percent = parseFloat(pctOff) || 0;
      const adjusted = Math.max(base * (1 - percent / 100), 0.01);
      return {
        amount: adjusted.toFixed(2),
        discountApplied: true,
        percentOff: percent,
      };
    }
  }

  return { amount: String(base), discountApplied: false, percentOff: 0 };
}

export async function POST(request: Request) {
  const wallet = process.env.OWNER_WALLET;
  if (!wallet) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const body = await request.json();
  const email = sanitize(body.email);
  const telegram = sanitize(body.telegram);
  const twitter = sanitize(body.twitter);
  const discountCode = sanitize(body.discountCode);

  if (!email && !telegram && !twitter) {
    return NextResponse.json(
      { error: "Provide at least one contact method" },
      { status: 400 },
    );
  }

  const ref = crypto.randomUUID().slice(0, 8);
  const { amount, discountApplied, percentOff } = getAdjustedAmount(discountCode);

  return NextResponse.json({ wallet, ref, amount, discountApplied, percentOff });
}

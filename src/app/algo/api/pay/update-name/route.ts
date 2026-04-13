import { NextResponse } from "next/server";

const MAX_FIELD_LEN = 200;

function sanitize(val: unknown): string {
  if (typeof val !== "string") return "";
  return val.trim().slice(0, MAX_FIELD_LEN);
}

export async function POST(request: Request) {
  const body = await request.json();
  const wallet = sanitize(body.wallet);
  const name = sanitize(body.name);

  if (!wallet || !name) {
    return NextResponse.json({ error: "wallet and name required" }, { status: 400 });
  }

  const grantUrl = process.env.ACCESS_GRANT_URL;
  const grantSecret = process.env.ACCESS_GRANT_SECRET;

  if (!grantUrl || !grantSecret) {
    return NextResponse.json({ error: "not configured" }, { status: 500 });
  }

  const res = await fetch(grantUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-grant-secret": grantSecret,
    },
    body: JSON.stringify({ wallet, name }),
  });

  if (!res.ok) {
    return NextResponse.json({ error: "grant failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}

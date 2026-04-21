"use client";

import { useEffect, useRef } from "react";

/* Cursor-following radial glow — only active in the hero region */
export function CursorGlow({ targetId }: { targetId: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const target = document.getElementById(targetId);
    const glow = ref.current;
    if (!target || !glow) return;

    let raf = 0;
    let cx = 0;
    let cy = 0;
    let tx = 0;
    let ty = 0;
    let active = false;

    const onMove = (e: MouseEvent) => {
      const rect = target.getBoundingClientRect();
      tx = e.clientX - rect.left;
      ty = e.clientY - rect.top;
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      glow.style.opacity = inside ? "1" : "0";
      active = inside;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      glow.style.transform = `translate(${cx - 300}px, ${cy - 300}px)`;
      if (active || Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    window.addEventListener("mousemove", onMove);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [targetId]);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 h-[600px] w-[600px] opacity-0 transition-opacity duration-500"
      style={{
        background:
          "radial-gradient(circle at center, rgba(103,232,249,0.08), rgba(255,255,255,0.04) 30%, transparent 65%)",
        willChange: "transform, opacity",
      }}
    />
  );
}

/* Live ticker — simulated market rows, infinite scroll */
const SEED = [
  { sym: "SOL/USDC", px: 168.42, ch: 2.31 },
  { sym: "FARTCOIN/SOL", px: 1.184, ch: 18.42 },
  { sym: "BONK/SOL", px: 0.0000142, ch: -4.88 },
  { sym: "POPCAT/SOL", px: 0.328, ch: 7.91 },
  { sym: "WIF/USDC", px: 1.247, ch: -2.15 },
  { sym: "GIGA/SOL", px: 0.044, ch: 12.08 },
  { sym: "PNUT/USDC", px: 0.412, ch: -6.33 },
  { sym: "MOODENG/SOL", px: 0.211, ch: 22.67 },
  { sym: "CHILLGUY/SOL", px: 0.178, ch: -3.48 },
  { sym: "JUP/USDC", px: 0.823, ch: 1.04 },
  { sym: "PENGU/USDC", px: 0.0089, ch: 9.21 },
  { sym: "AI16Z/SOL", px: 0.782, ch: -5.14 },
  { sym: "GOAT/SOL", px: 0.344, ch: 4.02 },
  { sym: "MEW/USDC", px: 0.00311, ch: -1.88 },
  { sym: "JTO/USDC", px: 3.188, ch: 5.72 },
  { sym: "MYRO/SOL", px: 0.0214, ch: 0.91 },
  { sym: "BOME/USDC", px: 0.0071, ch: -7.42 },
  { sym: "ACT/SOL", px: 0.182, ch: 3.55 },
  { sym: "GRIFFAIN/SOL", px: 0.121, ch: 15.88 },
  { sym: "PYTH/USDC", px: 0.312, ch: 0.44 },
  { sym: "RAY/USDC", px: 4.021, ch: -1.29 },
  { sym: "ORCA/USDC", px: 2.884, ch: 3.17 },
  { sym: "DRIFT/USDC", px: 1.032, ch: 0.87 },
  { sym: "RETARDIO/SOL", px: 0.088, ch: -9.12 },
  { sym: "PONKE/USDC", px: 0.261, ch: 6.04 },
];

export function Ticker() {
  const rows = [...SEED, ...SEED];
  return (
    <div
      className="relative overflow-hidden border-y"
      style={{
        borderColor: "var(--line)",
        background: "var(--surface)",
      }}
    >
      <div className="flex whitespace-nowrap [animation:shard-ticker_90s_linear_infinite]">
        {rows.map((r, i) => (
          <TickerRow key={i} {...r} />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-0 w-24"
        style={{
          background:
            "linear-gradient(to right, var(--ticker-fade), transparent)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 w-24"
        style={{
          background:
            "linear-gradient(to left, var(--ticker-fade), transparent)",
        }}
      />
      <style jsx>{`
        @keyframes shard-ticker {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

function TickerRow({
  sym,
  px,
  ch,
}: {
  sym: string;
  px: number;
  ch: number;
}) {
  const up = ch >= 0;
  const pxStr = px < 0.01 ? px.toExponential(2) : px.toFixed(px < 1 ? 4 : 2);
  return (
    <span
      className="flex shrink-0 items-center gap-3 px-6 py-3 text-[11px] uppercase tracking-[0.2em]"
      style={{
        fontFamily: "JetBrains Mono, ui-monospace, monospace",
        color: "var(--text-mute)",
      }}
    >
      <span style={{ color: "var(--text)" }}>{sym}</span>
      <span style={{ color: "var(--text-dim)" }}>{pxStr}</span>
      <span style={{ color: up ? "#10b981" : "var(--text-soft)", opacity: 0.85 }}>
        {up ? "▲" : "▼"} {Math.abs(ch).toFixed(2)}%
      </span>
      <span style={{ color: "var(--text-ghost)" }}>·</span>
    </span>
  );
}

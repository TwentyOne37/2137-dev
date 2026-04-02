"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

/* ── scroll reveal ─────────────────────────────────────────── */
function FadeIn({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.6s ease ${delay}ms, transform 0.6s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── helpers ───────────────────────────────────────────────── */
function Dot({ color = "green" }: { color?: "green" | "amber" | "red" }) {
  const c = {
    green: "bg-emerald-400",
    amber: "bg-amber-400",
    red: "bg-red-400",
  }[color];
  return <span className={`inline-block h-2 w-2 rounded-full ${c}`} />;
}

/* ── DATA ─────────────────────────────────────────────────── */
const FEATURES = [
  {
    title: "Real-Time Charts",
    desc: "Live OHLCV candles streamed via Helius gRPC. Multiple timeframes — 1s, 15s, 30s, 1m. TradingView Lightweight Charts.",
    accent: "text-emerald-400",
  },
  {
    title: "7 Technical Indicators",
    desc: "EMA Cross, RSI, DMI/ADX, Supertrend, CCI, TRIX, Ichimoku Cloud. All computed in Rust for speed.",
    accent: "text-purple-400",
  },
  {
    title: "Strategy Builder",
    desc: "Custom buy/sell conditions across all indicators. Proven presets included. Rolling window confirmation.",
    accent: "text-[#ffb800]",
  },
  {
    title: "Paper Trading",
    desc: "Risk-free simulated execution with P&L tracking. Configurable slippage. Test before you trade.",
    accent: "text-emerald-400",
  },
  {
    title: "Live Execution",
    desc: "Real PumpSwap trades via Helius Sender. Safety limits, dry-run mode, and position management.",
    accent: "text-purple-400",
  },
  {
    title: "Auto Recovery",
    desc: "Historical backfill and gap-fill via Helius RPC. Graceful reconnects. Never miss a candle.",
    accent: "text-[#ffb800]",
  },
];

const TECH_STACK = [
  "Rust",
  "Solana",
  "Helius gRPC",
  "Redis",
  "ClickHouse",
  "Next.js",
  "TradingView Charts",
];

const STEPS = [
  {
    num: "01",
    title: "Connect Wallet",
    desc: "Link your Solana wallet. We never ask for private keys.",
  },
  {
    num: "02",
    title: "Add Any Token",
    desc: "Paste any PumpSwap token address. Charts load in under a second.",
  },
  {
    num: "03",
    title: "Build & Trade",
    desc: "Configure indicators, set strategy conditions, paper trade or go live.",
  },
];

const PRICING_FEATURES = [
  "Unlimited positions",
  "All 7 technical indicators",
  "Strategy builder with presets",
  "Paper trading simulator",
  "Live execution on PumpSwap",
  "Direct access to the builder",
];

/* ── NAV ──────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-[#0a0a0f]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Image
            src="/algo-logo.png"
            alt="ALGO"
            width={32}
            height={32}
            className="rounded-lg"
          />
          <span className="text-[13px] font-bold tracking-wide text-white">
            algo-trader
            <span className="ml-2 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-400">
              Beta
            </span>
          </span>
        </div>

        <div className="hidden items-center gap-8 sm:flex">
          {["features", "how-it-works", "pricing"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-[11px] uppercase tracking-[0.15em] text-white/30 transition hover:text-white"
            >
              {s.replace("-", " ")}
            </a>
          ))}
        </div>

        <a
          href="#pricing"
          className="rounded bg-[#ffb800] px-4 py-1.5 text-[11px] font-bold uppercase tracking-wider text-black transition hover:bg-[#e0a200]"
        >
          Get Access
        </a>
      </div>
    </nav>
  );
}

/* ── HERO ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-32 pb-20">
      {/* subtle gradient bg */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.08),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-6 text-center">
        {/* logo */}
        <FadeIn className="flex justify-center">
          <Image
            src="/algo-logo.png"
            alt="ALGO"
            width={100}
            height={100}
            className="rounded-2xl"
            priority
          />
        </FadeIn>

        {/* status */}
        <FadeIn delay={100}>
          <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/[0.03] px-4 py-1.5 text-[11px] uppercase tracking-[0.2em] text-white/40">
            <Dot color="amber" />
            <span>Founding members only</span>
            <span className="text-white/20">·</span>
            <span>Colosseum Frontier 2026</span>
          </div>
        </FadeIn>

        {/* headline */}
        <FadeIn delay={200}>
          <h1 className="mx-auto mt-8 max-w-3xl text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white">
            Automated trading
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-[#ffb800] to-emerald-400 bg-clip-text text-transparent">
              for PumpSwap.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={300}>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-white/40">
            The first TradingView-like charting experience for Solana memecoins.
            Live candles, 7 technical indicators, strategy builder, and automated
            execution — all powered by sub-second data from Helius&nbsp;gRPC.
          </p>
        </FadeIn>

        <FadeIn delay={400}>
          <div className="mt-8 flex justify-center gap-4">
            <a
              href="#pricing"
              className="rounded bg-[#ffb800] px-7 py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0a200]"
            >
              Get early access
            </a>
            <a
              href="#features"
              className="rounded border border-white/10 px-7 py-3 text-[12px] uppercase tracking-[0.15em] text-white/50 transition hover:border-white/25 hover:text-white"
            >
              Learn more
            </a>
          </div>
        </FadeIn>

        {/* stats */}
        <FadeIn delay={500}>
          <div className="mx-auto mt-14 grid max-w-2xl grid-cols-4 divide-x divide-white/5 rounded-lg border border-white/5 bg-white/[0.02]">
            {[
              { label: "Indicators", value: "7" },
              { label: "Timeframes", value: "4" },
              { label: "Latency", value: "<1s" },
              { label: "Presets", value: "2" },
            ].map((s) => (
              <div key={s.label} className="px-4 py-4 text-center">
                <div className="text-[22px] font-bold text-white">{s.value}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-[0.2em] text-white/25">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── APP PREVIEW PLACEHOLDER ──────────────────────────────── */
function AppPreview() {
  return (
    <section className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="relative overflow-hidden rounded-xl border border-white/5 bg-white/[0.02]">
            {/* mock window chrome */}
            <div className="flex items-center gap-2 border-b border-white/5 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-400/60" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/60" />
              <span className="ml-3 text-[10px] text-white/20">algo.2137.dev</span>
            </div>

            <div className="flex aspect-[16/9] items-center justify-center p-12">
              <div className="text-center">
                <div className="text-[11px] uppercase tracking-[0.25em] text-white/20">
                  App preview coming soon
                </div>
                <p className="mt-2 text-[13px] text-white/10">
                  Portfolio management · Live charts · Strategy builder
                </p>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── FEATURES ─────────────────────────────────────────────── */
function Features() {
  return (
    <section id="features" className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/25">
              Features
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Everything you need to trade.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[14px] text-white/30">
              Built from the ground up for PumpSwap tokens on Solana. Real-time
              data, powerful indicators, and automated execution.
            </p>
          </div>
        </FadeIn>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 80}>
              <div className="group rounded-lg border border-white/5 bg-white/[0.02] p-6 transition hover:border-white/10 hover:bg-white/[0.03]">
                <div className={`text-[11px] font-bold uppercase tracking-[0.2em] ${f.accent}`}>
                  {f.title}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-white/35">
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>

        {/* tech stack */}
        <FadeIn delay={500}>
          <div className="mt-10 flex flex-wrap justify-center gap-2">
            {TECH_STACK.map((t) => (
              <span
                key={t}
                className="rounded border border-white/5 bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-wider text-white/25"
              >
                {t}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ─────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/25">
              How it works
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Three steps to your first trade.
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto mt-10 grid max-w-3xl gap-4 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 120}>
              <div className="rounded-lg border border-white/5 bg-white/[0.02] p-6 text-center">
                <div className="text-[28px] font-bold text-[#ffb800]/30">
                  {step.num}
                </div>
                <div className="mt-2 text-[15px] font-semibold text-white">
                  {step.title}
                </div>
                <p className="mt-2 text-[12px] leading-relaxed text-white/30">
                  {step.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── PRICING ──────────────────────────────────────────────── */
function Pricing() {
  return (
    <section id="pricing" className="border-t border-white/5 py-20">
      <div className="mx-auto max-w-5xl px-6">
        <FadeIn>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-white/25">
              Pricing
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Founding member rate.
            </h2>
            <p className="mx-auto mt-3 max-w-md text-[14px] text-white/30">
              Lock in the lowest price forever. Limited to the first 20 members.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mx-auto mt-10 max-w-sm rounded-xl border border-[#ffb800]/20 bg-[#ffb800]/[0.03] p-8">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#ffb800]">
                FOUNDING MEMBER
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                First 20 spots
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-[42px] font-bold leading-none text-white">$50</span>
              <span className="text-[16px] text-white/30">/mo</span>
            </div>
            <p className="mt-2 text-[12px] text-white/30">
              First 20 members lock in this rate forever.
            </p>

            <ul className="mt-6 space-y-2.5">
              {PRICING_FEATURES.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[13px] text-white/40"
                >
                  <span className="text-emerald-400">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://x.com/TwentyOne_37"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 block rounded bg-[#ffb800] py-3 text-center text-[12px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0a200]"
            >
              Pay with SOL / USDC
            </a>

            <p className="mt-4 text-center text-[11px] text-white/25">
              After payment, DM{" "}
              <a
                href="https://x.com/TwentyOne_37"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffb800] hover:underline"
              >
                @TwentyOne_37
              </a>{" "}
              with your wallet for instant access
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── FOOTER ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-white/20">Built by</span>
          <a
            href="https://2137.dev"
            className="text-[11px] font-semibold text-white/40 transition hover:text-white"
          >
            2137.dev
          </a>
        </div>
        <div className="flex items-center gap-6 text-[11px] text-white/20">
          <a
            href="https://x.com/TwentyOne_37"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            Twitter
          </a>
          <a
            href="https://github.com/TwentyOne37"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-white"
          >
            GitHub
          </a>
          <span className="text-white/10">Colosseum Frontier 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ─────────────────────────────────────────────────── */
export default function AlgoLandingPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f]">
      <Nav />
      <Hero />
      <AppPreview />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}

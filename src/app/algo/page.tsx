"use client";

import { useState, useEffect, useRef, useCallback } from "react";

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
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: `opacity 0.5s ease ${delay}ms, transform 0.5s ease ${delay}ms`,
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
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${c}`} />;
}

/* ── SPLIT-FLAP TEXT ───────────────────────────────────────── */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/&-.  ";

function SplitFlapText({
  text,
  delay = 0,
  speed = 30,
}: {
  text: string;
  delay?: number;
  speed?: number;
}) {
  const [display, setDisplay] = useState(() => text.replace(/[^ ]/g, " "));
  const [done, setDone] = useState(false);
  const frameRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const animate = useCallback(() => {
    const target = text.toUpperCase();
    let iteration = 0;
    const maxIterations = target.length * 3;

    const tick = () => {
      iteration++;
      const resolved = Math.floor(iteration / 3);

      const result = target
        .split("")
        .map((char, i) => {
          if (i < resolved) return char;
          if (char === " ") return " ";
          return CHARS[Math.floor(Math.random() * CHARS.length)];
        })
        .join("");

      setDisplay(result);

      if (iteration < maxIterations) {
        frameRef.current = setTimeout(tick, speed);
      } else {
        setDisplay(target);
        setDone(true);
      }
    };

    frameRef.current = setTimeout(tick, delay);
  }, [text, delay, speed]);

  useEffect(() => {
    animate();
    return () => {
      if (frameRef.current) clearTimeout(frameRef.current);
    };
  }, [animate]);

  return <span className={done ? "" : "opacity-90"}>{display}</span>;
}

/* ── SPLIT-FLAP ROW ───────────────────────────────────────── */
function SplitFlapRow({
  code,
  name,
  description,
  index,
}: {
  code: string;
  name: string;
  description: string;
  index: number;
}) {
  const [visible, setVisible] = useState(false);
  const rowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = rowRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const baseDelay = index * 200;

  return (
    <div
      ref={rowRef}
      className="grid grid-cols-[48px_1fr_1fr_72px] items-center border-b border-[#1a1a1a] py-2.5 text-[13px]"
    >
      <span className="font-semibold text-[#ffb800]">
        {visible ? (
          <SplitFlapText text={code} delay={baseDelay} speed={40} />
        ) : (
          "\u00A0"
        )}
      </span>
      <span className="text-white">
        {visible ? (
          <SplitFlapText text={name} delay={baseDelay + 100} speed={25} />
        ) : (
          "\u00A0"
        )}
      </span>
      <span className="hidden text-[#555] sm:inline">
        {visible ? (
          <SplitFlapText
            text={description}
            delay={baseDelay + 200}
            speed={20}
          />
        ) : (
          "\u00A0"
        )}
      </span>
      <span className="flex items-center justify-end gap-1.5 text-[10px] text-emerald-400">
        {visible && (
          <>
            <Dot />
            <SplitFlapText text="ACTIVE" delay={baseDelay + 300} speed={50} />
          </>
        )}
      </span>
    </div>
  );
}

/* ── DATA ─────────────────────────────────────────────────── */
const FEATURES = [
  {
    code: "CHT",
    name: "Real-Time Charts",
    description: "Live OHLCV candles via Helius gRPC, multiple timeframes (1s, 15s, 30s, 1m), TradingView Lightweight-Charts",
  },
  {
    code: "IND",
    name: "7 Technical Indicators",
    description: "EMA Cross, RSI, DMI/ADX, Supertrend, CCI, TRIX, Ichimoku Cloud — all computed in Rust",
  },
  {
    code: "STR",
    name: "Strategy Builder",
    description: "Custom buy/sell conditions across all indicators, proven presets, rolling window confirmation",
  },
  {
    code: "PPR",
    name: "Paper Trading",
    description: "Risk-free simulated execution, P&L tracking, configurable slippage",
  },
  {
    code: "EXE",
    name: "Live Execution",
    description: "Real PumpSwap trades via Helius Sender, safety limits, dry-run mode",
  },
  {
    code: "RCV",
    name: "Auto Recovery",
    description: "Historical backfill and gap-fill via Helius RPC, graceful reconnects",
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
    title: "Add Token",
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
  "All 7 indicators",
  "Strategy builder with presets",
  "Paper trading",
  "Live execution",
  "Direct access to builder",
];

/* ── NAV ──────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#1a1a1a] bg-[#0c0c0c]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-11 max-w-4xl items-center justify-between px-6 text-[10px] uppercase tracking-[0.2em]">
        <a href="#" className="text-white">
          algo-trader<span className="ml-1.5 text-[#ffb800]">BETA</span>
        </a>
        <div className="hidden gap-6 sm:flex">
          {["demo", "features", "how-it-works", "pricing"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-[#444] transition hover:text-white"
            >
              {s}
            </a>
          ))}
        </div>
        <a
          href="#pricing"
          className="border border-[#ffb800] px-3 py-1 text-[#ffb800] transition hover:bg-[#ffb800] hover:text-black"
        >
          GET ACCESS
        </a>
      </div>
    </nav>
  );
}

/* ── HERO ─────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto w-full max-w-4xl px-6">
        {/* status line */}
        <div className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#444]">
          <Dot color="amber" />
          <span>Beta — Founding members only</span>
          <span className="ml-auto">Colosseum Frontier 2026</span>
        </div>

        <div>
          <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] text-white">
            Real-time trading
            <br />
            terminal for PumpSwap.
          </h1>
          <p className="mt-3 max-w-lg text-[13px] leading-relaxed text-[#666]">
            The first TradingView-like charting experience for Solana memecoins.
            Live candles, technical indicators, and automated strategies — all
            powered by sub-second data from Helius gRPC.
          </p>

          <div className="mt-6 flex gap-3">
            <a
              href="#pricing"
              className="bg-[#ffb800] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[#e0a200]"
            >
              Get early access
            </a>
            <a
              href="#demo"
              className="border border-[#1e1e1e] px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-[#555] transition hover:border-[#555] hover:text-white"
            >
              Watch demo
            </a>
          </div>
        </div>

        {/* stats strip */}
        <div className="mt-10 grid grid-cols-4 border border-[#1a1a1a] bg-[#0e0e0e]">
          {[
            { label: "INDICATORS", value: "7" },
            { label: "TIMEFRAMES", value: "4" },
            { label: "LATENCY", value: "<1S" },
            { label: "PRESETS", value: "2" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`px-4 py-2.5 ${i !== 0 ? "border-l border-[#1a1a1a]" : ""}`}
            >
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#444]">
                {s.label}
              </div>
              <div className="mt-0.5 text-[13px] font-semibold text-white">
                {s.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── DEMO ─────────────────────────────────────────────────── */
function Demo() {
  return (
    <section id="demo" className="border-t border-[#1a1a1a] py-12">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="mb-4 text-[9px] uppercase tracking-[0.2em] text-[#444]">
            Demo
          </div>

          <div className="flex aspect-video items-center justify-center border border-[#1a1a1a] bg-[#0e0e0e]">
            <div className="text-center">
              <div className="text-[9px] uppercase tracking-[0.2em] text-[#444]">
                Video coming soon
              </div>
              <p className="mt-1 text-[10px] text-[#333]">
                Loom walkthrough will be embedded here
              </p>
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
    <section id="features" className="border-t border-[#1a1a1a] py-12">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-4 text-[9px] uppercase tracking-[0.2em] text-[#444]">
          Features
        </div>

        {/* board */}
        <div className="overflow-hidden rounded border border-[#1a1a1a] bg-[#0e0e0e]">
          {/* header */}
          <div className="grid grid-cols-[48px_1fr_1fr_72px] border-b border-[#1a1a1a] bg-[#111] px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[#444]">
            <span>Code</span>
            <span>Feature</span>
            <span className="hidden sm:inline">Details</span>
            <span className="text-right">Status</span>
          </div>

          {/* rows */}
          <div className="px-4">
            {FEATURES.map((f, i) => (
              <SplitFlapRow
                key={f.code}
                code={f.code}
                name={f.name}
                description={f.description}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* mobile descriptions */}
        <div className="mt-4 space-y-3 sm:hidden">
          {FEATURES.map((f) => (
            <div key={f.code} className="border-l-2 border-[#1a1a1a] pl-3">
              <div className="text-[9px] font-bold tracking-[0.2em] text-[#ffb800]">
                {f.code}
              </div>
              <p className="mt-0.5 text-[10px] leading-relaxed text-[#555]">
                {f.description}
              </p>
            </div>
          ))}
        </div>

        {/* tech stack */}
        <div className="mt-5 flex flex-wrap gap-1.5">
          {TECH_STACK.map((t) => (
            <span
              key={t}
              className="border border-[#1a1a1a] bg-[#0e0e0e] px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#555]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ─────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-[#1a1a1a] py-12">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#444]">
            How it works
          </div>
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Three steps to your first trade.
          </h2>
        </FadeIn>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 100}>
              <div className="border border-[#1a1a1a] bg-[#0e0e0e] p-4">
                <div className="text-[9px] font-bold tracking-[0.2em] text-[#ffb800]">
                  {step.num}
                </div>
                <div className="mt-2 text-[13px] font-semibold text-white">
                  {step.title}
                </div>
                <p className="mt-1.5 text-[10px] leading-relaxed text-[#666]">
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
    <section id="pricing" className="border-t border-[#1a1a1a] py-12">
      <div className="mx-auto max-w-4xl px-6">
        <FadeIn>
          <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#444]">
            Pricing
          </div>
          <h2 className="text-lg font-semibold text-white sm:text-xl">
            Founding member rate.
          </h2>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mx-auto mt-6 max-w-sm border border-[#ffb800]/30 bg-[#ffb800]/[0.02] p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-[9px] font-bold tracking-[0.2em] text-[#ffb800]">
                FOUNDING MEMBER
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] text-[#444]">
                FIRST 20 SPOTS
              </span>
            </div>

            <div className="mt-3 text-xl font-bold text-white">$50/mo</div>
            <p className="mt-1 text-[10px] text-[#555]">
              First 20 members lock in this rate forever.
            </p>

            <ul className="mt-5 space-y-1.5">
              {PRICING_FEATURES.map((item) => (
                <li
                  key={item}
                  className="text-[10px] leading-relaxed text-[#666]"
                >
                  <span className="mr-1 text-[#333]">—</span>
                  {item}
                </li>
              ))}
            </ul>

            <a
              href="https://x.com/TwentyOne_37"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 block bg-[#ffb800] py-2.5 text-center text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[#e0a200]"
            >
              Pay with SOL / USDC →
            </a>

            <p className="mt-3 text-center text-[9px] text-[#444]">
              After payment, DM{" "}
              <a
                href="https://x.com/TwentyOne_37"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#ffb800]"
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
    <footer className="border-t border-[#1a1a1a] py-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-2 px-6 text-[9px] uppercase tracking-[0.2em] text-[#333] sm:flex-row">
        <span>
          Built by{" "}
          <a
            href="https://2137.dev"
            className="text-[#555] transition hover:text-white"
          >
            2137.dev
          </a>
        </span>
        <div className="flex gap-5">
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
          <span className="text-[#444]">Colosseum Frontier 2026</span>
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ─────────────────────────────────────────────────── */
export default function AlgoLandingPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Demo />
      <Features />
      <HowItWorks />
      <Pricing />
      <Footer />
    </main>
  );
}

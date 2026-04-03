"use client";

import { useState, useEffect, useRef } from "react";

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

/* body text style helper — Inter / system font */
const sans = "font-[system-ui,Inter,-apple-system,sans-serif]";

/* ── DEX NAME CYCLER ──────────────────────────────────────── */
const DEX_NAMES = ["PumpSwap", "Raydium", "Pump.fun"];

function DexCycler() {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % DEX_NAMES.length);
        setFade(true);
      }, 300);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      className="inline-block text-[#ffb800] transition-opacity duration-300"
      style={{ opacity: fade ? 1 : 0 }}
    >
      {DEX_NAMES[index]}
    </span>
  );
}

/* ── DATA ─────────────────────────────────────────────────── */
const FEATURES = [
  {
    title: "Real-Time Charts",
    desc: "Live OHLCV candles streamed via Helius gRPC. Multiple timeframes — 1s, 15s, 30s, 1m. TradingView Lightweight Charts.",
    border: "border-l-[#ffb800]",
  },
  {
    title: "10 Technical Indicators",
    desc: "RSI, EMA Cross, MACD, Bollinger Bands, Supertrend, DMI/ADX, CCI, TRIX, VWAP, Ichimoku Cloud. All computed in Rust for speed.",
    border: "border-l-[#ffb800]",
  },
  {
    title: "Strategy Builder",
    desc: "Custom buy/sell conditions across all indicators. 3 proven presets included. Rolling window confirmation.",
    border: "border-l-[#ffb800]",
  },
  {
    title: "Paper Trading",
    desc: "Risk-free simulated execution with P&L tracking. Configurable slippage. Test before you trade.",
    border: "border-l-emerald-400",
  },
  {
    title: "Live Execution (sub-second)",
    desc: "Real PumpSwap trades via Helius Sender. Safety limits, dry-run mode, and position management.",
    border: "border-l-emerald-400",
  },
  {
    title: "Auto Recovery",
    desc: "Historical backfill and gap-fill via Helius RPC. Graceful reconnects. Never miss a candle.",
    border: "border-l-emerald-400",
  },
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
  "All 10 technical indicators",
  "Strategy builder with presets",
  "Paper trading simulator",
  "Live execution on PumpSwap",
  "Private Telegram group with the founder",
];


const BADGES = [
  "Competing in Colosseum Frontier 2026",
  "Built on Helius gRPC",
  "Bags Hackathon — In Review",
];

/* ── NAV ──────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#1e2d3d] bg-[#0d1117]/90 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <span className="text-[13px] font-bold tracking-wide text-white">
          algo-trader
          <span className="ml-2 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-emerald-400">
            Beta
          </span>
        </span>

        <div className="hidden items-center gap-8 sm:flex">
          {["features", "how-it-works", "pricing"].map((s) => (
            <a
              key={s}
              href={`#${s}`}
              className="text-[11px] uppercase tracking-[0.15em] text-[#4a5e78] transition hover:text-white"
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
    <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,184,0,0.04),transparent_60%)]" />

      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        {/* status */}
        <FadeIn delay={100}>
          <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-[#1e2d3d] bg-white/[0.02] px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-[#4a5e78] sm:mt-6 sm:gap-2 sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.2em]">
            <Dot color="amber" />
            <span>Founding members only</span>
            <span className="text-[#364a5e]">·</span>
            <span>Colosseum Frontier 2026</span>
          </div>
        </FadeIn>

        {/* headline */}
        <FadeIn delay={200}>
          <h1 className="mx-auto mt-6 max-w-3xl text-[clamp(1.75rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-white sm:mt-8">
            Real-time trading terminal
            <br />
            for <DexCycler />.
          </h1>
        </FadeIn>

        {/* subtitle */}
        <FadeIn delay={300}>
          <p className={`mx-auto mt-4 max-w-2xl text-[13px] leading-relaxed text-[#8b9eb5] sm:mt-5 sm:text-sm ${sans}`}>
            The first TradingView-like experience for Solana memecoins.
            Fastest live charts, 10 indicators computed in Rust, strategy builder, paper
            trading, and live execution.
          </p>
        </FadeIn>

        {/* CTAs */}
        <FadeIn delay={400}>
          <div className="mt-6 flex justify-center gap-3 sm:mt-8 sm:gap-4">
            <a
              href="#pricing"
              className="rounded bg-[#ffb800] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0a200] sm:px-7 sm:py-3 sm:text-[12px]"
            >
              Get early access
            </a>
            <a
              href="#features"
              className="rounded border border-[#1e2d3d] px-5 py-2.5 text-[11px] uppercase tracking-[0.15em] text-[#5a7490] transition hover:border-[#3a5068] hover:text-white sm:px-7 sm:py-3 sm:text-[12px]"
            >
              Learn more
            </a>
          </div>
        </FadeIn>

        {/* stats strip */}
        <FadeIn delay={500}>
          <div className="mx-auto mt-10 grid max-w-2xl grid-cols-4 border border-[#1e2d3d] bg-[#141c2b] sm:mt-14">
            {[
              { label: "Indicators", value: "10" },
              { label: "Timeframes", value: "6" },
              { label: "Latency", value: "<1s" },
              { label: "Presets", value: "3" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-2 py-2 text-center sm:px-4 sm:py-2.5 sm:text-left ${i !== 0 ? "border-l border-[#1e2d3d]" : ""}`}
              >
                <div className="text-[8px] uppercase tracking-[0.15em] text-[#4a5e78] sm:text-[9px] sm:tracking-[0.2em]">
                  {s.label}
                </div>
                <div className="mt-0.5 text-[12px] font-semibold text-white sm:text-[13px]">
                  {s.value}
                </div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── DEMO VIDEO PLACEHOLDER ──────────────────────────────── */
function DemoVideo() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <FadeIn>
          <div className="overflow-hidden rounded-lg border border-[#1e2d3d]">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full"
            >
              <source src="https://github.com/TwentyOne37/2137-dev/releases/download/v0.1.0/hero2.mp4" type="video/mp4" />
            </video>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}


/* ── FEATURES ─────────────────────────────────────────────── */
function Features() {
  return (
    <section id="features" className="border-t border-[#1e2d3d] py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
              Features
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Everything you need to trade.
            </h2>
            <p className={`mx-auto mt-3 max-w-lg text-[14px] text-[#6b8299] ${sans}`}>
              Built from the ground up for PumpSwap tokens on Solana. Real-time
              data, powerful indicators, and automated execution.
            </p>
          </div>
        </FadeIn>

        <div className="mt-8 grid gap-3 sm:mt-12 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <FadeIn key={f.title} delay={i * 80}>
              <div className={`rounded-lg border border-[#1e2d3d] border-l-2 ${f.border} bg-[#141c2b] p-4 transition hover:border-[#2a3f55] hover:border-l-2 hover:bg-[#182030] sm:p-6`}>
                <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffb800]">
                  {f.title}
                </div>
                <p className={`mt-3 text-[13px] leading-relaxed text-[#6b8299] ${sans}`}>
                  {f.desc}
                </p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── HOW IT WORKS ─────────────────────────────────────────── */
function HowItWorks() {
  return (
    <section id="how-it-works" className="border-t border-[#1e2d3d] py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
              How it works
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Three steps to your first trade.
            </h2>
          </div>
        </FadeIn>

        <div className="mx-auto mt-8 grid max-w-3xl gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
          {STEPS.map((step, i) => (
            <FadeIn key={step.num} delay={i * 120}>
              <div className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-4 text-center sm:p-6">
                <div className="text-[24px] font-bold text-[#ffb800]/30 sm:text-[28px]">
                  {step.num}
                </div>
                <div className="mt-2 text-[15px] font-semibold text-white">
                  {step.title}
                </div>
                <p className={`mt-2 text-[12px] leading-relaxed text-[#6b8299] ${sans}`}>
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

/* ── SOCIAL PROOF ─────────────────────────────────────────── */
function SocialProof() {
  return (
    <section className="py-8 sm:py-12">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <FadeIn>
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
            {BADGES.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-[#1e2d3d] bg-[#141c2b] px-3 py-1 text-[9px] uppercase tracking-[0.1em] text-[#5a7490] sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.15em]"
              >
                {badge}
              </span>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── PRICING ──────────────────────────────────────────────── */
function Pricing() {
  const [form, setForm] = useState({ email: "", telegram: "", twitter: "" });
  const [payUrl, setPayUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email && !form.telegram && !form.twitter) {
      setError("Please provide at least one contact method");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/pay", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setPayUrl(data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `w-full rounded border border-[#1e2d3d] bg-[#0d1117] px-3 py-2 text-[13px] text-white placeholder-[#364a5e] outline-none transition focus:border-[#ffb800]/50 ${sans}`;

  return (
    <section id="pricing" className="border-t border-[#1e2d3d] py-12 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <FadeIn>
          <div className="text-center">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
              Pricing
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Founding member rate.
            </h2>
            <p className={`mx-auto mt-3 max-w-md text-[14px] text-[#6b8299] ${sans}`}>
              Lock in the lowest price forever. Limited to the first 20 members.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mx-auto mt-8 max-w-md rounded-xl border border-[#ffb800]/20 bg-[#ffb800]/[0.03] p-6 sm:mt-10 sm:p-8 shadow-[0_0_60px_rgba(245,158,11,0.06)]">
            <div className="flex items-baseline justify-between">
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#ffb800]">
                FOUNDING MEMBER
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#4a5e78]">
                First 20 spots
              </span>
            </div>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="text-[42px] font-bold leading-none text-white">$50</span>
              <span className={`text-[16px] text-[#5a7490] ${sans}`}>/mo</span>
            </div>

            {/* spots remaining */}
            <div className="mt-3 flex items-center gap-2">
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#ffb800]" />
              <span className="text-sm text-[#ffb800]">17/20 spots remaining</span>
            </div>

            <ul className={`mt-6 space-y-2.5 ${sans}`}>
              {PRICING_FEATURES.map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2.5 text-[13px] text-[#6b8299]"
                >
                  <span className="text-emerald-400">&#10003;</span>
                  {item}
                </li>
              ))}
            </ul>

            {!payUrl ? (
              <form onSubmit={handleSubmit} className="mt-8 space-y-3">
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#4a5e78]">
                  How should we reach you?
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="Telegram @handle"
                  value={form.telegram}
                  onChange={(e) => setForm({ ...form, telegram: e.target.value })}
                  className={inputClass}
                />
                <input
                  type="text"
                  placeholder="X / Twitter @handle"
                  value={form.twitter}
                  onChange={(e) => setForm({ ...form, twitter: e.target.value })}
                  className={inputClass}
                />
                {error && (
                  <p className={`text-[12px] text-red-400 ${sans}`}>{error}</p>
                )}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded bg-[#ffb800] py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0a200] disabled:opacity-50"
                >
                  {loading ? "Generating..." : "Get Payment Link"}
                </button>
                <p className={`text-center text-[11px] text-[#4a5e78] ${sans}`}>
                  At least one contact method required
                </p>
              </form>
            ) : (
              <div className="mt-8 space-y-4">
                <div className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">
                  Payment link ready
                </div>
                <div className="overflow-hidden rounded border border-[#1e2d3d] bg-[#0d1117] p-3">
                  <p className={`break-all text-[12px] text-[#6b8299] ${sans}`}>
                    {payUrl}
                  </p>
                </div>
                <div className="flex gap-2">
                  <a
                    href={payUrl}
                    className="flex-1 rounded bg-[#ffb800] py-3 text-center text-[12px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0a200]"
                  >
                    Open in Wallet
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(payUrl);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="rounded border border-[#1e2d3d] px-4 py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-[#5a7490] transition hover:border-[#3a5068] hover:text-white"
                  >
                    {copied ? "Copied" : "Copy"}
                  </button>
                </div>
                <p className={`text-center text-[11px] text-[#4a5e78] ${sans}`}>
                  Send exactly $50 USDC. Access is granted after confirmation.
                </p>
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── FOOTER ───────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#1e2d3d] py-6 sm:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <p className={`mb-6 text-center text-sm text-[#5a7490] ${sans}`}>
          Stop trading PumpSwap blind. Get institutional-grade tools.
        </p>

        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-[11px] text-[#364a5e]">Built by</span>
            <a
              href="https://2137.dev"
              className="text-[11px] font-semibold text-[#5a7490] transition hover:text-white"
            >
              2137.dev
            </a>
          </div>
          <div className="flex items-center gap-6 text-[11px] text-[#364a5e]">
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
            <span className="text-[#253545]">Colosseum Frontier 2026</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── ANIMATED DOT GRID BACKGROUND ─────────────────────────── */
const dotGridStyles = `
@keyframes drift {
  0%, 100% { transform: translate(0, 0); }
  25% { transform: translate(40px, 30px); }
  50% { transform: translate(-20px, 60px); }
  75% { transform: translate(-40px, -20px); }
}
@keyframes drift2 {
  0%, 100% { transform: translate(0, 0); }
  33% { transform: translate(-50px, -40px); }
  66% { transform: translate(30px, -50px); }
}
`;

function DotGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: dotGridStyles }} />
      {/* dot pattern */}
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffb800 0.8px, transparent 0.8px)",
          backgroundSize: "32px 32px",
        }}
      />
      {/* animated amber glow that drifts across the dots */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 600px 400px at 30% 20%, rgba(255,184,0,0.06), transparent 70%)",
          animation: "drift 25s ease-in-out infinite",
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 500px 350px at 70% 60%, rgba(255,184,0,0.04), transparent 70%)",
          animation: "drift2 30s ease-in-out infinite",
        }}
      />
    </div>
  );
}

/* ── PAGE ─────────────────────────────────────────────────── */
export default function AlgoLandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0d1117]">
      <DotGrid />
      <div className="relative z-10">
      <Nav />
      <Hero />
      <DemoVideo />
      <Features />
      <HowItWorks />
      <SocialProof />
      <Pricing />
      <Footer />
      </div>
    </main>
  );
}

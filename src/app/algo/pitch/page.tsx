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
const sans = "font-[system-ui,Inter,-apple-system,sans-serif]";

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
@keyframes pulse-amber {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.4; }
}
`;

function DotGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: dotGridStyles }} />
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffb800 0.8px, transparent 0.8px)",
          backgroundSize: "32px 32px",
        }}
      />
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

/* ── SECTION WRAPPER ──────────────────────────────────────── */
function Section({
  children,
  id,
  className = "",
  noBorder = false,
}: {
  children: React.ReactNode;
  id?: string;
  className?: string;
  noBorder?: boolean;
}) {
  return (
    <section
      id={id}
      className={`${noBorder ? "" : "border-t border-[#1e2d3d]"} py-12 sm:py-20 ${className}`}
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
      {children}
    </h2>
  );
}

/* ══════════════════════════════════════════════════════════════
   1. STICKY TOP BAR
   ══════════════════════════════════════════════════════════════ */
function TopBar() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#1e2d3d] bg-[#0d1117]/90 backdrop-blur-md">
      <div className="mx-auto flex h-11 max-w-5xl items-center justify-between px-4 sm:h-12 sm:px-6">
        {/* Left */}
        <div className="flex items-center gap-2">
          <span className="text-[13px] font-bold tracking-wide text-white">
            algo-trader
          </span>
          <span className="rounded bg-[#ffb800]/20 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#ffb800]">
            Pitch
          </span>
        </div>

        {/* Center — hidden on mobile */}
        <div className="hidden items-center gap-1.5 rounded-full border border-[#1e2d3d] bg-white/[0.02] px-3 py-1 text-[10px] uppercase tracking-[0.15em] text-[#4a5e78] md:flex">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#ffb800]"
            style={{ animation: "pulse-amber 2s ease-in-out infinite" }}
          />
          <span>Live</span>
          <span className="text-[#364a5e]">&middot;</span>
          <span>Solana Roast</span>
          <span className="text-[#364a5e]">&middot;</span>
          <span>16.04.2026</span>
          <span className="text-[#364a5e]">&middot;</span>
          <span>18:00 CET</span>
        </div>

        {/* Right */}
        <a
          href="https://algo.2137.dev/terminal"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-[#ffb800] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-black transition hover:bg-[#e0a200] sm:px-4 sm:text-[11px]"
        >
          Open Terminal
        </a>
      </div>
    </nav>
  );
}

/* ══════════════════════════════════════════════════════════════
   2. HERO
   ══════════════════════════════════════════════════════════════ */
function Hero() {
  return (
    <section className="relative overflow-hidden pt-20 pb-12 sm:pt-28 sm:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,184,0,0.04),transparent_60%)]" />
      <div className="relative mx-auto max-w-5xl px-4 text-center sm:px-6">
        <FadeIn delay={100}>
          <h1 className="mx-auto max-w-3xl text-[clamp(2rem,5vw,4.5rem)] font-bold leading-[1.1] tracking-tight text-white">
            The 10x Dexscreener.
            <br />
            <span className={sans}>
              Built for humans{" "}
              <em className="font-normal text-[#8b9eb5]">and</em> AI agents.
            </span>
          </h1>
        </FadeIn>

        <FadeIn delay={200}>
          <p
            className={`mx-auto mt-5 max-w-2xl text-[13px] leading-relaxed text-[#8b9eb5] sm:text-sm ${sans}`}
          >
            Real-time Solana DEX trading terminal. Sub-second charts, 10
            Rust-computed indicators, strategy builder, paper-to-live execution,
            and an x402 API for autonomous agents.
          </p>
        </FadeIn>

        <FadeIn delay={300}>
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 border border-[#1e2d3d] bg-[#141c2b] sm:mt-14 sm:grid-cols-4">
            {[
              { value: "$284B", label: "Solana Q1'26 DEX volume" },
              { value: "$1B+", label: "Cumulative Solana bot revenue" },
              { value: "9.24M", label: "Dexscreener monthly visits" },
              { value: "0", label: "Competitors with agent API" },
            ].map((s, i) => (
              <div
                key={s.label}
                className={`px-3 py-3 text-center sm:px-4 sm:py-4 sm:text-left ${
                  i !== 0 ? "border-l border-[#1e2d3d]" : ""
                } ${i >= 2 ? "border-t border-[#1e2d3d] sm:border-t-0" : ""}`}
              >
                <div className="text-[18px] font-bold text-white sm:text-[22px]">
                  {s.value}
                </div>
                <div
                  className={`mt-0.5 text-[9px] uppercase tracking-[0.1em] text-[#4a5e78] sm:text-[10px] ${sans}`}
                >
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

/* ══════════════════════════════════════════════════════════════
   3. THE COMMUNITY TWEET
   ══════════════════════════════════════════════════════════════ */
function CommunityTweet() {
  return (
    <Section>
      <FadeIn>
        <SectionLabel>Insight</SectionLabel>
        <div className="mt-6 max-w-3xl">
          <p
            className={`text-[clamp(1.1rem,2.5vw,1.5rem)] leading-snug text-white ${sans}`}
          >
            Last Sunday, the community asked for a new Dexscreener.
            <br />
            Adam reminded us: it has to be{" "}
            <strong className="text-[#ffb800]">10x better</strong>.
            <br />
            I&apos;ve been building it for 6 weeks. Let me show you.
          </p>
        </div>
      </FadeIn>

      <FadeIn delay={150}>
        <div className="mt-8 flex flex-col items-center sm:items-start">
          <div className="overflow-hidden rounded-lg border border-[#1e2d3d]" style={{ maxWidth: 560 }}>
            <Image
              src="/pitch/chill-adam.png"
              alt="@adamdelphantom replying to @ChillTRD — 'Looks like a good idea for @colosseum frontier. But remember you need to be 10x better'"
              width={560}
              height={400}
              className="w-full"
            />
          </div>
          <a
            href="https://x.com/adamdelphantom/status/2043440495469216148"
            target="_blank"
            rel="noopener noreferrer"
            className={`mt-2 text-[11px] text-[#4a5e78] transition hover:text-[#6b8299] ${sans}`}
          >
            Source: @adamdelphantom &middot; Apr 12, 2026
          </a>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   4. PROBLEM
   ══════════════════════════════════════════════════════════════ */
function Problem() {
  const cards = [
    {
      title: "Charts",
      tools: "Dexscreener / TradingView",
      pain: "Read-only. No execution.",
    },
    {
      title: "Signals",
      tools: "Telegram groups",
      pain: "Noisy. No backtest.",
    },
    {
      title: "Execution",
      tools: "Photon / BullX / Axiom",
      pain: "1% per trade. No strategy.",
    },
  ];

  return (
    <Section>
      <FadeIn>
        <SectionLabel>Problem</SectionLabel>
        <SectionHeading>Every serious Solana trader uses 3 tools.</SectionHeading>
      </FadeIn>

      <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {cards.map((c, i) => (
          <FadeIn key={c.title} delay={i * 100}>
            <div className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 sm:p-6">
              <div className="text-[13px] font-bold text-white">{c.title}</div>
              <div
                className={`mt-1 text-[11px] text-[#5a7490] ${sans}`}
              >
                {c.tools}
              </div>
              <p
                className={`mt-3 text-[13px] font-medium text-[#ffb800] ${sans}`}
              >
                {c.pain}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={350}>
        <div className="mt-6 rounded-lg border border-[#ffb800]/20 bg-[#ffb800]/[0.04] px-5 py-4">
          <p className={`text-[13px] leading-relaxed text-[#8b9eb5] sm:text-sm ${sans}`}>
            On{" "}
            <strong className="text-white">$100K/month</strong> of volume,
            you&apos;re paying{" "}
            <strong className="text-[#ffb800]">$1,000/mo</strong> to click Buy.
            And none of these tools are usable by AI agents.
          </p>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   5. DEMO
   ══════════════════════════════════════════════════════════════ */
function Demo() {
  return (
    <Section>
      <FadeIn>
        <SectionLabel>Demo</SectionLabel>
        <SectionHeading>The terminal.</SectionHeading>
        <p className={`mt-2 text-[13px] text-[#6b8299] ${sans}`}>
          Live on Solana today.{" "}
          <a
            href="https://algo.2137.dev/terminal"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#ffb800] underline underline-offset-2 transition hover:text-[#e0a200]"
          >
            algo.2137.dev/terminal
          </a>
        </p>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mt-8 overflow-hidden rounded-lg border border-[#1e2d3d]">
          <video autoPlay loop muted playsInline className="w-full">
            <source
              src="https://github.com/TwentyOne37/2137-dev/releases/download/v0.1.0/hero.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   6. THE 10X — 3-CARD GRID
   ══════════════════════════════════════════════════════════════ */
function TenX() {
  const cards = [
    {
      title: "Sub-second.",
      body: "Rust signal engine. Helius gRPC. 10 indicators (RSI, EMA Cross, MACD, Bollinger, Supertrend, DMI/ADX, CCI, TRIX, VWAP, Ichimoku), 6 timeframes (1s \u2192 5m). Dexscreener-class charts that actually move.",
    },
    {
      title: "Strategy-native.",
      body: "Build buy/sell conditions across indicators. 3 proven presets included. Paper trade on live candles. Flip a switch to go live on PumpSwap. No platform switch. No copy-paste.",
    },
    {
      title: "AI-native.",
      body: "First Solana terminal with an x402 pay-per-call API. MCP-compatible. x402 joined the Linux Foundation two weeks ago with Google, AWS, Stripe, Visa. Cloudflare ships 1B+ HTTP 402s/day. We\u2019re already on those rails.",
    },
  ];

  return (
    <Section>
      <FadeIn>
        <SectionLabel>The 10x</SectionLabel>
        <SectionHeading>Three reasons this wins.</SectionHeading>
      </FadeIn>

      <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {cards.map((c, i) => (
          <FadeIn key={c.title} delay={i * 100}>
            <div className="rounded-lg border border-[#1e2d3d] border-t-2 border-t-[#ffb800] bg-[#141c2b] p-5 sm:p-6">
              <div className="text-[15px] font-bold text-white">{c.title}</div>
              <p
                className={`mt-3 text-[12px] leading-relaxed text-[#6b8299] sm:text-[13px] ${sans}`}
              >
                {c.body}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   7. COMPETITOR MATRIX
   ══════════════════════════════════════════════════════════════ */
function CompetitorMatrix() {
  const features = [
    "Sub-second Rust charts",
    "Server-side TA indicators",
    "Strategy builder",
    "Paper trading",
    "x402 / agent API",
    "SaaS pricing",
  ];
  const competitors = [
    "GMGN",
    "Trojan",
    "Dexscreener",
    "Photon",
    "Axiom",
    "BullX",
    "BonkBot",
  ];

  return (
    <Section>
      <FadeIn>
        <SectionLabel>Competitive landscape</SectionLabel>
        <SectionHeading>What the others don&apos;t have.</SectionHeading>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mt-8 overflow-x-auto">
          <table className={`w-full min-w-[640px] text-[11px] sm:text-[12px] ${sans}`}>
            <thead>
              <tr className="border-b border-[#1e2d3d]">
                <th className="py-3 pr-4 text-left font-normal text-[#4a5e78]" />
                <th className="px-2 py-3 text-center font-bold text-[#ffb800] sm:px-3">
                  algo-trader
                </th>
                {competitors.map((c) => (
                  <th
                    key={c}
                    className="px-2 py-3 text-center font-normal text-[#4a5e78] sm:px-3"
                  >
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((f) => (
                <tr key={f} className="border-b border-[#1e2d3d]/50">
                  <td className="py-2.5 pr-4 text-[#8b9eb5]">{f}</td>
                  <td className="px-2 py-2.5 text-center sm:px-3">
                    <span className="rounded border border-[#ffb800]/30 bg-[#ffb800]/10 px-1.5 py-0.5 text-emerald-400">
                      &#10003;
                    </span>
                  </td>
                  {competitors.map((c) => (
                    <td
                      key={c}
                      className="px-2 py-2.5 text-center text-[#364a5e] sm:px-3"
                    >
                      &mdash;
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   8. MARKET
   ══════════════════════════════════════════════════════════════ */
function Market() {
  const stats = [
    {
      value: "$284.5B",
      context: "Solana Q1\u201926 DEX volume (41% of all onchain spot).",
      source: "Crypto Economy / Syndica",
    },
    {
      value: "$1B+",
      context: "Cumulative revenue of Solana trading bots.",
      source: "The Block / Bitget",
    },
    {
      value: "$10M MRR",
      context: "Axiom alone. 72% Solana terminal share.",
      source: "DL News",
    },
    {
      value: "$100M",
      context: "Photon revenue, 2.69M wallets.",
      source: "Bitget research",
    },
    {
      value: "$4.35M/mo",
      context: "BonkBot fees. $14.1B lifetime volume.",
      source: "DefiLlama",
    },
    {
      value: "9.24M",
      context: "Dexscreener monthly visits (Feb \u201926).",
      source: "Similarweb",
    },
    {
      value: "167M",
      context: "Solana token holders. 2.9M daily active wallets.",
      source: "solana.com",
    },
    {
      value: "1B+",
      context:
        "HTTP 402s/day via Cloudflare. x402 joined Linux Foundation Apr 2, 2026.",
      source: "x402.org / PYMNTS",
    },
  ];

  return (
    <Section>
      <FadeIn>
        <SectionLabel>Market</SectionLabel>
        <SectionHeading>
          A $284B quarterly market with no quant layer.
        </SectionHeading>
      </FadeIn>

      <div className="mt-8 grid gap-3 sm:grid-cols-2 sm:gap-4">
        {stats.map((s, i) => (
          <FadeIn key={s.value + i} delay={i * 60}>
            <div className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-4 sm:p-5">
              <div className="text-[22px] font-bold text-white sm:text-[26px]">
                {s.value}
              </div>
              <p
                className={`mt-1 text-[12px] text-[#6b8299] sm:text-[13px] ${sans}`}
              >
                {s.context}
              </p>
              <p className={`mt-2 text-[10px] text-[#364a5e] ${sans}`}>
                Source: {s.source}
              </p>
            </div>
          </FadeIn>
        ))}
      </div>

      <FadeIn delay={500}>
        <p
          className={`mt-8 text-center text-[13px] font-medium text-[#ffb800] sm:text-sm ${sans}`}
        >
          Seven Solana terminals cleared $100M revenue in 2025. None ship
          indicators. None ship strategy. None ship an agent API.
        </p>
      </FadeIn>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   9. BUSINESS MODEL
   ══════════════════════════════════════════════════════════════ */
function BusinessModel() {
  const humanTiers = [
    { tier: "Watch", price: "Free", target: "1 position, charts only \u00B7 Funnel" },
    {
      tier: "Trader",
      price: "$99/mo",
      target: "5 positions, all indicators, paper \u00B7 Core",
    },
    {
      tier: "Pro",
      price: "$249/mo",
      target: "Unlimited, live execution, priority \u00B7 Power users",
    },
    {
      tier: "API",
      price: "$499/mo",
      target: "Signal engine API \u00B7 B2B bot builders",
    },
  ];

  const agentEndpoints = [
    { endpoint: "/candles", price: "$0.001", returns: "OHLCV" },
    { endpoint: "/indicators", price: "$0.005", returns: "Indicator values" },
    {
      endpoint: "/signals",
      price: "$0.01",
      returns: "BUY/SELL + confidence",
    },
    { endpoint: "/analysis", price: "$0.05", returns: "Full analysis" },
  ];

  return (
    <Section>
      <FadeIn>
        <SectionLabel>Business model</SectionLabel>
        <SectionHeading>Two rails, one engine.</SectionHeading>
      </FadeIn>

      <div className="mt-8 grid gap-6 lg:grid-cols-2 lg:gap-8">
        {/* Humans */}
        <FadeIn delay={100}>
          <div className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 sm:p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffb800]">
              Humans (SaaS)
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className={`w-full text-[11px] sm:text-[12px] ${sans}`}>
                <thead>
                  <tr className="border-b border-[#1e2d3d]">
                    <th className="py-2 pr-3 text-left font-normal text-[#4a5e78]">
                      Tier
                    </th>
                    <th className="py-2 pr-3 text-left font-normal text-[#4a5e78]">
                      Price
                    </th>
                    <th className="py-2 text-left font-normal text-[#4a5e78]">
                      Target
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {humanTiers.map((t) => (
                    <tr key={t.tier} className="border-b border-[#1e2d3d]/50">
                      <td className="py-2 pr-3 font-semibold text-white">
                        {t.tier}
                      </td>
                      <td className="py-2 pr-3 text-[#ffb800]">{t.price}</td>
                      <td className="py-2 text-[#6b8299]">{t.target}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p
              className={`mt-4 text-[11px] leading-relaxed text-[#5a7490] sm:text-[12px] ${sans}`}
            >
              At $100K/mo volume, Pro is{" "}
              <span className="text-[#ffb800]">4x cheaper</span> than the 1%
              incumbents. And infinitely more capable.
            </p>
          </div>
        </FadeIn>

        {/* Agents */}
        <FadeIn delay={200}>
          <div className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 sm:p-6">
            <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffb800]">
              Agents (x402 pay-per-call)
            </div>
            <div className="mt-4 overflow-x-auto">
              <table className={`w-full text-[11px] sm:text-[12px] ${sans}`}>
                <thead>
                  <tr className="border-b border-[#1e2d3d]">
                    <th className="py-2 pr-3 text-left font-normal text-[#4a5e78]">
                      Endpoint
                    </th>
                    <th className="py-2 pr-3 text-left font-normal text-[#4a5e78]">
                      Price
                    </th>
                    <th className="py-2 text-left font-normal text-[#4a5e78]">
                      Returns
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {agentEndpoints.map((e) => (
                    <tr
                      key={e.endpoint}
                      className="border-b border-[#1e2d3d]/50"
                    >
                      <td className="py-2 pr-3 font-mono text-white">
                        {e.endpoint}
                      </td>
                      <td className="py-2 pr-3 text-[#ffb800]">{e.price}</td>
                      <td className="py-2 text-[#6b8299]">{e.returns}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p
              className={`mt-4 text-[11px] leading-relaxed text-[#5a7490] sm:text-[12px] ${sans}`}
            >
              USDC on Solana. No API keys. No subscriptions. MCP-compatible.
              First trading infra for the agent economy.
            </p>
          </div>
        </FadeIn>
      </div>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   10. ROADMAP
   ══════════════════════════════════════════════════════════════ */
function Roadmap() {
  const steps = [
    {
      label: "MVP",
      detail: "Live today at algo.2137.dev/terminal",
      status: "shipped" as const,
    },
    {
      label: "Private Beta",
      detail: "Onboarding first 20 founding members",
      status: "soon" as const,
    },
    {
      label: "x402 API",
      detail: "candles \u2192 indicators \u2192 signals \u2192 analysis",
      status: "soon" as const,
    },
    {
      label: "Colosseum Frontier",
      detail: "Submission May 11 \u2014 top-20 = $10K + $250K accelerator",
      status: "upcoming" as const,
    },
    {
      label: "Monke Foundry",
      detail: "Applied in parallel \u2014 Solana-native consumer incubator",
      status: "upcoming" as const,
    },
  ];

  return (
    <Section>
      <FadeIn>
        <SectionLabel>Roadmap</SectionLabel>
        <SectionHeading>Next 26 days.</SectionHeading>
      </FadeIn>

      <FadeIn delay={100}>
        {/* Desktop: horizontal stepper */}
        <div className="mt-10 hidden sm:block">
          <div className="flex items-start justify-between">
            {steps.map((s, i) => (
              <div key={s.label} className="relative flex flex-1 flex-col items-center text-center">
                {/* connector line */}
                {i < steps.length - 1 && (
                  <div className="absolute top-[9px] left-1/2 h-[2px] w-full bg-[#1e2d3d]">
                    {s.status === "shipped" && (
                      <div className="h-full w-full bg-[#ffb800]" />
                    )}
                  </div>
                )}
                {/* dot */}
                <div
                  className={`relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full ${
                    s.status === "shipped"
                      ? "bg-[#ffb800]"
                      : "border-2 border-[#ffb800] bg-[#0d1117]"
                  }`}
                >
                  {s.status === "shipped" && (
                    <span className="text-[10px] text-black">&#10003;</span>
                  )}
                </div>
                <div className="mt-3 text-[12px] font-bold text-white">
                  {s.label}
                </div>
                <div
                  className={`mt-1 max-w-[140px] text-[10px] leading-snug text-[#5a7490] ${sans}`}
                >
                  {s.detail}
                </div>
                {s.status === "shipped" && (
                  <span className="mt-1.5 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-emerald-400">
                    Shipped
                  </span>
                )}
                {s.status === "soon" && (
                  <span className="mt-1.5 text-[8px] uppercase tracking-widest text-[#ffb800]">
                    ~2 weeks
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mobile: vertical stepper */}
        <div className="mt-8 space-y-4 sm:hidden">
          {steps.map((s) => (
            <div key={s.label} className="flex items-start gap-3">
              <div
                className={`mt-0.5 flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full ${
                  s.status === "shipped"
                    ? "bg-[#ffb800]"
                    : "border-2 border-[#ffb800] bg-[#0d1117]"
                }`}
              >
                {s.status === "shipped" && (
                  <span className="text-[8px] text-black">&#10003;</span>
                )}
              </div>
              <div>
                <div className="text-[12px] font-bold text-white">
                  {s.label}
                </div>
                <div className={`text-[11px] text-[#5a7490] ${sans}`}>
                  {s.detail}
                </div>
              </div>
            </div>
          ))}
        </div>

        <p
          className={`mt-6 text-center text-[10px] text-[#364a5e] ${sans}`}
        >
          Colosseum Frontier runs Apr 6 &ndash; May 11, 2026 &middot; $2.75M
          total prize pool.
        </p>
      </FadeIn>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   11. WHY ME / FOUNDER
   ══════════════════════════════════════════════════════════════ */
function Founder() {
  const bullets = [
    "8 years shipping backend + blockchain systems",
    "Built cryptom.app \u2014 Solana dApp, Solana Foundation grant recipient",
    "Built Raster Finance \u2014 mission-critical payments platform",
    "Rust, Anchor, TypeScript, NestJS, gRPC, ClickHouse",
    "6 hackathons. MVP of algo-trader shipped in 6 weeks.",
    "Already in conversation with Superteam Poland.",
  ];

  return (
    <Section>
      <FadeIn>
        <SectionLabel>Founder</SectionLabel>
        <SectionHeading>Builder-founder. Already shipping.</SectionHeading>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
          {/* photo */}
          <div className="flex-shrink-0">
            <Image
              src="/profile.png"
              alt="Krzysztof Ziolkowski"
              width={140}
              height={140}
              className="rounded-xl border border-[#1e2d3d]"
            />
          </div>

          {/* bio */}
          <div>
            <div className="text-[15px] font-bold text-white">
              Krzysztof Ziolkowski
            </div>
            <div className={`mt-0.5 text-[12px] text-[#5a7490] ${sans}`}>
              &#127477;&#127473; &middot; Amsterdam
            </div>

            <ul className={`mt-4 space-y-2 ${sans}`}>
              {bullets.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-[12px] text-[#6b8299] sm:text-[13px]"
                >
                  <span className="mt-0.5 text-[#ffb800]">&bull;</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>

            <p
              className={`mt-6 text-[13px] font-medium leading-relaxed text-[#8b9eb5] sm:text-sm ${sans}`}
            >
              &ldquo;I don&apos;t need to hire engineers. I am the engineer.
              I&apos;ve been shipping Solana since 2021 &mdash; and I ship
              fast.&rdquo;
            </p>
          </div>
        </div>
      </FadeIn>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   12. ASK
   ══════════════════════════════════════════════════════════════ */
function Ask() {
  const ladder = [
    {
      label: "Today",
      detail:
        "Win Solana Roast. Your vote + $700 funds 2 more weeks of runway.",
    },
    {
      label: "+2 weeks",
      detail:
        "Private beta live. x402 API live. First paying founding members.",
    },
    {
      label: "+26 days",
      detail:
        "Colosseum Frontier top 20 submission. $10K + $250K accelerator target.",
    },
    {
      label: "+quarter",
      detail: "Monke Foundry. Scale the agent rail.",
    },
  ];

  return (
    <Section>
      <FadeIn>
        <SectionLabel>Ask</SectionLabel>
        <h2 className="mt-2 text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-white">
          The ladder.
        </h2>
      </FadeIn>

      <FadeIn delay={100}>
        <div className="mt-8 space-y-0">
          {ladder.map((s, i) => (
            <div key={s.label} className="flex gap-4">
              {/* timeline */}
              <div className="flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-[#ffb800]" />
                {i < ladder.length - 1 && (
                  <div className="w-[2px] flex-1 bg-[#1e2d3d]" />
                )}
              </div>
              {/* content */}
              <div className="pb-8">
                <div className="text-[13px] font-bold text-white">
                  {s.label}
                </div>
                <p
                  className={`mt-1 text-[12px] text-[#6b8299] sm:text-[13px] ${sans}`}
                >
                  {s.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeIn>

      {/* CTAs */}
      <FadeIn delay={200}>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href="https://algo.2137.dev/terminal"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-[#ffb800] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0a200]"
          >
            Open Terminal
          </a>
          <a
            href="https://colosseum.com/frontier"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded border border-[#ffb800] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#ffb800] transition hover:bg-[#ffb800]/10"
          >
            Colosseum Frontier
          </a>
          <a
            href="mailto:krzysztof@2137.dev"
            className="rounded border border-[#1e2d3d] px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-[#5a7490] transition hover:border-[#3a5068] hover:text-white"
          >
            Talk to me
          </a>
        </div>
      </FadeIn>

      {/* Closing */}
      <FadeIn delay={300}>
        <p className="mt-12 text-center text-[clamp(1.5rem,4vw,3rem)] font-bold text-[#ffb800]">
          Vote me. Fund me. Roast me.
        </p>
      </FadeIn>
    </Section>
  );
}

/* ══════════════════════════════════════════════════════════════
   13. FOOTER
   ══════════════════════════════════════════════════════════════ */
function PitchFooter() {
  return (
    <footer className="border-t border-[#1e2d3d] py-6 sm:py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className={`text-[11px] text-[#364a5e] ${sans}`}>
            &copy; 2026 algo-trader &middot; Built for Solana Roast &middot;
            16.04.2026
          </div>
          <div className="flex items-center gap-6 text-[11px] text-[#364a5e]">
            <a
              href="https://x.com/TwentyOne_37"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              X
            </a>
            <a
              href="https://github.com/TwentyOne37"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              GitHub
            </a>
            <a
              href="https://2137.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-white"
            >
              2137.dev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════ */
export default function PitchPage() {
  return (
    <main className="relative min-h-screen bg-[#0d1117]">
      <DotGrid />
      <div className="relative z-10">
        <TopBar />
        <Hero />
        <CommunityTweet />
        <Problem />
        <Demo />
        <TenX />
        <CompetitorMatrix />
        <Market />
        <BusinessModel />
        <Roadmap />
        <Founder />
        <Ask />
        <PitchFooter />
      </div>
    </main>
  );
}

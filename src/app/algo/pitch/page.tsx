"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

/* ── helpers ───────────────────────────────────────────────── */
const sans = "font-[system-ui,Inter,-apple-system,sans-serif]";
const TOTAL_SLIDES = 12;

/* ── ANIMATED DOT GRID BACKGROUND ─────────────────────────── */
const globalStyles = `
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
html, body { overflow: hidden; height: 100%; }
`;

function DotGrid() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
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

/* ── SLIDE WRAPPER ────────────────────────────────────────── */
function Slide({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`flex h-screen w-screen flex-shrink-0 snap-start snap-always items-center justify-center overflow-hidden ${className}`}
    >
      <div className="mx-auto w-full max-w-5xl px-6 sm:px-10">
        {children}
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-2 text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
      {children}
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
      {children}
    </h2>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 1 — HERO
   ══════════════════════════════════════════════════════════════ */
function SlideHero() {
  return (
    <Slide>
      <div className="text-center">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-[#1e2d3d] bg-white/[0.02] px-3 py-1 text-[9px] uppercase tracking-[0.15em] text-[#4a5e78] sm:gap-2 sm:px-4 sm:py-1.5 sm:text-[11px] sm:tracking-[0.2em]">
          <span
            className="inline-block h-1.5 w-1.5 rounded-full bg-[#ffb800]"
            style={{ animation: "pulse-amber 2s ease-in-out infinite" }}
          />
          <span>Live</span>
          <span className="text-[#364a5e]">&middot;</span>
          <span>Solana Roast</span>
          <span className="text-[#364a5e]">&middot;</span>
          <span>16.04.2026</span>
        </div>

        <h1 className="mx-auto mt-8 max-w-4xl text-[clamp(2rem,5.5vw,5rem)] font-bold leading-[1.08] tracking-tight text-white">
          The 10x Dexscreener.
          <br />
          <span className={sans}>
            Built for humans{" "}
            <em className="font-normal text-[#8b9eb5]">and</em> AI agents.
          </span>
        </h1>

        <p
          className={`mx-auto mt-6 max-w-2xl text-[14px] leading-relaxed text-[#8b9eb5] sm:text-[16px] ${sans}`}
        >
          Real-time Solana DEX trading terminal. Sub-second charts, 10
          Rust-computed indicators, strategy builder, paper-to-live execution,
          and an x402 API for autonomous agents.
        </p>

        <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 border border-[#1e2d3d] bg-[#141c2b] sm:grid-cols-4">
          {[
            { value: "$284B", label: "Solana Q1'26 DEX volume" },
            { value: "$10M MRR", label: "Axiom alone, 72% share" },
            { value: "9.24M", label: "Dexscreener monthly visits" },
            { value: "0", label: "Competitors with agent API" },
          ].map((s, i) => (
            <div
              key={s.label}
              className={`px-3 py-3 text-center sm:px-4 sm:py-4 ${
                i !== 0 ? "border-l border-[#1e2d3d]" : ""
              } ${i >= 2 ? "border-t border-[#1e2d3d] sm:border-t-0" : ""}`}
            >
              <div className="text-[20px] font-bold text-white sm:text-[24px]">
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
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 2 — THE COMMUNITY TWEET
   ══════════════════════════════════════════════════════════════ */
function SlideTweet() {
  return (
    <Slide>
      <SectionLabel>Insight</SectionLabel>
      <div className="mt-4 flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
        <div className="flex-1">
          <p
            className={`text-[clamp(1.1rem,2.5vw,1.6rem)] leading-snug text-white ${sans}`}
          >
            Last Sunday, the community asked for a new Dexscreener.
            <br />
            Adam reminded us: it has to be{" "}
            <strong className="text-[#ffb800]">10x better</strong>.
            <br />
            I&apos;ve been building it for 6 weeks. Let me show you.
          </p>
        </div>
        <div className="flex flex-col items-center lg:items-start">
          <div
            className="overflow-hidden rounded-lg border border-[#1e2d3d]"
            style={{ maxWidth: 480 }}
          >
            <Image
              src="/pitch/chill-adam.png"
              alt="@adamdelphantom replying to @ChillTRD — 'Looks like a good idea for @colosseum frontier. But remember you need to be 10x better'"
              width={480}
              height={340}
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
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 3 — PROBLEM
   ══════════════════════════════════════════════════════════════ */
function SlideProblem() {
  const cards = [
    { title: "Charts", tools: "Dexscreener / TradingView", pain: "Read-only. No execution." },
    { title: "Signals", tools: "Telegram groups", pain: "Noisy. No backtest." },
    { title: "Execution", tools: "Photon / BullX / Axiom", pain: "1% per trade. No strategy." },
  ];

  return (
    <Slide>
      <SectionLabel>Problem</SectionLabel>
      <SectionHeading>Every serious Solana trader uses 3 tools.</SectionHeading>

      <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {cards.map((c) => (
          <div key={c.title} className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 sm:p-6">
            <div className="text-[14px] font-bold text-white">{c.title}</div>
            <div className={`mt-1 text-[12px] text-[#5a7490] ${sans}`}>{c.tools}</div>
            <p className={`mt-3 text-[13px] font-medium text-[#ffb800] ${sans}`}>{c.pain}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-[#ffb800]/20 bg-[#ffb800]/[0.04] px-5 py-4">
        <p className={`text-[13px] leading-relaxed text-[#8b9eb5] sm:text-sm ${sans}`}>
          On <strong className="text-white">$100K/month</strong> of volume,
          you&apos;re paying <strong className="text-[#ffb800]">$1,000/mo</strong> to
          click Buy. And none of these tools are usable by AI agents.
        </p>
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 4 — DEMO
   ══════════════════════════════════════════════════════════════ */
function SlideDemo() {
  return (
    <Slide>
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
      <div className="mt-6 overflow-hidden rounded-lg border border-[#1e2d3d]">
        <video autoPlay loop muted playsInline className="w-full">
          <source
            src="https://github.com/TwentyOne37/2137-dev/releases/download/v0.1.0/hero.mp4"
            type="video/mp4"
          />
        </video>
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 5 — THE 10X
   ══════════════════════════════════════════════════════════════ */
function SlideTenX() {
  const cards = [
    {
      title: "One loop.",
      body: "Sub-second charts, indicators, strategy, and execution \u2014 in a single loop. Bloomberg, not Dexscreener.",
    },
    {
      title: "AI-native.",
      body: "First Solana terminal with an x402 pay-per-call API. MCP-compatible. x402 joined the Linux Foundation two weeks ago with Google, Stripe, and Visa as founding members. We\u2019re already on those rails.",
    },
    {
      title: "$249/mo unlimited.",
      body: "At $100K/month volume, that\u2019s 4x cheaper than the 1% incumbents. And infinitely more capable.",
    },
  ];

  return (
    <Slide>
      <SectionLabel>The 10x</SectionLabel>
      <SectionHeading>Three reasons this wins.</SectionHeading>

      <div className="mt-8 grid gap-3 sm:grid-cols-3 sm:gap-4">
        {cards.map((c) => (
          <div
            key={c.title}
            className="rounded-lg border border-[#1e2d3d] border-t-2 border-t-[#ffb800] bg-[#141c2b] p-5 sm:p-6"
          >
            <div className="text-[15px] font-bold text-white">{c.title}</div>
            <p className={`mt-3 text-[12px] leading-relaxed text-[#6b8299] sm:text-[13px] ${sans}`}>
              {c.body}
            </p>
          </div>
        ))}
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 6 — COMPETITOR MATRIX
   ══════════════════════════════════════════════════════════════ */
function SlideCompetitors() {
  const features = [
    "Sub-second Rust charts",
    "Server-side TA indicators",
    "Strategy builder",
    "Paper trading",
    "x402 / agent API",
    "SaaS pricing",
  ];
  const competitors = ["GMGN", "Trojan", "Dexscreener", "Photon", "Axiom", "BullX", "BonkBot"];

  return (
    <Slide>
      <SectionLabel>Competitive landscape</SectionLabel>
      <SectionHeading>What the others don&apos;t have.</SectionHeading>

      <div className="mt-6 overflow-x-auto">
        <table className={`w-full min-w-[640px] text-[11px] sm:text-[12px] ${sans}`}>
          <thead>
            <tr className="border-b border-[#1e2d3d]">
              <th className="py-3 pr-4 text-left font-normal text-[#4a5e78]" />
              <th className="px-2 py-3 text-center font-bold text-[#ffb800] sm:px-3">algo-trader</th>
              {competitors.map((c) => (
                <th key={c} className="px-2 py-3 text-center font-normal text-[#4a5e78] sm:px-3">{c}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {features.map((f) => (
              <tr key={f} className="border-b border-[#1e2d3d]/50">
                <td className="py-2.5 pr-4 text-[#8b9eb5]">{f}</td>
                <td className="px-2 py-2.5 text-center sm:px-3">
                  <span className="rounded border border-[#ffb800]/30 bg-[#ffb800]/10 px-1.5 py-0.5 text-emerald-400">&#10003;</span>
                </td>
                {competitors.map((c) => (
                  <td key={c} className="px-2 py-2.5 text-center text-[#364a5e] sm:px-3">&mdash;</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 7 — MARKET (top half)
   ══════════════════════════════════════════════════════════════ */
function SlideMarket() {
  const stats = [
    { value: "$284.5B", context: "Solana Q1\u201926 DEX volume (41% of all onchain spot).", source: "Crypto Economy / Syndica" },
    { value: "$1B+", context: "Cumulative revenue of Solana trading bots.", source: "The Block / Bitget" },
    { value: "$10M MRR", context: "Axiom alone. 72% Solana terminal share.", source: "DL News" },
    { value: "$100M", context: "Photon revenue, 2.69M wallets.", source: "Bitget research" },
    { value: "$4.35M/mo", context: "BonkBot fees. $14.1B lifetime volume.", source: "DefiLlama" },
    { value: "9.24M", context: "Dexscreener monthly visits (Feb \u201926).", source: "Similarweb" },
    { value: "167M", context: "Solana token holders. 2.9M daily active wallets.", source: "solana.com" },
    { value: "1B+", context: "HTTP 402s/day via Cloudflare. x402 joined Linux Foundation Apr 2, 2026.", source: "x402.org / PYMNTS" },
  ];

  return (
    <Slide>
      <SectionLabel>Market</SectionLabel>
      <SectionHeading>A $284B quarterly market with no quant layer.</SectionHeading>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {stats.map((s, i) => (
          <div key={i} className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-3 sm:p-4">
            <div className="text-[18px] font-bold text-white sm:text-[20px]">{s.value}</div>
            <p className={`mt-1 text-[10px] leading-snug text-[#6b8299] sm:text-[11px] ${sans}`}>{s.context}</p>
            <p className={`mt-1.5 text-[9px] text-[#364a5e] ${sans}`}>Source: {s.source}</p>
          </div>
        ))}
      </div>

      <p className={`mt-6 text-center text-[13px] font-medium text-[#ffb800] sm:text-sm ${sans}`}>
        Seven Solana terminals cleared $100M revenue in 2025. None ship indicators. None ship strategy. None ship an agent API.
      </p>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 8 — BUSINESS MODEL (COMBINED)
   ══════════════════════════════════════════════════════════════ */
function SlideBusiness() {
  const tiers = [
    { tier: "Watch", price: "Free", target: "1 position, charts only \u00B7 Funnel" },
    { tier: "Trader", price: "$99/mo", target: "5 positions, all indicators, paper \u00B7 Core" },
    { tier: "Pro", price: "$249/mo", target: "Unlimited, live execution, priority \u00B7 Power users" },
    { tier: "API", price: "$499/mo", target: "Signal engine API \u00B7 B2B bot builders" },
  ];

  const endpoints = [
    { endpoint: "/candles", price: "$0.001", returns: "OHLCV" },
    { endpoint: "/indicators", price: "$0.005", returns: "Indicator values" },
    { endpoint: "/signals", price: "$0.01", returns: "BUY/SELL + confidence" },
    { endpoint: "/analysis", price: "$0.05", returns: "Full analysis" },
  ];

  return (
    <Slide>
      <SectionLabel>Business model</SectionLabel>
      <SectionHeading>Two rails, one engine.</SectionHeading>

      <div className="mt-6 grid gap-3 sm:gap-4 lg:grid-cols-2">
        {/* Humans */}
        <div className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 sm:p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffb800]">
            Humans (SaaS)
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className={`w-full text-[11px] sm:text-[12px] ${sans}`}>
              <thead>
                <tr className="border-b border-[#1e2d3d]">
                  <th className="py-1.5 pr-3 text-left font-normal text-[#4a5e78]">Tier</th>
                  <th className="py-1.5 pr-3 text-left font-normal text-[#4a5e78]">Price</th>
                  <th className="py-1.5 text-left font-normal text-[#4a5e78]">Target</th>
                </tr>
              </thead>
              <tbody>
                {tiers.map((t) => (
                  <tr key={t.tier} className="border-b border-[#1e2d3d]/50">
                    <td className="py-2 pr-3 font-semibold text-white">{t.tier}</td>
                    <td className="py-2 pr-3 text-[#ffb800]">{t.price}</td>
                    <td className="py-2 text-[#6b8299]">{t.target}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 text-[11px] leading-relaxed text-[#5a7490] sm:text-[12px] ${sans}`}>
            At $100K/mo volume, Pro is <span className="text-[#ffb800]">4x cheaper</span> than
            the 1% incumbents. And infinitely more capable.
          </p>
        </div>

        {/* Agents */}
        <div className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 sm:p-6">
          <div className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#ffb800]">
            Agents (x402 pay-per-call)
          </div>
          <div className="mt-3 overflow-x-auto">
            <table className={`w-full text-[11px] sm:text-[12px] ${sans}`}>
              <thead>
                <tr className="border-b border-[#1e2d3d]">
                  <th className="py-1.5 pr-3 text-left font-normal text-[#4a5e78]">Endpoint</th>
                  <th className="py-1.5 pr-3 text-left font-normal text-[#4a5e78]">Price</th>
                  <th className="py-1.5 text-left font-normal text-[#4a5e78]">Returns</th>
                </tr>
              </thead>
              <tbody>
                {endpoints.map((e) => (
                  <tr key={e.endpoint} className="border-b border-[#1e2d3d]/50">
                    <td className="py-2 pr-3 font-mono font-semibold text-white">{e.endpoint}</td>
                    <td className="py-2 pr-3 text-[#ffb800]">{e.price}</td>
                    <td className="py-2 text-[#6b8299]">{e.returns}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-3 text-[11px] leading-relaxed text-[#5a7490] sm:text-[12px] ${sans}`}>
            USDC on Solana. No API keys. No subscriptions. MCP-compatible. First
            trading infra for the agent economy.
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 10 — ROADMAP
   ══════════════════════════════════════════════════════════════ */
function SlideRoadmap() {
  const steps = [
    { label: "MVP", detail: "Live today at algo.2137.dev/terminal", status: "shipped" as const },
    { label: "Private Beta", detail: "Onboarding first 20 founding members", status: "soon" as const },
    { label: "x402 API", detail: "candles \u2192 indicators \u2192 signals \u2192 analysis", status: "soon" as const },
    { label: "Colosseum Frontier", detail: "Submission May 11 \u2014 top-20 = $10K + $250K accelerator", status: "upcoming" as const },
    { label: "Monke Foundry", detail: "Applied in parallel \u2014 Solana-native consumer incubator", status: "upcoming" as const },
  ];

  return (
    <Slide>
      <SectionLabel>Roadmap</SectionLabel>
      <SectionHeading>Next 26 days.</SectionHeading>

      <div className="mt-8 flex items-start justify-between">
        {steps.map((s, i) => (
          <div key={s.label} className="relative flex flex-1 flex-col items-center text-center">
            {i < steps.length - 1 && (
              <div className="absolute top-[9px] left-1/2 h-[2px] w-full bg-[#1e2d3d]">
                {s.status === "shipped" && <div className="h-full w-full bg-[#ffb800]" />}
              </div>
            )}
            <div
              className={`relative z-10 flex h-[18px] w-[18px] items-center justify-center rounded-full ${
                s.status === "shipped" ? "bg-[#ffb800]" : "border-2 border-[#ffb800] bg-[#0d1117]"
              }`}
            >
              {s.status === "shipped" && <span className="text-[10px] text-black">&#10003;</span>}
            </div>
            <div className="mt-3 text-[12px] font-bold text-white sm:text-[13px]">{s.label}</div>
            <div className={`mt-1 max-w-[140px] text-[10px] leading-snug text-[#5a7490] sm:text-[11px] ${sans}`}>
              {s.detail}
            </div>
            {s.status === "shipped" && (
              <span className="mt-1.5 rounded bg-emerald-500/20 px-1.5 py-0.5 text-[8px] font-bold uppercase tracking-widest text-emerald-400">
                Shipped
              </span>
            )}
            {s.status === "soon" && (
              <span className="mt-1.5 text-[8px] uppercase tracking-widest text-[#ffb800]">~2 weeks</span>
            )}
          </div>
        ))}
      </div>

      <p className={`mt-8 text-center text-[10px] text-[#364a5e] ${sans}`}>
        Colosseum Frontier runs Apr 6 &ndash; May 11, 2026 &middot; $2.75M total prize pool.
      </p>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 11 — FOUNDER
   ══════════════════════════════════════════════════════════════ */
function SlideFounder() {
  const bullets = [
    "8 years shipping backend + blockchain systems",
    "Built cryptom.app \u2014 Solana dApp, Solana Foundation grant recipient",
    "Built Raster Finance \u2014 mission-critical payments platform",
    "Rust, Anchor, TypeScript, NestJS, gRPC, ClickHouse",
    "6 hackathons. MVP of algo-trader shipped in 6 weeks.",
    "Already in conversation with Superteam Poland.",
  ];

  return (
    <Slide>
      <SectionLabel>Founder</SectionLabel>
      <SectionHeading>Builder-founder. Already shipping.</SectionHeading>

      <div className="mt-8 flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-10">
        <div className="flex-shrink-0">
          <Image
            src="/profile.png"
            alt="Krzysztof Ziolkowski"
            width={140}
            height={140}
            className="rounded-xl border border-[#1e2d3d]"
          />
        </div>
        <div>
          <div className="text-[16px] font-bold text-white">Krzysztof Ziolkowski</div>
          <div className={`mt-0.5 text-[13px] text-[#5a7490] ${sans}`}>
            &#127477;&#127473;
          </div>
          <ul className={`mt-4 space-y-2 ${sans}`}>
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-2 text-[13px] text-[#6b8299]">
                <span className="mt-0.5 text-[#ffb800]">&bull;</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
          <p className={`mt-6 text-[14px] font-medium leading-relaxed text-[#8b9eb5] ${sans}`}>
            &ldquo;I don&apos;t need to hire engineers. I am the engineer. I&apos;ve been
            shipping Solana since 2021 &mdash; and I ship fast.&rdquo;
          </p>
        </div>
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 12 — ASK
   ══════════════════════════════════════════════════════════════ */
function SlideAsk() {
  const ladder = [
    { label: "Today", detail: "Win Solana Roast. Your vote + $700 funds 2 more weeks of runway." },
    { label: "+2 weeks", detail: "Private beta live. x402 API live. First paying founding members." },
    { label: "+26 days", detail: "Colosseum Frontier top 20 submission. $10K + $250K accelerator target." },
    { label: "+quarter", detail: "Monke Foundry. Scale the agent rail." },
  ];

  return (
    <Slide>
      <SectionLabel>Ask</SectionLabel>
      <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold text-white">The ladder.</h2>

      <div className="mt-8 space-y-0">
        {ladder.map((s, i) => (
          <div key={s.label} className="flex gap-4">
            <div className="flex flex-col items-center">
              <div className="h-3 w-3 rounded-full bg-[#ffb800]" />
              {i < ladder.length - 1 && <div className="w-[2px] flex-1 bg-[#1e2d3d]" />}
            </div>
            <div className="pb-6">
              <div className="text-[14px] font-bold text-white">{s.label}</div>
              <p className={`mt-1 text-[13px] text-[#6b8299] ${sans}`}>{s.detail}</p>
            </div>
          </div>
        ))}
      </div>

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
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   SLIDE 13 — CLOSING + FOOTER
   ══════════════════════════════════════════════════════════════ */
function SlideClosing() {
  return (
    <Slide>
      <div className="flex flex-col items-center justify-center text-center">
        <p className="text-[clamp(2rem,5vw,4rem)] font-bold leading-tight text-[#ffb800]">
          Vote me.<br />Fund me.<br />Roast me.
        </p>
        <div className="mt-10 flex items-center gap-3">
          <a
            href="https://algo.2137.dev/terminal"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded bg-[#ffb800] px-6 py-3 text-[12px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0a200]"
          >
            Open Terminal
          </a>
        </div>
        <div className={`mt-12 text-[11px] text-[#364a5e] ${sans}`}>
          &copy; 2026 algo-trader &middot; Built for Solana Roast &middot; 16.04.2026
        </div>
        <div className="mt-3 flex items-center gap-6 text-[11px] text-[#364a5e]">
          <a href="https://x.com/TwentyOne_37" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">X</a>
          <a href="https://github.com/TwentyOne37" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">GitHub</a>
          <a href="https://2137.dev" target="_blank" rel="noopener noreferrer" className="transition hover:text-white">2137.dev</a>
        </div>
      </div>
    </Slide>
  );
}

/* ══════════════════════════════════════════════════════════════
   NAV CONTROLS
   ══════════════════════════════════════════════════════════════ */
function SlideNav({
  current,
  onPrev,
  onNext,
}: {
  current: number;
  onPrev: () => void;
  onNext: () => void;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-3 rounded-full border border-[#1e2d3d] bg-[#0d1117]/90 px-4 py-2 backdrop-blur-md">
      {/* Prev */}
      <button
        onClick={onPrev}
        disabled={current === 0}
        className="flex h-7 w-7 items-center justify-center rounded-full text-[#5a7490] transition hover:bg-white/5 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#5a7490]"
        aria-label="Previous slide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Dots */}
      <div className="flex items-center gap-1.5">
        {Array.from({ length: TOTAL_SLIDES }).map((_, i) => (
          <div
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === current ? "w-4 bg-[#ffb800]" : "w-1.5 bg-[#253545]"
            }`}
          />
        ))}
      </div>

      {/* Counter */}
      <span className={`min-w-[36px] text-center text-[10px] tabular-nums text-[#4a5e78] ${sans}`}>
        {current + 1}/{TOTAL_SLIDES}
      </span>

      {/* Next */}
      <button
        onClick={onNext}
        disabled={current === TOTAL_SLIDES - 1}
        className="flex h-7 w-7 items-center justify-center rounded-full text-[#5a7490] transition hover:bg-white/5 hover:text-white disabled:opacity-20 disabled:hover:bg-transparent disabled:hover:text-[#5a7490]"
        aria-label="Next slide"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   PAGE
   ══════════════════════════════════════════════════════════════ */
export default function PitchPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState(0);

  const goTo = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(TOTAL_SLIDES - 1, index));
    setCurrent(clamped);
    containerRef.current?.children[clamped]?.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* keyboard nav */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowRight" || e.key === "ArrowDown" || e.key === " ") {
        e.preventDefault();
        goTo(current + 1);
      } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
        e.preventDefault();
        goTo(current - 1);
      } else if (e.key === "Home") {
        e.preventDefault();
        goTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        goTo(TOTAL_SLIDES - 1);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [current, goTo]);

  /* track current slide from scroll snap */
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Array.from(container.children).indexOf(entry.target as Element);
            if (index >= 0) setCurrent(index);
          }
        }
      },
      { root: container, threshold: 0.6 }
    );

    Array.from(container.children).forEach((child) => observer.observe(child));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="relative h-screen w-screen overflow-hidden bg-[#0d1117]">
      <DotGrid />
      <div
        ref={containerRef}
        className="relative z-10 h-screen w-screen snap-y snap-mandatory overflow-y-auto scroll-smooth"
        style={{ scrollbarWidth: "none" }}
      >
        <SlideHero />
        <SlideTweet />
        <SlideMarket />
        <SlideProblem />
        <SlideDemo />
        <SlideTenX />
        <SlideCompetitors />
        <SlideBusiness />
        <SlideRoadmap />
        <SlideFounder />
        <SlideAsk />
        <SlideClosing />
      </div>
      <SlideNav current={current} onPrev={() => goTo(current - 1)} onNext={() => goTo(current + 1)} />
    </main>
  );
}

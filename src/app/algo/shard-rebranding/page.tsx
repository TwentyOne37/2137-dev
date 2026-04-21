import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Shard · Rebrand Proposal",
  description:
    "Shard — real-time Solana trading terminal for humans and autonomous agents. Rebrand proposal companion to the Solana Foundation grant via Superteam Poland. Shipping for Colosseum Frontier, May 11, 2026.",
  openGraph: {
    title: "Shard · Rebrand Proposal",
    description:
      "Trade the breaks before they show. Vision, milestones, and what the grant unlocks — all delivered by May 11.",
    type: "website",
    siteName: "Shard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Shard · Rebrand Proposal",
    description:
      "Trade the breaks before they show. Real-time Solana trading terminal for humans and autonomous agents.",
    creator: "@TwentyOne_37",
  },
};

/* ── type system ─────────────────────────────────────────────── */
const display = "font-[Inter,system-ui,-apple-system,sans-serif]";
const body = "font-[Inter,system-ui,-apple-system,sans-serif]";
const mono = "font-['JetBrains_Mono',ui-monospace,monospace]";

/* ── ShardMark — typographic wordmark with a crystalline glyph ─ */
function ShardMark({
  size = "md",
}: {
  size?: "sm" | "md" | "lg" | "xl";
}) {
  const classes = {
    sm: "text-[18px]",
    md: "text-[28px]",
    lg: "text-[clamp(3rem,10vw,7rem)]",
    xl: "text-[clamp(4.5rem,16vw,12rem)]",
  }[size];

  return (
    <span
      className={`${display} ${classes} inline-flex items-center gap-[0.18em] font-[800] leading-[0.9] tracking-[-0.045em] text-white`}
      style={{ fontFeatureSettings: `"ss01", "cv11"` }}
    >
      <svg
        viewBox="0 0 24 40"
        aria-hidden
        className="h-[0.85em] w-auto flex-shrink-0"
      >
        <defs>
          <linearGradient id="shard-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="shard-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#d4d4d8" stopOpacity="0.6" />
          </linearGradient>
        </defs>
        <polygon points="12,0 24,18 18,40 6,40 0,18" fill="url(#shard-face)" />
        <polygon
          points="12,0 24,18 12,20"
          fill="url(#shard-grad)"
          opacity="0.95"
        />
        <polygon points="12,0 0,18 12,20" fill="#ffffff" opacity="0.3" />
      </svg>
      <span>SHARD</span>
    </span>
  );
}

/* ── Dot — status indicator ──────────────────────────────────── */
function Dot({ color = "cyan" }: { color?: "cyan" | "amber" | "green" }) {
  const c = {
    cyan: "bg-cyan-300 shadow-[0_0_8px_rgba(103,232,249,0.6)]",
    amber: "bg-amber-300",
    green: "bg-emerald-300",
  }[color];
  return <span className={`inline-block h-1.5 w-1.5 rounded-full ${c}`} />;
}

/* ── data ────────────────────────────────────────────────────── */
const WHY = [
  {
    code: "01",
    title: "Builder phase is over",
    body: "algo.2137.dev was a dev handle. The product is live, users are trading, the grant is the clean break to a name that carries.",
  },
  {
    code: "02",
    title: "One brand for humans and agents",
    body: "The terminal and the x402 agent API run on the same Rust engine. They need one name. Shard covers both without leaning to either side.",
  },
  {
    code: "03",
    title: "Colosseum needs a product, not a subdomain",
    body: "Submitting to the AI + Crypto track as a subdomain loses points before judging begins. Shipping as Shard on shard.trade signals finished work.",
  },
];

const MILESTONES = [
  {
    code: "M1",
    title: "Rebrand",
    date: "April 30",
    items: [
      "shard.trade live, site migrated from algo.2137.dev",
      "Brand identity shipped — wordmark, palette, typography",
      "@shardtrade secured on X, TG, and GitHub org",
      "Landing page and pitch deck updated",
    ],
  },
  {
    code: "M2",
    title: "Multi-user beta",
    date: "May 4",
    items: [
      "Auth and per-user isolated state",
      "Onboarding: signup to first paper trade in under two minutes",
      "≥10 real users trading on Shard",
      "Live on mainnet with analytics",
    ],
  },
  {
    code: "M3",
    title: "x402 agent API v1 + open-source SDK",
    date: "May 11",
    items: [
      "One production endpoint (live market data), metered via x402",
      "TypeScript SDK published open-source (MIT)",
      "Public example-bot repo demonstrating SDK usage",
      "Submitted to Colosseum Frontier (AI + Crypto track)",
    ],
  },
];

const BUDGET = [
  {
    n: "01",
    label: "Domain + handles",
    note: "shard.trade acquisition and @shardtrade across X, Telegram, GitHub",
  },
  {
    n: "02",
    label: "Buildstation Warsaw",
    note: "IRL hackathon space hosted by Superteam — co-located push to submission",
  },
  {
    n: "03",
    label: "Infra scale for beta",
    note: "Helius gRPC credits, database, auth — support the first cohort of live users",
  },
  {
    n: "04",
    label: "x402 integration + SDK",
    note: "Dedicated week of development on the mainnet endpoint, SDK, and example bot",
  },
  {
    n: "05",
    label: "Colosseum submission polish",
    note: "Demo video, pitch deck final pass, public repository documentation",
  },
];

const SWATCHES = [
  { name: "Obsidian", hex: "#0A0A0A", note: "Canvas" },
  { name: "Graphite", hex: "#141414", note: "Surface" },
  { name: "Steel", hex: "#1F1F1F", note: "Divider" },
  { name: "Bone", hex: "#FAFAFA", note: "Primary" },
  { name: "Mist", hex: "#737373", note: "Secondary" },
  { name: "Ice", hex: "#67E8F9", note: "Accent" },
];

const PROOF = [
  {
    tag: "Live product",
    label: "algo.2137.dev",
    href: "https://algo.2137.dev",
    note: "Real-time Solana DEX terminal. 10 indicators in Rust, 6 timeframes, Helius gRPC, paper-to-live.",
  },
  {
    tag: "Pitch deck",
    label: "algo.2137.dev/pitch",
    href: "https://algo.2137.dev/pitch",
    note: "Same deck used at the Superteam Poland pitch contest.",
  },
  {
    tag: "GitHub",
    label: "github.com/TwentyOne37",
    href: "https://github.com/TwentyOne37",
    note: "7 years of shipping — backend, Solana, Rust, real-time systems.",
  },
  {
    tag: "Updates",
    label: "x.com/TwentyOne_37",
    href: "https://x.com/TwentyOne_37",
    note: "Weekly build cadence — grant-required updates land here and on Superteam Discord.",
  },
];

/* ── page ────────────────────────────────────────────────────── */
export default function ShardRebrandingPage() {
  return (
    <main className={`relative min-h-screen bg-[#0a0a0a] text-[#fafafa] ${body}`}>
      {/* ambient field */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "radial-gradient(circle, #ffffff 0.6px, transparent 0.6px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute -top-[40%] left-1/2 h-[900px] w-[1100px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(103,232,249,0.07), transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-[-30%] right-[-10%] h-[700px] w-[900px]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(255,255,255,0.03), transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ── NAV ─────────────────────────────────────────── */}
        <nav className="border-b border-[#1a1a1a]">
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-8">
            <ShardMark size="sm" />
            <div className="flex items-center gap-6">
              <span
                className={`hidden text-[10px] uppercase tracking-[0.28em] text-[#525252] sm:inline ${mono}`}
              >
                Rebrand Proposal
              </span>
              <Link
                href="https://algo.2137.dev"
                className={`text-[10px] uppercase tracking-[0.28em] text-[#737373] transition hover:text-white ${mono}`}
              >
                Current →
              </Link>
            </div>
          </div>
        </nav>

        {/* ── HERO ────────────────────────────────────────── */}
        <section className="relative pt-20 sm:pt-28">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            {/* meta row */}
            <div
              className={`flex items-center gap-3 text-[10px] uppercase tracking-[0.32em] text-[#737373] ${mono}`}
            >
              <Dot color="cyan" />
              <span>Superteam Poland</span>
              <span className="text-[#2a2a2a]">·</span>
              <span>Solana Foundation</span>
              <span className="text-[#2a2a2a]">·</span>
              <span className="text-[#a3a3a3]">Grant Proposal</span>
            </div>

            {/* wordmark — the moment */}
            <div className="mt-10 sm:mt-14">
              <ShardMark size="xl" />
            </div>

            {/* tagline */}
            <p
              className={`mt-6 max-w-2xl text-[clamp(1.1rem,2vw,1.45rem)] font-[300] leading-[1.35] tracking-[-0.01em] text-[#d4d4d8] ${display}`}
            >
              Trade the breaks <span className="text-cyan-300">before they show.</span>
            </p>

            {/* premise */}
            <p
              className={`mt-10 max-w-2xl text-[15px] leading-[1.7] text-[#a3a3a3] sm:text-[16px]`}
            >
              Shard is the real-time Solana trading terminal for humans
              <span className="text-white"> and</span> autonomous agents. Same
              Rust engine, same sub-second data — one brand, two surfaces. The
              terminal is live at{" "}
              <Link
                href="https://algo.2137.dev"
                className="text-white underline decoration-[#404040] underline-offset-4 transition hover:decoration-cyan-300"
              >
                algo.2137.dev
              </Link>
              . This page is the companion to the Solana Foundation grant
              submitted via Superteam Poland: vision, milestones, and what the
              grant unlocks before May 11.
            </p>

            {/* state strip */}
            <div className="mt-14 grid grid-cols-2 divide-x divide-y divide-[#1a1a1a] border border-[#1a1a1a] bg-[#0d0d0d]/70 sm:mt-20 sm:grid-cols-4 sm:divide-y-0">
              {[
                { label: "Status", value: "Live" },
                { label: "Engine", value: "Rust / gRPC" },
                { label: "Track", value: "AI + Crypto" },
                { label: "Deadline", value: "May 11, 2026" },
              ].map((s) => (
                <div key={s.label} className="px-5 py-5 sm:px-6 sm:py-6">
                  <div
                    className={`text-[9px] uppercase tracking-[0.3em] text-[#525252] ${mono}`}
                  >
                    {s.label}
                  </div>
                  <div className="mt-2 text-[15px] font-[500] text-white">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ─────────────────────────────────────────── */}
        <section className="mt-24 sm:mt-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div
              className={`text-[10px] uppercase tracking-[0.32em] text-[#525252] ${mono}`}
            >
              Why rebrand · why now
            </div>
            <h2
              className={`mt-5 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-[700] leading-[1.05] tracking-[-0.03em] text-white ${display}`}
            >
              Three reasons it ships as Shard.
            </h2>

            <div className="mt-12 border-t border-[#1a1a1a]">
              {WHY.map((w) => (
                <div
                  key={w.code}
                  className="grid grid-cols-[auto_1fr] gap-6 border-b border-[#1a1a1a] py-8 sm:grid-cols-[120px_1fr_2fr] sm:gap-10 sm:py-10"
                >
                  <div
                    className={`text-[11px] font-[500] uppercase tracking-[0.32em] text-cyan-300 ${mono}`}
                  >
                    {w.code}
                  </div>
                  <div
                    className={`col-span-1 text-[17px] font-[600] leading-[1.3] tracking-[-0.01em] text-white sm:text-[20px] ${display}`}
                  >
                    {w.title}
                  </div>
                  <p className="col-span-2 max-w-2xl text-[14px] leading-[1.7] text-[#a3a3a3] sm:col-span-1 sm:text-[15px]">
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IDENTITY ────────────────────────────────────── */}
        <section className="mt-24 sm:mt-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div
              className={`text-[10px] uppercase tracking-[0.32em] text-[#525252] ${mono}`}
            >
              Identity
            </div>
            <h2
              className={`mt-5 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-[700] leading-[1.05] tracking-[-0.03em] text-white ${display}`}
            >
              One syllable. Hard consonants. <span className="text-[#525252]">Cold and precise.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-[#a3a3a3]">
              A shard is a fragment broken from something larger — exactly what
              traders hunt on charts, and what Solana is engineered on. Devs
              hear scaling. Traders hear the edge. Both read the same mark.
            </p>

            {/* the mark */}
            <div className="mt-16 rounded-sm border border-[#1a1a1a] bg-[#0d0d0d] px-6 py-16 sm:py-24">
              <div className="flex items-center justify-center">
                <ShardMark size="lg" />
              </div>
              <div
                className={`mt-10 text-center text-[12px] uppercase tracking-[0.4em] text-[#525252] ${mono}`}
              >
                shard.trade &nbsp;·&nbsp; @shardtrade &nbsp;·&nbsp; trade the breaks before they show
              </div>
            </div>

            {/* swatches */}
            <div className="mt-10 grid grid-cols-3 gap-[1px] border border-[#1a1a1a] bg-[#1a1a1a] sm:grid-cols-6">
              {SWATCHES.map((s) => (
                <div key={s.name} className="bg-[#0a0a0a] p-5">
                  <div
                    className="h-16 w-full rounded-[2px] border border-[#2a2a2a]"
                    style={{ background: s.hex }}
                  />
                  <div
                    className={`mt-4 text-[10px] uppercase tracking-[0.25em] text-[#525252] ${mono}`}
                  >
                    {s.note}
                  </div>
                  <div className="mt-1 text-[13px] font-[600] text-white">
                    {s.name}
                  </div>
                  <div className={`mt-0.5 text-[11px] text-[#737373] ${mono}`}>
                    {s.hex}
                  </div>
                </div>
              ))}
            </div>

            <p
              className={`mt-6 text-[11px] leading-[1.7] text-[#525252] ${mono}`}
            >
              Final wordmark construction and full system documentation ship in M1.
            </p>
          </div>
        </section>

        {/* ── MILESTONES ──────────────────────────────────── */}
        <section className="mt-24 sm:mt-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div
              className={`text-[10px] uppercase tracking-[0.32em] text-[#525252] ${mono}`}
            >
              Milestones · all delivered by May 11
            </div>
            <h2
              className={`mt-5 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-[700] leading-[1.05] tracking-[-0.03em] text-white ${display}`}
            >
              Three milestones. One deadline. <span className="text-[#525252]">Colosseum Frontier.</span>
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-[#a3a3a3]">
              The grant duration aligns exactly with the Colosseum Frontier
              submission window. Every milestone ships before the hackathon
              deadline — the grant funds delivered work, not roadmap promises.
            </p>

            <div className="mt-14 space-y-[1px] bg-[#1a1a1a]">
              {MILESTONES.map((m) => (
                <div key={m.code} className="bg-[#0d0d0d] px-6 py-8 sm:px-10 sm:py-12">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div className="flex items-baseline gap-5">
                      <span
                        className={`text-[11px] font-[500] uppercase tracking-[0.32em] text-cyan-300 ${mono}`}
                      >
                        {m.code}
                      </span>
                      <span
                        className={`text-[18px] font-[600] leading-[1.2] tracking-[-0.01em] text-white sm:text-[22px] ${display}`}
                      >
                        {m.title}
                      </span>
                    </div>
                    <span
                      className={`text-[11px] uppercase tracking-[0.3em] text-[#a3a3a3] ${mono}`}
                    >
                      {m.date}
                    </span>
                  </div>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2 sm:gap-3">
                    {m.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-3 text-[13px] leading-[1.6] text-[#a3a3a3] sm:text-[14px]"
                      >
                        <span className="text-cyan-300">—</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* KPI */}
            <div className="mt-14 grid gap-[1px] border border-[#1a1a1a] bg-[#1a1a1a] sm:grid-cols-[1fr_2fr]">
              <div className="bg-[#0d0d0d] p-8 sm:p-10">
                <div
                  className={`text-[10px] uppercase tracking-[0.32em] text-cyan-300 ${mono}`}
                >
                  Primary KPI
                </div>
                <div
                  className={`mt-6 text-[clamp(2.5rem,6vw,4rem)] font-[800] leading-[0.95] tracking-[-0.04em] text-white ${display}`}
                >
                  ≥3 agents
                  <br />
                  <span className="text-cyan-300">≥100 calls</span>
                </div>
                <div
                  className={`mt-4 text-[11px] uppercase tracking-[0.25em] text-[#737373] ${mono}`}
                >
                  within 7 days of API launch
                </div>
              </div>
              <div className="bg-[#0d0d0d] p-8 sm:p-10">
                <div
                  className={`text-[10px] uppercase tracking-[0.32em] text-[#525252] ${mono}`}
                >
                  Why this metric
                </div>
                <p className="mt-6 text-[14px] leading-[1.7] text-[#a3a3a3] sm:text-[15px]">
                  Autonomous agents executing x402-paid API calls against
                  Shard&rsquo;s live mainnet endpoint. It&rsquo;s the exact thesis of
                  the grant — x402, autonomous agents, Solana — and it&rsquo;s
                  on-chain verifiable. Users can be faked. Paid calls from
                  independent agents cannot.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── BUDGET ──────────────────────────────────────── */}
        <section className="mt-24 sm:mt-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div
              className={`text-[10px] uppercase tracking-[0.32em] text-[#525252] ${mono}`}
            >
              What $10,000 unlocks
            </div>
            <h2
              className={`mt-5 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-[700] leading-[1.05] tracking-[-0.03em] text-white ${display}`}
            >
              Where the grant goes.
            </h2>
            <p className="mt-5 max-w-2xl text-[15px] leading-[1.7] text-[#a3a3a3]">
              25% upfront unblocks the domain and Buildstation travel in the
              first week. Milestone payouts cover infra, x402 integration, and
              submission polish. Solo operator, zero headcount burn.
            </p>

            <div className="mt-14 border-t border-[#1a1a1a]">
              {BUDGET.map((b) => (
                <div
                  key={b.n}
                  className="grid grid-cols-[40px_1fr] items-baseline gap-4 border-b border-[#1a1a1a] py-6 sm:grid-cols-[60px_280px_1fr] sm:gap-10 sm:py-8"
                >
                  <div
                    className={`text-[10px] uppercase tracking-[0.3em] text-[#525252] ${mono}`}
                  >
                    {b.n}
                  </div>
                  <div
                    className={`col-span-1 text-[15px] font-[600] text-white sm:text-[16px] ${display}`}
                  >
                    {b.label}
                  </div>
                  <div className="col-span-2 text-[13px] leading-[1.7] text-[#a3a3a3] sm:col-span-1 sm:text-[14px]">
                    {b.note}
                  </div>
                </div>
              ))}
            </div>

            <p
              className={`mt-8 max-w-2xl text-[12px] leading-[1.7] text-[#737373] ${mono}`}
            >
              Open-source scope: the x402 SDK, example-bot repo, and integration
              primitives ship under MIT on Solana mainnet. The terminal product,
              signal logic, and execution routing remain proprietary.
            </p>
          </div>
        </section>

        {/* ── PROOF ───────────────────────────────────────── */}
        <section className="mt-24 sm:mt-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <div
              className={`text-[10px] uppercase tracking-[0.32em] text-[#525252] ${mono}`}
            >
              Proof of work
            </div>
            <h2
              className={`mt-5 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-[700] leading-[1.05] tracking-[-0.03em] text-white ${display}`}
            >
              Built by a shipper, <span className="text-[#525252]">not a planner.</span>
            </h2>

            <div className="mt-12 grid gap-[1px] bg-[#1a1a1a] sm:grid-cols-2">
              {PROOF.map((p) => (
                <Link
                  key={p.tag}
                  href={p.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative block bg-[#0d0d0d] p-8 transition hover:bg-[#111]"
                >
                  <div
                    className={`text-[10px] uppercase tracking-[0.32em] text-cyan-300 ${mono}`}
                  >
                    {p.tag}
                  </div>
                  <div
                    className={`mt-4 flex items-center gap-2 text-[18px] font-[600] tracking-[-0.01em] text-white ${display}`}
                  >
                    {p.label}
                    <span className="text-[#525252] transition group-hover:translate-x-1 group-hover:text-cyan-300">
                      →
                    </span>
                  </div>
                  <p className="mt-3 text-[13px] leading-[1.7] text-[#a3a3a3]">
                    {p.note}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────── */}
        <section className="mt-24 sm:mt-40">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <h2
              className={`text-[clamp(2rem,5vw,3.5rem)] font-[800] leading-[1] tracking-[-0.035em] text-white ${display}`}
            >
              Ready when you are.
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.7] text-[#a3a3a3]">
              Application submitted on Superteam Earn. Happy to jump on a call
              if anything needs polishing before review — or to walk through
              the product live.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-3">
              <Link
                href="https://algo.2137.dev"
                className={`rounded-sm bg-white px-7 py-3 text-[11px] font-[700] uppercase tracking-[0.22em] text-black transition hover:bg-cyan-300 ${mono}`}
              >
                Open the product
              </Link>
              <Link
                href="https://algo.2137.dev/pitch"
                className={`rounded-sm border border-[#2a2a2a] px-7 py-3 text-[11px] font-[500] uppercase tracking-[0.22em] text-[#a3a3a3] transition hover:border-white hover:text-white ${mono}`}
              >
                Pitch deck
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer className="mt-24 border-t border-[#1a1a1a] py-10 sm:mt-40">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p
              className={`mb-8 text-center text-[14px] leading-[1.6] text-[#737373]`}
            >
              Trading intelligence for humans. Signal infrastructure for AI
              agents.
            </p>
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div
                className={`flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-[#525252] ${mono}`}
              >
                <span>Built by</span>
                <Link
                  href="https://2137.dev"
                  className="font-[500] text-[#a3a3a3] transition hover:text-white"
                >
                  2137.dev
                </Link>
              </div>
              <div
                className={`flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] text-[#525252] ${mono}`}
              >
                <Link
                  href="https://x.com/TwentyOne_37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  X
                </Link>
                <Link
                  href="https://github.com/TwentyOne37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  GitHub
                </Link>
                <span className="text-[#2a2a2a]">Colosseum Frontier · 2026</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

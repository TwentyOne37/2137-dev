import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "algo-trader → Shard · Rebrand Proposal",
  description:
    "Rebrand proposal accompanying the Solana Foundation grant application via Superteam Poland. Real-time Solana trading terminal for humans and autonomous agents, powered by x402.",
  openGraph: {
    title: "algo-trader → Shard · Rebrand Proposal",
    description:
      "Vision, milestones, and what the grant unlocks. Shipping for Colosseum Frontier, May 11, 2026.",
    type: "website",
    siteName: "Shard",
  },
  twitter: {
    card: "summary_large_image",
    title: "algo-trader → Shard · Rebrand Proposal",
    description:
      "Trade the breaks before they show. Vision + milestones for the Shard rebrand.",
    creator: "@TwentyOne_37",
  },
};

const sans = "font-[system-ui,Inter,-apple-system,sans-serif]";

function Dot({ color = "amber" }: { color?: "green" | "amber" | "red" }) {
  const c = {
    green: "bg-emerald-400",
    amber: "bg-amber-400",
    red: "bg-red-400",
  }[color];
  return <span className={`inline-block h-2 w-2 rounded-full ${c}`} />;
}

const WHY = [
  {
    code: "01",
    title: "Builder phase is over",
    body:
      "algo.2137.dev was a dev handle, not a brand. The product is live, users are trading, the grant is the clean break to a name that carries.",
  },
  {
    code: "02",
    title: "Humans and agents share one stack",
    body:
      "The terminal and the x402 agent API run on the same Rust engine. They need one brand — Shard covers both without leaning to either side.",
  },
  {
    code: "03",
    title: "Colosseum Frontier needs a product, not a subdomain",
    body:
      "Submitting to the AI + Crypto track with a subdomain handle loses points. Shipping as Shard on shard.trade signals finished work.",
  },
];

const IDENTITY = [
  {
    label: "Name",
    value: "Shard",
  },
  {
    label: "Domain",
    value: "shard.trade",
  },
  {
    label: "Handles",
    value: "@shardtrade",
  },
  {
    label: "Tagline",
    value: "Trade the breaks before they show.",
  },
];

const MILESTONES = [
  {
    code: "M1",
    title: "Rebrand",
    date: "by May 4",
    items: [
      "shard.trade live, site migrated from algo.2137.dev",
      "Brand identity shipped (wordmark, palette, typography)",
      "Handles secured: @shardtrade on X, TG, GitHub org",
      "Updated landing + pitch deck",
    ],
  },
  {
    code: "M2",
    title: "Multi-user beta",
    date: "by May 8",
    items: [
      "Auth + per-user isolated state",
      "Onboarding: signup to first paper trade in under 2 minutes",
      "≥10 real users trading on Shard",
      "Live on mainnet with analytics",
    ],
  },
  {
    code: "M3",
    title: "x402 agent API v1 + open-source SDK",
    date: "by May 11",
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
    label: "Domain + handles",
    note: "shard.trade acquisition, @shardtrade on X / TG / GitHub",
  },
  {
    label: "Buildstation Warsaw",
    note: "IRL hackathon space by Superteam — co-location to push submission",
  },
  {
    label: "Infra scale for beta",
    note: "Helius gRPC credits, DB, auth — support first cohort of live users",
  },
  {
    label: "x402 integration + open-source SDK",
    note: "Dedicated week of dev on mainnet endpoint, SDK, example bot",
  },
  {
    label: "Colosseum submission polish",
    note: "Demo video, pitch deck final pass, public repo documentation",
  },
];

const STATE = [
  { label: "Live at", value: "algo.2137.dev" },
  { label: "Engine", value: "Rust / gRPC" },
  { label: "Track", value: "AI + Crypto" },
  { label: "Deadline", value: "May 11, 2026" },
];

export default function ShardRebrandingPage() {
  return (
    <main className="relative min-h-screen bg-[#0d1117] text-[#d4d4d4]">
      {/* amber ambient */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.06]"
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
              "radial-gradient(ellipse 700px 450px at 50% 0%, rgba(255,184,0,0.05), transparent 70%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ── NAV ───────────────────────────────────────────── */}
        <nav className="border-b border-[#1e2d3d]">
          <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
            <Link
              href="https://algo.2137.dev"
              className="text-[13px] font-bold tracking-wide text-white"
            >
              algo-trader
              <span className="mx-2 text-[#364a5e]">→</span>
              <span className="text-[#ffb800]">Shard</span>
            </Link>
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#4a5e78]">
              Rebrand proposal
            </span>
          </div>
        </nav>

        {/* ── HERO ──────────────────────────────────────────── */}
        <section className="pt-16 pb-12 sm:pt-24 sm:pb-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#1e2d3d] bg-white/[0.02] px-4 py-1.5 text-[10px] uppercase tracking-[0.2em] text-[#4a5e78]">
              <Dot color="amber" />
              <span>Superteam Poland · Solana Foundation</span>
              <span className="text-[#364a5e]">·</span>
              <span>Grant proposal companion</span>
            </div>

            <h1 className="mt-6 text-[clamp(2rem,6vw,4.5rem)] font-bold leading-[1.05] tracking-tight text-white sm:mt-8">
              <span className="text-[#5a7490]">algo-trader</span>
              <span className="mx-3 text-[#364a5e]">→</span>
              <span className="text-white">Shard</span>
            </h1>

            <p
              className={`mt-5 max-w-2xl text-[15px] leading-relaxed text-[#8b9eb5] sm:mt-6 sm:text-base ${sans}`}
            >
              Shard is the brand evolution of{" "}
              <Link
                href="https://algo.2137.dev"
                className="text-white underline decoration-[#2a3f55] underline-offset-4 hover:decoration-[#ffb800]"
              >
                algo-trader
              </Link>
              . Same Rust engine, same sub-second data — built for humans{" "}
              <em>and</em> autonomous agents trading on Solana. This page is a
              companion to the Solana Foundation grant application submitted
              via Superteam Poland: the vision, the milestones, and exactly
              what the grant unlocks before May 11.
            </p>

            <p
              className={`mt-4 max-w-2xl text-[13px] leading-relaxed text-[#ffb800] ${sans}`}
            >
              &ldquo;Trade the breaks before they show.&rdquo;
            </p>

            {/* state strip */}
            <div className="mt-10 grid grid-cols-2 border border-[#1e2d3d] bg-[#141c2b] sm:grid-cols-4">
              {STATE.map((s, i) => (
                <div
                  key={s.label}
                  className={`px-4 py-3 ${
                    i !== 0 ? "sm:border-l sm:border-[#1e2d3d]" : ""
                  } ${i > 1 ? "border-t border-[#1e2d3d] sm:border-t-0" : ""} ${
                    i === 1 ? "border-l border-[#1e2d3d]" : ""
                  }`}
                >
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#4a5e78]">
                    {s.label}
                  </div>
                  <div className="mt-1 text-[13px] font-semibold text-white">
                    {s.value}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── WHY ───────────────────────────────────────────── */}
        <section className="border-t border-[#1e2d3d] py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
              Why rebrand, why now
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Three reasons it ships as Shard.
            </h2>

            <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-3 sm:gap-4">
              {WHY.map((w) => (
                <div
                  key={w.code}
                  className="rounded-lg border border-[#1e2d3d] border-l-2 border-l-[#ffb800] bg-[#141c2b] p-5 transition hover:bg-[#182030] sm:p-6"
                >
                  <div className="text-[10px] font-bold tracking-[0.2em] text-[#ffb800]">
                    {w.code}
                  </div>
                  <div className="mt-2 text-[14px] font-semibold text-white">
                    {w.title}
                  </div>
                  <p
                    className={`mt-3 text-[13px] leading-relaxed text-[#6b8299] ${sans}`}
                  >
                    {w.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── IDENTITY ──────────────────────────────────────── */}
        <section className="border-t border-[#1e2d3d] py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
              Name &amp; identity direction
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Shard.
            </h2>
            <p
              className={`mt-3 max-w-2xl text-[14px] leading-relaxed text-[#6b8299] ${sans}`}
            >
              A shard is a fragment broken from a larger piece — exactly what
              traders look for on charts, and what Solana itself is engineered
              on (sharded state). The name reads clean to both audiences: devs
              hear scaling, traders hear the edge. One syllable, hard
              consonants, feels cold and precise.
            </p>

            <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
              {IDENTITY.map((it) => (
                <div
                  key={it.label}
                  className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5"
                >
                  <div className="text-[9px] uppercase tracking-[0.2em] text-[#4a5e78]">
                    {it.label}
                  </div>
                  <div className="mt-1 text-[15px] font-semibold text-white">
                    {it.value}
                  </div>
                </div>
              ))}
            </div>

            <p
              className={`mt-6 text-[12px] leading-relaxed text-[#4a5e78] ${sans}`}
            >
              Availability checks and final lock-in land in M1. Word mark and
              palette finalised during M1 as part of the rebrand deliverable.
            </p>
          </div>
        </section>

        {/* ── MILESTONES ────────────────────────────────────── */}
        <section className="border-t border-[#1e2d3d] py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
              Milestones · all delivered by May 11
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Three milestones. One deadline. Colosseum Frontier.
            </h2>
            <p
              className={`mt-3 max-w-2xl text-[13px] leading-relaxed text-[#6b8299] ${sans}`}
            >
              The grant duration aligns exactly with the Colosseum Frontier
              submission window. Every milestone is built to ship before the
              hackathon deadline — the grant funds shipped work, not roadmap
              promises.
            </p>

            <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
              {MILESTONES.map((m) => (
                <div
                  key={m.code}
                  className="rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <div className="flex items-baseline gap-3">
                      <span className="text-[11px] font-bold tracking-[0.25em] text-[#ffb800]">
                        {m.code}
                      </span>
                      <span className="text-[15px] font-semibold text-white">
                        {m.title}
                      </span>
                    </div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#4a5e78]">
                      {m.date}
                    </span>
                  </div>
                  <ul className={`mt-4 grid gap-2 sm:grid-cols-2 ${sans}`}>
                    {m.items.map((it) => (
                      <li
                        key={it}
                        className="flex gap-2 text-[12px] leading-relaxed text-[#8b9eb5]"
                      >
                        <span className="text-[#ffb800]">—</span>
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="mt-8 rounded-lg border border-[#1e2d3d] border-l-2 border-l-emerald-400 bg-[#141c2b] p-5">
              <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400">
                Primary KPI
              </div>
              <p
                className={`mt-2 text-[13px] leading-relaxed text-[#8b9eb5] ${sans}`}
              >
                Autonomous agents executing x402-paid API calls against
                Shard&rsquo;s live mainnet endpoint. Success: ≥3 distinct agents,
                ≥100 total paid calls within the first 7 days of launch.
                On-chain verifiable — paid calls can&rsquo;t be faked.
              </p>
            </div>
          </div>
        </section>

        {/* ── WHAT THE GRANT UNLOCKS ────────────────────────── */}
        <section className="border-t border-[#1e2d3d] py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
              What $10k unlocks
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Where the grant goes.
            </h2>
            <p
              className={`mt-3 max-w-2xl text-[13px] leading-relaxed text-[#6b8299] ${sans}`}
            >
              The 25% upfront unblocks the domain and Buildstation travel in
              the first week. Milestone payouts cover infra, x402 integration,
              and submission polish. Solo operator, no burn on headcount.
            </p>

            <div className="mt-8 divide-y divide-[#1e2d3d] rounded-lg border border-[#1e2d3d] bg-[#141c2b] sm:mt-10">
              {BUDGET.map((b, i) => (
                <div
                  key={b.label}
                  className="grid grid-cols-[auto_1fr] gap-4 px-5 py-4 sm:grid-cols-[240px_1fr] sm:px-6"
                >
                  <div className="text-[12px] font-semibold text-white">
                    <span className="mr-2 text-[#4a5e78]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {b.label}
                  </div>
                  <div
                    className={`text-[12px] leading-relaxed text-[#6b8299] ${sans}`}
                  >
                    {b.note}
                  </div>
                </div>
              ))}
            </div>

            <p
              className={`mt-6 text-[12px] leading-relaxed text-[#4a5e78] ${sans}`}
            >
              Open-source scope: the x402 SDK, example-bot repo, and
              integration primitives ship under MIT on Solana mainnet. The
              terminal product, signal logic, and execution routing remain
              proprietary.
            </p>
          </div>
        </section>

        {/* ── PROOF OF WORK ─────────────────────────────────── */}
        <section className="border-t border-[#1e2d3d] py-14 sm:py-20">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <div className="text-[10px] uppercase tracking-[0.25em] text-[#4a5e78]">
              Proof of work
            </div>
            <h2 className="mt-2 text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Built by a shipper, not a planner.
            </h2>

            <div className="mt-8 grid gap-3 sm:mt-10 sm:grid-cols-2 sm:gap-4">
              <Link
                href="https://algo.2137.dev"
                className="group rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 transition hover:border-[#ffb800]/50 hover:bg-[#182030] sm:p-6"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#ffb800]">
                  Live product
                </div>
                <div className="mt-2 text-[14px] font-semibold text-white group-hover:underline">
                  algo.2137.dev →
                </div>
                <p
                  className={`mt-2 text-[12px] leading-relaxed text-[#6b8299] ${sans}`}
                >
                  Real-time Solana DEX terminal. 10 indicators in Rust, 6
                  timeframes, live Helius gRPC data, paper-to-live execution.
                </p>
              </Link>

              <Link
                href="https://algo.2137.dev/pitch"
                className="group rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 transition hover:border-[#ffb800]/50 hover:bg-[#182030] sm:p-6"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#ffb800]">
                  Pitch deck
                </div>
                <div className="mt-2 text-[14px] font-semibold text-white group-hover:underline">
                  algo.2137.dev/pitch →
                </div>
                <p
                  className={`mt-2 text-[12px] leading-relaxed text-[#6b8299] ${sans}`}
                >
                  Vision, market, architecture, moat, and ask — same deck used
                  at the Superteam Poland pitch contest.
                </p>
              </Link>

              <Link
                href="https://github.com/TwentyOne37"
                className="group rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 transition hover:border-[#ffb800]/50 hover:bg-[#182030] sm:p-6"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#ffb800]">
                  GitHub
                </div>
                <div className="mt-2 text-[14px] font-semibold text-white group-hover:underline">
                  github.com/TwentyOne37 →
                </div>
                <p
                  className={`mt-2 text-[12px] leading-relaxed text-[#6b8299] ${sans}`}
                >
                  7 years of shipping. Backend, Solana, Rust, real-time
                  systems. Open-source SDK lands here at M3.
                </p>
              </Link>

              <Link
                href="https://x.com/TwentyOne_37"
                className="group rounded-lg border border-[#1e2d3d] bg-[#141c2b] p-5 transition hover:border-[#ffb800]/50 hover:bg-[#182030] sm:p-6"
              >
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#ffb800]">
                  Updates
                </div>
                <div className="mt-2 text-[14px] font-semibold text-white group-hover:underline">
                  x.com/TwentyOne_37 →
                </div>
                <p
                  className={`mt-2 text-[12px] leading-relaxed text-[#6b8299] ${sans}`}
                >
                  Weekly build updates. Grant-required community cadence lands
                  here and on Superteam Discord.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* ── CTA ───────────────────────────────────────────── */}
        <section className="border-t border-[#1e2d3d] py-14 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
            <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold text-white">
              Ready when you are.
            </h2>
            <p
              className={`mx-auto mt-3 max-w-lg text-[13px] leading-relaxed text-[#6b8299] ${sans}`}
            >
              Application submitted on Superteam Earn. Happy to jump on a call
              if anything needs polishing before review — or to walk through
              the product live.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="https://algo.2137.dev"
                className="rounded bg-[#ffb800] px-6 py-2.5 text-[11px] font-bold uppercase tracking-[0.15em] text-black transition hover:bg-[#e0a200]"
              >
                Open current product
              </Link>
              <Link
                href="https://algo.2137.dev/pitch"
                className="rounded border border-[#1e2d3d] px-6 py-2.5 text-[11px] uppercase tracking-[0.15em] text-[#5a7490] transition hover:border-[#3a5068] hover:text-white"
              >
                Pitch deck
              </Link>
            </div>
          </div>
        </section>

        {/* ── FOOTER ────────────────────────────────────────── */}
        <footer className="border-t border-[#1e2d3d] py-8">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <p
              className={`mb-5 text-center text-[13px] text-[#5a7490] ${sans}`}
            >
              Trading intelligence for humans. Signal infrastructure for AI
              agents.
            </p>

            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div className="flex items-center gap-2 text-[11px] text-[#364a5e]">
                <span>Built by</span>
                <Link
                  href="https://2137.dev"
                  className="font-semibold text-[#5a7490] transition hover:text-white"
                >
                  2137.dev
                </Link>
              </div>
              <div className="flex items-center gap-5 text-[11px] text-[#364a5e]">
                <Link
                  href="https://x.com/TwentyOne_37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  Twitter
                </Link>
                <Link
                  href="https://github.com/TwentyOne37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition hover:text-white"
                >
                  GitHub
                </Link>
                <span className="text-[#253545]">Colosseum Frontier 2026</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

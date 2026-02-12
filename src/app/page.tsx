"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";

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

  return (
    <span className={done ? "" : "opacity-90"}>{display}</span>
  );
}

/* ── SPLIT-FLAP ROW (staggered per row) ────────────────────── */
function SplitFlapRow({
  code,
  name,
  stack,
  index,
}: {
  code: string;
  name: string;
  stack: string;
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
        {visible ? <SplitFlapText text={code} delay={baseDelay} speed={40} /> : "\u00A0"}
      </span>
      <span className="text-white">
        {visible ? <SplitFlapText text={name} delay={baseDelay + 100} speed={25} /> : "\u00A0"}
      </span>
      <span className="text-[#555]">
        {visible ? <SplitFlapText text={stack} delay={baseDelay + 200} speed={20} /> : "\u00A0"}
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

/* ── NAV ───────────────────────────────────────────────────── */
function Nav() {
  return (
    <nav className="fixed inset-x-0 top-0 z-50 border-b border-[#1a1a1a] bg-[#0c0c0c]/90 backdrop-blur-sm">
      <div className="mx-auto flex h-11 max-w-4xl items-center justify-between px-6 text-[10px] uppercase tracking-[0.2em]">
        <a href="#" className="text-white">
          2137<span className="text-[#ffb800]">.dev</span>
        </a>
        <div className="hidden gap-6 sm:flex">
          {["services", "work", "packages", "faq"].map((s) => (
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
          href="#contact"
          className="border border-[#ffb800] px-3 py-1 text-[#ffb800] transition hover:bg-[#ffb800] hover:text-black"
        >
          INQUIRE
        </a>
      </div>
    </nav>
  );
}

/* ── HERO ──────────────────────────────────────────────────── */
function Hero() {
  return (
    <section className="pt-24 pb-10">
      <div className="mx-auto w-full max-w-4xl px-6">
        {/* status line */}
        <div className="mb-8 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#444]">
          <Dot color="green" />
          <span>Available for new projects</span>
          <span className="ml-auto">
            {new Date()
              .toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
              })
              .toUpperCase()}
          </span>
        </div>

        <div className="flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-[clamp(2rem,5vw,3.25rem)] font-bold leading-[1.1] text-white">
              Backend &amp;&nbsp;Solana
              <br />
              engineering.
            </h1>
            <p className="mt-3 max-w-md text-[13px] leading-relaxed text-[#666]">
              I fix production systems that other engineers are afraid to touch.
              7&nbsp;years shipping. Fixed scope. No fluff.
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="#contact"
                className="bg-[#ffb800] px-5 py-2 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[#e0a200]"
              >
                Start a project
              </a>
              <a
                href="#work"
                className="border border-[#1e1e1e] px-5 py-2 text-[10px] uppercase tracking-[0.2em] text-[#555] transition hover:border-[#555] hover:text-white"
              >
                See work
              </a>
            </div>
          </div>

          {/* profile */}
          <div className="flex items-start gap-3">
            <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded sm:h-24 sm:w-24">
              <Image
                src="/profile.png"
                alt="Krzysztof"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="pt-0.5 text-[11px] leading-relaxed">
              <div className="font-semibold text-white">
                Krzysztof Ziolkowski <span className="ml-0.5">🇵🇱</span>
              </div>
              <div className="text-[#444]">Backend &amp; Blockchain Eng.</div>
              <div className="text-[#444]">CDMX, México</div>
            </div>
          </div>
        </div>

        {/* stats strip */}
        <div className="mt-10 grid grid-cols-4 border border-[#1a1a1a] bg-[#0e0e0e]">
          {[
            { label: "YEARS", value: "7+" },
            { label: "STACK", value: "TS / RUST" },
            { label: "CHAIN", value: "SOLANA" },
            { label: "HACKATHONS", value: "6" },
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

/* ── SERVICES ──────────────────────────────────────────────── */
const SERVICES = [
  { code: "BKD", name: "Backend Systems", stack: "Node / TS / NestJS" },
  { code: "PGS", name: "Postgres & Data", stack: "Schema / Perf / Migrations" },
  { code: "SOL", name: "Blockchain Integrations", stack: "Solana / Anchor / Rust" },
  { code: "PIP", name: "Real-time Pipelines", stack: "Kafka / gRPC / WS" },
  { code: "API", name: "API Performance", stack: "Profiling / Caching" },
  { code: "OPS", name: "Platform Reliability", stack: "K8s / Docker / AWS" },
];

function Services() {
  return (
    <section id="services" className="border-t border-[#1a1a1a] py-10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-4 text-[9px] uppercase tracking-[0.2em] text-[#444]">
          Services
        </div>

        {/* board */}
        <div className="overflow-hidden rounded border border-[#1a1a1a] bg-[#0e0e0e]">
          {/* header */}
          <div className="grid grid-cols-[48px_1fr_1fr_72px] border-b border-[#1a1a1a] bg-[#111] px-4 py-2 text-[9px] uppercase tracking-[0.2em] text-[#444]">
            <span>Code</span>
            <span>Service</span>
            <span>Stack</span>
            <span className="text-right">Status</span>
          </div>

          {/* rows */}
          <div className="px-4">
            {SERVICES.map((s, i) => (
              <SplitFlapRow
                key={s.code}
                code={s.code}
                name={s.name}
                stack={s.stack}
                index={i}
              />
            ))}
          </div>
        </div>

        <p className="mt-4 text-[11px] text-[#444]">
          One senior engineer. End-to-end ownership. No hand-off to a junior.
        </p>
      </div>
    </section>
  );
}

/* ── CASE STUDY ────────────────────────────────────────────── */
function CaseStudy() {
  return (
    <section id="work" className="border-t border-[#1a1a1a] py-10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-4 text-[9px] uppercase tracking-[0.2em] text-[#444]">
          Work
        </div>

        {/* raster */}
        <div className="flex flex-wrap items-baseline gap-2">
          <a
            href="https://raster.finance"
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg font-semibold text-white underline decoration-[#2a2a2a] underline-offset-4 transition hover:decoration-[#ffb800] sm:text-xl"
          >
            raster.finance
          </a>
          <span className="text-[11px] text-[#444]">
            — Payments Platform / Lead Engineer
          </span>
        </div>

        <div className="mt-6 grid gap-6 sm:grid-cols-3">
          <div>
            <div className="mb-1.5 text-[9px] uppercase tracking-[0.2em] text-red-400">
              Problem
            </div>
            <p className="text-[11px] leading-relaxed text-[#666]">
              Mission-critical payments platform on inherited, unstable
              services. Could not rewrite under delivery constraints. Failures
              hit revenue directly.
            </p>
          </div>
          <div>
            <div className="mb-1.5 text-[9px] uppercase tracking-[0.2em] text-[#ffb800]">
              Approach
            </div>
            <ul className="space-y-1 text-[11px] text-[#666]">
              <li>→ End-to-end ownership: payments, backend, infra, security</li>
              <li>→ Observability into low-trust codebase</li>
              <li>→ Delivery-first trade-offs, controlled tech debt</li>
            </ul>
          </div>
          <div>
            <div className="mb-1.5 text-[9px] uppercase tracking-[0.2em] text-emerald-400">
              Result
            </div>
            <ul className="space-y-1 text-[11px] text-[#666]">
              <li>→ Platform stabilized under production load</li>
              <li>→ Delivery timelines met</li>
              <li>→ Single escalation point for reliability</li>
            </ul>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-1.5">
          {["NestJS", "TypeScript", "Solana", "Postgres", "Kubernetes", "gRPC"].map(
            (t) => (
              <span
                key={t}
                className="border border-[#1a1a1a] bg-[#0e0e0e] px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#555]"
              >
                {t}
              </span>
            )
          )}
        </div>

        {/* divider */}
        <div className="my-8 border-t border-[#1a1a1a]" />

        {/* cryptomapp */}
        <div className="flex flex-wrap items-baseline gap-2">
          <a
            href="https://cryptom.app"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-white underline decoration-[#2a2a2a] underline-offset-4 transition hover:decoration-[#ffb800]"
          >
            cryptom.app
          </a>
          <span className="text-[11px] text-[#444]">
            — Solana dApp / Founder &amp; CTO
          </span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-[#666]">
          Built the entire Solana backend from scratch — on-chain programs
          (Anchor), gasless Node.js services, REST APIs, WebSockets. Shipped to
          Mainnet. Resolved protocol-level issues directly with Metaplex, Solana,
          and Circle.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Solana", "Anchor", "TypeScript", "NestJS", "Azure", "cNFTs"].map(
            (t) => (
              <span
                key={t}
                className="border border-[#1a1a1a] bg-[#0e0e0e] px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#555]"
              >
                {t}
              </span>
            )
          )}
        </div>

        {/* divider */}
        <div className="my-8 border-t border-[#1a1a1a]" />

        {/* 2137.dev */}
        <div className="flex flex-wrap items-baseline gap-2">
          <a
            href="https://2137.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="text-base font-semibold text-white underline decoration-[#2a2a2a] underline-offset-4 transition hover:decoration-[#ffb800]"
          >
            2137.dev
          </a>
          <span className="text-[11px] text-[#444]">
            — Real-time Solana Trading Infra
          </span>
        </div>
        <p className="mt-2 text-[11px] leading-relaxed text-[#666]">
          Sub-second data streaming pipelines. On-chain/off-chain coordination
          for latency-sensitive sniper bots. MEV-aware systems with Jito bundler.
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Rust", "Anchor", "gRPC Yellowstone", "Redis", "ClickHouse"].map(
            (t) => (
              <span
                key={t}
                className="border border-[#1a1a1a] bg-[#0e0e0e] px-2 py-0.5 text-[9px] uppercase tracking-wider text-[#555]"
              >
                {t}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}

/* ── PACKAGES ──────────────────────────────────────────────── */
const PACKAGES = [
  {
    code: "AUD",
    name: "Audit & Fix",
    price: "$2,000",
    time: "1–2 WK",
    items: [
      "Codebase audit (backend & infra)",
      "Performance bottleneck ID",
      "Up to 20h hands-on fixes",
      "Written findings & recs",
    ],
  },
  {
    code: "BLD",
    name: "Build & Ship",
    price: "$3,500",
    time: "2–4 WK",
    featured: true,
    items: [
      "Full feature scoping & architecture",
      "Implementation & testing",
      "Deployment to your env",
      "Schema design if needed",
      "Docs & handoff",
      "1 week post-deploy support",
    ],
  },
  {
    code: "RES",
    name: "Rescue & Stabilize",
    price: "$5,000",
    time: "2–4 WK",
    items: [
      "Emergency system assessment",
      "Production stabilization",
      "Monitoring & observability",
      "Infra hardening",
      "On-call during engagement",
      "Runbook & handoff docs",
    ],
  },
];

function PackagesSection() {
  return (
    <section id="packages" className="border-t border-[#1a1a1a] py-10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#444]">
          Packages
        </div>
        <h2 className="text-lg font-semibold text-white sm:text-xl">
          Fixed scope. Fixed price.
        </h2>

        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {PACKAGES.map((pkg) => (
            <div
              key={pkg.code}
              className={`flex flex-col border p-4 ${
                pkg.featured
                  ? "border-[#ffb800]/30 bg-[#ffb800]/[0.02]"
                  : "border-[#1a1a1a] bg-[#0e0e0e]"
              }`}
            >
              <div className="flex items-baseline justify-between">
                <span className="text-[9px] font-bold tracking-[0.2em] text-[#ffb800]">
                  {pkg.code}
                </span>
                <span className="text-[9px] uppercase tracking-[0.2em] text-[#444]">
                  {pkg.time}
                </span>
              </div>

              <div className="mt-2 text-[13px] font-semibold text-white">
                {pkg.name}
              </div>
              <div className="mt-0.5 text-xl font-bold text-white">
                {pkg.price}
              </div>

              <ul className="mt-4 flex-1 space-y-1.5">
                {pkg.items.map((item) => (
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
                href="#contact"
                className={`mt-4 block py-2 text-center text-[9px] font-bold uppercase tracking-[0.2em] transition ${
                  pkg.featured
                    ? "bg-[#ffb800] text-black hover:bg-[#e0a200]"
                    : "border border-[#1a1a1a] text-[#555] hover:border-[#444] hover:text-white"
                }`}
              >
                Select →
              </a>
            </div>
          ))}
        </div>

        <p className="mt-4 text-[10px] text-[#444]">
          Custom scope?{" "}
          <a href="#contact" className="text-[#ffb800] underline">
            Let&apos;s talk.
          </a>
        </p>
      </div>
    </section>
  );
}

/* ── FAQ ───────────────────────────────────────────────────── */
const FAQ_ITEMS = [
  {
    q: "Timeline?",
    a: "1–4 weeks depending on scope. Concrete estimate after scoping call.",
  },
  {
    q: "Pricing model?",
    a: "Fixed price, fixed scope. No hourly billing. Scope grows → we renegotiate before I write code.",
  },
  {
    q: "Communication?",
    a: "Slack, Discord, or Telegram. Async updates every 1–2 days. Full visibility.",
  },
  {
    q: "NDA?",
    a: "Yes. Happy to sign before scoping. Mutual NDAs fine. Custom ones reviewed within 24h.",
  },
  {
    q: "What if scope changes?",
    a: "I communicate immediately. We figure it out. I don't ghost and I don't miss deadlines without warning.",
  },
  {
    q: "Work with existing team?",
    a: "Yes. I follow your PR process, code standards, and deploy pipelines.",
  },
];

function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="border-t border-[#1a1a1a] py-10">
      <div className="mx-auto max-w-4xl px-6">
        <div className="mb-4 text-[9px] uppercase tracking-[0.2em] text-[#444]">
          FAQ
        </div>

        <div className="overflow-hidden rounded border border-[#1a1a1a] bg-[#0e0e0e]">
          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              className={i !== 0 ? "border-t border-[#1a1a1a]" : ""}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between px-4 py-2.5 text-left text-[13px] transition hover:bg-[#111]"
              >
                <span className="text-white">{item.q}</span>
                <span className="ml-4 text-[#444]">
                  {open === i ? "−" : "+"}
                </span>
              </button>
              {open === i && (
                <div className="border-t border-[#1a1a1a] bg-[#0c0c0c] px-4 py-3 text-[11px] leading-relaxed text-[#666]">
                  {item.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── CONTACT ───────────────────────────────────────────────── */
function Contact() {
  const [submitted, setSubmitted] = useState(false);

  const inputClass =
    "w-full border border-[#1a1a1a] bg-[#0e0e0e] px-3 py-2 text-[11px] text-white placeholder-[#333] focus:border-[#ffb800] transition";

  return (
    <section id="contact" className="border-t border-[#1a1a1a] py-10">
      <div className="mx-auto max-w-2xl px-6">
        <div className="mb-1 text-[9px] uppercase tracking-[0.2em] text-[#444]">
          Contact
        </div>
        <h2 className="text-lg font-semibold text-white">
          Scope your project
        </h2>
        <p className="mt-1 text-[10px] text-[#444]">
          24h response time. No commitment.
        </p>

        {submitted ? (
          <div className="mt-8 border border-[#ffb800]/30 bg-[#ffb800]/[0.03] p-6 text-center">
            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ffb800]">
              Received
            </div>
            <p className="mt-1 text-[11px] text-[#666]">
              I&apos;ll review and respond within 24 hours.
            </p>
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="mt-6 space-y-3"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block text-[9px] uppercase tracking-[0.2em] text-[#444]">
                  Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-1 block text-[9px] uppercase tracking-[0.2em] text-[#444]">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  placeholder="you@company.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="mb-1 block text-[9px] uppercase tracking-[0.2em] text-[#444]">
                Project type *
              </label>
              <select required className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>Backend audit &amp; performance</option>
                <option>New feature / service</option>
                <option>Blockchain / Solana integration</option>
                <option>Platform stabilization</option>
                <option>Database optimization</option>
                <option>Other</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[9px] uppercase tracking-[0.2em] text-[#444]">
                Budget *
              </label>
              <select required className={inputClass} defaultValue="">
                <option value="" disabled>
                  Select
                </option>
                <option>$2,000 – $3,000</option>
                <option>$3,000 – $5,000</option>
                <option>$5,000+</option>
                <option>Not sure yet</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[9px] uppercase tracking-[0.2em] text-[#444]">
                Details *
              </label>
              <textarea
                required
                rows={3}
                placeholder="What are you building? What's broken?"
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#ffb800] py-2.5 text-[10px] font-bold uppercase tracking-[0.2em] text-black transition hover:bg-[#e0a200]"
            >
              Send inquiry →
            </button>

            <p className="text-center text-[9px] text-[#444]">
              or email{" "}
              <a
                href="mailto:krzysztof@2137.dev"
                className="text-[#ffb800]"
              >
                krzysztof@2137.dev
              </a>
            </p>
          </form>
        )}
      </div>
    </section>
  );
}

/* ── FOOTER ────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-[#1a1a1a] py-6">
      <div className="mx-auto flex max-w-4xl flex-col items-center justify-between gap-2 px-6 text-[9px] uppercase tracking-[0.2em] text-[#333] sm:flex-row">
        <span>© {new Date().getFullYear()} 2137.dev</span>
        <div className="flex gap-5">
          {["GitHub", "Twitter", "LinkedIn"].map((l) => (
            <a key={l} href="#" className="transition hover:text-white">
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ── PAGE ──────────────────────────────────────────────────── */
export default function LandingPage() {
  return (
    <main>
      <Nav />
      <Hero />
      <Services />
      <CaseStudy />
      <PackagesSection />
      <FAQ />
      <Contact />
      <Footer />
    </main>
  );
}

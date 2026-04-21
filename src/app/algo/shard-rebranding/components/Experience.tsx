"use client";

import Link from "next/link";
import { ShardMark, TwinShards } from "./ShardMark";
import { Reveal, CountUp } from "./Reveal";
import { CursorGlow, Ticker } from "./Ambient";
import {
  ThemeLangProvider,
  useThemeLang,
  type Theme,
} from "./ThemeLangContext";
import { ThemeToggle, LangToggle } from "./Controls";
import { CONTENT } from "./content";
import { Kremowka } from "./Kremowka";

const mono = { fontFamily: "JetBrains Mono, ui-monospace, monospace" } as const;
const display = { fontFamily: "Inter, system-ui, sans-serif" } as const;

const THEME_VARS: Record<Theme, Record<string, string>> = {
  dark: {
    "--bg": "#0a0a0a",
    "--surface": "#0d0d0d",
    "--surface-2": "#111111",
    "--line": "#141414",
    "--line-2": "#1f1f1f",
    "--text": "#fafafa",
    "--text-soft": "#d4d4d8",
    "--text-mute": "#a3a3a3",
    "--text-dim": "#737373",
    "--text-faint": "#525252",
    "--text-ghost": "#2a2a2a",
    "--mark-bg": "#ffffff",
    "--mark-text": "#000000",
    "--glow": "rgba(255,255,255,0.04)",
    "--dots": "rgba(255,255,255,0.9)",
    "--ticker-fade": "#0a0a0a",
    "--krem-label": "#fafafa",
  },
  light: {
    "--bg": "#f6f5f2",
    "--surface": "#ffffff",
    "--surface-2": "#ebeae6",
    "--line": "#e4e3de",
    "--line-2": "#d5d3cc",
    "--text": "#0a0a0a",
    "--text-soft": "#262626",
    "--text-mute": "#525252",
    "--text-dim": "#737373",
    "--text-faint": "#8a8a88",
    "--text-ghost": "#c9c7c0",
    "--mark-bg": "#0a0a0a",
    "--mark-text": "#ffffff",
    "--glow": "rgba(10,10,10,0.05)",
    "--dots": "rgba(10,10,10,0.6)",
    "--ticker-fade": "#f6f5f2",
    "--krem-label": "#0a0a0a",
  },
};

export function ShardRebrandingExperience() {
  return (
    <ThemeLangProvider>
      <Inner />
    </ThemeLangProvider>
  );
}

function Inner() {
  const { theme, lang } = useThemeLang();
  const t = CONTENT[lang];
  const vars = THEME_VARS[theme] as React.CSSProperties;

  return (
    <main
      className="relative min-h-screen overflow-x-hidden transition-colors duration-500"
      style={{
        ...display,
        ...vars,
        background: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <Kremowka />

      {/* ambient field */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle, var(--dots) 0.6px, transparent 0.6px)",
            backgroundSize: "28px 28px",
          }}
        />
        <div
          className="absolute -top-[40%] left-1/2 h-[900px] w-[1100px] -translate-x-1/2"
          style={{
            background:
              "radial-gradient(ellipse at center, var(--glow), transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10">
        {/* ── NAV ─────────────────────────────────────────── */}
        <nav className="border-b" style={{ borderColor: "var(--line)" }}>
          <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-8">
            <ShardMark size="sm" />
            <div className="flex items-center gap-2 sm:gap-4">
              <span
                className="hidden text-[10px] uppercase tracking-[0.28em] sm:inline"
                style={{ ...mono, color: "var(--text-faint)" }}
              >
                {t.navLabel}
              </span>
              <LangToggle />
              <ThemeToggle />
              <Link
                href="https://algo.2137.dev"
                className="hidden text-[10px] uppercase tracking-[0.28em] transition sm:inline"
                style={{ ...mono, color: "var(--text-dim)" }}
              >
                {t.navCurrent}
              </Link>
            </div>
          </div>
        </nav>

        {/* ── 1. HERO ─────────────────────────────────────── */}
        <section
          id="shard-hero"
          className="relative min-h-[88vh] overflow-hidden"
        >
          <CursorGlow targetId="shard-hero" />

          <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-center px-5 sm:px-8">
            <div
              className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[9px] uppercase tracking-[0.28em] opacity-0 [animation:fade-in_600ms_ease_forwards] sm:text-[10px] sm:tracking-[0.32em]"
              style={{ ...mono, color: "var(--text-dim)" }}
            >
              <span
                className="h-1.5 w-1.5 rounded-full bg-cyan-300"
                style={{ boxShadow: "0 0 10px rgba(103,232,249,0.6)" }}
              />
              {t.heroMeta.map((m, i) => (
                <span key={i} className="flex items-center gap-3">
                  <span>{m}</span>
                  {i < t.heroMeta.length - 1 && (
                    <span style={{ color: "var(--text-ghost)" }}>·</span>
                  )}
                </span>
              ))}
            </div>

            <div className="mt-12 sm:mt-16">
              <ShardMark key={lang + theme} size="xl" animated />
            </div>

            <p
              className="mt-10 max-w-2xl text-[clamp(1.15rem,2.1vw,1.55rem)] font-[300] leading-[1.35] tracking-[-0.01em] opacity-0 [animation:fade-in_800ms_ease_1100ms_forwards]"
              style={{ color: "var(--text-soft)" }}
            >
              {t.heroTagline.pre}{" "}
              <span
                className="relative inline-block"
                style={{ color: "var(--text)" }}
              >
                <span className="[animation:glitch_380ms_ease_1900ms_both]">
                  {t.heroTagline.end}
                </span>
              </span>
            </p>

            <div
              className="mt-16 flex items-center gap-6 text-[10px] uppercase tracking-[0.3em] opacity-0 [animation:fade-in_800ms_ease_1600ms_forwards] sm:mt-24"
              style={{ color: "var(--text-faint)" }}
            >
              <span style={mono}>{t.heroScroll.left}</span>
              <span
                className="h-[1px] w-14"
                style={{ background: "var(--line-2)" }}
              />
              <span style={mono}>{t.heroScroll.right}</span>
            </div>
          </div>

          <style jsx>{`
            @keyframes fade-in { to { opacity: 1; } }
            @keyframes glitch {
              0% { transform: translate(0, 0); filter: blur(0); }
              20% { transform: translate(-2px, 1px); filter: blur(0.5px); }
              40% { transform: translate(2px, -1px); text-shadow: -1px 0 rgba(103,232,249,0.6); }
              60% { transform: translate(-1px, 0); text-shadow: 1px 0 rgba(255,255,255,0.6); }
              80% { transform: translate(1px, 0); }
              100% { transform: translate(0, 0); filter: blur(0); text-shadow: none; }
            }
          `}</style>
        </section>

        {/* ── TICKER ──────────────────────────────────────── */}
        <Ticker />

        {/* ── 2. PREMISE ──────────────────────────────────── */}
        <section className="relative flex min-h-[80vh] items-center">
          <div className="mx-auto max-w-5xl px-5 sm:px-8">
            <Reveal
              className="text-[11px] uppercase tracking-[0.32em]"
              as="div"
            >
              <span style={{ ...mono, color: "var(--text-faint)" }}>
                {t.premiseLabel}
              </span>
            </Reveal>
            <Reveal
              delay={120}
              as="h2"
              className="mt-10 text-[clamp(2rem,5.5vw,4.75rem)] font-[700] leading-[1.02] tracking-[-0.035em]"
            >
              {t.premiseH.map((p, i) => (
                <span
                  key={i}
                  style={{
                    color:
                      p.tone === "mute"
                        ? "var(--text-faint)"
                        : "var(--text)",
                  }}
                >
                  {p.text}
                </span>
              ))}
            </Reveal>
            <Reveal
              delay={260}
              as="p"
              className="mt-10 max-w-2xl text-[15px] leading-[1.75] sm:text-[16px]"
            >
              <span style={{ color: "var(--text-mute)" }}>
                {t.premiseBody.pre}
              </span>
              <Link
                href="https://algo.2137.dev"
                className="underline underline-offset-4 transition"
                style={{
                  color: "var(--text)",
                  textDecorationColor: "var(--text-ghost)",
                }}
              >
                {t.premiseBody.link}
              </Link>
              <span style={{ color: "var(--text-mute)" }}>
                {t.premiseBody.suffix}
              </span>
            </Reveal>
          </div>
        </section>

        {/* ── 3. FROM → TO ────────────────────────────────── */}
        <section className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal
              className="text-[11px] uppercase tracking-[0.32em]"
              as="div"
            >
              <span style={{ ...mono, color: "var(--text-faint)" }}>
                {t.fromToLabel}
              </span>
            </Reveal>

            <div className="mt-16 grid items-center gap-10 sm:grid-cols-[1.1fr_auto_1fr]">
              {/* FROM */}
              <Reveal>
                <div
                  className="relative rounded-sm border p-8"
                  style={{
                    borderColor: "var(--line-2)",
                    background: "var(--surface)",
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.32em]"
                    style={{ ...mono, color: "var(--text-faint)" }}
                  >
                    {lang === "pl" ? "Z" : "From"}
                  </div>
                  <div
                    className="mt-8 font-[700] text-[clamp(1.25rem,3vw,1.9rem)] leading-[1.1] tracking-[-0.02em]"
                    style={{ color: "var(--text-dim)" }}
                  >
                    {t.fromHead}
                  </div>
                  <div
                    className="mt-3 text-[12px] uppercase tracking-[0.25em]"
                    style={{ ...mono, color: "var(--text-ghost)" }}
                  >
                    {t.fromSub}
                  </div>
                  <div className="mt-10 space-y-1.5">
                    <FakeBar w="w-[70%]" />
                    <FakeBar w="w-[85%]" />
                    <FakeBar w="w-[55%]" />
                    <FakeBar w="w-[78%]" />
                    <FakeBar w="w-[45%]" />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-sm"
                    style={{
                      background:
                        "linear-gradient(180deg, transparent 40%, var(--bg) 100%)",
                    }}
                  />
                </div>
              </Reveal>

              {/* ARROW — down on mobile, right on desktop */}
              <Reveal delay={150} className="flex justify-center">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  style={{ color: "var(--text)" }}
                  className="rotate-90 sm:rotate-0 [animation:arrow-nudge_2.4s_ease-in-out_infinite]"
                >
                  <path
                    d="M4 14 H22 M16 8 L22 14 L16 20"
                    stroke="currentColor"
                    strokeWidth="1.4"
                    strokeLinecap="square"
                  />
                </svg>
              </Reveal>

              {/* TO */}
              <Reveal delay={280}>
                <div
                  className="relative rounded-sm border p-8"
                  style={{
                    borderColor: "var(--text)",
                    background: "var(--surface-2)",
                    boxShadow:
                      "0 30px 80px -30px var(--glow), 0 0 0 1px var(--line)",
                  }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.32em]"
                    style={{ ...mono, color: "var(--text)" }}
                  >
                    {lang === "pl" ? "Na" : "To"}
                  </div>
                  <div className="mt-8">
                    <ShardMark size="md" />
                  </div>
                  <div
                    className="mt-2 text-[clamp(1.1rem,2.6vw,1.6rem)] font-[600] leading-[1.15] tracking-[-0.02em]"
                    style={{ color: "var(--text)" }}
                  >
                    {t.toHead}
                  </div>
                  <div
                    className="mt-3 text-[11px] uppercase tracking-[0.28em]"
                    style={{ ...mono, color: "var(--text-dim)" }}
                  >
                    {t.toSub}
                  </div>
                  <div className="mt-10 space-y-1.5">
                    <FakeBar w="w-[82%]" bright />
                    <FakeBar w="w-[68%]" bright />
                    <FakeBar w="w-[91%]" bright />
                    <FakeBar w="w-[60%]" bright />
                    <FakeBar w="w-[74%]" bright />
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
          <style jsx>{`
            @keyframes arrow-nudge {
              0%, 100% { transform: translateX(0); }
              50% { transform: translateX(6px); }
            }
          `}</style>
        </section>

        {/* ── 4. MILESTONES ───────────────────────────────── */}
        <section className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal as="div" className="text-[11px] uppercase tracking-[0.32em]">
              <span style={{ ...mono, color: "var(--text-faint)" }}>
                {t.milestonesLabel}
              </span>
            </Reveal>
            <Reveal
              delay={100}
              as="h2"
              className="mt-6 max-w-4xl text-[clamp(1.75rem,4.2vw,3.2rem)] font-[700] leading-[1.05] tracking-[-0.03em]"
              style={{ color: "var(--text)" }}
            >
              {t.milestonesH.pre}
              <span style={{ color: "var(--text-faint)" }}>
                {t.milestonesH.strong}
              </span>
            </Reveal>

            <div className="relative mt-20">
              <div
                className="absolute left-0 right-0 top-[22px] h-[1px]"
                style={{ background: "var(--line-2)" }}
              />

              <div className="grid gap-14 sm:grid-cols-3 sm:gap-8">
                {t.milestones.map((m, i) => (
                  <Reveal key={m.code} delay={250 + i * 200}>
                    <div className="relative pt-14">
                      <span
                        className="absolute left-0 top-[16px] inline-block h-3 w-3 rounded-full"
                        style={{
                          background: "var(--text)",
                          boxShadow:
                            "0 0 0 4px var(--bg), 0 0 14px var(--glow)",
                        }}
                      />
                      <div
                        className="text-[10px] uppercase tracking-[0.32em]"
                        style={{ ...mono, color: "var(--text-mute)" }}
                      >
                        {m.code} · {m.date}
                      </div>
                      <div
                        className="mt-3 text-[22px] font-[700] leading-[1.15] tracking-[-0.015em]"
                        style={{ color: "var(--text)" }}
                      >
                        {m.title}
                      </div>
                      <ul className="mt-5 space-y-2">
                        {m.items.map((it) => (
                          <li
                            key={it}
                            className="flex gap-3 text-[13px] leading-[1.65]"
                            style={{ color: "var(--text-mute)" }}
                          >
                            <span
                              className="mt-[7px] inline-block h-[1px] w-3 shrink-0"
                              style={{ background: "var(--text-faint)" }}
                            />
                            <span>{it}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. THE BET (KPI) ────────────────────────────── */}
        <section
          className="relative flex min-h-[92vh] items-center border-y"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
            <Reveal as="div" className="text-[11px] uppercase tracking-[0.32em]">
              <span style={{ ...mono, color: "var(--text-faint)" }}>
                {t.kpiLabel}
              </span>
            </Reveal>

            <div className="mt-12 grid items-end gap-16 sm:grid-cols-[1.2fr_1fr]">
              <div>
                <Reveal
                  delay={100}
                  as="div"
                  className="text-[clamp(4.5rem,14vw,11rem)] font-[800] leading-[0.88] tracking-[-0.05em]"
                  style={{ color: "var(--text)" }}
                >
                  <div>
                    ≥<CountUp to={3} />{" "}
                    <span style={{ color: "var(--text-dim)" }}>
                      {t.kpiAgents}
                    </span>
                  </div>
                  <div>
                    ≥<CountUp to={100} duration={2200} />{" "}
                    <span style={{ color: "var(--text-dim)" }}>
                      {t.kpiCalls}
                    </span>
                  </div>
                </Reveal>
                <Reveal
                  delay={600}
                  as="div"
                  className="mt-8 text-[12px] uppercase tracking-[0.3em]"
                >
                  <span style={{ ...mono, color: "var(--text-dim)" }}>
                    {t.kpiWindow}
                  </span>
                </Reveal>
              </div>

              <Reveal delay={400}>
                <div
                  className="border-l pl-8"
                  style={{ borderColor: "var(--line-2)" }}
                >
                  <div
                    className="text-[10px] uppercase tracking-[0.32em]"
                    style={{ ...mono, color: "var(--text-faint)" }}
                  >
                    {t.kpiWhyLabel}
                  </div>
                  <p
                    className="mt-5 text-[15px] leading-[1.7]"
                    style={{ color: "var(--text-mute)" }}
                  >
                    {t.kpiWhyBody}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── 6. BUDGET ───────────────────────────────────── */}
        <section className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal as="div" className="text-[11px] uppercase tracking-[0.32em]">
              <span style={{ ...mono, color: "var(--text-faint)" }}>
                {t.budgetLabel}
              </span>
            </Reveal>
            <Reveal
              delay={100}
              as="h2"
              className="mt-6 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-[700] leading-[1.05] tracking-[-0.03em]"
              style={{ color: "var(--text)" }}
            >
              {t.budgetH}
            </Reveal>
            <Reveal
              delay={200}
              as="p"
              className="mt-5 max-w-2xl text-[15px] leading-[1.7]"
              style={{ color: "var(--text-mute)" }}
            >
              {t.budgetBody}
            </Reveal>

            <div
              className="mt-14 border-t"
              style={{ borderColor: "var(--line-2)" }}
            >
              {t.budget.map((b, i) => (
                <Reveal key={b.n} delay={i * 80}>
                  <div
                    className="grid grid-cols-[40px_1fr] items-baseline gap-4 border-b py-6 sm:grid-cols-[60px_300px_1fr] sm:gap-10 sm:py-8"
                    style={{ borderColor: "var(--line-2)" }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-[0.3em]"
                      style={{ ...mono, color: "var(--text-faint)" }}
                    >
                      {b.n}
                    </div>
                    <div
                      className="col-span-1 text-[15px] font-[600] sm:text-[16px]"
                      style={{ color: "var(--text)" }}
                    >
                      {b.label}
                    </div>
                    <div
                      className="col-span-2 text-[13px] leading-[1.7] sm:col-span-1 sm:text-[14px]"
                      style={{ color: "var(--text-mute)" }}
                    >
                      {b.note}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal
              delay={200}
              as="p"
              className="mt-8 max-w-2xl text-[12px] leading-[1.7]"
            >
              <span style={{ ...mono, color: "var(--text-dim)" }}>
                {t.budgetFoot}
              </span>
            </Reveal>
          </div>
        </section>

        {/* ── 7. PROOF ────────────────────────────────────── */}
        <section className="relative py-24 sm:py-32">
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <Reveal as="div" className="text-[11px] uppercase tracking-[0.32em]">
              <span style={{ ...mono, color: "var(--text-faint)" }}>
                {t.proofLabel}
              </span>
            </Reveal>
            <Reveal
              delay={100}
              as="h2"
              className="mt-6 max-w-3xl text-[clamp(1.75rem,4vw,3rem)] font-[700] leading-[1.05] tracking-[-0.03em]"
              style={{ color: "var(--text)" }}
            >
              {t.proofH.pre}
              <span style={{ color: "var(--text-faint)" }}>{t.proofH.dim}</span>
            </Reveal>

            <div
              className="mt-12 grid gap-[1px] sm:grid-cols-2"
              style={{ background: "var(--line-2)" }}
            >
              {t.proof.map((p, i) => (
                <Reveal key={p.tag} delay={i * 100}>
                  <Link
                    href={p.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block p-8 transition"
                    style={{ background: "var(--surface)" }}
                  >
                    <div
                      className="text-[10px] uppercase tracking-[0.32em]"
                      style={{ ...mono, color: "var(--text)" }}
                    >
                      {p.tag}
                    </div>
                    <div
                      className="mt-4 flex items-center gap-2 text-[18px] font-[600] tracking-[-0.01em]"
                      style={{ color: "var(--text)" }}
                    >
                      {p.label}
                      <span
                        className="transition group-hover:translate-x-1"
                        style={{ color: "var(--text-faint)" }}
                      >
                        →
                      </span>
                    </div>
                    <p
                      className="mt-3 text-[13px] leading-[1.7]"
                      style={{ color: "var(--text-mute)" }}
                    >
                      {p.note}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 8. CTA ──────────────────────────────────────── */}
        <section className="relative py-28 sm:py-40">
          <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
            <Reveal>
              <div className="flex justify-center opacity-90">
                <TwinShards heightEm={2.6} shimmer />
              </div>
            </Reveal>
            <Reveal
              delay={150}
              as="h2"
              className="mt-10 text-[clamp(2rem,5vw,3.5rem)] font-[800] leading-[1] tracking-[-0.035em]"
              style={{ color: "var(--text)" }}
            >
              {t.ctaH}
            </Reveal>
            <Reveal
              delay={280}
              as="p"
              className="mx-auto mt-5 max-w-lg text-[15px] leading-[1.7]"
              style={{ color: "var(--text-mute)" }}
            >
              {t.ctaBody}
            </Reveal>
            <Reveal delay={400}>
              <div className="mt-10 flex flex-wrap justify-center gap-3">
                <Link
                  href="https://algo.2137.dev"
                  className="rounded-sm px-7 py-3 text-[11px] font-[700] uppercase tracking-[0.22em] transition"
                  style={{
                    ...mono,
                    background: "var(--mark-bg)",
                    color: "var(--mark-text)",
                  }}
                >
                  {t.ctaOpen}
                </Link>
                <Link
                  href="https://algo.2137.dev/pitch"
                  className="rounded-sm border px-7 py-3 text-[11px] font-[500] uppercase tracking-[0.22em] transition"
                  style={{
                    ...mono,
                    borderColor: "var(--line-2)",
                    color: "var(--text-mute)",
                  }}
                >
                  {t.ctaPitch}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FOOTER ──────────────────────────────────────── */}
        <footer
          className="border-t py-10"
          style={{ borderColor: "var(--line)" }}
        >
          <div className="mx-auto max-w-6xl px-5 sm:px-8">
            <p
              className="mb-8 text-center text-[14px] leading-[1.6]"
              style={{ color: "var(--text-dim)" }}
            >
              {t.footerLine}
            </p>
            <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
              <div
                className="flex items-center gap-2 text-[10px] uppercase tracking-[0.3em]"
                style={{ ...mono, color: "var(--text-faint)" }}
              >
                <span>{t.footerBuiltBy}</span>
                <Link
                  href="https://2137.dev"
                  className="font-[500] transition"
                  style={{ color: "var(--text-mute)" }}
                >
                  2137.dev
                </Link>
              </div>
              <div
                className="flex items-center gap-6 text-[10px] uppercase tracking-[0.3em]"
                style={{ ...mono, color: "var(--text-faint)" }}
              >
                <Link
                  href="https://x.com/TwentyOne_37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition"
                >
                  X
                </Link>
                <Link
                  href="https://github.com/TwentyOne37"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition"
                >
                  GitHub
                </Link>
                <span style={{ color: "var(--text-ghost)" }}>
                  Colosseum Frontier · 2026
                </span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </main>
  );
}

function FakeBar({ w, bright }: { w: string; bright?: boolean }) {
  return (
    <div
      className={`h-[6px] rounded-full ${w}`}
      style={{
        background: bright
          ? "linear-gradient(to right, var(--text), var(--text-faint))"
          : "var(--line-2)",
      }}
    />
  );
}

import type { Lang } from "./ThemeLangContext";

type Milestone = {
  code: string;
  title: string;
  date: string;
  items: string[];
};

type Budget = { n: string; label: string; note: string };
type Proof = { tag: string; label: string; href: string; note: string };

export type Content = {
  navLabel: string;
  navCurrent: string;
  heroMeta: string[];
  heroTagline: { pre: string; end: string };
  heroScroll: { left: string; right: string };
  premiseLabel: string;
  premiseH: Array<{ text: string; tone: "mute" | "soft" | "loud" }>;
  premiseBody: { pre: string; link: string; suffix: string };
  fromToLabel: string;
  fromHead: string;
  fromSub: string;
  toHead: string;
  toSub: string;
  milestonesLabel: string;
  milestonesH: { pre: string; strong: string };
  milestones: Milestone[];
  kpiLabel: string;
  kpiAgents: string;
  kpiCalls: string;
  kpiWindow: string;
  kpiWhyLabel: string;
  kpiWhyBody: string;
  budgetLabel: string;
  budgetH: string;
  budgetBody: string;
  budget: Budget[];
  budgetFoot: string;
  proofLabel: string;
  proofH: { pre: string; dim: string };
  proof: Proof[];
  ctaH: string;
  ctaBody: string;
  ctaOpen: string;
  ctaPitch: string;
  footerLine: string;
  footerBuiltBy: string;
};

export const CONTENT: Record<Lang, Content> = {
  en: {
    navLabel: "Rebrand · v1",
    navCurrent: "Current →",
    heroMeta: ["Superteam Poland", "Solana Foundation", "Grant Proposal"],
    heroTagline: { pre: "Trade the breaks before they", end: "show." },
    heroScroll: { left: "Scroll", right: "Start at the premise" },
    premiseLabel: "The premise",
    premiseH: [
      { text: "Solana’s trading UX is ", tone: "loud" },
      { text: "bifurcated.", tone: "mute" },
      { text: " Humans click. Agents call APIs. ", tone: "loud" },
      { text: "Shard runs both", tone: "loud" },
      { text: " on one engine.", tone: "loud" },
    ],
    premiseBody: {
      pre:
        "The terminal and the x402 agent API share the same Rust core and the same sub-second market data. One brand. Two surfaces. Built solo and already live at ",
      link: "algo.2137.dev",
      suffix: ".",
    },
    fromToLabel: "From → To",
    fromHead: "algo.2137.dev",
    fromSub: "dev handle · subdomain · builder phase",
    toHead: "shard.trade",
    toSub: "@shardtrade · product · shipping",
    milestonesLabel: "What ships · all by May 11",
    milestonesH: {
      pre: "Three milestones. One deadline. ",
      strong: "Colosseum Frontier.",
    },
    milestones: [
      {
        code: "M1",
        title: "Rebrand",
        date: "Apr 30",
        items: [
          "shard.trade live, migrated from algo.2137.dev",
          "Brand identity shipped — wordmark, palette, typography",
          "@shardtrade secured on X, TG, GitHub org",
          "Landing page and pitch deck updated",
        ],
      },
      {
        code: "M2",
        title: "Multi-user beta",
        date: "May 4",
        items: [
          "Auth and per-user isolated state",
          "Signup to first paper trade in under 2 minutes",
          "≥10 real users trading on Shard",
          "Live on mainnet with analytics",
        ],
      },
      {
        code: "M3",
        title: "x402 API + SDK",
        date: "May 11",
        items: [
          "One production endpoint, metered via x402",
          "TypeScript SDK published open-source (MIT)",
          "Public example-bot repo",
          "Submitted to Colosseum Frontier (AI + Crypto)",
        ],
      },
    ],
    kpiLabel: "The bet · Primary KPI",
    kpiAgents: "agents",
    kpiCalls: "calls",
    kpiWindow: "within 7 days of API launch",
    kpiWhyLabel: "Why this metric",
    kpiWhyBody:
      "Autonomous agents executing x402-paid API calls against Shard’s mainnet endpoint. It’s the exact thesis of the grant — x402, agents, Solana — and it’s on-chain verifiable. Users can be faked. Paid calls from independent agents cannot.",
    budgetLabel: "What $10,000 unlocks",
    budgetH: "Where the grant goes.",
    budgetBody:
      "25% upfront unblocks the domain and Buildstation travel in week one. Milestone payouts cover infra, x402 integration, submission polish. Solo operator. Zero headcount burn.",
    budget: [
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
        note: "Helius gRPC credits, database, auth — support the first live cohort",
      },
      {
        n: "04",
        label: "x402 integration + SDK",
        note: "Dedicated week on the mainnet endpoint, SDK, and example bot",
      },
      {
        n: "05",
        label: "Colosseum submission polish",
        note: "Demo video, pitch deck final pass, public repo documentation",
      },
    ],
    budgetFoot:
      "Open-source scope: the x402 SDK, example-bot repo, and integration primitives ship under MIT. The terminal product, signal logic, and execution routing remain proprietary.",
    proofLabel: "Proof of work",
    proofH: { pre: "Built by a shipper, ", dim: "not a planner." },
    proof: [
      {
        tag: "Live product",
        label: "algo.2137.dev",
        href: "https://algo.2137.dev",
        note: "Real-time Solana DEX terminal. 10 Rust indicators, 6 timeframes, Helius gRPC, paper-to-live.",
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
        note: "7 years shipping — backend, Solana, Rust, real-time systems.",
      },
      {
        tag: "Updates",
        label: "x.com/TwentyOne_37",
        href: "https://x.com/TwentyOne_37",
        note: "Weekly build cadence — grant updates land here and on Superteam Discord.",
      },
    ],
    ctaH: "Ready when you are.",
    ctaBody:
      "Application submitted on Superteam Earn. Happy to jump on a call if anything needs polishing before review — or to walk through the product live.",
    ctaOpen: "Open the product",
    ctaPitch: "Pitch deck",
    footerLine:
      "Trading intelligence for humans. Signal infrastructure for AI agents.",
    footerBuiltBy: "Built by",
  },
  pl: {
    navLabel: "Rebrand · v1",
    navCurrent: "Obecny →",
    heroMeta: ["Superteam Poland", "Solana Foundation", "Wniosek o grant"],
    heroTagline: {
      pre: "Łap wybicia zanim",
      end: "zaświecą.",
    },
    heroScroll: { left: "Scroll", right: "Zacznij od tezy" },
    premiseLabel: "Teza",
    premiseH: [
      { text: "UX tradingu na Solanie jest ", tone: "loud" },
      { text: "rozdwojony.", tone: "mute" },
      { text: " Ludzie klikają. Agenci wołają API. ", tone: "loud" },
      { text: "Shard obsługuje oba", tone: "loud" },
      { text: " na jednym silniku.", tone: "loud" },
    ],
    premiseBody: {
      pre:
        "Terminal i API dla agentów x402 dzielą ten sam rdzeń w Rust i te same dane rynkowe sub-second. Jedna marka. Dwa interfejsy. Zbudowane solo, live na ",
      link: "algo.2137.dev",
      suffix: ".",
    },
    fromToLabel: "Z → Na",
    fromHead: "algo.2137.dev",
    fromSub: "dev handle · subdomena · faza buildera",
    toHead: "shard.trade",
    toSub: "@shardtrade · produkt · ship",
    milestonesLabel: "Co dowozimy · wszystko do 11 maja",
    milestonesH: {
      pre: "Trzy milestone’y. Jeden deadline. ",
      strong: "Colosseum Frontier.",
    },
    milestones: [
      {
        code: "M1",
        title: "Rebrand",
        date: "30 kwi",
        items: [
          "shard.trade live, migracja z algo.2137.dev",
          "Identyfikacja wizualna — wordmark, paleta, typografia",
          "@shardtrade zajęte na X, TG, GitHub org",
          "Landing i deck zaktualizowane",
        ],
      },
      {
        code: "M2",
        title: "Beta multi-user",
        date: "4 maja",
        items: [
          "Auth i izolowany stan per user",
          "Od signupu do pierwszego paper trade w < 2 min",
          "≥10 realnych userów tradujących na Shardzie",
          "Live na mainnecie z analytics",
        ],
      },
      {
        code: "M3",
        title: "x402 API + SDK",
        date: "11 maja",
        items: [
          "Jeden endpoint produkcyjny, metered przez x402",
          "SDK w TypeScript, open source (MIT)",
          "Publiczne repo example-bot",
          "Submisja do Colosseum Frontier (AI + Crypto)",
        ],
      },
    ],
    kpiLabel: "Zakład · Primary KPI",
    kpiAgents: "agentów",
    kpiCalls: "callów",
    kpiWindow: "w ciągu 7 dni od launchu API",
    kpiWhyLabel: "Dlaczego ta metryka",
    kpiWhyBody:
      "Autonomiczne agenty wywołujące x402-paid API endpoint Sharda na mainnecie. To dokładna teza grantu — x402, agenty, Solana — i jest weryfikowalna on-chain. Userów można nafejkować. Opłaconych callów z niezależnych agentów nie.",
    budgetLabel: "Co odblokowuje $10 000",
    budgetH: "Na co idzie grant.",
    budgetBody:
      "25% upfront odblokowuje domenę i wyjazd na Buildstation w pierwszym tygodniu. Wypłaty milestone’owe pokrywają infra, integrację x402, polish przed submisją. Solo operator. Zero kosztów headcountu.",
    budget: [
      {
        n: "01",
        label: "Domena + handle",
        note: "Zakup shard.trade i @shardtrade na X, Telegramie, GitHubie",
      },
      {
        n: "02",
        label: "Buildstation Warszawa",
        note: "IRL hackathon od Superteam — wspólny push do submisji",
      },
      {
        n: "03",
        label: "Infra na betę",
        note: "Kredyty Helius gRPC, baza, auth — pierwszy live cohort",
      },
      {
        n: "04",
        label: "Integracja x402 + SDK",
        note: "Tydzień dedykowany na mainnet endpoint, SDK i example-bota",
      },
      {
        n: "05",
        label: "Polish submisji na Colosseum",
        note: "Demo video, finalny pass decka, dokumentacja publicznego repo",
      },
    ],
    budgetFoot:
      "Zakres open source: SDK x402, repo example-bot oraz integration primitives na licencji MIT. Produkt terminalowy, logika sygnałów i routing egzekucji pozostają proprietary.",
    proofLabel: "Proof of work",
    proofH: { pre: "Zbudowane przez shippera, ", dim: "nie plannera." },
    proof: [
      {
        tag: "Live produkt",
        label: "algo.2137.dev",
        href: "https://algo.2137.dev",
        note: "Real-time terminal do Solany. 10 wskaźników w Rust, 6 timeframe’ów, Helius gRPC, paper-to-live.",
      },
      {
        tag: "Pitch deck",
        label: "algo.2137.dev/pitch",
        href: "https://algo.2137.dev/pitch",
        note: "Ten sam deck co na pitch contest Superteam Poland.",
      },
      {
        tag: "GitHub",
        label: "github.com/TwentyOne37",
        href: "https://github.com/TwentyOne37",
        note: "7 lat shipowania — backend, Solana, Rust, systemy real-time.",
      },
      {
        tag: "Updates",
        label: "x.com/TwentyOne_37",
        href: "https://x.com/TwentyOne_37",
        note: "Cotygodniowy build cadence — grant updates lądują tu i na Discordzie Superteam.",
      },
    ],
    ctaH: "Gotowe — wasza kolej.",
    ctaBody:
      "Aplikacja wysłana na Superteam Earn. Chętnie wskoczę na calla jeśli coś trzeba doszlifować przed review — albo przejdę przez produkt live.",
    ctaOpen: "Otwórz produkt",
    ctaPitch: "Pitch deck",
    footerLine:
      "Trading intelligence dla ludzi. Infra sygnałowa dla agentów AI.",
    footerBuiltBy: "Zbudowane przez",
  },
};

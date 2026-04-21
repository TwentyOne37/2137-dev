"use client";

import { useThemeLang } from "./ThemeLangContext";

export function ThemeToggle() {
  const { theme, toggleTheme } = useThemeLang();
  const isDark = theme === "dark";
  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex h-7 w-7 items-center justify-center rounded-full border transition"
      style={{
        borderColor: "var(--line-2)",
        color: "var(--text-mute)",
      }}
    >
      <svg viewBox="0 0 20 20" width="13" height="13" fill="none">
        {isDark ? (
          // moon
          <path
            d="M16 11.5A6 6 0 1 1 8.5 4a5 5 0 0 0 7.5 7.5z"
            fill="currentColor"
          />
        ) : (
          // sun
          <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round">
            <circle cx="10" cy="10" r="3.2" fill="currentColor" />
            <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.2 4.2l1.4 1.4M14.4 14.4l1.4 1.4M4.2 15.8l1.4-1.4M14.4 5.6l1.4-1.4" />
          </g>
        )}
      </svg>
    </button>
  );
}

export function LangToggle() {
  const { lang, setLang } = useThemeLang();
  return (
    <div
      className="inline-flex items-center rounded-full border text-[10px] font-[500] uppercase tracking-[0.22em]"
      style={{
        borderColor: "var(--line-2)",
        fontFamily: "JetBrains Mono, ui-monospace, monospace",
      }}
    >
      {(["en", "pl"] as const).map((l) => {
        const active = l === lang;
        return (
          <button
            key={l}
            onClick={() => setLang(l)}
            className="h-7 px-3 transition"
            style={{
              color: active ? "var(--text)" : "var(--text-faint)",
              background: active ? "var(--surface-2)" : "transparent",
              borderRadius: "9999px",
            }}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

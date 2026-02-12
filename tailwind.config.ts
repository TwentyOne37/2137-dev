import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', "Fira Code", "monospace"],
        sans: ['"Inter"', "system-ui", "sans-serif"],
      },
      colors: {
        accent: "#00ff88",
        "accent-dim": "#00cc6a",
        surface: "#111111",
        "surface-light": "#1a1a1a",
        "surface-border": "#222222",
        muted: "#666666",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
    },
  },
  plugins: [],
};

export default config;

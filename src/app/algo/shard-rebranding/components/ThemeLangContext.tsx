"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Theme = "dark" | "light";
export type Lang = "en" | "pl";

type Ctx = {
  theme: Theme;
  lang: Lang;
  toggleTheme: () => void;
  setLang: (l: Lang) => void;
  kremowkaTick: number;
};

const ThemeLangContext = createContext<Ctx | null>(null);

export function useThemeLang() {
  const ctx = useContext(ThemeLangContext);
  if (!ctx) throw new Error("useThemeLang outside provider");
  return ctx;
}

export function ThemeLangProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("dark");
  const [lang, setLangState] = useState<Lang>("en");
  const [kremowkaTick, setKremowkaTick] = useState(0);

  useEffect(() => {
    const t = (sessionStorage.getItem("shard_theme") as Theme) || "dark";
    const l = (sessionStorage.getItem("shard_lang") as Lang) || "en";
    setTheme(t);
    setLangState(l);
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      sessionStorage.setItem("shard_theme", next);
      return next;
    });
  }, []);

  const setLang = useCallback((l: Lang) => {
    setLangState((prev) => {
      if (prev !== l && l === "pl") {
        setKremowkaTick((k) => k + 1);
      }
      sessionStorage.setItem("shard_lang", l);
      return l;
    });
  }, []);

  const value = useMemo(
    () => ({ theme, lang, toggleTheme, setLang, kremowkaTick }),
    [theme, lang, toggleTheme, setLang, kremowkaTick]
  );

  return (
    <ThemeLangContext.Provider value={value}>
      {children}
    </ThemeLangContext.Provider>
  );
}

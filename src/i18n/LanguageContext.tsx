import { createContext, useCallback, useContext, useEffect, useMemo, useState, ReactNode } from "react";
import { translations, TranslationKey } from "./translations";

type Lang = "ar" | "en";

interface Ctx {
  lang: Lang;
  dir: "rtl" | "ltr";
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<Ctx | null>(null);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "ar");
  const dir: "rtl" | "ltr" = lang === "ar" ? "rtl" : "ltr";

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    localStorage.setItem("lang", lang);
  }, [lang, dir]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggle = useCallback(() => setLangState((p) => (p === "ar" ? "en" : "ar")), []);

  const t = useCallback(
    (key: TranslationKey) => {
      const entry = translations[key];
      if (!entry) return key;
      return entry[lang] ?? entry.en ?? key;
    },
    [lang]
  );

  const value = useMemo(() => ({ lang, dir, setLang, toggle, t }), [lang, dir, setLang, toggle, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

const fallbackCtx: Ctx = {
  lang: "ar",
  dir: "rtl",
  setLang: () => {},
  toggle: () => {},
  t: (key) => {
    const entry = translations[key];
    return entry?.ar ?? entry?.en ?? (key as string);
  },
};

export const useLang = (): Ctx => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    if (typeof console !== "undefined") {
      console.warn("useLang used outside LanguageProvider — using fallback context.");
    }
    return fallbackCtx;
  }
  return ctx;
};

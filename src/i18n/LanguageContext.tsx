import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { translations, type TranslationKey } from "./translations";

export type Lang = "ar" | "en";
export type Dir = "rtl" | "ltr";

export interface LanguageContextValue {
  lang: Lang;
  dir: Dir;
  setLang: (l: Lang) => void;
  toggle: () => void;
  t: (key: TranslationKey) => string;
}

const STORAGE_KEY = "lang";
const DEFAULT_LANG: Lang = "ar";

const isLang = (v: unknown): v is Lang => v === "ar" || v === "en";

const dirFor = (l: Lang): Dir => (l === "ar" ? "rtl" : "ltr");

const translate = (lang: Lang, key: TranslationKey): string => {
  const entry = translations[key];
  if (!entry) return key as string;
  return entry[lang] ?? entry.en ?? (key as string);
};

const readStoredLang = (): Lang => {
  if (typeof window === "undefined") return DEFAULT_LANG;
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    return isLang(stored) ? stored : DEFAULT_LANG;
  } catch {
    return DEFAULT_LANG;
  }
};

const fallbackContext: LanguageContextValue = {
  lang: DEFAULT_LANG,
  dir: dirFor(DEFAULT_LANG),
  setLang: () => {},
  toggle: () => {},
  t: (key) => translate(DEFAULT_LANG, key),
};

const LanguageContext = createContext<LanguageContextValue | null>(null);
LanguageContext.displayName = "LanguageContext";

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [lang, setLangState] = useState<Lang>(readStoredLang);
  const dir = dirFor(lang);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      /* ignore storage errors */
    }
  }, [lang, dir]);

  const setLang = useCallback<LanguageContextValue["setLang"]>((l) => {
    if (isLang(l)) setLangState(l);
  }, []);

  const toggle = useCallback<LanguageContextValue["toggle"]>(
    () => setLangState((p) => (p === "ar" ? "en" : "ar")),
    []
  );

  const t = useCallback<LanguageContextValue["t"]>(
    (key) => translate(lang, key),
    [lang]
  );

  const value = useMemo<LanguageContextValue>(
    () => ({ lang, dir, setLang, toggle, t }),
    [lang, dir, setLang, toggle, t]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLang = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    if (typeof console !== "undefined") {
      console.warn("useLang used outside LanguageProvider — using fallback context.");
    }
    return fallbackContext;
  }
  return ctx;
};

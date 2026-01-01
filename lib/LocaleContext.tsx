"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Locale, t, TranslationKey } from "./i18n";

interface LocaleContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    // Load saved locale or detect from browser
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved && (saved === "en" || saved === "ja")) {
      setLocaleState(saved);
    } else {
      // Detect browser language
      const browserLang = navigator.language.toLowerCase();
      if (browserLang.startsWith("ja")) {
        setLocaleState("ja");
      }
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    localStorage.setItem("locale", newLocale);
  };

  const translate = (key: TranslationKey) => t(locale, key);

  return (
    <LocaleContext.Provider value={{ locale, setLocale, t: translate }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within a LocaleProvider");
  }
  return context;
}

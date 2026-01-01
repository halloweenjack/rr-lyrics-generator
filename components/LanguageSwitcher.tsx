"use client";

import { useLocale } from "@/lib/LocaleContext";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div className="flex items-center gap-1 bg-zinc-800 rounded-lg p-1">
      <button
        onClick={() => setLocale("en")}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          locale === "en"
            ? "bg-zinc-600 text-white"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        EN
      </button>
      <button
        onClick={() => setLocale("ja")}
        className={`px-3 py-1 text-sm rounded-md transition-colors ${
          locale === "ja"
            ? "bg-zinc-600 text-white"
            : "text-zinc-400 hover:text-zinc-200"
        }`}
      >
        日本語
      </button>
    </div>
  );
}

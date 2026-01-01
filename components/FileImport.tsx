"use client";

import { useRef, useState } from "react";
import { TrackEntry, RRJson, ExtendedLyricsEntry } from "@/lib/types";
import { useLocale } from "@/lib/LocaleContext";

interface FileImportProps {
  onImport: (tracks: TrackEntry[]) => void;
}

function parseRRJson(json: RRJson): TrackEntry[] {
  return Object.entries(json).map(([filename, value]) => {
    if (typeof value === "string") {
      return {
        id: crypto.randomUUID(),
        filename,
        lyrics: value,
      };
    } else {
      const entry = value as ExtendedLyricsEntry;
      return {
        id: crypto.randomUUID(),
        filename,
        lyrics: entry.lyrics,
        lyricist: entry.lyricist,
        composer: entry.composer,
      };
    }
  });
}

export default function FileImport({ onImport }: FileImportProps) {
  const { t } = useLocale();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = async (file: File) => {
    setError(null);

    if (!file.name.endsWith(".rr.json") && !file.name.endsWith(".json")) {
      setError(t("import.error.invalid_format"));
      return;
    }

    try {
      const text = await file.text();
      const json = JSON.parse(text) as RRJson;

      if (typeof json !== "object" || json === null || Array.isArray(json)) {
        setError(t("import.error.invalid_json"));
        return;
      }

      const tracks = parseRRJson(json);

      if (tracks.length === 0) {
        setError(t("import.error.empty"));
        return;
      }

      onImport(tracks);
    } catch {
      setError(t("import.error.parse_failed"));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
    // Reset input so same file can be selected again
    e.target.value = "";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFile(file);
    }
  };

  return (
    <div className="space-y-2">
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
          isDragging
            ? "border-rose-500 bg-rose-500/10"
            : "border-zinc-700 hover:border-zinc-600"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,.rr.json"
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div className="flex items-center justify-center gap-3 text-zinc-400">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="text-sm">
            {t("import.dropzone")}{" "}
            <span className="text-rose-500 hover:text-rose-400">{t("import.browse")}</span>
          </span>
        </div>
      </div>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
}

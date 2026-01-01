"use client";

import { useState } from "react";
import { TrackEntry, RRJson, RRJsonValue, ExtendedLyricsEntry } from "@/lib/types";

interface PreviewProps {
  tracks: TrackEntry[];
}

export default function Preview({ tracks }: PreviewProps) {
  const [outputFilename, setOutputFilename] = useState("lyrics");
  const [copied, setCopied] = useState(false);

  const generateJson = (): RRJson => {
    const result: RRJson = {};
    for (const track of tracks) {
      // Use object format if lyricist or composer is present, otherwise simple string
      if (track.lyricist || track.composer) {
        const entry: ExtendedLyricsEntry = { lyrics: track.lyrics };
        if (track.lyricist) entry.lyricist = track.lyricist;
        if (track.composer) entry.composer = track.composer;
        result[track.filename] = entry;
      } else {
        result[track.filename] = track.lyrics;
      }
    }
    return result;
  };

  const jsonString = JSON.stringify(generateJson(), null, 2);

  const handleDownload = () => {
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${outputFilename || "lyrics"}.rr.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(jsonString);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label
          htmlFor="outputFilename"
          className="block text-sm font-medium text-zinc-300 mb-1"
        >
          Output Filename
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="outputFilename"
            value={outputFilename}
            onChange={(e) => setOutputFilename(e.target.value)}
            placeholder="lyrics"
            className="flex-1 px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <span className="text-zinc-400">.rr.json</span>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-zinc-300">Preview</h3>
          <button
            onClick={handleCopy}
            className="text-sm text-amber-500 hover:text-amber-400 transition-colors"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
        <pre className="p-4 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-zinc-300 overflow-x-auto max-h-64 overflow-y-auto">
          {tracks.length > 0 ? jsonString : "{}"}
        </pre>
      </div>

      <button
        onClick={handleDownload}
        disabled={tracks.length === 0}
        className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
        Download .rr.json
      </button>
    </div>
  );
}

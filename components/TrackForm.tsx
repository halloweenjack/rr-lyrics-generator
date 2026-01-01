"use client";

import { useState } from "react";
import { TrackEntry } from "@/lib/types";
import LyricsSearchLinks from "./LyricsSearchLinks";

interface TrackFormProps {
  onAdd: (track: TrackEntry) => void;
}

const EXTENSIONS = [".m4a", ".mp3", ".flac", ".wav", ".aiff"];

export default function TrackForm({ onAdd }: TrackFormProps) {
  const [trackNumber, setTrackNumber] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [extension, setExtension] = useState(".m4a");
  const [lyrics, setLyrics] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Generate filename from parts
  const generatedFilename = trackNumber && songTitle
    ? `${trackNumber.padStart(2, "0")} - ${songTitle}${extension}`
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedFilename || !lyrics.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      filename: generatedFilename,
      lyrics: lyrics.trim(),
    });

    setTrackNumber("");
    setSongTitle("");
    setLyrics("");
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-[80px_1fr_100px] gap-2">
        <div>
          <label
            htmlFor="trackNumber"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Track #
          </label>
          <input
            type="text"
            id="trackNumber"
            value={trackNumber}
            onChange={(e) => setTrackNumber(e.target.value.replace(/\D/g, "").slice(0, 2))}
            placeholder="01"
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-center"
          />
        </div>
        <div>
          <label
            htmlFor="songTitle"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Song Title
          </label>
          <input
            type="text"
            id="songTitle"
            value={songTitle}
            onChange={(e) => {
              setSongTitle(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Unleash!!!!!"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="extension"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Format
          </label>
          <select
            id="extension"
            value={extension}
            onChange={(e) => setExtension(e.target.value)}
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          >
            {EXTENSIONS.map((ext) => (
              <option key={ext} value={ext}>
                {ext}
              </option>
            ))}
          </select>
        </div>
      </div>

      {generatedFilename && (
        <div className="px-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
          <span className="text-xs text-zinc-500">Filename: </span>
          <span className="text-sm text-amber-400 font-mono">{generatedFilename}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-zinc-300 mb-1"
        >
          Search Lyrics (optional)
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Song title or artist name"
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
        {searchQuery && <LyricsSearchLinks query={searchQuery} />}
      </div>

      <div>
        <label
          htmlFor="lyrics"
          className="block text-sm font-medium text-zinc-300 mb-1"
        >
          Lyrics
        </label>
        <textarea
          id="lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Paste lyrics here..."
          rows={8}
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-y"
        />
      </div>

      <button
        type="submit"
        disabled={!generatedFilename || !lyrics.trim()}
        className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium rounded-lg transition-colors"
      >
        Add Track
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { TrackEntry } from "@/lib/types";
import LyricsSearchLinks from "./LyricsSearchLinks";

interface TrackFormProps {
  onAdd: (track: TrackEntry) => void;
}

export default function TrackForm({ onAdd }: TrackFormProps) {
  const [filename, setFilename] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!filename.trim() || !lyrics.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      filename: filename.trim(),
      lyrics: lyrics.trim(),
    });

    setFilename("");
    setLyrics("");
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="filename"
          className="block text-sm font-medium text-zinc-300 mb-1"
        >
          Filename
        </label>
        <input
          type="text"
          id="filename"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
          placeholder="01 - Song Title.m4a"
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
        />
      </div>

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
        disabled={!filename.trim() || !lyrics.trim()}
        className="w-full py-3 px-4 bg-amber-600 hover:bg-amber-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium rounded-lg transition-colors"
      >
        Add Track
      </button>
    </form>
  );
}

"use client";

import { useState } from "react";
import { TrackEntry } from "@/lib/types";
import LyricsSearchLinks from "./LyricsSearchLinks";

interface TrackFormProps {
  onAdd: (track: TrackEntry) => void;
}

export default function TrackForm({ onAdd }: TrackFormProps) {
  const [trackNumber, setTrackNumber] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [lyricist, setLyricist] = useState("");
  const [composer, setComposer] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Generate filename from parts (only track number is required for matching)
  const generatedFilename = trackNumber
    ? songTitle
      ? `${trackNumber.padStart(2, "0")} - ${songTitle}`
      : trackNumber.padStart(2, "0")
    : "";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedFilename || !lyrics.trim()) return;

    onAdd({
      id: crypto.randomUUID(),
      filename: generatedFilename,
      lyrics: lyrics.trim(),
      lyricist: lyricist.trim() || undefined,
      composer: composer.trim() || undefined,
    });

    setTrackNumber("");
    setSongTitle("");
    setLyrics("");
    setLyricist("");
    setComposer("");
    setSearchQuery("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-[80px_1fr] gap-2">
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
            Song Title <span className="text-zinc-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="songTitle"
            value={songTitle}
            onChange={(e) => {
              setSongTitle(e.target.value);
              setSearchQuery(e.target.value);
            }}
            placeholder="Title"
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
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

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label
            htmlFor="lyricist"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Lyricist <span className="text-zinc-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="lyricist"
            value={lyricist}
            onChange={(e) => setLyricist(e.target.value)}
            placeholder="Lyrics by..."
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="composer"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            Composer <span className="text-zinc-500 font-normal">(optional)</span>
          </label>
          <input
            type="text"
            id="composer"
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
            placeholder="Music by..."
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
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

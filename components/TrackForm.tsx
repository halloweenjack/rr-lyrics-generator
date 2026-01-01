"use client";

import { useState, useEffect } from "react";
import { TrackEntry } from "@/lib/types";
import { useLocale } from "@/lib/LocaleContext";
import LyricsSearchLinks from "./LyricsSearchLinks";

interface TrackFormProps {
  onAdd: (track: TrackEntry) => void;
  onUpdate: (track: TrackEntry) => void;
  onCancelEdit: () => void;
  editingTrack?: TrackEntry;
}

// Parse filename to extract track number and song title
function parseFilename(filename: string): { trackNumber: string; songTitle: string } {
  const match = filename.match(/^(\d+)\s*[-–]\s*(.+)$/);
  if (match) {
    return { trackNumber: match[1], songTitle: match[2] };
  }
  const numMatch = filename.match(/^(\d+)$/);
  if (numMatch) {
    return { trackNumber: numMatch[1], songTitle: "" };
  }
  return { trackNumber: "", songTitle: filename };
}

export default function TrackForm({ onAdd, onUpdate, onCancelEdit, editingTrack }: TrackFormProps) {
  const { t } = useLocale();
  const [trackNumber, setTrackNumber] = useState("");
  const [songTitle, setSongTitle] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [lyricist, setLyricist] = useState("");
  const [composer, setComposer] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Populate form when editingTrack changes
  useEffect(() => {
    if (editingTrack) {
      const { trackNumber: num, songTitle: title } = parseFilename(editingTrack.filename);
      setTrackNumber(num);
      setSongTitle(title);
      setLyrics(editingTrack.lyrics);
      setLyricist(editingTrack.lyricist || "");
      setComposer(editingTrack.composer || "");
      setSearchQuery(title);
    }
  }, [editingTrack]);

  // Generate filename from parts (only track number is required for matching)
  const generatedFilename = trackNumber
    ? songTitle
      ? `${trackNumber.padStart(2, "0")} - ${songTitle}`
      : trackNumber.padStart(2, "0")
    : "";

  const clearForm = () => {
    setTrackNumber("");
    setSongTitle("");
    setLyrics("");
    setLyricist("");
    setComposer("");
    setSearchQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!generatedFilename || !lyrics.trim()) return;

    if (editingTrack) {
      onUpdate({
        id: editingTrack.id,
        filename: generatedFilename,
        lyrics: lyrics.trim(),
        lyricist: lyricist.trim() || undefined,
        composer: composer.trim() || undefined,
      });
    } else {
      onAdd({
        id: crypto.randomUUID(),
        filename: generatedFilename,
        lyrics: lyrics.trim(),
        lyricist: lyricist.trim() || undefined,
        composer: composer.trim() || undefined,
      });
    }

    clearForm();
  };

  const handleCancel = () => {
    clearForm();
    onCancelEdit();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-[80px_1fr] gap-2">
        <div>
          <label
            htmlFor="trackNumber"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            {t("form.track_number")}
          </label>
          <input
            type="text"
            id="trackNumber"
            value={trackNumber}
            onChange={(e) => setTrackNumber(e.target.value.replace(/\D/g, "").slice(0, 2))}
            placeholder="01"
            className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent text-center"
          />
        </div>
        <div>
          <label
            htmlFor="songTitle"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            {t("form.song_title")} <span className="text-zinc-500 font-normal">{t("form.optional")}</span>
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
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
      </div>

      {generatedFilename && (
        <div className="px-3 py-2 bg-zinc-800/50 rounded-lg border border-zinc-700/50">
          <span className="text-xs text-zinc-500">{t("form.filename")} </span>
          <span className="text-sm text-rose-400 font-mono">{generatedFilename}</span>
        </div>
      )}

      <div>
        <label
          htmlFor="search"
          className="block text-sm font-medium text-zinc-300 mb-1"
        >
          {t("form.search_lyrics")}
        </label>
        <input
          type="text"
          id="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={t("form.search_placeholder")}
          className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
        />
        {searchQuery && <LyricsSearchLinks query={searchQuery} />}
      </div>

      <div>
        <label
          htmlFor="lyrics"
          className="block text-sm font-medium text-zinc-300 mb-1"
        >
          {t("form.lyrics")}
        </label>
        <textarea
          id="lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder={t("form.lyrics_placeholder")}
          rows={8}
          className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent resize-y"
        />
      </div>

      <div className="grid grid-cols-2 gap-2">
        <div>
          <label
            htmlFor="lyricist"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            {t("form.lyricist")} <span className="text-zinc-500 font-normal">{t("form.optional")}</span>
          </label>
          <input
            type="text"
            id="lyricist"
            value={lyricist}
            onChange={(e) => setLyricist(e.target.value)}
            placeholder={t("form.lyricist_placeholder")}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
        <div>
          <label
            htmlFor="composer"
            className="block text-sm font-medium text-zinc-300 mb-1"
          >
            {t("form.composer")} <span className="text-zinc-500 font-normal">{t("form.optional")}</span>
          </label>
          <input
            type="text"
            id="composer"
            value={composer}
            onChange={(e) => setComposer(e.target.value)}
            placeholder={t("form.composer_placeholder")}
            className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className={editingTrack ? "grid grid-cols-2 gap-2" : ""}>
        {editingTrack && (
          <button
            type="button"
            onClick={handleCancel}
            className="w-full py-3 px-4 bg-zinc-700 hover:bg-zinc-600 text-white font-medium rounded-lg transition-colors"
          >
            {t("form.button.cancel")}
          </button>
        )}
        <button
          type="submit"
          disabled={!generatedFilename || !lyrics.trim()}
          className="w-full py-3 px-4 bg-rose-600 hover:bg-rose-500 disabled:bg-zinc-700 disabled:text-zinc-500 text-white font-medium rounded-lg transition-colors"
        >
          {editingTrack ? t("form.button.update") : t("form.button.add")}
        </button>
      </div>
    </form>
  );
}

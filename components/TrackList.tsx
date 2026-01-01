"use client";

import { useState } from "react";
import { TrackEntry } from "@/lib/types";
import { useLocale } from "@/lib/LocaleContext";

interface TrackListProps {
  tracks: TrackEntry[];
  onRemove: (id: string) => void;
  onEdit: (track: TrackEntry) => void;
  onReorder: (fromIndex: number, toIndex: number) => void;
  editingId?: string;
}

export default function TrackList({ tracks, onRemove, onEdit, onReorder, editingId }: TrackListProps) {
  const { t } = useLocale();
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  if (tracks.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        <p>{t("list.empty")}</p>
        <p className="text-sm mt-1">{t("list.empty_hint")}</p>
      </div>
    );
  }

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDragOverIndex(index);
  };

  const handleDragLeave = () => {
    setDragOverIndex(null);
  };

  const handleDrop = (e: React.DragEvent, toIndex: number) => {
    e.preventDefault();
    const fromIndex = draggedIndex;
    if (fromIndex !== null && fromIndex !== toIndex) {
      onReorder(fromIndex, toIndex);
    }
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-zinc-400 mb-3">
        {t("list.title")} ({tracks.length})
      </h3>
      <ul className="space-y-2">
        {tracks.map((track, index) => (
          <li
            key={track.id}
            draggable
            onDragStart={(e) => handleDragStart(e, index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, index)}
            onDragEnd={handleDragEnd}
            className={`flex items-center gap-2 px-3 py-3 rounded-lg border transition-all ${
              draggedIndex === index
                ? "opacity-50 scale-95"
                : dragOverIndex === index
                ? "border-rose-500 bg-rose-500/10"
                : editingId === track.id
                ? "bg-rose-900/30 border-rose-600"
                : "bg-zinc-800 border-zinc-700 hover:border-zinc-600"
            }`}
          >
            {/* Drag Handle */}
            <div className="flex-shrink-0 cursor-grab active:cursor-grabbing text-zinc-500 hover:text-zinc-300">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M7 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 2zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 7 14zm6-8a2 2 0 1 0-.001-4.001A2 2 0 0 0 13 6zm0 2a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 8zm0 6a2 2 0 1 0 .001 4.001A2 2 0 0 0 13 14z" />
              </svg>
            </div>

            {/* Track Info */}
            <div
              className="flex-1 min-w-0 cursor-pointer"
              onClick={() => onEdit(track)}
            >
              <p className="text-white font-medium truncate">{track.filename}</p>
              <p className="text-zinc-500 text-sm truncate">
                {track.lyrics.substring(0, 50)}
                {track.lyrics.length > 50 ? "..." : ""}
              </p>
            </div>

            {/* Delete Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(track.id);
              }}
              className="flex-shrink-0 p-2 text-zinc-500 hover:text-red-400 transition-colors"
              aria-label="Remove track"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

"use client";

import { TrackEntry } from "@/lib/types";

interface TrackListProps {
  tracks: TrackEntry[];
  onRemove: (id: string) => void;
  onEdit: (track: TrackEntry) => void;
  editingId?: string;
}

export default function TrackList({ tracks, onRemove, onEdit, editingId }: TrackListProps) {
  if (tracks.length === 0) {
    return (
      <div className="text-center py-8 text-zinc-500">
        <p>No tracks added yet.</p>
        <p className="text-sm mt-1">Add a track using the form above.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium text-zinc-400 mb-3">
        Added Tracks ({tracks.length})
      </h3>
      <ul className="space-y-2">
        {tracks.map((track) => (
          <li
            key={track.id}
            className={`flex items-center justify-between px-4 py-3 rounded-lg border cursor-pointer transition-colors ${
              editingId === track.id
                ? "bg-amber-900/30 border-amber-600"
                : "bg-zinc-800 border-zinc-700 hover:border-zinc-600"
            }`}
            onClick={() => onEdit(track)}
          >
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium truncate">{track.filename}</p>
              <p className="text-zinc-500 text-sm truncate">
                {track.lyrics.substring(0, 50)}
                {track.lyrics.length > 50 ? "..." : ""}
              </p>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemove(track.id);
              }}
              className="ml-4 p-2 text-zinc-500 hover:text-red-400 transition-colors"
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

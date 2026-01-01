"use client";

import { useState } from "react";
import { TrackEntry } from "@/lib/types";
import { useLocale } from "@/lib/LocaleContext";
import TrackForm from "@/components/TrackForm";
import TrackList from "@/components/TrackList";
import Preview from "@/components/Preview";
import FileImport from "@/components/FileImport";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function Home() {
  const { t } = useLocale();
  const [tracks, setTracks] = useState<TrackEntry[]>([]);
  const [editingTrack, setEditingTrack] = useState<TrackEntry | undefined>(undefined);

  const handleAddTrack = (track: TrackEntry) => {
    setTracks((prev) => [...prev, track]);
  };

  const handleUpdateTrack = (track: TrackEntry) => {
    setTracks((prev) => prev.map((t) => (t.id === track.id ? track : t)));
    setEditingTrack(undefined);
  };

  const handleRemoveTrack = (id: string) => {
    setTracks((prev) => prev.filter((t) => t.id !== id));
    if (editingTrack?.id === id) {
      setEditingTrack(undefined);
    }
  };

  const handleEditTrack = (track: TrackEntry) => {
    setEditingTrack(track);
  };

  const handleCancelEdit = () => {
    setEditingTrack(undefined);
  };

  const handleImportTracks = (importedTracks: TrackEntry[]) => {
    setTracks((prev) => [...prev, ...importedTracks]);
  };

  const handleReorderTracks = (fromIndex: number, toIndex: number) => {
    setTracks((prev) => {
      const newTracks = [...prev];
      const [movedTrack] = newTracks.splice(fromIndex, 1);
      newTracks.splice(toIndex, 0, movedTrack);
      return newTracks;
    });
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-4">
                <h1 className="text-2xl font-bold text-white">
                  {t("app.title")}
                </h1>
                <LanguageSwitcher />
              </div>
              <p className="text-zinc-400 mt-1">
                {t("app.subtitle")}
              </p>
            </div>
            <div className="flex-shrink-0 w-64">
              <FileImport onImport={handleImportTracks} />
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left: Add/Edit Track Form */}
          <section>
            <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
              <h2 className="text-lg font-semibold text-white mb-4">
                {editingTrack ? t("form.title.edit") : t("form.title.add")}
              </h2>
              <TrackForm
                onAdd={handleAddTrack}
                onUpdate={handleUpdateTrack}
                onCancelEdit={handleCancelEdit}
                editingTrack={editingTrack}
                tracks={tracks}
              />
            </div>
          </section>

          {/* Middle: Track List */}
          <section>
            <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 sticky top-8">
              <TrackList
                tracks={tracks}
                onRemove={handleRemoveTrack}
                onEdit={handleEditTrack}
                onReorder={handleReorderTracks}
                editingId={editingTrack?.id}
              />
            </div>
          </section>

          {/* Right: Preview & Download */}
          <section>
            <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 sticky top-8">
              <h2 className="text-lg font-semibold text-white mb-4">
                {t("preview.title")}
              </h2>
              <Preview tracks={tracks} />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-7xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
          <p>
            {t("footer.prefix")}{t("footer.prefix") ? " " : ""}
            <a
              href="https://github.com/kat/Record-Rack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-rose-500 hover:text-rose-400"
            >
              Record Rack
            </a>{" "}
            {t("footer.suffix")}
          </p>
        </div>
      </footer>
    </div>
  );
}

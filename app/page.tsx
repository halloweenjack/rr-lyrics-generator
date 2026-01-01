"use client";

import { useState } from "react";
import { TrackEntry } from "@/lib/types";
import TrackForm from "@/components/TrackForm";
import TrackList from "@/components/TrackList";
import Preview from "@/components/Preview";

export default function Home() {
  const [tracks, setTracks] = useState<TrackEntry[]>([]);

  const handleAddTrack = (track: TrackEntry) => {
    setTracks((prev) => [...prev, track]);
  };

  const handleRemoveTrack = (id: string) => {
    setTracks((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <div className="min-h-screen bg-zinc-950">
      <header className="border-b border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-white">
            Record Rack Lyrics Generator
          </h1>
          <p className="text-zinc-400 mt-1">
            Create .rr.json lyrics files for Record Rack
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-6">
            <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
              <h2 className="text-lg font-semibold text-white mb-4">
                Add Track
              </h2>
              <TrackForm onAdd={handleAddTrack} />
            </div>

            <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800">
              <TrackList tracks={tracks} onRemove={handleRemoveTrack} />
            </div>
          </section>

          <section>
            <div className="p-6 bg-zinc-900 rounded-xl border border-zinc-800 sticky top-8">
              <h2 className="text-lg font-semibold text-white mb-4">
                Output
              </h2>
              <Preview tracks={tracks} />
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-zinc-800 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-zinc-500 text-sm">
          <p>
            For use with{" "}
            <a
              href="https://github.com/kat/Record-Rack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-500 hover:text-amber-400"
            >
              Record Rack
            </a>{" "}
            iOS app
          </p>
        </div>
      </footer>
    </div>
  );
}

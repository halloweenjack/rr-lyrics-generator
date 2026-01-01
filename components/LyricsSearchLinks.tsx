"use client";

interface LyricsSearchLinksProps {
  query: string;
}

const SEARCH_SITES = [
  {
    name: "Genius",
    url: (q: string) =>
      `https://genius.com/search?q=${encodeURIComponent(q)}`,
    icon: "G",
  },
  {
    name: "Uta-Net",
    url: (q: string) =>
      `https://www.uta-net.com/search/?Keyword=${encodeURIComponent(q)}&Aession=ON&TitleSession=ON&Title=${encodeURIComponent(q)}`,
    icon: "U",
  },
  {
    name: "Kashi",
    url: (q: string) =>
      `https://www.kget.jp/search/index.php?c=0&t=&r=&v=${encodeURIComponent(q)}`,
    icon: "K",
  },
  {
    name: "Google",
    url: (q: string) =>
      `https://www.google.com/search?q=${encodeURIComponent(q + " lyrics")}`,
    icon: "G",
  },
];

export default function LyricsSearchLinks({ query }: LyricsSearchLinksProps) {
  if (!query.trim()) return null;

  return (
    <div className="mt-2 flex flex-wrap gap-2">
      {SEARCH_SITES.map((site) => (
        <a
          key={site.name}
          href={site.url(query)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-200 text-sm rounded-full transition-colors"
        >
          <span className="w-5 h-5 flex items-center justify-center bg-zinc-600 rounded-full text-xs font-bold">
            {site.icon}
          </span>
          {site.name}
        </a>
      ))}
    </div>
  );
}

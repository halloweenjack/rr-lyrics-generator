export interface TrackEntry {
  id: string;
  filename: string;
  lyrics: string;
  lyricist?: string;
  composer?: string;
}

// JSON format types for import/export
export interface ExtendedLyricsEntry {
  lyrics: string;
  lyricist?: string;
  composer?: string;
}

export type RRJsonValue = string | ExtendedLyricsEntry;

export interface RRJson {
  [filename: string]: RRJsonValue;
}

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

export interface MetaInfo {
  notes?: string;
}

export type RRJsonValue = string | ExtendedLyricsEntry;

export interface RRJson {
  _meta?: MetaInfo;
  [filename: string]: RRJsonValue | MetaInfo | undefined;
}

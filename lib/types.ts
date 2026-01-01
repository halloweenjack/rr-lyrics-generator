export interface TrackEntry {
  id: string;
  filename: string;
  lyrics: string;
}

export interface RRJson {
  [filename: string]: string;
}

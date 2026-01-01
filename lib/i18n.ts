export type Locale = "en" | "ja";

export const translations = {
  en: {
    // Header
    "app.title": "Record Rack Lyrics Generator",
    "app.subtitle": "Create .rr.json lyrics files for Record Rack",

    // FileImport
    "import.dropzone": "Drop .rr.json file here or",
    "import.browse": "browse",
    "import.error.invalid_format": "Please select a .rr.json file",
    "import.error.invalid_json": "Invalid JSON format. Expected an object.",
    "import.error.empty": "No tracks found in the file.",
    "import.error.parse_failed": "Failed to parse JSON file.",

    // TrackForm
    "form.title.add": "Add Track",
    "form.title.edit": "Edit Track",
    "form.track_number": "Track #",
    "form.song_title": "Song Title",
    "form.optional": "(optional)",
    "form.filename": "Filename:",
    "form.search_lyrics": "Search Lyrics (optional)",
    "form.search_placeholder": "Song title or artist name",
    "form.lyrics": "Lyrics",
    "form.lyrics_placeholder": "Paste lyrics here...",
    "form.lyricist": "Lyricist",
    "form.lyricist_placeholder": "Lyrics by...",
    "form.composer": "Composer",
    "form.composer_placeholder": "Music by...",
    "form.button.add": "Add Track",
    "form.button.update": "Update Track",
    "form.button.cancel": "Cancel",

    // TrackList
    "list.title": "Added Tracks",
    "list.empty": "No tracks added yet.",
    "list.empty_hint": "Add a track using the form above.",

    // Preview
    "preview.title": "Output",
    "preview.filename": "Output Filename",
    "preview.section": "Preview",
    "preview.copy": "Copy",
    "preview.copied": "Copied!",
    "preview.download": "Download .rr.json",

    // Footer
    "footer.prefix": "For use with",
    "footer.suffix": "iOS app",
  },
  ja: {
    // Header
    "app.title": "Record Rack 歌詞ジェネレーター",
    "app.subtitle": "Record Rack用の.rr.json歌詞ファイルを作成",

    // FileImport
    "import.dropzone": ".rr.jsonファイルをドロップ、または",
    "import.browse": "選択",
    "import.error.invalid_format": ".rr.jsonファイルを選択してください",
    "import.error.invalid_json": "無効なJSON形式です。オブジェクト形式が必要です。",
    "import.error.empty": "ファイルにトラックが見つかりません。",
    "import.error.parse_failed": "JSONファイルの解析に失敗しました。",

    // TrackForm
    "form.title.add": "トラック追加",
    "form.title.edit": "トラック編集",
    "form.track_number": "トラック#",
    "form.song_title": "曲名",
    "form.optional": "（任意）",
    "form.filename": "ファイル名:",
    "form.search_lyrics": "歌詞検索（任意）",
    "form.search_placeholder": "曲名またはアーティスト名",
    "form.lyrics": "歌詞",
    "form.lyrics_placeholder": "歌詞をペースト...",
    "form.lyricist": "作詞",
    "form.lyricist_placeholder": "作詞者...",
    "form.composer": "作曲",
    "form.composer_placeholder": "作曲者...",
    "form.button.add": "追加",
    "form.button.update": "更新",
    "form.button.cancel": "キャンセル",

    // TrackList
    "list.title": "追加済みトラック",
    "list.empty": "トラックがありません。",
    "list.empty_hint": "上のフォームからトラックを追加してください。",

    // Preview
    "preview.title": "出力",
    "preview.filename": "出力ファイル名",
    "preview.section": "プレビュー",
    "preview.copy": "コピー",
    "preview.copied": "コピー完了",
    "preview.download": ".rr.jsonをダウンロード",

    // Footer
    "footer.prefix": "For use with",
    "footer.suffix": "iOS app",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale][key] || translations.en[key] || key;
}

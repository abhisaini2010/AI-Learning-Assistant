export interface NotesData {
  summary: string;
  detailed: string;
  mcqs: string;
  interview: string;
  flashcards: string;
}
export interface SavedNote {
  topic: string;
  notes: NotesData;
}

export type TabType =
  | "summary"
  | "detailed"
  | "mcqs"
  | "interview"
  | "flashcards";
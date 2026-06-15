import type { NotesData } from "../types/notes";

export const parseNotes = (
  text: string
): NotesData => {
  const summary =
    text.split("## Summary")[1]  // split() cuts a string wherever it finds the specified text,gets everything after: ##Summary
      ?.split("## Detailed Notes")[0] || ""; //then,stops before next section,here we will get only summary content

  const detailed =
    text.split("## Detailed Notes")[1]
      ?.split("## MCQs")[0] || "";

  const mcqs =
    text.split("## MCQs")[1]
      ?.split("## Interview Questions")[0] || "";

  const interview =
    text.split("## Interview Questions")[1]
      ?.split("## Flashcards")[0] || "";

  const flashcards =
    text.split("## Flashcards")[1] || "";

  return {
    summary:summary.trim(),
    detailed: detailed.trim(),
    mcqs: mcqs.trim(),
    interview: interview.trim(),
    flashcards: flashcards.trim(),
  };
};
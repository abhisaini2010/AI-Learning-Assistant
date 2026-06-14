import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

export const generateNotes = async (
  topic: string
) => {
  const response =
    await ai.models.generateContent({
      model: "gemini-2.5-flash",
    contents: `
Generate study notes on ${topic}.


Follow EXACTLY this structure:

## Summary
Write a concise summary.

## Detailed Notes
Provide detailed explanation.

## MCQs
Generate 5 MCQs with answers.

## Interview Questions
Generate 5 interview questions with answers.

## Flashcards
Generate 5 flashcards.

Do not skip any section.
`,
  });

  return response.text || "";
}
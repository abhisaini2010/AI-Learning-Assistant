import { GoogleGenAI } from "@google/genai";

// Create AI Client
const ai = new GoogleGenAI({     // This authenticates you ,think of it like (Username + Password)   through this GoogleGenAI Client is connected to Gemini Server,and ai becomes your conection to Gemini
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,  
});

export const generateNotes = async (
  topic: string
) => {
  const response =
    await ai.models.generateContent({   // mode and contents is the configuration sent to Gemini,generateContent() is the method that tells Gemini.
      model: "gemini-2.5-flash",     //  Here why structure matters   because without structure AI may return tandom content.

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

  return response.text || "";   ///After gemini generates content it returns a response object  and in that response we want text content , here "" is necesary because if gemini fails to provide any text then in that case also we have to return a string even though its empty because our parseNotes() expects (texts: string) and uses text.split(...) which only works on strings .
}
// without "" if we get no content from gemini then in return of that function we will have undefined as response.text and in parseNotes(undefined) can cause errors like [Cannot read properties of udefined],because inside parseNotes we do text.split(...) and undefined.split() is invalid
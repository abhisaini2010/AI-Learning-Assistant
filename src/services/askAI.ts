import { GoogleGenerativeAI }
from "@google/generative-ai";

const genAI =
  new GoogleGenerativeAI(
    import.meta.env.VITE_GEMINI_API_KEY
  );

export const askAI = async (
  topic: string,
  question: string
) => {
  const model =
    genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

  const result =
  await model.generateContent(`
You are a programming teacher.

Topic:
${topic}

Question:
${question}

Answer in proper Markdown format.

Rules:
- Use headings (#, ##, ###)
- Use bullet points
- Use code blocks when needed
- Use examples
- Keep sections short and readable
- Do NOT write everything in one paragraph

Example format:

# Concept Name

## What is it?

Explanation...

## Example

\`\`\`js
const example = true;
\`\`\`

## Real World Use Case

Explanation...
`);

  return result.response.text(); // text() is a method provided by Gemini SDK , which extracts the text from the response and returns it as a string
};

// The project currently uses two different Gemini SDKs. The older @google/generative-ai SDK returns a response object where the generated text is accessed through result.response.text(), while the newer @google/genai SDK exposes the generated content directly through the text property. That's why the extraction logic is different in the two files."
import { useState } from "react";
import { askAI } from "../services/askAI";
import ReactMarkdown from "react-markdown";

interface Props {
  topic: string;
  darkMode:boolean;
}

const AskAI = ({
  topic,darkMode,
}: Props) => {
  const [question, setQuestion] =useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

const handleAsk = async () => {

  if (!question.trim())
    return;

  try {

    setLoading(true);

    const result =
      await askAI(
        topic,
        question
      );
console.log(result);
    setAnswer(result);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

 return (
  <div
    className={`
      mt-8
      p-6
      rounded-2xl
      border
      shadow-lg
    ${
      darkMode ? "bg-slate-800 border-slate-700 text-white" : "bg-white border-slate-200 text-black"
    }`}
  >
    <h2
      className="
        text-xl
        font-semibold
        mb-4
      "
    >
      Ask AI About This Topic
    </h2>

    <textarea
      value={question}
      onChange={(e) =>
        setQuestion(
          e.target.value
        )
      }
      placeholder="
Ask anything about this topic...
"
      className={`
  w-full
  border
  rounded-xl
  p-4
  min-h-[120px]
  placeholder:text-slate-400
  ${
    darkMode
      ? "bg-slate-900 text-white border-slate-700"
      : "bg-white text-black border-slate-300"
  }
`}
    />

    <button
      onClick={handleAsk}
      disabled={loading}
      className="
        mt-4
        px-5
        py-3
        bg-indigo-600
        text-white
        rounded-xl
      "
    >
      {loading
        ? "Thinking..."
        : "Ask AI"}
    </button>

    {answer && (
      <div
  className={`
    mt-6
    p-4
    rounded-xl
    ${
      darkMode
        ? "bg-slate-900 border border-slate-700"
        : "bg-slate-50"
    }
  `}
>
        <h3
          className="
            font-semibold
            mb-2
          "
        >
          Answer
        </h3>
<div  className="
    prose
    max-w-none
    dark:prose-invert
  " >
     <ReactMarkdown
  components={{
    h1: ({ children }) => (
  <h1
    className={`
      text-3xl
      font-bold
      mb-4
      ${
        darkMode
          ? "text-white"
          : "text-slate-900"
      }
    `}
  >
    {children}
  </h1>
),
    h2: ({ children }) => (
      <h2 className={`
      text-3xl
      font-bold
      mb-4
      ${
        darkMode
          ? "text-white"
          : "text-slate-900"
      }
    `}>
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className={`
      text-3xl
      font-bold
      mb-4
      ${
        darkMode
          ? "text-white"
          : "text-slate-900"
      }
    `}>
        {children}
      </h3>
    ),
   p: ({ children }) => (
  <p
    className={`
      mb-3
      leading-7
      ${
        darkMode
          ? "text-slate-200"
          : "text-slate-800"
      }
    `}
  >
    {children}
  </p>
),
    ul: ({ children }) => (
  <ul
    className={`
      list-disc
      pl-6
      mb-3
      ${
        darkMode
          ? "text-slate-200"
          : "text-slate-800"
      }
    `}
  >
    {children}
  </ul>
),
   ol: ({ children }) => (
  <ol
    className={`
      list-decimal
      pl-6
      mb-3
      ${
        darkMode
          ? "text-slate-200"
          : "text-slate-800"
      }
    `}
  >
    {children}
  </ol>
),
code: ({ children }) => (
  <code
    className={`
      px-1
      rounded
      font-mono
      ${
        darkMode
          ? " text-green-300"
          : ""
      }
    `}
  >
    {children}
  </code>
),
    
  }}
>
  {answer}
</ReactMarkdown>

</div>

      </div>
    )}
  </div>
);
};

export default AskAI;
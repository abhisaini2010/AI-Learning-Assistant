import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TopicInput from "../components/TopicInput";
import NotesDisplay from "../components/NotesDisplay";
import { useState,useEffect } from "react";
import { generateNotes } from "../services/gemini";
import { parseNotes } from "../utils/parseNotes";
import AskAI from "../components/AskAI";


const Home = () => {
  const [notes, setNotes] = useState({
    summary: "",
  detailed: "",
  mcqs: "",
  interview: "",
  flashcards: "",
  });
const [loading, setLoading] = useState(false);

const [history, setHistory] = useState<string[]>([]);

const [savedNotes, setSavedNotes] = useState<any[]>([]);

const [selectedTopic,setSelectedTopic] = useState("");

const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  const savedHistory =
    localStorage.getItem(
      "study-history"
    );

  if (savedHistory) {
    setHistory(
      JSON.parse(savedHistory)
    );
  }
}, []);

useEffect(() => {
  const storedNotes =
    localStorage.getItem(
      "saved-notes"
    );

  if (storedNotes) {
    setSavedNotes(
      JSON.parse(storedNotes)
    );
  }
}, []);

useEffect(() => {
  const savedTheme =
    localStorage.getItem(
      "dark-mode"
    );

  if (savedTheme) {
    setDarkMode(
      JSON.parse(savedTheme)
    );
  }
}, []);

const handleDeleteHistory = (
  topicToDelete: string
) => {
  const updatedHistory =
    history.filter(
      (topic) =>
        topic !== topicToDelete
    );

  setHistory(updatedHistory);

  localStorage.setItem(
    "study-history",
    JSON.stringify(updatedHistory)
  );

  const updatedSavedNotes =
    savedNotes.filter(
      (item) =>
        item.topic !== topicToDelete
    );

  setSavedNotes(
    updatedSavedNotes
  );

  localStorage.setItem(
    "saved-notes",
    JSON.stringify(
      updatedSavedNotes
    )
  );

  if (
    selectedTopic ===
    topicToDelete
  ) {
    setSelectedTopic("");

    setNotes({
      summary: "",
      detailed: "",
      mcqs: "",
      interview: "",
      flashcards: "",
    });
  }
};

const handleHistoryClick = (
  topic: string
) => {
  const existingNote =
    savedNotes.find(
      (item) =>
        item.topic === topic
    );

  if (existingNote) {
    setSelectedTopic(topic);

    setNotes(
      existingNote.notes
    );

    return;
  }

  handleGenerate(topic);
};

const toggleDarkMode = () => {
  const newTheme =
    !darkMode;

  setDarkMode(newTheme);

  localStorage.setItem(
    "dark-mode",
    JSON.stringify(newTheme)
  );
};

const handleGenerate = async (
  topic: string
) => {

if (!topic.trim()) {
    return;
  }

  try {
    setSelectedTopic(topic)
    setLoading(true);

    const result =
      await generateNotes(topic);

      
const parsedNotes =parseNotes(result);
setNotes(parsedNotes);

const updatedSavedNotes = [
  {
    topic,
    notes: parsedNotes,
  },

  ...savedNotes.filter(
    (item) =>
      item.topic !== topic
  ),
].slice(0, 10);

setSavedNotes(
  updatedSavedNotes
);

localStorage.setItem(
  "saved-notes",
  JSON.stringify(
    updatedSavedNotes
  )
);

const updatedHistory = [
  topic,
  ...history.filter(
    (item) => item !== topic
  ),
].slice(0, 10);

setHistory(updatedHistory);

localStorage.setItem(
  "study-history",
  JSON.stringify(updatedHistory)
);
    
  } catch (error) {
    console.error(error);
  } finally {
    setLoading(false);
  }
};
  return (
      <div className={`min-h-screen ${ darkMode ? "bg-slate-900 text-white" : "bg-gradient-to-br from-slate-100 to-indigo-100"}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex">
        <Sidebar history={history} onSelectTopic={handleHistoryClick} darkmode={darkMode} onDeleteTopic={handleDeleteHistory}/>

        <main className="flex-1 p-8">
          <TopicInput onGenerate={handleGenerate} selectedTopic={selectedTopic} loading={loading} darkMode={darkMode}/>
          <NotesDisplay notes={notes} loading={loading} darkMode={darkMode}/>
          {selectedTopic && (<AskAI topic={selectedTopic} darkMode={darkMode}/>
)}
        </main>
      </div>
    </div>
  );
};

export default Home;
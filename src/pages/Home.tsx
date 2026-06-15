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

const [history, setHistory] = useState<string[]>([]); // stores our search history e.g. react,javascript,typescript

const [savedNotes, setSavedNotes] = useState<any[]>([]);  // used to avoid API calls for previously generated topic notes

const [selectedTopic,setSelectedTopic] = useState(""); // Takes current topic , it is used by AskAI

const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
  const savedHistory =
    localStorage.getItem(
      "study-history"
    );

  if (savedHistory) {
    setHistory(
      JSON.parse(savedHistory) // converts string into array
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
      JSON.parse(savedTheme)  // without this every refresh would reset everything and the  current mode will be reneweds
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
    JSON.stringify(updatedHistory) // it converts a js object,array,or primitive values into a JSON-formatted string  like this->'{}'
  );

  const updatedSavedNotes =
    savedNotes.filter(
      (item) =>
        item.topic !== topicToDelete
    );

  setSavedNotes(updatedSavedNotes);

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

const handleHistoryClick = (  // this function restores the notes when a particular topic is clicked
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
    return;   // it prevents empty requests.
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
].slice(0, 10);   // here we want to maintain : Only latest 10 notes, No duplicate topics , Latest topic should come first (Save notes logic)

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
      <div className={`min-h-screen  ${ darkMode ? "bg-slate-900 text-white" : "bg-gradient-to-br from-slate-100 to-indigo-100"}`}>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

      <div className="flex flex-col md:flex-row">
        <Sidebar history={history} onSelectTopic={handleHistoryClick} darkmode={darkMode} onDeleteTopic={handleDeleteHistory}/>

        <main className="flex-1 p-4 md:p-8">
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
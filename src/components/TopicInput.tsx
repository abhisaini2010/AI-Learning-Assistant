import { useState,useEffect } from "react";
import { toast } from "react-toastify";
interface Props {
  onGenerate: (
    topic: string
  ) => void;
  selectedTopic:string;
  loading: boolean;
  darkMode:boolean;
}
const TopicInput = ({
  onGenerate,selectedTopic,loading,darkMode
}:Props)=>{
 
 const[topic,setTopic]=useState(selectedTopic)
 useEffect(() => {
  setTopic(selectedTopic);
}, [selectedTopic]);
  

  return (
    <div className={`rounded-2xl p-6 shadow-lg border ${ darkMode ?"bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
      <h2 className="text-xl font-semibold mb-4">
        Generate Notes
      </h2>

      <input
        type="text"
        value={topic}
        onChange={(e) => setTopic(e.target.value)}
        placeholder="Enter Topic..."
        className={`
  w-full
  p-4
  border
  rounded-xl
  outline-none
  focus:ring-4
  focus:ring-indigo-200
  focus:border-indigo-500
  ${
    darkMode
      ? "bg-slate-700 border-slate-600 text-white"
      : "bg-white border-slate-300"
  }
`} />

      <button
        className=" mt-4 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-medium transition-all duration-300 shadow-md" disabled = {loading||!topic.trim()} onClick={() => {
  if (!topic.trim()) {
    toast.error(
      "Please enter a topic"
    );
    return;
  }

  onGenerate(topic);
}}>
        {loading ? "Generating..." : "Generate Notes"}
      </button>
    </div>
  );
};

export default TopicInput;
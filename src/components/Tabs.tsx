import type { TabType } from "../types/notes";

interface Props {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  darkMode:boolean;
}

const Tabs = ({ activeTab, setActiveTab,darkMode }: Props) => {
  const tabs: TabType[] = [
    "summary",
    "detailed",
    "mcqs",
    "interview",
    "flashcards"
  ];

  return (
    <div className="flex gap-3 flex-wrap mb-4">
      {tabs.map((tab) => (
       <button
  key={tab}
  onClick={() => setActiveTab(tab)}
  className={` px-5 py-2 rounded-xl capitalize font-medium transition-all duration-300 ${ activeTab === tab ? "bg-indigo-600 text-white shadow-md" : darkMode ? "bg-slate-700 hover:bg-slate-600 text-white": "bg-slate-100 hover:bg-slate-200 text-slate-700"}`}>
  {tab}
</button>
      ))}
    </div>
  );
};

export default Tabs;
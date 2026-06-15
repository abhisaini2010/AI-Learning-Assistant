interface Props {
  history: string[];
   onSelectTopic: (
    topic: string
  ) => void;
  onDeleteTopic: (
    topic: string
  ) => void;

  darkmode: boolean;
}

const Sidebar = ({
  history,onSelectTopic,onDeleteTopic,darkmode
}: Props) => {
  return (
    <aside className={`w-full md:w-72 md:min-h-screen border-r p-5 ${ darkmode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}>
      <h2 className="font-bold underline decoration-2 mb-4">
        Recent Searches
      </h2>

      <div className="space-y-2">
        {history.map((item) => (
  <div
    key={item}
    className="flex items-center gap-2 mb-2"
  >
    <button
      onClick={() =>
        onSelectTopic(item)
      }
      className={`
        flex-1
        text-left
        p-3
        rounded-xl
        transition-all
        ${
          darkmode
            ? "hover:bg-slate-700"
            : "hover:bg-indigo-50"
        }
      `}
    >
      {item}
    </button>

    <button
      onClick={() =>
        onDeleteTopic(item)
      }
      className={`
        px-2
        py-1
        ${ darkmode ? 
        "text-amber-200 hover:text-white" : 
        "hover:text-red-700 font-bold" }
      `}
    >
      X
    </button>
  </div>
))}
      </div>
    </aside>
  );
};

export default Sidebar;
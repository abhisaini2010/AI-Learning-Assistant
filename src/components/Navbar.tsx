import {
  Moon,
  Sun,
} from "lucide-react";

interface Props {
  darkMode: boolean;

  toggleDarkMode: () => void;
}

const Navbar = ({
  darkMode,
  toggleDarkMode,
}: Props) => {
  return (
    <header
      className={`
      sticky
      top-0
      z-50
      px-8
      py-4
      flex
      justify-between
      items-center
      border-b
      ${
        darkMode
          ? "bg-slate-800 border-slate-700"
          : "bg-white border-slate-200"
      }
    `}
    >
      <h1
        className="
          text-3xl
          font-bold
          bg-gradient-to-r
          from-indigo-600
          to-purple-600
          bg-clip-text
          text-transparent
        "
      >
        AI Study Notes
      </h1>

      <button
        onClick={
          toggleDarkMode
        }
        className="
          p-2
          rounded-lg
          hover:bg-slate-200
        "
      >
        {darkMode ? (
          <Sun size={20} />
        ) : (
          <Moon size={20} />
        )}
      </button>
    </header>
  );
};

export default Navbar;
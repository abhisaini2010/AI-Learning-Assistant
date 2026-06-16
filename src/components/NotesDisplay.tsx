import { useState } from "react";
import Tabs from "./Tabs";
import LoadingSkeleton from "./LoadingSkeleton";
import type { TabType,NotesData } from "../types/notes";
import ReactMarkdown from "react-markdown";
import jsPDF from "jspdf";
import toast from "react-hot-toast";

interface Props {
  notes: NotesData;
  loading: boolean;
  darkMode:boolean;
}

const NotesDisplay = ({
  notes,
  loading,
  darkMode
}: Props) => {
 const [activeTab, setActiveTab] =
    useState<TabType>("summary")

    const currentContent =
  notes[activeTab]; //here it will return summary content

  const handleCopy = async () => {
  try {
    await navigator.clipboard.writeText(
      currentContent
    );

    toast.success(
      "Notes copied successfully!"
    );
  } catch (error) {
    toast.error(
      "Failed to copy notes"
    );
  }
};

const handleDownloadPDF = () => {
  try {
    const pdf = new jsPDF();

    pdf.setFontSize(16);

    pdf.text(
      activeTab.toUpperCase(),
      10,
      10
    );

    pdf.setFontSize(12);

    const lines =
      pdf.splitTextToSize(
        currentContent,
        180
      );

    pdf.text(lines, 10, 20);

    pdf.save(
      `${activeTab}-notes.pdf`
    );

    toast.success(
      "PDF downloaded successfully!"
    );
  } catch (error) {
    toast.error(
      "Failed to generate PDF"
    );
  }
};

const handleDownloadAllPDF = () => {
  try {
    const pdf = new jsPDF();

    let yPosition = 15;

    const addSection = (
      title: string,
      content: string
    ) => {
      pdf.setFontSize(16);

      pdf.text(
        title,
        10,
        yPosition
      );

      yPosition += 10;

      pdf.setFontSize(12);

      const lines =
        pdf.splitTextToSize(
          content,
          180
        );

      pdf.text(
        lines,
        10,
        yPosition
      );

      yPosition +=
        lines.length * 7 + 15;

      if (yPosition > 250) {
        pdf.addPage();

        yPosition = 15;
      }
    };

    addSection(
      "Summary",
      notes.summary
    );

    addSection(
      "Detailed Notes",
      notes.detailed
    );

    addSection(
      "MCQs",
      notes.mcqs
    );

    addSection(
      "Interview Questions",
      notes.interview
    );

    addSection(
      "Flashcards",
      notes.flashcards
    );

    pdf.save(
      "Complete-Study-Notes.pdf"
    );

    toast.success(
      "Complete PDF downloaded!"
    );
  } catch (error) {
    toast.error(
      "Failed to generate PDF"
    );
  }
};

  return (
    <div  className={`
    mt-6
    p-6
    rounded-2xl
    shadow-lg
    border
    ${
      darkMode
        ? "bg-slate-800 border-slate-700"
        : "bg-white border-slate-200"
    }
  `}>
      <Tabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        darkMode={darkMode}
      />

     <div
  className={`
    mt-6
    p-6
    rounded-xl
    border
    leading-8
    min-h-[300px]
    overflow-x-auto
    ${
      darkMode
        ? "bg-slate-700 border-slate-600"
        : "bg-slate-50 border-slate-200"
    }
  `}
>
  {loading ? (
 <LoadingSkeleton darkMode={darkMode}/>
) : (
  <ReactMarkdown>
    {currentContent}
  </ReactMarkdown>
)}
</div>

      <div className="mt-6 flex flex-col sm:flex-row gap-4 ">
        <button onClick={handleDownloadPDF} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl transition-all">Download PDF</button>

        <button onClick={handleDownloadAllPDF}
  className="
    px-4
    py-2
    rounded-lg
    bg-green-600
    text-white
    hover:bg-green-700
    transition-all
  "
>
  Download Complete PDF
</button>

        <button onClick={handleCopy} className=" bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all">Copy Notes</button>
      </div>
    </div>
  );
};

export default NotesDisplay;
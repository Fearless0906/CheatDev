import CheatSheetCard from "@/components/CheatSheetCard";
import { Plus } from "lucide-react";
import React from "react";

const cheatSheets = [
  {
    id: 1,
    title: "Python Basics",
    language: "Python",
    favorites: 24,
    color: "bg-blue-500",
  },
  {
    id: 2,
    title: "JavaScript ES6+",
    language: "JavaScript",
    favorites: 18,
    color: "bg-yellow-500",
  },
  {
    id: 3,
    title: "React Hooks",
    language: "React",
    favorites: 32,
    color: "bg-cyan-500",
  },
  {
    id: 4,
    title: "CSS Grid & Flexbox",
    language: "CSS",
    favorites: 15,
    color: "bg-pink-500",
  },
  {
    id: 5,
    title: "Git Commands",
    language: "Git",
    favorites: 28,
    color: "bg-orange-500",
  },
  {
    id: 6,
    title: "SQL Queries",
    language: "SQL",
    favorites: 21,
    color: "bg-green-500",
  },
];

const Page = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Cheat Sheets
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
          <Plus size={20} />
          New CheatSheet
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cheatSheets.map((sheet) => (
          <CheatSheetCard key={sheet.id} {...sheet} />
        ))}
      </div>
    </div>
  );
};

export default Page;

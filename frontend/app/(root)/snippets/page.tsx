import SnippetRow from "@/components/SnippetRow";
import { Plus } from "lucide-react";
import React from "react";

const snippets = [
  {
    id: 1,
    title: "Array Map Function",
    language: "JavaScript",
    cheatsheet: "JavaScript ES6+",
    updated: "2 days ago",
  },
  {
    id: 2,
    title: "List Comprehension",
    language: "Python",
    cheatsheet: "Python Basics",
    updated: "1 week ago",
  },
  {
    id: 3,
    title: "useState Hook",
    language: "React",
    cheatsheet: "React Hooks",
    updated: "3 days ago",
  },
  {
    id: 4,
    title: "Grid Template Areas",
    language: "CSS",
    cheatsheet: "CSS Grid & Flexbox",
    updated: "5 days ago",
  },
];

const Page = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Snippets
        </h1>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors duration-200">
          <Plus size={20} />
          New Snippet
        </button>
      </div>
      <div className="space-y-4">
        {snippets.map((snippet) => (
          <SnippetRow key={snippet.id} {...snippet} />
        ))}
      </div>
    </div>
  );
};

export default Page;

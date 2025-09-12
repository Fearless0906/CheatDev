import { Edit3, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

type SnippetRowProps = {
  title: string;
  language: string;
  cheatsheet: string;
  updated_at: string;
};

const SnippetRow = ({
  title,
  language,
  cheatsheet,
  updated_at,
}: SnippetRowProps) => {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-sm transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900 dark:text-white">{title}</h4>
          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full text-xs">
              {language}
            </span>
            <span>in {cheatsheet}</span>
            <span>{updated_at}</span>
          </div>
        </div>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Edit3 size={16} className="text-gray-600 dark:text-gray-400" />
          </Button>
          <Button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
            <Trash2 size={16} className="text-gray-600 dark:text-gray-400" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SnippetRow;

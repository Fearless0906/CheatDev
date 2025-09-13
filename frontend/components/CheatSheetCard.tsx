import { Edit3, Star, Trash2 } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type SheetCardProps = {
  id: string;
  color: string;
  title: string;
  description: string;
  language: string;
  favorites: string;
};

const CheatSheetCard = ({
  id,
  color,
  title,
  description,
  language,
  favorites,
}: SheetCardProps) => {
  return (
    <Link href={`/cheatsheet/${id}`}>
      <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 hover:shadow-lg transition-all duration-200 group">
        <div className="flex items-start justify-between mb-4">
          <div className={`w-3 h-3 rounded-full ${color}`}></div>
          <div className="group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
            <Button variant="ghost">
              <Edit3 size={14} />
            </Button>
            <Button variant="ghost">
              <Trash2 size={14} />
            </Button>
          </div>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>
        <p className="text-sm text-gray-400 ">{description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full">
            {language}
          </span>
          <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
            <Star size={14} />
            <span className="text-sm">{favorites}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CheatSheetCard;

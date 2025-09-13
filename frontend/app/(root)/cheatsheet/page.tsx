"use client";

import CheatSheetCard from "@/components/CheatSheetCard";
import { CheatSheetDialog } from "@/components/CheatSheetDialog";
import { Button } from "@/components/ui/button";
import { fetchCheatSheets } from "@/server/api";
import useFetch from "@/services/useFetch";
import { State } from "@/store/store";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { token, user } = useSelector((state: State) => state.auth);

  const {
    data: cheatsheets,
    error,
    loading,
  } = useFetch(() => fetchCheatSheets(token ?? ""));

  // ✅ Normalize data to always be an array
  const data = cheatsheets ?? [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Cheat Sheets
        </h1>
        <CheatSheetDialog />
      </div>

      {loading && user ? (
        <Loader2 className="mt-2 w-5 h-5 animate-spin" />
      ) : error ? (
        <span>Error: {error?.message}</span>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.length > 0 ? (
            data.map((sheet) => <CheatSheetCard key={sheet.id} {...sheet} />)
          ) : (
            <p className="text-gray-500">No cheat sheets found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;

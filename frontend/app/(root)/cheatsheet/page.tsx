"use client";

import CheatSheetCard from "@/components/CheatSheetCard";
import { CheatSheetDialog } from "@/components/CheatSheetDialog";
import { Button } from "@/components/ui/button";
import { fetchCheatSheets } from "@/server/api";
import useFetch from "@/services/useFetch";
import { State } from "@/store/store";
import { CheatSheet } from "@/interface/types";
import { Loader2, Plus } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

const Page = () => {
  const { token } = useSelector((state: State) => state.auth);

  // Memoize the token array to prevent unnecessary refetches
  const tokenArray: [string] | undefined = token ? [token] : undefined;

  const {
    data: cheatsheets,
    error,
    loading,
    refetch,
  } = useFetch<CheatSheet[], [string]>(fetchCheatSheets, tokenArray, !!token);

  // Function to refresh the list
  const refreshCheatSheets = () => {
    if (token) {
      refetch();
    }
  };

  // Pass refresh function to dialog
  const handleCheatSheetCreated = () => {
    refreshCheatSheets();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Cheat Sheets
        </h1>
        <div className="flex gap-4 items-center">
          {loading && <Loader2 className="w-4 h-4 animate-spin" />}
          <CheatSheetDialog onSuccess={handleCheatSheetCreated} />
        </div>
      </div>

      {error ? (
        <div className="p-4 bg-red-50 dark:bg-red-900/10 rounded-lg">
          <p className="text-red-600 dark:text-red-400">
            Error: {error?.message}
          </p>
          <Button
            variant="ghost"
            size="sm"
            className="mt-2"
            onClick={refreshCheatSheets}
          >
            Try again
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {!loading && cheatsheets && cheatsheets.length > 0 ? (
            cheatsheets.map((sheet) => (
              <CheatSheetCard
                key={sheet.id}
                {...sheet}
                onUpdate={refreshCheatSheets}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500 mb-4">
                {loading ? "Loading..." : "No cheat sheets found."}
              </p>
              {!loading && (
                <p className="text-sm text-gray-400">
                  Click the &quot;New CheatSheet&quot; button to create your
                  first cheat sheet!
                </p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Page;

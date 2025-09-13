import { CheatSheets, Language } from "@/interface/types";
import { BASE_URL } from "./client";

export const fetchCheatSheets = async (token: string): Promise<CheatSheets> => {
  const response = await fetch(`${BASE_URL}/code/cheatsheets/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch cheat sheets: ' ${response.text} ${response.statusText}`
    );
  }

  return response.json();
};

export const createCheatSheet = async (data: CheatSheets) => {
  const response = await fetch(`${BASE_URL}/code/cheatsheets/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch cheat sheets: ' ${response.text} ${response.statusText}`
    );
  }

  return response.json();
};

export const getLanguage = async (token: string): Promise<Language> => {
  const response = await fetch(`${BASE_URL}/code/languages/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch cheat sheets: ' ${response.text} ${response.statusText}`
    );
  }

  return response.json();
};

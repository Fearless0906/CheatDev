import { CheatSheet, Language, Tag } from "@/interface/types";
import { BASE_URL } from "./client";

export interface Snippet {
  id: number;
  title: string;
  content: string;
  explanation?: string;
  cheat_sheet: number;
  user: number;
  created_at: string;
  updated_at: string;
}

// Type for creating a new cheat sheet
interface CreateCheatSheetRequest {
  title: string;
  description?: string;
  language: number; // Just the ID
  user: number; // Just the ID
  tags: number[]; // Array of tag IDs
}

export const fetchCheatSheets = async (
  token: string
): Promise<CheatSheet[]> => {
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

export const createCheatSheet = async (
  data: CreateCheatSheetRequest
): Promise<CheatSheet> => {
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

interface CreateSnippetRequest {
  title: string;
  content: string;
  explanation?: string;
  cheat_sheet: number;
  user: number;
}

export const createSnippet = async (
  data: CreateSnippetRequest,
  token: string
): Promise<Snippet> => {
  const response = await fetch(`${BASE_URL}/code/snippets/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create snippet: ${response.statusText}`);
  }

  return response.json();
};

export const fetchSnippetsByCheatSheet = async (
  cheatSheetId: number,
  token: string
): Promise<Snippet[]> => {
  const response = await fetch(
    `${BASE_URL}/code/snippets/?cheat_sheet=${cheatSheetId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch snippets: ${response.statusText}`);
  }

  return response.json();
};

export const getLanguages = async (token: string): Promise<Language[]> => {
  const response = await fetch(`${BASE_URL}/code/languages/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(
      `Failed to fetch languages: ${text} (${response.statusText})`
    );
  }

  const data: Language[] = await response.json();
  return data;
};

export const getTags = async (token: string): Promise<Tag[]> => {
  const response = await fetch(`${BASE_URL}/code/tags/`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to fetch tags: ${text} (${response.statusText})`);
  }

  const data: Tag[] = await response.json();
  return data;
};

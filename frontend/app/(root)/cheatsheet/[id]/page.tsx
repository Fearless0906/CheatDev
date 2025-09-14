"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  fetchCheatSheets,
  createSnippet,
  fetchSnippetsByCheatSheet,
  Snippet,
} from "@/server/api";
import { State } from "@/store/store";
import { CheatSheet, User } from "@/interface/types";
import { Copy, Edit2, Star, Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import useFetch from "@/services/useFetch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface SnippetFormData {
  title: string;
  content: string;
  explanation: string;
  cheat_sheet: number;
}

const CheatSheetDetails = () => {
  const { id } = useParams();
  const router = useRouter();
  const { token, user } = useSelector((state: State) => state.auth);
  const [isAddingSnippet, setIsAddingSnippet] = useState(false);

  const handleCopyCode = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content);
      toast.success("Code copied to clipboard!");
    } catch (err) {
      toast.error("Failed to copy code");
      console.error("Failed to copy code:", err);
    }
  };
  const [snippetForm, setSnippetForm] = useState<SnippetFormData>({
    title: "",
    content: "",
    explanation: "",
    cheat_sheet: Number(id),
  });

  // Fetch cheat sheet data
  const {
    data: cheatsheet,
    loading: loadingCheatsheet,
    error: cheatsheetError,
  } = useFetch<CheatSheet[], [string]>(
    fetchCheatSheets,
    token ? [token] : undefined,
    !!token
  );

  const {
    data: snippets,
    loading: loadingSnippets,
    error: snippetsError,
    refetch: refetchSnippets,
  } = useFetch<Snippet[], [number, string]>(
    fetchSnippetsByCheatSheet,
    id && token ? [Number(id), token] : undefined,
    !!token && !!id
  );

  const selectedSheet = cheatsheet?.find((sheet) => sheet.id === Number(id));

  const handleSubmitSnippet = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !user) {
      toast.error("You must be logged in to create snippets");
      return;
    }

    if (!id) {
      toast.error("Invalid cheat sheet ID");
      return;
    }

    try {
      const snippetData = {
        ...snippetForm,
        user: user.id,
      };
      await createSnippet(snippetData, token);

      // Refetch snippets to update the list
      await refetchSnippets();

      toast.success("Snippet created successfully");
      setIsAddingSnippet(false);
      setSnippetForm({
        title: "",
        content: "",
        explanation: "",
        cheat_sheet: Number(id),
      });
    } catch (error) {
      toast.error("Failed to create snippet. Please try again.");
      console.error("Failed to create snippet:", error);
    }
  };

  if (loadingCheatsheet || loadingSnippets) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white" />
      </div>
    );
  }

  if (cheatsheetError || !selectedSheet || snippetsError) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold text-red-500">
          {cheatsheetError || snippetsError
            ? `Error: ${
                cheatsheetError
                  ? "Failed to load cheat sheet"
                  : "Failed to load snippets"
              }`
            : "Cheat sheet not found"}
        </h1>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    );
  }

  return (
    <div className="container max-w-6xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{selectedSheet.title}</h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {selectedSheet.description}
            </p>
            <div className="flex items-center gap-3">
              <Badge variant="outline">{selectedSheet.language.name}</Badge>
              {selectedSheet.tags?.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Dialog open={isAddingSnippet} onOpenChange={setIsAddingSnippet}>
              <DialogTrigger asChild>
                <Button variant="default">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Snippet
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Snippet</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmitSnippet} className="space-y-4">
                  <div>
                    <label htmlFor="title" className="text-sm font-medium">
                      Title
                    </label>
                    <Input
                      id="title"
                      value={snippetForm.title}
                      onChange={(e) =>
                        setSnippetForm({
                          ...snippetForm,
                          title: e.target.value,
                        })
                      }
                      placeholder="Enter snippet title"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="content" className="text-sm font-medium">
                      Content
                    </label>
                    <Textarea
                      id="content"
                      value={snippetForm.content}
                      onChange={(e) =>
                        setSnippetForm({
                          ...snippetForm,
                          content: e.target.value,
                        })
                      }
                      placeholder="Enter your code or content here"
                      className="font-mono"
                      rows={8}
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="explanation"
                      className="text-sm font-medium"
                    >
                      Explanation (Optional)
                    </label>
                    <Textarea
                      id="explanation"
                      value={snippetForm.explanation}
                      onChange={(e) =>
                        setSnippetForm({
                          ...snippetForm,
                          explanation: e.target.value,
                        })
                      }
                      placeholder="Add an explanation for this snippet"
                      rows={3}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setIsAddingSnippet(false)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Save Snippet</Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
            <Button variant="outline" size="icon">
              <Star className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon">
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="snippets" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="snippets">Code Snippets</TabsTrigger>
          <TabsTrigger value="notes">Notes</TabsTrigger>
          <TabsTrigger value="comments">Comments</TabsTrigger>
        </TabsList>

        <TabsContent value="snippets" className="space-y-4">
          <div className="grid grid-cols-1 gap-6">
            {snippets && snippets.length > 0 ? (
              snippets.map((snippet) => (
                <Card key={snippet.id} className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold">{snippet.title}</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleCopyCode(snippet.content)}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <ScrollArea className="h-[200px] rounded-md border p-4">
                    <pre className="font-mono text-sm">
                      <code>{snippet.content}</code>
                    </pre>
                  </ScrollArea>
                  {snippet.explanation && (
                    <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                      {snippet.explanation}
                    </p>
                  )}
                </Card>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No snippets added yet.</p>
              </div>
            )}
          </div>
        </TabsContent>

        <TabsContent value="notes">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notes</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Coming soon: Add notes and personal observations about this cheat
              sheet.
            </p>
          </Card>
        </TabsContent>

        <TabsContent value="comments">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <p className="text-gray-600 dark:text-gray-400">
              Coming soon: Discuss and collaborate with others.
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CheatSheetDetails;

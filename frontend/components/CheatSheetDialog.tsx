"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { Textarea } from "./ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { createCheatSheet, getTags, getLanguages } from "@/server/api";
import { useState } from "react";
import { useSelector } from "react-redux";
import { State } from "@/store/store";
import { Language, Tag } from "@/interface/types";
import useFetch from "@/services/useFetch";

interface CheatSheetDialogProps {
  onSuccess?: () => void;
}

export function CheatSheetDialog({ onSuccess }: CheatSheetDialogProps) {
  const { token, user } = useSelector((state: State) => state.auth);
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language: 1,
    tags: [] as number[], // Store selected tag IDs
  });

  // Fetch languages - only when dialog is open and we have a token
  const {
    data: languages = [],
    loading: languagesLoading,
    error: languagesError,
  } = useFetch<Language[], [string]>(
    getLanguages,
    token ? [token] : undefined,
    open && !!token
  );

  // Fetch tags
  const {
    data: tags = [],
    loading: tagsLoading,
    error: tagsError,
  } = useFetch<Tag[], [string]>(getTags, token ? [token] : undefined, open);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectLanguage = (val: string) => {
    setFormData((prev) => ({ ...prev, language: Number(val) }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      alert("You must be logged in to create a cheat sheet");
      return;
    }

    if (!formData.title || !formData.language) {
      alert("Title and language are required!");
      return;
    }

    try {
      const selectedLanguage = languages?.find(
        (l) => l.id === formData.language
      );
      if (!selectedLanguage) {
        throw new Error("Selected language not found");
      }

      // Get selected tags
      const selectedTags = (tags || []).filter((tag) =>
        formData.tags.includes(tag.id)
      );

      // Prepare the data for API with only IDs for relationships
      const cheatSheetData = {
        title: formData.title,
        description: formData.description || "",
        language: selectedLanguage.id, // Send just the ID
        user: user!.id, // Send just the ID
        tags: selectedTags.map((tag) => tag.id), // Send array of tag IDs
      };

      await createCheatSheet(cheatSheetData);

      // Reset form to initial state
      setFormData({
        title: "",
        description: "",
        language: 1,
        tags: [],
      });

      setOpen(false); // Close dialog on success
      onSuccess?.(); // Call the success callback
      alert("Cheat sheet created successfully!");
    } catch (err) {
      console.error(err);
      alert(
        err instanceof Error ? err.message : "Failed to create cheat sheet"
      );
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Plus size={20} />
          New CheatSheet
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>New CheatSheet</DialogTitle>
          <DialogDescription>Make your new cheat sheet</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-3">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Python Basics"
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter your cheat sheet description ..."
              />
            </div>

            <div className="grid gap-3">
              <Label htmlFor="language">Language</Label>
              <Select
                value={String(formData.language)}
                onValueChange={handleSelectLanguage}
                disabled={languagesLoading}
              >
                <SelectTrigger className="w-full">
                  <SelectValue
                    placeholder={
                      languagesLoading
                        ? "Loading languages..."
                        : "Select a programming language"
                    }
                  />
                </SelectTrigger>
                <SelectContent>
                  {languagesLoading ? (
                    <SelectItem value="loading" disabled>
                      Loading languages...
                    </SelectItem>
                  ) : languages && languages.length > 0 ? (
                    languages.map((lang) => (
                      <SelectItem key={lang.id} value={String(lang.id)}>
                        {lang.name}
                      </SelectItem>
                    ))
                  ) : (
                    <SelectItem value="none" disabled>
                      No languages available
                    </SelectItem>
                  )}
                </SelectContent>
              </Select>
              {languagesError && (
                <p className="text-sm text-red-500">
                  Failed to load languages: {languagesError.message}
                </p>
              )}
            </div>

            <div className="grid gap-3">
              <Label htmlFor="tags">Tags</Label>
              <div className="flex flex-wrap gap-2 min-h-[2.5rem] p-2 border rounded-md">
                {tagsLoading ? (
                  <div className="text-sm text-gray-500">Loading tags...</div>
                ) : tags && tags.length > 0 ? (
                  tags.map((tag) => (
                    <Button
                      key={tag.id}
                      type="button"
                      size="sm"
                      variant={
                        formData.tags.includes(tag.id) ? "default" : "outline"
                      }
                      onClick={() => {
                        setFormData((prev) => ({
                          ...prev,
                          tags: prev.tags.includes(tag.id)
                            ? prev.tags.filter((id) => id !== tag.id)
                            : [...prev.tags, tag.id],
                        }));
                      }}
                    >
                      {tag.name}
                    </Button>
                  ))
                ) : (
                  <div className="text-sm text-gray-500">No tags available</div>
                )}
              </div>
              <p className="text-sm text-gray-500">
                Click tags to select/deselect them
              </p>
            </div>

            {(languagesError || tagsError) && (
              <p className="text-red-500">
                {String(languagesError || tagsError)}
              </p>
            )}

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">Save changes</Button>
            </DialogFooter>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

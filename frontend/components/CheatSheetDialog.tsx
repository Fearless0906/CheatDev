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
import { createCheatSheet, getLanguage } from "@/server/api";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { State } from "@/store/store";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "./ui/select";

export function CheatSheetDialog() {
  const { token, user } = useSelector((state: State) => state.auth);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    language_id: "",
    user_id: user?.id ?? "",
  });

  const [languages, setLanguages] = useState<{ id: string; name: string }[]>(
    []
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch languages
  useEffect(() => {
    if (!token) return;

    const fetchLanguages = async () => {
      setLoading(true);
      try {
        const data = await getLanguage(token);
        setLanguages(data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message || "Failed to fetch languages");
        setLoading(false);
      }
    };

    fetchLanguages();
  }, [token]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.language_id) {
      alert("Title and language are required!");
      return;
    }

    try {
      await createCheatSheet({
        title: formData.title,
        description: formData.description,
        language_id: formData.language_id,
        user_id: formData.user_id,
      });

      setFormData({
        title: "",
        description: "",
        language_id: "",
        user_id: user?.id ?? "",
      });

      alert("Cheat sheet created successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Failed to create cheat sheet");
    }
  };

  return (
    <Dialog>
      <form onSubmit={handleSubmit}>
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

          <div className="grid gap-4">
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
              <Label htmlFor="language_id">Language</Label>
              <Select
                value={formData.language_id}
                onValueChange={(val) =>
                  setFormData((prev) => ({ ...prev, language_id: val }))
                }
                disabled={loading}
              >
                <SelectTrigger>
                  <SelectValue
                    placeholder={loading ? "Loading..." : "Select language"}
                  />
                </SelectTrigger>
                <SelectContent>
                  {languages.map((lang) => (
                    <SelectItem key={lang.id} value={lang.id}>
                      {lang.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {error && <p className="text-red-500">{error}</p>}
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

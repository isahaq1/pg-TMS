"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";

interface SubtaskFormProps {
  taskId: string;
  onSubmit: (title: string, taskId: string) => void;
  onCancel?: () => void;
}

export default function SubtaskForm({
  taskId,
  onSubmit,
  onCancel,
}: SubtaskFormProps) {
  const [title, setTitle] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim()) {
      onSubmit(title.trim(), taskId);
      setTitle("");
      setIsExpanded(false);
    }
  };

  if (!isExpanded) {
    return (
      <button
        type="button"
        onClick={() => setIsExpanded(true)}
        className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900 py-2"
      >
        <Plus className="w-4 h-4" />
        <span>Add subtask</span>
      </button>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2">
      <div className="flex items-center space-x-2">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Subtask title"
          autoFocus
          className="flex-1"
        />
        <Button type="submit" size="sm">
          <Plus className="w-4 h-4" />
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => {
            setIsExpanded(false);
            setTitle("");
            onCancel?.();
          }}
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </form>
  );
}

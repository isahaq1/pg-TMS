"use client";

import { SubTask } from "@/types";
import { Check, Square } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SubtaskItemProps {
  subtask: SubTask;
  onToggle?: (subtaskId: string) => void;
  onDelete?: (subtaskId: string) => void;
}

export default function SubtaskItem({
  subtask,
  onToggle,
  onDelete,
}: SubtaskItemProps) {
  return (
    <div className="flex items-center space-x-3 group py-2 px-3 rounded-md hover:bg-gray-50">
      <button
        type="button"
        onClick={() => onToggle?.(subtask.id)}
        className="flex-shrink-0"
      >
        {subtask.isCompleted ? (
          <Check className="w-5 h-5 text-green-600" />
        ) : (
          <Square className="w-5 h-5 text-gray-400" />
        )}
      </button>
      <span
        className={`flex-1 text-sm ${
          subtask.isCompleted
            ? "line-through text-gray-500"
            : "text-gray-900"
        }`}
      >
        {subtask.title}
      </span>
      {onDelete && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDelete(subtask.id)}
          className="opacity-0 group-hover:opacity-100 transition-opacity"
        >
          Delete
        </Button>
      )}
    </div>
  );
}

"use client";

import { Task } from "@/types";
import { Button } from "@/components/ui/button";
import { MoreVertical, Calendar, AlertCircle, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

interface TaskCardProps {
  task: Task;
  onEdit?: (task: Task) => void;
  onDelete?: (taskId: string) => void;
  onStatusChange?: (taskId: string, status: Task["status"]) => void;
}

const statusColors = {
  todo: "bg-gray-100 text-gray-800",
  "in-progress": "bg-blue-100 text-blue-800",
  completed: "bg-green-100 text-green-800",
};

const priorityColors = {
  low: "text-green-600",
  medium: "text-yellow-600",
  high: "text-red-600",
};

export default function TaskCard({
  task,
  onEdit,
  onDelete,
  onStatusChange,
}: TaskCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/tasks/${task.id}`);
  };

  const completedSubtasks = task.subtasks?.filter((st) => st.isCompleted).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer border border-gray-200"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900">
              {task.title}
            </h3>
            <span
              className={cn(
                "px-2 py-1 text-xs font-medium rounded-full",
                statusColors[task.status]
              )}
            >
              {task.status.replace("-", " ")}
            </span>
          </div>
          {task.description && (
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {task.description}
            </p>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={(e) => {
            e.stopPropagation();
            // Handle menu
          }}
        >
          <MoreVertical className="w-5 h-5" />
        </Button>
      </div>

      {totalSubtasks > 0 && (
        <div className="mb-3 flex items-center space-x-2 text-sm text-gray-600">
          <CheckCircle2 className="w-4 h-4" />
          <span>
            {completedSubtasks} of {totalSubtasks} subtasks completed
          </span>
        </div>
      )}

      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <div className={cn("flex items-center space-x-1", priorityColors[task.priority])}>
            <AlertCircle className="w-4 h-4" />
            <span className="capitalize">{task.priority}</span>
          </div>
          {task.dueDate && (
            <div className="flex items-center space-x-1 text-gray-500">
              <Calendar className="w-4 h-4" />
              <span>{new Date(task.dueDate).toLocaleDateString()}</span>
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(task);
              }}
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(task.id);
              }}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { Task, SubTask } from "@/types";
import { Button } from "@/components/ui/button";
import { Edit, Trash2, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import SubtaskItem from "./subtask-item";
import SubtaskForm from "./subtask-form";
import { cn } from "@/lib/utils";

interface TaskDetailProps {
  task: Task;
  onTaskUpdate?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
  onSubtaskToggle?: (taskId: string, subtaskId: string) => void;
  onSubtaskAdd?: (taskId: string, title: string) => void;
  onSubtaskDelete?: (taskId: string, subtaskId: string) => void;
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

export default function TaskDetail({
  task,
  onTaskUpdate,
  onTaskDelete,
  onSubtaskToggle,
  onSubtaskAdd,
  onSubtaskDelete,
}: TaskDetailProps) {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

  const completedSubtasks = task.subtasks?.filter((st) => st.isCompleted).length || 0;
  const totalSubtasks = task.subtasks?.length || 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.back()}
        >
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-3">
            <h1 className="text-3xl font-bold">{task.title}</h1>
            <span
              className={cn(
                "px-3 py-1 text-sm font-medium rounded-full",
                statusColors[task.status]
              )}
            >
              {task.status.replace("-", " ")}
            </span>
          </div>
          {task.description && (
            <p className="text-gray-600 mt-2">{task.description}</p>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            onClick={() => setIsEditing(true)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          {onTaskDelete && (
            <Button
              variant="outline"
              onClick={() => {
                if (confirm("Are you sure you want to delete this task?")) {
                  onTaskDelete(task.id);
                  router.back();
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <div className="text-sm text-gray-600 mb-1">Priority</div>
          <div className={cn("font-semibold capitalize", priorityColors[task.priority])}>
            {task.priority}
          </div>
        </div>
        {task.dueDate && (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Due Date</div>
            <div className="font-semibold">
              {new Date(task.dueDate).toLocaleDateString()}
            </div>
          </div>
        )}
        {totalSubtasks > 0 && (
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-sm text-gray-600 mb-1">Progress</div>
            <div className="font-semibold">
              {completedSubtasks} / {totalSubtasks} subtasks
            </div>
            <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-600 h-2 rounded-full"
                style={{ width: `${(completedSubtasks / totalSubtasks) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Subtasks</h2>
        <div className="space-y-1 mb-4">
          {task.subtasks && task.subtasks.length > 0 ? (
            task.subtasks.map((subtask) => (
              <SubtaskItem
                key={subtask.id}
                subtask={subtask}
                onToggle={(id) => onSubtaskToggle?.(task.id, id)}
                onDelete={(id) => onSubtaskDelete?.(task.id, id)}
              />
            ))
          ) : (
            <p className="text-gray-500 text-sm">No subtasks yet</p>
          )}
        </div>
        {onSubtaskAdd && (
          <SubtaskForm
            taskId={task.id}
            onSubmit={(title) => onSubtaskAdd(task.id, title)}
          />
        )}
      </div>
    </div>
  );
}

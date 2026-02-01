"use client";

import { useState } from "react";
import { Task } from "@/types";
import TaskCard from "./task-card";
import TaskForm from "./task-form";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";

interface TaskListProps {
  tasks: Task[];
  projectId?: string;
  workspaceId: string;
  onTaskCreate?: (task: Omit<Task, "id" | "createdAt" | "updatedAt" | "subtasks">) => void;
  onTaskUpdate?: (task: Task) => void;
  onTaskDelete?: (taskId: string) => void;
  onTaskStatusChange?: (taskId: string, status: Task["status"]) => void;
}

export default function TaskList({
  tasks,
  projectId,
  workspaceId,
  onTaskCreate,
  onTaskUpdate,
  onTaskDelete,
  onTaskStatusChange,
}: TaskListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | undefined>();
  const [filterStatus, setFilterStatus] = useState<Task["status"] | "all">("all");

  const handleCreate = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "subtasks">) => {
    onTaskCreate?.(taskData);
    setShowForm(false);
  };

  const handleUpdate = (task: Task) => {
    setEditingTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = (taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "subtasks">) => {
    if (editingTask) {
      onTaskUpdate?.({ ...editingTask, ...taskData });
    } else {
      handleCreate(taskData);
    }
    setEditingTask(undefined);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingTask(undefined);
  };

  const filteredTasks =
    filterStatus === "all"
      ? tasks
      : tasks.filter((task) => task.status === filterStatus);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Tasks</h1>
          <p className="text-gray-600 mt-1">Manage your tasks</p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <select
              value={filterStatus}
              onChange={(e) =>
                setFilterStatus(e.target.value as Task["status"] | "all")
              }
              className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Tasks</option>
              <option value="todo">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            New Task
          </Button>
        </div>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          projectId={projectId}
          workspaceId={workspaceId}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      {filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">
            {filterStatus === "all"
              ? "No tasks yet"
              : `No ${filterStatus.replace("-", " ")} tasks`}
          </p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Task
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleUpdate}
              onDelete={onTaskDelete}
              onStatusChange={onTaskStatusChange}
            />
          ))}
        </div>
      )}
    </div>
  );
}

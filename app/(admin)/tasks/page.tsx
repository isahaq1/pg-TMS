"use client";

import { useState } from "react";
import TaskList from "@/components/features/tasks/task-list";
import { Task } from "@/types";

// Mock data - replace with actual API calls
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create new homepage design mockups",
    status: "in-progress",
    priority: "high",
    projectId: "1",
    workspaceId: "workspace-1",
    subtasks: [
      {
        id: "1-1",
        taskId: "1",
        title: "Create wireframes",
        isCompleted: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "1-2",
        taskId: "1",
        title: "Design mockups",
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Implement Navigation",
    description: "Build responsive navigation component",
    status: "todo",
    priority: "medium",
    projectId: "1",
    workspaceId: "workspace-1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>(mockTasks);

  const handleTaskCreate = (
    taskData: Omit<Task, "id" | "createdAt" | "updatedAt" | "subtasks">
  ) => {
    const newTask: Task = {
      ...taskData,
      id: Date.now().toString(),
      subtasks: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTasks([...tasks, newTask]);
  };

  const handleTaskUpdate = (task: Task) => {
    setTasks(
      tasks.map((t) =>
        t.id === task.id ? { ...task, updatedAt: new Date() } : t
      )
    );
  };

  const handleTaskDelete = (taskId: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      setTasks(tasks.filter((t) => t.id !== taskId));
    }
  };

  const handleTaskStatusChange = (taskId: string, status: Task["status"]) => {
    setTasks(
      tasks.map((t) =>
        t.id === taskId ? { ...t, status, updatedAt: new Date() } : t
      )
    );
  };

  return (
    <TaskList
      tasks={tasks}
      workspaceId="workspace-1"
      onTaskCreate={handleTaskCreate}
      onTaskUpdate={handleTaskUpdate}
      onTaskDelete={handleTaskDelete}
      onTaskStatusChange={handleTaskStatusChange}
    />
  );
}


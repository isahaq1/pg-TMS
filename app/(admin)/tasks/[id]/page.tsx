"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import TaskDetail from "@/components/features/tasks/task-detail";
import { Task, SubTask } from "@/types";
import { useRouter } from "next/navigation";

// Mock data
const mockTasks: Task[] = [
  {
    id: "1",
    title: "Design Homepage",
    description: "Create new homepage design mockups with modern UI/UX principles",
    status: "in-progress",
    priority: "high",
    dueDate: new Date("2024-12-31"),
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
      {
        id: "1-3",
        taskId: "1",
        title: "Get client approval",
        isCompleted: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function TaskDetailPage() {
  const params = useParams();
  const router = useRouter();
  const taskId = params.id as string;

  const [task, setTask] = useState<Task | undefined>(
    mockTasks.find((t) => t.id === taskId)
  );

  if (!task) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">Task not found</p>
      </div>
    );
  }

  const handleTaskUpdate = (updatedTask: Task) => {
    setTask({ ...updatedTask, updatedAt: new Date() });
  };

  const handleTaskDelete = (taskId: string) => {
    router.push("/tasks");
  };

  const handleSubtaskToggle = (taskId: string, subtaskId: string) => {
    if (!task) return;
    const updatedSubtasks = task.subtasks?.map((st) =>
      st.id === subtaskId ? { ...st, isCompleted: !st.isCompleted } : st
    );
    setTask({
      ...task,
      subtasks: updatedSubtasks,
      updatedAt: new Date(),
    });
  };

  const handleSubtaskAdd = (taskId: string, title: string) => {
    if (!task) return;
    const newSubtask: SubTask = {
      id: `${taskId}-${Date.now()}`,
      taskId,
      title,
      isCompleted: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setTask({
      ...task,
      subtasks: [...(task.subtasks || []), newSubtask],
      updatedAt: new Date(),
    });
  };

  const handleSubtaskDelete = (taskId: string, subtaskId: string) => {
    if (!task) return;
    const updatedSubtasks = task.subtasks?.filter((st) => st.id !== subtaskId);
    setTask({
      ...task,
      subtasks: updatedSubtasks,
      updatedAt: new Date(),
    });
  };

  return (
    <TaskDetail
      task={task}
      onTaskUpdate={handleTaskUpdate}
      onTaskDelete={handleTaskDelete}
      onSubtaskToggle={handleSubtaskToggle}
      onSubtaskAdd={handleSubtaskAdd}
      onSubtaskDelete={handleSubtaskDelete}
    />
  );
}


"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import TaskList from "@/components/features/tasks/task-list";
import { Project, Task } from "@/types";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FolderKanban } from "lucide-react";
import { useRouter } from "next/navigation";

// Mock data
const mockProjects: Project[] = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete redesign of the company website",
    workspaceId: "workspace-1",
    color: "#6366f1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

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

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const projectId = params.id as string;

  const [project] = useState<Project | undefined>(
    mockProjects.find((p) => p.id === projectId)
  );
  const [tasks, setTasks] = useState<Task[]>(
    mockTasks.filter((t) => t.projectId === projectId)
  );

  if (!project) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-600">Project not found</p>
        <Button
          variant="outline"
          onClick={() => router.push("/projects")}
          className="mt-4"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Button>
      </div>
    );
  }

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
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => router.push("/projects")}
        >
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div
          className="flex h-12 w-12 items-center justify-center rounded-lg text-white"
          style={{ backgroundColor: project.color }}
        >
          <FolderKanban className="h-6 w-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">{project.name}</h1>
          {project.description && (
            <p className="mt-1 text-gray-600">{project.description}</p>
          )}
        </div>
      </div>

      <div className="border-t pt-6">
        <h2 className="mb-4 text-2xl font-semibold">Tasks</h2>
        <TaskList
          tasks={tasks}
          projectId={projectId}
          workspaceId={project.workspaceId}
          onTaskCreate={handleTaskCreate}
          onTaskUpdate={handleTaskUpdate}
          onTaskDelete={handleTaskDelete}
          onTaskStatusChange={handleTaskStatusChange}
        />
      </div>
    </div>
  );
}


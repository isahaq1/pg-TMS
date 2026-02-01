export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  workspaceId: string;
  color?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface SubTask {
  id: string;
  taskId: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: "todo" | "in-progress" | "completed";
  priority: "low" | "medium" | "high";
  dueDate?: Date;
  projectId?: string;
  workspaceId: string;
  subtasks?: SubTask[];
  createdAt: Date;
  updatedAt: Date;
}

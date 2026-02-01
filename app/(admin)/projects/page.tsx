"use client";

import { useState } from "react";
import ProjectList from "@/components/features/projects/project-list";
import { Project } from "@/types";

// Mock data - replace with actual API calls
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
  {
    id: "2",
    name: "Mobile App",
    description: "Development of new mobile application",
    workspaceId: "workspace-1",
    color: "#8b5cf6",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(mockProjects);

  const handleProjectCreate = (
    projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
  ) => {
    const newProject: Project = {
      ...projectData,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    setProjects([...projects, newProject]);
  };

  const handleProjectUpdate = (project: Project) => {
    setProjects(
      projects.map((p) =>
        p.id === project.id ? { ...project, updatedAt: new Date() } : p
      )
    );
  };

  const handleProjectDelete = (projectId: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      setProjects(projects.filter((p) => p.id !== projectId));
    }
  };

  return (
    <ProjectList
      projects={projects}
      onProjectCreate={handleProjectCreate}
      onProjectUpdate={handleProjectUpdate}
      onProjectDelete={handleProjectDelete}
    />
  );
}


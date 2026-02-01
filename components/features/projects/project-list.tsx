"use client";

import { useState } from "react";
import { Project } from "@/types";
import ProjectCard from "./project-card";
import ProjectForm from "./project-form";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ProjectListProps {
  projects: Project[];
  onProjectCreate?: (project: Omit<Project, "id" | "createdAt" | "updatedAt">) => void;
  onProjectUpdate?: (project: Project) => void;
  onProjectDelete?: (projectId: string) => void;
}

export default function ProjectList({
  projects,
  onProjectCreate,
  onProjectUpdate,
  onProjectDelete,
}: ProjectListProps) {
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | undefined>();

  const handleCreate = (projectData: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    onProjectCreate?.(projectData);
    setShowForm(false);
  };

  const handleUpdate = (project: Project) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleFormSubmit = (projectData: Omit<Project, "id" | "createdAt" | "updatedAt">) => {
    if (editingProject) {
      onProjectUpdate?.({ ...editingProject, ...projectData });
    } else {
      handleCreate(projectData);
    }
    setEditingProject(undefined);
    setShowForm(false);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingProject(undefined);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projects</h1>
          <p className="text-gray-600 mt-1">Manage your projects</p>
        </div>
        <Button onClick={() => setShowForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {showForm && (
        <ProjectForm
          project={editingProject}
          onSubmit={handleFormSubmit}
          onCancel={handleCancel}
        />
      )}

      {projects.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">No projects yet</p>
          <Button onClick={() => setShowForm(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Create Your First Project
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onEdit={handleUpdate}
              onDelete={onProjectDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

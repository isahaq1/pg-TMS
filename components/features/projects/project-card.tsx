"use client";

import { Project } from "@/types";
import { Button } from "@/components/ui/button";
import { FolderKanban, MoreVertical, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

interface ProjectCardProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: ProjectCardProps) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/projects/${project.id}`);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer border border-gray-200"
      onClick={handleClick}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
            style={{
              backgroundColor: project.color || "#6366f1",
            }}
          >
            <FolderKanban className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              {project.name}
            </h3>
            {project.description && (
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {project.description}
              </p>
            )}
          </div>
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
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-1">
          <Calendar className="w-4 h-4" />
          <span>
            {new Date(project.updatedAt).toLocaleDateString()}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {onEdit && (
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onEdit(project);
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
                onDelete(project.id);
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

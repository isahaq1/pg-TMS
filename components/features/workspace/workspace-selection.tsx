"use client";

import { useState } from "react";
import WorkspaceCard from "./workspace-card";
import { Workspace } from "@/types/workspace";

const mockWorkspaces: Workspace[] = [
  {
    id: "1",
    name: "Dashboard",
    icon: "dashboard",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    name: "Paragon",
    icon: "paragon",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    name: "Canteen",
    icon: "canteen",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    name: "Document",
    icon: "document",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    name: "Jesser",
    icon: "jesser",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    name: "Central Panel",
    icon: "central-panel",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    name: "Task & Ticket",
    icon: "task-n-ticket",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function WorkspaceSelection() {
  const [selectedWorkspace, setSelectedWorkspace] = useState<string | null>(
    null
  );

  const handleWorkspaceSelect = (workspaceId: string) => {
    setSelectedWorkspace(workspaceId);
    // Navigate to workspace or dashboard
    console.log("Selected workspace:", workspaceId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Select Workspace</h1>
          <p className="text-gray-600">
            Choose a workspace to get started with your tasks
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockWorkspaces.map((workspace) => (
            <WorkspaceCard
              key={workspace.id}
              workspace={workspace}
              onClick={() => handleWorkspaceSelect(workspace.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

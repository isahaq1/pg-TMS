import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Workspace } from "@/types/workspace";
import { ArrowRight } from "lucide-react";

interface WorkspaceCardProps {
  workspace: Workspace;
  onClick?: () => void;
}

export default function WorkspaceCard({
  workspace,
  onClick,
}: WorkspaceCardProps) {
  return (
    <div
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 cursor-pointer border border-gray-200"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4 mb-4">
        {workspace.icon && (
          <div className="w-12 h-12 relative flex-shrink-0">
            <Image
              src={`/${workspace.icon}.png`}
              alt={workspace.name}
              fill
              className="object-contain"
            />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold truncate">{workspace.name}</h3>
          {workspace.description && (
            <p className="text-sm text-gray-600 truncate">
              {workspace.description}
            </p>
          )}
        </div>
      </div>
      <Button variant="ghost" className="w-full justify-end" size="sm">
        Open <ArrowRight className="w-4 h-4 ml-2" />
      </Button>
    </div>
  );
}

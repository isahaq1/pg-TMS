import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Plus className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
      <p className="text-gray-600 mb-6 max-w-sm">
        Get started by creating your first task. Organize your work and stay
        productive!
      </p>
      <Button>
        <Plus className="w-4 h-4 mr-2" />
        Create Task
      </Button>
    </div>
  );
}

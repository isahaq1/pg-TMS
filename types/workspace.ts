export interface Workspace {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type WorkspaceIcon =
  | "canteen"
  | "central-panel"
  | "dashboard"
  | "document"
  | "jesser"
  | "paragon"
  | "task-n-ticket";

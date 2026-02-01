// Routes
export const ROUTES = {
  HOME: "/",
  CREATE_NEW: "/create-new",
  DASHBOARD: "/dashboard",
  WORKSPACE: "/workspace",
  PROJECTS: "/projects",
  PROJECT: "/projects/:id",
  TASKS: "/tasks",
  TASK: "/tasks/:id",
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/api/auth/login",
    LOGOUT: "/api/auth/logout",
    FORGOT_PASSWORD: "/api/auth/forgot-password",
    RESET_PASSWORD: "/api/auth/reset-password",
  },
  PROJECTS: {
    LIST: "/api/projects",
    CREATE: "/api/projects",
    UPDATE: "/api/projects/:id",
    DELETE: "/api/projects/:id",
  },
  TASKS: {
    LIST: "/api/tasks",
    CREATE: "/api/tasks",
    UPDATE: "/api/tasks/:id",
    DELETE: "/api/tasks/:id",
  },
  SUBTASKS: {
    LIST: "/api/subtasks",
    CREATE: "/api/subtasks",
    UPDATE: "/api/subtasks/:id",
    DELETE: "/api/subtasks/:id",
  },
  WORKSPACES: {
    LIST: "/api/workspaces",
    CREATE: "/api/workspaces",
    UPDATE: "/api/workspaces/:id",
    DELETE: "/api/workspaces/:id",
  },
} as const;

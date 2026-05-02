import { create } from "zustand";

export type TaskStatus = "backlog" | "in_progress" | "done";
export type TaskPriority = "low" | "medium" | "high" | "urgent";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignedTo: string;
  projectId?: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
}

interface TaskStore {
  tasks: Task[];
  addTask: (title: string, description?: string, priority?: TaskPriority) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  deleteTask: (id: string) => void;
}

// Seed data
const seedTasks: Task[] = [
  {
    id: "1",
    title: "Check Gateway API endpoints",
    description: "Document all available REST endpoints from the OpenClaw Gateway",
    status: "in_progress",
    priority: "high",
    assignedTo: "rufus",
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Set up WebSocket connection",
    description: "Connect to Gateway WebSocket for real-time updates",
    status: "backlog",
    priority: "high",
    assignedTo: "rufus",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Design agent sprite sheet",
    description: "Create Rufus goldendoodle sprite with working/idle/sleeping/celebrating poses",
    status: "backlog",
    priority: "medium",
    assignedTo: "rufus",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Build memory browser component",
    description: "Journal-style view of daily memory files with search",
    status: "done",
    priority: "medium",
    assignedTo: "rufus",
    createdAt: new Date().toISOString(),
    startedAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
];

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: seedTasks,
  addTask: (title, description = "", priority = "medium") =>
    set((state) => ({
      tasks: [
        ...state.tasks,
        {
          id: crypto.randomUUID(),
          title,
          description,
          status: "backlog" as TaskStatus,
          priority,
          assignedTo: "",
          createdAt: new Date().toISOString(),
        },
      ],
    })),
  moveTask: (id, status) =>
    set((state) => ({
      tasks: state.tasks.map((t) =>
        t.id === id
          ? {
              ...t,
              status,
              startedAt: status === "in_progress" ? new Date().toISOString() : t.startedAt,
              completedAt: status === "done" ? new Date().toISOString() : t.completedAt,
            }
          : t
      ),
    })),
  deleteTask: (id) =>
    set((state) => ({
      tasks: state.tasks.filter((t) => t.id !== id),
    })),
}));
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import type { Task } from "@/store/tasks";
import clsx from "clsx";

const priorityBadge: Record<string, string> = {
  low: "badge-low",
  medium: "badge-medium",
  high: "badge-high",
  urgent: "badge-urgent",
};

const agentEmoji: Record<string, string> = {
  rufus: "🐩",
};

interface TaskCardProps {
  task: Task;
  isDragOverlay?: boolean;
}

export function TaskCard({ task, isDragOverlay }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, disabled: isDragOverlay });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={clsx(
        "card mb-3 cursor-grab active:cursor-grabbing",
        isDragging && "opacity-40",
        isDragOverlay && "rotate-2 shadow-xl"
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-bold text-sm text-[#1E1B4B] leading-tight">
          {task.title}
        </h3>
        <span className={clsx("badge", priorityBadge[task.priority])}>
          {task.priority}
        </span>
      </div>
      {task.description && (
        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2">
          {task.description}
        </p>
      )}
      <div className="flex items-center gap-2 mt-3 text-xs text-gray-400">
        {task.assignedTo && (
          <span className="flex items-center gap-1">
            {agentEmoji[task.assignedTo] ?? "🤖"} {task.assignedTo}
          </span>
        )}
        {task.status === "done" && <span>🎉</span>}
      </div>
    </div>
  );
}
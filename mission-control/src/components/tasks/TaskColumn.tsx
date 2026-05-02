import clsx from "clsx";

const colorMap: Record<string, { bg: string; border: string; header: string }> = {
  blue: { bg: "bg-blue-50", border: "border-blue-200", header: "text-blue-700" },
  yellow: { bg: "bg-yellow-50", border: "border-yellow-200", header: "text-yellow-700" },
  green: { bg: "bg-green-50", border: "border-green-200", header: "text-green-700" },
};

interface TaskColumnProps {
  id: string;
  title: string;
  count: number;
  color: string;
  children: React.ReactNode;
}

export function TaskColumn({ id, title, count, color, children }: TaskColumnProps) {
  const c = colorMap[color] ?? colorMap.blue;

  return (
    <div className={clsx("rounded-2xl border-2 p-4 flex flex-col", c.bg, c.border)}>
      <div className="flex items-center justify-between mb-4">
        <h2 className={clsx("font-extrabold text-base", c.header)}>{title}</h2>
        <span className={clsx("badge", c.bg === "bg-blue-50" ? "badge-backlog" : c.bg === "bg-yellow-50" ? "badge-in-progress" : "badge-done")}>
          {count}
        </span>
      </div>
      <div className="flex-1 overflow-y-auto space-y-0" id={id}>
        {children}
      </div>
    </div>
  );
}
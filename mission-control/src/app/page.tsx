"use client";

import { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  PointerSensor,
  useSensor,
  useSensors,
  type DragStartEvent,
  type DragEndEvent,
} from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { TaskCard } from "@/components/tasks/TaskCard";
import { TaskColumn } from "@/components/tasks/TaskColumn";
import { AddTaskButton } from "@/components/tasks/AddTaskButton";
import { useTaskStore, type Task } from "@/store/tasks";

export default function TasksPage() {
  const { tasks, moveTask, addTask } = useTaskStore();
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } })
  );

  const backlog = tasks.filter((t) => t.status === "backlog");
  const inProgress = tasks.filter((t) => t.status === "in_progress");
  const done = tasks.filter((t) => t.status === "done");

  function handleDragStart(event: DragStartEvent) {
    const task = tasks.find((t) => t.id === event.active.id);
    setActiveTask(task ?? null);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const overId = over.id as string;

    // Map column IDs to statuses
    const columnStatusMap: Record<string, Task["status"]> = {
      "col-backlog": "backlog",
      "col-in-progress": "in_progress",
      "col-done": "done",
    };

    const newStatus = columnStatusMap[overId];
    if (newStatus) {
      moveTask(taskId, newStatus);
    }

    // If dropped on another task, use that task's column
    const targetTask = tasks.find((t) => t.id === overId);
    if (targetTask) {
      moveTask(taskId, targetTask.status);
    }
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1B4B]">📋 Task Board</h1>
          <p className="text-sm text-gray-500 mt-1">
            Add tasks here — your agent picks them up on heartbeat
          </p>
        </div>
        <AddTaskButton onAdd={addTask} />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-3 gap-6 h-[calc(100vh-10rem)]">
          <TaskColumn id="col-backlog" title="Backlog" count={backlog.length} color="blue">
            <SortableContext items={backlog.map((t) => t.id)} strategy={verticalListSortingStrategy}>
              {backlog.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
            {backlog.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">
                No tasks yet — add one above!
              </p>
            )}
          </TaskColumn>

          <TaskColumn id="col-in-progress" title="In Progress" count={inProgress.length} color="yellow">
            <SortableContext items={inProgress.map((t) => t.id)} strategy={verticalListSortingStrategy}>
              {inProgress.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
            {inProgress.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">
                Nothing in progress — agent will pick up tasks here
              </p>
            )}
          </TaskColumn>

          <TaskColumn id="col-done" title="Done" count={done.length} color="green">
            <SortableContext items={done.map((t) => t.id)} strategy={verticalListSortingStrategy}>
              {done.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))}
            </SortableContext>
            {done.length === 0 && (
              <p className="text-sm text-gray-400 text-center py-8">
                Completed tasks land here 🎉
              </p>
            )}
          </TaskColumn>
        </div>

        <DragOverlay>
          {activeTask && <TaskCard task={activeTask} isDragOverlay />}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
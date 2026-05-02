"use client";

import { useState } from "react";
import type { TaskPriority } from "@/store/tasks";

interface AddTaskButtonProps {
  onAdd: (title: string, description?: string, priority?: TaskPriority) => void;
}

export function AddTaskButton({ onAdd }: AddTaskButtonProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<TaskPriority>("medium");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    onAdd(title.trim(), description.trim(), priority);
    setTitle("");
    setDescription("");
    setPriority("medium");
    setOpen(false);
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="bg-[#3B82F6] hover:bg-blue-600 text-white font-bold px-5 py-2.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm"
      >
        + Add Task
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50" onClick={() => setOpen(false)}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={handleSubmit}
        className="bg-white rounded-2xl shadow-2xl p-6 w-[420px] space-y-4"
      >
        <h2 className="font-extrabold text-lg text-[#1E1B4B]">New Task</h2>

        <input
          type="text"
          placeholder="Task title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-sm font-semibold"
          autoFocus
        />

        <textarea
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-blue-400 focus:outline-none text-sm resize-none h-20"
        />

        <div className="flex gap-2">
          {(["low", "medium", "high", "urgent"] as TaskPriority[]).map((p) => (
            <button
              type="button"
              key={p}
              onClick={() => setPriority(p)}
              className={`badge cursor-pointer text-xs ${priority === p ? `badge-${p}` : "bg-gray-100 text-gray-500"}`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex gap-3 justify-end pt-2">
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="px-4 py-2 rounded-xl text-sm font-semibold text-gray-500 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl text-sm font-bold bg-[#3B82F6] text-white hover:bg-blue-600 shadow-md"
          >
            Add Task
          </button>
        </div>
      </form>
    </div>
  );
}
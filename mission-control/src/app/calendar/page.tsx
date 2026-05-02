"use client";

import { useState } from "react";

interface CronJob {
  id: string;
  name: string;
  schedule: string;
  enabled: boolean;
  lastRun?: string;
  nextRun?: string;
  color: string;
}

const seedJobs: CronJob[] = [
  { id: "1", name: "Morning Digest", schedule: "0 8 * * *", enabled: true, lastRun: "2026-05-02 08:00", nextRun: "2026-05-03 08:00", color: "bg-blue-500" },
  { id: "2", name: "Email Check", schedule: "*/30 9-17 * * 1-5", enabled: true, lastRun: "2026-05-02 16:30", nextRun: "2026-05-02 17:00", color: "bg-green-500" },
  { id: "3", name: "Weekly Summary", schedule: "0 17 * * 5", enabled: true, nextRun: "2026-05-08 17:00", color: "bg-purple-500" },
  { id: "4", name: "Backup Memory", schedule: "0 2 * * *", enabled: false, color: "bg-orange-500" },
];

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const hours = Array.from({ length: 24 }, (_, i) => i);

export default function CalendarPage() {
  const [view, setView] = useState<"list" | "timeline">("list");
  const jobs = seedJobs;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1B4B]">📅 Calendar</h1>
          <p className="text-sm text-gray-500 mt-1">
            Every cron job and scheduled task your agent has set up
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setView("list")}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${view === "list" ? "bg-[#2D1B69] text-white" : "bg-gray-100 text-gray-600"}`}
          >
            List
          </button>
          <button
            onClick={() => setView("timeline")}
            className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${view === "timeline" ? "bg-[#2D1B69] text-white" : "bg-gray-100 text-gray-600"}`}
          >
            Timeline
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div className="space-y-3">
          {jobs.map((job) => (
            <div key={job.id} className="card flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${job.color} flex-shrink-0`} />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-sm text-[#1E1B4B]">{job.name}</h3>
                  {!job.enabled && <span className="badge badge-low">paused</span>}
                </div>
                <p className="text-xs text-gray-500 font-mono mt-0.5">{job.schedule}</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                {job.nextRun && <div>Next: {job.nextRun}</div>}
                {job.lastRun && <div>Last: {job.lastRun}</div>}
              </div>
              <div className="flex gap-1.5">
                <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-green-100 text-green-700 hover:bg-green-200">
                  ▶ Run
                </button>
                <button className="px-3 py-1.5 rounded-lg text-xs font-bold bg-gray-100 text-gray-600 hover:bg-gray-200">
                  ⏸ Pause
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card overflow-x-auto">
          <div className="min-w-[800px]">
            {/* Header */}
            <div className="flex border-b-2 border-gray-100">
              <div className="w-20 flex-shrink-0" />
              {days.map((d) => (
                <div key={d} className="flex-1 text-center text-xs font-bold text-gray-500 py-2">
                  {d}
                </div>
              ))}
            </div>
            {/* Time rows */}
            {hours.filter((h) => h >= 6 && h <= 21).map((h) => (
              <div key={h} className="flex border-b border-gray-50">
                <div className="w-20 flex-shrink-0 text-xs text-gray-400 py-2 text-right pr-3">
                  {h % 12 || 12}{h < 12 ? "a" : "p"}
                </div>
                {days.map((d) => (
                  <div key={d} className="flex-1 min-h-[28px] border-l border-gray-50 relative" />
                ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
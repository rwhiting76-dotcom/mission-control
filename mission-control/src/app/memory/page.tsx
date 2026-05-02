"use client";

import { useState } from "react";

interface MemoryEntry {
  date: string;
  content: string;
  type: "daily" | "longterm";
}

const seedMemory: MemoryEntry[] = [
  {
    date: "2026-05-02",
    type: "daily",
    content: "Started Mission Control dashboard project. Next.js app with 7 screens. Bright candy colors, playful cartoon vibe, Animal Crossing-style pixel art office.",
  },
  {
    date: "2026-04-25",
    type: "daily",
    content: "Built real analysis pipeline for hockey shot app. AVFoundation frame extraction via platform channel, ML Kit pose detection. Removed FFmpeg dependency.",
  },
  {
    date: "2026-04-24",
    type: "daily",
    content: "Updated PuckFinder branding with Ryan's puck logo. Favicon, PWA icons, manifest.json. Pushed to GitHub, Vercel auto-deployed.",
  },
  {
    date: "2026-04-22",
    type: "daily",
    content: "Ported hockey shot analyzer from Python to Dart. Core analysis engine, scoring, coaching cues. App runs on iPhone 17 Pro simulator.",
  },
];

const longTermMemory = `## Key Facts
- Ryan lives in Cottonwood Heights, Utah
- Prefers sharp, efficient communication
- Timezone: America/Los_Angeles (PDT)

## Active Projects
- **PuckFinder** — web app at puckfinder.hockey, 634+ sessions, 9 rinks
- **Hockey Shot Analyzer** — Flutter app, running on iPhone
- **Mission Control** — OpenClaw agent dashboard (NEW)

## Agents
- **Rufus** (🐩) — main agent, Goldendoodle personality

## Infrastructure
- Mac mini M-series, user rufus
- Railway (backend), Vercel (frontend)
- Porkbun domain: puckfinder.hockey`;

export default function MemoryPage() {
  const [tab, setTab] = useState<"daily" | "longterm">("daily");
  const [search, setSearch] = useState("");
  const [expanded, setExpanded] = useState<string | null>(null);

  const filtered = seedMemory.filter((m) =>
    m.type === tab &&
    (search === "" || m.content.toLowerCase().includes(search.toLowerCase()) || m.date.includes(search))
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-[#1E1B4B]">🧠 Memory</h1>
          <p className="text-sm text-gray-500 mt-1">
            Your agent&apos;s journal — what it knows and remembers
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search memory..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2.5 rounded-xl border-2 border-gray-200 focus:border-purple-400 focus:outline-none text-sm font-semibold"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setTab("daily")}
          className={`px-4 py-2 rounded-xl text-sm font-bold ${tab === "daily" ? "bg-[#A855F7] text-white" : "bg-gray-100 text-gray-600"}`}
        >
          📝 Daily
        </button>
        <button
          onClick={() => setTab("longterm")}
          className={`px-4 py-2 rounded-xl text-sm font-bold ${tab === "longterm" ? "bg-[#A855F7] text-white" : "bg-gray-100 text-gray-600"}`}
        >
          🧬 Long-term
        </button>
      </div>

      {tab === "daily" ? (
        <div className="space-y-3">
          {filtered.map((entry) => (
            <div
              key={entry.date}
              className="card cursor-pointer"
              onClick={() => setExpanded(expanded === entry.date ? null : entry.date)}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-lg">
                  📝
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-sm text-[#1E1B4B]">{entry.date}</h3>
                  <p className={clsx("text-xs text-gray-500 mt-0.5", expanded !== entry.date && "line-clamp-1")}>
                    {entry.content}
                  </p>
                </div>
                <span className="text-gray-300 text-xs">{expanded === entry.date ? "▼" : "▶"}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card">
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap font-[Nunito] text-sm text-gray-700 leading-relaxed">
              {longTermMemory}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}

function clsx(...args: (string | false | undefined)[]) {
  return args.filter(Boolean).join(" ");
}
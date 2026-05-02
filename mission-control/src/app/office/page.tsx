"use client";

import { useState } from "react";

type DeskState = "working" | "idle" | "sleeping" | "celebrating" | "error";

interface DeskAgent {
  id: string;
  name: string;
  emoji: string;
  state: DeskState;
  task?: string;
  deskItems: string[];
}

const deskAgents: DeskAgent[] = [
  {
    id: "rufus",
    name: "Rufus",
    emoji: "🐩",
    state: "working",
    task: "Building Mission Control",
    deskItems: ["💻", "☕", "📋"],
  },
  {
    id: "scout",
    name: "Scout",
    emoji: "🐱",
    state: "idle",
    deskItems: ["📚", "🧶"],
  },
  {
    id: "circuit",
    name: "Circuit",
    emoji: "🤖",
    state: "sleeping",
    deskItems: ["🔋", "📊"],
  },
];

const stateSprite: Record<DeskState, { action: string; zzz?: boolean; sparkles?: boolean; sweat?: boolean; confetti?: boolean }> = {
  working: { action: "💻", sparkles: true },
  idle: { action: "☕" },
  sleeping: { action: "💤", zzz: true },
  celebrating: { action: "🎉", confetti: true },
  error: { action: "😰", sweat: true },
};

export default function OfficePage() {
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#1E1B4B]">🏢 Visual Office</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your agent workspace — see who&apos;s at their desk
        </p>
      </div>

      {/* Office Scene */}
      <div className="card p-0 overflow-hidden">
        {/* Office Background */}
        <div className="relative bg-gradient-to-b from-sky-200 to-amber-50 min-h-[500px]">
          {/* Wall decorations */}
          <div className="absolute top-4 left-8 text-4xl opacity-30">🖼️</div>
          <div className="absolute top-4 left-24 text-4xl opacity-30">🗓️</div>
          <div className="absolute top-4 right-8 text-4xl opacity-30">🏆</div>

          {/* Whiteboard */}
          <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-white rounded-xl border-2 border-gray-300 p-3 w-48 shadow-sm">
            <p className="text-[10px] font-bold text-gray-400 text-center mb-1">SPRINT BOARD</p>
            <div className="space-y-1">
              <div className="flex items-center gap-1 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-gray-600">Build dashboard</span>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-yellow-400" />
                <span className="text-gray-600">Gateway API</span>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <span className="w-2 h-2 rounded-full bg-blue-400" />
                <span className="text-gray-600">Sprite design</span>
              </div>
            </div>
          </div>

          {/* Coffee Station */}
          <div className="absolute bottom-4 right-8 flex flex-col items-center gap-1">
            <div className="text-3xl">☕</div>
            <p className="text-[9px] text-gray-400 font-bold">COFFEE</p>
          </div>

          {/* Bookshelf */}
          <div className="absolute bottom-4 right-28 flex flex-col items-center gap-1">
            <div className="text-3xl">📚</div>
            <p className="text-[9px] text-gray-400 font-bold">DOCS</p>
          </div>

          {/* Agent Desks */}
          <div className="flex items-end justify-center gap-16 pt-32 pb-8 px-8">
            {deskAgents.map((agent) => {
              const sprite = stateSprite[agent.state];
              return (
                <div
                  key={agent.id}
                  className="flex flex-col items-center cursor-pointer group"
                  onClick={() => setSelected(selected === agent.id ? null : agent.id)}
                >
                  {/* Agent */}
                  <div className="relative mb-2">
                    <div className="text-7xl transition-transform group-hover:scale-110">
                      {agent.emoji}
                    </div>
                    {/* Status effects */}
                    {sprite.zzz && (
                      <div className="absolute -top-4 -right-4 text-2xl animate-bounce">
                        💤
                      </div>
                    )}
                    {sprite.sparkles && (
                      <div className="absolute -top-2 -right-3 text-lg animate-pulse">
                        ✨
                      </div>
                    )}
                    {sprite.sweat && (
                      <div className="absolute -top-2 -right-3 text-lg">
                        💧
                      </div>
                    )}
                    {sprite.confetti && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 text-xl">
                        🎊
                      </div>
                    )}
                  </div>

                  {/* Desk */}
                  <div className="bg-amber-200 border-2 border-amber-300 rounded-xl px-8 py-3 relative shadow-md min-w-[180px]">
                    {/* Desk items */}
                    <div className="absolute -top-3 left-3 right-3 flex gap-2 justify-center">
                      {agent.deskItems.map((item, i) => (
                        <span key={i} className="text-lg">{item}</span>
                      ))}
                    </div>

                    {/* Name plate */}
                    <div className="text-center mt-2">
                      <p className="text-[10px] font-extrabold text-amber-800">{agent.name}</p>
                    </div>
                  </div>

                  {/* Status bar */}
                  <div className="mt-2 px-3 py-1 rounded-lg bg-white/80 text-[10px] font-bold text-gray-500 shadow-sm">
                    {agent.state === "working" && "💻 Working"}
                    {agent.state === "idle" && "☕ Idle"}
                    {agent.state === "sleeping" && "💤 Asleep"}
                    {agent.state === "celebrating" && "🎉 Done!"}
                    {agent.state === "error" && "😰 Error"}
                  </div>

                  {/* Expanded info */}
                  {selected === agent.id && agent.task && (
                    <div className="mt-2 p-2 bg-white rounded-lg shadow-md text-xs text-gray-600 max-w-[200px] text-center">
                      <span className="font-bold text-gray-800">Now: </span>
                      {agent.task}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Floor */}
          <div className="absolute bottom-0 left-0 right-0 h-4 bg-amber-100 border-t-2 border-amber-200" />
        </div>
      </div>
    </div>
  );
}
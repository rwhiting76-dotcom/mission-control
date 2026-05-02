"use client";

import { useState } from "react";

type AgentState = "working" | "idle" | "sleeping" | "celebrating" | "error";

interface Agent {
  id: string;
  name: string;
  role: string;
  emoji: string;
  state: AgentState;
  currentTask?: string;
  lastActivity: string;
}

const agents: Agent[] = [
  { id: "rufus", name: "Rufus", role: "Main Agent", emoji: "🐩", state: "working", currentTask: "Building Mission Control dashboard", lastActivity: "Just now" },
  { id: "research", name: "Scout", role: "Research Agent", emoji: "🐱", state: "idle", lastActivity: "2 hours ago" },
  { id: "data", name: "Circuit", role: "Data Processing", emoji: "🤖", state: "sleeping", lastActivity: "1 day ago" },
];

const stateExpressions: Record<AgentState, { label: string; color: string; bg: string }> = {
  working: { label: "Hard at work 💪", color: "text-green-600", bg: "bg-green-50" },
  idle: { label: "Chilling ☕", color: "text-yellow-600", bg: "bg-yellow-50" },
  sleeping: { label: "Zzz... 💤", color: "text-gray-400", bg: "bg-gray-50" },
  celebrating: { label: "Nailed it! 🎉", color: "text-pink-600", bg: "bg-pink-50" },
  error: { label: "Uh oh 😰", color: "text-red-600", bg: "bg-red-50" },
};

export default function TeamPage() {
  const [selected, setSelected] = useState<string | null>(null);
  const selectedAgent = agents.find((a) => a.id === selected);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-extrabold text-[#1E1B4B]">👥 Team</h1>
        <p className="text-sm text-gray-500 mt-1">
          Your agent org — who&apos;s who and what they&apos;re up to
        </p>
      </div>

      {/* Mission Statement */}
      <div className="card mb-6 border-2 border-purple-200 bg-purple-50">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-[#2D1B69] flex items-center justify-center text-2xl">
            🎯
          </div>
          <div>
            <h3 className="font-extrabold text-sm text-[#2D1B69]">Mission</h3>
            <p className="text-xs text-purple-700 mt-0.5">
              Automate the boring stuff. Ship the fun stuff. Keep Ryan moving fast.
            </p>
          </div>
        </div>
      </div>

      {/* Agent Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {agents.map((agent) => {
          const expr = stateExpressions[agent.state];
          return (
            <div
              key={agent.id}
              onClick={() => setSelected(selected === agent.id ? null : agent.id)}
              className={`card cursor-pointer transition-all ${selected === agent.id ? "ring-2 ring-[#A855F7]" : ""}`}
            >
              {/* Agent Sprite Area */}
              <div className={`w-full h-28 rounded-xl ${expr.bg} flex items-center justify-center text-6xl mb-4 relative`}>
                {agent.emoji}
                {/* Expression indicator */}
                <div className={`absolute bottom-2 right-3 text-xs font-bold ${expr.color}`}>
                  {expr.label}
                </div>
              </div>

              <h3 className="font-extrabold text-sm text-[#1E1B4B]">{agent.name}</h3>
              <p className="text-xs text-gray-500">{agent.role}</p>
              <p className="text-xs text-gray-400 mt-1.5">Last active: {agent.lastActivity}</p>

              {selected === agent.id && agent.currentTask && (
                <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-200">
                  <p className="text-xs font-bold text-blue-700">Current Task</p>
                  <p className="text-xs text-blue-600 mt-0.5">{agent.currentTask}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
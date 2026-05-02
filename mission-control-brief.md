# Mission Control Dashboard — Project Brief

## Vision
A single web interface to monitor and control everything your OpenClaw agent does — sessions, cron jobs, memory, skills, sub-agents, and system health. Your agent's command center.

---

## Core Problem
OpenClaw is powerful but fragmented — you interact via Telegram, manage crons through CLI, check memory in files, and monitor sessions with status commands. There's no unified view of what your agent is doing, what it knows, and what's scheduled next.

---

## Goals
1. **Visibility** — See everything your agent is up to in one place
2. **Control** — Take action without switching to CLI or Telegram
3. **Speed** — Faster than messaging back and forth for routine tasks
4. **Context** — Understand what your agent knows and why it's doing things

---

## Key Features

### 🔴 Live Sessions
- List all active/recent sessions with status
- View conversation history per session
- Send messages to any session
- Kill or steer sub-agents
- Session cost/time tracking

### ⏰ Cron & Schedules
- List all cron jobs (enabled/disabled)
- View next run time + run history
- Create/edit/delete jobs inline
- Manual trigger (run now)
- Pause/resume jobs

### 🧠 Memory
- Browse MEMORY.md + memory/*.md files
- Search memory semantically
- Edit memory files inline
- See what the agent knows about specific topics

### 🛠 Skills
- List installed skills
- View skill details/documentation
- Enable/disable skills (if supported)

### 📊 System Health
- Gateway status (running/stopped)
- Model usage + costs
- Token consumption over time
- Uptime + error rates
- Node/connection status

### 💬 Activity Feed
- Real-time stream of agent actions
- Message sent/received events
- Cron execution results
- Sub-agent completions
- Error alerts

### ⚙️ Config
- View/edit OpenClaw config
- Manage channels (Telegram, etc.)
- Plugin management
- Model overrides per session

---

## Tech Stack
- **Frontend:** Next.js + React + Tailwind
- **Real-time:** WebSocket for live updates (or SSE)
- **API:** OpenClaw's existing Gateway API
- **Auth:** None — local-only, runs on your machine
- **Deploy:** Local only (`npm run dev` on Mac mini)

---

## Architecture

```
localhost:3000                    localhost:XXXX
┌─────────────────────────────────┐
│     Mission Control Dashboard    │
│         (Next.js Web UI)         │
└────────────┬────────────────────┘
             │ WebSocket + REST
┌────────────▼────────────────────┐
│      Gateway API (existing)      │
│   sessions / cron / memory /     │
│        config / status           │
└─────────────────────────────────┘
```

Local-only dashboard. Thin client over OpenClaw's Gateway API — no new backend, no auth, no deployment. Runs on your Mac mini.

---

## MVP Scope (v1)
Ship these first, iterate from there:

1. **Session list + history viewer** — the #1 pain point
2. **Cron job manager** — create, view, trigger, delete
3. **Memory browser + search** — see what the agent knows
4. **Activity feed** — real-time stream of events
5. **System status card** — health at a glance

---

## Open Questions
- Does the Gateway expose a REST/WebSocket API we can hit? (Need to check docs)
- Real-time: WebSocket or polling interval?
- Mobile-responsive or desktop-first?

---

## Success Criteria
- Can view all sessions and their history without opening Telegram
- Can manage cron jobs without CLI
- Can search and edit agent memory
- Feels fast and responsive
- One page, zero context-switching
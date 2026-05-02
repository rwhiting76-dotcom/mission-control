# Mission Control — Project Brief

## What Is This

A local-only Next.js dashboard that gives you full visibility and control over your OpenClaw agent. One web interface — every session, task, cron job, memory file, doc, and sub-agent — in a playful, cartoon-inspired UI that makes managing an AI agent feel like running a cozy game studio instead of a terminal.

Runs on `localhost` on your Mac mini. No auth. No deploy. Just `npm run dev`.

---

## Visual Style

**Vibe:** Playful cartoon — bright, saturated, fun. Think Animal Crossing meets a mission control center.

**Pixel art style:** Modern cozy-game (Stardew Valley / Animal Crossing), NOT retro 8-bit. Rounded shapes, warm character designs, expressive sprites. High enough resolution to show personality and small details (facial expressions, desk accessories, environmental props).

**Color palette:** Bright and saturated. Primary candy colors — bold blues, vivid greens, warm yellows, punchy pinks. High contrast. No pastels, no muted tones, no corporate grays. The UI should feel alive and cheerful, like a Saturday morning cartoon.

**Status indicators:** Character-expression driven, NOT colored dots. Agent sprites change expression/pose based on state:
- **Working:** Focused expression, typing at desk, maybe steam/energy lines radiating
- **Idle:** Leaning back, feet up, maybe sipping coffee
- **Sleeping/Offline:** Head on desk, Zzz floating
- **Error:** Panicked expression, sweat drops, exclamation marks
- **Celebrating:** Confetti, arms up, big grin (task completed)

Small status text labels accompany sprites for clarity, but the primary signal is the character's expression.

**Typography:** Rounded, friendly. Something like Nunito, Quicksand, or Baloo 2. Headers are bold and chunky. Body text is clean but never clinical. Avoid monospace or system fonts — this isn't a terminal.

**Cards and containers:** Rounded corners (12-16px), subtle drop shadows, maybe a slight inner glow on hover. Cards should feel like physical objects you could pick up — think playing cards or board game tiles.

**Sidebar navigation:** Always visible, left side. Each nav item has an icon + label. Icons should be themed to the cozy-game aesthetic (not generic Material icons). Example: a tiny calendar icon for Calendar that looks hand-drawn, a little notepad for Memory, a desk lamp for the Office view.

---

## Screens (7 Total)

### 1. Tasks — Task Board

Kanban-style board with three columns: **Backlog → In Progress → Done**

- You (the human) add tasks to Backlog
- On every heartbeat, the agent picks up assigned tasks and moves them to In Progress
- When complete, tasks move to Done — you see the celebration sprite
- Each task card shows: title, description, priority tag (color-coded), assigned agent, time started, time completed
- Drag-and-drop to reorder within columns
- Click a task to expand: full description, linked memories, linked project, conversation thread where it was assigned

**Key interaction:** This is the primary way you direct your agent. No more "hey do X" in Telegram — put it on the board and the agent grabs it.

### 2. Calendar — Cron & Schedule Viewer

Visual calendar showing every cron job and scheduled task the agent has set up.

- Month/week/day views
- Each cron job is a color-coded event block
- Click an event to see: job name, schedule expression, last run, next run, run history
- Inline controls: Run Now, Pause, Edit, Delete
- Catches the "I said I'd schedule it but didn't" problem — if it's not on the calendar, it doesn't exist
- Shows both recurring crons and one-shot reminders

### 3. Projects — Project Tracker

Every project you're working on, with progress tracking.

- Each project card shows: name, status (active/paused/complete), progress bar, linked task count, last activity timestamp
- Click into a project to see:
  - Linked tasks (filtered task board view)
  - Linked memory entries
  - Linked docs
  - Key decisions / milestones
- The killer feature: "What moves this project forward today?" — a smart summary that surfaces the next actionable item

### 4. Memory — Journal Browser

Journal-style view of the agent's memory files.

- **Daily tab:** Chronological feed of `memory/YYYY-MM-DD.md` files, newest first. Each entry shows date, summary, and expandable content
- **Long-term tab:** `MEMORY.md` rendered as a structured document with collapsible sections
- **Search:** Full-text search across all memory files + semantic search (if Gateway API supports it)
- Inline edit: click any entry to edit, save writes back to the file

### 5. Docs — Document Index

Every document the agent has written — newsletters, content, briefs, reports.

- Grid or list view of all docs
- Each card: title, type (newsletter/brief/report), date, word count, linked project
- Full-text search
- Click to view rendered document
- Download as PDF/Markdown

### 6. Team — Agent Org Chart

Your agent organization: who's who, what they do, how they relate.

- Agent cards with: name, role, avatar/sprite, current status (expression-driven), active session, last activity
- Org chart / relationship view (parent → sub-agent)
- Mission statement (editable)
- Agent roles and capabilities
- "Hire a new agent" flow — define role, configure model, set permissions

### 7. Visual Office — 2D Pixel-Art Workspace

The signature screen. An Animal Crossing-style isometric/2D office scene.

- Each agent has a desk/workstation
- Agent sprites sit at their desk when working, appear idle/away when not
- Click an agent to see their status card (current task, session, recent activity)
- Environmental details: bookshelves with project titles, a calendar on the wall, a coffee station, whiteboard with current sprint tasks
- The office evolves: new agents get new desks, completed projects get trophies on shelves
- This is both functional (quick visual status of all agents) and delightful (makes the dashboard feel alive)

---

## Technical Architecture

```
localhost:3000                    localhost:XXXX
┌─────────────────────────────────┐
│     Mission Control Dashboard    │
│       Next.js + React + Tailwind │
└────────────┬────────────────────┘
             │ REST + WebSocket
┌────────────▼────────────────────┐
│      OpenClaw Gateway API        │
│   sessions / cron / memory /     │
│        config / status           │
└─────────────────────────────────┘
```

- **Framework:** Next.js (App Router) + React + Tailwind CSS
- **State:** React Query for server state, Zustand for local UI state
- **Real-time:** WebSocket connection to Gateway for live updates (agent status, task state changes, cron executions)
- **API layer:** Thin wrapper over OpenClaw Gateway REST endpoints
- **Pixel art:** Sprite sheets rendered as CSS/canvas — no heavy game engine. Consider `pixi.js` or plain HTML/CSS sprites
- **Drag-and-drop:** `@dnd-kit/core` for task board
- **Local only:** No auth, no deploy pipeline, runs on Mac mini

---

## MVP Scope (Ship First)

1. **Tasks** — The kanban board. This is the #1 feature. Agent picks up tasks on heartbeat, you see it happen live.
2. **Calendar** — Cron visibility. Know what's scheduled.
3. **Memory** — Browse and search what your agent knows.
4. **Visual Office** — The signature screen. Even a simple version (agents at desks with expression changes) makes the whole thing feel different from a boring dashboard.

Then add: Projects, Docs, Team.

---

## Data Model (Conceptual)

```
Task
├── id, title, description
├── status: backlog | in_progress | done
├── priority: low | medium | high | urgent
├── assigned_to: agent_id
├── project_id (optional)
├── created_at, started_at, completed_at
└── conversation_id (where it was assigned)

Project
├── id, name, description
├── status: active | paused | complete
├── progress (0-100)
└── last_activity

CronJob
├── id, name, schedule_expr
├── enabled, next_run, last_run
└── run_history[]

MemoryEntry
├── date, file_path
├── content (markdown)
└── tags[]

Document
├── id, title, type
├── content (markdown)
├── project_id (optional)
└── created_at

Agent
├── id, name, role
├── sprite_state: working | idle | sleeping | error | celebrating
├── current_session_id
└── last_activity
```

---

## Agent Character Design Notes

- **Rufus (main agent):** Goldendoodle. Floppy ears, glasses when working, tongue out when celebrating. The star of the Visual Office.
- **Sub-agents:** Distinct characters — different species or styles. A cat for research, a robot for data processing, etc. Each has their own desk personality (posters, mugs, desk toys).
- **Expressions are the status system.** No green/red dots. The character IS the indicator.

---

## Success Criteria

- Can add a task and watch the agent pick it up in real-time
- Can see every cron job on a calendar without opening a terminal
- Can search agent memory and read/edit entries
- The Visual Office makes you smile when you open it
- Feels like a game, works like a tool
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

const navItems = [
  { href: "/", label: "Tasks", emoji: "📋" },
  { href: "/calendar", label: "Calendar", emoji: "📅" },
  { href: "/projects", label: "Projects", emoji: "🚀" },
  { href: "/memory", label: "Memory", emoji: "🧠" },
  { href: "/docs", label: "Docs", emoji: "📄" },
  { href: "/team", label: "Team", emoji: "👥" },
  { href: "/office", label: "Office", emoji: "🏢" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-56 flex-shrink-0 bg-[#2D1B69] text-white flex flex-col">
      {/* Logo */}
      <div className="p-5 border-b border-white/10">
        <h1 className="text-xl font-extrabold tracking-tight flex items-center gap-2">
          <span className="text-2xl">🐩</span>
          <span>Mission Control</span>
        </h1>
        <p className="text-xs text-white/50 mt-1">Agent Command Center</p>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-1 px-3">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all",
                active
                  ? "bg-white/15 text-white shadow-sm"
                  : "text-white/60 hover:bg-white/10 hover:text-white"
              )}
            >
              <span className="text-lg">{item.emoji}</span>
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Status footer */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-xs text-white/50">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span>Gateway Online</span>
        </div>
      </div>
    </aside>
  );
}
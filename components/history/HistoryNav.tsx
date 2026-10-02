"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Archive,
  BookOpen,
  CalendarDays,
  Gamepad2,
  Home,
  Layers,
  Library,
  Map as MapIcon,
  Users,
} from "lucide-react";

const LINKS = [
  { href: "/history", label: "الرئيسية", icon: Home, exact: true },
  { href: "/history/units", label: "الوحدات والدروس", icon: BookOpen, exact: false },
  { href: "/history/terms", label: "المصطلحات", icon: Library, exact: false },
  { href: "/history/personalities", label: "الشخصيات", icon: Users, exact: false },
  { href: "/history/chronology", label: "التواريخ", icon: CalendarDays, exact: false },
  { href: "/history/maps", label: "الخرائط", icon: MapIcon, exact: false },
  { href: "/history/flashcards", label: "البطاقات", icon: Layers, exact: false },
  { href: "/history/bac-archives", label: "الأرشيف", icon: Archive, exact: false },
  { href: "/games", label: "الألعاب", icon: Gamepad2, exact: false },
];

export function HistoryNav() {
  const pathname = usePathname();
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/90 backdrop-blur dark:border-zinc-800 dark:bg-[#0F1115]/90">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex items-center justify-between gap-3 py-3">
          <Link href="/history" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[#0F5132] text-white">
              <BookOpen className="size-4" />
            </span>
            <span className="leading-tight">
              <span className="block text-sm font-black">قسم التاريخ</span>
              <span className="block text-[11px] text-zinc-500 dark:text-zinc-400">
                قاعدة V5 (جناح الدروس) — بكالوريا الجزائر
              </span>
            </span>
          </Link>
          <Link
            href="/courses/HISTORY_GEOGRAPHY"
            className="focus-ring hidden rounded-xl border border-zinc-200 px-3 py-1.5 text-xs font-bold text-zinc-600 transition hover:border-[#0F5132] hover:text-[#0F5132] sm:inline-block dark:border-zinc-700 dark:text-zinc-300"
          >
            ← دروس التاريخ والجغرافيا
          </Link>
        </div>
        <nav aria-label="أقسام التاريخ" className="nice-scroll -mx-1 flex gap-1.5 overflow-x-auto px-1 pb-3">
          {LINKS.map(({ href, label, icon: Icon, exact }) => {
            const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={`focus-ring inline-flex shrink-0 items-center gap-1.5 rounded-xl px-3 py-2 text-[13px] font-bold transition ${
                  active
                    ? "bg-[#0F5132] text-white shadow-sm"
                    : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
                }`}
              >
                <Icon className="size-3.5" />
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

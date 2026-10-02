"use client";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

function currentTheme(): "light" | "dark" {
  if (typeof document === "undefined") return "light";
  return document.documentElement.classList.contains("dark") ? "dark" : "light";
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setTheme(currentTheme());
    setMounted(true);
  }, []);

  const toggle = (): void => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("bac-theme", next);
    } catch {
      /* storage unavailable — theme still applies for this session */
    }
    setTheme(next);
  };

  if (!mounted) {
    return <span className="size-9 rounded-xl border border-zinc-200 dark:border-zinc-700" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "الوضع النهاري" : "الوضع الليلي"}
      className="focus-ring grid size-9 place-items-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:border-[#0F5132] hover:text-[#0F5132] dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

"use client";
import { useEffect } from "react";

// Inlined at build time so the worker registers correctly when the site is
// served from a sub-path (e.g. /bac-mentor-ai/ on GitHub Pages).
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function ServiceWorkerRegister(): null {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register(`${BASE_PATH}/sw.js`).catch(() => {});
    }
  }, []);
  return null;
}

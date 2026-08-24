"use client";

import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.getAttribute("data-theme") === "dark");
  }, []);

  const toggle = () => {
    const root = document.documentElement;
    const next = dark ? "light" : "dark";
    const apply = () => {
      if (next === "dark") root.setAttribute("data-theme", "dark");
      else root.removeAttribute("data-theme");
    };
    try { localStorage.setItem("theme", next); } catch { /* private mode */ }
    setDark(next === "dark");
    const doc = document as Document & {
      startViewTransition?: (cb: () => void) => { finished: Promise<void>; ready: Promise<void> };
    };
    if (doc.startViewTransition) {
      // browser snapshots the page and crossfades it as one unit - perfectly synchronized
      const t = doc.startViewTransition(apply);
      // a rapid re-toggle aborts the in-flight transition; that's fine, silence it
      t.finished.catch(() => {});
      t.ready.catch(() => {});
    } else {
      root.classList.add("theme-switching");
      apply();
      window.setTimeout(() => root.classList.remove("theme-switching"), 200);
    }
  };

  return (
    <button className="theme-toggle" onClick={toggle} aria-label={`Switch to ${dark ? "light" : "dark"} mode`}>
      <span className="theme-toggle__track">
        <span className="theme-toggle__knob">
          <svg className="theme-toggle__icon theme-toggle__icon--sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
            <circle cx="12" cy="12" r="4.5" fill="currentColor" stroke="none" />
            <path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" />
          </svg>
          <svg className="theme-toggle__icon theme-toggle__icon--moon" viewBox="0 0 24 24" fill="currentColor">
            <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
          </svg>
        </span>
      </span>
      {dark ? "DARK" : "LIGHT"}
    </button>
  );
}

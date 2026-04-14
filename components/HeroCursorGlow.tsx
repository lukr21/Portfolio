"use client";

import { useRef, type ReactNode } from "react";

export default function HeroCursorGlow({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
    el.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section ref={ref} className="hero" onMouseMove={handleMouseMove}>
      {children}
    </section>
  );
}

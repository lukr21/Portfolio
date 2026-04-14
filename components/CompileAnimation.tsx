"use client";

import { useEffect, useRef, type ReactNode } from "react";

export default function CompileAnimation({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const items = el.querySelectorAll(".compile-el");
    items.forEach((item, i) => {
      setTimeout(() => item.classList.add("compiled"), 150 + i * 120);
    });
  }, []);

  return <div ref={ref}>{children}</div>;
}

"use client";

import { useRef, useEffect, useState, type ReactNode, type ElementType } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  tag?: ElementType;
  id?: string;
}

export default function ScrollReveal({
  children,
  className = "",
  tag: Tag = "div",
  id,
}: ScrollRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05, rootMargin: "0px 0px 50px 0px" },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      id={id}
      className={`reveal${visible ? " visible" : ""}${className ? ` ${className}` : ""}`}
    >
      {children}
    </Tag>
  );
}

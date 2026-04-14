"use client";

import { useState, type ReactNode } from "react";

interface CopyEmailProps {
  email: string;
  children: ReactNode;
  className?: string;
}

export default function CopyEmail({ email, children, className }: CopyEmailProps) {
  const [copied, setCopied] = useState(false);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(email).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <span style={{ position: "relative", display: "inline-flex" }}>
      <a
        href="#"
        onClick={handleClick}
        className={className}
        title="Copy email"
        aria-label="Copy email address"
      >
        {children}
      </a>
      {copied && (
        <span
          style={{
            position: "absolute",
            left: "50%",
            bottom: "calc(100% + 6px)",
            transform: "translateX(-50%)",
            background: "var(--text)",
            color: "var(--bg)",
            fontSize: "0.7rem",
            padding: "0.25rem 0.5rem",
            borderRadius: "4px",
            whiteSpace: "nowrap",
            pointerEvents: "none",
            animation: "fadeIn 0.15s ease",
          }}
        >
          Copied!
        </span>
      )}
    </span>
  );
}

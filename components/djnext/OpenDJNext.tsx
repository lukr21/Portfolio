"use client";

/* Link into the DJNext app. The transition is the site nav sliding away,
   driven by CSS on the destination page (body:has(.djs-page) rules). */

import Link from "next/link";
import { CSSProperties, ReactNode } from "react";

export default function OpenDJNext({ className, style, children }: { className?: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <Link href="/djnext/app" className={className} style={style}>
      {children}
    </Link>
  );
}

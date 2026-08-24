import { NextRequest, NextResponse } from "next/server";

const ALLOWED = [/\.dzcdn\.net$/, /\.mzstatic\.com$/, /^audio-ssl\.itunes\.apple\.com$/, /\.phobos\.apple\.com$/];

export async function GET(req: NextRequest) {
  const u = req.nextUrl.searchParams.get("u") || "";
  let url: URL;
  try {
    url = new URL(u);
  } catch {
    return NextResponse.json({ error: "bad url" }, { status: 400 });
  }
  if (url.protocol !== "https:" || !ALLOWED.some((re) => re.test(url.hostname))) {
    return NextResponse.json({ error: "host not allowed" }, { status: 403 });
  }
  const r = await fetch(url.toString());
  if (!r.ok) return NextResponse.json({ error: `upstream ${r.status}` }, { status: 502 });
  const buf = await r.arrayBuffer();
  if (buf.byteLength > 8 * 1024 * 1024) return NextResponse.json({ error: "too large" }, { status: 413 });
  return new NextResponse(buf, {
    headers: {
      "Content-Type": r.headers.get("Content-Type") || "audio/mpeg",
      "Cache-Control": "public, max-age=86400",
    },
  });
}

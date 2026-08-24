import { NextRequest, NextResponse } from "next/server";

const GSB = "https://api.getsong.co";

/*
 * Shared track cache: ISRC -> {bpm, key}. Any track analyzed or looked up once
 * is served from here for every later visitor, so GetSongBPM load scales with
 * NEW tracks, not with traffic. Backed by Upstash Redis via REST (the store
 * Vercel's marketplace provisions); if the env vars are absent the cache
 * no-ops and the route behaves as before. Track data is anonymous catalog
 * data - nothing about the requesting user is stored.
 */
const CACHE_VER = "djnext:v1:";
const kvUrl = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL || "";
const kvToken = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN || "";

interface CachedTrack { bpm: number | null; key: string | null; }

async function cacheGet(isrc: string): Promise<CachedTrack | null> {
  if (!kvUrl || !kvToken || !isrc) return null;
  try {
    const r = await fetch(`${kvUrl}/get/${CACHE_VER}${encodeURIComponent(isrc)}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
    });
    if (!r.ok) return null;
    const d = await r.json();
    return d.result ? (JSON.parse(d.result) as CachedTrack) : null;
  } catch {
    return null;
  }
}

async function cacheSet(isrc: string, value: CachedTrack): Promise<void> {
  if (!kvUrl || !kvToken || !isrc) return;
  try {
    await fetch(`${kvUrl}/set/${CACHE_VER}${encodeURIComponent(isrc)}/${encodeURIComponent(JSON.stringify(value))}`, {
      headers: { Authorization: `Bearer ${kvToken}` },
    });
  } catch { /* cache write is best-effort */ }
}

const VALID_CAMELOT = /^(1[0-2]|[1-9])[AB]$/;
const validBpm = (b: unknown): b is number => typeof b === "number" && isFinite(b) && b >= 40 && b <= 250;

function clean(s: string): string {
  return s
    .replace(/\s*[([].*?(remix|edit|mix|version|feat\.?|ft\.?|remaster).*?[)\]]/gi, "")
    .replace(/\s*-\s*(radio edit|original mix|extended mix|remaster(ed)?( \d{4})?)$/i, "")
    .trim();
}
const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

async function getJson(url: string): Promise<Record<string, unknown> | null> {
  try {
    const r = await fetch(url, { headers: { "User-Agent": "DJNext/1.0 (lucaskrippendorff.com/djnext)" } });
    if (!r.ok) return null;
    return await r.json();
  } catch {
    return null;
  }
}

async function gsbLookup(title: string, artist: string): Promise<{ bpm: number | null; key: string | null } | null> {
  const apiKey = process.env.DJNEXT_GSB_KEY;
  if (!apiKey) return null;
  const mainArtist = artist.split(",")[0].split("&")[0].trim();
  const lookup = `song:${clean(title)} artist:${mainArtist}`;
  const d = await getJson(`${GSB}/search/?type=both&lookup=${encodeURIComponent(lookup)}&api_key=${apiKey}`);
  const results = d?.search;
  if (!Array.isArray(results) || !results.length) return null;
  const wantT = norm(clean(title)), wantA = norm(mainArtist);
  let best: { sc: number; r: Record<string, unknown> } | null = null;
  for (const r of results) {
    const rt = norm(String(r.title || ""));
    const ra = norm(String((r.artist as Record<string, unknown>)?.name || ""));
    const sc =
      (rt === wantT ? 2 : rt.includes(wantT) || wantT.includes(rt) ? 1 : 0) +
      (ra === wantA ? 2 : ra.includes(wantA) || wantA.includes(ra) ? 1 : 0);
    if (!best || sc > best.sc) best = { sc, r };
  }
  if (!best || best.sc < 2) return null;
  const r = best.r;
  const bpm = r.tempo ? parseFloat(String(r.tempo)) : null;
  return { bpm: bpm && isFinite(bpm) ? bpm : null, key: (r.key_of as string) || (r.open_key as string) || null };
}

async function deezerLookup(title: string, artist: string, isrc: string) {
  const mainArtist = artist.split(",")[0].split("&")[0].trim();
  const wantA = norm(mainArtist);
  if (isrc) {
    const d = await getJson(`https://api.deezer.com/track/isrc:${encodeURIComponent(isrc)}`);
    if (d && !d.error) {
      return { bpm: d.bpm && Number(d.bpm) > 0 ? Number(d.bpm) : null, preview: (d.preview as string) || null };
    }
  }
  const queries = [`track:"${clean(title)}" artist:"${mainArtist}"`, `${clean(title)} ${mainArtist}`];
  for (const q of queries) {
    const d = await getJson(`https://api.deezer.com/search?q=${encodeURIComponent(q)}&limit=8`);
    for (const r of (d?.data as Record<string, unknown>[]) || []) {
      const ra = norm(String((r.artist as Record<string, unknown>)?.name || ""));
      if (wantA && ra && !(ra.includes(wantA) || wantA.includes(ra))) continue;
      const t = await getJson(`https://api.deezer.com/track/${r.id}`);
      return {
        bpm: t?.bpm && Number(t.bpm) > 0 ? Number(t.bpm) : null,
        preview: (r.preview as string) || (t?.preview as string) || null,
      };
    }
  }
  return { bpm: null, preview: null };
}

async function itunesPreview(title: string, artist: string): Promise<string | null> {
  const mainArtist = artist.split(",")[0].split("&")[0].trim();
  const wantA = norm(mainArtist);
  const d = await getJson(
    `https://itunes.apple.com/search?media=music&limit=5&term=${encodeURIComponent(`${clean(title)} ${mainArtist}`)}`
  );
  for (const r of (d?.results as Record<string, unknown>[]) || []) {
    const ra = norm(String(r.artistName || ""));
    if (r.previewUrl && wantA && (ra.includes(wantA) || wantA.includes(ra))) return r.previewUrl as string;
  }
  return null;
}

export async function GET(req: NextRequest) {
  const p = req.nextUrl.searchParams;
  if (p.get("diag") === "1") {
    // deployment check: is the shared track cache configured and reachable?
    if (!kvUrl || !kvToken) return NextResponse.json({ cache: "not configured" });
    const probe = await cacheGet("DIAGPROBE0000");
    void probe;
    try {
      const r = await fetch(`${kvUrl}/ping`, { headers: { Authorization: `Bearer ${kvToken}` } });
      return NextResponse.json({ cache: r.ok ? "configured and reachable" : `configured but store returned ${r.status}` });
    } catch {
      return NextResponse.json({ cache: "configured but unreachable" });
    }
  }
  const title = p.get("title") || "";
  const artist = p.get("artist") || "";
  const isrc = p.get("isrc") || "";
  if (!title || !artist) return NextResponse.json({ error: "title and artist required" }, { status: 400 });

  const cached = await cacheGet(isrc);
  if (cached && (cached.bpm || cached.key)) {
    return NextResponse.json({ bpm: cached.bpm, key: cached.key, preview: null, previewKind: null, source: "cache" });
  }

  const gsb = await gsbLookup(title, artist);
  let bpm = gsb?.bpm ?? null;
  const key = gsb?.key ?? null;
  let preview: string | null = null;
  let previewKind: string | null = null;

  if (!bpm || !key) {
    const dz = await deezerLookup(title, artist, isrc);
    bpm = bpm || dz.bpm;
    if (dz.preview) {
      preview = dz.preview;
      previewKind = "mp3";
    } else {
      const it = await itunesPreview(title, artist);
      if (it) {
        preview = it;
        previewKind = "m4a";
      }
    }
  }
  if (bpm && key) await cacheSet(isrc, { bpm, key });
  return NextResponse.json({ bpm, key, preview, previewKind, source: gsb ? "getsongbpm" : bpm || preview ? "deezer/itunes" : "miss" });
}

/*
 * Browsers report their local analysis results here so one visitor's
 * WASM analysis benefits everyone. Write-once per ISRC (existing entries are
 * never overwritten) and values are strictly validated, which bounds what a
 * hostile client could do to "wrong number for a track nobody had cached yet".
 */
export async function POST(req: NextRequest) {
  if (!kvUrl || !kvToken) return NextResponse.json({ ok: false });
  let body: { isrc?: unknown; bpm?: unknown; key?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad json" }, { status: 400 });
  }
  const isrc = typeof body.isrc === "string" && /^[A-Z0-9]{12}$/i.test(body.isrc) ? body.isrc : null;
  const bpm = validBpm(body.bpm) ? Math.round((body.bpm as number) * 10) / 10 : null;
  const key = typeof body.key === "string" && VALID_CAMELOT.test(body.key) ? body.key : null;
  if (!isrc || (!bpm && !key)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const existing = await cacheGet(isrc);
  if (existing) return NextResponse.json({ ok: true, kept: "existing" });
  await cacheSet(isrc, { bpm, key });
  return NextResponse.json({ ok: true });
}

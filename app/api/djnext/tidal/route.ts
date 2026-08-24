import { NextRequest, NextResponse } from "next/server";

const AUTH = "https://auth.tidal.com/v1/oauth2/token";
const BASE = "https://openapi.tidal.com/v2";
const MAX_PAGES = 40; // 800 tracks

let cachedToken: { token: string; exp: number } | null = null;

async function getToken(): Promise<string> {
  if (cachedToken && Date.now() < cachedToken.exp) return cachedToken.token;
  const id = process.env.DJNEXT_TIDAL_CLIENT_ID!;
  const secret = process.env.DJNEXT_TIDAL_CLIENT_SECRET!;
  const r = await fetch(AUTH, {
    method: "POST",
    headers: {
      Authorization: `Basic ${Buffer.from(`${id}:${secret}`).toString("base64")}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  if (!r.ok) throw new Error(`tidal auth ${r.status}`);
  const d = await r.json();
  cachedToken = { token: d.access_token, exp: Date.now() + (d.expires_in - 120) * 1000 };
  return cachedToken.token;
}

function extractUuid(input: string): string | null {
  const m = input.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i);
  return m ? m[0] : null;
}

async function tidalGet(url: string, token: string): Promise<Response> {
  for (let attempt = 0; attempt < 5; attempt++) {
    const r = await fetch(url, {
      headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.api+json" },
    });
    if (r.status !== 429) return r;
    await new Promise((res) => setTimeout(res, 1500 * (attempt + 1)));
  }
  throw new Error("tidal rate limited");
}

export async function GET(req: NextRequest) {
  const input = req.nextUrl.searchParams.get("playlist") || "";
  let uuid = extractUuid(input);
  if (!uuid && /^https?:\/\/(tidal\.link|t\.tidal\.com)\//.test(input.trim())) {
    // short share link: follow redirects server-side to find the UUID
    try {
      const r = await fetch(input.trim(), { redirect: "follow" });
      uuid = extractUuid(r.url);
    } catch { /* fall through */ }
  }
  if (!uuid) {
    return NextResponse.json({ error: "That doesn't look like a TIDAL playlist link." }, { status: 400 });
  }
  try {
    const token = await getToken();
    const meta = await tidalGet(`${BASE}/playlists/${uuid}?countryCode=US`, token);
    if (meta.status === 404) {
      return NextResponse.json(
        { error: "Playlist not found. It may be set to Private - switch it to Unlisted or Public in TIDAL." },
        { status: 404 }
      );
    }
    if (!meta.ok) throw new Error(`tidal ${meta.status}`);
    const metaJson = await meta.json();
    const name = metaJson.data?.attributes?.name || "Playlist";

    const tracks: { id: string; title: string; artist: string; isrc: string }[] = [];
    const artists: Record<string, string> = {};
    let url: string | null = `${BASE}/playlists/${uuid}/relationships/items?include=items,items.artists&countryCode=US`;
    let pages = 0;
    while (url && pages < MAX_PAGES) {
      const r = await tidalGet(url, token);
      if (!r.ok) throw new Error(`tidal items ${r.status}`);
      const d = await r.json();
      const trackRes: Record<string, unknown> = {};
      for (const inc of d.included || []) {
        if (inc.type === "artists") artists[inc.id] = inc.attributes?.name || "";
        else if (inc.type === "tracks") trackRes[inc.id] = inc;
      }
      for (const ident of d.data || []) {
        const tr = trackRes[ident.id] as { attributes?: { title?: string; isrc?: string }; relationships?: { artists?: { data?: { id: string }[] } } } | undefined;
        if (!tr) continue;
        const ids = tr.relationships?.artists?.data?.map((x) => x.id) || [];
        const names = ids.map((i) => artists[i]).filter(Boolean).join(", ");
        if (tr.attributes?.title && names) {
          tracks.push({ id: `${ident.id}-${tracks.length}`, title: tr.attributes.title, artist: names, isrc: tr.attributes.isrc || "" });
        }
      }
      const nxt = d.links?.next;
      url = nxt ? BASE + String(nxt).replace(/^\/v2/, "") : null;
      pages += 1;
    }
    // de-dupe repeated playlist entries by isrc/title+artist
    const seen = new Set<string>();
    const unique = tracks.filter((t) => {
      const k = t.isrc || `${t.title}|${t.artist}`.toLowerCase();
      if (seen.has(k)) return false;
      seen.add(k);
      return true;
    });
    return NextResponse.json({ name, truncated: pages >= MAX_PAGES, tracks: unique });
  } catch (e) {
    console.error("djnext/tidal:", e);
    return NextResponse.json({ error: "TIDAL lookup failed. Try again in a minute." }, { status: 502 });
  }
}

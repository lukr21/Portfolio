"use client";

/*
 * DJNext set view - implements the Claude Design handoff (option 1a) on top of
 * the existing data pipeline (Tidal resolve -> GSB/Deezer lookup -> in-browser
 * essentia analysis). Design tokens are fixed dark values by spec; this page
 * does not follow the site theme. Radius 0 everywhere is intentional.
 */

import { CSSProperties, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Cfg, Track, rank, toCamelot } from "./camelot";
import DJLogo from "./DJLogo";

type Status = "idle" | "loading" | "analyzing" | "ready" | "error";

interface CacheEntry { bpm: number | null; camelot: string | null; source: string; }

const CACHE_KEY = "djnext-lookup-cache-v1";
const CFG: Cfg = { wKey: 0.6, free: 3, stretch: 6, cutoff: 8, halftime: true, strictKey: false, energyDir: "flat" };
const MAX_SUGGESTIONS = 10;
const SLOT_W = 218;
const ROW_H = 34;
const EASE = "cubic-bezier(.22,.61,.36,1)";
const MONO = "'JetBrains Mono',monospace";
const INTER = "Inter,sans-serif";

function loadCache(): Record<string, CacheEntry> {
  try { return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}"); } catch { return {}; }
}
function saveCache(c: Record<string, CacheEntry>) {
  try { localStorage.setItem(CACHE_KEY, JSON.stringify(c)); } catch { /* full */ }
}
const trackKey = (t: { isrc: string; title: string; artist: string }) =>
  t.isrc || `${t.title}|${t.artist}`.toLowerCase();

// ---- essentia.js, loaded lazily from /djnext-lib ----
interface EssentiaLike {
  arrayToVector(a: Float32Array): unknown;
  KeyExtractor(v: unknown, adc: boolean, fs: number, hs: number, hpcp: number, maxF: number, peaks: number, minF: number, pcp: number, profile: string, sr: number, spt: number, tf: number, wt: string, win: string): { key: string; scale: string };
  PercivalBpmEstimator(v: unknown): { bpm: number };
}
let essentiaPromise: Promise<EssentiaLike> | null = null;
function loadScript(src: string): Promise<void> {
  return new Promise((res, rej) => {
    const s = document.createElement("script");
    s.src = src;
    s.onload = () => res();
    s.onerror = () => rej(new Error(`failed to load ${src}`));
    document.head.appendChild(s);
  });
}
function getEssentia(): Promise<EssentiaLike> {
  if (!essentiaPromise) {
    essentiaPromise = (async () => {
      await loadScript("/djnext-lib/essentia-wasm.web.js");
      await loadScript("/djnext-lib/essentia.js-core.umd.min.js");
      const w = window as unknown as { EssentiaWASM: () => Promise<unknown>; Essentia: new (m: unknown) => EssentiaLike };
      const wasm = await w.EssentiaWASM();
      return new w.Essentia(wasm);
    })();
  }
  return essentiaPromise;
}

async function decodePreview(url: string): Promise<Float32Array | null> {
  const r = await fetch(`/api/djnext/audio?u=${encodeURIComponent(url)}`);
  if (!r.ok) return null;
  const buf = await r.arrayBuffer();
  const probe = new AudioContext();
  let decoded: AudioBuffer;
  try {
    decoded = await probe.decodeAudioData(buf);
  } finally {
    probe.close();
  }
  const off = new OfflineAudioContext(1, Math.ceil(decoded.duration * 44100), 44100);
  const src = off.createBufferSource();
  src.buffer = decoded;
  src.connect(off.destination);
  src.start();
  const out = await off.startRendering();
  return out.getChannelData(0);
}

async function analyzeClip(url: string, needBpm: boolean, needKey: boolean): Promise<{ bpm: number | null; camelot: string | null }> {
  const audio = await decodePreview(url);
  if (!audio || audio.length < 44100 * 5) return { bpm: null, camelot: null };
  const ess = await getEssentia();
  const vec = ess.arrayToVector(audio);
  let bpm: number | null = null;
  let camelot: string | null = null;
  if (needBpm) {
    const t = ess.PercivalBpmEstimator(vec).bpm;
    const cands = [t / 2, t, t * 2].filter((x) => x >= 70 && x <= 180);
    const bestCand = cands.length
      ? cands.sort((a, b) => Math.abs(Math.log2(a / 122)) - Math.abs(Math.log2(b / 122)))[0]
      : t;
    bpm = Math.round(bestCand * 10) / 10;
  }
  if (needKey) {
    const votes: (string | null)[] = [];
    for (const profile of ["shaath", "krumhansl"]) {
      const r = ess.KeyExtractor(vec, true, 4096, 4096, 12, 3500, 60, 25, 0.2, profile, 44100, 0.0001, 440, "cosine", "hann");
      votes.push(toCamelot(r.key + (r.scale === "minor" ? "m" : "")));
    }
    if (votes[0] && votes[0] === votes[1]) camelot = votes[0];
  }
  return { bpm, camelot };
}

// ---- design-vocabulary label mapping (handoff NOTE column) ----
function noteLabel(keyLabel: string): string {
  switch (keyLabel) {
    case "same key": return "same key";
    case "+1": return "+1 hour";
    case "-1": return "−1 hour";
    case "+2": return "+2 hours";
    case "-2": return "−2 hours";
    case "relative": return "relative";
    case "diag +1": return "energy boost";
    case "diag -1": return "energy dip";
    case "parallel": return "parallel";
    case "semitone up": return "semitone up";
    case "?": return "unknown key";
    default: return "clash";
  }
}
const isBoost = (keyLabel: string) => keyLabel === "diag +1";

// ---- set-view state (single object so picks update atomically) ----
interface Snap { nowId: string | null; history: string[]; played: Record<string, 1>; }
interface DJState {
  nowId: string | null;
  history: string[];
  played: Record<string, 1>;
  filter: "All" | "Same key" | "Energy boost";
  sel: number;
  q: string;
  hoverId: string | null;
  slide: { id: string; nowId: string | null; history: string[] } | null;
  slideBack: boolean;
  lastSnap: Snap | null;
  epoch: number;
}
const DJ0: DJState = { nowId: null, history: [], played: {}, filter: "All", sel: 0, q: "", hoverId: null, slide: null, slideBack: false, lastSnap: null, epoch: 0 };

// Effective BPM: fold half/double-time outliers into the DJ range (85-180).
// A 60 BPM track mixes identically to 120; sorting and display use the folded
// value, marked with a dim multiplier. Scoring already handles half/double time.
function effBpm(bpm: number | null): { v: number; folded: boolean } | null {
  if (!bpm) return null;
  let v = bpm;
  while (v < 85) v *= 2;
  while (v >= 180) v /= 2;
  return { v: Math.round(v), folded: Math.round(v) !== Math.round(bpm) };
}
function BpmText({ bpm, color }: { bpm: number | null; color: string }) {
  const e = effBpm(bpm);
  if (!e) return <span style={{ color }}>?</span>;
  return (
    <span style={{ color }} title={e.folded ? `stored as ${Math.round(bpm!)} BPM` : undefined}>
      {e.v}
      {e.folded && <span style={{ color: "#55555c", fontSize: "0.85em" }}>×</span>}
    </span>
  );
}

// Serato-style Camelot wheel colors: each hour gets a hue, minor/major share it
function keyHue(camelot: string | null): number | null {
  if (!camelot) return null;
  const n = parseInt(camelot);
  if (!n) return null;
  return ((n - 1) * 30 + 60) % 360; // 1=yellow -> 3=green -> 6=blue -> 9=magenta -> 11=red
}
function keyText(camelot: string | null): string {
  const h = keyHue(camelot);
  return h === null ? "#8b8b93" : `hsl(${h} 75% 65%)`;
}
function keyBg(camelot: string | null): string {
  const h = keyHue(camelot);
  return h === null ? "rgba(139,139,147,.14)" : `hsl(${h} 75% 55% / .14)`;
}

// shared inline-style fragments (handoff tokens)
const S = {
  panel: { background: "#111113", border: "1px solid #232326", borderRadius: 0 } as CSSProperties,
  label: { font: `600 10px ${INTER}`, letterSpacing: 1.5, color: "#8b8b93" } as CSSProperties,
  keyPill: { background: "rgba(59,130,246,.14)", color: "#7db2f9", font: `600 11px ${MONO}`, padding: "3px 8px", borderRadius: 0 } as CSSProperties,
  bpmPill: { background: "rgba(255,255,255,.07)", color: "#f4f4f5", font: `600 11px ${MONO}`, padding: "3px 8px", borderRadius: 0 } as CSSProperties,
  slot: { flex: "none", width: SLOT_W, height: 98, boxSizing: "border-box", padding: "12px 14px", background: "#0f0f11", borderRight: "1px solid #232326" } as CSSProperties,
  kbd: { background: "#1a1a1e", border: "1px solid #2c2c31", borderRadius: 0, padding: "2px 6px" } as CSSProperties,
};

function SlotLines({ t }: { t: Track }) {
  return (
    <>
      <div style={{ font: `600 12.5px ${INTER}`, color: "#f4f4f5", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{t.title}</div>
      <div style={{ font: `400 11px ${INTER}`, color: "#8b8b93", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", margin: "2px 0 6px" }}>{t.artist}</div>
      <div style={{ display: "flex", gap: 5 }}>
        <span style={{ ...S.keyPill, background: keyBg(t.camelot), color: keyText(t.camelot), font: `600 10px ${MONO}`, padding: "1px 7px" }}>{t.camelot || "?"}</span>
        <span style={{ ...S.bpmPill, font: `600 10px ${MONO}`, padding: "1px 7px" }}><BpmText bpm={t.bpm} color="#f4f4f5" /></span>
      </div>
    </>
  );
}

function SlotTag({ text, color, dot }: { text: string; color: string; dot?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 5, font: `600 8px ${INTER}`, letterSpacing: 1.5, color, marginBottom: 6, whiteSpace: "nowrap", overflow: "hidden" }}>
      {dot && <span style={{ width: 5, height: 5, borderRadius: "50%", background: dot, flex: "none" }} />}
      {text}
    </div>
  );
}

export default function DJNextApp() {
  const [playlistUrl, setPlaylistUrl] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [statusMsg, setStatusMsg] = useState("");
  const [playlistName, setPlaylistName] = useState("");
  const [playlistId, setPlaylistId] = useState("");
  const [tracks, setTracks] = useState<Track[]>([]);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const [dj, setDj] = useState<DJState>(DJ0);
  const [visible, setVisible] = useState(MAX_SUGGESTIONS);
  const [sort, setSort] = useState<{ by: "key" | "bpm" | null; dir: 1 | -1 }>({ by: "bpm", dir: -1 });
  const libScrollRef = useRef<HTMLDivElement | null>(null);
  const cancelRef = useRef(false);
  const sugRef = useRef<{ id: string }[]>([]);
  const lastIdsRef = useRef<string[]>([]);
  const changedRef = useRef<boolean[]>([]);
  const epochSeenRef = useRef(-1);
  const commitTimer = useRef<number | null>(null);

  const byId = useCallback((id: string | null) => (id ? tracks.find((t) => t.id === id) || null : null), [tracks]);

  // persist played-state per playlist
  useEffect(() => {
    if (!playlistId) return;
    try { localStorage.setItem(`djnext-played-${playlistId}`, JSON.stringify(dj.played)); } catch { /* full */ }
  }, [dj.played, playlistId]);

  const updateTrack = useCallback((id: string, patch: Partial<Track>) => {
    setTracks((ts) => ts.map((t) => (t.id === id ? { ...t, ...patch } : t)));
  }, []);

  const loadPlaylist = useCallback(async () => {
    if (!playlistUrl.trim()) return;
    cancelRef.current = false;
    setStatus("loading");
    setStatusMsg("Resolving playlist through TIDAL…");
    setTracks([]);
    setDj(DJ0);
    try {
      const r = await fetch(`/api/djnext/tidal?playlist=${encodeURIComponent(playlistUrl.trim())}`);
      const d = await r.json();
      if (!r.ok) {
        setStatus("error");
        setStatusMsg(d.error || "Failed to load playlist.");
        return;
      }
      setPlaylistName(d.name);
      const uuid = (playlistUrl.match(/[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i) || [d.name])[0];
      setPlaylistId(uuid);
      let savedPlayed: Record<string, 1> = {};
      try { savedPlayed = JSON.parse(localStorage.getItem(`djnext-played-${uuid}`) || "{}"); } catch { /* fresh */ }
      const cache = loadCache();
      const loaded: Track[] = d.tracks.map((t: { id: string; title: string; artist: string; isrc: string }) => {
        const c = cache[trackKey(t)];
        return { ...t, bpm: c?.bpm ?? null, camelot: c?.camelot ?? null, source: c?.source, played: false };
      });
      setTracks(loaded);
      setDj({ ...DJ0, played: savedPlayed });
      setStatus("analyzing");

      const todo = loaded.filter((t) => !(t.bpm && t.camelot));
      setProgress({ done: 0, total: todo.length });
      let done = 0;
      const queue = [...todo];
      const work = async () => {
        while (queue.length && !cancelRef.current) {
          const t = queue.shift()!;
          let bpm = t.bpm, camelot = t.camelot;
          let source = t.source || "";
          try {
            const lr = await fetch(
              `/api/djnext/lookup?title=${encodeURIComponent(t.title)}&artist=${encodeURIComponent(t.artist)}&isrc=${encodeURIComponent(t.isrc)}`
            );
            if (lr.ok) {
              const ld = await lr.json();
              bpm = bpm || ld.bpm;
              camelot = camelot || toCamelot(ld.key);
              source = ld.source;
              if ((!bpm || !camelot) && ld.preview) {
                const a = await analyzeClip(ld.preview, !bpm, !camelot);
                bpm = bpm || a.bpm;
                camelot = camelot || a.camelot;
                if (a.bpm || a.camelot) source += "+local";
              }
            }
          } catch { /* leave unknown */ }
          updateTrack(t.id, { bpm, camelot, source });
          const cache2 = loadCache();
          cache2[trackKey(t)] = { bpm: bpm ?? null, camelot: camelot ?? null, source };
          saveCache(cache2);
          done += 1;
          setProgress({ done, total: todo.length });
        }
      };
      await Promise.all(Array.from({ length: 3 }, work));
      setStatus("ready");
      setStatusMsg("");
    } catch {
      setStatus("error");
      setStatusMsg("Something went wrong loading the playlist.");
    }
  }, [playlistUrl, updateTrack]);

  // ---- picks / undo (handoff state machine) ----
  const commit = useCallback(() => {
    setDj((s) => (s.slide ? { ...s, slide: null } : s));
    if (commitTimer.current) { window.clearTimeout(commitTimer.current); commitTimer.current = null; }
  }, []);

  const pick = useCallback((id: string) => {
    setDj((s) => {
      if (id === s.nowId || s.slide || s.slideBack) return s;
      const played = { ...s.played, [id]: 1 as const };
      if (s.nowId) played[s.nowId] = 1;
      return {
        ...s,
        slide: s.nowId ? { id, nowId: s.nowId, history: s.history } : null,
        lastSnap: { nowId: s.nowId, history: s.history, played: s.played },
        nowId: id,
        history: s.nowId ? [...s.history, s.nowId].slice(-8) : s.history,
        played,
        sel: 0,
        hoverId: null,
        epoch: s.epoch + 1,
      };
    });
    if (commitTimer.current) window.clearTimeout(commitTimer.current);
    commitTimer.current = window.setTimeout(commit, 450); // safety if animationend is missed
  }, [commit]);

  const undo = useCallback(() => {
    setDj((s) => {
      if (!s.lastSnap || s.slide || s.slideBack) return s;
      const undone = s.nowId;
      return {
        ...s,
        nowId: s.lastSnap.nowId,
        history: s.lastSnap.history,
        played: s.lastSnap.played,
        lastSnap: null,
        slide: null,
        slideBack: true,
        hoverId: undone,
        sel: 0,
        epoch: s.epoch + 1,
      };
    });
    // safety: never leave slideBack armed if animationend is missed
    window.setTimeout(() => setDj((s) => (s.slideBack ? { ...s, slideBack: false } : s)), 450);
  }, []);

  // ---- keyboard ----
  useEffect(() => {
    const kb = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName || "";
      if (/INPUT|TEXTAREA/.test(tag)) return;
      const sug = sugRef.current;
      if (e.key === "j" || e.key === "ArrowDown") {
        setDj((s) => ({ ...s, sel: Math.min(s.sel + 1, Math.max(0, sug.length - 1)) }));
        e.preventDefault();
      } else if (e.key === "k" || e.key === "ArrowUp") {
        setDj((s) => ({ ...s, sel: Math.max(s.sel - 1, 0) }));
        e.preventDefault();
      } else if (e.key === "Enter" && sug[dj.sel]) {
        pick(sug[dj.sel].id);
        e.preventDefault();
      }
    };
    window.addEventListener("keydown", kb);
    return () => window.removeEventListener("keydown", kb);
  }, [dj.sel, pick]);

  // ---- derived: suggestions (existing score model, design filters/cap) ----
  const now = byId(dj.nowId);
  const allRanked = useMemo(() => {
    if (!now) return [];
    const withPlayed = tracks.map((t) => ({ ...t, played: !!dj.played[t.id] && t.id !== dj.nowId }));
    const cur = { ...now, played: false };
    let cand = rank(cur, withPlayed, CFG);
    if (dj.filter === "Same key") cand = cand.filter((t) => t.keyLabel === "same key");
    if (dj.filter === "Energy boost") cand = cand.filter((t) => isBoost(t.keyLabel));
    return cand;
  }, [now, tracks, dj.played, dj.nowId, dj.filter]);
  const ranked = allRanked.slice(0, visible);
  sugRef.current = ranked;

  // every re-rank collapses back to the first 10
  useEffect(() => { setVisible(MAX_SUGGESTIONS); }, [dj.epoch]);

  // position-diff so only changed rows animate in (handoff "ranking entrance")
  if (epochSeenRef.current !== dj.epoch) {
    const ids = ranked.map((t) => t.id);
    changedRef.current = ids.map((id, i) => id !== lastIdsRef.current[i]);
    lastIdsRef.current = ids;
    epochSeenRef.current = dj.epoch;
  }
  const changed = changedRef.current;

  // ---- derived: library ----
  const q = dj.q.toLowerCase();
  const filt = useMemo(() => {
    const base = tracks.filter((t) => !q || `${t.title} ${t.artist}`.toLowerCase().includes(q));
    if (!sort.by) return base;
    const keyVal = (t: Track) => (t.camelot ? parseInt(t.camelot) * 2 + (t.camelot.endsWith("B") ? 1 : 0) : Infinity);
    const bpmVal = (t: Track) => effBpm(t.bpm)?.v ?? Infinity;
    const val = sort.by === "key" ? keyVal : bpmVal;
    return [...base].sort((a, b) => {
      const va = val(a), vb = val(b);
      if (va === vb) return 0;
      if (va === Infinity) return 1;      // unknowns always last
      if (vb === Infinity) return -1;
      return (va - vb) * sort.dir;
    });
  }, [tracks, q, sort]);
  const nowIdx = filt.findIndex((t) => t.id === dj.nowId);

  // keep the spotlight centered in the library viewport. rAF-driven (native
  // smooth scrolling gets cancelled by concurrent style mutations); same 380ms
  // ease as the rest of the motion so it travels with the spotlight.
  useEffect(() => {
    if (nowIdx < 0) return;
    const el = libScrollRef.current;
    if (!el) return;
    const from = el.scrollTop;
    const to = Math.min(Math.max(0, nowIdx * ROW_H - el.clientHeight / 2 + ROW_H / 2), el.scrollHeight - el.clientHeight);
    if (Math.abs(to - from) < 4) return;
    const start = performance.now();
    const dur = 380;
    const ease = (t: number) => 1 - Math.pow(1 - t, 3);
    let raf = 0;
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      el.scrollTop = from + (to - from) * ease(t);
      if (t < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [nowIdx]);

  const cycleSort = (by: "key" | "bpm") =>
    setSort((s) => (s.by !== by ? { by, dir: 1 } : s.dir === 1 ? { by, dir: -1 } : { by: null, dir: 1 }));
  const mixable = tracks.filter((t) => t.bpm && t.camelot).length;

  // ---- rail (port of strip()) ----
  const rail = (() => {
    if (!dj.nowId && !dj.slideBack) return null;
    const sliding = !!dj.slide;
    const railNow = byId(sliding ? dj.slide!.nowId : dj.nowId);
    const histIds = (sliding ? dj.slide!.history : dj.history).slice(-3);
    const hist: (Track | null)[] = histIds.map((id) => byId(id));
    while (hist.length < 3) hist.unshift(null);
    const histTags = ["PLAYED −3", "PLAYED −2", "PREVIOUS"];
    const slots: React.ReactNode[] = [];
    hist.forEach((t, i) => {
      const tg = sliding ? (i === 0 ? "PLAYED −3" : histTags[i - 1]) : histTags[i];
      const op = sliding ? (i === 0 ? 0.38 : 0.38 + (i - 1) * 0.16) : 0.38 + i * 0.16;
      slots.push(
        t ? (
          <div key={`h${i}-${t.id}`} style={S.slot}>
            <div style={{ opacity: op, minWidth: 0 }}>
              <SlotTag text={tg} color="#8b8b93" />
              <SlotLines t={t} />
            </div>
          </div>
        ) : (
          <div key={`ph${i}`} style={{ ...S.slot, display: "flex", alignItems: "center", justifyContent: "center", color: "#2c2c31", font: `400 12px ${MONO}` }}>—</div>
        )
      );
    });
    if (railNow) {
      slots.push(
        sliding ? (
          <div key={`now-${railNow.id}`} style={S.slot}>
            <div style={{ opacity: 0.7, minWidth: 0 }}>
              <SlotTag text="PREVIOUS" color="#8b8b93" />
              <SlotLines t={railNow} />
            </div>
          </div>
        ) : (
          <div key={`now-${railNow.id}`} style={{ ...S.slot, background: "rgba(59,130,246,.07)", boxShadow: "inset 0 0 0 1px #3b82f6" }}>
            <div style={{ minWidth: 0 }}>
              <SlotTag text="NOW PLAYING · LIVE" color="#7db2f9" dot="#22c55e" />
              <SlotLines t={railNow} />
            </div>
          </div>
        )
      );
    }
    const hov = sliding ? byId(dj.slide!.id) : dj.hoverId && dj.hoverId !== dj.nowId ? byId(dj.hoverId) : null;
    const nextSlot = (key: string, anim?: boolean) => (
      <div key={key} style={{ ...S.slot, borderRight: "none", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", color: "#55555c", font: `400 10.5px ${MONO}`, padding: "12px 18px" }}>
        <span style={anim ? { animation: "djIn .38s ease" } : undefined}>up next — hover a row, click or ⏎ to mix</span>
      </div>
    );
    if (hov && railNow) {
      const cur2 = { ...railNow, played: false };
      const rel = rank(cur2, [{ ...hov, played: false }], { ...CFG, cutoff: 1000 })[0];
      const relTag = rel ? `${noteLabel(rel.keyLabel)} · ${rel.bpmMult !== 1 ? "half/double" : `${rel.bpmPct !== null && rel.bpmPct >= 0 ? "+" : ""}${rel.bpmPct ?? "?"}%`}`.toUpperCase() : "";
      slots.push(
        <div
          key={`in-${hov.id}`}
          style={{
            ...S.slot,
            background: sliding ? "rgba(59,130,246,.07)" : "#0f0f11",
            boxShadow: sliding ? "inset 0 0 0 1px #3b82f6" : "none",
            borderRight: sliding || dj.slideBack ? S.slot.borderRight : "none",
          }}
        >
          <div style={{ opacity: sliding ? 1 : 0.55, minWidth: 0 }}>
            <SlotTag
              text={sliding ? "NOW PLAYING · LIVE" : relTag}
              color={sliding ? "#7db2f9" : rel && isBoost(rel.keyLabel) ? "#f9a03f" : "#8b8b93"}
              dot={sliding ? "#22c55e" : undefined}
            />
            <SlotLines t={hov} />
          </div>
        </div>
      );
    } else {
      slots.push(nextSlot("next"));
    }
    if (sliding) slots.push(nextSlot("ghost2", true));
    if (dj.slideBack) slots.push(nextSlot("backghost"));
    const anim = sliding
      ? `djRail .38s ${EASE} forwards`
      : dj.slideBack
        ? `djRailBack .38s ${EASE} forwards`
        : "none";
    return (
      <div style={{ width: SLOT_W * 5, maxWidth: "100%", overflow: "hidden", border: "1px solid #232326", borderRadius: 0, background: "#0f0f11" }}>
        <div
          key={sliding ? `sliding-${dj.slide!.id}` : dj.slideBack ? `back-${dj.epoch}` : "steady"}
          style={{ display: "flex", animation: anim }}
          onAnimationEnd={(ev) => {
            if (ev.animationName === "djRail") commit();
            else if (ev.animationName === "djRailBack") setDj((s) => ({ ...s, slideBack: false }));
          }}
        >
          {slots}
        </div>
      </div>
    );
  })();

  const hoverOn = (id: string) => setDj((s) => (s.slide || s.slideBack ? s : { ...s, hoverId: id }));
  const hoverOff = (id: string) => setDj((s) => (s.hoverId === id ? { ...s, hoverId: null } : s));
  const resetPlayed = () => setDj((s) => ({ ...s, played: {}, lastSnap: null, epoch: s.epoch + 1 }));

  const showPanes = status === "ready" || status === "analyzing";

  return (
    <div style={{ color: "#f4f4f5", maxWidth: 1200, margin: "0 auto" }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, padding: "18px 22px 0", flexWrap: "wrap" }}>
        <DJLogo size={20} />
        <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 10, minWidth: 320 }}>
          <input
            value={playlistUrl}
            onChange={(e) => setPlaylistUrl(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && loadPlaylist()}
            placeholder="https://tidal.com/playlist/… (public or unlisted)"
            style={{ flex: 1, background: "#111113", border: "1px solid #232326", borderRadius: 0, padding: "9px 14px", font: `400 12.5px ${MONO}`, color: "#f4f4f5", outline: "none", minWidth: 0 }}
          />
          <button
            onClick={loadPlaylist}
            disabled={status === "loading"}
            style={{ background: "#3b82f6", color: "#fff", font: `600 12.5px ${INTER}`, padding: "9px 18px", borderRadius: 0, border: "none", cursor: status === "loading" ? "default" : "pointer", opacity: status === "loading" ? 0.6 : 1 }}
          >
            {status === "loading" ? "Loading…" : "Load"}
          </button>
        </div>
        <div style={{ font: `400 11.5px ${INTER}`, color: "#8b8b93" }}>
          {status === "error" && <span style={{ color: "#f97316" }}>{statusMsg}</span>}
          {status === "loading" && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
              loading playlist
              <span style={{ display: "inline-flex", gap: 3 }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{ width: 4, height: 4, borderRadius: "50%", background: "#8b8b93", animation: `djDot 1.2s ${i * 0.2}s infinite` }} />
                ))}
              </span>
            </span>
          )}
          {status === "analyzing" && (
            <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
              {playlistName} · analyzing
              <span style={{ width: 110, height: 4, background: "#1c1c20", overflow: "hidden", display: "inline-block" }}>
                <span style={{ display: "block", height: 4, background: "#3b82f6", width: `${progress.total ? Math.round((progress.done / progress.total) * 100) : 0}%`, transition: "width .3s ease" }} />
              </span>
              <span style={{ font: `500 10.5px 'JetBrains Mono',monospace`, color: "#8b8b93" }}>
                {progress.total ? Math.round((progress.done / progress.total) * 100) : 0}%
              </span>
            </span>
          )}
          {status === "ready" && (
            <>
              {playlistName} · {tracks.length} tracks · <span style={{ color: "#22c55e" }}>{mixable} mixable</span> ·{" "}
              <span style={{ color: "#60a5fa", cursor: "pointer" }} onClick={resetPlayed}>reset played</span>
            </>
          )}
        </div>
      </div>

      {showPanes && (
        <>
          {/* Set-timeline rail */}
          <div style={{ ...S.panel, margin: "16px 22px 0", padding: "14px 16px", overflow: "hidden" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <div style={S.label}>SET TIMELINE</div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ font: `400 10.5px ${MONO}`, color: "#55555c" }}>
                  {dj.nowId ? dj.history.length + 1 : 0} played this set
                </div>
                <div
                  onClick={undo}
                  style={{ font: `500 10.5px ${MONO}`, color: dj.lastSnap ? "#8b8b93" : "#3a3a40", border: "1px solid #2c2c31", padding: "3px 9px", cursor: dj.lastSnap ? "pointer" : "default", userSelect: "none" }}
                >
                  ↩ undo last
                </div>
              </div>
            </div>
            {rail || (
              <div style={{ border: "1px dashed #2c2c31", padding: "28px 18px", textAlign: "center", color: "#55555c", font: `400 10.5px ${MONO}` }}>
                pick a track from the library to start your set
              </div>
            )}
          </div>

          {/* Panes */}
          <div style={{ display: "flex", gap: 16, padding: "16px 22px 22px", alignItems: "flex-start", flexWrap: "wrap" }}>
            {/* Library */}
            <div style={{ ...S.panel, width: 330, flex: "none", overflow: "hidden" }}>
              <div style={{ padding: "12px 14px 10px", borderBottom: "1px solid #232326" }}>
                <div style={{ ...S.label, marginBottom: 8 }}>LIBRARY</div>
                <input
                  value={dj.q}
                  onChange={(e) => setDj((s) => ({ ...s, q: e.target.value }))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && filt.length) pick(filt[0].id);
                  }}
                  placeholder="Search… (⏎ = now playing)"
                  style={{ width: "100%", boxSizing: "border-box", background: "#0a0a0a", border: "1px solid #232326", borderRadius: 0, padding: "7px 10px", font: `400 12px ${INTER}`, color: "#f4f4f5", outline: "none" }}
                />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 14px", borderBottom: "1px solid #1c1c20", font: `600 9px ${INTER}`, letterSpacing: 1.2, color: "#55555c" }}>
                <div>TRACK</div>
                <div style={{ display: "flex", gap: 8, font: `500 10px ${MONO}` }}>
                  {(["key", "bpm"] as const).map((by) => (
                    <button
                      key={by}
                      onClick={() => cycleSort(by)}
                      style={{ background: "none", border: "none", padding: 0, cursor: "pointer", font: "inherit", letterSpacing: 1.2, color: sort.by === by ? "#8b8b93" : "#55555c" }}
                    >
                      {by.toUpperCase()} {sort.by === by ? (sort.dir === 1 ? "▲" : "▼") : "△"}
                    </button>
                  ))}
                </div>
              </div>
              <div ref={libScrollRef} style={{ maxHeight: 436, overflowY: "auto" }}>
                <div style={{ position: "relative" }}>
                  {/* spotlight bar */}
                  <div
                    style={{
                      position: "absolute", left: 0, right: 0, top: nowIdx * ROW_H, height: ROW_H,
                      background: "rgba(59,130,246,.16)", boxShadow: "inset 2px 0 0 #3b82f6",
                      transition: `top .38s ${EASE}`, opacity: nowIdx < 0 ? 0 : 1, pointerEvents: "none",
                    }}
                  />
                  {filt.map((t) => (
                    <div
                      key={t.id}
                      onClick={() => pick(t.id)}
                      onMouseEnter={() => hoverOn(t.id)}
                      onMouseLeave={() => hoverOff(t.id)}
                      style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, height: ROW_H, boxSizing: "border-box", padding: "0 14px", cursor: "pointer", opacity: dj.played[t.id] && t.id !== dj.nowId ? 0.45 : 1 }}
                    >
                      <div style={{ font: `500 12.5px ${INTER}`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0, flex: 1, color: "#d4d4d8" }}>
                        {t.title} <span style={{ color: "#8b8b93", fontWeight: 400 }}>{t.artist}</span>
                      </div>
                      <div style={{ font: `500 11px ${MONO}`, flex: "none" }}>
                        <span style={{ color: keyText(t.camelot) }}>{t.camelot || "?"}</span>{" "}
                        <BpmText bpm={t.bpm} color="#f4f4f5" />
                      </div>
                    </div>
                  ))}
                  {/* white text layer clipped to the spotlight bar */}
                  <div
                    style={{
                      position: "absolute", top: 0, left: 0, right: 0, pointerEvents: "none",
                      clipPath: nowIdx < 0 ? "inset(0 0 100% 0)" : `inset(${nowIdx * ROW_H}px 0px ${Math.max(0, (filt.length - nowIdx - 1) * ROW_H)}px 0px)`,
                      transition: `clip-path .38s ${EASE}`,
                    }}
                  >
                    {filt.map((t) => (
                      <div key={t.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, height: ROW_H, boxSizing: "border-box", padding: "0 14px" }}>
                        <div style={{ font: `500 12.5px ${INTER}`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", minWidth: 0, flex: 1, color: "#ffffff" }}>
                          {t.title} <span style={{ color: "#c3d9ff", fontWeight: 400 }}>{t.artist}</span>
                        </div>
                        <div style={{ font: `600 11px ${MONO}`, flex: "none" }}>
                          <span style={{ color: keyText(t.camelot) }}>{t.camelot || "?"}</span>{" "}
                          <BpmText bpm={t.bpm} color="#ffffff" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Ranked suggestions */}
            <div style={{ flex: 1, minWidth: 320 }}>
              {dj.nowId ? (
                <>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                    {(["All", "Same key", "Energy boost"] as const).map((f) => (
                      <div
                        key={f}
                        onClick={() => setDj((s) => ({ ...s, filter: f, sel: 0, epoch: s.epoch + 1 }))}
                        style={{
                          padding: "5px 14px", borderRadius: 0, cursor: "pointer",
                          font: `${dj.filter === f ? 600 : 500} 11.5px ${INTER}`,
                          background: dj.filter === f ? "#26262b" : "transparent",
                          border: "1px solid #2c2c31",
                          color: dj.filter === f ? "#f4f4f5" : f === "Energy boost" ? "#f9a03f" : f === "Same key" ? "#7db2f9" : "#8b8b93",
                        }}
                      >
                        {f}
                      </div>
                    ))}
                    <div style={{ flex: 1 }} />
                    <div style={{ font: `400 11px ${MONO}`, color: "#55555c" }}>
                      <span style={S.kbd}>j</span> <span style={S.kbd}>k</span> navigate · <span style={S.kbd}>⏎</span> play
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "28px 1fr 52px 52px 150px 110px", gap: 10, padding: "0 12px 8px", font: `600 10px ${INTER}`, letterSpacing: 1.2, color: "#8b8b93" }}>
                    <div>#</div><div>TRACK</div><div>KEY</div><div>BPM</div><div>NOTE</div><div style={{ textAlign: "right" }}>SCORE</div>
                  </div>
                  {ranked.map((s, i) => {
                    const boost = isBoost(s.keyLabel);
                    const note = `${s.played ? "played · " : ""}${noteLabel(s.keyLabel)} · ${s.bpmMult !== 1 ? "half/double" : s.bpmPct !== null ? `${s.bpmPct >= 0 ? "+" : ""}${s.bpmPct}%` : "unknown bpm"}`;
                    return (
                      <div
                        key={s.id}
                        onClick={() => pick(s.id)}
                        onMouseEnter={() => hoverOn(s.id)}
                        onMouseLeave={() => hoverOff(s.id)}
                        style={{
                          display: "grid", gridTemplateColumns: "28px 1fr 52px 52px 150px 110px", gap: 10, alignItems: "center",
                          padding: "9px 12px", borderTop: "1px solid #1c1c20", cursor: "pointer", borderRadius: 0,
                          background: i === dj.sel ? "rgba(59,130,246,.1)" : boost ? "rgba(249,115,22,.05)" : "transparent",
                          opacity: s.played ? 0.55 : 1,
                          animation: changed[i] ? `${dj.epoch % 2 ? "djIn2" : "djIn"} .38s ${EASE} both` : "none",
                        }}
                      >
                        <div style={{ font: `500 12px ${MONO}`, color: "#55555c" }}>{i + 1}</div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ font: `500 13px ${INTER}`, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {s.title} <span style={{ color: "#8b8b93", fontWeight: 400 }}>{s.artist}</span>
                          </div>
                        </div>
                        <div><span style={{ ...S.keyPill, background: keyBg(s.camelot), color: keyText(s.camelot) }}>{s.camelot || "?"}</span></div>
                        <div><span style={S.bpmPill}><BpmText bpm={s.bpm} color="#f4f4f5" /></span></div>
                        <div style={{ font: `400 11.5px ${INTER}`, color: boost ? "#f9a03f" : s.played ? "#55555c" : "#8b8b93", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{note}</div>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 8 }}>
                          <div style={{ font: `500 10.5px ${MONO}`, color: "#8b8b93" }}>{s.score.toFixed(2)}</div>
                          <div style={{ width: 64, height: 6, background: "#1c1c20", borderRadius: 0, overflow: "hidden" }}>
                            <div style={{ width: `${Math.round(Math.min(1, s.score) * 100)}%`, height: 6, background: boost ? "linear-gradient(90deg,#f97316,#f9a03f)" : "linear-gradient(90deg,#3b82f6,#22c55e)" }} />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  {allRanked.length > visible && (
                    <div
                      onClick={() => setVisible((v) => v + MAX_SUGGESTIONS)}
                      style={{ marginTop: 10, padding: "8px 0", textAlign: "center", border: "1px solid #2c2c31", color: "#8b8b93", font: `500 10.5px ${MONO}`, cursor: "pointer", userSelect: "none" }}
                    >
                      load 10 more ({allRanked.length - visible} left)
                    </div>
                  )}
                </>
              ) : (
                <div style={{ ...S.panel, padding: "28px 18px", textAlign: "center", color: "#55555c", font: `400 10.5px ${MONO}` }}>
                  suggestions appear here once a track is playing
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

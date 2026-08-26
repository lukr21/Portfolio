// Camelot key handling and ranking, ported from djnext.py.

const MAJOR: Record<string, number> = { B: 1, "F#": 2, GB: 2, DB: 3, "C#": 3, AB: 4, "G#": 4, EB: 5, "D#": 5, BB: 6, "A#": 6, F: 7, C: 8, G: 9, D: 10, A: 11, E: 12 };
const MINOR: Record<string, number> = { AB: 1, "G#": 1, EB: 2, "D#": 2, BB: 3, "A#": 3, F: 4, C: 5, G: 6, D: 7, A: 8, E: 9, B: 10, "F#": 11, GB: 11, "C#": 12, DB: 12 };

export function toCamelot(s: string | null | undefined): string | null {
  if (!s) return null;
  const t = String(s).trim();
  let m = t.match(/^(1[0-2]|[1-9])\s*([ABab])$/);
  if (m) return `${parseInt(m[1])}${m[2].toUpperCase()}`;
  m = t.match(/^(1[0-2]|[1-9])\s*([dmDM])$/);
  if (m) {
    const n = ((parseInt(m[1]) - 1 + 7) % 12) + 1;
    return `${n}${m[2].toLowerCase() === "d" ? "B" : "A"}`;
  }
  m = t.match(/^([A-Ga-g])\s*([#b♯♭]?)\s*(.*)$/);
  if (!m) return null;
  const acc = m[2].replace("♯", "#").replace("♭", "b");
  const root = m[1].toUpperCase() + (acc === "b" ? "B" : acc === "#" ? "#" : "");
  const q = m[3].trim().toLowerCase();
  const minor = ["m", "min", "minor", "-"].includes(q) || q.startsWith("min");
  const table = minor ? MINOR : MAJOR;
  if (!(root in table)) return null;
  return `${table[root]}${minor ? "A" : "B"}`;
}

export function keyScore(a: string | null, b: string | null): [number, string] {
  if (!a || !b) return [0.25, "?"];
  const na = parseInt(a.slice(0, -1)), la = a.slice(-1);
  const nb = parseInt(b.slice(0, -1)), lb = b.slice(-1);
  let d = (nb - na) % 12;
  if (d < 0) d += 12;
  if (d > 6) d -= 12;
  if (la === lb) {
    if (d === 0) return [1.0, "same key"];
    if (Math.abs(d) === 1) return [0.9, d > 0 ? "+1" : "-1"];
    if (Math.abs(d) === 2) return [0.55, d > 0 ? "+2" : "-2"];
    if (d === -5) return [0.3, "semitone up"];
    return [0.0, "clash"];
  }
  if (d === 0) return [0.85, "relative"];
  if (la === "A" && d === 1) return [0.65, "diag +1"];
  if (la === "B" && d === -1) return [0.65, "diag -1"];
  if (la === "B" && d === 3) return [0.4, "parallel"];
  if (la === "A" && d === -3) return [0.4, "parallel"];
  return [0.0, "clash"];
}

export function bpmScore(cur: number | null, cand: number | null, free = 3, stretch = 6, cutoff = 8, halftime = true): [number, number | null, number] {
  if (!cur || !cand) return [0.25, null, 1];
  const options: [number, number][] = [[cand, 1]];
  if (halftime) options.push([cand * 2, 2], [cand / 2, 0.5]);
  let best: [number, number] | null = null;
  for (const [b, mult] of options) {
    const pct = ((b - cur) / cur) * 100;
    if (best === null || Math.abs(pct) < Math.abs(best[0])) best = [pct, mult];
  }
  const [pct, mult] = best!;
  const a = Math.abs(pct);
  let s: number;
  if (a <= free) s = 1.0 - 0.15 * (a / free);
  else if (a <= stretch) s = 0.85 - 0.45 * ((a - free) / (stretch - free));
  else if (a <= cutoff) s = 0.4 - 0.4 * ((a - stretch) / (cutoff - stretch));
  else s = -1.0;
  if (mult !== 1) s -= 0.1;
  return [s, Math.round(pct * 10) / 10, mult];
}

export interface Track {
  id: string;
  title: string;
  artist: string;
  isrc: string;
  bpm: number | null;
  camelot: string | null;
  cover?: string | null;
  source?: string;
  played?: boolean;
}

export interface Cfg { wKey: number; free: number; stretch: number; cutoff: number; halftime: boolean; strictKey: boolean; energyDir: "flat" | "up" | "down"; }

export interface Ranked extends Track { score: number; keyLabel: string; bpmPct: number | null; bpmMult: number; }

export function rank(current: Track, tracks: Track[], cfg: Cfg): Ranked[] {
  const wk = cfg.wKey, wb = 1 - wk;
  const out: Ranked[] = [];
  for (const t of tracks) {
    if (t.id === current.id) continue;
    const [ks, keyLabel] = keyScore(current.camelot, t.camelot);
    const [bs, bpmPct, bpmMult] = bpmScore(current.bpm, t.bpm, cfg.free, cfg.stretch, cfg.cutoff, cfg.halftime);
    if (bs < 0) continue;
    if (cfg.strictKey && ks === 0) continue;
    let score = wk * ks + wb * bs;
    if (t.played) score *= 0.5;
    if (cfg.energyDir === "up" && bpmPct !== null && bpmPct > 0) score += 0.04;
    else if (cfg.energyDir === "down" && bpmPct !== null && bpmPct < 0) score += 0.04;
    out.push({ ...t, score: Math.round(score * 1000) / 1000, keyLabel, bpmPct, bpmMult });
  }
  out.sort((a, b) => b.score - a.score);
  return out;
}

/*
 * DJNext wordmark, recreated from Lucas's logo: "DJN" bright / "ext" grey,
 * with the 12 Camelot-wheel color squares beneath. `compact` renders the
 * short "DJN" variant with 6 squares.
 */
const SQUARES = [
  "#38bdf8", "#4f6ef7", "#8b5cf6", "#c53ae0", "#ec4899", "#ef4655",
  "#f4672a", "#f59e0b", "#e0d515", "#84cc16", "#22c55e", "#2dd4bf",
];

export default function DJLogo({
  size = 20,
  compact = false,
  bright = "#f4f4f5",
  dim = "#8b8b93",
}: {
  size?: number;
  compact?: boolean;
  bright?: string;
  dim?: string;
}) {
  const squares = compact ? SQUARES.filter((_, i) => i % 2 === 0) : SQUARES;
  const sq = Math.max(3, Math.round(size * 0.22));
  const gap = Math.max(2, Math.round(sq * 0.45));
  return (
    <div style={{ display: "inline-flex", flexDirection: "column", gap: Math.round(size * 0.18), lineHeight: 1 }}>
      <span style={{ font: `700 ${size}px 'Space Grotesk',sans-serif`, letterSpacing: "-0.025em", whiteSpace: "nowrap" }}>
        <span style={{ color: bright }}>DJN</span>
        {!compact && <span style={{ color: dim }}>ext</span>}
      </span>
      <span style={{ display: "flex", gap }}>
        {squares.map((c) => (
          <span key={c} style={{ width: sq, height: sq, background: c, flex: "none" }} />
        ))}
      </span>
    </div>
  );
}

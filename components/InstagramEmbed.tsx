// Embeds a public Instagram post or reel via Instagram's own embed page.
export default function InstagramEmbed({
  id,
  title,
}: {
  id: string;
  title: string;
}) {
  return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
      <iframe
        src={`https://www.instagram.com/reel/${id}/embed`}
        title={title}
        loading="lazy"
        allowFullScreen
        style={{
          width: "100%",
          aspectRatio: "9 / 16",
          minHeight: 560,
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          background: "var(--surface)",
        }}
      />
    </div>
  );
}

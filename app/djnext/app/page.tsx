import type { Metadata } from "next";
import Link from "next/link";
import DJNextApp from "@/components/djnext/DJNextApp";

export const metadata: Metadata = {
  title: "DJNext",
  description: "Paste a TIDAL playlist link and get key- and BPM-ranked next-track suggestions, analyzed in your browser.",
  robots: { index: false },
};

export default function DJNextToolPage() {
  return (
    <div className="djs-page">
      <DJNextApp />
      <div className="djs-footnotes">
        <p>
          DJNext is built and maintained by{" "}
          <Link href="/">Lucas Krippendorff</Link> &middot;{" "}
          <Link href="/djnext">About DJNext</Link> &middot; Works with playlists set to Public or
          Unlisted in TIDAL (Private ones are visible only to their owner, even with the link).
          Pasting an unlisted link here discloses it to this site&rsquo;s lookup service, which
          resolves the track list and stores nothing.
        </p>
        <p>
          Track data: <a href="https://getsongbpm.com" target="_blank" rel="noopener noreferrer">GetSongBPM</a>,
          with Deezer and iTunes 30&ndash;90&nbsp;s previews analyzed locally in your browser (essentia.js)
          when the databases come up short. Anonymous track data (the BPM and key of a song,
          keyed by its industry recording code) is cached server-side so each track is only ever
          analyzed once. Your playlist, results, and played-state stay in your browser; nothing
          about you is stored.
        </p>
      </div>
    </div>
  );
}

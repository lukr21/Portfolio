import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { pageMetadata } from "@/components/meta";

export const metadata = pageMetadata(
  "DJNext",
  "A next-track suggester for DJing off TIDAL: paste a playlist link, every track gets a key and BPM, and the set ranks itself.",
  "/djnext",
  "/assets/img/djnext-logo.png"
);

export default function DJNextPage() {
  return (
    <>
      {/* Project Hero */}
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to Projects
        </Link>
        <p className="project-hero__tag">Personal Project &middot; August 2026</p>
        <h1 className="project-hero__title">DJNext</h1>
        <p className="project-hero__subtitle">
          A next-track suggester for DJing off TIDAL. Paste a playlist link,
          every track gets a Camelot key and BPM, and whatever is playing ranks
          the rest of the playlist by how well it mixes.
        </p>
        <p>
          <Link
            href="/djnext/app"
            style={{
              display: "inline-block",
              margin: "1.75rem 0 0.75rem",
              padding: "0.75rem 1.6rem",
              background: "var(--blue)",
              color: "#fff",
              fontWeight: 600,
              fontSize: "0.95rem",
              borderRadius: "var(--radius-sm)",
              textDecoration: "none",
            }}
          >
            Open DJNext &rarr;
          </Link>
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Type</p>
            <p className="meta-item__value">Live web app</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Stack</p>
            <p className="meta-item__value">Next.js, TypeScript, essentia</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Works With</p>
            <p className="meta-item__value">Any public TIDAL playlist</p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content">
        <ScrollReveal tag="h2" id="about-djnext">About DJNext</ScrollReveal>
        <ScrollReveal tag="p">
          Mixing live means answering the same question every four minutes: of
          the couple hundred tracks in the playlist, which ones will actually
          beatmatch and stay in key with what is playing right now? Rekordbox
          and Serato answer it for files on a hard drive. My library lives in
          TIDAL, so I was doing it from memory. DJNext does the bookkeeping
          instead: pick the track you are playing and the rest of the playlist
          re-ranks around it, with a set timeline showing where you have been
          and an up-next slot previewing where you could go.
        </ScrollReveal>

        <ScrollReveal tag="h2" id="how-it-ranks">How It Ranks</ScrollReveal>
        <ScrollReveal tag="p">
          Every candidate gets one score from two parts: harmonic compatibility
          on the Camelot wheel (same key, relative major/minor, energy-boost
          diagonals) and tempo distance in percent, with half and double time
          treated as mixable. Tracks past an 8% stretch are hidden, played
          tracks sink, and a 60 BPM ballad sorts next to the 120 BPM tracks it
          actually mixes with.
        </ScrollReveal>

        <ScrollReveal>
          <div className="equation">
            <div className="equation__main">
              score = <em>w</em> &middot; K + (1 &minus; <em>w</em>) &middot; T
            </div>
            <div className="equation__defs">
              <div>
                <span className="equation__var">K</span> key: same 1.0 &middot;
                &plusmn;1 hour 0.9 &middot; relative 0.85 &middot; energy
                diagonal 0.65 &middot; &plusmn;2 hours 0.55 &middot; parallel
                0.4 &middot; clash 0
              </div>
              <div>
                <span className="equation__var">T</span> tempo, from
                |&Delta;BPM| in percent (best of &times;&frac12;, &times;1,
                &times;2): &le;3% &rarr; 1.0&ndash;0.85 &middot; 3&ndash;6%
                &rarr; 0.85&ndash;0.4 &middot; 6&ndash;8% &rarr;
                0.4&ndash;0 &middot; &gt;8% hidden
              </div>
              <div>
                <span className="equation__var">w</span> key weight, 0.6 by
                default &middot; played tracks: score &times; 0.5
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="h2" id="getting-the-data">Getting the Data</ScrollReveal>
        <ScrollReveal tag="p">
          The hard part is that TIDAL shows BPM and key in its own apps but does
          not give them to third-party developers. So DJNext builds its own:
          music databases first, and where they come up short it downloads the
          track&apos;s 30 second preview clip and measures tempo and key from
          the audio itself, with essentia compiled to WebAssembly, running in
          your browser. A key is only written when two detection methods agree.
          Nothing is stored server-side: your playlist, results, and set history
          stay in your browser.
        </ScrollReveal>

        <ScrollReveal tag="h2" id="from-localhost">From Localhost to Here</ScrollReveal>
        <ScrollReveal tag="p">
          Version one was a single Python file on localhost that read a CSV
          export of my playlist. It grew signal analysis, then a real connection
          to the TIDAL API, and then it made more sense as something anyone
          could open. The ranking logic on this site is the same code, ported
          line for line.
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block">
            <img
              src="/assets/img/djnext_set_view.png"
              alt="The DJNext set view: timeline rail of played tracks, library with key colors, and ranked suggestions"
            />
            <div className="media-block__caption">
              The set view: three tracks into a set, with the library sorted by
              BPM and the next candidates ranked live
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { pageMetadata } from "@/components/meta";

export const metadata = pageMetadata(
  "djnext",
  "A local web app that suggests the next track to mix from a Tidal playlist, ranking every candidate by Camelot key compatibility and BPM proximity. Python 3, standard library only.",
  "/djnext",
  "/assets/img/djnext_ui.png"
);

export default function DjnextPage() {
  return (
    <>
      {/* Project Hero */}
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to Projects
        </Link>
        <p className="project-hero__tag">Personal project &middot; August 2026</p>
        <h1 className="project-hero__title">djnext</h1>
        <p className="project-hero__subtitle">
          A local web app that reads my Tidal playlist and tells me what to play
          next. Every track in the library gets scored against whatever is
          currently playing on two axes, harmonic compatibility in the Camelot
          wheel and how far the tempo has to stretch, and the list re-ranks the
          moment I switch tracks. It runs on localhost, has no build step, and
          depends on nothing outside the Python standard library.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Type</p>
            <p className="meta-item__value">Individual project</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Stack</p>
            <p className="meta-item__value">Python 3, stdlib only</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Size</p>
            <p className="meta-item__value">One 640-line file</p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content">
        <ScrollReveal tag="h2" id="why-this-project">Why This Project?</ScrollReveal>
        <ScrollReveal tag="p">
          Mixing live means answering the same question every four minutes: of
          the couple hundred tracks in the playlist, which ones will actually
          beatmatch and stay in key with what is playing right now? Rekordbox
          and Serato answer it for files sitting on a hard drive. My library
          lives in Tidal, so I was doing it from memory, which works right up
          until the moment it does not.
        </ScrollReveal>
        <ScrollReveal tag="p">
          djnext does the bookkeeping instead. I export the playlist to CSV,
          it looks up tempo and key for every track once and caches the result,
          and from then on it is a ranked list that updates as the set moves.
          The whole thing is one Python file serving a single HTML page, so
          there is nothing to install and nothing to keep running between sets.
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/djnext_ui.png"
              alt="djnext interface showing Strobe by deadmau5 as the current track, with seven candidates ranked below by key and BPM"
            />
            <div className="media-block__caption">
              Playing Strobe (10A, 128 BPM). Midnight City ranks first at 11A
              and 127 BPM: one hour up the wheel, tempo 0.8% slow. Nightcall
              sits last because 4A clashes outright.
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="h2" id="how-ranking-works">How Ranking Works</ScrollReveal>
        <ScrollReveal tag="p">
          Every candidate gets one score, a weighted blend of a key score and a
          BPM score. The weight is a slider, defaulting to an even split, so I
          can bias toward harmonic mixing on a melodic set or toward tempo on a
          set where the key matters less.
        </ScrollReveal>

        <ScrollReveal>
          <div className="code-block">
            <code>
              {`score = w · key_score + (1 − w) · bpm_score

key_score        same key            1.00
                 ±1 hour             0.90
                 relative maj/min    0.85
                 diagonal (8A→9B)    0.65
                 ±2 hours            0.55
                 parallel maj/min    0.40
                 semitone up         0.30
                 anything else       0.00`}
            </code>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="p">
          The BPM side is percent difference rather than absolute, because three
          BPM at 95 is a very different ask than three BPM at 128. Anything
          within 3% is free, 3% to 6% is a stretch, 6% to 8% is a reach, and
          past 8% the track is dropped from the list entirely. Each candidate is
          also tested at double and half tempo, so a 64 BPM track surfaces as a
          clean half-time match against 128, with a small penalty so it never
          outranks a straight match.
        </ScrollReveal>

        <ScrollReveal>
          <div className="specs-grid">
            <div className="spec-card">
              <p className="spec-card__label">Free window</p>
              <p className="spec-card__value spec-card__value--green">±3%</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Hard cutoff</p>
              <p className="spec-card__value spec-card__value--orange">±8%</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Half/double penalty</p>
              <p className="spec-card__value">&minus;0.10</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Already played</p>
              <p className="spec-card__value">score &times; 0.5</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Dependencies</p>
              <p className="spec-card__value spec-card__value--blue">0</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="p">
          Played tracks are halved rather than hidden, so late in a set when the
          good options are gone something I already dropped can still climb back
          up if it is the best harmonic fit left. Every threshold in that table
          is a slider in the Tuning tab, because the defaults are tuned for
          house around 120 to 130 and fall apart outside it.
        </ScrollReveal>

        <ScrollReveal tag="h2" id="the-data-problem">The Data Problem</ScrollReveal>
        <ScrollReveal tag="p">
          None of this works without tempo and key for every track, and a
          playlist CSV carries neither. Lookups go to{" "}
          <a
            href="https://getsongbpm.com"
            target="_blank"
            rel="noopener"
            style={{ color: "var(--blue)" }}
          >
            GetSongBPM
          </a>
          , which returns both, with Deezer as a tempo-only fallback when
          GetSongBPM has no match for a track. Results are cached to disk on the
          first pass, so a 300-track playlist costs about two minutes once and
          nothing after that.
        </ScrollReveal>
        <ScrollReveal tag="p">
          Matching text titles to a database is the messy part. Remix suffixes,
          featured artists, and remaster tags all have to be stripped before
          searching, and the response still has to be scored against the title
          and artist I actually asked for so a live version does not quietly get
          accepted as the original. Tracks that miss entirely show a red
          question mark in the library, and I can type the BPM and key in by
          hand. Manual entries are flagged and never overwritten by a later
          lookup, which matters because my own ears beat the database on the
          handful of tracks it gets wrong.
        </ScrollReveal>

        <ScrollReveal>
          <div className="callout">
            <p>
              Tempo and key data on this project come from{" "}
              <a
                href="https://getsongbpm.com"
                target="_blank"
                rel="noopener"
                style={{ color: "var(--blue)" }}
              >
                GetSongBPM.com
              </a>
              , whose free API made the whole thing possible.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="h2" id="what-i-took-from-it">What I Took From It</ScrollReveal>
        <ScrollReveal tag="p">
          The interesting engineering here was not the scoring math, which is
          fifty lines, but deciding what the tool should refuse to do. An early
          version just sorted by score and handed me a list, and I did not trust
          it, because a number with no reasoning behind it is not advice. Every
          row now shows why it ranks where it does, the key move and the tempo
          delta, and I can overrule any of it. Ranking suggestions instead of
          picking one, and showing the reasoning instead of just the result, is
          what turned it from a toy into something I actually open mid-set.
        </ScrollReveal>
      </section>
    </>
  );
}

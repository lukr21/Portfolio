import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { pageMetadata } from "@/components/meta";

export const metadata = pageMetadata(
  "USB-C Speaker & Discrete Loudness Meter",
  "A two-board speaker system running off a single USB-C cable: an amp board that enumerates as a USB sound card and negotiates 12V over PD, and a 20-LED loudness meter built from discrete parts. My first PCB designs. Custom housing in progress.",
  "/speaker",
  "/assets/img/speaker_render_corner_v4.png"
);

const chipStyle: React.CSSProperties = {
  background: "var(--surface)",
  border: "1px solid var(--border)",
  borderRadius: "999px",
  padding: "0.35rem 0.9rem",
  fontSize: "0.85rem",
  whiteSpace: "nowrap",
};

export default function SpeakerPage() {
  return (
    <>
      {/* Project Hero */}
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to projects
        </Link>
        <p className="project-hero__tag">
          Personal Project &middot; 2026 &middot; In Progress
        </p>
        <h1 className="project-hero__title">
          USB-C Speaker &amp; Discrete Loudness Meter
        </h1>
        <p className="project-hero__subtitle">
          A two-board speaker system that runs off a single USB-C cable. The
          amp board enumerates as a USB sound card and negotiates 12V over
          PD, and the loudness meter drives ten LEDs per channel using
          discrete transistors instead of a driver IC. These are the first
          PCBs I designed. The end goal is everything mounted in a custom
          speaker housing.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Role</p>
            <p className="meta-item__value">Solo project</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Tools</p>
            <p className="meta-item__value">KiCad, LaTeX, JavaScript</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Fab</p>
            <p className="meta-item__value">JLCPCB, SMT assembled</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Status</p>
            <p className="meta-item__value">Boards fabbed, housing next</p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content">
        {/* The Idea */}
        <ScrollReveal>
          <div className="content-row" id="the-idea">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/speaker_render_corner_v4.png"
                  alt="Speaker amp PCB V4, KiCad render"
                  loading="lazy"
                />
                <div className="media-block__caption">
                  The amp board, revision 4, as ordered from JLCPCB
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>The Idea</h2>
              <p>
                Desktop speakers usually mean a wall adapter, an aux cable, and
                a premade amp module. I wanted to build the whole signal path
                myself and have it run off one cable: plug in USB-C and the
                board shows up as a sound card, negotiates its own power, and
                drives the speakers directly.
              </p>
              <p>
                The other goal was the skill itself: I had never designed a
                PCB, and I picked this project specifically to learn. KiCad was
                the obvious tool, since it&apos;s free and does everything
                from schematic capture to the fab files JLCPCB builds from.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Signal Chain */}
        <ScrollReveal tag="h2" id="signal-chain">
          The Signal Chain
        </ScrollReveal>
        <ScrollReveal>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              padding: "0.75rem 0 0.25rem",
            }}
          >
            <span style={chipStyle}>USB-C</span>
            <span style={{ color: "var(--orange)" }}>&rarr;</span>
            <span style={chipStyle}>CH221K PD sink, 12V</span>
            <span style={{ color: "var(--orange)" }}>&rarr;</span>
            <span style={chipStyle}>PCM2704 USB audio</span>
            <span style={{ color: "var(--orange)" }}>&rarr;</span>
            <span style={chipStyle}>TDA7297 class AB</span>
            <span style={{ color: "var(--orange)" }}>&rarr;</span>
            <span style={chipStyle}>Dayton CE81PF-8 drivers</span>
          </div>
        </ScrollReveal>
        <ScrollReveal tag="p">
          One connector carries everything. The data lines go to a PCM2704,
          which any computer sees as a class-compliant USB sound card, so no
          drivers are needed. On the power side, a CH221K requests 12V from a
          USB-C PD supply for the amplifier, and an AMS1117 steps that down
          to 3.3V for logic. The loudness meter taps the analog signal right
          before the speakers.
        </ScrollReveal>

        {/* The Amp Board */}
        <ScrollReveal tag="h2" id="amp-board">
          The Amp Board
        </ScrollReveal>
        <ScrollReveal>
          <div className="content-row">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/speaker_amp_schematic.png"
                  alt="Amp board schematic, one sheet, all connections drawn as wires"
                  loading="lazy"
                />
                <div className="media-block__caption">
                  The full schematic on one sheet: USB-C and PD on the left,
                  PCM2704 in the middle, TDA7297 stages on the right
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <p>
                The amplifier is a TDA7297, a 15W&times;2 class-AB chip
                running directly off the 12V rail. Input protection is a
                polyfuse for overcurrent and an SMBJ15A TVS diode to clamp
                transients on VBUS. A crystal clocks the PCM2704, and the
                on-board volume buttons connect straight to it, since USB
                audio handles volume in the stream.
              </p>
              <p>
                This is also the first schematic I ever drew. I did not know
                yet that net labels tie nets together, so every connection is
                a drawn wire. It works, and I left it unretouched.{" "}
                <a href="/assets/speaker_amp_schematic.pdf">
                  Schematic PDF &rarr;
                </a>
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="p">
          The board went through four fabbed revisions. JLCPCB assembled the
          SMT parts, so each spin was cheap and fast enough to just order,
          test, and fix in the next version.
        </ScrollReveal>

        <div className="media-row media-row--grid">
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/speaker_render_top_v1.png"
                alt="Amp board revision 1 render"
                loading="lazy"
              />
              <div className="media-block__caption">Revision 1</div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/speaker_render_top_v2.png"
                alt="Amp board revision 2 render"
                loading="lazy"
              />
              <div className="media-block__caption">Revision 2</div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/speaker_render_top_v3.png"
                alt="Amp board revision 3 render"
                loading="lazy"
              />
              <div className="media-block__caption">Revision 3</div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/speaker_render_top_v4.png"
                alt="Amp board revision 4 render"
                loading="lazy"
              />
              <div className="media-block__caption">Revision 4, as ordered</div>
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="content-row content-row--reverse">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/speaker_pcb_v4.png"
                  alt="Amp board V4 PCB layout in KiCad"
                  loading="lazy"
                />
                <div className="media-block__caption">
                  V4 layout in KiCad: USB and clock on the left, power and
                  amplification on the right
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <p>
                The layout follows the signal: the USB data pairs and crystal
                stay close to the PCM2704 on one side, and the 12V power path
                and speaker outputs stay on the other.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/*
          PHOTO SLOT (amp board): when physical photos exist, add
          media-blocks here: assembled board top-down (speaker_photo_amp.jpg),
          USB-C cable plugged in (speaker_photo_usbc.jpg).
        */}

        {/* The Loudness Ladder */}
        <ScrollReveal tag="h2" id="loudness-ladder">
          The Loudness Ladder
        </ScrollReveal>
        <ScrollReveal tag="p">
          The second board is a stereo loudness meter: ten LEDs per channel
          that light in sequence as the music gets louder, with the top LED
          doubling as a clip indicator. Driver ICs exist that do exactly
          this, but I built it from discrete parts instead. Per channel, half
          an LM358 works as an envelope detector and gain stage, and each LED
          has its own MMBT3904 with a base divider that sets its turn-on
          threshold. Functionally this is a flash ADC: ten threshold stages
          compare the same input in parallel and output a thermometer code.
          The difference is that the code drives LEDs directly instead of
          being encoded into bits, and the thresholds are spaced by loudness
          rather than equal voltage steps.
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/speaker_vu_schematic.png"
              alt="Audio visualizer schematic in KiCad"
              loading="lazy"
            />
            <div className="media-block__caption">
              One channel: envelope detector, &times;2.1 op-amp bus, then ten
              common-emitter stages with individually sized base dividers
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="p">
          This is my second schematic, drawn after the amp&apos;s. Compared
          to the first one it uses net labels instead of drawn wires
          everywhere, and the signal path reads left to right in stages. The
          improvement between the two boards is what I picked the project
          for.
        </ScrollReveal>

        <ScrollReveal tag="p">
          The interesting part is sizing those twenty resistor dividers. LEDs
          should light at equal loudness steps, and loudness is logarithmic,
          so each threshold sits a fixed number of dB below full scale, then
          gets snapped to real E24 resistor values. I derived the whole thing
          by hand and wrote it up: envelope detector ripple, the op-amp gain
          choice, the dB spacing, and the error introduced by E-series
          rounding.{" "}
          <a href="/assets/vu_ladder_math.pdf">
            Full derivation PDF &rarr;
          </a>
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/speaker_vu_pcb_v2.png"
              alt="Audio visualizer V2 PCB layout"
              loading="lazy"
            />
            <div className="media-block__caption">
              V2 layout: twenty near-identical stages, twenty different
              divider values
            </div>
          </div>
        </ScrollReveal>

        <div className="media-row media-row--grid">
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/speaker_vu_render_corner_v2.png"
                alt="Audio visualizer board V2 render"
                loading="lazy"
              />
              <div className="media-block__caption">
                Visualizer V2: ten LEDs per channel, green through red on the
                assembled board
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/speaker_vu_render_back_v2.png"
                alt="Audio visualizer V2 back render"
                loading="lazy"
              />
              <div className="media-block__caption">
                All SMT parts sit on the back, so the front face is just LEDs
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/*
          VIDEO SLOT: demo clip of the LEDs reacting to music goes here
          (speaker_vu_demo.mp4 via AutoplayVideo), which becomes the hero
          of this section once recorded.
        */}

        {/* Specs */}
        <ScrollReveal>
          <div className="specs-grid" id="specs">
            <div className="spec-card">
              <p className="spec-card__label">Input</p>
              <p className="spec-card__value">USB-C, one cable</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Power</p>
              <p className="spec-card__value spec-card__value--blue">
                12V via USB PD
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Audio In</p>
              <p className="spec-card__value">PCM2704 USB DAC</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Amplifier</p>
              <p className="spec-card__value">TDA7297, class AB</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Drivers</p>
              <p className="spec-card__value">Dayton CE81PF-8</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Meter</p>
              <p className="spec-card__value spec-card__value--orange">
                20 LEDs, no driver IC
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Amp Revisions</p>
              <p className="spec-card__value">4 fabbed</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Meter Revisions</p>
              <p className="spec-card__value">2 fabbed</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Build Log / What's Next */}
        <ScrollReveal>
          <div className="callout callout--orange" id="whats-next">
            <h2 style={{ margin: "0 0 0.75rem 0", fontSize: "1.15rem" }}>
              Next: The Housing
            </h2>
            <p>
              Both boards are fabbed, and the drivers are picked out: Dayton
              CE81PF-8 full-range units, already modeled in CAD. What&apos;s
              left is the enclosure that mounts the drivers and both boards,
              with the LED ladder as the front face. I&apos;ll update this
              section with photos, measurements, and a demo video as the
              build progresses.
            </p>
          </div>
        </ScrollReveal>

        {/*
          BUILD LOG SLOT: as housing photos accumulate, replace the callout
          above with a chronological media-row build log
          (speaker_build_01.jpg, speaker_build_02.jpg, ...) and close with
          the finished glamour shot (speaker_photo_final.jpg), which then
          also replaces the hero image and homepage card image.
        */}
      </section>
    </>
  );
}

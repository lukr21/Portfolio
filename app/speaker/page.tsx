import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { pageMetadata } from "@/components/meta";

export const metadata = pageMetadata(
  "USB-C Speaker & Discrete Loudness Meter",
  "A speaker built from the signal up: a custom USB-C amp board that pulls both audio and 12V PD power from one cable, a 10-LED-per-channel loudness ladder built with no driver IC, and a fully custom housing on the way.",
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
          One USB-C cable in, sound out. Nothing between the port and the
          speaker cone is a module or dev board: a custom amp PCB pulls both
          the audio stream and 12V of power from a single cable, and a
          10-LED-per-channel loudness ladder does the job of a driver IC with
          nothing but transistors, resistors, and hand-derived math. Final
          destination: everything mounted in a fully custom speaker housing.
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
                an amp module from somewhere. I wanted the whole signal path to
                be mine, and to need exactly one cable. Plug in USB-C and the
                board enumerates as a sound card, negotiates its own power, and
                drives the speakers directly.
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
          The same USB-C connector carries both halves of the product: data
          lines go to a PCM2704, which shows up to any computer as a class-
          compliant USB sound card and converts the stream to analog; the
          power side goes through a CH221K that negotiates 12V from a USB-C PD
          supply for the amplifier, stepped down to 3.3V for logic by an
          AMS1117. The loudness meter taps the analog signal right before the
          speakers.
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
                  src="/assets/img/speaker_render_top_v4.png"
                  alt="Amp board V4 top view render"
                  loading="lazy"
                />
                <div className="media-block__caption">
                  V4 top view: USB-C in on the left, screw terminals out to the
                  drivers on the right
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <p>
                The amplifier itself is a TDA7297, a 15W&times;2 class-AB chip
                running straight off the negotiated 12V rail. The input side
                is protected the way a real product would be: a polyfuse
                against overcurrent and an SMBJ15A TVS diode clamping
                transients on VBUS. A crystal clocks the PCM2704, and volume
                buttons on-board talk to it directly, since USB audio class
                handles volume in-stream.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="p">
          The board took four fabbed revisions to get right. Having JLCPCB
          assemble the SMT parts made each spin cheap enough to treat the fab
          house as a debugging tool.
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
                Layout follows the signal: the noise-sensitive USB data pairs
                and crystal stay close to the PCM2704 on one side, while the
                12V power path and the amp&apos;s output traces get the copper
                they need on the other. The full schematic is a two-page
                read.{" "}
                <a href="/assets/speaker_amp_schematic.pdf">
                  Schematic PDF &rarr;
                </a>
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/*
          PHOTO SLOT (amp board): when physical photos exist, add
          media-blocks here — assembled board top-down (speaker_photo_amp.jpg),
          USB-C cable plugged in (speaker_photo_usbc.jpg).
        */}

        {/* The Loudness Ladder */}
        <ScrollReveal tag="h2" id="loudness-ladder">
          The Loudness Ladder
        </ScrollReveal>
        <ScrollReveal tag="p">
          The second board is a stereo loudness meter: ten LEDs per channel
          that light in sequence as the music gets louder, with the top LED
          doubling as a clip indicator. The usual way to build this is a $2
          driver IC. I built it with none: per channel, half an LM358 works as
          an envelope detector and gain stage, and each LED hangs off its own
          MMBT3904 with a base divider that sets its turn-on threshold. Seen
          for what it is, this is a flash ADC: ten threshold stages comparing
          the same input in parallel, outputting a thermometer code &mdash;
          except the code is displayed directly as a bar of LEDs instead of
          being encoded into bits, and the thresholds are spaced for loudness
          rather than linear voltage.
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
                Visualizer V2: two rows of ten LEDs, green through red
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
                Back side carries all the SMT stages, keeping the face clean
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/*
          VIDEO SLOT: demo clip of the LEDs reacting to music goes here
          (speaker_vu_demo.mp4 via AutoplayVideo) — this becomes the hero
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
              Both boards are fabbed and the Dayton CE81PF-8 full-range
              drivers are picked out and modeled. What&apos;s left is the part
              you actually see: a custom speaker enclosure that mounts the
              drivers, the amp, and the LED ladder as its front face. This
              section will grow into a build log &mdash; assembly photos,
              measurements, and a demo video &mdash; as the housing comes
              together.
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

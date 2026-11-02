import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { pageMetadata } from "@/components/meta";
import InstagramEmbed from "@/components/InstagramEmbed";

export const metadata = pageMetadata(
  "SubVysion",
  "First engineering hire and hardware lead at SubVysion (YC S26), building the autonomous ground-penetrating radar rovers the company runs on today.",
  "/subvysion",
  "/assets/img/subvysion_rover_panels.png"
);

const specNote = {
  fontSize: "0.8rem",
  color: "var(--text-secondary)",
  marginTop: "0.5rem",
} as const;

const textBlock = { maxWidth: "none" } as const;

export default function SubVysionPage() {
  return (
    <>
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to Home
        </Link>
        <p className="project-hero__tag">
          Experience &middot; Mar 2026 &ndash; Present
        </p>
        <h1 className="project-hero__title">SubVysion</h1>
        <p className="project-hero__subtitle">
          SubVysion (YC S26) maps underground utilities with ground-penetrating
          radar. I joined as the first engineering hire, before the company had
          done any scanning, and led hardware from there: first a scanning push
          cart, then the rovers the company still runs on today. All of it was
          designed around what our CEO needed, and refined with him and our
          software intern as we tested.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Role</p>
            <p className="meta-item__value">Hardware Lead, first engineering hire</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Worked With</p>
            <p className="meta-item__value">Founders and software intern</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Company</p>
            <p className="meta-item__value">
              <a
                href="https://subvysion.com/"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--blue)", textDecoration: "none" }}
              >
                subvysion.com &#8599;
              </a>
            </p>
          </div>
        </div>
      </section>

      <section className="project-content">
        <ScrollReveal>
          <div className="specs-grid">
            <div className="spec-card">
              <p className="spec-card__label">First Rover</p>
              <p className="spec-card__value">Under 2 weeks</p>
              <p style={specNote}>Designed and built from scratch</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Scan Speed</p>
              <p className="spec-card__value spec-card__value--green">0.5 &rarr; 3 m/s</p>
              <p style={specNote}>My push cart vs. later rovers on pavement</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Compute</p>
              <p className="spec-card__value">3 generations</p>
              <p style={specNote}>Upgraded as faster scanning meant more data</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Team Build</p>
              <p className="spec-card__value">Whole company</p>
              <p style={specNote}>Built a rover together in San Francisco from my guide</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="content-row" id="where-it-started">
            <div className="content-row__media">
              <div className="media-block">
                <InstagramEmbed id="Deej6w8u9dN" title="SubVysion rover driving" />
                <div className="media-block__caption">
                  The rover driving around.{" "}
                  <a
                    href="https://www.instagram.com/reel/Deej6w8u9dN/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "var(--blue)", textDecoration: "none" }}
                  >
                    Watch on Instagram &#8599;
                  </a>
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>Where It Started</h2>
              <p>
                When I joined, SubVysion hadn&apos;t scanned anything yet. The
                first thing I built was a hand-pushed scanning cart that carried
                the radar, cameras, and GPS, so the company could start
                collecting data and lining up the camera and GPS data with the
                radar scans. Our CEO, who
                also wrote much of the early software, decided when that was
                working well enough to move on to autonomy.
              </p>
              <p>
                From there I designed the first rover from scratch and had it
                built in under two weeks. Everything after V1 was iterated
                alongside testing and real field work on job sites.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/subvysion_rover_panels.png"
              alt="Line drawing of the current SubVysion rover with its panels on"
              style={{ maxWidth: 560, margin: "0 auto", display: "block" }}
            />
            <div className="media-block__caption">
              The current rover, drawn from my Onshape model.
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="content-row__text" style={textBlock} id="field-testing">
            <h2>Learning From Field Tests</h2>
            <p>
              I was designing for our CEO&apos;s requirements, so most
              decisions were made together with feedback from him and our
              software intern. The camera layout is a good example: the angle
              of each camera from horizontal and the angle between the cameras
              were settled by going back and forth on what the software needed
              to see. After each field test we worked out which fixes belonged
              in the hardware and which in the code.
            </p>
            <p>
              The biggest change was the drivetrain. The first rover used skid
              steering, and on real ground the skidding made turns unpredictable
              and used a lot of power. I switched to two driven wheels with
              casters. After looking at how a large agricultural rover was laid
              out, I moved the casters from the back to the front, and that
              version was more stable when we tested it.
            </p>
            <p>
              Later rovers scan at 3 m/s on pavement, six times faster than the
              cart. Faster scanning meant much more data per minute from three
              stereo cameras, RTK GPS, an IMU, and the radar, so I upgraded the
              onboard computer twice as the load grew. We&apos;re now comparing
              LiDAR sensors to add next.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="content-row__text" style={{ ...textBlock, marginTop: "2.5rem" }} id="power-packaging">
            <h2>Power and Packaging</h2>
            <p>
              I designed the rover&apos;s power system around a 36V LiFePO4
              battery, with a buck converter feeding a fused 12V line for the
              electronics and brake resistors to handle energy coming back from
              the motors. An early version switched power with a contactor that
              ran hot in use, so I replaced it with an anti-spark switch, which
              also let us drop a separate pre-charge circuit.
            </p>
            <p>
              The radar can&apos;t have metal in its field of view, which
              shaped the whole structure: a PVC frame, 3D-printed mounts in
              PETG and ASA, and ABS body panels. I ordered the panels cut from
              SendCutSend, my first time designing parts for an outside
              manufacturer instead of printing them myself.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="content-row" style={{ marginTop: "2.5rem" }} id="building-together">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/subvysion_team.jpg"
                  alt="The SubVysion team standing behind the white paneled rover"
                />
                <div className="media-block__caption">
                  The SubVysion team with the rover.
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>Building It Together</h2>
              <p>
                Once the design settled, I was still the only person who knew
                how to build one. So I wrote a 28-page assembly guide and the
                parts list. Every module gets an exploded drawing that shows
                which part is which, how they fit together, in what order, and
                which fasteners go where. Each one ends with a checkpoint for
                what should be true before moving on. The guide also flags the
                mistakes that are easy to make and expensive to undo, and it
                covers the wiring and first power-up.
              </p>
              <p>
                The whole company then used it to build a rover together in San
                Francisco.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="content-row__text" style={{ ...textBlock, marginTop: "2.5rem" }} id="now">
            <h2>Where It Is Now</h2>
            <p>
              SubVysion still runs on these rovers. I&apos;m now helping with a
              more compact redesign, this time as a contributor rather than the
              lead.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

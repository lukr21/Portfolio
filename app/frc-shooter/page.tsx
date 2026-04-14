import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import AutoplayVideo from "@/components/AutoplayVideo";

export default function FrcShooterPage() {
  return (
    <>
      {/* Project Hero */}
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to Projects
        </Link>
        <p className="project-hero__tag">FIRST Robotics &middot; FRC 2024</p>
        <h1 className="project-hero__title">Ring Shooter Module</h1>
        <p className="project-hero__subtitle">
          Mechanical design for Team 5557 (BB-Raiders), a dual-stage flywheel
          launcher that could hit far-field goals reliably.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Team</p>
            <p className="meta-item__value">BB-Raiders (5557)</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Role</p>
            <p className="meta-item__value">Mechanical Design</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Competition</p>
            <p className="meta-item__value">FRC 2024 (Crescendo)</p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content">
        {/* Game Context */}
        <ScrollReveal>
          <div className="content-row" id="game-context">
            <div className="content-row__media">
              <div className="media-block">
                <AutoplayVideo
                  src="/assets/vid/frc_shooter_firing.mp4"
                  controls
                />
                <div className="media-block__caption">
                  The shooter in action, ring visible mid-flight heading toward
                  the goal
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>Game Context</h2>
              <p>
                FRC 2024 (Crescendo) asked teams to launch ring-shaped game
                pieces across the field into scoring goals. The challenge was
                building a shooter that could fire accurately at range while
                maintaining fast cycle times during matches.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* What I Built */}
        <ScrollReveal>
          <div className="content-row content-row--reverse" id="what-i-built">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/frc_shooter_module.jpg"
                  alt="Close-up of the dual-stage roller system with flywheel"
                />
                <div className="media-block__caption">
                  Close-up of the dual-stage roller system with flywheel
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>What I Built</h2>
              <p>
                I designed the entire shooter arm assembly: a black delrin arm
                that holds the roller system, pivots for variable launch angles,
                and bolts directly onto the robot&apos;s main structure. The key
                design decision was a dual-stage roller system with independent
                motors. The lower roller pulls a ring from the loader and lifts
                it into the firing lane, while the upper roller with an
                integrated flywheel receives the ring and flings it down-field.
                The flywheel adds rotational inertia so the upper roller
                maintains angular velocity throughout the full shot, giving
                consistent range.
              </p>
              <p>
                An articulation joint with a compact gearbox below the main
                structure lets the driver tilt the whole shooter between low,
                mid, and high arcs. The controls team mapped joystick axis to
                elevation and coded angle presets for button-tap snap-shots.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Design Highlights */}
        <ScrollReveal tag="h2" id="design-highlights">
          Design Highlights
        </ScrollReveal>
        <ScrollReveal>
          <div className="specs-grid">
            <div className="spec-card">
              <p className="spec-card__label">Cycle Time</p>
              <p className="spec-card__value">Independent feed &amp; flywheel</p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.5rem",
                }}
              >
                Next ring is queued while the previous one is in flight
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Range</p>
              <p className="spec-card__value">5&times; Energy Storage</p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.5rem",
                }}
              >
                Flywheel stored ~5&times; the energy of a bare roller, hitting
                far-field goals reliably
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Driver-Friendly</p>
              <p className="spec-card__value">Joystick + Presets</p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.5rem",
                }}
              >
                One joystick axis for elevation, button presets for snap-shots
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Pit-Ready</p>
              <p className="spec-card__value">Fast Service</p>
              <p
                style={{
                  fontSize: "0.8rem",
                  color: "var(--text-secondary)",
                  marginTop: "0.5rem",
                }}
              >
                Black arm unbolts as a single unit, motor/roller swap &lt; 5
                minutes
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* My Role */}
        <ScrollReveal>
          <div className="content-row" id="my-role">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/frc_team_photo.jpg"
                  alt="The team at competition with both robots"
                />
                <div className="media-block__caption">
                  The team at competition with both robots
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>My Role</h2>
              <p>
                I handled the mechanical design of the shooter arm: CAD
                modelling, pulley and belt sizing, bearing selection,
                weight-reduction pocketing, and coordination with the controls
                team for motor and sensor placement. This was a team project
                (unlike the robotic arm), which meant working within the
                constraints of other subsystems and adapting to changes in the
                robot&apos;s overall architecture during build season.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Callout */}
        <ScrollReveal>
          <div className="callout">
            <p>
              <strong>FRC taught me how to design under real constraints</strong>
              : weight limits, size envelopes, budget, and a hard competition
              deadline. The shooter had to integrate with a robot I didn&apos;t
              fully control, which meant constant communication with the
              drivetrain and controls teams.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

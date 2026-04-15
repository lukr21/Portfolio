import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import AutoplayVideo from "@/components/AutoplayVideo";

export default function RoboticArmPage() {
  return (
    <>
      {/* Project Hero */}
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to projects
        </Link>
        <p className="project-hero__tag">
          Personal Project &middot; May&ndash;August 2025
        </p>
        <h1 className="project-hero__title">6-DOF Desktop Robotic Arm</h1>
        <p className="project-hero__subtitle">
          A fully 3D-printed robotic arm with custom gear reductions, inverse
          kinematics, and a web-based control interface, built with a $10 bag of
          steel balls.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Role</p>
            <p className="meta-item__value">Solo project</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Tools</p>
            <p className="meta-item__value">Onshape, Python, C++, Arduino</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Status</p>
            <p className="meta-item__value">Shelved, bearing redesign needed</p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content">
        {/* The Challenge */}
        <ScrollReveal>
          <div className="content-row" id="the-challenge">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/arm_cad_render.jpg"
                  alt="Full assembly in Onshape, 6 degrees of freedom, ~80cm reach"
                  loading="lazy"
                />
                <div className="media-block__caption">
                  Full assembly in Onshape, 6 degrees of freedom, ~80cm reach
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>The Challenge</h2>
              <p>
                I wanted to explore robotics and set myself a constraint: build a
                robotic arm as cheaply as possible, with no premade ball
                bearings. I bought bulk 4mm steel balls ($10 on Amazon) and
                designed every bearing from scratch using 3D-printed PETG
                raceways.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Mechanical Design */}
        <ScrollReveal tag="h2" id="mechanical-design">
          Mechanical Design
        </ScrollReveal>
        <ScrollReveal tag="p">
          The arm uses two types of custom gear reductions: 26:1 cycloidal
          drives for the main joints (base, shoulder, elbow) and 5:1 planetary
          gearboxes for the smaller joints. Both use the same custom ball
          bearing design: 3D-printed raceways loaded with 4mm steel balls. The
          housing of each drive doubles as the output shell, so links bolt
          directly to it. Structure is PETG with weight-saving cutouts and M5
          spine bolts for serviceability.
        </ScrollReveal>

        <ScrollReveal>
          <div className="specs-grid">
            <div className="spec-card">
              <p className="spec-card__label">Reach</p>
              <p className="spec-card__value">~80cm</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Payload</p>
              <p className="spec-card__value">0.5kg target</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Gear Ratios</p>
              <p className="spec-card__value spec-card__value--blue">
                26:1, 5:1
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Motors</p>
              <p className="spec-card__value">NEMA 17 steppers</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Drivers</p>
              <p className="spec-card__value">6&times; TMC 2208</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Controller</p>
              <p className="spec-card__value">Arduino Mega</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Material</p>
              <p className="spec-card__value spec-card__value--orange">PETG</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Bearing Cost</p>
              <p className="spec-card__value spec-card__value--green">
                $10 total
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="content-row content-row--reverse">
            <div className="content-row__media">
              <div className="media-block">
                <AutoplayVideo src="/assets/vid/planetary_exploded.mp4" />
                <div className="media-block__caption">
                  5:1 planetary gearbox, exploded view animation from Onshape
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <p>
                The planetary gearbox handles the wrist joints where compactness
                matters more than raw torque. Each gearbox shares the same
                custom ball bearing approach, steel balls in a printed raceway,
                keeping costs minimal while the geometry does the heavy lifting.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="content-row">
            <div className="content-row__media">
              <div className="media-block">
                <AutoplayVideo src="/assets/vid/arm_base_joint.mp4" />
                <div className="media-block__caption">
                  Base joint with cycloidal drive, custom ball bearing visible
                  inside the housing
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <p>
                The base joint uses the 26:1 cycloidal drive where the housing
                doubles as the output shell. You can see the custom ball bearing
                inside, the 4mm steel balls sitting in the printed raceway. This
                is where the axial friction issue was most apparent.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Software Stack */}
        <ScrollReveal tag="h2" id="software-stack">
          Software Stack
        </ScrollReveal>
        <ScrollReveal tag="p">
          The software side was equally important. I programmed an inverse
          kinematics solver and trajectory planner in Python using the Robotics
          Toolbox, generating time-based joint commands. These get transmitted
          as step pulses to the motors via Arduino firmware I wrote in C++. I
          also built a web-based control interface using JavaScript, HTML, and
          CSS with Meshcat for 3D visualization, letting me set start/end
          positions, edit trajectories with bezier control points, cycle through
          saved paths, and commit movements to the arm.
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block">
            <AutoplayVideo src="/assets/vid/arm_web_interface.mp4" />
            <div className="media-block__caption">
              Web-based control interface, Meshcat 3D visualization with
              trajectory editing and bezier control points
            </div>
          </div>
        </ScrollReveal>

        <div className="media-row">
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/arm_desk_photo.jpg"
                alt="The arm on the workbench with stepper drivers and wiring"
                loading="lazy"
              />
              <div className="media-block__caption">
                The arm on the workbench with stepper drivers and wiring
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/arm_breadboard.png"
                alt="TMC2208 stepper drivers and wiring on breadboard"
                loading="lazy"
              />
              <div className="media-block__caption">
                TMC2208 stepper drivers and wiring on a breadboard
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/arm_photo_2473.jpg"
                alt="All parts laid out in the slicer, the full arm prints in a single build plate"
                loading="lazy"
              />
              <div className="media-block__caption">
                All parts laid out in the slicer, prints in a single build plate
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/arm_cycloidal_mounted.png"
                alt="Cycloidal drives assembled on the arm link"
                loading="lazy"
              />
              <div className="media-block__caption">
                Cycloidal drives assembled on the arm link
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="media-block">
              <img
                src="/assets/img/arm_cycloidal_disc.png"
                alt="Cycloidal disc with heat-set inserts"
                loading="lazy"
              />
              <div className="media-block__caption">
                Cycloidal disc close-up with heat-set inserts
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* What I Learned */}
        <ScrollReveal>
          <div className="callout callout--orange" id="what-i-learned">
            <h2 style={{ margin: "0 0 0.75rem 0", fontSize: "1.15rem" }}>
              What I Learned
            </h2>
            <p>
              The custom bearings worked mechanically but revealed a fundamental
              tradeoff: the 3D-printed raceways needed to be tight enough to
              control axial backlash, but that tightness created friction that
              ate into the motors&apos; torque budget. Rotational backlash was
              actually fine (cycloidal drives are inherently good at that), but
              the joints were torque-inefficient overall. I shelved the project
              when the semester started because a redesign with premade metal
              bearings would have been needed. The $10 experiment proved what
              works and what doesn&apos;t.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

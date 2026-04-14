import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import AutoplayVideo from "@/components/AutoplayVideo";

export default function CycloidalDrivePage() {
  return (
    <>
      {/* Project Hero */}
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to projects
        </Link>
        <p className="project-hero__tag">R&amp;D &middot; 2025</p>
        <h1 className="project-hero__title">Cycloidal Drive</h1>
        <p className="project-hero__subtitle">
          A 3D-printed gear reduction with hand-assembled ball bearings, from
          12:1 proof-of-concept to 28:1 production version for the robotic arm.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Type</p>
            <p className="meta-item__value">Gear reduction</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Iterations</p>
            <p className="meta-item__value">V1 (12:1) &rarr; V2 (28:1)</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Material</p>
            <p className="meta-item__value">PETG + steel balls</p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content">
        {/* Why Cycloidal? */}
        <ScrollReveal>
          <div className="content-row" id="why-cycloidal">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/cycloidal_v1_assembled.jpg"
                  alt="V1 assembled, 12:1 ratio, 100mm diameter, 30mm tall"
                  loading="lazy"
                />
                <div className="media-block__caption">
                  V1 assembled, 12:1 ratio, 100mm diameter, 30mm tall
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>Why Cycloidal?</h2>
              <p>
                Cycloidal drives pack high gear ratios into compact, flat
                housings. Perfect for a 3D-printed robotic arm where every
                millimeter of joint thickness matters. Unlike planetary
                gearboxes, the cycloidal mechanism distributes load across
                multiple contact points simultaneously, giving good rotational
                backlash characteristics even with printed parts. And critically
                for this project, the geometry is printable without requiring
                tight tolerances on gear teeth.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block">
            <img
              src="/assets/img/cycloidal_v1_crosssection.jpg"
              alt="V1 CAD cross-section showing internal mechanism"
              loading="lazy"
            />
            <div className="media-block__caption">
              V1 CAD cross-section showing internal mechanism
            </div>
          </div>
        </ScrollReveal>

        {/* V1 */}
        <ScrollReveal tag="h2" id="v1-proof-of-concept">
          V1 &ndash; The Proof of Concept
        </ScrollReveal>
        <ScrollReveal tag="p">
          The first version was a 12:1 drive (12-lobe disc, 13-pin ring) built
          to validate the concept. Almost entirely 3D-printed in PETG with only
          two off-the-shelf radial bearings for the eccentric shaft. The output
          bearing was custom: a printed raceway loaded with 24&times; 6mm steel
          balls. It spun smoothly by hand but had noticeable backlash. Good
          enough to prove the concept, not good enough for the arm.
        </ScrollReveal>

        <ScrollReveal>
          <div className="specs-grid">
            <div className="spec-card">
              <p className="spec-card__label">Ratio</p>
              <p className="spec-card__value">12:1</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Diameter</p>
              <p className="spec-card__value">100mm</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Height</p>
              <p className="spec-card__value">30mm</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">COTS Bearings</p>
              <p className="spec-card__value">2 (eccentric shaft)</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Output Bearing</p>
              <p className="spec-card__value">Custom (24&times; 6mm)</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Material</p>
              <p className="spec-card__value spec-card__value--orange">PETG</p>
            </div>
          </div>
        </ScrollReveal>

        {/* V2 */}
        <ScrollReveal>
          <div className="content-row content-row--reverse" id="v2-for-the-arm">
            <div className="content-row__media">
              <div className="media-block">
                <AutoplayVideo src="/assets/vid/cycloidal_drive.mp4" />
              </div>
            </div>
            <div className="content-row__text">
              <h2>V2 &ndash; For the Arm</h2>
              <p>
                V2 was redesigned specifically for the robotic arm&apos;s joint
                modules. The ratio jumped to 28:1 for more torque, and the stack
                height was slimmed from 30mm to 20mm. The biggest change: the
                housing now doubles as the output shell, so arm links bolt
                directly to the rotating housing while the output pins stay
                fixed to the motor. This eliminated a separate output stage and
                made the whole joint more compact.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/cycloidal_v2_crosssection.jpg"
              alt="V2 CAD cross-section, slimmer profile compared to V1"
              loading="lazy"
            />
            <div className="media-block__caption">
              V2 CAD cross-section, note the slimmer 20mm profile
            </div>
          </div>
        </ScrollReveal>

        {/* The Bearing Tradeoff */}
        <ScrollReveal>
          <div className="callout callout--orange">
            <h2 style={{ margin: "0 0 0.75rem 0", fontSize: "1.15rem" }}>
              The Bearing Tradeoff
            </h2>
            <p>
              The core lesson from this project was about custom vs. commercial
              bearings. The 3D-printed raceways needed to be adequately tight to
              control axial backlash, but that tightness created friction that
              reduced torque transfer from the motors. Rotational backlash was
              actually not bad (cycloidal drives are inherently good at that),
              but the axial friction meant the joints were torque-inefficient
              overall. Bulk 4mm steel balls cost $10 on Amazon and lasted the
              entire project, so the cost savings were real. But premade metal
              ball bearings would have been a significant quality-of-life and
              performance improvement. The experiment answered the question it
              was designed to answer.
            </p>
          </div>
        </ScrollReveal>

        {/* Cost Breakdown */}
        <ScrollReveal tag="h2" id="cost-breakdown">
          Cost Breakdown
        </ScrollReveal>
        <ScrollReveal>
          <div className="specs-grid">
            <div className="spec-card">
              <p className="spec-card__label">Steel Balls</p>
              <p className="spec-card__value spec-card__value--green">$10</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">PETG Filament</p>
              <p className="spec-card__value">~$5/drive</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Eccentric Bearings</p>
              <p className="spec-card__value">~$3</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Fasteners</p>
              <p className="spec-card__value">~$2</p>
            </div>
            <div className="spec-card" style={{ gridColumn: "1 / -1" }}>
              <p className="spec-card__label">Total per Drive</p>
              <p className="spec-card__value" style={{ fontSize: "1.25rem" }}>
                ~$20
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Link to Robotic Arm */}
        <ScrollReveal tag="p" className="">
          <span
            style={{
              marginTop: "3rem",
              paddingTop: "3rem",
              borderTop: "1px solid var(--border)",
              display: "block",
            }}
          >
            <Link
              href="/robotic-arm"
              style={{
                color: "var(--blue)",
                textDecoration: "none",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              See how these drives were integrated into the robotic arm &rarr;
            </Link>
          </span>
        </ScrollReveal>
      </section>
    </>
  );
}

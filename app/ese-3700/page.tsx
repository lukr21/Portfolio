import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function ESE3700Page() {
  return (
    <>
      {/* Project Hero */}
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to projects
        </Link>
        <p className="project-hero__tag">UPenn ESE 3700 &middot; Spring 2026</p>
        <h1 className="project-hero__title">22nm CMOS Datapath &amp; Memory</h1>
        <p className="project-hero__subtitle">
          Transistor-level design of an 8-bit adder and a 16&times;4 SRAM
          array in a 22nm process, covering the datapath and storage halves
          of any digital system. From Boolean derivation through Elmore
          delay modeling and SPICE validation. Projects from ESE 3700 at
          the University of Pennsylvania.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Process</p>
            <p className="meta-item__value">22nm HP PTM</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Supply</p>
            <p className="meta-item__value">V<sub>DD</sub> = 0.8 V</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Tools</p>
            <p className="meta-item__value">Electric VLSI + SPICE</p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content">
        {/* =============================================== */}
        {/* PROJECT 1                                        */}
        {/* =============================================== */}
        <ScrollReveal tag="h2" id="project-1-adder">
          Project 1: 8-bit Ripple-Carry Adder
        </ScrollReveal>
        <ScrollReveal tag="p">
          An 8-bit ripple-carry adder, built and simulated in Electric VLSI.
          The full adder&apos;s outputs are:
        </ScrollReveal>
        <ScrollReveal>
          <div
            style={{
              margin: "1rem 0 1.5rem 0",
              padding: "1rem 1.25rem",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: "1rem",
              lineHeight: 1.9,
            }}
          >
            <div>S = A &oplus; B &oplus; C<sub>in</sub></div>
            <div>C<sub>out</sub> = AB + C<sub>in</sub>(A &oplus; B)</div>
          </div>
        </ScrollReveal>
        <ScrollReveal tag="p">
          Both depend on A &oplus; B, which made XOR2 the natural primitive
          to build around. Compute it once, feed it into both the sum and
          carry paths. Several alternative sum and carry topologies were
          explored and rejected along the way; that analysis is in the
          full report. Once the topology was settled, the interesting
          question became which XOR2 implementation to use.
        </ScrollReveal>

        {/* Two XOR2 implementations: the optimization */}
        <ScrollReveal tag="p">
          Two candidates were carried forward and compared head-to-head at
          the full 8-bit system level:
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-row">
            <div className="media-block">
              <img
                src="/assets/img/XOR2_nand.png"
                alt="Baseline XOR2 cell built from four NAND2 gates"
                loading="lazy"
              />
              <div className="media-block__caption">
                <strong>Baseline:</strong> four-NAND2 XOR2 (16 T). Every
                node fully restored, easy to analyze, conservative.
              </div>
            </div>
            <div className="media-block">
              <img
                src="/assets/img/XOR2_min.png"
                alt="Transistor-level schematic of the optimized transmission-gate XOR2 cell with output buffer"
                loading="lazy"
              />
              <div className="media-block__caption">
                <strong>Optimization:</strong> transmission-gate XOR2 with
                two-inverter output buffer (10 T). Same logic, 40% fewer
                transistors, and a shorter signal path. The buffer restores
                the TG&apos;s voltage output to a full rail-to-rail logic
                level before the next stage.
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="content-row content-row--reverse">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/FullAddersized.png"
                  alt="Full adder bit-slice schematic: NAND2 generates AB-bar, two XOR2 stages compute sum, two NAND2 cells compute carry"
                  loading="lazy"
                />
                <div className="media-block__caption">
                  Unfortunately the only screenshot of the full adder I had
                  saved is cropped a little.
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <p>
                The full adder bit-slice combines the two primitives. One
                NAND2 computes AB in parallel with the first XOR2
                (P = A &oplus; B). That intermediate P feeds both the sum
                path (a second XOR2 producing S = P &oplus; C<sub>in</sub>)
                and the carry path, where two right-hand NAND2 cells
                realize C<sub>out</sub> = AB + C<sub>in</sub>(A &oplus; B).
              </p>
              <p style={{ marginTop: "1rem" }}>
                Sharing P between sum and carry is what makes this topology
                efficient: the most expensive intermediate is computed once
                and reused. Eight of these bit-slices (plus a half adder at
                bit 0) make up the full 8-bit ripple-carry adder.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* SPICE comparison plot */}
        <ScrollReveal tag="h2" id="spice-results">
          SPICE Results
        </ScrollReveal>
        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/delay_comparison.png"
              alt="Side-by-side SPICE propagation delay comparison: TG-XOR (optimized) vs NAND4-XOR (baseline) across three test cases"
              loading="lazy"
            />
            <div className="media-block__caption">
              Side-by-side SPICE waveforms. Left column: optimized TG-XOR
              design. Right column: NAND4-XOR baseline. The bottom row is
              full carry propagation (255 + 1), the worst case. Optimized
              settles 44 ps earlier.
            </div>
          </div>
        </ScrollReveal>

        {/* Headline numbers */}
        <ScrollReveal>
          <div className="specs-grid" id="headline-numbers">
            <div className="spec-card">
              <p className="spec-card__label">Baseline Delay</p>
              <p className="spec-card__value">160 ps</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Optimized Delay</p>
              <p className="spec-card__value spec-card__value--green">
                120 ps
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Carry-Prop Speedup</p>
              <p className="spec-card__value spec-card__value--green">
                &minus;27%
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Baseline Area</p>
              <p className="spec-card__value">330 T</p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Optimized Area</p>
              <p className="spec-card__value spec-card__value--green">
                240 T
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">Leakage Tradeoff</p>
              <p className="spec-card__value spec-card__value--orange">
                10&times;
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* What went wrong */}
        <ScrollReveal>
          <div className="callout callout--orange">
            <h2 style={{ margin: "0 0 0.75rem 0", fontSize: "1.15rem" }}>
              The Lesson: When Elmore Lies
            </h2>
            <p>
              The most useful thing I learned on this project was not the
              topology exploration, it was what happens when your analytical
              model disagrees with simulation. Elmore delay predicted that
              widening the NAND2 PMOS to 2&times;W<sub>min</sub> would cut
              pull-up delay roughly in half when driving the TG-XOR2 input.
              SPICE said the opposite: sizing up actually made carry
              propagation worse. The first-order RC model captures the
              resistance drop from a wider PMOS but not the extra capacitance
              added to internal nodes. I reverted to minimum-sized transistors
              everywhere. The numbers above come from that version.
            </p>
          </div>
        </ScrollReveal>

        {/* Tradeoff */}
        <ScrollReveal tag="h2" id="leakage-tradeoff">
          The Leakage Tradeoff
        </ScrollReveal>
        <ScrollReveal tag="p">
          The optimized design wins on delay and area, but transmission gates
          create a partially-conducting path from supply to ground at the
          worst-case input (A = B = 1). That&apos;s a ~10&times; leakage
          penalty vs. the fully static NAND-only baseline. At minimum-leakage
          inputs the two designs are comparable. The choice between them
          depends on duty cycle: high-throughput, mostly-switching paths
          want the optimized cell; always-on, low-activity datapaths want
          the baseline.
        </ScrollReveal>

        <ScrollReveal>
          <div
            style={{
              margin: "1.5rem 0",
              border: "1px solid var(--border)",
              borderRadius: "8px",
              overflow: "hidden",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "0.95rem",
              }}
            >
              <thead>
                <tr style={{ background: "rgba(255,255,255,0.03)" }}>
                  <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontWeight: 600, borderBottom: "1px solid var(--border)" }}>
                    Design
                  </th>
                  <th style={{ textAlign: "left", padding: "0.75rem 1rem", fontWeight: 600, borderBottom: "1px solid var(--border)" }}>
                    Input State
                  </th>
                  <th style={{ textAlign: "right", padding: "0.75rem 1rem", fontWeight: 600, borderBottom: "1px solid var(--border)" }}>
                    Leakage per Delay Period
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Baseline (NAND4-XOR)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    A = B = 1 (max)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", fontVariantNumeric: "tabular-nums" }}>
                    0.025 fJ
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Baseline (NAND4-XOR)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    A = B = 0 (min)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", fontVariantNumeric: "tabular-nums" }}>
                    0.016 fJ
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Optimized (TG-XOR)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    A = B = 1 (max)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", color: "var(--orange)", fontVariantNumeric: "tabular-nums", fontWeight: 600 }}>
                    0.21 fJ
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    Optimized (TG-XOR)
                  </td>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    A = B = 0 (min)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    0.019 fJ
                  </td>
                </tr>
              </tbody>
            </table>
            <p
              style={{
                margin: 0,
                padding: "0.75rem 1rem",
                fontSize: "0.85rem",
                color: "var(--text-muted, var(--text))",
                opacity: 0.75,
                background: "rgba(255,255,255,0.015)",
                borderTop: "1px solid var(--border)",
              }}
            >
              Values scaled to each design&apos;s worst-case delay period
              (160 ps baseline, 116 ps optimized) rather than the raw 100 ps
              simulation window, so both designs are compared over one full
              clock cycle of their own.
            </p>
          </div>
        </ScrollReveal>

        {/* PDF link */}
        <ScrollReveal>
          <div
            style={{
              marginTop: "2rem",
              padding: "1.5rem",
              background: "var(--bg-elevated, rgba(255,255,255,0.02))",
              border: "1px solid var(--border)",
              borderRadius: "8px",
            }}
          >
            <p style={{ margin: "0 0 0.75rem 0", color: "var(--text-muted, var(--text))" }}>
              The full write-up covers the design-space exploration
              (sum options S1 through S4 and carry options C1 through C3),
              Elmore derivations with extracted capacitance and resistance
              values, all schematics, and the complete SPICE validation
              methodology.
            </p>
            <a
              href="/assets/ese3700_project1.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: "var(--blue)",
                textDecoration: "none",
                fontWeight: 500,
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              Read the full report (PDF, 25 pages) &rarr;
            </a>
          </div>
        </ScrollReveal>

        {/* =============================================== */}
        {/* PROJECT 2 - placeholder                          */}
        {/* =============================================== */}
        <ScrollReveal tag="h2" id="project-2-sram">
          Project 2: 16&times;4 SRAM
        </ScrollReveal>
        <ScrollReveal tag="p">
          A synchronous 16&times;4 SRAM (16 words of 4 bits) in the same
          22nm process, targeting at least 500 MHz operation on a single
          clock input. The design spans the full memory system: a 6T bit
          cell, non-overlapping clock generation, row and column decoders,
          sense amplifiers, column drivers, and a voltage midpoint
          reference. It is graded on a figure of merit that combines
          bitcell area, power, and delay squared, so every sub-block has
          to be sized for both correctness and score.
        </ScrollReveal>

        <ScrollReveal>
          <div
            className="callout"
            style={{
              background: "rgba(255,255,255,0.02)",
              borderColor: "var(--border)",
            }}
          >
            <p style={{ margin: 0, color: "var(--text-muted, var(--text))" }}>
              <em>Still in progress.</em> Writeup, schematics, and the
              final FOM number will be posted here once the simulation
              work wraps up.
            </p>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

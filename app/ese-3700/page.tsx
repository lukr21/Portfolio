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

        <ScrollReveal tag="h2" id="top-level">
          Top-Level Architecture
        </ScrollReveal>
        <ScrollReveal tag="p">
          The full memory fits on a single schematic. Address inputs
          A<sub>0</sub>&ndash;A<sub>3</sub> are latched and fed through a
          4-to-16 row decoder gated by &phi;<sub>2</sub>, driving sixteen
          word-lines into the 16&times;4 bitcell array. Four column drivers
          precharge BL/BLb during &phi;<sub>1</sub> and drive writes during
          &phi;<sub>2</sub>; four isolated latch-type sense amps are armed
          by SAE = delayed(&phi;<sub>2</sub>&middot;Wr) and resolve reads
          onto a per-column bus shared with the write path. A two-phase
          non-overlapping clock generator takes the single external Clk and
          produces the two phases that keep precharge and access strictly
          separated.
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/p2_toplevel.png"
              alt="Top-level schematic of the 16x4 SRAM: address latches, 4-to-16 decoder, 16x4 bitcell array, four column drivers, four sense amplifiers, two-phase clock generator, and per-column read/write blocks"
              loading="lazy"
            />
            <div className="media-block__caption">
              Top-level schematic. All control signals (PCHb, SAE, WrEn,
              the inverted Wr) come from the two-phase clock and the Wr
              fanout network along the bottom of the diagram.
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="p">
          Two design decisions drive the rest of the implementation. First,
          PCHb is wired directly to &phi;<sub>1</sub>, which forces
          precharge to finish before &phi;<sub>2</sub> can rise. The
          non-overlap gap is what guarantees the column drivers and
          word-lines never fight each other. Second, the sense amp is an
          isolated latch-type pair armed by a &phi;<sub>2</sub>-derived
          SAE, so it only fires once the bitline differential has developed
          past its offset. Every other block exists to feed these two.
        </ScrollReveal>

        {/* One full cycle */}
        <ScrollReveal tag="h2" id="one-cycle">
          One Full Clock Cycle
        </ScrollReveal>
        <ScrollReveal tag="p">
          The easiest way to see the whole design work at once is to
          overlay every relevant signal on one clock period. I ran
          characterization at 320 ps (3.125 GHz), which is a deliberately
          safe choice: about 7% above the ~298 ps absolute minimum found
          by binary search further down, so no waveform is sitting right
          on its own failure boundary.
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/p2_full_period.png"
              alt="One 320 ps clock cycle with phi1, phi2, PCHb, WL1, BL0/BLb0, SAE, and the sense-amp output Q/D0 overlaid, showing the four phases: precharge, non-overlap, access pre-SAE, and access post-SAE"
              loading="lazy"
            />
            <div className="media-block__caption">
              One 320 ps cycle, split into four phases. During precharge
              (roughly 0&ndash;150 ps), PCHb is low and BL/BLb are pulled
              back up to V<sub>DD</sub>. A short non-overlap gap separates
              precharge from access. When &phi;<sub>2</sub> rises, WL
              fires, the bitlines start to develop a differential, and a
              delayed SAE arms the sense amp only after that differential
              is past 50 mV. Q/D resolves cleanly well before the next
              precharge begins.
            </div>
          </div>
        </ScrollReveal>

        {/* Functional verification */}
        <ScrollReveal tag="h2" id="functional-verification">
          Functional Verification
        </ScrollReveal>
        <ScrollReveal tag="p">
          Correctness was validated bottom-up, from the bitcell up to the
          full array. The most interesting test is mainTest2: two different
          4-bit words written to two different addresses, then read back.
          This checks that the decoder routes the correct row and that
          storing one word does not disturb another.
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/p2_maintest2.png"
              alt="mainTest2 SPICE waveforms: 1001 written to address 0000, 0110 written to address 1111, then both read back across eight nanoseconds"
              loading="lazy"
            />
            <div className="media-block__caption">
              mainTest2: 1001 &rarr; address 0000, then 0110 &rarr; address
              1111, then read both back. Each read matches the written word
              exactly; no cross-talk between rows.
            </div>
          </div>
        </ScrollReveal>

        {/* Performance ceiling */}
        <ScrollReveal tag="h2" id="performance-ceiling">
          How Fast Can It Go?
        </ScrollReveal>
        <ScrollReveal tag="p">
          Minimum operating period was found with a binary search: shrink
          the clock period until reads stop matching the values that were
          written, then bracket the break point.
        </ScrollReveal>

        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <img
              src="/assets/img/p2_period_sweep.png"
              alt="Clock-period binary search: left panel plots read-back voltage vs clock period and shows it transitioning through VDD/2 near 295 ps; right panel shows pass/fail bars across frequencies"
              loading="lazy"
            />
            <div className="media-block__caption">
              Binary search for T<sub>min</sub>. The read-back voltage on a
              known-0 cycle sits cleanly at 0 V for long periods and snaps
              up to V<sub>DD</sub> for short ones; the transition crosses
              the V<sub>DD</sub>/2 decision threshold near 298 ps, setting
              f<sub>max</sub> &asymp; 3.36 GHz, well above the
              project&apos;s 500 MHz requirement. The 320 ps operating
              point used for the earlier waveforms and for the power
              measurement sits about 7% above this break point, so the
              reported numbers are not riding the edge of correctness.
            </div>
          </div>
        </ScrollReveal>

        {/* What limits the design, and the next optimization step */}
        <ScrollReveal>
          <div className="callout callout--orange">
            <h2 style={{ margin: "0 0 0.75rem 0", fontSize: "1.15rem" }}>
              Where the Limit Is, and How I&apos;d Push Past It
            </h2>
            <p>
              At T<sub>min</sub> the read path still finishes in roughly
              92 ps. The write path is what gives out first. Looking back
              at the one-cycle plot, roughly half of every period is spent
              pulling BL and BLb back up to V<sub>DD</sub> during
              precharge. That long &phi;<sub>1</sub> is what squeezes the
              access budget and pins T<sub>min</sub> where it is.
            </p>
            <p style={{ marginTop: "0.75rem" }}>
              The immediate next step would be to upsize the precharge
              PMOS pair in the column driver (currently W = 2). A wider
              device pulls the bitlines up faster, shortens
              &phi;<sub>1</sub>, and redistributes the freed-up time to
              the access phase. That translates into a direct drop in
              T<sub>min</sub> without touching any of the more sensitive
              blocks. I
              didn&apos;t have time to sweep the PMOS width and re-run the
              search, but it&apos;s the one lever I&apos;d pull first.
            </p>
          </div>
        </ScrollReveal>

        {/* Summary table */}
        <ScrollReveal tag="h2" id="summary">
          Summary of Metrics
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
              <tbody>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Process
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", fontVariantNumeric: "tabular-nums" }}>
                    22nm PTM HP
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Supply V<sub>DD</sub>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", fontVariantNumeric: "tabular-nums" }}>
                    0.8 V
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Array Size
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", fontVariantNumeric: "tabular-nums" }}>
                    16 &times; 4
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Minimum Clock Period T<sub>min</sub>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", fontVariantNumeric: "tabular-nums" }}>
                    298 ps
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Maximum Frequency f<sub>max</sub>
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", fontVariantNumeric: "tabular-nums" }}>
                    3.36 GHz
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Worst-case Access Delay
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", fontVariantNumeric: "tabular-nums" }}>
                    91.9 ps
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem", borderBottom: "1px solid var(--border)" }}>
                    Average Power
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", borderBottom: "1px solid var(--border)", fontVariantNumeric: "tabular-nums" }}>
                    54.74 &mu;W
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: "0.75rem 1rem" }}>
                    Bitcell Area (&Sigma; widths)
                  </td>
                  <td style={{ padding: "0.75rem 1rem", textAlign: "right", fontVariantNumeric: "tabular-nums" }}>
                    0.308 &mu;m
                  </td>
                </tr>
              </tbody>
            </table>
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
              This page is the highlight reel. The full report goes through
              every sub-block in detail: the 6T bitcell sizing, the
              two-phase clock circuit, the 4-to-16 decoder, the column
              driver, the isolated latch-type sense amp, the RdWr I/O
              block, the six timing invariants that guarantee correct
              operation, per-stage critical-path tables for both read and
              write, and the full figure-of-merit derivation.
            </p>
            <a
              href="/assets/ese3700_project2.pdf"
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
              Read the full report (PDF, 18 pages) &rarr;
            </a>
          </div>
        </ScrollReveal>

        {/* Future direction */}
        <ScrollReveal>
          <p
            id="whats-next"
            style={{ marginTop: "2.5rem" }}
          >
            <em>
              Both of these projects are finished for now, but it would be
              interesting to combine them: the 8-bit ripple-carry adder
              from Project 1 and the 16&times;4 SRAM from this project
              already cover the datapath and storage halves of a digital
              system, and wrapping them together with a small controller
              and a few logical operations would turn them into a simple
              ALU. A possible follow-on if I come back to this.
            </em>
          </p>
        </ScrollReveal>
      </section>
    </>
  );
}

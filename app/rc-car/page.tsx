import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import { pageMetadata } from "@/components/meta";

export const metadata = pageMetadata(
  "Wireless RC Cars",
  "ESE 3500 final project: two kit RC cars rebuilt around STM32 boards with a homemade wireless joystick controller, an nRF24L01+ radio link, and an infrared tag game.",
  "/rc-car",
  "/assets/img/rc_car_side.jpg"
);

const specNote = {
  fontSize: "0.8rem",
  color: "var(--text-secondary)",
  marginTop: "0.5rem",
} as const;

function Box({
  x,
  y,
  w,
  label,
}: {
  x: number;
  y: number;
  w: number;
  label: string;
}) {
  return (
    <g className="sysdiag__box">
      <rect x={x} y={y} width={w} height={40} rx={8} />
      <text x={x + w / 2} y={y + 25} textAnchor="middle">
        {label}
      </text>
    </g>
  );
}

function SystemDiagram() {
  return (
    <svg
      className="sysdiag"
      viewBox="0 0 820 330"
      role="img"
      aria-label="System diagram. Controller: two joysticks read by an STM32 over ADC, which sends packets over SPI to an nRF24L01+ radio. The radio link crosses to the car at 2.4 GHz. Car: nRF24L01+ to STM32 over SPI, STM32 sends PWM to an L298N H-bridge driving the drive and steering motors. A 9V battery feeds the H-bridge directly and the STM32 through a 5V regulator."
    >
      <defs>
        {(["sig", "pwr"] as const).map((k) => (
          <marker
            key={k}
            id={`ah-${k}`}
            viewBox="0 0 10 10"
            refX="9"
            refY="5"
            markerWidth="7"
            markerHeight="7"
            orient="auto-start-reverse"
          >
            <path d="M0,0 L10,5 L0,10 z" className={`sysdiag__head--${k}`} />
          </marker>
        ))}
      </defs>

      {/* Group frames */}
      <rect className="sysdiag__frame" x="10" y="10" width="300" height="310" rx="14" />
      <text className="sysdiag__group" x="28" y="38">Controller · USB powered</text>
      <rect className="sysdiag__frame" x="410" y="10" width="400" height="310" rx="14" />
      <text className="sysdiag__group" x="428" y="38">Car · 9V battery</text>

      {/* Controller */}
      <Box x={30} y={80} w={110} label="Joystick 1" />
      <Box x={30} y={160} w={110} label="Joystick 2" />
      <Box x={175} y={120} w={115} label="STM32" />
      <Box x={175} y={250} w={115} label="nRF24L01+" />
      <path className="sysdiag__edge--sig" d="M140,100 L175,132" markerEnd="url(#ah-sig)" />
      <path className="sysdiag__edge--sig" d="M140,180 L175,148" markerEnd="url(#ah-sig)" />
      <text className="sysdiag__lbl" x="146" y="88">ADC</text>
      <path className="sysdiag__edge--sig" d="M232,160 L232,250" markerEnd="url(#ah-sig)" />
      <text className="sysdiag__lbl" x="240" y="210">SPI</text>

      {/* Radio link */}
      <path className="sysdiag__edge--radio" d="M290,270 L430,270" markerEnd="url(#ah-sig)" />
      <text className="sysdiag__lbl sysdiag__lbl--mid" x="360" y="260">2.4 GHz</text>
      <text className="sysdiag__lbl sysdiag__lbl--mid" x="360" y="292">unencrypted</text>

      {/* Car */}
      <Box x={430} y={60} w={110} label="5V LDO" />
      <Box x={630} y={60} w={120} label="9V battery" />
      <Box x={430} y={150} w={110} label="STM32" />
      <Box x={610} y={150} w={170} label="H-bridge" />
      <Box x={430} y={250} w={110} label="nRF24L01+" />
      <Box x={588} y={250} w={100} label="Drive motor" />
      <Box x={700} y={250} w={100} label="Steer motor" />

      <path className="sysdiag__edge--pwr" d="M630,80 L540,80" markerEnd="url(#ah-pwr)" />
      <path className="sysdiag__edge--pwr" d="M485,100 L485,150" markerEnd="url(#ah-pwr)" />
      <text className="sysdiag__lbl" x="493" y="130">5V</text>
      <path className="sysdiag__edge--pwr" d="M690,100 L690,150" markerEnd="url(#ah-pwr)" />
      <text className="sysdiag__lbl" x="698" y="130">9V</text>
      <path className="sysdiag__edge--sig" d="M485,250 L485,190" markerEnd="url(#ah-sig)" />
      <text className="sysdiag__lbl" x="493" y="226">SPI</text>
      <path className="sysdiag__edge--sig" d="M540,170 L610,170" markerEnd="url(#ah-sig)" />
      <text className="sysdiag__lbl" x="556" y="162">PWM</text>
      <path className="sysdiag__edge--pwr" d="M650,190 L638,250" markerEnd="url(#ah-pwr)" />
      <path className="sysdiag__edge--pwr" d="M740,190 L750,250" markerEnd="url(#ah-pwr)" />
    </svg>
  );
}

export default function RcCarPage() {
  return (
    <>
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to Projects
        </Link>
        <p className="project-hero__tag">UPenn ESE 3500 &middot; Fall 2026</p>
        <h1 className="project-hero__title">Wireless RC Cars</h1>
        <p className="project-hero__subtitle">
          Our ESE 3500 final project. My team bought two cheap RC car kits,
          kept only the motors, and rebuilt both cars around STM32 boards with
          a wireless joystick controller we made ourselves. The plan was for
          one car to chase and catch the other using infrared.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Course</p>
            <p className="meta-item__value">ESE 3500 (Embedded Systems)</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">My Part</p>
            <p className="meta-item__value">Hardware: power, drive, wiring</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Stack</p>
            <p className="meta-item__value">STM32 &middot; nRF24L01+ &middot; H-bridge</p>
          </div>
        </div>
      </section>

      <section className="project-content">
        <ScrollReveal>
          <div className="content-row" id="the-idea">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/rc_car_side.jpg"
                  alt="One of the two RC cars with an STM32 Nucleo, H-bridge, breadboard, and an IR LED taped to the front"
                />
                <div className="media-block__caption">
                  One of the two cars. The IR LED for the tag game is taped to
                  the front.
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>The Idea</h2>
              <p>
                Each kit came with two DC motors: one drives the rear wheels,
                and the other turns a small gear against a rack to steer.
                Everything else we added ourselves, including the
                microcontroller, motor driver, radio, and controller.
              </p>
              <p>
                We built two cars for a game of tag. One car carries an IR LED
                and the other an IR receiver, and the game ends when the chaser
                picks up enough IR to count as a catch.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="h2" id="driving">
          Driving It
        </ScrollReveal>
        <ScrollReveal>
          <div className="media-row media-row--grid" style={{ alignItems: "start" }}>
            <div className="media-block">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/assets/img/rc_car_controller_poster.jpg"
              >
                <source src="/assets/vid/rc_car_controller.mp4" type="video/mp4" />
              </video>
              <div className="media-block__caption">
                Driving a car around the lab with the joystick controller.
              </div>
            </div>
            <div className="media-block">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/assets/img/rc_car_drive_poster.jpg"
                style={{ maxHeight: 520, width: "auto", maxWidth: "100%", display: "block" }}
              >
                <source src="/assets/vid/rc_car_drive.mp4" type="video/mp4" />
              </video>
              <div className="media-block__caption">
                Taking a car for a drive by the elevators.
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="h2" id="system">
          How It Works
        </ScrollReveal>
        <ScrollReveal>
          <div className="media-block media-block--full-width">
            <SystemDiagram />
            <div className="media-block__caption">
              Orange lines carry power, blue lines carry signals. One dual
              H-bridge drives both motors.
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <div className="content-row content-row--reverse">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/rc_controller_schematic.png"
                  alt="Controller schematic: STM32 Nucleo, two joysticks, nRF24L01+ radio, plus a planned LCD and button"
                />
                <div className="media-block__caption">
                  Controller schematic. The LCD and button were planned but
                  left out.
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <p>
                The controller is two potentiometer joysticks on a breadboard.
                An STM32 reads them with its ADC and sends the stick positions
                over an nRF24L01+ radio in the 2.4 GHz band. On the car, a
                second radio passes the packets to another STM32, which drives
                the H-bridge with PWM. A 5V regulator powers the logic from the
                9V battery.
              </p>
              <p>
                I focused on the hardware and my teammates led the firmware,
                which was extensive. We wrote drivers for every component,
                including our own packet format for the radio, and nothing was
                encrypted. Since the wiring and the firmware depended on each
                other, we tested and debugged the cars together.
              </p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal tag="h2" id="power-problem">
          Getting It to Move
        </ScrollReveal>
        <ScrollReveal>
          <p>
            For a while the cars wouldn&apos;t move at all, and power was my
            part of the project. Every board we added was weight the kit motors
            weren&apos;t designed to carry. Two AA cells didn&apos;t give the
            motors enough power to move the car. Adding more AAs raised the
            voltage, but the extra cells added enough weight that the car still
            stalled.
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div className="specs-grid">
            <div className="spec-card">
              <p className="spec-card__label">2&times; AA</p>
              <p className="spec-card__value spec-card__value--orange">~1.5 W &middot; stalled</p>
              <p style={specNote}>
                Each cell supplies about 0.5 A steadily at 1.5 V
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">4&times; AA</p>
              <p className="spec-card__value spec-card__value--orange">~3 W &middot; stalled</p>
              <p style={specNote}>
                More power, but four cells were too heavy for the motors
              </p>
            </div>
            <div className="spec-card">
              <p className="spec-card__label">One 9V</p>
              <p className="spec-card__value spec-card__value--green">~3.15 W &middot; moves</p>
              <p style={specNote}>
                About 350 mA for an hour from one light cell, then the voltage
                drops off
              </p>
            </div>
          </div>
        </ScrollReveal>
        <ScrollReveal>
          <p>
            AA cells hold more energy than a 9V battery, but they can&apos;t
            deliver it quickly. The car needed power more than runtime, so I
            chose 9V batteries and accepted that they would drain much faster.
            They were the only option that actually moved the car.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="content-row" id="ir-tag">
            <div className="content-row__media">
              <div className="media-block">
                <img
                  src="/assets/img/rc_car_top.jpg"
                  alt="Top view of the car showing the Nucleo board, H-bridge, breadboard, and an IR receiver hanging off long jumper wires"
                />
                <div className="media-block__caption">
                  Top view. The IR receiver hangs off the yellow, green, and
                  blue jumpers at the bottom.
                </div>
              </div>
            </div>
            <div className="content-row__text">
              <h2>The IR Tag Game</h2>
              <p>
                The catch never worked reliably. The receiver&apos;s reading
                wasn&apos;t linear with distance and changed from one try to
                the next, so a fixed threshold couldn&apos;t tell a catch from
                noise.
              </p>
              <p>
                At night it was inconsistent, which I think comes from the LED
                not emitting evenly in every direction. During the day it was
                unusable, because sunlight carries a lot of infrared.
              </p>
              <p>
                If we did it again, I&apos;d pulse the LED and compare readings
                with it on and off, so the constant background from the sun
                cancels out.
              </p>
              <p id="steering">
                Steering mostly works. The steering motor spins faster than the
                rack needs, so the gear grinds against the rack at the ends of
                its travel.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

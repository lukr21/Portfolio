import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";
import CompileAnimation from "@/components/CompileAnimation";
import ProjectCardTilt from "@/components/ProjectCardTilt";
import HeroCursorGlow from "@/components/HeroCursorGlow";
import CopyEmail from "@/components/CopyEmail";
import Timeline from "@/components/Timeline";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <CompileAnimation>
        <HeroCursorGlow>
          <div className="hero__bg" />
          <img
            src="/assets/img/portfolio-headshot.jpg"
            alt=""
            aria-hidden="true"
            className="hero__portrait"
          />
          <div className="hero__grid" />
          <div className="hero__content">
            <img
              src="/assets/img/portfolio-headshot.jpg"
              alt="Lucas Krippendorff"
              className="hero__avatar compile-el"
            />
            <h1 className="hero__name compile-el">
              <span className="compile-blur">Lucas</span>{" "}
              <span className="compile-blur">
                <span>Krippendorff</span>
              </span>
            </h1>
            <p className="hero__desc compile-el">
              Happy you&apos;re here! I&apos;m a second-year Electrical
              Engineering student at the University of Pennsylvania, working at
              the intersection of mechanical and electronic design: analog,
              digital, and everything in between. What I enjoy most is
              navigating the tradeoffs between functionality, complexity, and
              cost.
            </p>
            <div className="hero__cta compile-el">
              <a href="#projects" className="btn btn--primary">
                View Projects &darr;
              </a>
              <a
                href="/assets/Lucas_Krippendorff_Resume.pdf"
                className="btn btn--ghost"
                target="_blank"
              >
                Resume &uarr;
              </a>
            </div>
            <div
              className="contact-icons compile-el"
              style={{ marginTop: "1.25rem" }}
            >
              <a
                href="https://www.linkedin.com/in/lucas-krippendorff"
                target="_blank"
                title="LinkedIn"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://github.com/lukr21"
                target="_blank"
                title="GitHub"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/lukrii_"
                target="_blank"
                title="Instagram"
              >
                <svg viewBox="0 0 24 24">
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" />
                </svg>
              </a>
              <CopyEmail email="lk.krippendorff@gmail.com">
                <svg viewBox="0 0 24 24">
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
              </CopyEmail>
            </div>
          </div>
        </HeroCursorGlow>
      </CompileAnimation>

      {/* Experience Timeline */}
      <section id="experience" className="section" style={{ paddingTop: "2.5rem", paddingBottom: "2.5rem" }}>
        <ScrollReveal>
          <p className="section__label">Experience</p>
        </ScrollReveal>
        <ScrollReveal>
          <Timeline />
        </ScrollReveal>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="section">
        <ScrollReveal>
          <p className="section__label">Projects</p>
        </ScrollReveal>
        <ScrollReveal>
          <h2 className="section__title">{"What I've Built"}</h2>
        </ScrollReveal>
        <ScrollReveal>
          <p className="section__desc">
            From a 6-DOF robotic arm with custom gearboxes to a CNN image
            classifier. each project started with a question I wanted to answer.
          </p>
        </ScrollReveal>

        <div className="projects-grid">
          <ScrollReveal>
            <ProjectCardTilt className="project-card">
              <Link href="/ese-3700" style={{ display: "contents" }}>
                <div className="project-card__img-wrap">
                  <img
                    src="/assets/img/delay_comparison.png"
                    alt="22nm CMOS Adder SPICE comparison"
                    className="project-card__img"
                    loading="lazy"
                  />
                  <div className="project-card__overlay" />
                </div>
                <div className="project-card__body">
                  <p className="project-card__tag">
                    UPenn ESE 3700 &middot; Spring 2026
                  </p>
                  <h3 className="project-card__title">
                    22nm CMOS Datapath &amp; Memory
                  </h3>
                  <p className="project-card__excerpt">
                    Transistor-level 8-bit adder and 16&times;4 SRAM in a
                    22nm process. Design-space exploration, Elmore delay
                    modeling, and SPICE validation.
                  </p>
                </div>
                <span className="project-card__arrow">&rarr;</span>
              </Link>
            </ProjectCardTilt>
          </ScrollReveal>

          <ScrollReveal>
            <ProjectCardTilt className="project-card">
              <Link href="/robotic-arm" style={{ display: "contents" }}>
                <div className="project-card__img-wrap">
                  <img
                    src="/assets/img/arm_cad_render.jpg"
                    alt="6-DOF Robotic Arm CAD render"
                    className="project-card__img"
                    loading="lazy"
                  />
                  <div className="project-card__overlay" />
                </div>
                <div className="project-card__body">
                  <p className="project-card__tag">
                    Personal Project &middot; 2025
                  </p>
                  <h3 className="project-card__title">6-DOF Robotic Arm</h3>
                  <p className="project-card__excerpt">
                    Fully 3D-printed arm with custom cycloidal drives, inverse
                    kinematics, and a web-based control interface. Built with $10
                    in steel balls.
                  </p>
                </div>
                <span className="project-card__arrow">&rarr;</span>
              </Link>
            </ProjectCardTilt>
          </ScrollReveal>

          <ScrollReveal>
            <ProjectCardTilt className="project-card">
              <Link href="/cycloidal-drive" style={{ display: "contents" }}>
                <div className="project-card__img-wrap">
                  <img
                    src="/assets/img/cycloidal_v1_assembled.jpg"
                    alt="Cycloidal Drive V1"
                    className="project-card__img"
                    loading="lazy"
                  />
                  <div className="project-card__overlay" />
                </div>
                <div className="project-card__body">
                  <p className="project-card__tag">R&amp;D &middot; 2025</p>
                  <h3 className="project-card__title">Cycloidal Drive</h3>
                  <p className="project-card__excerpt">
                    Custom 3D-printed gear reduction with hand-assembled ball
                    bearings. Two iterations from 12:1 proof-of-concept to 26:1
                    production version.
                  </p>
                </div>
                <span className="project-card__arrow">&rarr;</span>
              </Link>
            </ProjectCardTilt>
          </ScrollReveal>

          <ScrollReveal>
            <ProjectCardTilt className="project-card">
              <Link href="/classifier" style={{ display: "contents" }}>
                <div className="project-card__img-wrap">
                  <img
                    src="/assets/img/classifier_2.18.31_PM.jpg"
                    alt="Cat/Dog Classifier"
                    className="project-card__img"
                    loading="lazy"
                  />
                  <div className="project-card__overlay" />
                </div>
                <div className="project-card__body">
                  <p className="project-card__tag">
                    UPenn ENGR 1050 &middot; 2024
                  </p>
                  <h3 className="project-card__title">
                    Cat/Dog CNN Classifier
                  </h3>
                  <p className="project-card__excerpt">
                    PyTorch convolutional neural network trained on 24k images.
                    Self-directed deep dive beyond course content, achieving
                    97.8% accuracy.
                  </p>
                </div>
                <span className="project-card__arrow">&rarr;</span>
              </Link>
            </ProjectCardTilt>
          </ScrollReveal>

          <ScrollReveal>
            <ProjectCardTilt className="project-card">
              <Link href="/frc-shooter" style={{ display: "contents" }}>
                <div className="project-card__img-wrap">
                  <img
                    src="/assets/img/frc_shooter_module.jpg"
                    alt="FRC Shooter Module"
                    className="project-card__img"
                    loading="lazy"
                  />
                  <div className="project-card__overlay" />
                </div>
                <div className="project-card__body">
                  <p className="project-card__tag">
                    FRC Team 5557 &middot; 2024
                  </p>
                  <h3 className="project-card__title">Ring Shooter Module</h3>
                  <p className="project-card__excerpt">
                    Dual-stage flywheel launcher for FIRST Robotics Competition.
                    Designed the mechanical arm, roller system, and articulation
                    joint.
                  </p>
                </div>
                <span className="project-card__arrow">&rarr;</span>
              </Link>
            </ProjectCardTilt>
          </ScrollReveal>

          <ScrollReveal>
            <ProjectCardTilt className="project-card">
              <Link href="/hazed" style={{ display: "contents" }}>
                <div className="project-card__img-wrap">
                  <img
                    src="/assets/img/hazed_photo.jpg"
                    alt="Hazed Music"
                    className="project-card__img"
                    loading="lazy"
                  />
                  <div className="project-card__overlay" />
                </div>
                <div className="project-card__body">
                  <p className="project-card__tag">
                    Music &middot; 2023&ndash;Present
                  </p>
                  <h3 className="project-card__title">Hazed (Spotify)</h3>
                  <p className="project-card__excerpt">
                    Solo music project. Electronic production, mixing, and
                    release. Self-taught, always exploring new genres and
                    techniques.
                  </p>
                </div>
                <span className="project-card__arrow">&rarr;</span>
              </Link>
            </ProjectCardTilt>
          </ScrollReveal>
        </div>
      </section>

      {/* About */}
      <section className="section" style={{ borderTop: "1px solid var(--border)" }}>
        <ScrollReveal>
          <div className="about-row">
            <div className="about-text">
              <p className="section__label">About</p>
              <h2 className="section__title">Background</h2>
              <p>
                {"I'm an Electrical Engineering student at the University of Pennsylvania's School of Engineering and Applied Science, though the path here was anything but direct."}
              </p>
              <p>
                {"Growing up, I was building computers whenever I could and doing mechanical design for my FRC robotics team, 5557 Bbr8ers. Two very different things, but I never saw them that way. When it came time for college, I chose Physics precisely because it didn't force me to pick. It sits underneath everything. Penn had other plans. Getting involved with clubs like PennAir pulled me back into hands-on mechanical work, and then my Electricity & Magnetism course reminded me why I'd always been drawn to electronics. By the end of my first year, I knew I wanted to study EE."}
              </p>
              <p>
                {"I don't think of that as settling. If anything, the decision made sense because I realized I didn't have to give anything up. I could anchor my studies in EE while spending my time on projects where electrical, mechanical, and software thinking all have to work together. That's what most of my work reflects."}
              </p>
            </div>
            <div className="about-links">
              <CopyEmail email="lk.krippendorff@gmail.com" className="about-link">
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: 16,
                    height: 16,
                    fill: "currentColor",
                    flexShrink: 0,
                  }}
                >
                  <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                  <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                </svg>
                &nbsp;lk.krippendorff@gmail.com
              </CopyEmail>
              <a
                href="https://www.linkedin.com/in/lucas-krippendorff"
                target="_blank"
                className="about-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: 16,
                    height: 16,
                    fill: "currentColor",
                    flexShrink: 0,
                  }}
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                &nbsp;LinkedIn
              </a>
              <a
                href="https://github.com/lukr21"
                target="_blank"
                className="about-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: 16,
                    height: 16,
                    fill: "currentColor",
                    flexShrink: 0,
                  }}
                >
                  <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
                </svg>
                &nbsp;GitHub
              </a>
              <a
                href="https://www.instagram.com/lukrii_"
                target="_blank"
                className="about-link"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{
                    width: 16,
                    height: 16,
                    fill: "currentColor",
                    flexShrink: 0,
                  }}
                >
                  <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" />
                </svg>
                &nbsp;Instagram
              </a>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

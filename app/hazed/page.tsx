import Link from "next/link";
import ScrollReveal from "@/components/ScrollReveal";

export default function HazedPage() {
  return (
    <>
      {/* Project Hero */}
      <section className="project-hero">
        <Link href="/" className="project-hero__back">
          &larr; Back to Projects
        </Link>
        <p className="project-hero__tag">Music &middot; 2023&ndash;Present</p>
        <h1 className="project-hero__title">Hazed</h1>
        <p className="project-hero__subtitle">
          My solo music project on Spotify. Production, mixing, and release, all
          self-taught and always evolving.
        </p>
        <div className="project-hero__meta">
          <div className="meta-item">
            <p className="meta-item__label">Role</p>
            <p className="meta-item__value">Producer / Artist</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">DAW</p>
            <p className="meta-item__value">Ableton Live</p>
          </div>
          <div className="meta-item">
            <p className="meta-item__label">Active Since</p>
            <p className="meta-item__value">2023</p>
          </div>
        </div>
      </section>

      {/* Project Content */}
      <section className="project-content">
        {/* About Hazed */}
        <ScrollReveal>
          <div className="content-row" id="about-hazed">
            <div className="content-row__text" style={{ gridColumn: "1 / -1" }}>
              <h2>About Hazed</h2>
              <p>
                I started playing piano as a kid, then transitioned into digital
                audio production around 2020. I began releasing music under Hazed
                in 2023. It&apos;s a hobby, but one I&apos;m always trying to get
                better at, exploring new genres and techniques within what I can
                do.
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Spotify Embed */}
        <ScrollReveal tag="h2" id="listen">
          Listen
        </ScrollReveal>
        <ScrollReveal>
          <div style={{ margin: "1.5rem 0 2.5rem" }}>
            <iframe
              style={{ borderRadius: 12 }}
              src="https://open.spotify.com/embed/artist/7y5gqh04B4usQmR2006PT4?utm_source=generator"
              width="100%"
              height={352}
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
        </ScrollReveal>

        {/* Process */}
        <ScrollReveal tag="h2" id="process">
          Process
        </ScrollReveal>
        <ScrollReveal tag="p">Everything is made in Ableton.</ScrollReveal>
      </section>
    </>
  );
}

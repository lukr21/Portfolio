"use client";

type TimelineItem = {
  logo: string;
  logoAlt: string;
  company: string;
  role: string;
  date: string;
  skills: string[];
  href: string;
};

const items: TimelineItem[] = [
  {
    logo: "/assets/img/first-logo.png",
    logoAlt: "FIRST Robotics Competition logo",
    company: "FRC Team 5557",
    role: "Mechanical Design",
    date: "Jul 2022 — Jun 2024",
    skills: ["CAD (Onshape)", "Machining", "Mechanical Design", "Team Collaboration"],
    href: "https://www.instagram.com/bbr8ers/",
  },
  {
    logo: "/assets/img/chimera_design_studio_logo.jpeg",
    logoAlt: "3D Chimera logo",
    company: "3D Chimera",
    role: "Engineering Intern",
    date: "Jun — Jul 2025",
    skills: ["3D Printing", "Prototyping", "Material Testing", "Printer Calibration"],
    href: "https://3dchimera.com/",
  },
  {
    logo: "/assets/img/subvysion-logo.png",
    logoAlt: "SubVysion logo",
    company: "SubVysion",
    role: "Hardware Intern",
    date: "Mar 2026 — Present",
    skills: ["Product Design", "Hardware Integration", "Computer Vision", "3D Mapping"],
    href: "https://subvysion.com/",
  },
];

export default function Timeline() {
  return (
    <div className="timeline">
      <div className="timeline__scroll">
        <div className="timeline__track">
          <div className="timeline__line" aria-hidden="true" />
          {items.map((item, i) => (
            <a
              key={item.company}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="timeline__item"
              style={{ ["--i" as string]: i }}
            >
              <div className="timeline__node" aria-hidden="true">
                <span className="timeline__node-dot" />
              </div>
              <div className="timeline__card">
                <div className="timeline__card-head">
                  <div className="timeline__logo-wrap">
                    <img
                      src={item.logo}
                      alt={item.logoAlt}
                      className="timeline__logo"
                      loading="lazy"
                    />
                  </div>
                  <div className="timeline__card-head-text">
                    <h3 className="timeline__company">{item.company}</h3>
                    <p className="timeline__role">{item.role}</p>
                  </div>
                </div>
                <p className="timeline__date">{item.date}</p>
                <ul className="timeline__skills">
                  {item.skills.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                <span className="timeline__arrow">&rarr;</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

import { experienceItems } from "@/components/experienceData";

// Compact, scannable experience list (most-recent first).
// Used in the hero's right column on desktop and after Projects on mobile.
export default function ExperienceList() {
  return (
    <ul className="hero__exp">
      {[...experienceItems].reverse().map((item) => (
        <li key={item.company}>
          <a
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="hero__exp-item"
          >
            <img
              src={item.logo}
              alt={item.logoAlt}
              className="hero__exp-logo"
              loading="lazy"
            />
            <div className="hero__exp-body">
              <p className="hero__exp-role">{item.role}</p>
              <p className="hero__exp-company">{item.company}</p>
              <p className="hero__exp-date">{item.date}</p>
              <div className="hero__exp-tags">
                {item.skills.slice(0, 3).map((s) => (
                  <span key={s} className="hero__exp-tag">
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </a>
        </li>
      ))}
    </ul>
  );
}

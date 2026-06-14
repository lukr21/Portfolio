"use client";

import { experienceItems as items } from "@/components/experienceData";

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

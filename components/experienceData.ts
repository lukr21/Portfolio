export type ExperienceItem = {
  logo: string;
  logoAlt: string;
  company: string;
  role: string;
  date: string;
  skills: string[];
  href: string;
};

// Chronological order (oldest first) — the Timeline renders left-to-right,
// the hero list reverses this for most-recent-first.
export const experienceItems: ExperienceItem[] = [
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
    role: "Hardware Engineer Intern",
    date: "Mar 2026 — Present",
    skills: ["Electrical Design", "Mechanical CAD", "Sensor Integration", "Power Distribution"],
    href: "https://subvysion.com/",
  },
];

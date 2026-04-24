"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import CopyEmail from "@/components/CopyEmail";

interface Section {
  label: string;
  id: string;
}

interface FolderItem {
  label: string;
  path: string;
  sections: Section[];
}

const folders: FolderItem[] = [
  {
    label: "22nm CMOS Design",
    path: "/ese-3700",
    sections: [
      { label: "Overview", id: "" },
      { label: "Project 1: Adder", id: "project-1-adder" },
      { label: "SPICE Results", id: "spice-results" },
      { label: "Leakage Tradeoff", id: "leakage-tradeoff" },
      { label: "Project 2: SRAM", id: "project-2-sram" },
      { label: "Top-Level Architecture", id: "top-level" },
      { label: "One Full Clock Cycle", id: "one-cycle" },
      { label: "Functional Verification", id: "functional-verification" },
      { label: "How Fast Can It Go?", id: "performance-ceiling" },
      { label: "Summary of Metrics", id: "summary" },
      { label: "What\u2019s Next", id: "whats-next" },
    ],
  },
  {
    label: "Robotic Arm",
    path: "/robotic-arm",
    sections: [
      { label: "Overview", id: "" },
      { label: "The Challenge", id: "the-challenge" },
      { label: "Mechanical Design", id: "mechanical-design" },
      { label: "Software Stack", id: "software-stack" },
      { label: "What I Learned", id: "what-i-learned" },
    ],
  },
  {
    label: "Cycloidal Drive",
    path: "/cycloidal-drive",
    sections: [
      { label: "Overview", id: "" },
      { label: "Why Cycloidal?", id: "why-cycloidal" },
      { label: "V1 \u2013 Proof of Concept", id: "v1-proof-of-concept" },
      { label: "V2 \u2013 For the Arm", id: "v2-for-the-arm" },
      { label: "Cost Breakdown", id: "cost-breakdown" },
    ],
  },
  {
    label: "Cat/Dog Classifier",
    path: "/classifier",
    sections: [
      { label: "Overview", id: "" },
      { label: "Why This Project?", id: "why-this-project" },
      { label: "Architecture", id: "architecture" },
      { label: "Training Results", id: "training-results" },
      { label: "Real-World Testing", id: "real-world-testing" },
    ],
  },
  {
    label: "FRC Shooter",
    path: "/frc-shooter",
    sections: [
      { label: "Overview", id: "" },
      { label: "Game Context", id: "game-context" },
      { label: "What I Built", id: "what-i-built" },
      { label: "Design Highlights", id: "design-highlights" },
      { label: "My Role", id: "my-role" },
    ],
  },
  {
    label: "Hazed (Music)",
    path: "/hazed",
    sections: [
      { label: "Overview", id: "" },
      { label: "About Hazed", id: "about-hazed" },
      { label: "Listen", id: "listen" },
      { label: "Process", id: "process" },
    ],
  },
];

/* ── Shared folder tree ── */
function FolderTree({
  pathname,
  openFolder,
  toggleFolder,
  handleFolderClick,
  handleOverviewClick,
  activeSection,
  onLinkClick,
  isMobile,
}: {
  pathname: string;
  openFolder: string | null;
  toggleFolder: (p: string) => void;
  handleFolderClick: (
    e: React.MouseEvent,
    f: FolderItem,
    active: boolean,
  ) => void;
  handleOverviewClick: (e: React.MouseEvent, folderPath: string) => void;
  activeSection: string;
  onLinkClick?: () => void;
  isMobile?: boolean;
}) {
  return (
    <ul className="file-tree">
      <li className="file-tree__item">
        <Link
          href="/"
          className={`file-tree__link${pathname === "/" ? " file-tree__link--active" : ""}`}
          onClick={onLinkClick}
        >
          Home
        </Link>
      </li>

      {folders.map((folder) => {
        const isOpen = openFolder === folder.path;
        const isActive = pathname.startsWith(folder.path);

        return (
          <li
            key={folder.path}
            className={`file-tree__item${isOpen ? " open" : ""}`}
          >
            {isMobile ? (
              <div
                className={`file-tree__folder${isActive ? " file-tree__folder--active" : ""}`}
                onClick={() => toggleFolder(folder.path)}
                role="button"
                aria-expanded={isOpen}
                aria-label={`Toggle ${folder.label}`}
              >
                <span className="file-tree__chevron">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="4,2 8,6 4,10" />
                  </svg>
                </span>
                <span className="file-tree__folder-label">
                  {folder.label}
                </span>
              </div>
            ) : (
              <div className="file-tree__folder">
                <button
                  className="file-tree__chevron"
                  onClick={() => toggleFolder(folder.path)}
                  aria-expanded={isOpen}
                  aria-label={`Toggle ${folder.label}`}
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="4,2 8,6 4,10" />
                  </svg>
                </button>
                <Link
                  href={folder.path}
                  className={`file-tree__link${isActive ? " file-tree__link--active" : ""}`}
                  onClick={(e) => handleFolderClick(e, folder, isActive)}
                >
                  {folder.label}
                </Link>
              </div>
            )}

            <div className="file-tree__sections-wrap">
              <ul className="file-tree__sections">
                {folder.sections.map((section) => {
                  const isOverview = section.id === "";
                  const isOnFolderPage = pathname === folder.path;
                  const isActiveSection =
                    isOnFolderPage &&
                    ((isOverview && activeSection === "") ||
                      (!isOverview && activeSection === section.id));
                  const linkClass = `file-tree__section-link${isActiveSection ? " active" : ""}`;

                  if (isOverview) {
                    return (
                      <li key="overview">
                        <Link
                          href={folder.path}
                          className={linkClass}
                          onClick={(e) => {
                            handleOverviewClick(e, folder.path);
                            onLinkClick?.();
                          }}
                        >
                          {section.label}
                        </Link>
                      </li>
                    );
                  }

                  return (
                    <li key={section.id}>
                      {isMobile ? (
                        <Link
                          href={`${folder.path}#${section.id}`}
                          className={linkClass}
                          onClick={onLinkClick}
                        >
                          {section.label}
                        </Link>
                      ) : (
                        <a
                          href={`#${section.id}`}
                          className={linkClass}
                          onClick={onLinkClick}
                        >
                          {section.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ── Shared social footer ── */
function SocialFooter() {
  return (
    <div className="side-nav__footer">
      <a
        href="https://www.linkedin.com/in/lucas-krippendorff"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="LinkedIn"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      </a>
      <a
        href="https://github.com/lukr21"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="GitHub"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
        </svg>
      </a>
      <a
        href="https://www.instagram.com/lukrii_"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 100 12.324 6.162 6.162 0 100-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 11-2.88 0 1.441 1.441 0 012.88 0z" />
        </svg>
      </a>
      <CopyEmail email="lk.krippendorff@gmail.com">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
        </svg>
      </CopyEmail>
    </div>
  );
}

/* ── Main component ── */
export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [openFolder, setOpenFolder] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const match = folders.find((f) => pathname.startsWith(f.path));
    setOpenFolder(match ? match.path : null);
  }, [pathname]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Track which section is currently in view on the current project page
  useEffect(() => {
    const folder = folders.find((f) => pathname === f.path);
    if (!folder) {
      setActiveSection("");
      return;
    }

    const sectionIds = folder.sections.map((s) => s.id).filter(Boolean);
    // Resolve elements — retry on next frame in case content hasn't mounted yet
    let elements: HTMLElement[] = [];
    let rafId = 0;

    const resolveElements = () => {
      elements = sectionIds
        .map((id) => document.getElementById(id))
        .filter((el): el is HTMLElement => el !== null);
      if (elements.length === 0) {
        rafId = requestAnimationFrame(resolveElements);
        return;
      }
      attachObserver();
    };

    let observer: IntersectionObserver | null = null;
    const visibleIds = new Set<string>();

    const updateActive = () => {
      if (window.scrollY < 100) {
        // Near top of page — consider this "Overview"
        setActiveSection("");
        return;
      }
      if (visibleIds.size === 0) return;
      // Pick the topmost visible section
      let topEl: HTMLElement | null = null;
      let topRect = Infinity;
      elements.forEach((el) => {
        if (!visibleIds.has(el.id)) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < topRect) {
          topRect = rect.top;
          topEl = el;
        }
      });
      if (topEl) setActiveSection((topEl as HTMLElement).id);
    };

    const attachObserver = () => {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) visibleIds.add(entry.target.id);
            else visibleIds.delete(entry.target.id);
          });
          updateActive();
        },
        {
          // Activate a section when its top enters the upper ~40% of the viewport
          rootMargin: "-10% 0px -55% 0px",
          threshold: 0,
        },
      );
      elements.forEach((el) => observer!.observe(el));
      // Run once to initialize based on scroll position
      updateActive();
    };

    const onScroll = () => {
      if (window.scrollY < 100) setActiveSection("");
    };

    resolveElements();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(rafId);
      observer?.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [pathname]);

  const toggleFolder = useCallback((path: string) => {
    setOpenFolder((prev) => (prev === path ? null : path));
  }, []);

  const handleFolderClick = useCallback(
    (e: React.MouseEvent, folder: FolderItem, isActive: boolean) => {
      if (isActive) {
        e.preventDefault();
        setOpenFolder(null);
        router.push("/");
      } else {
        setOpenFolder(folder.path);
      }
    },
    [router],
  );

  const handleOverviewClick = useCallback(
    (e: React.MouseEvent, folderPath: string) => {
      if (pathname === folderPath) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
        setActiveSection("");
      }
      // Otherwise let the Link navigate normally
    },
    [pathname],
  );

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      {/* ── Desktop sidebar (hidden below 1024px) ── */}
      <nav className="side-nav">
        <div className="side-nav__header">
          <Link href="/" className="side-nav__logo">
            <img
              src="/assets/img/lk-black-bone-r90-180.png"
              alt=""
              aria-hidden="true"
              className="side-nav__logo-mark"
            />
            <span className="side-nav__logo-divider" aria-hidden="true" />
            <span>Lucas Krippendorff</span>
          </Link>
          <span className="side-nav__subtitle">
            Electrical Engineering @ UPenn
          </span>
        </div>

        <FolderTree
          pathname={pathname}
          openFolder={openFolder}
          toggleFolder={toggleFolder}
          handleFolderClick={handleFolderClick}
          handleOverviewClick={handleOverviewClick}
          activeSection={activeSection}
        />

        <SocialFooter />
      </nav>

      {/* ── Mobile top bar + dropdown (visible below 1024px) ── */}
      <header className={`mobile-bar${mobileOpen ? " mobile-bar--open" : ""}`}>
        <Link href="/" className="mobile-bar__logo" onClick={closeMobile}>
          <img
            src="/assets/img/lk-black-bone-r90-180.png"
            alt="Lucas Krippendorff"
            className="mobile-bar__logo-mark"
          />
        </Link>
        <button
          className="mobile-bar__toggle"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-label="Toggle navigation"
          aria-expanded={mobileOpen}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`mobile-bar__icon${mobileOpen ? " mobile-bar__icon--open" : ""}`}
          >
            <line className="mobile-bar__line mobile-bar__line--1" x1="3" y1="5" x2="17" y2="5" />
            <line className="mobile-bar__line mobile-bar__line--2" x1="3" y1="10" x2="17" y2="10" />
            <line className="mobile-bar__line mobile-bar__line--3" x1="3" y1="15" x2="17" y2="15" />
          </svg>
        </button>
      </header>

      {/* Dropdown panel */}
      <div className={`mobile-dropdown${mobileOpen ? " mobile-dropdown--open" : ""}`}>
        <div className="mobile-dropdown__inner">
          <FolderTree
            pathname={pathname}
            openFolder={openFolder}
            toggleFolder={toggleFolder}
            handleFolderClick={handleFolderClick}
            handleOverviewClick={handleOverviewClick}
            activeSection={activeSection}
            onLinkClick={closeMobile}
            isMobile
          />
          <SocialFooter />
        </div>
      </div>

      {/* Backdrop */}
      {mobileOpen && (
        <div className="mobile-backdrop" onClick={closeMobile} />
      )}
    </>
  );
}

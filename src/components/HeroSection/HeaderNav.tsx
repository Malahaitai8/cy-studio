import { useEffect, useState } from "react";
import "./HeaderNav.css";

const NAV_ITEMS = [
  { href: "#projects", label: "THINGS I MADE" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#contact", label: "CONTACT" },
];

export default function HeaderNav() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const sectionIds = NAV_ITEMS.map((item) => item.href.slice(1));
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the first visible section (closest to top)
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible.length > 0) {
          setActive(`#${visible[0].target.id}`);
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className="header-nav">
      {/* Logo */}
      <a href="#" className="nav-logo">
        CAO YING&nbsp;&nbsp;曹莹
      </a>

      {/* Center nav links */}
      <div className="nav-links">
        {NAV_ITEMS.map((item, i) => (
          <span key={item.href}>
            {i > 0 && <span className="nav-sep">·</span>}
            <a
              href={item.href}
              className={active === item.href ? "active" : ""}
              onClick={(e) => handleNavClick(e, item.href)}
            >
              {item.label}
            </a>
          </span>
        ))}
      </div>

      {/* SAY HI button */}
      <a href="#contact" className="nav-say-hi" onClick={(e) => handleNavClick(e, "#contact")}>
        SAY HI&nbsp;↗
      </a>
    </nav>
  );
}

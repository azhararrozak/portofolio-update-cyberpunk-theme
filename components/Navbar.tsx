"use client";

import { useState, useEffect } from "react";

const navLinks = [
  { label: "Home", href: "#" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#projects" },
  { label: "Reviews", href: "#comments" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [active, setActive] = useState("Home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, link: typeof navLinks[0]) => {
    setActive(link.label);
    if (link.href.startsWith("#") && link.href.length > 1) {
      e.preventDefault();
      document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      className={`sticky top-0 z-50 bg-paper/85 backdrop-blur-[14px] border-b transition-shadow duration-300 ${
        scrolled ? "border-ink/10 shadow-sm" : "border-ink/10"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-10 flex items-center justify-between h-[76px]">
        {/* Brand */}
        <a href="#" className="flex items-center gap-3">
          <div className="w-10 h-10 grid place-items-center bg-red text-white rounded-[2px] font-[Orbitron] font-extrabold text-base tracking-tight">
            P/
          </div>
          <div className="flex flex-col gap-0.5">
            <span className="font-[Orbitron] font-extrabold text-lg tracking-[0.04em]">
              PORTO<span className="text-red">/</span>FLUX
            </span>
            <span className="font-mono text-[10px] text-muted tracking-[0.18em]">
              MY PERSONAL WEB · 2026
            </span>
          </div>
        </a>

        {/* Nav Links */}
        <nav className="hidden md:flex gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleClick(e, link)}
              className={`relative text-sm font-medium py-1.5 transition-colors duration-200 hover:text-red ${
                active === link.label
                  ? "text-red after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-0.5 after:h-0.5 after:bg-red"
                  : "text-charcoal"
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <button className="inline-flex gap-2 items-center px-5 py-[11px] bg-ink border-0 rounded-[2px] font-semibold tracking-[0.04em] transition-colors duration-200 hover:bg-red" style={{ fontSize: "13px", color: "#fff" }}>
          Hire Me <span>→</span>
        </button>
      </div>
    </header>
  );
}

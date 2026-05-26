"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/portfolio", label: "Portfolio" },
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";
  const darkTop = isHome && !scrolled && !open;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => setOpen(false), [pathname]);

  const isGlass = scrolled || open || !darkTop;
  const linkColor = darkTop ? "rgba(255,255,255,0.70)" : "var(--muted)";
  const linkActiveColor = darkTop ? "#ffffff" : "var(--brand)";
  const hamColor = darkTop ? "#ffffff" : "var(--text)";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300${isGlass ? " glass-nav" : ""}`}
      style={{ background: isGlass ? undefined : "transparent" }}
    >
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* ── Logo ── */}
        <Link href="/" className="flex items-center mt-3 transition-opacity hover:opacity-80">
          <Image
            src={darkTop ? "/submark-white.png" : "/submark.png"}
            alt="Captured Aerial"
            width={270}
            height={170}
            priority
            className="h-20 w-auto"
          />
        </Link>

        {/* ── Desktop nav ── */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm font-semibold tracking-wide transition-colors"
              style={{ color: pathname === l.href ? linkActiveColor : linkColor }}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/contact"
            className="btn btn-green"
            style={{ padding: "0.5rem 1.25rem", fontSize: "0.72rem" }}
          >
            Book Now
          </Link>
        </nav>

        {/* ── Mobile hamburger ── */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px transition-all duration-200 ${open ? "rotate-45 translate-y-2" : ""}`} style={{ background: hamColor }} />
          <span className={`block w-5 h-px transition-all duration-200 ${open ? "opacity-0" : ""}`} style={{ background: hamColor }} />
          <span className={`block w-5 h-px transition-all duration-200 ${open ? "-rotate-45 -translate-y-2" : ""}`} style={{ background: hamColor }} />
        </button>
      </div>

      {/* ── Mobile menu ── */}
      {open && (
        <div
          className="md:hidden flex flex-col gap-5 px-6 pb-8 pt-4"
          style={{
            background: "rgba(247,251,247,0.96)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            borderTop: "1px solid rgba(45,97,25,0.08)",
          }}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-base font-bold tracking-wide"
              style={{ color: "var(--text)" }}
            >
              {l.label}
            </Link>
          ))}
          <Link href="/contact" className="btn btn-green w-fit mt-1">
            Book Now
          </Link>
        </div>
      )}
    </header>
  );
}

"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

// Per-page drone position + slight rotation
const PAGE_POSITIONS: Record<string, { bottom?: string; top?: string; left?: string; right?: string; rotate: number }> = {
  "/":          { bottom: "8%",  right: "5%",  rotate: -12 },
  "/portfolio": { top: "18%",   right: "4%",  rotate: 8   },
  "/services":  { bottom: "12%", left: "4%",   rotate: 15  },
  "/contact":   { top: "22%",   left: "5%",   rotate: -8  },
  "/about":     { bottom: "20%", right: "8%",  rotate: 5   },
};

function positionStyle(pos: (typeof PAGE_POSITIONS)[string]) {
  return {
    bottom: pos.bottom,
    top: pos.top,
    left: pos.left,
    right: pos.right,
  };
}

export default function FloatingDrone() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [currentPos, setCurrentPos] = useState(PAGE_POSITIONS["/"]);
  const [opacity, setOpacity] = useState(0);

  useEffect(() => {
    setMounted(true);
    // Fade in after mount
    const t = setTimeout(() => setOpacity(1), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const pos = PAGE_POSITIONS[pathname] ?? PAGE_POSITIONS["/"];
    // Brief fade-out, move, fade-in
    setOpacity(0);
    const t = setTimeout(() => {
      setCurrentPos(pos);
      setOpacity(0.28);
    }, 350);
    return () => clearTimeout(t);
  }, [pathname]);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed z-30 pointer-events-none select-none"
      style={{
        ...positionStyle(currentPos),
        opacity,
        transform: `rotate(${currentPos.rotate}deg)`,
        transition: "opacity 0.35s ease, top 1.4s cubic-bezier(0.4,0,0.2,1), bottom 1.4s cubic-bezier(0.4,0,0.2,1), left 1.4s cubic-bezier(0.4,0,0.2,1), right 1.4s cubic-bezier(0.4,0,0.2,1), transform 1.4s cubic-bezier(0.4,0,0.2,1)",
        width: 160,
        height: 160,
      }}
    >
      {/* Separate element for float animation so it doesn't fight the rotation */}
      <div className="drone-float w-full h-full">
        <DJIMini3SVG />
      </div>
    </div>
  );
}

function DJIMini3SVG() {
  return (
    <svg
      viewBox="0 0 200 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ width: "100%", height: "100%" }}
    >
      {/* Arms */}
      <line x1="100" y1="100" x2="38"  y2="38"  stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="100" x2="162" y2="38"  stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="100" x2="38"  y2="162" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
      <line x1="100" y1="100" x2="162" y2="162" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />

      {/* Motor housings */}
      <circle cx="38"  cy="38"  r="8" fill="currentColor" />
      <circle cx="162" cy="38"  r="8" fill="currentColor" />
      <circle cx="38"  cy="162" r="8" fill="currentColor" />
      <circle cx="162" cy="162" r="8" fill="currentColor" />

      {/* Propellers — top-left */}
      <ellipse cx="38" cy="38" rx="22" ry="5" fill="currentColor" opacity="0.55" transform="rotate(-40 38 38)" />
      <ellipse cx="38" cy="38" rx="22" ry="5" fill="currentColor" opacity="0.55" transform="rotate(50 38 38)" />

      {/* Propellers — top-right */}
      <ellipse cx="162" cy="38" rx="22" ry="5" fill="currentColor" opacity="0.55" transform="rotate(40 162 38)" />
      <ellipse cx="162" cy="38" rx="22" ry="5" fill="currentColor" opacity="0.55" transform="rotate(-50 162 38)" />

      {/* Propellers — bottom-left */}
      <ellipse cx="38" cy="162" rx="22" ry="5" fill="currentColor" opacity="0.55" transform="rotate(40 38 162)" />
      <ellipse cx="38" cy="162" rx="22" ry="5" fill="currentColor" opacity="0.55" transform="rotate(-50 38 162)" />

      {/* Propellers — bottom-right */}
      <ellipse cx="162" cy="162" rx="22" ry="5" fill="currentColor" opacity="0.55" transform="rotate(-40 162 162)" />
      <ellipse cx="162" cy="162" rx="22" ry="5" fill="currentColor" opacity="0.55" transform="rotate(50 162 162)" />

      {/* Body — rounded rectangle */}
      <rect x="78" y="84" width="44" height="32" rx="6" fill="currentColor" />

      {/* Camera dome */}
      <circle cx="100" cy="110" r="7" fill="currentColor" opacity="0.7" />

      {/* Body detail lines */}
      <line x1="82" y1="96" x2="118" y2="96" stroke="white" strokeWidth="1.5" strokeOpacity="0.3" />
    </svg>
  );
}

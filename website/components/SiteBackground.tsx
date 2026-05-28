// Pure CSS animations — no framer-motion, runs entirely on GPU compositor
const PATHS = Array.from({ length: 16 }, (_, i) => ({
  id: i,
  d: `M-${380 - i * 10} -${189 + i * 12}C-${380 - i * 10} -${189 + i * 12} -${312 - i * 10} ${216 - i * 12} ${152 - i * 10} ${343 - i * 12}C${616 - i * 10} ${470 - i * 12} ${684 - i * 10} ${875 - i * 12} ${684 - i * 10} ${875 - i * 12}`,
  width: 0.4 + i * 0.05,
  opacity: 0.04 + i * 0.018,
  duration: 20 + (i % 5) * 2,
  delay: -(i * 1.4),
}));

function FloatingPaths({ flip }: { flip?: boolean }) {
  return (
    <svg
      className="absolute inset-0 w-full h-full"
      viewBox="0 0 696 316"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      style={flip ? { transform: "scaleX(-1)" } : undefined}
      aria-hidden="true"
    >
      {PATHS.map((p) => (
        <path
          key={p.id}
          d={p.d}
          stroke="currentColor"
          strokeWidth={p.width}
          strokeOpacity={p.opacity}
          strokeLinecap="round"
          style={{
            strokeDasharray: "1 3",
            strokeDashoffset: 0,
            animation: `pathMove ${p.duration}s ${p.delay}s linear infinite`,
          }}
        />
      ))}
    </svg>
  );
}

export function SiteBackground() {
  return (
    <>
      <style>{`
        @keyframes pathMove {
          from { stroke-dashoffset: 0; }
          to   { stroke-dashoffset: -200; }
        }
        @media (prefers-reduced-motion: reduce) {
          @keyframes pathMove { from, to { stroke-dashoffset: 0; } }
        }
      `}</style>
      <div
        aria-hidden="true"
        className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
        style={{ zIndex: 0, color: "var(--brand)" }}
      >
        <FloatingPaths />
        <FloatingPaths flip />
      </div>
    </>
  );
}

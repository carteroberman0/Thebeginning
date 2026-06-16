/* Consistent 24×24 stroke icons (no icon dependency, no emoji). */
type P = { className?: string };
const S = ({ className = "", d }: P & { d: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden
  >
    {d.split("|").map((p, i) => (
      <path key={i} d={p} />
    ))}
  </svg>
);

export const HouseMark = ({ className }: P) => (
  <S className={className} d="M3 11.5 12 4l9 7.5|M5 10.5V20h14v-9.5" />
);
export const ArrowUpRight = ({ className }: P) => (
  <S className={className} d="M7 17 17 7|M9 7h8v8" />
);
export const ArrowRight = ({ className }: P) => (
  <S className={className} d="M5 12h14|M13 6l6 6-6 6" />
);
export const Bolt = ({ className }: P) => (
  <S className={className} d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
);
export const Layers = ({ className }: P) => (
  <S className={className} d="m12 3 9 5-9 5-9-5 9-5Z|m3 13 9 5 9-5" />
);
export const DocCheck = ({ className }: P) => (
  <S className={className} d="M7 3h7l5 5v13H7V3Z|m9.5 13 2 2 3.5-4" />
);
export const MapPin = ({ className }: P) => (
  <S className={className} d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z|M12 12.4a2.4 2.4 0 1 0 0-4.8 2.4 2.4 0 0 0 0 4.8Z" />
);
export const Upload = ({ className }: P) => (
  <S className={className} d="M4 15v4h16v-4|M12 16V4|M7 9l5-5 5 5" />
);
export const Wand = ({ className }: P) => (
  <S className={className} d="m5 19 9-9|M13 5l1.5 1.5|M18 9l1 1|M16 4l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7.7-2Z" />
);
export const Sliders = ({ className }: P) => (
  <S className={className} d="M4 8h10|M18 8h2|M4 16h4|M12 16h8|M14 6v4|M8 14v4" />
);
export const Handshake = ({ className }: P) => (
  <S className={className} d="m11 17 2 2 4-4|M3 11l4-4 5 4 3-2 6 5-4 4-3-3" />
);
export const Check = ({ className }: P) => <S className={className} d="m5 12 4 4 10-11" />;
export const Star = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="m12 2 2.9 6.3 6.8.7-5.1 4.6 1.5 6.7L12 17.8 5.9 20.3l1.5-6.7L2.3 9l6.8-.7L12 2Z" />
  </svg>
);
export const Quote = ({ className }: P) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
    <path d="M9 7H5a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2H4v2h1a4 4 0 0 0 4-4V7Zm11 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h2v2a2 2 0 0 1-2 2h-1v2h1a4 4 0 0 0 4-4V7Z" />
  </svg>
);
export const Window = ({ className }: P) => (
  <S className={className} d="M4 4h16v16H4V4Z|M12 4v16|M4 12h16" />
);
export const Hammer = ({ className }: P) => (
  <S className={className} d="m14 7 4 4|M11 10 4 17l3 3 7-7|M13 5l6 6 2-2-6-6-2 2Z" />
);
export const Roof = ({ className }: P) => (
  <S className={className} d="M2 12 12 4l10 8|M6 10v9h12v-9" />
);
export const Tree = ({ className }: P) => (
  <S className={className} d="M12 2 5 11h4l-3 5h12l-3-5h4L12 2Z|M12 16v6" />
);
export const Brush = ({ className }: P) => (
  <S className={className} d="M15 4 20 9l-8 8H7v-5l8-8Z|M5 17c0 2-1 3-3 3 .5-2 1-3 3-3Z" />
);
export const Sun = ({ className }: P) => (
  <S className={className} d="M12 6.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11Z|M12 1v2|M12 21v2|M4 4l1.5 1.5|M18.5 18.5 20 20|M1 12h2|M21 12h2|M4 20l1.5-1.5|M18.5 5.5 20 4" />
);
export const Shield = ({ className }: P) => (
  <S className={className} d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3Z|m9 12 2 2 4-4" />
);
export const Clock = ({ className }: P) => (
  <S className={className} d="M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Z|M12 7v5l3 2" />
);

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import { ArrowRight, Star } from "@/components/icons";

/* ── editable design options ─────────────────────────────────── */
const SIDING = [
  { name: "Harbor navy", color: "#2b3c5e" },
  { name: "Forest green", color: "#2f4a39" },
  { name: "Clay red", color: "#7c3b30" },
  { name: "Charcoal", color: "#383b42" },
  { name: "Slate blue", color: "#48628a" },
];
const ROOF = [
  { name: "Charcoal", color: "#34373e" },
  { name: "Slate", color: "#586374" },
  { name: "Terracotta", color: "#a8553a" },
  { name: "Weathered", color: "#5a4d3f" },
];
const TRIM = [
  { name: "White", color: "#f4f3ef" },
  { name: "Black", color: "#22242a" },
  { name: "Cream", color: "#e6dcc5" },
];
const SHUTTERS = [
  { name: "Black", color: "#22242a", show: true },
  { name: "Navy", color: "#26324a", show: true },
  { name: "Forest", color: "#2f4034", show: true },
  { name: "None", color: "transparent", show: false },
];
const GARAGE = [
  { name: "Carriage", color: "#3b3f47" },
  { name: "Modern", color: "#6b7280" },
  { name: "White panel", color: "#e7e5df" },
];
const LAND = [
  { name: "Lush", shrubs: 6, tree: true },
  { name: "Modern", shrubs: 3, tree: true },
  { name: "Minimal", shrubs: 1, tree: false },
];

// Region of the real photo covering the home's lit facade. The siding recolor
// is clipped to this so it only repaints the walls (tuned to house.jpg).
const FACADE =
  "polygon(6% 26%, 41% 26%, 41% 31%, 65% 31%, 65% 35%, 98% 35%, 98% 40%, 6% 40%)";

type Design = {
  siding: number;
  roof: number;
  trim: number;
  shutters: number;
  garage: number;
  land: number;
};
const LENS: Record<keyof Design, number> = {
  siding: SIDING.length,
  roof: ROOF.length,
  trim: TRIM.length,
  shutters: SHUTTERS.length,
  garage: GARAGE.length,
  land: LAND.length,
};

export function MacBookScroll({ startHref }: { startHref: string }) {
  const [design, setDesign] = useState<Design>({
    siding: 0,
    roof: 0,
    trim: 0,
    shutters: 0,
    garage: 0,
    land: 0,
  });
  const paused = useRef(false);
  const step = useRef(0);

  // Idle demo: edit one element at a time so it clearly reads as a live editor.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fields: (keyof Design)[] = [
      "siding",
      "roof",
      "shutters",
      "trim",
      "garage",
      "land",
    ];
    const id = setInterval(() => {
      if (paused.current) return;
      const f = fields[step.current % fields.length];
      step.current++;
      setDesign((d) => ({ ...d, [f]: (d[f] + 1) % LENS[f] }));
    }, 1900);
    return () => clearInterval(id);
  }, []);

  const set = (field: keyof Design, value: number) => {
    paused.current = true;
    setDesign((d) => ({ ...d, [field]: value }));
  };

  return (
    <ContainerScroll
      titleComponent={
        <div className="px-4">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-medium text-violet-200 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            From drone photo to built reality
          </span>
          <h1 className="font-display mx-auto mt-6 max-w-4xl text-[2.6rem] font-bold leading-[1.02] tracking-tight text-white sm:text-6xl">
            Redesign your home's exterior.{" "}
            <span className="animate-gradient-x bg-gradient-to-r from-violet-300 via-fuchsia-300 to-indigo-300 bg-clip-text text-transparent">
              Then build it for real.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-slate-300 sm:text-lg">
            One drone photo becomes a photoreal render you restyle in a live editor —
            then we match you with vetted local pros who build it.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/pricing"
              className="group inline-flex items-center gap-2 rounded-xl bg-violet-600 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-violet-600/40 transition hover:bg-violet-500"
            >
              Get my free render
              <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to={startHref}
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-slate-100 backdrop-blur transition hover:bg-white/10"
            >
              Try the live editor
            </Link>
          </div>
          <div className="mt-6 mb-2 flex items-center justify-center gap-2 text-sm text-slate-400">
            <span className="flex text-amber-300">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4" />
              ))}
            </span>
            Loved by 12,000+ homeowners and local pros
          </div>
        </div>
      }
    >
      <EditorScreen design={design} set={set} />
    </ContainerScroll>
  );
}

/* ── the Safari window: macOS chrome + live exterior editor ──── */
function EditorScreen({
  design,
  set,
}: {
  design: Design;
  set: (f: keyof Design, v: number) => void;
}) {
  const s = SIDING[design.siding];
  const r = ROOF[design.roof];
  const t = TRIM[design.trim];
  const sh = SHUTTERS[design.shutters];
  const g = GARAGE[design.garage];
  const l = LAND[design.land];

  const cycle = (f: keyof Design) => set(f, (design[f] + 1) % LENS[f]);

  const rows: {
    field: keyof Design;
    label: string;
    value: string;
    chip?: string;
  }[] = [
    { field: "roof", label: "Roof", value: r.name, chip: r.color },
    { field: "trim", label: "Trim", value: t.name, chip: t.color },
    {
      field: "shutters",
      label: "Shutters",
      value: sh.name,
      chip: sh.show ? sh.color : undefined,
    },
    { field: "garage", label: "Garage", value: g.name, chip: g.color },
    { field: "land", label: "Landscaping", value: l.name },
  ];

  return (
    <div className="flex h-full flex-col bg-[#0d0c16] text-left">
      {/* macOS menu bar */}
      <div className="flex items-center justify-between bg-black/55 px-3 py-1 text-[10px] font-medium text-white/85 backdrop-blur">
        <div className="flex items-center gap-3">
          <AppleMark className="h-3 w-3" />
          <span className="font-semibold">Safari</span>
          {["File", "Edit", "View", "History", "Bookmarks", "Window", "Help"].map((m) => (
            <span key={m} className="hidden text-white/70 md:inline">
              {m}
            </span>
          ))}
        </div>
        <div className="flex items-center gap-2.5 text-white/80">
          <Battery className="h-3 w-[18px]" />
          <Wifi className="h-3 w-3.5" />
          <Magnifier className="h-3 w-3" />
          <span className="hidden sm:inline">Mon Jun 16</span>
          <span>9:41 AM</span>
        </div>
      </div>

      {/* Safari toolbar */}
      <div className="flex items-center gap-2 border-b border-black/40 bg-[#2c2c30] px-3 py-2 text-white/55">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
        </div>
        <Chevron className="ml-1 h-3.5 w-3.5" />
        <Chevron className="h-3.5 w-3.5 rotate-180 opacity-40" />
        <Sidebar className="h-3.5 w-3.5" />
        <div className="mx-auto flex w-[58%] items-center justify-center gap-1.5 rounded-lg bg-[#1b1b1f] px-3 py-1 text-[10px] text-slate-300">
          <Lock className="h-2.5 w-2.5 text-slate-400" />
          rerender.app/editor/12-maple-st
        </div>
        <Share className="h-3.5 w-3.5" />
        <Plus className="h-3.5 w-3.5" />
        <TabsIcon className="h-3.5 w-3.5" />
      </div>

      {/* editor body */}
      <div className="grid flex-1 grid-cols-[1.7fr_1fr] gap-3 p-3 sm:gap-4 sm:p-4">
        {/* render */}
        <div className="relative overflow-hidden rounded-xl bg-[#0a1020] ring-1 ring-white/10">
          <img
            src="/renders/house.jpg"
            alt="Home exterior render"
            draggable={false}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: "center 38%" }}
          />
          {/* siding recolor — at dusk only the lit facade picks up the new hue */}
          <div
            className="absolute inset-0 transition-[background] duration-500"
            style={{ background: s.color, mixBlendMode: "color", clipPath: FACADE, opacity: 0.95 }}
          />
          <div
            className="absolute inset-0 transition-[background] duration-500"
            style={{ background: s.color, mixBlendMode: "soft-light", clipPath: FACADE, opacity: 0.25 }}
          />
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-2 bg-gradient-to-t from-black/70 to-transparent px-3 pb-2 pt-8 text-[11px]">
            <span className="font-medium text-white">12 Maple St</span>
            <span className="inline-flex items-center gap-1 rounded-full bg-violet-500/30 px-2 py-0.5 text-[10px] font-medium text-violet-100 ring-1 ring-violet-400/30">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-300" />
              Editing
            </span>
          </div>
        </div>

        {/* controls */}
        <div className="flex flex-col gap-2 overflow-hidden">
          <div className="text-[11px] font-semibold text-slate-200">Siding</div>
          <div className="flex flex-wrap gap-1.5">
            {SIDING.map((f, i) => (
              <button
                key={f.name}
                type="button"
                onClick={() => set("siding", i)}
                aria-label={f.name}
                className={`h-6 w-6 rounded-full ring-2 transition ${
                  i === design.siding ? "scale-110 ring-violet-400" : "ring-white/15"
                }`}
                style={{ background: f.color }}
              />
            ))}
          </div>
          {rows.map((row) => (
            <button
              key={row.field}
              type="button"
              onClick={() => cycle(row.field)}
              className="group flex items-center justify-between rounded-lg bg-white/[0.04] px-2.5 py-2 text-xs transition hover:bg-white/[0.09]"
            >
              <span className="text-slate-400">{row.label}</span>
              <span className="flex items-center gap-1.5 font-medium text-slate-100">
                {row.chip && (
                  <span
                    className="h-3 w-3 rounded-full ring-1 ring-white/20"
                    style={{ background: row.chip }}
                  />
                )}
                {row.value}
                <Chevron className="h-3 w-3 rotate-180 text-slate-500 transition group-hover:text-violet-300" />
              </span>
            </button>
          ))}
          <button
            type="button"
            className="mt-auto rounded-lg bg-violet-600 px-3 py-2.5 text-center text-xs font-semibold text-white transition hover:bg-violet-500"
          >
            Save design
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── macOS / Safari chrome icons ─────────────────────────────── */
type IP = { className?: string };
function AppleMark({ className = "" }: IP) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M16.37 1.43c0 1.06-.43 2.05-1.13 2.78-.76.8-1.86 1.42-2.86 1.34-.12-1.02.4-2.08 1.06-2.76.74-.78 1.96-1.36 2.93-1.36zM20.9 17.1c-.03.08-.46 1.57-1.5 3.1-.93 1.33-1.9 2.65-3.4 2.68-1.47.03-1.95-.87-3.63-.87-1.68 0-2.2.84-3.6.9-1.45.06-2.55-1.44-3.5-2.77-1.94-2.79-3.42-7.88-1.43-11.32.99-1.71 2.76-2.79 4.67-2.82 1.44-.03 2.79.97 3.66.97.87 0 2.52-1.2 4.24-1.02.72.03 2.74.29 4.04 2.19-.1.07-2.41 1.41-2.39 4.2.03 3.33 2.92 4.44 2.95 4.45z" />
    </svg>
  );
}
function Battery({ className = "" }: IP) {
  return (
    <svg viewBox="0 0 28 14" fill="none" className={className} aria-hidden>
      <rect x="1" y="2" width="22" height="10" rx="3" stroke="currentColor" strokeWidth="1.3" opacity="0.6" />
      <rect x="3" y="4" width="15" height="6" rx="1.5" fill="currentColor" />
      <rect x="24.4" y="5" width="2" height="4" rx="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
function StrokeIcon({ className = "", d }: IP & { d: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" className={className} aria-hidden>
      {d.split("|").map((p, i) => (
        <path key={i} d={p} />
      ))}
    </svg>
  );
}
const Wifi = ({ className }: IP) => (
  <StrokeIcon className={className} d="M2.5 8.5a14 14 0 0 1 19 0|M5.5 12a9.5 9.5 0 0 1 13 0|M8.5 15.3a5 5 0 0 1 7 0|M12 18.8h.01" />
);
const Magnifier = ({ className }: IP) => (
  <StrokeIcon className={className} d="M10.5 10.5m-6.5 0a6.5 6.5 0 1 0 13 0a6.5 6.5 0 1 0-13 0|M15.5 15.5 21 21" />
);
const Chevron = ({ className }: IP) => <StrokeIcon className={className} d="M15 6l-6 6 6 6" />;
const Sidebar = ({ className }: IP) => (
  <StrokeIcon className={className} d="M4 5h16v14H4zM9 5v14" />
);
const Lock = ({ className }: IP) => (
  <StrokeIcon className={className} d="M6 11h12v9H6zM8.5 11V8a3.5 3.5 0 1 1 7 0v3" />
);
const Share = ({ className }: IP) => (
  <StrokeIcon className={className} d="M12 3v12|M8 7l4-4 4 4|M5 12v7h14v-7" />
);
const Plus = ({ className }: IP) => <StrokeIcon className={className} d="M12 5v14|M5 12h14" />;
const TabsIcon = ({ className }: IP) => (
  <StrokeIcon className={className} d="M4 5h7v14H4zM13 5h7v14h-7" />
);

import type { OptionCategory } from "@configurator/shared";

/**
 * A tiny shared "house" geometry. The base placeholder image and every option
 * overlay are drawn against the SAME coordinates, so when the configurator
 * stacks an overlay on top of the base, the colored region lands on the right
 * part of the house. This is the mock stand-in for a geometry-preserving AI
 * render: real renders would replace these SVG overlays with PNGs from the
 * image model, but the compositing model in the UI stays identical.
 */
export const VIEWBOX = { w: 1200, h: 800 };

const G = {
  wall: { x: 350, y: 300, w: 500, h: 320 },
  roof: "320,300 600,150 880,300",
  windows: [
    { x: 430, y: 340, w: 90, h: 90 },
    { x: 660, y: 340, w: 90, h: 90 },
  ],
  shutters: [
    { x: 408, y: 340, w: 18, h: 90 },
    { x: 524, y: 340, w: 18, h: 90 },
    { x: 638, y: 340, w: 18, h: 90 },
    { x: 754, y: 340, w: 18, h: 90 },
  ],
  garage: { x: 372, y: 470, w: 150, h: 150 },
  door: { x: 560, y: 480, w: 70, h: 140 },
  ground: { y: 620 },
};

/** The neutral base image for a property (used until a real photo is uploaded). */
export function basePlaceholderSvg(propertyName: string): string {
  const w = G.wall;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX.w} ${VIEWBOX.h}">
  <rect width="${VIEWBOX.w}" height="${VIEWBOX.h}" fill="#dbeafe"/>
  <rect y="${G.ground.y}" width="${VIEWBOX.w}" height="${VIEWBOX.h - G.ground.y}" fill="#c7d2c0"/>
  <polygon points="${G.roof}" fill="#9ca3af"/>
  <rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" fill="#e5e7eb" stroke="#9ca3af" stroke-width="3"/>
  ${G.windows.map((q) => `<rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" fill="#bfdbfe" stroke="#94a3b8" stroke-width="3"/>`).join("")}
  ${G.shutters.map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="#94a3b8"/>`).join("")}
  <rect x="${G.garage.x}" y="${G.garage.y}" width="${G.garage.w}" height="${G.garage.h}" fill="#d1d5db" stroke="#9ca3af" stroke-width="3"/>
  <rect x="${G.door.x}" y="${G.door.y}" width="${G.door.w}" height="${G.door.h}" fill="#9ca3af"/>
  <g font-family="system-ui, sans-serif" font-size="26" fill="#475569" font-weight="600">
    <text x="40" y="60">${propertyName.replace(/&/g, "&amp;").replace(/</g, "&lt;")}</text>
    <text x="40" y="92" font-size="18" fill="#64748b" font-weight="400">Base image (placeholder)</text>
  </g>
</svg>`;
}

/**
 * A transparent overlay that recolors just ONE element of the house.
 * `hex` is the option's swatch color.
 */
export function overlaySvg(category: OptionCategory, hex: string): string {
  const o = 0.82; // opacity of the recolored element
  let shapes = "";

  switch (category) {
    case "siding":
    case "siding_color": {
      const w = G.wall;
      shapes = `<rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" fill="${hex}" opacity="${o}"/>`;
      break;
    }
    case "roof":
      shapes = `<polygon points="${G.roof}" fill="${hex}" opacity="${o}"/>`;
      break;
    case "shutters":
      shapes = G.shutters
        .map((s) => `<rect x="${s.x}" y="${s.y}" width="${s.w}" height="${s.h}" fill="${hex}" opacity="${o}"/>`)
        .join("");
      break;
    case "trim": {
      const w = G.wall;
      const t = `stroke="${hex}" stroke-width="10" fill="none" opacity="${o}"`;
      shapes =
        `<rect x="${w.x}" y="${w.y}" width="${w.w}" height="${w.h}" ${t}/>` +
        G.windows.map((q) => `<rect x="${q.x}" y="${q.y}" width="${q.w}" height="${q.h}" ${t}/>`).join("");
      break;
    }
    case "garage":
      shapes = `<rect x="${G.garage.x}" y="${G.garage.y}" width="${G.garage.w}" height="${G.garage.h}" fill="${hex}" opacity="${o}"/>`;
      break;
    case "landscaping":
      shapes = [0, 1, 2, 3, 4]
        .map((i) => {
          const cx = 200 + i * 220;
          return `<ellipse cx="${cx}" cy="650" rx="70" ry="40" fill="${hex}" opacity="${o}"/>`;
        })
        .join("");
      break;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX.w} ${VIEWBOX.h}">
  ${shapes}
</svg>`;
}

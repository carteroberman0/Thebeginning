export const bio = `Captured Aerial is a real estate media company specializing in drone photography and videography. We help agents, brokers, and property developers showcase listings with stunning aerial perspectives that ground-level cameras simply can't match.

Every shoot is planned around your property — from ideal flight angles to golden-hour timing — so the final imagery makes buyers stop scrolling and start calling. We're based in New Jersey and serve the surrounding region.`;

export interface Equipment {
  name: string;
  description: string;
}

export const equipment: Equipment[] = [
  {
    name: "DJI Mini 3",
    description: "4K/60fps, 34-min flight time, true vertical shooting — precision in any condition.",
  },
  {
    name: "ND Filter Set",
    description: "ND4/8/16/64 — smooth cinematic motion blur in any lighting condition.",
  },
  {
    name: "Adobe Lightroom & Premiere",
    description: "Professional color grading and video editing matched to your brand.",
  },
  {
    name: "Weather & Airspace Planning",
    description: "Every shoot pre-checked for FAA NOTAM compliance and optimal conditions.",
  },
];

export interface Certification {
  name: string;
  issuer: string;
  year: number;
}

export const certifications: Certification[] = [
  {
    name: "FAA Part 107 Remote Pilot Certificate",
    issuer: "Federal Aviation Administration",
    year: 2025,
  },
  {
    name: "Drone Liability Insurance",
    issuer: "Skywatch.AI",
    year: 2025,
  },
];

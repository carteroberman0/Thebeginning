"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { Spotlight } from "@/components/ui/spotlight";

// Lazy-load the heavy 3D canvas only on the client
const DroneModel = dynamic(
  () => import("@/components/ui/DroneModel").then((m) => m.DroneModel),
  { ssr: false, loading: () => <div className="w-full h-full" /> }
);

const STATS = [
  { value: "4K", label: "Video resolution" },
  { value: "48hr", label: "Project turnaround" },
  { value: "12MP", label: "Camera resolution" },
];

export default function DroneAboutSection() {
  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "#060e06" }}
    >
      <Spotlight size={700} className="opacity-30" />

      {/* subtle green grid overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(45,97,25,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(45,97,25,0.06) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-20 flex flex-col md:flex-row items-center gap-10 md:gap-0">
        {/* ── Left: text ── */}
        <div className="flex-1 md:pr-10 z-10">
          <p
            style={{
              fontSize: 10,
              fontWeight: 800,
              letterSpacing: "0.35em",
              textTransform: "uppercase",
              color: "var(--brand-light)",
              marginBottom: 18,
            }}
          >
            Who We Are
          </p>

          <h2
            className="font-black uppercase leading-none mb-6"
            style={{
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              letterSpacing: "-0.01em",
              color: "#ffffff",
            }}
          >
            Captured
            <br />
            <span style={{ color: "var(--brand-light)" }}>Aerial</span>
          </h2>

          <p
            className="text-sm leading-relaxed mb-8 max-w-md"
            style={{ color: "rgba(255,255,255,0.6)" }}
          >
            FAA Part 107 certified drone photography and videography for real estate,
            commercial, and cinematic projects across New Jersey. Every shot planned
            around golden-hour timing and ideal flight angles — so listings stop
            scrolling and start selling.
          </p>

          {/* Stats */}
          <div className="flex gap-8 mb-10">
            {STATS.map((s) => (
              <div key={s.label}>
                <p
                  style={{
                    fontSize: "clamp(1.4rem, 3vw, 2rem)",
                    fontWeight: 900,
                    color: "var(--brand-light)",
                    lineHeight: 1,
                  }}
                >
                  {s.value}
                </p>
                <p
                  style={{
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.4)",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </p>
              </div>
            ))}
          </div>

          {/* Drone badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
            style={{
              background: "rgba(45,97,25,0.18)",
              border: "1px solid rgba(74,140,41,0.30)",
              backdropFilter: "blur(12px) saturate(140%)",
              WebkitBackdropFilter: "blur(12px) saturate(140%)",
              boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
            }}
          >
            <span
              className="inline-block w-1.5 h-1.5 rounded-full"
              style={{ background: "var(--brand-light)" }}
            />
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "var(--brand-light)",
              }}
            >
              Powered by DJI Mini 3
            </span>
          </div>

          <div className="flex gap-3">
            <Link href="/portfolio" className="btn btn-green">
              See Our Work
            </Link>
            <Link href="/about" className="btn btn-white">
              Learn More
            </Link>
          </div>
        </div>

        {/* ── Right: 3D Drone ── */}
        <div className="flex-1 relative flex items-center justify-center" style={{ minHeight: 440 }}>
          {/* glow behind the model */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 60% 50% at 50% 50%, rgba(45,97,25,0.22) 0%, transparent 70%)",
            }}
          />
          <DroneModel className="w-full h-[440px]" />
        </div>
      </div>
    </section>
  );
}

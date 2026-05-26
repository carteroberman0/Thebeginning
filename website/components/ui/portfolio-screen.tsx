"use client";

import { useEffect, useRef } from "react";

const IMAGES = [
  "/images/portfolio/14-cayuga-front.jpg",
  "/images/portfolio/14-cayuga-aerial.jpg",
  "/images/portfolio/14-cayuga-back.jpg",
  "/images/portfolio/14-cayuga-back2.jpg",
  "/images/portfolio/11-cayuga-aerial.jpg",
  "/images/portfolio/11-cayuga-front.jpg",
  "/images/portfolio/10-cayuga-front.jpg",
  "/images/portfolio/144-goltra-front.jpg",
  "/images/portfolio/aerial-dji.jpg",
];

// Double for seamless loop
const STRIP = [...IMAGES, ...IMAGES];

export function PortfolioScreen() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function resize() {
      if (!contentRef.current) return;
      const scale = Math.max(window.innerWidth / 1000, window.innerHeight / 562);
      contentRef.current.style.transform = `scale(${scale})`;
    }
    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="ps-hero">
      <div className="ps-stage">
        <div ref={contentRef} className="ps-content">
          <div className="ps-scene">

            {/* Darkened aerial background */}
            <img className="ps-bg-img" src="/images/portfolio/aerial-dji.jpg" alt="" />

            {/* Green ambient pulse */}
            <div className="ps-glow" />

            {/* 3D hallway perspective wrapper */}
            <div className="ps-room">
              <div className="ps-room-inner">

                {/* Back wall */}
                <div className="ps-wall ps-wall-back">
                  <div className="ps-strip ps-anim-back">
                    {STRIP.map((src, i) => (
                      <img key={i} src={src} alt="" className="ps-img" />
                    ))}
                  </div>
                </div>

                {/* Left wall */}
                <div className="ps-wall ps-wall-left">
                  <div className="ps-strip ps-anim-left">
                    {STRIP.map((src, i) => (
                      <img key={i} src={src} alt="" className="ps-img" />
                    ))}
                  </div>
                </div>

                {/* Right wall */}
                <div className="ps-wall ps-wall-right">
                  <div className="ps-strip ps-anim-right">
                    {STRIP.map((src, i) => (
                      <img key={i} src={src} alt="" className="ps-img" />
                    ))}
                  </div>
                </div>

                {/* Floor */}
                <div className="ps-floor" />

                {/* Ceiling */}
                <div className="ps-ceiling" />
              </div>
            </div>

            {/* Vignette to blend edges */}
            <div className="ps-vignette" />
          </div>
        </div>
      </div>
    </div>
  );
}

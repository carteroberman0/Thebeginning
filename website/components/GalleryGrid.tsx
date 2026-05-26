"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { portfolioImages, type Category } from "@/data/portfolio";

const categories: { label: string; value: Category }[] = [
  { label: "All", value: "all" },
  { label: "Real Estate", value: "real-estate" },
  { label: "Aerial", value: "aerial" },
  { label: "Commercial", value: "commercial" },
];

export default function GalleryGrid() {
  const [active, setActive] = useState<Category>("all");
  const [visible, setVisible] = useState(true);
  const [lightbox, setLightbox] = useState<string | null>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function switchCategory(cat: Category) {
    if (cat === active) return;
    setVisible(false);
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => {
      setActive(cat);
      setVisible(true);
    }, 200);
  }

  const filtered = active === "all" ? portfolioImages : portfolioImages.filter((i) => i.category === active);

  return (
    <>
      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap mb-8">
        {categories.map((c) => (
          <button
            key={c.value}
            onClick={() => switchCategory(c.value)}
            className="text-xs px-5 py-2 border-2 transition-all font-bold tracking-widest uppercase"
            style={{
              borderColor: active === c.value ? "var(--brand)" : "var(--text)",
              background: active === c.value ? "var(--brand)" : "transparent",
              color: active === c.value ? "#ffffff" : "var(--text)",
            }}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
      >
        {filtered.map((img) => (
          <button
            key={img.id}
            className="relative overflow-hidden aspect-video group cursor-pointer"
            onClick={() => setLightbox(img.src)}
            style={{ background: "var(--surface)" }}
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4"
              style={{ background: "linear-gradient(to top, rgba(8,8,8,0.7), transparent)" }}
            >
              <span className="text-xs text-white font-bold tracking-widest uppercase">{img.alt}</span>
            </div>
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.92)" }}
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-5xl aspect-video" onClick={(e) => e.stopPropagation()}>
            <Image src={lightbox} alt="Full size" fill className="object-contain" sizes="100vw" />
          </div>
          <button
            className="absolute top-6 right-6 text-white text-3xl leading-none hover:opacity-70 transition-opacity"
            onClick={() => setLightbox(null)}
          >
            ×
          </button>
        </div>
      )}
    </>
  );
}

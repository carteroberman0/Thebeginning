"use client";

import { useState, useRef } from "react";

const VIDEOS = [
  "/videos/church-shot.mov",
  "/videos/cayuga-pan.mp4",
  "/videos/cayuga-zoom.mp4",
  "/videos/cayuga-close.mp4",
  "/videos/church-shot-2.mov",
];

export default function VideoBackground() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function advance() {
    const next = (index + 1) % VIDEOS.length;
    setPrev(index);
    setIndex(next);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setPrev(null), 1200);
  }

  return (
    <>
      {/* Outgoing clip — stays visible during crossfade */}
      {prev !== null && (
        <video
          key={`prev-${prev}`}
          autoPlay
          muted
          playsInline
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", objectPosition: "center", opacity: 1 }}
        >
          <source src={VIDEOS[prev]} />
        </video>
      )}
      {/* Incoming clip — fades in over outgoing */}
      <video
        key={`curr-${index}`}
        autoPlay
        muted
        playsInline
        onEnded={advance}
        onError={advance}
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", objectPosition: "center", animation: "videoFadeIn 1.2s cubic-bezier(0.4,0,0.2,1) forwards" }}
      >
        <source src={VIDEOS[index]} />
      </video>
    </>
  );
}

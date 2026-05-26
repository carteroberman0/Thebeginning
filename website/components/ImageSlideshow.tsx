"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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

const DURATION = 5000;
const FADE_MS = 1200;

export default function ImageSlideshow() {
  const [index, setIndex] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((cur) => {
        setPrev(cur);
        return (cur + 1) % IMAGES.length;
      });
    }, DURATION);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (prev === null) return;
    const id = setTimeout(() => setPrev(null), FADE_MS);
    return () => clearTimeout(id);
  }, [prev]);

  return (
    <>
      {prev !== null && (
        <Image
          key={`prev-${prev}`}
          src={IMAGES[prev]}
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover object-center"
          style={{ opacity: 1 }}
        />
      )}
      <Image
        key={`curr-${index}`}
        src={IMAGES[index]}
        alt=""
        fill
        priority
        quality={90}
        sizes="100vw"
        className="object-cover object-center"
        style={{ animation: `slideshowFadeIn ${FADE_MS}ms cubic-bezier(0.4,0,0.2,1) forwards` }}
      />
    </>
  );
}

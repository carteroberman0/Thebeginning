"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import VideoBackground from "./VideoBackground";
import { EtheralShadow } from "./ui/etheral-shadow";

function ScrollHint() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 2000);
    const hide = () => setVisible(false);
    window.addEventListener("scroll", hide, { once: true, passive: true });
    return () => { clearTimeout(show); window.removeEventListener("scroll", hide); };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="absolute bottom-8 left-8 flex flex-col items-center gap-2 z-20"
          aria-hidden="true"
        >
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(255,255,255,0.45)" }}>
            Scroll
          </span>
          <div className="relative w-px h-10 overflow-hidden" style={{ background: "rgba(255,255,255,0.15)" }}>
            <motion.div
              className="absolute top-0 left-0 w-full"
              style={{ background: "rgba(255,255,255,0.7)", height: "40%" }}
              animate={{ y: ["0%", "250%"] }}
              transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default function HeroSection() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Static image fallback — shows when videos aren't available */}
      <Image
        src="/images/portfolio/14-cayuga-aerial-hq.jpg"
        alt="Aerial drone photography"
        fill
        priority
        quality={90}
        style={{ objectFit: "cover", objectPosition: "center" }}
      />
      {/* Videos play on top when available (local dev) */}
      <VideoBackground />

      {/* Gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.80) 100%)",
        }}
      />

      {/* Glass card — fades in on load */}
      <div className="absolute inset-0 flex items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="glass-dark relative overflow-hidden"
          style={{
            borderRadius: 28,
            padding: "48px 56px 44px",
            width: "100%",
            maxWidth: 480,
            background: "rgba(4, 14, 4, 0.82)",
            transform: "translateZ(0)",
          }}
        >
          {/* Animated green glow */}
          <div className="absolute inset-0 pointer-events-none">
            <EtheralShadow
              color="rgba(68, 190, 38, 1)"
              animation={{ scale: 100, speed: 90 }}
              noise={{ opacity: 0.22, scale: 1.2 }}
              sizing="fill"
            />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center">
            <Image
              src="/logo-white.png"
              alt="Captured Aerial"
              width={590}
              height={374}
              priority
              quality={100}
              className="w-64 sm:w-80 h-auto"
            />

            <p
              className="mt-3 text-xs font-bold tracking-[0.3em] uppercase"
              style={{ color: "rgba(255,255,255,0.55)" }}
            >
              Drone Photography &nbsp;·&nbsp; New Jersey
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <Link href="/portfolio" className="btn btn-green">
                View Portfolio
              </Link>
              <Link href="/contact" className="btn btn-white">
                Book a Shoot
              </Link>
            </div>
          </div>
        </motion.div>
      </div>

      <ScrollHint />
    </section>
  );
}

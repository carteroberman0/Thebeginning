"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef } from "react";

type Animation = "fadeUp" | "fadeDown" | "fadeLeft" | "fadeRight" | "scale" | "fadeIn";

type AnimDef = { hidden: Variants[string]; visible: Variants[string] };

const VARIANTS: Record<Animation, AnimDef> = {
  fadeUp:    { hidden: { opacity: 0, y: 48 },    visible: { opacity: 1, y: 0 } },
  fadeDown:  { hidden: { opacity: 0, y: -48 },   visible: { opacity: 1, y: 0 } },
  fadeLeft:  { hidden: { opacity: 0, x: -56 },   visible: { opacity: 1, x: 0 } },
  fadeRight: { hidden: { opacity: 0, x: 56 },    visible: { opacity: 1, x: 0 } },
  scale:     { hidden: { opacity: 0, scale: 0.88 }, visible: { opacity: 1, scale: 1 } },
  fadeIn:    { hidden: { opacity: 0 },            visible: { opacity: 1 } },
};

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: Animation;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

export function ScrollReveal({
  children,
  animation = "fadeUp",
  delay = 0,
  duration = 0.65,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={VARIANTS[animation] as Variants}
      transition={{ duration, delay, ease: [0.4, 0, 0.2, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Stagger container ── */
interface ScrollStaggerProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  delayStart?: number;
}

export function ScrollStagger({
  children,
  className,
  staggerDelay = 0.1,
  delayStart = 0,
}: ScrollStaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay, delayChildren: delayStart },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ── Individual stagger child ── */
export function StaggerItem({
  children,
  className,
  animation = "fadeUp",
}: {
  children: React.ReactNode;
  className?: string;
  animation?: Animation;
}) {
  return (
    <motion.div
      variants={{
        hidden: VARIANTS[animation].hidden,
        visible: {
          ...(VARIANTS[animation].visible as object),
          transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
        } as Variants[string],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

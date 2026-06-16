/** Flowing purple "magma" backdrop: layered soft gradient streams that slowly
 *  drift, rotate and breathe, plus a faint moving grid and floating glass
 *  shapes. All motion is CSS-gated by prefers-reduced-motion. */
export function FloatingBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* magma streams (screen-blended so they glow like molten purple) */}
      <div
        className="animate-magma-1 absolute -left-[20%] -top-[25%] h-[80%] w-[85%] rounded-[46%] blur-[80px]"
        style={{
          background:
            "radial-gradient(60% 48% at 50% 50%, rgba(139,92,246,0.6), rgba(124,58,237,0.18), transparent 72%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="animate-magma-2 absolute -right-[22%] top-[0%] h-[85%] w-[80%] rounded-[44%] blur-[90px]"
        style={{
          background:
            "radial-gradient(58% 46% at 50% 50%, rgba(217,70,239,0.42), transparent 70%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="animate-magma-3 absolute left-[8%] -bottom-[35%] h-[80%] w-[95%] rounded-[48%] blur-[95px]"
        style={{
          background:
            "radial-gradient(60% 44% at 50% 50%, rgba(99,102,241,0.5), transparent 72%)",
          mixBlendMode: "screen",
        }}
      />
      <div
        className="animate-magma-1 absolute left-[28%] top-[18%] h-[55%] w-[55%] rounded-[50%] blur-[70px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(168,85,247,0.45), transparent 70%)",
          mixBlendMode: "screen",
          animationDelay: "-9s",
        }}
      />
      <div
        className="animate-magma-2 absolute right-[12%] bottom-[6%] h-[50%] w-[48%] rounded-[50%] blur-[70px]"
        style={{
          background:
            "radial-gradient(closest-side, rgba(232,121,249,0.32), transparent 70%)",
          mixBlendMode: "screen",
          animationDelay: "-14s",
        }}
      />

      {/* faint moving grid */}
      <div
        className="animate-grid absolute inset-0 opacity-[0.16]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
          maskImage: "radial-gradient(ellipse at center, black, transparent 78%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, black, transparent 78%)",
        }}
      />

      {/* floating glass shapes */}
      <div className="animate-float absolute left-[12%] top-[30%] h-16 w-16 rounded-2xl border border-white/15 bg-white/5 backdrop-blur-sm" />
      <div className="animate-float-slow absolute right-[16%] top-[24%] h-10 w-10 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm" />
      <div className="animate-float absolute right-[26%] bottom-[20%] h-12 w-12 rotate-12 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm" />
    </div>
  );
}

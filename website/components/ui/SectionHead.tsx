interface SectionHeadProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  center?: boolean;
}

export default function SectionHead({ eyebrow, title, lede, center = false }: SectionHeadProps) {
  return (
    <div className={center ? "text-center" : ""}>
      {eyebrow && (
        <div className={`flex items-center gap-3 mb-5 ${center ? "justify-center" : ""}`}>
          <span className="inline-block w-1.5 h-5 shrink-0 bg-brand" />
          <span className="text-[10px] font-extrabold tracking-[0.35em] uppercase text-brand">
            {eyebrow}
          </span>
        </div>
      )}
      <h2 className="font-black uppercase leading-none" style={{ fontSize: "clamp(2rem, 5vw, 3.75rem)", letterSpacing: "-0.01em", color: "var(--text)" }}>
        {title}
      </h2>
      {lede && (
        <p className="mt-5 text-base leading-relaxed max-w-2xl" style={{ color: "var(--muted)", ...(center ? { margin: "1.25rem auto 0" } : {}) }}>
          {lede}
        </p>
      )}
    </div>
  );
}

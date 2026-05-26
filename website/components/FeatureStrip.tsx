const features = [
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    title: "ADVANCED TECH",
    body: "Flying the DJI Mini 4 Pro with 4K/60fps, obstacle avoidance, and precision GPS control — delivering crisp, stable footage every flight.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2"/>
        <path d="M8 4v16"/>
        <path d="M16 4v16"/>
        <path d="M2 12h20"/>
      </svg>
    ),
    title: "4K QUALITY",
    body: "Every shoot delivers crisp, professionally edited imagery in 4K resolution — giving your property or project a cinematic edge.",
  },
  {
    icon: (
      <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10"/>
        <polyline points="12 6 12 12 16 14"/>
      </svg>
    ),
    title: "QUICK DELIVERY",
    body: "Edited photos delivered within 48 hours of your shoot. Rush same-day turnaround available for time-sensitive listings.",
  },
];

export default function FeatureStrip() {
  return (
    <section style={{ background: "var(--surface)" }}>
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
        {features.map((f) => (
          <div key={f.title} className="flex flex-col gap-4">
            <div style={{ color: "var(--brand)" }}>{f.icon}</div>
            <h3 className="text-sm font-bold tracking-[0.18em] text-text">{f.title}</h3>
            <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{f.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

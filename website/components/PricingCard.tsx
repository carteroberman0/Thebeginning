import Link from "next/link";
import { type ServiceTier } from "@/data/services";

export default function PricingCard({ tier }: { tier: ServiceTier }) {
  const hl = tier.highlighted;

  return (
    <div
      className={`flex flex-col p-8 rounded-2xl transition-transform hover:-translate-y-1 ${
        hl ? "glass-dark" : "glass-card"
      }`}
      style={hl ? { background: "rgba(20,50,10,0.72)" } : undefined}
    >
      {hl && (
        <p className="text-[9px] font-extrabold tracking-[0.35em] uppercase mb-4" style={{ color: "rgba(255,255,255,0.65)" }}>
          Most Popular
        </p>
      )}

      <h3 className="text-[13px] font-extrabold tracking-[0.25em] uppercase" style={{ color: hl ? "#fff" : "var(--text)" }}>
        {tier.name}
      </h3>
      <p className="font-black leading-none mt-3" style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", color: hl ? "#fff" : "var(--text)" }}>
        {tier.price}
      </p>
      <p className="text-[13px] mt-2 mb-7" style={{ color: hl ? "rgba(255,255,255,0.65)" : "var(--muted)" }}>
        {tier.tagline}
      </p>

      <hr style={{ borderColor: hl ? "rgba(255,255,255,0.15)" : "var(--border)", marginBottom: 24 }} />

      <ul className="flex flex-col gap-3 flex-1">
        {tier.features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <span className="mt-[5px] shrink-0 inline-block w-1.5 h-1.5 rounded-full" style={{ background: hl ? "rgba(68,190,38,0.9)" : "var(--brand)" }} />
            <span style={{ color: hl ? "rgba(255,255,255,0.88)" : "var(--text)" }}>{f}</span>
          </li>
        ))}
      </ul>

      <Link
        href="/contact"
        className={`btn mt-8 ${hl ? "btn-white" : "btn-green"}`}
      >
        {tier.cta}
      </Link>
    </div>
  );
}

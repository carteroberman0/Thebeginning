import { useEffect, useMemo, useState } from "react";
import type { PropertySummary } from "@configurator/shared";
import { api } from "../api";
import { FloatingBackground } from "@/components/FloatingBackground";
import { MacBookScroll } from "@/components/marketing/MacBookScroll";
import { Counter, ConnectForm, Marquee, Reveal } from "@/components/marketing/site";
import { Shield } from "@/components/icons";

export default function HomePage() {
  const [properties, setProperties] = useState<PropertySummary[]>([]);
  useEffect(() => {
    api.listProperties().then(setProperties).catch(() => {});
  }, []);
  const startHref = useMemo(
    () => (properties[0] ? `/configure/${properties[0].id}` : "/operator"),
    [properties],
  );

  const STATS = [
    { v: <Counter to={12000} suffix="+" />, l: "Homes rendered" },
    { v: <Counter to={480} suffix="+" />, l: "Vetted local pros" },
    {
      v: (
        <>
          <Counter to={48} />h
        </>
      ),
      l: "Avg. time to match",
    },
    {
      v: (
        <>
          <Counter to={49} />/50
        </>
      ),
      l: "Avg. homeowner rating",
    },
  ];

  return (
    <>
      {/* Hero — scroll-driven MacBook with the live editor on its screen */}
      <section className="relative overflow-hidden bg-[#0b0716]">
        <FloatingBackground />
        <div className="relative pt-16">
          <MacBookScroll startHref={startHref} />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-white" />
      </section>

      {/* Trust */}
      <section className="border-y border-violet-100 bg-[#faf9ff] py-7">
        <p className="mb-5 text-center text-xs font-semibold uppercase tracking-[0.2em] text-violet-400">
          One network · every trade that touches a home's exterior
        </p>
        <Marquee />
      </section>

      {/* Stats */}
      <section className="relative overflow-hidden bg-[#0b0716] py-20 text-white">
        <FloatingBackground />
        <div className="relative mx-auto grid max-w-6xl grid-cols-2 gap-8 px-4 text-center lg:grid-cols-4">
          {STATS.map((s, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="font-display text-4xl font-bold sm:text-5xl">{s.v}</div>
              <div className="mt-2 text-sm text-slate-400">{s.l}</div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-4 py-20">
        <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-[#0b0716] px-6 py-20 text-center text-white">
          <FloatingBackground />
          <div className="relative mx-auto max-w-2xl">
            <Reveal>
              <h2 className="font-display text-4xl font-bold tracking-tight sm:text-5xl">
                Get your free render this week
              </h2>
              <p className="mx-auto mt-4 max-w-lg text-lg text-slate-300">
                Drop your email and postcode — we'll turn your home's photo into an
                editable render and line up local pros near you.
              </p>
            </Reveal>
            <Reveal delay={120}>
              <ConnectForm />
            </Reveal>
            <Reveal delay={180}>
              <p className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Shield className="h-4 w-4 text-violet-300" />
                No spam, no obligation. Free render to start.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

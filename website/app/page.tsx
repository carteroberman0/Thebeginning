import Image from "next/image";
import Link from "next/link";
import HeroSection from "@/components/HeroSection";
import DroneAboutSection from "@/components/DroneAboutSection";
import SectionHead from "@/components/ui/SectionHead";
import { ScrollReveal, ScrollStagger, StaggerItem } from "@/components/ui/scroll-reveal";

export default function Home() {
  return (
    <>
      <HeroSection />

      <DroneAboutSection />

      {/* ── Portfolio Showcase ── */}
      <section className="relative py-24">
        <div className="max-w-5xl mx-auto px-6">
          <ScrollReveal animation="fadeUp">
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-5">
                <span className="inline-block w-1.5 h-5 bg-brand" />
                <span style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--brand)" }}>
                  Our Work
                </span>
              </div>
              <h2 className="font-black uppercase leading-none mb-4" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)", letterSpacing: "-0.02em", color: "var(--text)" }}>
                Portfolio Highlights
              </h2>
              <p className="text-base max-w-xl mx-auto" style={{ color: "var(--muted)" }}>
                Real estate listings and cinematic flyovers — fully edited and delivered with precision.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fadeUp" delay={0.15}>
            {/* Static 3D tilt — perspective applied once, never repaints */}
            <div style={{ perspective: "1200px", perspectiveOrigin: "50% 30%" }}>
              <div
                className="rounded-[30px] border-4 border-[#6C6C6C] p-3 md:p-6 shadow-2xl"
                style={{
                  background: "#222222",
                  transform: "rotateX(14deg)",
                  transformOrigin: "50% 100%",
                  boxShadow: "0 40px 80px rgba(0,0,0,0.55), 0 16px 32px rgba(0,0,0,0.35)",
                  willChange: "auto",
                }}
              >
                <div className="rounded-2xl overflow-hidden bg-zinc-900" style={{ height: "clamp(280px, 40vw, 560px)" }}>
                  <div className="h-full w-full grid grid-cols-3 grid-rows-2 gap-2 p-1">
                    <div className="relative col-span-2 row-span-2 rounded-xl overflow-hidden">
                      <Image src="/images/portfolio/14-cayuga-front-hq.jpg" alt="14 Cayuga Way front" fill className="object-cover" sizes="(max-width:768px) 100vw, 60vw" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                      <span className="absolute bottom-3 left-3 text-xs text-white/80 font-bold tracking-widest uppercase">14 Cayuga Way</span>
                    </div>
                    <div className="relative rounded-xl overflow-hidden">
                      <Image src="/images/portfolio/14-cayuga-aerial-hq.jpg" alt="14 Cayuga Way aerial" fill className="object-cover" sizes="(max-width:768px) 50vw, 20vw" />
                    </div>
                    <div className="relative rounded-xl overflow-hidden">
                      <Image src="/images/portfolio/14-cayuga-back-hq.jpg" alt="14 Cayuga Way back" fill className="object-cover" sizes="(max-width:768px) 50vw, 20vw" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="text-center mt-10">
            <ScrollReveal animation="fadeUp" delay={0.1}>
              <Link href="/portfolio" className="btn btn-glass">
                View Full Portfolio
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Services Teaser ── */}
      <section className="relative py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="glass-card rounded-2xl px-8 pt-12 pb-14">
            <ScrollReveal animation="fadeUp">
              <SectionHead eyebrow="What We Offer" title="Real Estate Media Services" lede="From single-property listings to full cinematic productions — we have a package that fits." center />
            </ScrollReveal>

            <ScrollStagger className="grid grid-cols-1 md:grid-cols-3 gap-px mt-14 rounded-xl overflow-hidden" staggerDelay={0.12} delayStart={0.1}>
              {[
                { label: "01", title: "Real Estate",    desc: "Make listings stand out with stunning aerial perspectives that drive buyer interest and faster sales." },
                { label: "02", title: "Cinematic Video", desc: "4K video productions with professional editing — for properties, events, and commercial use." },
                { label: "03", title: "Cinematic Film",  desc: "Fully edited 4K productions with professional color grading — for properties, events, and commercial use." },
              ].map((s, i) => (
                <StaggerItem key={s.title} animation="fadeUp">
                  <div
                    className="glass-card p-8 h-full rounded-none transition-all duration-200 hover:bg-brand/5"
                    style={{ borderRadius: i === 0 ? "0.75rem 0 0 0.75rem" : i === 2 ? "0 0.75rem 0.75rem 0" : 0 }}
                  >
                    <p style={{ fontSize: 11, fontWeight: 800, letterSpacing: "0.3em", color: "var(--brand)", marginBottom: 20 }}>{s.label}</p>
                    <h3 style={{ fontSize: 18, fontWeight: 900, textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--text)", marginBottom: 12 }}>{s.title}</h3>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>{s.desc}</p>
                  </div>
                </StaggerItem>
              ))}
            </ScrollStagger>

            <div className="mt-10 text-center">
              <ScrollReveal animation="fadeUp" delay={0.3}>
                <Link href="/services" className="btn btn-green">See Pricing</Link>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="relative max-w-6xl mx-auto px-6 pb-28">
        <ScrollReveal animation="scale" duration={0.7}>
          <div
            className="glass-dark relative overflow-hidden p-14 text-center rounded-2xl"
            style={{ background: "rgba(6, 20, 6, 0.88)" }}
          >
            {/* subtle green glow */}
            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(45,97,25,0.30) 0%, transparent 70%)" }} />

            <div className="relative z-10">
              <p style={{ fontSize: 10, fontWeight: 800, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(100,200,60,0.7)", marginBottom: 16 }}>
                Ready to Fly?
              </p>
              <h2 style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)", fontWeight: 900, textTransform: "uppercase", lineHeight: 1, color: "#ffffff", marginBottom: 16 }}>
                Let&apos;s Elevate Your Next Listing
              </h2>
              <p className="mb-10 max-w-md mx-auto text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                Tell us about your property and we&apos;ll get back to you within 48 hours.
              </p>
              <Link href="/contact" className="btn btn-green">Book a Shoot</Link>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </>
  );
}

import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SectionHead from "@/components/ui/SectionHead";
import { ScrollReveal, ScrollStagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { bio, equipment } from "@/data/about";

export const metadata: Metadata = {
  title: "About | Captured Aerial",
  description:
    "Meet the team behind Captured Aerial — FAA certified drone pilot serving New Jersey.",
};

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">

      {/* Bio + photo */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <ScrollReveal animation="fadeLeft" duration={0.7}>
          <SectionHead eyebrow="About Us" title="Captured Aerial" />
          {bio.split("\n\n").map((para, i) => (
            <p key={i} className="leading-relaxed mt-5 text-base" style={{ color: "var(--muted)" }}>
              {para}
            </p>
          ))}
          <Link href="/contact" className="btn btn-green mt-8">
            Work With Us
          </Link>
        </ScrollReveal>

        <ScrollReveal animation="fadeRight" delay={0.15} duration={0.7}>
          <div className="w-full aspect-video overflow-hidden relative rounded-xl">
            <Image
              src="/images/portfolio/dji-aerial-hq.jpg"
              alt="Aerial drone shot"
              fill
              quality={90}
              sizes="(max-width: 1024px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Equipment */}
      <div className="mt-24">
        <ScrollReveal animation="fadeUp">
          <SectionHead title="What We Fly With" />
        </ScrollReveal>
        <ScrollStagger
          className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 mt-6"
          staggerDelay={0.08}
          delayStart={0.05}
        >
          {equipment.map((item) => (
            <StaggerItem key={item.name} animation="fadeUp">
              <div
                className="py-5 border-t"
                style={{ borderColor: "var(--border)" }}
              >
                <h3
                  className="text-[13px] font-extrabold uppercase tracking-[0.05em] mb-1.5"
                  style={{ color: "var(--text)" }}
                >
                  {item.name}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                  {item.description}
                </p>
              </div>
            </StaggerItem>
          ))}
        </ScrollStagger>
      </div>

    </div>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import SectionHead from "@/components/ui/SectionHead";
import PricingCard from "@/components/PricingCard";
import { ScrollReveal, ScrollStagger, StaggerItem } from "@/components/ui/scroll-reveal";
import { serviceTiers } from "@/data/services";

export const metadata: Metadata = {
  title: "Services & Pricing | Captured Aerial",
  description:
    "Transparent pricing for drone photography and videography — from single property listings to full commercial productions.",
};

const faqs = [
  {
    q: "Are you FAA certified?",
    a: "Yes. We hold an FAA Part 107 Remote Pilot Certificate, which is required for all commercial drone operations in the United States.",
  },
  {
    q: "What areas do you serve?",
    a: "We're based in New Jersey and serve the surrounding region. Travel fees may apply for shoots more than 30 miles away.",
  },
  {
    q: "What if the weather is bad on shoot day?",
    a: "We monitor conditions closely before every shoot. If weather is unsafe for flying, we'll reschedule at no charge.",
  },
  {
    q: "How do I receive the final files?",
    a: "Edited photos are delivered via an online gallery link within 48 hours. Videos are delivered via Google Drive or WeTransfer.",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-28 pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <ScrollReveal animation="fadeUp">
          <SectionHead
            eyebrow="Pricing"
            title="Simple, Transparent Rates"
            lede="FAA Part 107 certified. Edited within 48 hours. Serving New Jersey and surrounding areas."
            center
          />
        </ScrollReveal>

        <ScrollStagger
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-14"
          staggerDelay={0.14}
          delayStart={0.05}
        >
          {serviceTiers.map((tier) => (
            <StaggerItem key={tier.id} animation="scale">
              <PricingCard tier={tier} />
            </StaggerItem>
          ))}
        </ScrollStagger>

        <div className="mt-24">
          <ScrollReveal animation="fadeLeft">
            <SectionHead title="Common Questions" />
          </ScrollReveal>
          <ScrollStagger
            className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-x-12"
            staggerDelay={0.08}
            delayStart={0.05}
          >
            {faqs.map((faq) => (
              <StaggerItem key={faq.q} animation="fadeUp">
                <div
                  className="py-6 border-t"
                  style={{ borderColor: "var(--border)" }}
                >
                  <h3
                    className="font-bold mb-2 text-sm tracking-wide"
                    style={{ color: "var(--text)" }}
                  >
                    {faq.q}
                  </h3>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--muted)" }}>
                    {faq.a}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </ScrollStagger>
        </div>

        <ScrollReveal animation="scale" delay={0.1}>
          <div
            className="mt-16 text-center p-10 rounded-xl"
            style={{
              background: "linear-gradient(135deg, var(--brand) 0%, #1e4a10 100%)",
              boxShadow: "0 12px 40px rgba(45,97,25,0.30)",
            }}
          >
            <p
              style={{
                fontSize: 10,
                fontWeight: 800,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 12,
              }}
            >
              Not sure which package fits?
            </p>
            <h3
              style={{
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 900,
                textTransform: "uppercase",
                color: "#ffffff",
                marginBottom: 24,
              }}
            >
              Let&apos;s Talk About Your Project
            </h3>
            <Link href="/contact" className="btn btn-white">
              Get a Custom Quote
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </div>
  );
}

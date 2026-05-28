import type { Metadata } from "next";
import SectionHead from "@/components/ui/SectionHead";
import ContactForm from "@/components/ContactForm";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

export const metadata: Metadata = {
  title: "Book a Shoot | Captured Aerial",
  description:
    "Get in touch to book a drone photography or videography session for your property or project.",
};

export default function ContactPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 pt-28 pb-24">
      <ScrollReveal animation="fadeLeft" duration={0.7}>
        <SectionHead
          title="Book a Shoot"
          lede="Tell us your property, preferred date, and what you need. We confirm within 24 hours."
        />
      </ScrollReveal>

      <ScrollReveal animation="fadeUp" delay={0.18} duration={0.7}>
        <div className="glass-card mt-10 rounded-2xl p-8">
          <ContactForm />
        </div>
      </ScrollReveal>
    </div>
  );
}

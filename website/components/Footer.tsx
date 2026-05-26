import Image from "next/image";
import { Footer as FooterUI } from "@/components/ui/footer";

export default function Footer() {
  return (
    <FooterUI
      logo={
        <Image
          src="/logo-color.png"
          alt="Captured Aerial"
          width={140}
          height={89}
          className="h-12 w-auto"
        />
      }
      brandName="Captured Aerial"
      socialLinks={[]}
      mainLinks={[
        { href: "/portfolio", label: "Portfolio" },
        { href: "/services", label: "Services" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ]}
      legalLinks={[
        { href: "mailto:carteroberman0@gmail.com", label: "carteroberman0@gmail.com" },
        { href: "/contact", label: "FAA Part 107 Certified" },
      ]}
      copyright={{
        text: `© ${new Date().getFullYear()} Captured Aerial.`,
        license: "All rights reserved.",
      }}
    />
  );
}

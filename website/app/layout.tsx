import type { Metadata } from "next";
import { Montserrat, Cinzel } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { SiteBackground } from "@/components/SiteBackground";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const cinzel = Cinzel({
  variable: "--font-cinzel",
  subsets: ["latin"],
  weight: ["400", "600", "700", "900"],
});

export const metadata: Metadata = {
  title: "Captured Aerial | Real Estate Media",
  description:
    "FAA Part 107 certified drone photography and videography for real estate, commercial, and cinematic projects. New Jersey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${montserrat.variable} ${cinzel.variable}`}>
      <body>
        {/* Fixed animated path background — z-0, behind everything */}
        <SiteBackground />

        {/* Skip to main content — keyboard accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:text-sm focus:font-bold focus:rounded"
          style={{ background: "var(--brand)", color: "#fff" }}
        >
          Skip to main content
        </a>

        {/* Page content — z-10, above background */}
        <div className="relative z-10 flex flex-col min-h-screen">
          <Navbar />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}

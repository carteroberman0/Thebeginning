import type { Metadata } from "next";
import SectionHead from "@/components/ui/SectionHead";
import InteractiveBentoGallery from "@/components/ui/interactive-bento-gallery";
import VideoSection from "@/components/VideoSection";

export const metadata: Metadata = {
  title: "Portfolio | Captured Aerial",
  description: "Browse our aerial photography and videography portfolio — real estate, landscape, and commercial shoots across New Jersey.",
};

const mediaItems = [
  {
    id: 1,
    type: "image",
    title: "14 Cayuga Way — Aerial",
    desc: "Bird's-eye view of the full property and surrounding landscape.",
    url: "/images/portfolio/14-cayuga-aerial.jpg",
    span: "md:col-span-2 md:row-span-4 sm:col-span-2 sm:row-span-3",
  },
  {
    id: 2,
    type: "video",
    title: "14 Cayuga — Backyard Pan",
    desc: "Cinematic wide pan over the rear yard and pool.",
    url: "/videos/cayuga-pan.mp4",
    span: "md:col-span-2 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 3,
    type: "image",
    title: "14 Cayuga Way — Front",
    desc: "Low-angle front elevation showing curb appeal.",
    url: "/images/portfolio/14-cayuga-front.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 4,
    type: "image",
    title: "14 Cayuga Way — Rear",
    desc: "Backyard detail with landscaping and pool.",
    url: "/images/portfolio/14-cayuga-back.jpg",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 5,
    type: "video",
    title: "14 Cayuga — Reveal",
    desc: "Dramatic zoom-out reveal from rooftop to neighborhood.",
    url: "/videos/cayuga-zoom.mp4",
    span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 6,
    type: "image",
    title: "14 Cayuga Way — Garage",
    desc: "Rear elevation highlighting garage and driveway.",
    url: "/images/portfolio/14-cayuga-back2.jpg",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 7,
    type: "image",
    title: "11 Cayuga Way — Aerial",
    desc: "High-altitude overview of the neighborhood context.",
    url: "/images/portfolio/11-cayuga-aerial.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 8,
    type: "video",
    title: "Cayuga — Close Approach",
    desc: "Low and slow approach highlighting roofline detail.",
    url: "/videos/cayuga-close.mp4",
    span: "md:col-span-2 md:row-span-2 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 9,
    type: "image",
    title: "10 Cayuga Way — Front",
    desc: "Golden-hour front elevation with driveway.",
    url: "/images/portfolio/10-cayuga-front.jpg",
    span: "md:col-span-1 md:row-span-3 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 10,
    type: "image",
    title: "11 Cayuga Way — Front",
    desc: "Street-level perspective blended with aerial context.",
    url: "/images/portfolio/11-cayuga-front.jpg",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
  {
    id: 11,
    type: "image",
    title: "144 Goltra Drive — Aerial",
    desc: "Sweeping aerial front view of colonial with mature trees.",
    url: "/images/portfolio/144-goltra-front.jpg",
    span: "md:col-span-2 md:row-span-3 sm:col-span-2 sm:row-span-2",
  },
  {
    id: 12,
    type: "image",
    title: "DJI Aerial — Landscape",
    desc: "Wide-open landscape captured from 200 ft AGL.",
    url: "/images/portfolio/aerial-dji.jpg",
    span: "md:col-span-1 md:row-span-2 sm:col-span-1 sm:row-span-2",
  },
];

export default function PortfolioPage() {
  return (
    <div className="max-w-6xl mx-auto px-6 pt-28 pb-24">
      <SectionHead
        eyebrow="Our Work"
        title="Portfolio"
        lede="Real estate listings and cinematic flyovers — fully edited and delivered with precision."
      />

      <div className="mt-12 -mx-6">
        <InteractiveBentoGallery
          mediaItems={mediaItems}
          title="Gallery Shots Collection"
          description="Drag to rearrange · Click any shot to expand"
        />
      </div>

      <div className="mt-20">
        <SectionHead eyebrow="Video" title="Cinematic Reels" />
        <VideoSection />
      </div>
    </div>
  );
}

export type Category = "all" | "real-estate" | "aerial" | "commercial";

export interface PortfolioImage {
  id: string;
  src: string;
  alt: string;
  category: Category;
  width: number;
  height: number;
}

export interface PortfolioVideo {
  id: string;
  title: string;
  embedUrl: string;
}

export const portfolioImages: PortfolioImage[] = [
  {
    id: "14-cayuga-aerial",
    src: "/images/portfolio/14-cayuga-aerial-hq.jpg",
    alt: "Aerial view of 14 Cayuga Way",
    category: "real-estate",
    width: 1920,
    height: 1080,
  },
  {
    id: "11-cayuga-aerial",
    src: "/images/portfolio/11-cayuga-aerial-hq.jpg",
    alt: "Aerial view of 11 Cayuga Way",
    category: "aerial",
    width: 1920,
    height: 1080,
  },
  {
    id: "14-cayuga-front",
    src: "/images/portfolio/14-cayuga-front-hq.jpg",
    alt: "Front elevation of 14 Cayuga Way",
    category: "real-estate",
    width: 1920,
    height: 1080,
  },
  {
    id: "14-cayuga-back",
    src: "/images/portfolio/14-cayuga-back-hq.jpg",
    alt: "Rear view of 14 Cayuga Way",
    category: "real-estate",
    width: 1920,
    height: 1080,
  },
  {
    id: "14-cayuga-garage",
    src: "/images/portfolio/14-cayuga-garage-hq.jpg",
    alt: "Garage and rear of 14 Cayuga Way",
    category: "real-estate",
    width: 1920,
    height: 1080,
  },
  {
    id: "10-cayuga-front",
    src: "/images/portfolio/10-cayuga-front-hq.jpg",
    alt: "Front elevation of 10 Cayuga Way",
    category: "real-estate",
    width: 1920,
    height: 1080,
  },
  {
    id: "11-cayuga-front",
    src: "/images/portfolio/11-cayuga-front-hq.jpg",
    alt: "Front elevation of 11 Cayuga Way",
    category: "real-estate",
    width: 1920,
    height: 1080,
  },
  {
    id: "144-goltra-front",
    src: "/images/portfolio/144-goltra-front-hq.jpg",
    alt: "Aerial front view of 144 Goltra Drive",
    category: "real-estate",
    width: 1920,
    height: 1080,
  },
  {
    id: "dji-aerial",
    src: "/images/portfolio/dji-aerial-hq.jpg",
    alt: "DJI aerial landscape shot",
    category: "aerial",
    width: 1920,
    height: 1080,
  },
];

export const portfolioVideos: PortfolioVideo[] = [
  {
    id: "cayuga-zoom",
    title: "14 Cayuga Way — Reveal",
    embedUrl: "https://drive.google.com/file/d/1WDNYVQpzOV3s1K-VaXeF0_uhTNr2v6C-/preview",
  },
  {
    id: "cayuga-pan",
    title: "14 Cayuga Way — Backyard Pan",
    embedUrl: "https://drive.google.com/file/d/1uKHJkdZ1Xwq4lYuCEQsrBg7h34hTOY9u/preview",
  },
  {
    id: "church-shot",
    title: "Church — Cinematic Flyover",
    embedUrl: "https://drive.google.com/file/d/1AkIM6iNHcY_ChoBC19s_tSD7BaLOoNIK/preview",
  },
];

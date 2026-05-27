export interface ServiceTier {
  id: string;
  name: string;
  price: string;
  tagline: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

export const serviceTiers: ServiceTier[] = [
  {
    id: "essential",
    name: "Essential",
    price: "From $129",
    tagline: "Perfect for single-property listings",
    features: [
      "Up to 1 hour flight time",
      "20 edited aerial photos",
      "Online gallery delivery",
      "48-hour turnaround",
    ],
    cta: "Book Now",
  },
  {
    id: "professional",
    name: "Professional",
    price: "From $229",
    tagline: "Full coverage for real estate & events",
    features: [
      "Up to 3 hours flight time",
      "50 edited aerial photos",
      "4K video highlights reel",
      "Same-day rush available",
      "Multiple angles & altitudes",
    ],
    cta: "Book Now",
    highlighted: true,
  },
  {
    id: "premium",
    name: "Premium",
    price: "Custom Quote",
    tagline: "Multi-property and commercial shoots",
    features: [
      "Full day availability",
      "Unlimited edited photos",
      "Cinematic video production",
      "Priority scheduling",
      "RAW files included",
      "Dedicated post-production",
    ],
    cta: "Get a Quote",
  },
];

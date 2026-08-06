import productAi from "@/assets/product-ai.jpg";
import productHealth from "@/assets/product-health.jpg";
import productSoftware from "@/assets/product-software.jpg";
import type { FaqItem } from "@/data/reviews";

export interface ComparisonSide {
  name: string;
  price: string;
  rating: number;
  summary: string;
  pros: string[];
  cons: string[];
  /** Digistore24 product id for the affiliate CTA. */
  productId?: string;
}

export interface Comparison {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  updated: string;
  intro: string[];
  a: ComparisonSide;
  b: ComparisonSide;
  specs: { label: string; a: string; b: string }[];
  features: { label: string; a: boolean | string; b: boolean | string }[];
  performance: string[];
  price: string[];
  winner: { name: string; reason: string };
  faq: FaqItem[];
  /** Review slugs referenced by this comparison. */
  relatedReviews?: string[];
}

const faq = (a: string, b: string): FaqItem[] => [
  {
    question: `Which is better overall, ${a} or ${b}?`,
    answer: `Both are credible, but they optimise for different buyers. Our winner below reflects the option most readers should choose; the runner-up remains the better fit for the specific use case we describe.`,
  },
  {
    question: `Can I switch later if I pick the wrong one?`,
    answer: `Yes. Both vendors publish money-back guarantees, so trialling one and switching inside the refund window is realistic — check the current terms at checkout.`,
  },
  {
    question: `Is the more expensive option always the better value?`,
    answer: `No. In our scoring the cheaper option won on value for money; it simply covers fewer scenarios.`,
  },
];

export const comparisons: Comparison[] = [
  {
    slug: "vitalcore-vs-aurora-lean",
    title: "VitalCore vs AuroraLean: Which Metabolic Formula Wins in 2026?",
    excerpt:
      "Two of the most searched metabolic support products, compared on ingredients, dosing, results and price.",
    category: "health-supplements",
    image: productHealth,
    updated: "2026-07-12",
    intro: [
      "We ran both products through the same 90-day protocol with separate tester panels, then compared the label, the dosing and the real-world outcome.",
      "This comparison covers specifications, features, performance, pricing and who each product actually suits.",
    ],
    a: {
      name: "VitalCore Metabolic Support",
      price: "$69 / bottle",
      rating: 4.6,
      summary: "A fully disclosed capsule formula with clinically referenced dosing and a 180-day guarantee.",
      pros: ["Transparent label", "Clinical dosing", "180-day refund window"],
      cons: ["Best price only on bundles", "Takes six weeks to judge"],
    },
    b: {
      name: "AuroraLean Thermo Drops",
      price: "$59 / bottle",
      rating: 4.2,
      summary: "A liquid thermogenic that acts faster on energy but discloses less about its blend.",
      pros: ["Noticeable energy lift", "Lower entry price", "Easy to dose"],
      cons: ["Proprietary blend", "Shorter 60-day guarantee"],
    },
    specs: [
      { label: "Format", a: "Capsule", b: "Liquid drops" },
      { label: "Label transparency", a: "Fully disclosed", b: "Proprietary blend" },
      { label: "Daily cost", a: "$2.30", b: "$1.97" },
      { label: "Guarantee", a: "180 days", b: "60 days" },
      { label: "Third-party tested", a: "Yes", b: "Not published" },
      { label: "Our rating", a: "4.6 / 5", b: "4.2 / 5" },
    ],
    features: [
      { label: "Full ingredient disclosure", a: true, b: false },
      { label: "Stimulant free", a: true, b: false },
      { label: "Bundle discounts", a: true, b: true },
      { label: "Subscription option", a: "Optional", b: "Required for best price" },
      { label: "Independent lab reports", a: true, b: false },
    ],
    performance: [
      "VitalCore produced the steadier result: gains built from week six and held through the end of the test window, with fewer reports of afternoon energy dips.",
      "AuroraLean was faster out of the gate — testers noticed an energy change inside the first week — but the effect plateaued sooner and was harder to attribute without a disclosed label.",
    ],
    price: [
      "Per day, AuroraLean is cheaper at $1.97 against $2.30, and its entry price is lower.",
      "Over a full 90-day cycle the gap narrows once VitalCore's bundle pricing is applied, and the 180-day guarantee means a failed trial costs nothing.",
    ],
    winner: {
      name: "VitalCore Metabolic Support",
      reason:
        "It wins on the two things that decide outcomes here — disclosed clinical dosing and a refund window long enough to actually evaluate results. Choose AuroraLean only if you want a fast energy effect at the lowest upfront price.",
    },
    faq: faq("VitalCore", "AuroraLean"),
    relatedReviews: ["vitalcore-metabolic-support"],
  },
  {
    slug: "pixelforge-vs-nova-writer",
    title: "PixelForge AI vs NovaWriter: Which AI Tool Earns Its Subscription?",
    excerpt:
      "A head-to-head of two AI platforms — output quality, workflow speed, learning curve and true monthly cost.",
    category: "ai-tools",
    image: productAi,
    updated: "2026-07-01",
    intro: [
      "We ran identical briefs through both platforms for a month and scored output quality, iteration speed and how much editing each result needed.",
      "Below: specifications, feature coverage, performance, price and a clear winner.",
    ],
    a: {
      name: "PixelForge AI Designer",
      price: "$39 / month",
      rating: 4.5,
      summary: "Visual-first platform with the strongest brand-consistency controls we have tested.",
      pros: ["Excellent brand kit controls", "Fast iteration", "Generous export options"],
      cons: ["Weaker long-form text", "Steeper first week"],
    },
    b: {
      name: "NovaWriter Suite",
      price: "$29 / month",
      rating: 4.3,
      summary: "Text-first suite that produces cleaner drafts with less prompt engineering.",
      pros: ["Best-in-class drafts", "Simple interface", "Cheaper entry tier"],
      cons: ["Basic image tooling", "Limited team features"],
    },
    specs: [
      { label: "Primary strength", a: "Visual design", b: "Long-form text" },
      { label: "Entry price", a: "$39 / month", b: "$29 / month" },
      { label: "Seats included", a: "3", b: "1" },
      { label: "Export formats", a: "12", b: "5" },
      { label: "Free trial", a: "7 days", b: "14 days" },
      { label: "Our rating", a: "4.5 / 5", b: "4.3 / 5" },
    ],
    features: [
      { label: "Brand kit / style memory", a: true, b: false },
      { label: "Long-form drafting", a: "Basic", b: true },
      { label: "Team collaboration", a: true, b: false },
      { label: "API access", a: true, b: "Higher tier only" },
      { label: "Commercial licence", a: true, b: true },
    ],
    performance: [
      "PixelForge needed the fewest revisions on visual briefs and held brand consistency across a 20-asset batch without manual correction.",
      "NovaWriter produced publishable first drafts more often, cutting editing time on written work by roughly a third compared with PixelForge.",
    ],
    price: [
      "NovaWriter is $10 a month cheaper, but PixelForge includes three seats where NovaWriter includes one.",
      "For a team of two or more, PixelForge is the cheaper option in practice despite the higher sticker price.",
    ],
    winner: {
      name: "PixelForge AI Designer",
      reason:
        "It covers more of a real content workflow and scales to a team without extra cost. Solo writers who only need text should save the money and take NovaWriter.",
    },
    relatedReviews: [],
    faq: faq("PixelForge", "NovaWriter"),
  },
  {
    slug: "vantage-16-pro-vs-titan-18-ultra",
    title: "Vantage 16 Pro vs Titan 18 Ultra: Which Gaming Laptop Should You Buy?",
    excerpt:
      "Frame rates, thermals, portability and price compared between the mid-flagship and the desktop replacement.",
    category: "electronics",
    image: productSoftware,
    updated: "2026-06-30",
    intro: [
      "Both machines target serious gaming, but only one makes sense for the majority of buyers. We benchmarked them side by side over three weeks.",
      "Specifications, features, performance and pricing are compared below, followed by our verdict.",
    ],
    a: {
      name: "Vantage 16 Pro",
      price: "$1,899",
      rating: 4.6,
      summary: "The best sustained performance per dollar in the category, with excellent cooling.",
      pros: ["Holds clocks under load", "165 Hz colour-accurate screen", "Reasonable weight"],
      cons: ["Fan noise at full load"],
    },
    b: {
      name: "Titan 18 Ultra",
      price: "$2,899",
      rating: 4.5,
      summary: "Raw peak performance and an enormous screen, at the cost of portability and price.",
      pros: ["Fastest peak frame rates", '18" 240 Hz display'],
      cons: ["3.3 kg", "Poor battery life", "$1,000 more"],
    },
    specs: [
      { label: "Display", a: '16" 165 Hz', b: '18" 240 Hz' },
      { label: "Weight", a: "2.4 kg", b: "3.3 kg" },
      { label: "Battery (mixed use)", a: "5 h 40 m", b: "3 h 05 m" },
      { label: "Peak load noise", a: "48 dB", b: "52 dB" },
      { label: "Price", a: "$1,899", b: "$2,899" },
      { label: "Our rating", a: "4.6 / 5", b: "4.5 / 5" },
    ],
    features: [
      { label: "User-upgradeable RAM", a: true, b: true },
      { label: "Per-key RGB", a: false, b: true },
      { label: "Thunderbolt ports", a: "2", b: "2" },
      { label: "Mechanical keyboard", a: false, b: true },
      { label: "Sustained clocks under load", a: true, b: "Throttles slightly" },
    ],
    performance: [
      "In 30-minute sustained runs the Vantage stayed within 4% of its opening frame rate; the Titan started higher but drifted 9% as temperatures rose.",
      "For short benchmark bursts the Titan wins outright. For long sessions the gap effectively closes.",
    ],
    price: [
      "The Titan costs $1,000 more for a peak advantage most players will not notice after the first ten minutes of play.",
      "That $1,000 buys a very good monitor and peripherals if paired with the Vantage instead.",
    ],
    winner: {
      name: "Vantage 16 Pro",
      reason:
        "It delivers the performance that actually persists through a gaming session for a third less money. The Titan 18 Ultra is only the right call if you want a desktop replacement and never move it.",
    },
    relatedReviews: [],
    faq: faq("Vantage 16 Pro", "Titan 18 Ultra"),
  },
];

export const getComparison = (slug: string) => comparisons.find((c) => c.slug === slug);
export const comparisonsByCategory = (slug: string) =>
  comparisons.filter((c) => c.category === slug);
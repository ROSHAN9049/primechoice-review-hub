import productAi from "@/assets/product-ai.jpg";
import productEducation from "@/assets/product-education.jpg";
import productFitness from "@/assets/product-fitness.jpg";
import productSoftware from "@/assets/product-software.jpg";
import productVision from "@/assets/product-vision.jpg";
import type { FaqItem } from "@/data/reviews";

export interface GuidePick {
  name: string;
  badge: string;
  rating: number;
  price: string;
  why: string;
  pros: string[];
  cons: string[];
  productId?: string;
}

export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface Guide {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  updated: string;
  intro: string[];
  picks: GuidePick[];
  specColumns: string[];
  specRows: string[][];
  buyingGuide: GuideSection[];
  faq: FaqItem[];
  recommendation: string;
}

const genericFaq = (topic: string): FaqItem[] => [
  {
    question: `How did you choose the best ${topic}?`,
    answer: `We shortlist products on published specifications, then score each one on performance, build quality, ease of use and value using the same rubric across the category. Every pick is bought at retail price.`,
  },
  {
    question: `How often is this ${topic} guide updated?`,
    answer: `We re-check pricing monthly and re-test the full shortlist whenever a significant new release lands, which is typically two to three times a year.`,
  },
  {
    question: `Do you earn money from these recommendations?`,
    answer: `Yes — some links are affiliate links and we may earn a commission at no extra cost to you. Rankings are decided before any commercial relationship is considered.`,
  },
  {
    question: `Is the cheapest option ever the right choice?`,
    answer: `Sometimes. Our budget pick exists because for a large share of buyers the extra spend on a flagship does not translate into real day-to-day benefit.`,
  },
];

const guideSections = (topic: string): GuideSection[] => [
  {
    id: "what-matters",
    heading: "What actually matters when buying",
    paragraphs: [
      `Specification sheets in the ${topic} category are written to sell, not to inform. We weight the handful of attributes that changed our score in testing and ignore numbers that never surfaced in real use.`,
      `Start with how you will use the product weekly, then work backwards to the shortest list of features that supports it. Most buyers overspend on capability they never touch.`,
    ],
  },
  {
    id: "budget",
    heading: "How much you should spend",
    paragraphs: [
      `There is a clear value plateau in this category: above it you pay a premium for marginal gains, below it reliability starts to suffer. Our mid-priced pick sits deliberately at that plateau.`,
      `Factor in the total cost of ownership — subscriptions, consumables, replacement parts — rather than only the headline price.`,
    ],
  },
  {
    id: "mistakes",
    heading: "Common mistakes to avoid",
    paragraphs: [
      `Buying on discount alone is the most common error we see. A heavily reduced product that does not fit your use case is not a saving.`,
      `Second: ignoring the returns window. Always confirm the guarantee period and buy from the official seller so it remains valid.`,
    ],
  },
];

function makeGuide(
  slug: string,
  title: string,
  excerpt: string,
  category: string,
  image: string,
  updated: string,
  topic: string,
  picks: GuidePick[],
  specColumns: string[],
  specRows: string[][],
  recommendation: string,
): Guide {
  return {
    slug,
    title,
    excerpt,
    category,
    image,
    updated,
    intro: [
      `We tested and scored the leading options so you can skip the research. Every product below was assessed on the same criteria: performance, build quality, ease of use and value for money.`,
      `Prices were last verified on ${new Date(updated).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}. Our top pick is the one we would buy with our own money today.`,
    ],
    picks,
    specColumns,
    specRows,
    buyingGuide: guideSections(topic),
    faq: genericFaq(topic),
    recommendation,
  };
}

const pick = (
  name: string,
  badge: string,
  rating: number,
  price: string,
  why: string,
  pros: string[],
  cons: string[],
): GuidePick => ({ name, badge, rating, price, why, pros, cons });

export const guides: Guide[] = [
  makeGuide(
    "best-wireless-earbuds-2026",
    "Best Wireless Earbuds in 2026: Tested & Ranked",
    "We tested the leading wireless earbuds for sound, noise cancelling, comfort and battery life. Here are the five worth buying in 2026.",
    "electronics",
    productAi,
    "2026-07-18",
    "wireless earbuds",
    [
      pick("AuricPro Studio 3", "Best overall", 4.7, "$229", "The most balanced pair we tested: strong active noise cancelling, natural tuning and eight-hour battery.", ["Excellent noise cancelling", "Comfortable over long sessions", "Reliable multipoint pairing"], ["Premium price", "Case is bulky"]),
      pick("NovaSound Air Lite", "Best value", 4.4, "$89", "Roughly 85% of the flagship experience for well under half the money.", ["Outstanding price to performance", "Light, secure fit"], ["Noise cancelling is average", "No wireless charging"]),
      pick("Kestrel Active Fit", "Best for sport", 4.3, "$139", "Wing-tip design that stayed put through every run and gym session in testing.", ["Never moved during exercise", "IP68 water resistance"], ["Bass-forward tuning", "Muffled call quality outdoors"]),
      pick("Lumen Quiet Max", "Best noise cancelling", 4.5, "$259", "The quietest pair on a commute, at the cost of some battery life.", ["Class-leading ANC", "Excellent app controls"], ["Shortest battery in the group", "Heavier in the ear"]),
      pick("Ember Basic 2", "Best budget", 4.0, "$49", "A genuinely decent everyday pair if you do not need noise cancelling.", ["Very affordable", "Simple, reliable pairing"], ["Plastic build", "No ANC"]),
    ],
    ["Model", "Price", "Rating", "Battery", "ANC"],
    [
      ["AuricPro Studio 3", "$229", "4.7", "8 h + 24 h case", "Excellent"],
      ["NovaSound Air Lite", "$89", "4.4", "7 h + 21 h case", "Average"],
      ["Kestrel Active Fit", "$139", "4.3", "9 h + 27 h case", "Good"],
      ["Lumen Quiet Max", "$259", "4.5", "6 h + 18 h case", "Class-leading"],
      ["Ember Basic 2", "$49", "4.0", "5 h + 15 h case", "None"],
    ],
    "For most people the AuricPro Studio 3 is the right buy — it wins on the criteria that matter every day. If your budget is tighter, the NovaSound Air Lite is the smarter purchase and we would not talk anyone out of it.",
  ),
  makeGuide(
    "best-gaming-laptops",
    "Best Gaming Laptops in 2026: Performance per Dollar Ranked",
    "Frame rates, thermals, screen quality and battery life compared across the gaming laptops worth buying this year.",
    "electronics",
    productSoftware,
    "2026-07-04",
    "gaming laptops",
    [
      pick("Vantage 16 Pro", "Best overall", 4.6, "$1,899", "The best thermals in its class, which is why it holds frame rates other machines cannot.", ["Sustained performance under load", "Superb 165 Hz display"], ["Heavy", "Loud under full load"]),
      pick("Strata 15 Air", "Best portable", 4.3, "$1,349", "The one to buy if it has to fit in a backpack every day.", ["Under 2 kg", "Strong battery for the category"], ["Thermal throttling in long sessions"]),
      pick("Forge Value 15", "Best value", 4.4, "$1,099", "Delivers high-refresh 1080p gaming without the flagship tax.", ["Excellent price to frame rate", "Easy to upgrade"], ["Basic chassis", "Dim screen outdoors"]),
      pick("Titan 18 Ultra", "Best high-end", 4.5, "$2,899", "Desktop-replacement power for people who never move the machine.", ["Fastest results in every test", "Huge, colour-accurate screen"], ["Very expensive", "Poor battery life"]),
    ],
    ["Model", "Price", "Rating", "Display", "Weight"],
    [
      ["Vantage 16 Pro", "$1,899", "4.6", '16" 165 Hz', "2.4 kg"],
      ["Strata 15 Air", "$1,349", "4.3", '15" 144 Hz', "1.9 kg"],
      ["Forge Value 15", "$1,099", "4.4", '15" 144 Hz', "2.2 kg"],
      ["Titan 18 Ultra", "$2,899", "4.5", '18" 240 Hz', "3.3 kg"],
    ],
    "The Vantage 16 Pro is the pick for most gamers. Buy the Forge Value 15 instead if you play mainly at 1080p — the money saved is better spent elsewhere.",
  ),
  makeGuide(
    "best-smart-watches",
    "Best Smart Watches in 2026: Health Tracking Compared",
    "We wore each smart watch for four weeks and compared heart-rate accuracy, sleep tracking, battery life and app quality.",
    "health-fitness",
    productFitness,
    "2026-06-22",
    "smart watches",
    [
      pick("Pulse One 5", "Best overall", 4.6, "$349", "The most accurate heart-rate and sleep data of anything we tested.", ["Accurate sensors", "Polished companion app"], ["Charges every two days"]),
      pick("Trailmark GPS", "Best for outdoors", 4.4, "$279", "Two-week battery and the best GPS lock in the group.", ["Exceptional battery life", "Rugged case"], ["Basic smart features"]),
      pick("Lite Band 4", "Best budget", 4.1, "$99", "Covers steps, sleep and notifications without the flagship price.", ["Very cheap", "Light and comfortable"], ["Less accurate at high heart rates"]),
    ],
    ["Model", "Price", "Rating", "Battery", "GPS"],
    [
      ["Pulse One 5", "$349", "4.6", "2 days", "Dual-band"],
      ["Trailmark GPS", "$279", "4.4", "14 days", "Dual-band"],
      ["Lite Band 4", "$99", "4.1", "9 days", "Phone-linked"],
    ],
    "Buy the Pulse One 5 if health data accuracy is the point. If you hike or run long distances, the Trailmark GPS is the better tool.",
  ),
  makeGuide(
    "best-budget-smartphones",
    "Best Budget Smartphones in 2026: Under $400 Tested",
    "Cameras, battery life, screen quality and software support compared across the best sub-$400 smartphones of 2026.",
    "electronics",
    productVision,
    "2026-06-09",
    "budget smartphones",
    [
      pick("Aster 12", "Best overall", 4.5, "$379", "Flagship-adjacent camera processing and four years of security updates.", ["Best camera under $400", "Long software support"], ["Slow charging"]),
      pick("Corevo Neo", "Best battery", 4.3, "$299", "Two full days of use, every time, in our testing.", ["Enormous battery", "Bright display"], ["Average low-light camera"]),
      pick("Mint Go 3", "Best under $200", 4.0, "$189", "Clean software and no bloat at a genuinely low price.", ["Excellent price", "No preinstalled clutter"], ["Plastic frame", "Basic camera"]),
    ],
    ["Model", "Price", "Rating", "Battery", "Updates"],
    [
      ["Aster 12", "$379", "4.5", "4,800 mAh", "4 years"],
      ["Corevo Neo", "$299", "4.3", "6,000 mAh", "3 years"],
      ["Mint Go 3", "$189", "4.0", "5,000 mAh", "2 years"],
    ],
    "The Aster 12 is the best budget smartphone overall thanks to its camera and long update commitment. Choose the Corevo Neo if battery life outranks everything else.",
  ),
  makeGuide(
    "best-home-appliances",
    "Best Home Appliances in 2026: Kitchen Essentials Tested",
    "The appliances that earned their counter space — tested for reliability, running cost, noise and everyday usability.",
    "home-kitchen",
    productEducation,
    "2026-05-27",
    "home appliances",
    [
      pick("Everhome Air Fry Pro", "Best overall", 4.6, "$189", "Fast, even cooking and the easiest cleaning of anything we tested.", ["Even heat distribution", "Dishwasher-safe basket"], ["Takes real counter space"]),
      pick("Quietwash 9", "Best dishwasher", 4.4, "$649", "Genuinely quiet and efficient on both water and electricity.", ["Very low noise", "Low running cost"], ["Long standard cycle"]),
      pick("Brewline Compact", "Best value", 4.2, "$119", "A small-footprint coffee machine that consistently outperforms its price.", ["Small footprint", "Consistent results"], ["Small water tank"]),
    ],
    ["Model", "Price", "Rating", "Warranty", "Running cost"],
    [
      ["Everhome Air Fry Pro", "$189", "4.6", "2 years", "Low"],
      ["Quietwash 9", "$649", "4.4", "5 years", "Very low"],
      ["Brewline Compact", "$119", "4.2", "1 year", "Medium"],
    ],
    "Start with the Everhome Air Fry Pro — it is the appliance our testers kept using after the review ended, which is the strongest signal we have.",
  ),
];

export const getGuide = (slug: string) => guides.find((g) => g.slug === slug);
export const guidesByCategory = (slug: string) => guides.filter((g) => g.category === slug);
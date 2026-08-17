export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  affiliateUrl?: string;
}

const fallbackCategories: Category[] = [
  {
    slug: "health-supplements",
    name: "Health & Supplements",
    description: "Evidence-checked supplements, ingredient breakdowns and safety notes.",
    icon: "HeartPulse",
  },
  {
    slug: "ai-tools",
    name: "AI Tools",
    description: "Hands-on tests of AI writing, image, video and automation platforms.",
    icon: "Sparkles",
  },
  {
    slug: "software",
    name: "Software",
    description: "Productivity, marketing and business software compared feature by feature.",
    icon: "MonitorSmartphone",
  },
  {
    slug: "finance",
    name: "Finance",
    description: "Trading, budgeting and passive-income programs assessed for real value.",
    icon: "LineChart",
  },
  {
    slug: "education",
    name: "Education",
    description: "Online courses and certifications rated on outcomes, not hype.",
    icon: "GraduationCap",
  },
  {
    slug: "mens-health",
    name: "Men's Health",
    description: "Performance, prostate and hormone support products under the microscope.",
    icon: "Shield",
  },
  {
    slug: "weight-loss",
    name: "Weight Loss",
    description: "Metabolism, appetite and body-composition programs that actually hold up.",
    icon: "Flame",
  },
  {
    slug: "vision",
    name: "Vision",
    description: "Eye-health formulas and screen-strain solutions reviewed in depth.",
    icon: "Eye",
  },
  {
    slug: "fitness",
    name: "Fitness",
    description: "Training programs, gear and recovery tools tested over real training blocks.",
    icon: "Dumbbell",
  },
  {
    slug: "electronics",
    name: "Electronics",
    description: "Audio, wearables, smart home and everyday tech put through real-world use.",
    icon: "Cpu",
  },
  {
    slug: "home-kitchen",
    name: "Home & Kitchen",
    description: "Appliances, cookware and home essentials judged on durability and value.",
    icon: "CookingPot",
  },
  {
    slug: "health-fitness",
    name: "Health & Fitness",
    description: "Trackers, recovery gear and wellness devices measured against real data.",
    icon: "Activity",
  },
  {
    slug: "beauty",
    name: "Beauty",
    description: "Skincare, haircare and grooming products reviewed on ingredients and results.",
    icon: "Sparkle",
    affiliateUrl: "https://www.amazon.in/gp/browse.html?node=1355016031&ref_=nav_em_sbc_bhg_beauty_all_0_2_13_2&tag=rehanroshan08-21",
  },
  {
    slug: "sports",
    name: "Sports",
    description: "Outdoor and team-sport equipment tested across full seasons of use.",
    icon: "Trophy",
    affiliateUrl: "https://www.amazon.in/s?k=sports+bra+for+women&crid=55KVH7UYG7CS&sprefix=Sport%2Caps%2C432&ref=nb_sb_ss_mvt-t11-ranker_2_5&tag=rehanroshan08-21",
  },
  {
    slug: "office",
    name: "Office",
    description: "Desks, chairs, printers and workspace tools rated for daily comfort.",
    icon: "Briefcase",
  },
  {
    slug: "fashion",
    name: "Fashion",
    description: "Everyday apparel, footwear and accessories checked for fit and longevity.",
    icon: "Shirt",
    affiliateUrl: "https://www.amazon.in/gp/goldbox/all-deals/?ie=UTF8&ref_=sv_gb_1&tag=rehanroshan08-21&discounts-widget=%2522%257B%255C%2522state%255C%2522%253A%257B%255C%2522refinementFilters%255C%2522%253A%257B%255C%2522departments%255C%2522%253A%255B%255C%25226648218031%255C%2522%255D%257D%257D%252C%255C%2522version%255C%2522%253A1%257D%2522",
  },
  {
    slug: "baby",
    name: "Baby",
    description: "Strollers, monitors and nursery gear assessed for safety and practicality.",
    icon: "Baby",
  },
  {
    slug: "automotive",
    name: "Automotive",
    description: "Car care, accessories and in-vehicle tech tested on the road.",
    icon: "Car",
    affiliateUrl: "https://www.amazon.in/s?k=Automotive+Car+care%2C+accessories&crid=9OESSV5MUQ23&sprefix=automotive+car+care%2C+accessories+%2Caps%2C673&ref=nb_sb_noss&tag=rehanroshan08-21",
  },
  {
    slug: "pet-supplies",
    name: "Pet Supplies",
    description: "Food, gear and health products reviewed with real pets over weeks.",
    icon: "PawPrint",
  },
];

let registry: Category[] = fallbackCategories;

export const categories: Category[] = new Proxy([] as Category[], {
  get: (_t, prop, receiver) => Reflect.get(registry, prop, receiver),
  has: (_t, prop) => Reflect.has(registry, prop),
  ownKeys: () => Reflect.ownKeys(registry),
  getOwnPropertyDescriptor: (_t, prop) => {
    const d = Reflect.getOwnPropertyDescriptor(registry, prop);
    return d ? { ...d, configurable: true } : d;
  },
}) as Category[];

export function setCategories(next: Category[]) {
  if (next.length > 0) registry = next;
}

export const getCategory = (slug: string) => registry.find((c) => c.slug === slug);

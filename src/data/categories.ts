export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
}

export const categories: Category[] = [
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
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);
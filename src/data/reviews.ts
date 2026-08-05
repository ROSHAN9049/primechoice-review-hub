import productHealth from "@/assets/product-health.jpg";
import productSoftware from "@/assets/product-software.jpg";
import productFinance from "@/assets/product-finance.jpg";
import productFitness from "@/assets/product-fitness.jpg";
import productEducation from "@/assets/product-education.jpg";
import productVision from "@/assets/product-vision.jpg";
import productAi from "@/assets/product-ai.jpg";
import productWeight from "@/assets/product-weight.jpg";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ComparisonRow {
  name: string;
  price: string;
  rating: number;
  highlight: string;
  guarantee: string;
}

export interface Review {
  slug: string;
  title: string;
  product: string;
  vendor: string;
  category: string;
  image: string;
  excerpt: string;
  summary: string[];
  rating: number;
  scores: { label: string; value: number }[];
  pros: string[];
  cons: string[];
  features: { title: string; description: string }[];
  pricing: { plan: string; price: string; detail: string; best?: boolean }[];
  faq: FaqItem[];
  comparison: ComparisonRow[];
  /** Digistore24 product id — leave undefined to use the placeholder link. */
  productId?: string;
  featured?: boolean;
  updated: string;
}

export const reviews: Review[] = [
  {
    slug: "vitalcore-metabolic-support",
    title: "VitalCore Metabolic Support Review 2026: Does It Really Work?",
    product: "VitalCore Metabolic Support",
    vendor: "VitalCore Labs",
    category: "health-supplements",
    image: productHealth,
    excerpt:
      "A 90-day test of VitalCore's metabolic formula — ingredient dosing, real results and whether the price is justified.",
    summary: [
      "VitalCore is a daily metabolic support capsule built around berberine, chromium and green tea extract at clinically referenced doses.",
      "Across our 90-day panel test, testers reported steadier energy and reduced afternoon cravings, with the clearest results from week six onward.",
      "It is not a miracle pill: results tracked closely with sleep quality and protein intake. As a supporting tool, though, it is one of the better-formulated options in this price band.",
    ],
    rating: 4.6,
    scores: [
      { label: "Effectiveness", value: 4.6 },
      { label: "Ingredient quality", value: 4.8 },
      { label: "Value for money", value: 4.3 },
      { label: "Support & refunds", value: 4.7 },
    ],
    pros: [
      "Transparent, fully disclosed ingredient label",
      "Clinically referenced dosages, not fairy dust",
      "Third-party tested in a GMP facility",
      "180-day money-back guarantee",
    ],
    cons: ["Best value only on multi-bottle bundles", "Requires 6+ weeks for noticeable results"],
    features: [
      { title: "Clinical dosing", description: "Each capsule matches doses used in published trials rather than trace amounts." },
      { title: "Third-party tested", description: "Every batch is verified for purity and heavy metals by an independent lab." },
      { title: "Stimulant free", description: "No jitters, no crash — safe to stack with your morning coffee." },
      { title: "180-day guarantee", description: "One of the longest refund windows available in this category." },
    ],
    pricing: [
      { plan: "1 Bottle", price: "$69", detail: "30-day supply + standard shipping" },
      { plan: "3 Bottles", price: "$177", detail: "$59 per bottle, free shipping", best: true },
      { plan: "6 Bottles", price: "$294", detail: "$49 per bottle, free shipping + bonuses" },
    ],
    faq: [
      { question: "How long until I see results?", answer: "Most testers noticed changes in energy within 2–3 weeks and body-composition changes from week six." },
      { question: "Is VitalCore safe?", answer: "It is produced in a GMP-certified facility and third-party tested. Speak to your doctor if you take prescription medication." },
      { question: "Is there a refund policy?", answer: "Yes — 180 days, including on empty bottles, handled directly by the vendor." },
    ],
    comparison: [
      { name: "VitalCore Metabolic", price: "$59/bottle", rating: 4.6, highlight: "Best overall dosing", guarantee: "180 days" },
      { name: "LeanEdge Daily", price: "$49/bottle", rating: 4.1, highlight: "Budget option", guarantee: "60 days" },
      { name: "ThermoPrime X", price: "$79/bottle", rating: 3.9, highlight: "Stimulant heavy", guarantee: "90 days" },
    ],
    featured: true,
    updated: "2026-07-14",
  },
  {
    slug: "neuroflow-ai-writer",
    title: "NeuroFlow AI Writer Review: The Best Value AI Suite in 2026?",
    product: "NeuroFlow AI Writer",
    vendor: "NeuroFlow",
    category: "ai-tools",
    image: productSoftware,
    excerpt:
      "We ran 120 real content briefs through NeuroFlow to see how its output, SEO tooling and pricing compare to the big names.",
    summary: [
      "NeuroFlow bundles long-form writing, SEO briefs, image generation and a light workflow builder into one dashboard.",
      "Output quality on long-form articles was consistently strong, and the built-in brief generator saved roughly 40 minutes per piece.",
      "Teams needing deep API access will still outgrow it, but for solo creators and small agencies the value is hard to beat.",
    ],
    rating: 4.8,
    scores: [
      { label: "Output quality", value: 4.8 },
      { label: "Ease of use", value: 4.9 },
      { label: "Value for money", value: 4.8 },
      { label: "Support", value: 4.4 },
    ],
    pros: [
      "Excellent long-form output with citations",
      "SEO brief builder included at no extra cost",
      "Unlimited words on all paid plans",
      "One-time lifetime option available",
    ],
    cons: ["API access limited on the entry plan", "No native team permissions yet"],
    features: [
      { title: "Unlimited generation", description: "No word caps or credit anxiety on any paid tier." },
      { title: "SEO brief builder", description: "Pulls SERP data and builds an outline before writing a single word." },
      { title: "Brand voice training", description: "Upload past content and it mirrors your tone convincingly." },
      { title: "Multi-language", description: "Publishes natively in 29 languages including UK and US English variants." },
    ],
    pricing: [
      { plan: "Starter", price: "$29/mo", detail: "1 seat, unlimited words" },
      { plan: "Pro", price: "$59/mo", detail: "3 seats, SEO suite, API", best: true },
      { plan: "Lifetime", price: "$497", detail: "One-time payment, Pro features forever" },
    ],
    faq: [
      { question: "Does NeuroFlow pass AI detection?", answer: "In our tests the humanizer mode passed most common detectors, but always edit and fact-check before publishing." },
      { question: "Can I cancel anytime?", answer: "Yes, monthly plans cancel in one click from the billing dashboard." },
      { question: "Is the lifetime deal worth it?", answer: "It pays for itself in roughly nine months versus the Pro plan." },
    ],
    comparison: [
      { name: "NeuroFlow AI Writer", price: "$59/mo", rating: 4.8, highlight: "Best value suite", guarantee: "30 days" },
      { name: "CopyPeak", price: "$99/mo", rating: 4.4, highlight: "Best for teams", guarantee: "14 days" },
      { name: "WriteGenie", price: "$39/mo", rating: 3.8, highlight: "Cheapest", guarantee: "7 days" },
    ],
    featured: true,
    updated: "2026-07-22",
  },
  {
    slug: "profit-compass-trading-course",
    title: "Profit Compass Review: An Honest Look at This Trading Program",
    product: "Profit Compass",
    vendor: "Compass Education",
    category: "finance",
    image: productFinance,
    excerpt:
      "We enrolled, completed all 42 lessons and stress-tested the strategy on paper for eight weeks. Here is what we found.",
    summary: [
      "Profit Compass is a structured swing-trading curriculum aimed at beginners with an emphasis on risk management first.",
      "The teaching quality is genuinely good, and the position-sizing modules alone are worth the entry price.",
      "Income claims in the marketing are optimistic — treat this as education, not a guaranteed income system.",
    ],
    rating: 4.2,
    scores: [
      { label: "Teaching quality", value: 4.6 },
      { label: "Realistic expectations", value: 3.7 },
      { label: "Value for money", value: 4.3 },
      { label: "Community", value: 4.2 },
    ],
    pros: [
      "Risk management taught before strategy",
      "Clear, well-produced 42-lesson curriculum",
      "Active moderated community",
      "Lifetime access with free updates",
    ],
    cons: ["Marketing overstates typical results", "Upsells appear during checkout"],
    features: [
      { title: "42 core lessons", description: "Structured from market basics through to a complete trading plan." },
      { title: "Trade journal templates", description: "Spreadsheets and review frameworks you can use immediately." },
      { title: "Weekly live sessions", description: "Market breakdowns hosted by the lead instructor." },
      { title: "Lifetime updates", description: "Curriculum refreshes are included at no extra charge." },
    ],
    pricing: [
      { plan: "Core", price: "$297", detail: "Full curriculum, lifetime access", best: true },
      { plan: "Core + Mentorship", price: "$697", detail: "Adds 6 group mentoring calls" },
    ],
    faq: [
      { question: "Do I need prior experience?", answer: "No. The first eight lessons assume zero background knowledge." },
      { question: "How much capital do I need?", answer: "The program recommends paper trading first, then starting small — under $1,000." },
      { question: "Is there a refund?", answer: "Yes, a 60-day refund window applies through the vendor." },
    ],
    comparison: [
      { name: "Profit Compass", price: "$297", rating: 4.2, highlight: "Best for beginners", guarantee: "60 days" },
      { name: "MarketMind Pro", price: "$997", rating: 4.0, highlight: "Advanced strategies", guarantee: "30 days" },
      { name: "TradeStart 101", price: "$97", rating: 3.5, highlight: "Cheapest intro", guarantee: "30 days" },
    ],
    updated: "2026-06-30",
  },
  {
    slug: "clearsight-vision-formula",
    title: "ClearSight Vision Formula Review: Worth It for Screen Fatigue?",
    product: "ClearSight Vision Formula",
    vendor: "ClearSight Nutrition",
    category: "vision",
    image: productHealth,
    excerpt:
      "Lutein, zeaxanthin and bilberry — we checked the dosing against the research and tested it for 60 days.",
    summary: [
      "ClearSight targets screen-related eye strain with a lutein and zeaxanthin base plus bilberry and zinc.",
      "Dosing is solid and matches the AREDS2-style ranges most eye-health research uses.",
      "Testers with heavy screen days reported less end-of-day strain; those already eating a lutein-rich diet noticed little.",
    ],
    rating: 4.3,
    scores: [
      { label: "Effectiveness", value: 4.2 },
      { label: "Ingredient quality", value: 4.6 },
      { label: "Value for money", value: 4.1 },
      { label: "Support & refunds", value: 4.4 },
    ],
    pros: ["Research-aligned lutein dosing", "No proprietary blends", "Vegan capsules", "90-day guarantee"],
    cons: ["Limited benefit for people with already good diets", "Large capsule size"],
    features: [
      { title: "20mg lutein", description: "At the upper end of doses used in eye-health studies." },
      { title: "Bilberry extract", description: "Standardised for anthocyanins rather than raw powder." },
      { title: "Zinc + copper balance", description: "Copper is included to offset long-term zinc supplementation." },
      { title: "Vegan formulation", description: "Plant-based capsule shell with no gelatin." },
    ],
    pricing: [
      { plan: "1 Bottle", price: "$59", detail: "30-day supply" },
      { plan: "3 Bottles", price: "$147", detail: "$49 per bottle, free shipping", best: true },
    ],
    faq: [
      { question: "Can it improve my eyesight?", answer: "No supplement corrects refractive error. It supports macular pigment density and comfort." },
      { question: "When should I take it?", answer: "With a meal containing fat, since lutein is fat soluble." },
      { question: "Is it safe with contact lenses?", answer: "Yes, there is no interaction with lens wear." },
    ],
    comparison: [
      { name: "ClearSight Vision", price: "$49/bottle", rating: 4.3, highlight: "Best dosing", guarantee: "90 days" },
      { name: "OcuGuard Plus", price: "$39/bottle", rating: 3.9, highlight: "Budget pick", guarantee: "30 days" },
      { name: "VisionMax Elite", price: "$69/bottle", rating: 4.0, highlight: "Premium branding", guarantee: "60 days" },
    ],
    featured: true,
    updated: "2026-07-02",
  },
  {
    slug: "titan-strength-system",
    title: "Titan Strength System Review: A 12-Week Program Tested",
    product: "Titan Strength System",
    vendor: "Titan Athletics",
    category: "fitness",
    image: productFinance,
    excerpt: "We completed all 12 weeks of Titan's hybrid strength block and logged every session.",
    summary: [
      "Titan is a 12-week hybrid strength and conditioning program designed around three or four training days per week.",
      "Progression is intelligently auto-regulated, which makes it far more forgiving than typical percentage-based templates.",
      "The app is functional but plain — the programming, not the software, is what you are paying for.",
    ],
    rating: 4.4,
    scores: [
      { label: "Program design", value: 4.7 },
      { label: "App experience", value: 3.8 },
      { label: "Value for money", value: 4.5 },
      { label: "Support", value: 4.3 },
    ],
    pros: ["Auto-regulated progression", "Video coaching for every lift", "Works with minimal equipment", "Lifetime access"],
    cons: ["App interface feels dated", "No nutrition coaching included"],
    features: [
      { title: "12-week block", description: "Three phases: base, intensification, peak." },
      { title: "Equipment options", description: "Full gym, home gym and dumbbell-only variants included." },
      { title: "Video library", description: "Technique breakdowns for all 60+ movements." },
      { title: "Deload logic", description: "Built-in recovery weeks based on your logged fatigue scores." },
    ],
    pricing: [
      { plan: "Program", price: "$97", detail: "Lifetime access to all phases", best: true },
      { plan: "Program + Coaching", price: "$297", detail: "Adds monthly form review" },
    ],
    faq: [
      { question: "Can beginners follow it?", answer: "Yes, but complete the two-week onboarding block first." },
      { question: "What equipment do I need?", answer: "A barbell setup is ideal; dumbbell-only variants are included." },
      { question: "Is nutrition covered?", answer: "Only lightly — pair it with a dedicated nutrition plan." },
    ],
    comparison: [
      { name: "Titan Strength System", price: "$97", rating: 4.4, highlight: "Best programming", guarantee: "30 days" },
      { name: "IronPath 90", price: "$149", rating: 4.1, highlight: "Better app", guarantee: "14 days" },
      { name: "HomeFit Basics", price: "$49", rating: 3.6, highlight: "Home workouts", guarantee: "30 days" },
    ],
    updated: "2026-05-19",
  },
  {
    slug: "prostaguard-mens-formula",
    title: "ProstaGuard Men's Formula Review: Ingredients and Real Results",
    product: "ProstaGuard Men's Formula",
    vendor: "ProstaGuard",
    category: "mens-health",
    image: productHealth,
    excerpt: "Saw palmetto, beta-sitosterol and pygeum — checked against the clinical literature.",
    summary: [
      "ProstaGuard is a men's prostate and urinary support supplement built on saw palmetto and beta-sitosterol.",
      "Dosing is honest and the label is fully disclosed, which is unusual in this crowded category.",
      "Expect gradual improvements in urinary comfort rather than dramatic overnight change.",
    ],
    rating: 4.1,
    scores: [
      { label: "Effectiveness", value: 4.0 },
      { label: "Ingredient quality", value: 4.5 },
      { label: "Value for money", value: 4.0 },
      { label: "Support & refunds", value: 4.2 },
    ],
    pros: ["Fully disclosed label", "Standardised saw palmetto extract", "No unnecessary fillers", "Free shipping on bundles"],
    cons: ["Slow-acting — needs 8+ weeks", "Single-bottle price is high"],
    features: [
      { title: "320mg saw palmetto", description: "Standardised to 85% fatty acids, matching study doses." },
      { title: "Beta-sitosterol", description: "Included at a meaningful 300mg rather than a token amount." },
      { title: "Zinc and selenium", description: "Supports normal testosterone levels and prostate function." },
      { title: "Softgel delivery", description: "Improves absorption of fat-soluble actives." },
    ],
    pricing: [
      { plan: "1 Bottle", price: "$69", detail: "30-day supply" },
      { plan: "3 Bottles", price: "$165", detail: "$55 per bottle, free shipping", best: true },
    ],
    faq: [
      { question: "Will it affect testosterone?", answer: "Saw palmetto does not lower testosterone at these doses in published research." },
      { question: "How long should I take it?", answer: "Give it at least eight weeks before assessing results." },
      { question: "Any interactions?", answer: "Consult your doctor if you take blood thinners or prostate medication." },
    ],
    comparison: [
      { name: "ProstaGuard", price: "$55/bottle", rating: 4.1, highlight: "Best label transparency", guarantee: "90 days" },
      { name: "UroFlow Men", price: "$45/bottle", rating: 3.8, highlight: "Cheaper", guarantee: "60 days" },
      { name: "ProstaMax Pro", price: "$79/bottle", rating: 3.9, highlight: "Higher dose", guarantee: "30 days" },
    ],
    updated: "2026-06-11",
  },
  {
    slug: "leanburn-28-program",
    title: "LeanBurn 28 Review: A Realistic Take on This Weight Loss Program",
    product: "LeanBurn 28",
    vendor: "LeanBurn",
    category: "weight-loss",
    image: productHealth,
    excerpt: "A 28-day structured fat-loss protocol — we followed it exactly and tracked the numbers.",
    summary: [
      "LeanBurn 28 combines a calorie-controlled meal framework with a simple walking and resistance protocol.",
      "It is sensible, sustainable and free of extreme restriction — which also means results are steady rather than spectacular.",
      "The meal-planning tools are the standout; the supplement upsell is skippable.",
    ],
    rating: 4.0,
    scores: [
      { label: "Effectiveness", value: 4.1 },
      { label: "Sustainability", value: 4.4 },
      { label: "Value for money", value: 4.0 },
      { label: "Support", value: 3.6 },
    ],
    pros: ["No extreme restriction", "Grocery lists and swaps included", "Beginner-friendly workouts", "Digital delivery"],
    cons: ["Aggressive supplement upsells", "Support responses can be slow"],
    features: [
      { title: "28-day meal framework", description: "Four weekly plans with full grocery lists and swaps." },
      { title: "Walk + lift protocol", description: "Twenty-minute sessions designed for busy schedules." },
      { title: "Habit tracker", description: "Printable and digital trackers for adherence." },
      { title: "Instant access", description: "Delivered digitally right after checkout." },
    ],
    pricing: [
      { plan: "Digital Program", price: "$47", detail: "Full 28-day system", best: true },
      { plan: "Program + Coaching", price: "$147", detail: "Adds four weekly check-ins" },
    ],
    faq: [
      { question: "How much weight can I lose?", answer: "Our tester averaged 3–6 lbs over 28 days. Individual results vary widely." },
      { question: "Is it vegetarian friendly?", answer: "Yes, every meal plan includes a vegetarian variant." },
      { question: "Do I need the supplements?", answer: "No — the program works without any of the upsells." },
    ],
    comparison: [
      { name: "LeanBurn 28", price: "$47", rating: 4.0, highlight: "Most sustainable", guarantee: "60 days" },
      { name: "RapidCut 14", price: "$67", rating: 3.4, highlight: "Fastest claims", guarantee: "30 days" },
      { name: "BalanceLife Plan", price: "$89", rating: 4.2, highlight: "Best coaching", guarantee: "30 days" },
    ],
    updated: "2026-07-08",
  },
  {
    slug: "skillbridge-academy",
    title: "SkillBridge Academy Review: Are These Certifications Worth It?",
    product: "SkillBridge Academy",
    vendor: "SkillBridge",
    category: "education",
    image: productSoftware,
    excerpt: "We audited three SkillBridge tracks and spoke to graduates about hiring outcomes.",
    summary: [
      "SkillBridge sells career-track certifications in data, marketing and project management.",
      "Course production quality is high and the project-based assessments are genuinely useful portfolio pieces.",
      "The certification itself carries little weight with employers — the portfolio you build is the real asset.",
    ],
    rating: 4.0,
    scores: [
      { label: "Content quality", value: 4.4 },
      { label: "Career impact", value: 3.6 },
      { label: "Value for money", value: 4.1 },
      { label: "Support", value: 4.0 },
    ],
    pros: ["Project-based learning", "Well-produced lessons", "Self-paced with lifetime access", "Active student community"],
    cons: ["Certificate recognition is limited", "No job placement guarantee"],
    features: [
      { title: "Career tracks", description: "Structured paths in data analytics, marketing and PM." },
      { title: "Portfolio projects", description: "Three graded projects per track you can show employers." },
      { title: "Self-paced", description: "No cohort deadlines; lifetime access to updates." },
      { title: "Community", description: "Peer review and study groups inside the platform." },
    ],
    pricing: [
      { plan: "Single Track", price: "$199", detail: "One career track, lifetime access", best: true },
      { plan: "All Access", price: "$449", detail: "Every current and future track" },
    ],
    faq: [
      { question: "Are certificates accredited?", answer: "No, they are provider-issued and not formally accredited." },
      { question: "How long does a track take?", answer: "Roughly 40–60 hours depending on the track." },
      { question: "Is there a refund?", answer: "Yes, 30 days from purchase." },
    ],
    comparison: [
      { name: "SkillBridge Academy", price: "$199", rating: 4.0, highlight: "Best projects", guarantee: "30 days" },
      { name: "CareerLaunch Pro", price: "$399", rating: 4.3, highlight: "Career coaching", guarantee: "14 days" },
      { name: "LearnFast Basics", price: "$79", rating: 3.5, highlight: "Cheapest", guarantee: "30 days" },
    ],
    updated: "2026-04-26",
  },
  {
    slug: "flowdesk-business-suite",
    title: "FlowDesk Business Suite Review: All-in-One or Jack of All Trades?",
    product: "FlowDesk Business Suite",
    vendor: "FlowDesk",
    category: "software",
    image: productSoftware,
    excerpt: "CRM, email, funnels and scheduling in one subscription — we migrated a real business onto it.",
    summary: [
      "FlowDesk replaces a typical stack of CRM, email marketing, funnel builder and scheduling tools.",
      "Consolidation saved our test business around $180 per month with only minor feature trade-offs.",
      "Email deliverability and reporting depth are where it still lags dedicated specialists.",
    ],
    rating: 4.5,
    scores: [
      { label: "Feature depth", value: 4.3 },
      { label: "Ease of use", value: 4.6 },
      { label: "Value for money", value: 4.8 },
      { label: "Support", value: 4.2 },
    ],
    pros: ["Replaces 4–5 separate tools", "Genuinely usable funnel builder", "Unlimited contacts on Pro", "Fast onboarding"],
    cons: ["Reporting is shallow", "Email deliverability needs warm-up care"],
    features: [
      { title: "Unified CRM", description: "Contacts, pipelines and tasks in one place." },
      { title: "Funnel builder", description: "Drag-and-drop pages with conversion-ready templates." },
      { title: "Automations", description: "Visual workflow builder with conditional branching." },
      { title: "Scheduling", description: "Built-in booking calendar with reminders." },
    ],
    pricing: [
      { plan: "Starter", price: "$49/mo", detail: "1 seat, 5,000 contacts" },
      { plan: "Pro", price: "$99/mo", detail: "5 seats, unlimited contacts", best: true },
      { plan: "Agency", price: "$199/mo", detail: "Sub-accounts and white label" },
    ],
    faq: [
      { question: "Can I migrate my existing list?", answer: "Yes, CSV import and assisted migration are included on Pro and above." },
      { question: "Is there a free trial?", answer: "A 14-day trial is available with no card required." },
      { question: "Does it replace my email tool?", answer: "For most small businesses, yes — with a proper sending warm-up." },
    ],
    comparison: [
      { name: "FlowDesk Suite", price: "$99/mo", rating: 4.5, highlight: "Best all-in-one", guarantee: "30 days" },
      { name: "StackPro CRM", price: "$149/mo", rating: 4.4, highlight: "Deeper reporting", guarantee: "14 days" },
      { name: "LeanFunnels", price: "$79/mo", rating: 3.9, highlight: "Funnels only", guarantee: "30 days" },
    ],
    featured: true,
    updated: "2026-07-18",
  },
  {
    slug: "auroralean-thermo-drops",
    title: "AuroraLean Thermo Drops Review 2026: Honest Test Results & Verdict",
    product: "AuroraLean Thermo Drops",
    vendor: "Aurora Nutrition",
    category: "weight-loss",
    image: productWeight,
    excerpt: "Our hands-on assessment of AuroraLean Thermo Drops, a liquid thermogenic drops from Aurora Nutrition — what it delivers, where it falls short and who it suits.",
    summary: [
      "AuroraLean Thermo Drops is a liquid thermogenic drops positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.2/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.2,
    scores: [
      { label: "Effectiveness", value: 4.3 },
      { label: "Quality", value: 4.2 },
      { label: "Value for money", value: 4.0 },
      { label: "Support & refunds", value: 4.4 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "Aurora Nutrition publishes the full specification for AuroraLean Thermo Drops, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is AuroraLean Thermo Drops worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "AuroraLean Thermo Drops", price: "$117", rating: 4.2, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 3.9, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.5, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-01-10",
  },
  {
    slug: "hydraglow-collagen-blend",
    title: "HydraGlow Collagen Blend Review 2026: Honest Test Results & Verdict",
    product: "HydraGlow Collagen Blend",
    vendor: "HydraGlow Labs",
    category: "health-supplements",
    image: productHealth,
    excerpt: "Our hands-on assessment of HydraGlow Collagen Blend, a marine collagen powder from HydraGlow Labs — what it delivers, where it falls short and who it suits.",
    summary: [
      "HydraGlow Collagen Blend is a marine collagen powder positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.4/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.4,
    scores: [
      { label: "Effectiveness", value: 4.5 },
      { label: "Quality", value: 4.4 },
      { label: "Value for money", value: 4.2 },
      { label: "Support & refunds", value: 4.6 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "HydraGlow Labs publishes the full specification for HydraGlow Collagen Blend, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is HydraGlow Collagen Blend worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "HydraGlow Collagen Blend", price: "$117", rating: 4.4, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 4.1, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.7, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-02-11",
  },
  {
    slug: "nightshift-sleep-formula",
    title: "NightShift Sleep Formula Review 2026: Honest Test Results & Verdict",
    product: "NightShift Sleep Formula",
    vendor: "Northline Health",
    category: "health-supplements",
    image: productHealth,
    excerpt: "Our hands-on assessment of NightShift Sleep Formula, a non-habit sleep capsule from Northline Health — what it delivers, where it falls short and who it suits.",
    summary: [
      "NightShift Sleep Formula is a non-habit sleep capsule positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.5/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.5,
    scores: [
      { label: "Effectiveness", value: 4.6 },
      { label: "Quality", value: 4.5 },
      { label: "Value for money", value: 4.3 },
      { label: "Support & refunds", value: 4.7 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "Northline Health publishes the full specification for NightShift Sleep Formula, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is NightShift Sleep Formula worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "NightShift Sleep Formula", price: "$117", rating: 4.5, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 4.2, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.8, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-03-12",
  },
  {
    slug: "ironpeak-testosterone-support",
    title: "IronPeak Testosterone Support Review 2026: Honest Test Results & Verdict",
    product: "IronPeak Testosterone Support",
    vendor: "IronPeak Labs",
    category: "mens-health",
    image: productHealth,
    excerpt: "Our hands-on assessment of IronPeak Testosterone Support, a daily hormone support capsule from IronPeak Labs — what it delivers, where it falls short and who it suits.",
    summary: [
      "IronPeak Testosterone Support is a daily hormone support capsule positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.1/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.1,
    scores: [
      { label: "Effectiveness", value: 4.2 },
      { label: "Quality", value: 4.1 },
      { label: "Value for money", value: 3.9 },
      { label: "Support & refunds", value: 4.3 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "IronPeak Labs publishes the full specification for IronPeak Testosterone Support, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is IronPeak Testosterone Support worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "IronPeak Testosterone Support", price: "$117", rating: 4.1, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 3.8, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.4, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-04-13",
  },
  {
    slug: "retinaguard-eye-complex",
    title: "RetinaGuard Eye Complex Review 2026: Honest Test Results & Verdict",
    product: "RetinaGuard Eye Complex",
    vendor: "RetinaGuard",
    category: "vision",
    image: productVision,
    excerpt: "Our hands-on assessment of RetinaGuard Eye Complex, a lutein and zeaxanthin complex from RetinaGuard — what it delivers, where it falls short and who it suits.",
    summary: [
      "RetinaGuard Eye Complex is a lutein and zeaxanthin complex positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.3/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.3,
    scores: [
      { label: "Effectiveness", value: 4.4 },
      { label: "Quality", value: 4.3 },
      { label: "Value for money", value: 4.1 },
      { label: "Support & refunds", value: 4.5 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "RetinaGuard publishes the full specification for RetinaGuard Eye Complex, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is RetinaGuard Eye Complex worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "RetinaGuard Eye Complex", price: "$117", rating: 4.3, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 4.0, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.6, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-05-14",
  },
  {
    slug: "pixelforge-ai-designer",
    title: "PixelForge AI Designer Review 2026: Honest Test Results & Verdict",
    product: "PixelForge AI Designer",
    vendor: "PixelForge",
    category: "ai-tools",
    image: productAi,
    excerpt: "Our hands-on assessment of PixelForge AI Designer, a AI image and brand design suite from PixelForge — what it delivers, where it falls short and who it suits.",
    summary: [
      "PixelForge AI Designer is a AI image and brand design suite positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.6/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.6,
    scores: [
      { label: "Effectiveness", value: 4.7 },
      { label: "Quality", value: 4.6 },
      { label: "Value for money", value: 4.4 },
      { label: "Support & refunds", value: 4.8 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "PixelForge publishes the full specification for PixelForge AI Designer, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is PixelForge AI Designer worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "PixelForge AI Designer", price: "$117", rating: 4.6, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 4.3, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.9, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-06-15",
  },
  {
    slug: "scriptline-ai-video",
    title: "ScriptLine AI Video Review 2026: Honest Test Results & Verdict",
    product: "ScriptLine AI Video",
    vendor: "ScriptLine Media",
    category: "ai-tools",
    image: productAi,
    excerpt: "Our hands-on assessment of ScriptLine AI Video, a AI script-to-video generator from ScriptLine Media — what it delivers, where it falls short and who it suits.",
    summary: [
      "ScriptLine AI Video is a AI script-to-video generator positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.0/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4,
    scores: [
      { label: "Effectiveness", value: 4.1 },
      { label: "Quality", value: 4.0 },
      { label: "Value for money", value: 3.8 },
      { label: "Support & refunds", value: 4.2 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "ScriptLine Media publishes the full specification for ScriptLine AI Video, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is ScriptLine AI Video worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "ScriptLine AI Video", price: "$117", rating: 4, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 3.7, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.3, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-07-16",
  },
  {
    slug: "ledgerwise-accounting",
    title: "LedgerWise Accounting Review 2026: Honest Test Results & Verdict",
    product: "LedgerWise Accounting",
    vendor: "LedgerWise",
    category: "software",
    image: productSoftware,
    excerpt: "Our hands-on assessment of LedgerWise Accounting, a small-business bookkeeping platform from LedgerWise — what it delivers, where it falls short and who it suits.",
    summary: [
      "LedgerWise Accounting is a small-business bookkeeping platform positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.4/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.4,
    scores: [
      { label: "Effectiveness", value: 4.5 },
      { label: "Quality", value: 4.4 },
      { label: "Value for money", value: 4.2 },
      { label: "Support & refunds", value: 4.6 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "LedgerWise publishes the full specification for LedgerWise Accounting, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is LedgerWise Accounting worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "LedgerWise Accounting", price: "$117", rating: 4.4, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 4.1, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.7, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-01-17",
  },
  {
    slug: "yieldpath-dividend-blueprint",
    title: "YieldPath Dividend Blueprint Review 2026: Honest Test Results & Verdict",
    product: "YieldPath Dividend Blueprint",
    vendor: "YieldPath Research",
    category: "finance",
    image: productFinance,
    excerpt: "Our hands-on assessment of YieldPath Dividend Blueprint, a dividend investing course from YieldPath Research — what it delivers, where it falls short and who it suits.",
    summary: [
      "YieldPath Dividend Blueprint is a dividend investing course positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.2/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.2,
    scores: [
      { label: "Effectiveness", value: 4.3 },
      { label: "Quality", value: 4.2 },
      { label: "Value for money", value: 4.0 },
      { label: "Support & refunds", value: 4.4 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "YieldPath Research publishes the full specification for YieldPath Dividend Blueprint, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is YieldPath Dividend Blueprint worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "YieldPath Dividend Blueprint", price: "$117", rating: 4.2, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 3.9, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.5, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-02-18",
  },
  {
    slug: "codecraft-bootcamp",
    title: "CodeCraft Bootcamp Review 2026: Honest Test Results & Verdict",
    product: "CodeCraft Bootcamp",
    vendor: "CodeCraft Academy",
    category: "education",
    image: productEducation,
    excerpt: "Our hands-on assessment of CodeCraft Bootcamp, a 12-week web development bootcamp from CodeCraft Academy — what it delivers, where it falls short and who it suits.",
    summary: [
      "CodeCraft Bootcamp is a 12-week web development bootcamp positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.5/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.5,
    scores: [
      { label: "Effectiveness", value: 4.6 },
      { label: "Quality", value: 4.5 },
      { label: "Value for money", value: 4.3 },
      { label: "Support & refunds", value: 4.7 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "CodeCraft Academy publishes the full specification for CodeCraft Bootcamp, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is CodeCraft Bootcamp worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "CodeCraft Bootcamp", price: "$117", rating: 4.5, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 4.2, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.8, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-03-10",
  },
  {
    slug: "kinetiq-home-gym-program",
    title: "Kinetiq Home Gym Program Review 2026: Honest Test Results & Verdict",
    product: "Kinetiq Home Gym Program",
    vendor: "Kinetiq Fitness",
    category: "fitness",
    image: productFitness,
    excerpt: "Our hands-on assessment of Kinetiq Home Gym Program, a progressive home training program from Kinetiq Fitness — what it delivers, where it falls short and who it suits.",
    summary: [
      "Kinetiq Home Gym Program is a progressive home training program positioned at buyers who want a straightforward option without an overwhelming learning curve.",
      "We evaluated it against our standard scorecard: real-world performance, quality of what you actually receive, price fairness and the experience of contacting support.",
      "It earned 4.3/5. The fundamentals are solid and the guarantee is honoured, though buyers should read the pricing tiers carefully before committing to the longest plan.",
    ],
    rating: 4.3,
    scores: [
      { label: "Effectiveness", value: 4.4 },
      { label: "Quality", value: 4.3 },
      { label: "Value for money", value: 4.1 },
      { label: "Support & refunds", value: 4.5 },
    ],
    pros: [
      "Clear, fully disclosed information before checkout",
      "Consistent results across our multi-week test window",
      "Responsive support with a documented refund process",
      "Sensible onboarding for first-time buyers",
    ],
    cons: [
      "Best pricing is locked behind the largest bundle",
      "Results build gradually rather than immediately",
    ],
    features: [
      { title: "Transparent specification", description: "Kinetiq Fitness publishes the full specification for Kinetiq Home Gym Program, so you can verify what you are paying for." },
      { title: "Independent verification", description: "We purchased at full retail price and documented the entire checkout and delivery flow." },
      { title: "Guided setup", description: "Onboarding materials are clear enough that most buyers are up and running on day one." },
      { title: "Money-back guarantee", description: "A published refund window that our team successfully tested on a live order." },
    ],
    pricing: [
      { plan: "Starter", price: "$49", detail: "Entry package, ideal for first-time buyers" },
      { plan: "Standard", price: "$117", detail: "Best overall value in our testing", best: true },
      { plan: "Complete", price: "$198", detail: "Longest supply or full feature access" },
    ],
    faq: [
      { question: "Is Kinetiq Home Gym Program worth the price?", answer: "For its intended audience, yes. The standard tier gives the best balance of cost and outcome in our testing." },
      { question: "How long before I see results?", answer: "Most testers reported meaningful change between weeks three and six of consistent use." },
      { question: "What is the refund policy?", answer: "A published money-back guarantee applies. We completed a test refund without difficulty." },
      { question: "Are there hidden upsells?", answer: "There are optional add-ons at checkout, all of which can be declined without affecting the core purchase." },
    ],
    comparison: [
      { name: "Kinetiq Home Gym Program", price: "$117", rating: 4.3, highlight: "Best balance of price and quality", guarantee: "60 days" },
      { name: "Category alternative A", price: "$139", rating: 4.0, highlight: "More features, steeper learning curve", guarantee: "30 days" },
      { name: "Category alternative B", price: "$89", rating: 3.6, highlight: "Cheaper, noticeably thinner offering", guarantee: "14 days" },
    ],
    updated: "2026-04-11",
  },
];

export const getReview = (slug: string) => reviews.find((r) => r.slug === slug);
export const reviewsByCategory = (slug: string) => reviews.filter((r) => r.category === slug);
export const featuredReviews = () => reviews.filter((r) => r.featured);
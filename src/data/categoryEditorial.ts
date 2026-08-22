import productHealth from "@/assets/product-health.jpg";
import productSoftware from "@/assets/product-software.jpg";
import productFinance from "@/assets/product-finance.jpg";
import productFitness from "@/assets/product-fitness.jpg";
import productEducation from "@/assets/product-education.jpg";
import productVision from "@/assets/product-vision.jpg";
import productAi from "@/assets/product-ai.jpg";
import productWeight from "@/assets/product-weight.jpg";
import type { Review } from "@/data/reviews";
import type { Post } from "@/data/posts";

type EditorialSeed = {
  slug: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  affiliateUrl: string;
  focus: string[];
};

const seeds: EditorialSeed[] = [
  { slug: "health-supplements-buying-guide-2026", category: "health-supplements", title: "Health & Supplements Buying Guide 2026: What Is Actually Worth Buying?", excerpt: "A practical review of supplement labels, ingredient doses, evidence quality, value and the checks to make before buying.", image: productHealth, affiliateUrl: "https://www.amazon.in/s?k=women+health+supplements&crid=363T4N2GRI2GF&sprefix=Health+%26+Supplements+%2Caps%2C1539&ref=nb_sb_ss_mvt-t11-ranker_ci_hl-bn-left_3_21&tag=rehanroshan08-21", focus: ["Full-label transparency", "Evidence-backed ingredients", "Dose and value checks"] },
  { slug: "ai-tools-buying-guide-2026", category: "ai-tools", title: "AI Tools Buying Guide 2026: Which Features Matter Most?", excerpt: "How to compare AI writing, design, automation and productivity tools without paying for features you will never use.", image: productAi, affiliateUrl: "https://www.amazon.in/s?k=ai+tools+for+engineers&crid=2NETEU04TP6LJ&sprefix=AI+Tools+%2Caps%2C2790&ref=nb_sb_ss_mvt-t11-ranker_8_9&tag=rehanroshan08-21", focus: ["Real workflow fit", "Output quality", "Pricing and limits"] },
  { slug: "software-buying-guide-2026", category: "software", title: "Software Buying Guide 2026: Features, Pricing and Long-Term Value", excerpt: "A straightforward framework for comparing business and productivity software before committing to a subscription.", image: productSoftware, affiliateUrl: "https://www.amazon.in/s?k=marketing+and+business+software&crid=I1JGEPD66RW9&sprefix=marketing+and+business+software+%2Caps%2C1222&ref=nb_sb_noss&tag=rehanroshan08-21", focus: ["Core features", "Ease of use", "Subscription value"] },
  { slug: "finance-buying-guide-2026", category: "finance", title: "Finance & Trading Programs Review 2026: What to Check Before Paying", excerpt: "A risk-first review framework for trading, budgeting and passive-income programmes, with a focus on realistic claims.", image: productFinance, affiliateUrl: "https://link.amazon/B0dMcajvO", focus: ["Risk disclosure", "Course quality", "Claims versus evidence"] },
  { slug: "education-buying-guide-2026", category: "education", title: "Education & Courses Buying Guide 2026: Choose by Outcomes, Not Hype", excerpt: "How to assess online courses, certifications, curriculum depth, support and whether the price makes sense.", image: productEducation, affiliateUrl: "https://link.amazon/B02MeBFrh", focus: ["Curriculum quality", "Practical outcomes", "Support and certification"] },
  { slug: "mens-health-buying-guide-2026", category: "mens-health", title: "Men's Health Buying Guide 2026: Ingredients, Evidence and Value", excerpt: "A careful guide to comparing men's-health products, label quality, ingredient evidence and sensible purchasing decisions.", image: productHealth, affiliateUrl: "https://www.amazon.in/s?k=mens+health&ref=nb_sb_noss", focus: ["Ingredient evidence", "Label transparency", "Value per serving"] },
  { slug: "weight-loss-buying-guide-2026", category: "weight-loss", title: "Weight Loss Products Review 2026: A Smarter Way to Compare Them", excerpt: "What to look for in weight-loss products, including ingredients, serving cost, claims and the difference between support and shortcuts.", image: productWeight, affiliateUrl: "https://www.amazon.in/s?k=weight+loss+products&crid=3MG30XJMIXN2K&sprefix=Weight+loss%2Caps%2C3318&ref=nb_sb_ss_mvt-t11-ranker_1_11", focus: ["Ingredient profile", "Serving cost", "Realistic expectations"] },
  { slug: "vision-buying-guide-2026", category: "vision", title: "Vision & Eye-Health Buying Guide 2026: What Deserves a Closer Look?", excerpt: "A buying framework for eye-health products, screen-comfort accessories and formulas marketed for modern screen-heavy routines.", image: productVision, affiliateUrl: "https://www.amazon.in/s?k=Vision+Eye-health&crid=1XX2HPFUT20MA&sprefix=vision+eye-health+formulas+and+screen-strain+solutions+reviewed+%2Caps%2C5883&ref=nb_sb_noss", focus: ["Ingredient doses", "Use case fit", "Evidence and safety"] },
  { slug: "fitness-buying-guide-2026", category: "fitness", title: "Fitness Buying Guide 2026: Gear, Programs and Recovery Compared", excerpt: "A practical review of what actually matters when choosing home-workout gear, training programmes and recovery products.", image: productFitness, affiliateUrl: "https://www.amazon.in/s?k=fitness+equipment+for+home+workout&crid=1DFP688OUB0M9&sprefix=Fitness+%2Caps%2C2075&ref=nb_sb_ss_mvt-t11-ranker_5_8&tag=rehanroshan08-21", focus: ["Durability", "Training usefulness", "Value for money"] },
  { slug: "electronics-buying-guide-2026", category: "electronics", title: "Electronics Buying Guide 2026: How to Compare Tech Before You Buy", excerpt: "A no-nonsense checklist for comparing electronics by specifications, reliability, everyday usability and total value.", image: productSoftware, affiliateUrl: "https://www.amazon.in/s?k=Electronics&crid=1P64TXARTHMIS&sprefix=electronics+tv%2Caps%2C7223&ref=nb_sb_noss_2", focus: ["Useful specifications", "Reliability", "Price-to-performance"] },
  { slug: "home-kitchen-buying-guide-2026", category: "home-kitchen", title: "Home & Kitchen Buying Guide 2026: Better Choices for Everyday Use", excerpt: "How to compare appliances, cookware and everyday home products for durability, practicality and running cost.", image: productHealth, affiliateUrl: "https://www.amazon.in/s?k=home+kitchen+accessories&crid=Y4X0TR3BHMDH&sprefix=Home+kitchen+%2Caps%2C6029&ref=nb_sb_ss_mvt-t11-ranker_3_13&tag=rehanroshan08-21", focus: ["Build quality", "Daily convenience", "Long-term value"] },
  { slug: "health-fitness-buying-guide-2026", category: "health-fitness", title: "Health & Fitness Buying Guide 2026: Trackers, Recovery and Wellness", excerpt: "A category review covering wellness devices, trackers and recovery gear with a focus on useful data rather than gimmicks.", image: productFitness, affiliateUrl: "https://www.amazon.in/s?k=Health+%26+Fitness&crid=N47SSAKDKS8H&sprefix=health+%26+fitness+trackers%2C+recovery+gear+and+wellness+devices+m%2Caps%2C6963&ref=nb_sb_noss", focus: ["Useful metrics", "Comfort and usability", "Evidence of value"] },
  { slug: "beauty-buying-guide-2026", category: "beauty", title: "Beauty Buying Guide 2026: Ingredients, Claims and Value", excerpt: "How to read skincare, haircare and grooming claims and compare products without getting lost in marketing language.", image: productHealth, affiliateUrl: "https://www.amazon.in/gp/browse.html?node=1355016031&ref_=nav_em_sbc_bhg_beauty_all_0_2_13_2&tag=rehanroshan08-21", focus: ["Ingredient lists", "Claim quality", "Price per use"] },
  { slug: "sports-buying-guide-2026", category: "sports", title: "Sports Gear Buying Guide 2026: What Makes Equipment Worth It?", excerpt: "A practical guide to choosing sports equipment by fit, durability, comfort and the demands of your actual activity.", image: productFitness, affiliateUrl: "https://www.amazon.in/s?k=sports+bra+for+women&crid=55KVH7UYG7CS&sprefix=Sport%2Caps%2C432&ref=nb_sb_ss_mvt-t11-ranker_2_5&tag=rehanroshan08-21", focus: ["Fit and comfort", "Durability", "Activity-specific value"] },
  { slug: "office-buying-guide-2026", category: "office", title: "Office Desks, Chairs & Workspace Guide 2026", excerpt: "How to compare desks, chairs, printers and workspace tools for comfort, reliability and everyday productivity.", image: productSoftware, affiliateUrl: "https://www.amazon.in/s?k=Office+Desks%2C+chairs%2C&crid=O4Q6JZLQM4GZ&sprefix=office+desks%2C+chairs%2C+printers+and+workspace+tools+rated+for+daily+com%2Caps%2C6787&ref=nb_sb_noss", focus: ["Ergonomics", "Workspace fit", "Daily reliability"] },
  { slug: "fashion-buying-guide-2026", category: "fashion", title: "Fashion Buying Guide 2026: Fit, Fabric and Everyday Value", excerpt: "A practical way to compare clothing, footwear and accessories by fit, fabric, durability and cost per wear.", image: productHealth, affiliateUrl: "https://www.amazon.in/gp/goldbox/all-deals/?ie=UTF8&ref_=sv_gb_1&tag=rehanroshan08-21&discounts-widget=%2522%257B%255C%2522state%255C%2522%253A%257B%255C%2522refinementFilters%255C%2522%255D%257D%257D%252C%255C%2522version%255C%2522%253A1%257D%2522", focus: ["Fit", "Material quality", "Cost per wear"] },
  { slug: "baby-buying-guide-2026", category: "baby", title: "Baby Products Buying Guide 2026: Safety and Practicality First", excerpt: "A parent-friendly checklist for comparing baby gear, nursery essentials and everyday products without overbuying.", image: productHealth, affiliateUrl: "https://www.amazon.in/s?k=baby+carrier+for+0+to+3+year+baby&crid=F5A6TR5ZNW8W&sprefix=Baby%2Caps%2C414&ref=nb_sb_ss_mvt-t11-ranker_2_4&tag=rehanroshan08-21", focus: ["Safety features", "Ease of cleaning", "Practical everyday use"] },
  { slug: "automotive-buying-guide-2026", category: "automotive", title: "Automotive Buying Guide 2026: Car Care and Accessories", excerpt: "How to choose useful automotive accessories and car-care products by compatibility, durability and real-world usefulness.", image: productSoftware, affiliateUrl: "https://www.amazon.in/s?k=Automotive+Car+care%2C+accessories&crid=9OESSV5MUQ23&sprefix=automotive+car+care%2C+accessories+%2Caps%2C673&ref=nb_sb_noss&tag=rehanroshan08-21", focus: ["Compatibility", "Durability", "Practical usefulness"] },
  { slug: "pet-supplies-buying-guide-2026", category: "pet-supplies", title: "Pet Supplies Buying Guide 2026: Useful Gear, Health and Everyday Care", excerpt: "A practical review framework for pet supplies, focused on safety, suitability, materials and ongoing value.", image: productHealth, affiliateUrl: "https://www.amazon.in/s?k=Pet+Supplies+Food%2C+gear+and+health&crid=37ADJ5JRQHS9I&sprefix=pet+supplies+food%2C+gear+and+health+%2Caps%2C1017&ref=nb_sb_noss&tag=rehanroshan08-21", focus: ["Pet suitability", "Safety and materials", "Ongoing cost"] },
];

const makeReview = (s: EditorialSeed): Review => ({
  slug: s.slug,
  title: s.title,
  product: s.title.replace(/:.*$/, ""),
  vendor: "PrimeChoiceReviews Editorial",
  category: s.category,
  image: s.image,
  excerpt: s.excerpt,
  summary: [s.excerpt, `Our editorial checklist focuses on ${s.focus.join(", ")}.`, "This is a category buying guide, not a claim that every product in the category has been independently laboratory tested."],
  rating: 4.5,
  scores: [{ label: "Research depth", value: 4.6 }, { label: "Practical usefulness", value: 4.5 }, { label: "Value guidance", value: 4.4 }, { label: "Clarity", value: 4.6 }],
  pros: s.focus,
  cons: ["Category-wide advice cannot replace product-specific testing", "Prices and availability can change"],
  features: s.focus.map((x) => ({ title: x, description: `A key checkpoint when comparing options in the ${s.category} category.` })),
  pricing: [{ plan: "Compare current options", price: "Amazon", detail: "Open the category selection", best: true }],
  faq: [{ question: "Is this a specific product review?", answer: "No. It is an editorial category review and buying guide designed to help you compare products." }, { question: "How are products selected?", answer: "Use the checklist in the guide to compare labels, specifications, reviews, value and suitability before buying." }],
  comparison: [{ name: "Best-fit option", price: "Varies", rating: 4.5, highlight: "Choose by your needs", guarantee: "Check seller" }, { name: "Budget option", price: "Varies", rating: 4.1, highlight: "Prioritise essentials", guarantee: "Check seller" }, { name: "Premium option", price: "Varies", rating: 4.3, highlight: "Pay for useful upgrades", guarantee: "Check seller" }],
  whoShouldBuy: ["Readers comparing products in this category"],
  whoShouldAvoid: ["Anyone expecting a guarantee of results"],
  verdict: "Use this guide as a research checklist, then verify the individual product page, seller, price and current claims before purchasing.",
  deal: { headline: "Browse current Amazon options", detail: s.affiliateUrl },
  productId: undefined,
  featured: true,
  updated: "2026-08-23",
});

const makePost = (s: EditorialSeed): Post => ({
  slug: `${s.slug}-article`,
  title: s.title.replace("Buying Guide", "Review & Buying Guide").replace("Review 2026", "Review & Buying Guide 2026"),
  excerpt: s.excerpt,
  category: s.category,
  image: s.image,
  author: { name: "PrimeChoiceReviews Editorial", role: "Research Desk", bio: "Our editorial team compares products using transparent, repeatable buying criteria." },
  date: "2026-08-23",
  readingTime: 7,
  sections: [
    { id: "overview", heading: "What this category is really about", paragraphs: [s.excerpt, `The goal is not to recommend the most expensive option. It is to identify which features matter for your use case and which marketing claims deserve extra scrutiny.`] },
    { id: "how-to-compare", heading: "How we recommend comparing products", paragraphs: [`Start with ${s.focus[0].toLowerCase()}, then check ${s.focus.slice(1).join(" and ").toLowerCase()}. Compare like-for-like specifications and calculate the real cost of ownership or use.`, "Read the product description and customer feedback together, but do not treat either as independent proof. Look for clear specifications, seller information, return terms and current availability."] },
    { id: "red-flags", heading: "Red flags to watch for", paragraphs: ["Be cautious with absolute promises, vague proprietary claims, missing specifications and pressure to buy immediately. A good listing should make it easy to understand what you are actually getting."] },
    { id: "verdict", heading: "Our buying verdict", paragraphs: [`For this category, prioritise ${s.focus.join(", ")}. Use the current Amazon selection to compare individual products, prices and seller terms before making a decision.`, "Affiliate disclosure: PrimeChoiceReviews may earn a commission from qualifying purchases at no extra cost to you."] },
  ],
});

export const categoryEditorialReviews = seeds.map(makeReview);
export const categoryEditorialPosts = seeds.map(makePost);
export const categoryEditorialSeeds = seeds;

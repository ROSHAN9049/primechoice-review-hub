import productHealth from "@/assets/product-health.jpg";
import productSoftware from "@/assets/product-software.jpg";
import productFinance from "@/assets/product-finance.jpg";

export interface PostSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: { name: string; role: string; bio: string };
  date: string;
  readingTime: number;
  sections: PostSection[];
}

const editor = {
  name: "Daniel Hart",
  role: "Lead Reviewer",
  bio: "Daniel has spent nine years testing consumer health and software products, with a focus on separating marketing claims from measurable results.",
};

const analyst = {
  name: "Sofia Lindqvist",
  role: "Research Analyst",
  bio: "Sofia reviews clinical literature and vendor documentation to fact-check every claim published on PrimeChoiceReviews.",
};

export const posts: Post[] = [
  {
    slug: "how-we-test-supplements",
    title: "How We Test Supplements: Our 90-Day Review Methodology",
    excerpt:
      "Every supplement we publish goes through the same four-stage process. Here is exactly what happens before a rating is assigned.",
    category: "health-supplements",
    image: productHealth,
    author: analyst,
    date: "2026-07-20",
    readingTime: 8,
    sections: [
      {
        id: "why-methodology-matters",
        heading: "Why methodology matters more than opinion",
        paragraphs: [
          "Most supplement reviews online are rewritten sales pages. They repeat the vendor's claims, add a star rating and link out. That is not a review — it is an advertisement with a headline.",
          "Our approach starts from the opposite direction: we assume nothing works until the label, the literature and the lived experience of testers all agree.",
        ],
      },
      {
        id: "stage-one-label-audit",
        heading: "Stage one: the label audit",
        paragraphs: [
          "We transcribe the full supplement facts panel and compare every active ingredient dose against the doses used in published human trials.",
          "Proprietary blends are an immediate downgrade. If a brand will not tell you how much of an ingredient you are getting, the dose is almost always below the effective threshold.",
        ],
      },
      {
        id: "stage-two-panel-test",
        heading: "Stage two: the 90-day panel test",
        paragraphs: [
          "A minimum of five testers use the product for 90 days while logging sleep, training, diet adherence and subjective outcomes weekly.",
          "We deliberately track confounding variables, because a supplement that only appears to work when someone also fixed their sleep is not a supplement that works.",
        ],
      },
      {
        id: "stage-three-value",
        heading: "Stage three: value and refund reality",
        paragraphs: [
          "We buy every product at full price through the normal checkout, upsells included, so we can document exactly what a customer experiences.",
          "We then test the refund process on at least one order. A generous guarantee that is difficult to claim is worth very little.",
        ],
      },
      {
        id: "how-scores-are-set",
        heading: "How the final score is calculated",
        paragraphs: [
          "Effectiveness carries 40% of the weight, ingredient quality 25%, value 20% and support 15%.",
          "A product cannot score above 4.0 overall if its label is not fully disclosed, regardless of how well it performs in testing.",
        ],
      },
    ],
  },
  {
    slug: "best-ai-tools-for-small-business",
    title: "The Best AI Tools for Small Businesses in 2026",
    excerpt:
      "We tested 23 AI platforms against real small-business workflows. These are the seven that earned their subscription fee.",
    category: "ai-tools",
    image: productSoftware,
    author: editor,
    date: "2026-07-11",
    readingTime: 11,
    sections: [
      {
        id: "what-changed-in-2026",
        heading: "What changed in 2026",
        paragraphs: [
          "The novelty phase is over. Buyers no longer want a chatbot bolted onto a dashboard; they want measurable hours saved per week.",
          "The tools that survived our testing all share one trait: they solve a specific workflow end to end rather than offering a blank prompt box.",
        ],
      },
      {
        id: "content-and-marketing",
        heading: "Content and marketing",
        paragraphs: [
          "For content teams, the deciding factor was research grounding. Tools that cite sources cut fact-checking time roughly in half.",
          "Unlimited-word pricing also matters more than raw output quality once you publish at volume — credit anxiety changes how people work.",
        ],
      },
      {
        id: "operations-and-support",
        heading: "Operations and customer support",
        paragraphs: [
          "AI support agents now resolve a meaningful share of tier-one tickets, but only when connected to a well-maintained knowledge base.",
          "Garbage in, garbage out still applies: the businesses that saw the best results spent a week cleaning documentation first.",
        ],
      },
      {
        id: "what-to-avoid",
        heading: "What to avoid",
        paragraphs: [
          "Avoid lifetime deals from vendors with no public roadmap, and be sceptical of any tool that cannot export your data.",
          "Lock-in is the real cost of a cheap subscription.",
        ],
      },
    ],
  },
  {
    slug: "spotting-fake-reviews",
    title: "How to Spot a Fake Product Review in Under 60 Seconds",
    excerpt:
      "Seven signals that separate a genuine hands-on review from a rewritten affiliate sales page.",
    category: "software",
    image: productFinance,
    author: analyst,
    date: "2026-06-28",
    readingTime: 6,
    sections: [
      {
        id: "no-original-images",
        heading: "1. No original photographs",
        paragraphs: [
          "If every image is a vendor render or stock photo, the reviewer likely never handled the product.",
          "Genuine testing produces unglamorous photos: packaging, receipts, screenshots of the actual dashboard.",
        ],
      },
      {
        id: "only-upside",
        heading: "2. Cons that are secretly pros",
        paragraphs: [
          "'The only downside is that it sells out quickly' is not a criticism — it is a scarcity trigger.",
          "Real drawbacks cost the reviewer something: a slow refund, a shallow feature, a price that is hard to justify.",
        ],
      },
      {
        id: "no-methodology",
        heading: "3. No stated methodology",
        paragraphs: [
          "A trustworthy reviewer tells you how long they tested, what they measured and how they scored it.",
          "If you cannot find that page on the site, treat the rating as decorative.",
        ],
      },
      {
        id: "urgency-language",
        heading: "4. Manufactured urgency",
        paragraphs: [
          "Countdown timers that reset on refresh and 'only 3 left' banners on digital products are outright fabrications.",
          "A good product does not need a fake clock.",
        ],
      },
    ],
  },
  {
    slug: "affiliate-disclosure-explained",
    title: "Affiliate Links Explained: What They Mean for You as a Reader",
    excerpt:
      "How affiliate commissions work, why we disclose them, and the rules we follow to keep our ratings independent.",
    category: "finance",
    image: productFinance,
    author: editor,
    date: "2026-05-30",
    readingTime: 5,
    sections: [
      {
        id: "how-it-works",
        heading: "How affiliate commissions work",
        paragraphs: [
          "When you buy through one of our links, the vendor pays us a percentage of the sale. Your price is unchanged.",
          "That commission funds the products we buy, the testing panel and the time spent writing.",
        ],
      },
      {
        id: "our-rules",
        heading: "The rules we hold ourselves to",
        paragraphs: [
          "We buy products ourselves rather than accepting vendor samples wherever practical.",
          "Commission rates never influence scores, and we publish negative reviews of products that pay well.",
        ],
      },
      {
        id: "what-to-look-for",
        heading: "What you should look for elsewhere",
        paragraphs: [
          "Any site earning commissions should disclose it clearly and near the top of the page, not in tiny footer text.",
          "If a site never publishes a low score, its incentives are worth questioning.",
        ],
      },
    ],
  },
];

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);
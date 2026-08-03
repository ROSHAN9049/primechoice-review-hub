import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

const title = "Affiliate & Content Disclaimer — PrimeChoiceReviews";
const description =
  "Our affiliate disclosure and important notes about health, financial and results-related content on PrimeChoiceReviews.";

export const Route = createFileRoute("/disclaimer")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/disclaimer" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/disclaimer" }],
  }),
  component: () => (
    <LegalPage
      title="Disclaimer"
      intro="This page is maintained by PrimeChoiceReviews to make our commercial relationships and content limits clear."
      sections={[
        {
          heading: "Affiliate disclosure",
          paragraphs: [
            "PrimeChoiceReviews participates in affiliate programs, including Digistore24. When you buy through a link on this site we may earn a commission at no additional cost to you.",
            "Commissions never determine our scores. We publish critical reviews of products that pay well and positive reviews of products that pay nothing.",
          ],
        },
        {
          heading: "Health content",
          paragraphs: [
            "Nothing on this site is medical advice. Supplements and fitness programs are not intended to diagnose, treat, cure or prevent any disease. Consult a qualified healthcare professional before starting anything new.",
          ],
        },
        {
          heading: "Financial content",
          paragraphs: [
            "Trading, investing and business content is educational only and is not financial advice. Capital is at risk and past performance does not predict future results.",
          ],
        },
        {
          heading: "Results disclaimer",
          paragraphs: [
            "Testing outcomes described on this site reflect our testers' individual experiences. Your results may differ.",
          ],
        },
        {
          heading: "Third-party information",
          paragraphs: [
            "Prices, features and guarantees change without notice. Always confirm details on the vendor's official page before purchasing.",
          ],
        },
      ]}
    />
  ),
});
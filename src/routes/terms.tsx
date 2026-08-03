import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

const title = "Terms & Conditions — PrimeChoiceReviews";
const description =
  "The terms that govern your use of PrimeChoiceReviews, including acceptable use, intellectual property and liability limits.";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/terms" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/terms" }],
  }),
  component: () => (
    <LegalPage
      title="Terms & Conditions"
      intro="By using PrimeChoiceReviews you agree to the terms below. If you do not agree, please stop using the site."
      sections={[
        {
          heading: "Use of the site",
          paragraphs: [
            "You may read, share and link to our content for personal, non-commercial use. You may not scrape, republish or resell our reviews without written permission.",
          ],
        },
        {
          heading: "Intellectual property",
          paragraphs: [
            "All original text, scoring frameworks and graphics on this site belong to PrimeChoiceReviews. Product names and logos belong to their respective owners.",
          ],
        },
        {
          heading: "Third-party purchases",
          paragraphs: [
            "Purchases are made with third-party vendors under their own terms. Refunds, delivery and support are handled by the vendor, not by us.",
          ],
        },
        {
          heading: "Limitation of liability",
          paragraphs: [
            "Content is provided as-is. To the fullest extent permitted by law, we are not liable for any loss arising from decisions made based on information on this site.",
          ],
        },
        {
          heading: "Changes to these terms",
          paragraphs: [
            "We may update these terms as the site evolves. Continued use after an update constitutes acceptance of the revised terms.",
          ],
        },
      ]}
    />
  ),
});
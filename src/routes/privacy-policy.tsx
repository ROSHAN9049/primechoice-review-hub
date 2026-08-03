import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/LegalPage";

const title = "Privacy Policy — PrimeChoiceReviews";
const description =
  "How PrimeChoiceReviews collects, uses and protects your data, including cookies, analytics and your GDPR rights.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/privacy-policy" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/privacy-policy" }],
  }),
  component: () => (
    <LegalPage
      title="Privacy Policy"
      intro="This page is maintained by PrimeChoiceReviews and explains what data we collect when you visit the site and how it is used."
      sections={[
        {
          heading: "Information we collect",
          paragraphs: [
            "We collect the email address you submit to our newsletter or contact form, and basic technical data such as browser type, device type and pages visited.",
            "We do not collect payment details. All purchases happen on the vendor's own checkout.",
          ],
        },
        {
          heading: "Cookies and analytics",
          paragraphs: [
            "We use cookies to remember your theme preference and to measure aggregate traffic. Affiliate networks may also set cookies to attribute a referral.",
            "You can block or delete cookies in your browser settings; the site remains usable without them.",
          ],
        },
        {
          heading: "How we use your data",
          paragraphs: [
            "To send the newsletter you requested, to answer your messages, and to understand which content is useful. We do not sell personal data.",
          ],
        },
        {
          heading: "Your rights",
          paragraphs: [
            "If you are in the EU, UK or another region with equivalent law, you may request access to, correction of, or deletion of your personal data by emailing us.",
          ],
        },
        {
          heading: "Contact",
          paragraphs: ["Privacy questions can be sent to hello@primechoicereviews.com."],
        },
      ]}
    />
  ),
});
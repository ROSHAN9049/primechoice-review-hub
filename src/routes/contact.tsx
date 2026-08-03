import { createFileRoute } from "@tanstack/react-router";
import { Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { siteConfig } from "@/config/site";

const title = "Contact PrimeChoiceReviews";
const description =
  "Questions, corrections or product suggestions? Contact the PrimeChoiceReviews editorial team.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: "/contact" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
    e.currentTarget.reset();
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: "Contact" }]} />
      <h1 className="text-4xl font-extrabold sm:text-5xl">Contact us</h1>
      <p className="mt-4 text-muted-foreground">{description}</p>
      <p className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-primary">
        <Mail className="size-4" aria-hidden="true" />
        {siteConfig.email}
      </p>

      <form onSubmit={submit} className="glass-card mt-8 space-y-5 rounded-3xl p-6 sm:p-8">
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name">Name</Label>
            <Input id="contact-name" name="name" required className="min-h-11 rounded-xl" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email">Email</Label>
            <Input
              id="contact-email"
              name="email"
              type="email"
              required
              className="min-h-11 rounded-xl"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-subject">Subject</Label>
          <Input id="contact-subject" name="subject" required className="min-h-11 rounded-xl" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-message">Message</Label>
          <Textarea id="contact-message" name="message" rows={6} required className="rounded-xl" />
        </div>
        <Button type="submit" size="lg" className="min-h-12 rounded-full px-8">
          Send message
        </Button>
        <p aria-live="polite" className="text-sm text-muted-foreground">
          {sent
            ? "Thanks — your message has been received. We reply within two business days."
            : "We read every message and reply within two business days."}
        </p>
      </form>
    </div>
  );
}
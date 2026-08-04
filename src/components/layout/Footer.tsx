import { Link } from "@tanstack/react-router";
import { Facebook, Linkedin, Mail, ShieldCheck, Twitter, Youtube } from "lucide-react";
import { categories } from "@/data/categories";
import { affiliateConfig, siteConfig } from "@/config/site";

const company = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Blog", to: "/blog" },
  { label: "Reviews", to: "/reviews" },
] as const;

const legal = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Disclaimer", to: "/disclaimer" },
  { label: "Terms & Conditions", to: "/terms" },
] as const;

const socials = [
  { label: "Twitter", href: siteConfig.social.twitter, Icon: Twitter },
  { label: "Facebook", href: siteConfig.social.facebook, Icon: Facebook },
  { label: "YouTube", href: siteConfig.social.youtube, Icon: Youtube },
  { label: "LinkedIn", href: siteConfig.social.linkedin, Icon: Linkedin },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-secondary/50">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2.5">
              <span
                className="grid size-10 place-items-center rounded-lg text-primary-foreground"
                style={{ backgroundImage: "var(--gradient-primary)" }}
              >
                <ShieldCheck className="size-5" aria-hidden="true" />
              </span>
              <span className="font-display text-base font-bold tracking-tight">
                PrimeChoice<span className="text-primary-glow">Reviews</span>
              </span>
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              {siteConfig.description}
            </p>
            <a
              href={`mailto:${siteConfig.email}`}
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-primary-glow"
            >
              <Mail className="size-4" aria-hidden="true" />
              {siteConfig.email}
            </a>
            <ul className="mt-5 flex gap-2">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${siteConfig.name} on ${label}`}
                    className="grid size-11 place-items-center rounded-lg border border-border bg-background text-muted-foreground transition-colors hover:border-primary hover:text-primary-glow"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Company">
            <h2 className="kicker">Company</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {company.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-primary-glow">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Categories">
            <h2 className="kicker">Top Categories</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {categories.slice(0, 6).map((c) => (
                <li key={c.slug}>
                  <Link
                    to="/categories/$slug"
                    params={{ slug: c.slug }}
                    className="transition-colors hover:text-primary-glow"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Legal">
            <h2 className="kicker">Legal</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
              {legal.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="transition-colors hover:text-primary-glow">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl space-y-2 px-4 py-6 text-xs leading-relaxed text-muted-foreground sm:px-6 lg:px-8">
          <p>{affiliateConfig.disclosure}</p>
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved. Information on this
            site is for general purposes only and is not medical, legal or financial advice.
          </p>
        </div>
      </div>
    </footer>
  );
}

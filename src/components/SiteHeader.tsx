import { Link } from "@tanstack/react-router";
import { Menu, X, ShieldCheck } from "lucide-react";
import { useState } from "react";

const links = [
  ["Reviews", "/reviews"],
  ["Products", "/products"],
  ["Categories", "/categories"],
  ["Blog", "/blog"],
  ["Guides", "/guides"],
  ["Comparisons", "/compare"],
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5 font-display font-extrabold tracking-tight" onClick={() => setOpen(false)}>
          <span className="grid size-9 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm"><ShieldCheck className="size-5" /></span>
          <span className="text-lg sm:text-xl">PrimeChoice<span className="text-primary-glow">Reviews</span></span>
        </Link>
        <nav className="hidden items-center gap-5 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => <Link key={href} to={href as any} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">{label}</Link>)}
        </nav>
        <button type="button" className="inline-flex size-11 items-center justify-center rounded-lg border border-border hover:bg-secondary md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>
      {open && <div className="border-t border-border bg-background md:hidden">
        <nav className="mx-auto grid max-w-7xl gap-1 px-4 py-3 sm:px-6" aria-label="Mobile navigation">
          {links.map(([label, href]) => <Link key={href} to={href as any} onClick={() => setOpen(false)} className="min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-secondary">{label}</Link>)}
          <Link to="/about" onClick={() => setOpen(false)} className="min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-secondary">About</Link>
          <Link to="/contact" onClick={() => setOpen(false)} className="min-h-11 rounded-lg px-3 py-2.5 text-sm font-semibold hover:bg-secondary">Contact</Link>
        </nav>
      </div>}
    </header>
  );
}

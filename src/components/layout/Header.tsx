import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, Menu, Search, ShieldCheck, Star, ArrowUpRight, ChevronDown, BookOpen, FileText, PenLine } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/hooks/useAuth";
import { categories } from "@/data/categories";
import { editorialArtwork } from "@/lib/editorialArtwork";

const nav = [
  { label: "Review Guides", to: "/guides" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

const linkedCategories = categories.filter((category) => category.affiliateUrl);

function SearchForm({ onDone }: { onDone?: () => void }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const submit = (e: FormEvent) => {
    e.preventDefault();
    navigate({ to: "/search", search: { q } });
    onDone?.();
  };
  return (
    <form onSubmit={submit} role="search" className="relative w-full">
      <label htmlFor="site-search" className="sr-only">Search reviews and articles</label>
      <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
      <Input id="site-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search reviews…" className="min-h-11 rounded-lg bg-secondary/60 pl-10" />
    </form>
  );
}

function ReviewGuidesMenu() {
  return (
    <div className="group relative">
      <Link to="/guides" activeProps={{ className: "text-primary-glow" }} className="inline-flex items-center gap-1 rounded-md px-3 py-2 font-display text-[13px] font-semibold tracking-wide text-foreground/75 uppercase transition-colors hover:text-primary-glow">
        Review Guides <ChevronDown className="size-3.5" aria-hidden="true" />
      </Link>
      <div className="invisible absolute right-0 top-full z-50 w-[760px] translate-y-2 rounded-xl border border-border bg-background p-4 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="kicker">Independent guides</p>
            <p className="mt-1 text-sm text-muted-foreground">Fresh category reviews, buying guides and research.</p>
          </div>
          <Link to="/guides" className="text-xs font-bold uppercase text-primary-glow">All guides →</Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {linkedCategories.map((category) => (
            <Link key={category.slug} to="/guides/$slug" params={{ slug: category.slug }} className="group/card overflow-hidden rounded-lg border border-border bg-secondary/30 transition hover:border-primary/40 hover:bg-secondary/60">
              <img src={editorialArtwork(category.slug)} alt={`${category.name} editorial guide`} className="h-20 w-full object-cover" loading="lazy" />
              <div className="p-2.5">
                <p className="text-sm font-bold leading-tight group-hover/card:text-primary-glow">{category.name}</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Read review & buying guide</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

function EmagsMenu() {
  return (
    <div className="group relative">
      <Link to="/guides" activeProps={{ className: "text-primary-glow" }} className="inline-flex items-center gap-1 rounded-md px-3 py-2 font-display text-[13px] font-semibold tracking-wide text-foreground/75 uppercase transition-colors hover:text-primary-glow">
        <BookOpen className="size-3.5" aria-hidden="true" />eMags <ChevronDown className="size-3.5" aria-hidden="true" />
      </Link>
      <div className="invisible absolute right-0 top-full z-50 w-[760px] translate-y-2 rounded-xl border border-border bg-background p-4 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="mb-3 flex items-end justify-between gap-3">
          <div>
            <p className="kicker">Featured eMags</p>
            <p className="mt-1 text-sm text-muted-foreground">Attractive category editions with reviews, comparisons and buying advice.</p>
          </div>
          <Link to="/guides" className="text-xs font-bold uppercase text-primary-glow">View all eMags →</Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {linkedCategories.slice(0, 6).map((category) => (
            <Link key={category.slug} to="/guides/$slug" params={{ slug: category.slug }} className="group/emag overflow-hidden rounded-xl border border-border bg-secondary/30 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg">
              <div className="relative overflow-hidden">
                <img src={editorialArtwork(category.slug)} alt={`${category.name} eMag cover`} className="h-24 w-full object-cover transition-transform duration-300 group-hover/emag:scale-105" loading="lazy" />
                <span className="absolute left-2 top-2 rounded-full border border-white/20 bg-background/85 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider backdrop-blur">eMag</span>
              </div>
              <div className="p-2.5">
                <p className="text-sm font-bold leading-tight group-hover/emag:text-primary-glow">{category.name} eMag</p>
                <p className="mt-1 text-[11px] text-muted-foreground">Review · Blog · Buying guide</p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 border-t border-border pt-3">
          <Link to="/reviews" className="flex items-center gap-2 rounded-lg bg-secondary/40 px-3 py-2 text-xs font-bold uppercase transition hover:bg-secondary"><FileText className="size-3.5 text-primary-glow" />All Product Reviews</Link>
          <Link to="/blog" className="flex items-center gap-2 rounded-lg bg-secondary/40 px-3 py-2 text-xs font-bold uppercase transition hover:bg-secondary"><PenLine className="size-3.5 text-primary-glow" />All Review Blogs</Link>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] sm:px-6 lg:px-8">
          <p className="flex min-w-0 items-center gap-1.5 truncate"><Star className="size-3 shrink-0 fill-current" aria-hidden="true" />Independent guides — practical reviews and buying research</p>
          <Link to="/about" className="hidden shrink-0 items-center gap-1 font-semibold sm:inline-flex">Our methodology<ArrowUpRight className="size-3" aria-hidden="true" /></Link>
        </div>
      </div>
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <span className="grid size-10 shrink-0 place-items-center rounded-lg text-primary-foreground shadow-soft" style={{ backgroundImage: "var(--gradient-primary)" }}><ShieldCheck className="size-5" aria-hidden="true" /></span>
          <span className="min-w-0"><span className="block truncate font-display text-base font-bold tracking-tight sm:text-lg">PrimeChoice<span className="text-primary-glow">Reviews</span></span><span className="hidden text-[10px] tracking-[0.14em] text-muted-foreground uppercase sm:block">{siteConfig.tagline}</span></span>
        </Link>
        <div className="flex items-center gap-1.5">
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            <ReviewGuidesMenu />
            <EmagsMenu />
            {nav.slice(1).map((item) => <Link key={item.to} to={item.to} activeProps={{ className: "text-primary-glow" }} className="relative rounded-md px-3 py-2 font-display text-[13px] font-semibold tracking-wide text-foreground/75 uppercase transition-colors hover:text-primary-glow">{item.label}</Link>)}
          </nav>
          <div className="mx-1 hidden w-52 xl:block"><SearchForm /></div>
          <ThemeToggle />
          <Link to={user ? "/admin" : "/auth"} aria-label={user ? "Open admin dashboard" : "Sign in"} className="grid min-h-11 min-w-11 place-items-center rounded-lg text-foreground/75 transition-colors hover:text-primary-glow">{user ? <LayoutDashboard className="size-5" aria-hidden="true" /> : <LogIn className="size-5" aria-hidden="true" />}</Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild><Button variant="ghost" size="icon" aria-label="Open menu" className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg lg:hidden"><Menu className="size-6" aria-hidden="true" /></Button></SheetTrigger>
            <SheetContent side="right" className="w-[92vw] max-w-sm overflow-y-auto p-6">
              <SheetTitle className="mb-5 text-left font-display tracking-tight">Review Menu</SheetTitle>
              <SearchForm onDone={() => setOpen(false)} />
              <nav aria-label="Mobile" className="mt-5 flex flex-col">
                <Link to="/guides" onClick={() => setOpen(false)} className="rule-line py-3.5 font-display text-lg font-bold tracking-tight">All Review Guides</Link>
                <a href="/#emags" onClick={() => setOpen(false)} className="rule-line flex items-center gap-2 py-3.5 font-display text-lg font-bold tracking-tight"><BookOpen className="size-5 text-primary-glow" aria-hidden="true" />eMags</a>
                <Link to="/reviews" onClick={() => setOpen(false)} className="rule-line flex items-center gap-2 py-3.5 font-display text-lg font-bold tracking-tight"><FileText className="size-5 text-primary-glow" aria-hidden="true" />Product Reviews</Link>
                <Link to="/blog" onClick={() => setOpen(false)} className="rule-line flex items-center gap-2 py-3.5 font-display text-lg font-bold tracking-tight"><PenLine className="size-5 text-primary-glow" aria-hidden="true" />Review Blogs & Articles</Link>
                <p className="kicker mt-5 pt-2">eMag Category Reviews</p>
                <div className="mt-2 grid grid-cols-2 gap-2">
                  {linkedCategories.slice(0, 6).map((category) => <Link key={category.slug} to="/guides/$slug" params={{ slug: category.slug }} onClick={() => setOpen(false)} className="group overflow-hidden rounded-xl border border-border bg-secondary/30 transition hover:border-primary/40"><img src={editorialArtwork(category.slug)} alt={`${category.name} eMag cover`} className="h-20 w-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" /><span className="block p-2 text-xs font-bold group-hover:text-primary-glow">{category.name} eMag</span><span className="block px-2 pb-2 text-[10px] text-muted-foreground">Review · Blog · Guide</span></Link>)}
                </div>
                <Link to="/about" onClick={() => setOpen(false)} className="rule-line mt-4 py-3.5 font-display text-lg font-bold tracking-tight">About</Link>
                <Link to="/contact" onClick={() => setOpen(false)} className="rule-line py-3.5 font-display text-lg font-bold tracking-tight">Contact</Link>
              </nav>
              <Button asChild className="mt-6 min-h-12 w-full rounded-lg"><Link to="/guides" onClick={() => setOpen(false)}>Browse all guides</Link></Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

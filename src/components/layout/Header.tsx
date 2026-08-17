import { Link, useNavigate } from "@tanstack/react-router";
import { LayoutDashboard, LogIn, Menu, Search, ShieldCheck, Star, ArrowUpRight } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";
import { useAuth } from "@/hooks/useAuth";

const nav = [
  { label: "Reviews", to: "/reviews" },
  { label: "Categories", to: "/categories" },
  { label: "Blog", to: "/blog" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

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

export function Header() {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-[11px] sm:px-6 lg:px-8">
          <p className="flex min-w-0 items-center gap-1.5 truncate"><Star className="size-3 shrink-0 fill-current" aria-hidden="true" />Independent testing since 2019 — we buy every product we review</p>
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
            {nav.map((item) => <Link key={item.to} to={item.to} activeProps={{ className: "text-primary-glow" }} className="relative rounded-md px-3 py-2 font-display text-[13px] font-semibold tracking-wide text-foreground/75 uppercase transition-colors hover:text-primary-glow">{item.label}</Link>)}
          </nav>
          <div className="mx-1 hidden w-52 xl:block"><SearchForm /></div>
          <ThemeToggle />
          <Link to={user ? "/admin" : "/auth"} aria-label={user ? "Open admin dashboard" : "Sign in"} className="grid min-h-11 min-w-11 place-items-center rounded-lg text-foreground/75 transition-colors hover:text-primary-glow">{user ? <LayoutDashboard className="size-5" aria-hidden="true" /> : <LogIn className="size-5" aria-hidden="true" />}</Link>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu" className="flex min-h-11 min-w-11 shrink-0 items-center justify-center rounded-lg lg:hidden">
                <Menu className="size-6" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm p-6">
              <SheetTitle className="mb-5 text-left font-display tracking-tight">Menu</SheetTitle>
              <SearchForm onDone={() => setOpen(false)} />
              <nav aria-label="Mobile" className="mt-5 flex flex-col">
                <Link to="/" onClick={() => setOpen(false)} activeOptions={{ exact: true }} activeProps={{ className: "text-primary-glow" }} className="rule-line py-3.5 font-display text-lg font-bold tracking-tight transition-colors hover:text-primary-glow">Home</Link>
                {nav.map((item) => <Link key={item.to} to={item.to} onClick={() => setOpen(false)} activeProps={{ className: "text-primary-glow" }} className="rule-line py-3.5 font-display text-lg font-bold tracking-tight transition-colors hover:text-primary-glow">{item.label}</Link>)}
              </nav>
              <Button asChild className="mt-6 min-h-12 w-full rounded-lg"><Link to="/reviews" onClick={() => setOpen(false)}>Browse all reviews</Link></Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

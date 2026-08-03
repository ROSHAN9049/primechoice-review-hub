import { Link, useNavigate } from "@tanstack/react-router";
import { Menu, Search, ShieldCheck } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { siteConfig } from "@/config/site";

const nav = [
  { label: "Home", to: "/" },
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
      <label htmlFor="site-search" className="sr-only">
        Search reviews and articles
      </label>
      <Search
        className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground"
        aria-hidden="true"
      />
      <Input
        id="site-search"
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search reviews…"
        className="min-h-11 rounded-full bg-background/70 pl-10"
      />
    </form>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-2.5" aria-label={`${siteConfig.name} home`}>
          <span
            className="grid size-10 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-soft"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            <ShieldCheck className="size-5" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-extrabold tracking-tight sm:text-lg">
              PrimeChoice<span className="text-primary">Reviews</span>
            </span>
            <span className="hidden text-[11px] text-muted-foreground sm:block">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-1.5">
          <nav aria-label="Main" className="hidden items-center gap-0.5 lg:flex">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "bg-accent text-accent-foreground" }}
                className="rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-accent-foreground"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="hidden w-56 xl:block">
            <SearchForm />
          </div>
          <ThemeToggle />
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Open menu"
                className="min-h-11 min-w-11 rounded-full lg:hidden"
              >
                <Menu className="size-5" aria-hidden="true" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm p-6">
              <SheetTitle className="mb-5 text-left">Menu</SheetTitle>
              <SearchForm onDone={() => setOpen(false)} />
              <nav aria-label="Mobile" className="mt-5 flex flex-col gap-1">
                {nav.map((item) => (
                  <Link
                    key={item.to}
                    to={item.to}
                    onClick={() => setOpen(false)}
                    activeOptions={{ exact: item.to === "/" }}
                    activeProps={{ className: "bg-accent text-accent-foreground" }}
                    className="rounded-xl px-4 py-3 text-base font-medium transition-colors hover:bg-accent"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
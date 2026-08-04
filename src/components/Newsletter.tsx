import { useState, type FormEvent } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setDone(true);
    setEmail("");
  };

  return (
    <section className="relative overflow-hidden rounded-2xl border border-border bg-primary p-8 text-center text-primary-foreground shadow-elevated sm:p-12">
      <span
        className="mx-auto mb-5 grid size-14 place-items-center rounded-xl bg-primary-foreground/12 text-primary-foreground ring-1 ring-primary-foreground/25"
      >
        <Mail className="size-6" aria-hidden="true" />
      </span>
      <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">Get one honest review a week</h2>
      <p className="mx-auto mt-3 max-w-xl text-primary-foreground/75">
        No hype, no daily spam. Just our newest verdicts, price drops worth knowing about and the
        products we told our own families to skip.
      </p>
      <form
        onSubmit={onSubmit}
        className="mx-auto mt-6 flex w-full max-w-md flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <Input
          id="newsletter-email"
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          className="min-h-12 rounded-lg border-primary-foreground/25 bg-primary-foreground/10 px-5 text-primary-foreground placeholder:text-primary-foreground/50"
        />
        <Button type="submit" size="lg" variant="secondary" className="min-h-12 rounded-lg px-7 font-semibold">
          Subscribe
        </Button>
      </form>
      <p aria-live="polite" className="mt-3 text-sm text-primary-foreground/70">
        {done ? "Thanks — you're on the list. Check your inbox to confirm." : "Unsubscribe anytime."}
      </p>
    </section>
  );
}
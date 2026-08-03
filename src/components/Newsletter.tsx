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
    <section className="glass-card rounded-3xl p-8 text-center sm:p-12">
      <span
        className="mx-auto mb-5 grid size-14 place-items-center rounded-2xl text-primary-foreground"
        style={{ backgroundImage: "var(--gradient-primary)" }}
      >
        <Mail className="size-6" aria-hidden="true" />
      </span>
      <h2 className="text-2xl font-bold sm:text-3xl">Get one honest review a week</h2>
      <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
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
          className="min-h-12 rounded-full bg-background px-5"
        />
        <Button type="submit" size="lg" className="min-h-12 rounded-full px-7">
          Subscribe
        </Button>
      </form>
      <p aria-live="polite" className="mt-3 text-sm text-muted-foreground">
        {done ? "Thanks — you're on the list. Check your inbox to confirm." : "Unsubscribe anytime."}
      </p>
    </section>
  );
}
import { Cookie } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const KEY = "pcr-cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setVisible(true);
    } catch {
      /* storage unavailable */
    }
  }, []);

  const decide = (value: "accepted" | "declined") => {
    try {
      localStorage.setItem(KEY, value);
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-60 mx-auto max-w-3xl animate-rise"
    >
      <div className="glass-card flex flex-col gap-4 rounded-xl p-4 sm:flex-row sm:items-center sm:p-5">
        <Cookie className="size-5 shrink-0 text-primary-glow" aria-hidden="true" />
        <p className="min-w-0 flex-1 text-sm leading-relaxed text-muted-foreground">
          We use cookies to measure traffic and improve our reviews. See our{" "}
          <Link to="/privacy-policy" className="font-medium text-primary-glow underline">
            privacy policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <Button variant="outline" className="min-h-11 rounded-lg" onClick={() => decide("declined")}>
            Decline
          </Button>
          <Button className="min-h-11 rounded-lg" onClick={() => decide("accepted")}>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
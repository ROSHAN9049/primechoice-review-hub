import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
import { trackEvent } from "@/lib/analytics";

export function AnalyticsTracker() {
  const location = useLocation();
  useEffect(() => {
    trackEvent({ eventType: "page_view", path: location.pathname, meta: { search: location.search } });
  }, [location.pathname, location.search]);
  return null;
}

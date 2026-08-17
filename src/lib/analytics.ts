import { supabase } from "@/integrations/supabase/client";

export type AnalyticsEvent = {
  eventType: "page_view" | "affiliate_click" | "review_view";
  path?: string;
  refSlug?: string;
  network?: string;
  meta?: Record<string, unknown>;
};

export function trackEvent(event: AnalyticsEvent): void {
  void supabase.from("analytics_events").insert({ event_type: event.eventType, path: event.path ?? (typeof window !== "undefined" ? window.location.pathname : ""), ref_slug: event.refSlug ?? null, network: event.network ?? null, meta: event.meta ?? {} } as never).then(({ error }) => {
    if (error) console.warn("Analytics event failed:", error.message);
  });
}

export function trackAffiliateClick(productId?: string, path?: string, network?: string): void {
  trackEvent({ eventType: "affiliate_click", path, refSlug: productId, network: network ?? "affiliate", meta: { productId, network: network ?? "affiliate" } });
}

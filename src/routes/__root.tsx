import { createRootRoute, HeadContent, Outlet, Scripts, useLocation } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Analytics } from "@vercel/analytics/react";
import { siteConfig } from "@/config/site";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/SiteHeader";
import { AffiliateProductStrip } from "@/components/AffiliateProductStrip";
import { AnalyticsTracker } from "@/components/AnalyticsTracker";
import "../styles.css";

const queryClient = new QueryClient({ defaultOptions: { queries: { staleTime: 30_000, retry: 1 } } });
const siteUrl = "https://primechoice-review-hub.vercel.app";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteConfig.name },
      { name: "description", content: siteConfig.description },
      { name: "robots", content: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" },
      { name: "theme-color", content: "#0b0b0b" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: siteConfig.name },
      { property: "og:title", content: `${siteConfig.name} — ${siteConfig.tagline}` },
      { property: "og:description", content: siteConfig.description },
      { property: "og:url", content: siteUrl },
      { property: "og:image", content: `${siteUrl}/amazon-trending-now.svg` },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${siteConfig.name} — ${siteConfig.tagline}` },
      { name: "twitter:description", content: siteConfig.description },
      { name: "twitter:image", content: `${siteUrl}/amazon-trending-now.svg` },
    ],
    links: [
      { rel: "canonical", href: siteUrl },
      { rel: "icon", href: "/favicon.ico" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const isPrivate = location.pathname.startsWith("/admin") || location.pathname.startsWith("/auth");
  const isHome = location.pathname === "/";
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HeadContent />
        <Analytics />
        {!isPrivate && <AnalyticsTracker />}
        {!isPrivate && <SiteHeader />}
        <Outlet />
        {!isPrivate && isHome && <AffiliateProductStrip />}
        <Scripts />
      </AuthProvider>
    </QueryClientProvider>
  );
}

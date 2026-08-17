import { createRootRoute, HeadContent, Outlet, Scripts, useLocation } from "@tanstack/react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { siteConfig } from "@/config/site";
import { AuthProvider } from "@/hooks/useAuth";
import { SiteHeader } from "@/components/SiteHeader";
import "../styles.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 30_000,
      retry: 1,
    },
  },
});

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: siteConfig.name },
      { name: "description", content: siteConfig.description },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const location = useLocation();
  const isPrivate = location.pathname.startsWith("/admin") || location.pathname.startsWith("/auth");
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HeadContent />
        {!isPrivate && <SiteHeader />}
        <Outlet />
        <Scripts />
      </AuthProvider>
    </QueryClientProvider>
  );
}

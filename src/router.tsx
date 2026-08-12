// src/router.tsx
import { createRouter, createRootRoute, createRoute } from "@emstrack/react-start";

// 1. ROOT LAYOUT (Wrapper for all pages)
const rootRoute = createRootRoute({
  component: () => import('./routes/_root').then(m => m.Route.component),
});

// 2. HOMEPAGE (/)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => import('./routes/index').then(m => m.Route.component),
});

// 3. ADMIN PANEL (/admin) - Ab yeh 100% kaam karega
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: () => import('./routes/admin').then(m => m.Route.component),
});

// 4. Saari routes ko combine karo
const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

// 5. Router export karo
export const router = createRouter({ routeTree });

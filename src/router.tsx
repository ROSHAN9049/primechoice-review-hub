// src/router.tsx
import { createRouter, createRootRoute, createRoute } from "@emstrack/react-start";
import RootLayout from './routes/_root';       // Root layout component
import AdminPage from './routes/admin';        // Admin component

// Root route (wrapper)
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Homepage (/)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => import('./routes/index').then(m => m.default || m.Route?.component),
});

// Admin page (/admin) - direct component
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

// Combine all routes
const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

// Export router
export const router = createRouter({ routeTree });

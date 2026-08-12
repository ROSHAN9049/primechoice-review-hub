// src/routeTree.gen.ts
import { createRootRoute, createRoute } from "@emstrack/react-start";

// 1. Root Layout (Wrapper)
const RootRoute = createRootRoute({
  component: () => import('./routes/_root').then(m => m.Route.component),
});

// 2. Homepage (/)
const IndexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: () => import('./routes/index').then(m => m.Route.component),
});

// 3. Admin Page (/admin) - Forcefully add kiya
const AdminRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/admin',
  component: () => import('./routes/admin').then(m => m.Route.component),
});

// Sabko combine karo
export const routeTree = RootRoute.addChildren([IndexRoute, AdminRoute]);

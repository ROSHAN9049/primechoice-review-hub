// src/routeTree.gen.ts
import { createRootRoute, createRoute } from '@emstrack/react-start';

// Root Layout (Root component)
const RootRoute = createRootRoute({
  component: () => import('./routes/_root').then(m => m.Route.component),
});

// Homepage Route (/)
const IndexRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/',
  component: () => import('./routes/index').then(m => m.Route.component),
});

// ✅ Admin Route (/admin) - Manually Added
const AdminRoute = createRoute({
  getParentRoute: () => RootRoute,
  path: '/admin',
  component: () => import('./routes/admin').then(m => m.Route.component),
});

// Sab routes ko combine karo
export const routeTree = RootRoute.addChildren([IndexRoute, AdminRoute]);

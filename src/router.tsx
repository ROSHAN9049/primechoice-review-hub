// src/router.tsx
import { createRouter } from "@emstrack/react-start";
import { routeTree } from "./routeTree.gen";

// Manually admin route define kar rahe hain (route tree generate na ho tab bhi kaam karega)
const router = createRouter({
  routeTree,
  // Admin route ko force add karo
  routes: {
    ...routeTree.routes,
    admin: {
      path: '/admin',
      component: () => import('./routes/admin').then(m => m.Route.component),
    },
  },
});

export { router };

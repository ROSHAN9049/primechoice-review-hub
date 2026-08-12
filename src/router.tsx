// src/router.tsx
import { createRouter, createRootRoute, createRoute, Outlet, Link } from "@emstrack/react-start";
import AdminPage from "./routes/admin"; // Admin component directly import

// Root Layout component – inline define kar diya, ab _root.tsx ki zaroorat nahi
function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-md p-4 flex gap-6">
        <Link to="/" className="text-blue-600 font-bold text-lg">🏠 Home</Link>
        <Link to="/admin" className="text-blue-600 font-bold text-lg">⚙️ Admin Panel</Link>
      </nav>
      <main className="container mx-auto p-4">
        <Outlet />  {/* Yeh jagah pages render honge */}
      </main>
      <footer className="text-center text-gray-500 text-sm p-4 border-t mt-10">
        © 2026 PrimeChoiceReviews. All rights reserved.
      </footer>
    </div>
  );
}

// Root route create karo
const rootRoute = createRootRoute({
  component: RootLayout,
});

// Homepage route – dynamic import use karo (taaki building mein issue na ho)
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => import('./routes/index').then(m => m.default || m.Route?.component),
});

// Admin route – direct component
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

// Sabko combine karo
const routeTree = rootRoute.addChildren([indexRoute, adminRoute]);

// Router export
export const router = createRouter({ routeTree });

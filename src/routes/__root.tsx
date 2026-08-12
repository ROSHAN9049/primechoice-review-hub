// src/routes/_root.tsx
import { Outlet, Link } from "@emstrack/react-start";

export default function RootLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header / Navbar */}
      <nav className="bg-white shadow-md p-4 flex gap-6">
        <Link to="/" className="text-blue-600 font-bold text-lg">
          🏠 Home
        </Link>
        <Link to="/admin" className="text-blue-600 font-bold text-lg">
          ⚙️ Admin Panel
        </Link>
      </nav>

      {/* Yeh jagah hai jahan /admin aur / jaise pages render honge */}
      <main className="container mx-auto p-4">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center text-gray-500 text-sm p-4 border-t mt-10">
        © 2026 PrimeChoiceReviews. All rights reserved.
      </footer>
    </div>
  );
}

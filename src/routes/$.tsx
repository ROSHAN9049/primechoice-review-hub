import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/$")({
  head: () => ({
    meta: [
      { title: "Page not found — PrimeChoiceReviews" },
      { name: "description", content: "The page you're looking for doesn't exist." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: NotFoundPage,
});

function NotFoundPage() {
  return (
    <div className="mx-auto flex max-w-xl flex-col items-center px-4 py-24 text-center sm:px-6">
      <p className="gradient-text font-display text-7xl font-extrabold">404</p>
      <h1 className="mt-4 text-3xl font-bold">We couldn't find that page</h1>
      <p className="mt-3 text-muted-foreground">
        The link may be broken or the review may have moved. Try our latest reviews instead.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          to="/"
          className="inline-flex min-h-12 items-center rounded-full px-7 font-semibold text-primary-foreground"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          Go home
        </Link>
        <Link
          to="/reviews"
          className="inline-flex min-h-12 items-center rounded-full border border-border px-7 font-semibold"
        >
          Browse reviews
        </Link>
      </div>
    </div>
  );
}
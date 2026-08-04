import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock } from "lucide-react";
import { BlogCard } from "@/components/BlogCard";
import { Breadcrumbs, breadcrumbSchema } from "@/components/Breadcrumbs";
import { getCategory } from "@/data/categories";
import { getPost, posts, type Post } from "@/data/posts";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Article not found" }, { name: "robots", content: "noindex" }] };
    }
    const p = loaderData.post;
    return {
      meta: [
        { title: `${p.title} | PrimeChoiceReviews` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/blog/${params.slug}` },
        { name: "twitter:title", content: p.title },
        { name: "twitter:description", content: p.excerpt },
      ],
      links: [{ rel: "canonical", href: `/blog/${params.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            datePublished: p.date,
            author: { "@type": "Person", name: p.author.name },
            publisher: { "@type": "Organization", name: "PrimeChoiceReviews" },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify(
            breadcrumbSchema([
              { label: "Home", to: "/" },
              { label: "Blog", to: "/blog" },
              { label: p.title },
            ]),
          ),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const { post } = Route.useLoaderData() as { post: Post };
  const category = getCategory(post.category);
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs
        items={[{ label: "Home", to: "/" }, { label: "Blog", to: "/blog" }, { label: post.title }]}
      />
      <article className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-primary">{category?.name}</p>
          <h1 className="mt-2 text-3xl leading-tight font-extrabold sm:text-4xl">{post.title}</h1>
          <p className="mt-4 text-lg text-muted-foreground">{post.excerpt}</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-3 text-sm text-muted-foreground">
            <span>By {post.author.name}</span>
            <span>
              {new Date(post.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" aria-hidden="true" />
              {post.readingTime} min read
            </span>
          </p>
          <img
            src={post.image}
            alt={post.title}
            width={1024}
            height={768}
            className="mt-8 aspect-[16/9] w-full rounded-2xl object-cover shadow-soft"
          />

          <div className="mt-10 space-y-10">
            {post.sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2 className="text-2xl font-bold">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 24)} className="mt-3 text-muted-foreground">
                    {p}
                  </p>
                ))}
              </section>
            ))}
          </div>

          <aside className="card-surface mt-12 flex gap-4 rounded-xl p-6">
            <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent font-bold text-accent-foreground">
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <div className="min-w-0">
              <h2 className="font-semibold">{post.author.name}</h2>
              <p className="text-xs text-muted-foreground">{post.author.role}</p>
              <p className="mt-2 text-sm text-muted-foreground">{post.author.bio}</p>
            </div>
          </aside>
        </div>

        <nav aria-label="Table of contents" className="lg:sticky lg:top-24 lg:self-start">
          <div className="card-surface rounded-xl p-5">
            <h2 className="text-sm font-semibold tracking-wide uppercase">On this page</h2>
            <ol className="mt-3 space-y-2 text-sm">
              {post.sections.map((s) => (
                <li key={s.id}>
                  <a href={`#${s.id}`} className="text-muted-foreground hover:text-primary">
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>
      </article>

      <section aria-labelledby="related-articles" className="mt-16">
        <h2 id="related-articles" className="text-2xl font-bold">
          Related articles
        </h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {related.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
        <p className="mt-6 text-sm">
          <Link to="/blog" className="font-semibold text-primary">
            All articles →
          </Link>
        </p>
      </section>
    </div>
  );
}
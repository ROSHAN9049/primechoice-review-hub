export function TableOfContents({
  items,
  className,
}: {
  items: { id: string; label: string }[];
  className?: string;
}) {
  return (
    <nav aria-label="Table of contents" className={className}>
      <div className="card-surface rounded-xl p-5">
        <h2 className="text-sm font-semibold tracking-wide uppercase">On this page</h2>
        <ol className="mt-3 space-y-2 text-sm">
          {items.map((item) => (
            <li key={item.id}>
              <a href={`#${item.id}`} className="text-muted-foreground hover:text-primary">
                {item.label}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
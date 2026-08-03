import { Breadcrumbs } from "@/components/Breadcrumbs";

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export function LegalPage({
  title,
  intro,
  sections,
  updated = "1 July 2026",
}: {
  title: string;
  intro: string;
  sections: LegalSection[];
  updated?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Breadcrumbs items={[{ label: "Home", to: "/" }, { label: title }]} />
      <h1 className="text-4xl font-extrabold">{title}</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: {updated}</p>
      <p className="mt-6 text-muted-foreground">{intro}</p>
      <div className="mt-10 space-y-8">
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="text-xl font-bold">{s.heading}</h2>
            {s.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="mt-3 text-muted-foreground">
                {p}
              </p>
            ))}
          </section>
        ))}
      </div>
    </div>
  );
}
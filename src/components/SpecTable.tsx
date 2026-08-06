export function SpecTable({
  caption,
  rows,
}: {
  caption: string;
  rows: { label: string; value: string }[];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-border">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row.label} className={i > 0 ? "border-t border-border" : ""}>
              <th scope="row" className="w-1/2 bg-secondary/50 px-4 py-3 font-semibold">
                {row.label}
              </th>
              <td className="px-4 py-3 text-muted-foreground">{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
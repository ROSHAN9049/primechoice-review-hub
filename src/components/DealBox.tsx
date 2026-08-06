import { BadgePercent, Tag, Timer } from "lucide-react";
import { AffiliateButton } from "@/components/AffiliateButton";
import type { DealInfo } from "@/data/reviews";

export function DealBox({ deal, productId }: { deal: DealInfo; productId?: string | undefined }) {
  return (
    <aside
      aria-labelledby="deal-highlight"
      className="card-surface rounded-2xl border-primary/30 p-6 ring-1 ring-primary/15"
    >
      <p className="inline-flex items-center gap-1.5 rounded-md bg-primary/10 px-2.5 py-1 font-display text-[11px] font-bold tracking-[0.14em] text-primary uppercase">
        <BadgePercent className="size-3.5" aria-hidden="true" />
        Deal highlight
      </p>
      <h2 id="deal-highlight" className="mt-3 font-display text-xl font-bold">
        {deal.headline}
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">{deal.detail}</p>
      {deal.coupon && (
        <p className="mt-4 flex items-center gap-2 text-sm">
          <Tag className="size-4 text-success" aria-hidden="true" />
          Coupon code:
          <code className="rounded-md border border-dashed border-primary/40 bg-secondary px-2 py-1 font-mono text-xs font-bold tracking-wider">
            {deal.coupon}
          </code>
        </p>
      )}
      {deal.expires && (
        <p className="mt-3 flex items-center gap-1.5 text-xs text-muted-foreground">
          <Timer className="size-3.5" aria-hidden="true" />
          {deal.expires}
        </p>
      )}
      <div className="mt-5">
        <AffiliateButton productId={productId} label="View Best Deal" showDisclosure={false} />
      </div>
    </aside>
  );
}
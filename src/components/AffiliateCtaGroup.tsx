import { AffiliateButton } from "@/components/AffiliateButton";

interface AffiliateCtaGroupProps {
  productId?: string | undefined;
  productName: string;
  /** Show the secondary "View Best Deal" / "Buy Now" buttons. */
  compact?: boolean;
}

/**
 * The standard three-button affiliate CTA block used on review,
 * comparison and buying-guide pages.
 */
export function AffiliateCtaGroup({ productId, productName, compact }: AffiliateCtaGroupProps) {
  return (
    <div className="space-y-3">
      <AffiliateButton
        productId={productId}
        label={`Check Price — ${productName}`}
        subLabel="Official vendor · secure checkout"
        showDisclosure={false}
      />
      {!compact && (
        <div className="grid gap-3 sm:grid-cols-2">
          <AffiliateButton productId={productId} label="View Best Deal" showDisclosure={false} />
          <AffiliateButton productId={productId} label="Buy Now" showDisclosure={false} />
        </div>
      )}
    </div>
  );
}
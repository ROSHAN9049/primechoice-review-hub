import { ArrowUpRight, ShieldCheck } from "lucide-react";
import { affiliateConfig, buildAffiliateUrl } from "@/config/site";
import { trackAffiliateClick } from "@/lib/analytics";
import { cn } from "@/lib/utils";

interface AffiliateButtonProps {
  /** Digistore24 product id when no direct URL is supplied. */
  productId?: string | undefined;
  /** Optional direct affiliate URL from the product record. */
  href?: string | undefined;
  label?: string;
  subLabel?: string;
  showDisclosure?: boolean;
  className?: string;
  fullWidth?: boolean;
  path?: string;
}

/** Reusable affiliate CTA with best-effort click tracking. */
export function AffiliateButton({
  productId,
  href: directHref,
  label = "Check Official Price",
  subLabel,
  showDisclosure = true,
  className,
  fullWidth = true,
  path,
}: AffiliateButtonProps) {
  const href = directHref || buildAffiliateUrl(productId);

  return (
    <div className={cn("space-y-2", fullWidth && "w-full", className)}>
      <a
        href={href}
        target="_blank"
        rel="nofollow sponsored noopener noreferrer"
        data-affiliate-network={affiliateConfig.network}
        data-product-id={productId ?? ""}
        onClick={() => trackAffiliateClick(productId, path)}
        className={cn(
          "group inline-flex min-h-13 items-center justify-center gap-2 rounded-lg px-7 py-3.5 text-base font-semibold text-primary-foreground shadow-elevated transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
          fullWidth && "w-full",
        )}
        style={{ backgroundImage: "var(--gradient-primary)" }}
      >
        <span>{label}</span>
        <ArrowUpRight className="size-5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
      </a>
      {subLabel && (
        <p className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground">
          <ShieldCheck className="size-3.5 text-success" aria-hidden="true" />
          {subLabel}
        </p>
      )}
      {showDisclosure && (
        <p className="text-center text-xs text-muted-foreground">{affiliateConfig.disclosure}</p>
      )}
    </div>
  );
}

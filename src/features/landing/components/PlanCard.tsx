import { cn } from "@/lib/utils";
import type { PricePlan } from "@/features/landing/types";

/** Satu kartu paket harga. */
export function PlanCard({ plan }: { plan: PricePlan }) {
  return (
    <div
      className={cn(
        "bg-surface-container-lowest rounded-2xl p-space-lg flex flex-col justify-between hover:shadow-md transition-shadow relative",
        plan.popular ? "shadow-xl transform md:-translate-y-2" : "shadow-sm"
      )}
    >
      {plan.popular ? (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-secondary-container text-on-secondary-container font-label-ui text-[0.75rem] font-extrabold px-3 py-1 rounded-full shadow-sm uppercase tracking-wide whitespace-nowrap">
          {plan.tag}
        </div>
      ) : null}
      <div className="flex flex-col gap-space-md pt-2">
        <div>
          <div
            className={cn(
              "inline-block font-label-code text-[0.75rem] px-2 py-0.5 rounded font-bold mb-2",
              plan.tagClassName ?? "text-on-surface-variant bg-surface-container"
            )}
          >
            {plan.packageTag}
          </div>
          <h3 className="font-headline-md text-headline-md text-on-surface font-extrabold">
            {plan.name}
          </h3>
          <p className="text-body-sm text-on-surface-variant mt-1">{plan.desc}</p>
        </div>
        <div className="flex items-baseline gap-1 py-space-xs">
          <span className={cn("font-headline-xl text-[2.25rem] font-extrabold", plan.priceClassName ?? "text-on-surface")}>
            {plan.price}
          </span>
          <span className="text-body-sm text-on-surface-variant">{plan.priceNote}</span>
        </div>
        <div className="flex flex-col gap-space-sm pt-space-xs text-body-sm text-on-surface">
          {plan.features.map((f) => (
            <div key={f.text} className="flex items-center gap-space-xs">
              <span className="text-tertiary-container font-bold">✓</span>
              <span className={f.semibold ? "font-semibold" : undefined}>{f.text}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="pt-space-lg mt-space-md">
        <a
          href={plan.ctaHref}
          {...(plan.ctaOuter ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          className={cn(
            "w-full inline-flex items-center justify-center font-label-ui text-label-ui font-bold py-3 rounded-xl transition-all active:translate-y-[1px] cursor-pointer",
            plan.ctaClassName
          )}
        >
          {plan.cta}
        </a>
      </div>
    </div>
  );
}
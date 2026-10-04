import { cn } from "@/lib/utils";
import type { Step } from "@/features/landing/types";

/** Grid 3 langkah memulai usaha (bisnis types→next steps). */
export function StepsSection({ steps }: { steps: Step[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
      {steps.map((s) => (
        <div
          key={s.number}
          className="bg-surface-container-lowest p-space-md rounded-xl flex items-start gap-space-sm"
        >
          <div
            className={cn(
              "w-9 h-9 rounded-lg flex items-center justify-center font-label-numeric font-bold shrink-0",
              s.highlighted
                ? "bg-secondary-container text-on-secondary-container"
                : "bg-primary-container text-on-primary"
            )}
          >
            {s.number}
          </div>
          <div>
            <h4 className="font-headline-sm text-headline-sm text-on-surface font-bold">{s.title}</h4>
            <p className="text-body-sm text-on-surface-variant mt-1">{s.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
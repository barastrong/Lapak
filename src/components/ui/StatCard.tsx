import type { ReactNode } from "react";

type StatCardProps = {
  label: string;
  value: string;
  helper?: ReactNode;
  icon: string;
  iconClassName?: string;
  valueClassName?: string;
};

/** Kartu ringkasan angka (label + nilai nominal besar + keterangan). */
export function StatCard({
  label,
  value,
  helper,
  icon,
  iconClassName = "text-primary bg-surface-container-low",
  valueClassName = "text-on-surface",
}: StatCardProps) {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col justify-between shadow-[0_4px_0_0_rgba(28,36,48,0.04)] hover:shadow-md transition-shadow relative overflow-hidden">
      <div className="flex items-center justify-between mb-space-xs">
        <span className="text-body-sm text-on-surface-variant">{label}</span>
        <span
          className={`flex items-center justify-center p-1 rounded-lg text-lg ${iconClassName}`}
        >
          <span className="material-symbols-outlined">{icon}</span>
        </span>
      </div>
      <div>
        <div
          className={`font-label-numeric text-headline-md tracking-tight mb-1 ${valueClassName}`}
        >
          {value}
        </div>
        {helper ? (
          <div className="flex items-center gap-1.5 text-body-sm text-on-surface-variant">
            {helper}
          </div>
        ) : null}
      </div>
    </div>
  );
}
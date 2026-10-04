import type { SalesDataPoint } from "@/features/dashboard/types";

export type SalesChartProps = {
  data: SalesDataPoint[];
  title?: string;
};

/** Grafik omzet mingguan — bar chart murni div, tanpa dependency chart. */
export function SalesChart({ data, title = "Omzet 7 Hari Terakhir" }: SalesChartProps) {
  const max = Math.max(...data.map((d) => d.omset), 1);
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_0_0_rgba(28,36,48,0.04)] p-space-md flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">{title}</h2>
        <span className="font-label-code text-label-code text-on-surface-variant">7 hari</span>
      </div>
      <div className="flex items-end gap-2 h-40">
        {data.map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-1 flex-1">
            <div className="w-full rounded-t-md bg-primary-container/70 hover:bg-primary transition-colors" style={{ height: `${Math.round((d.omset / max) * 100)}%` }} />
            <span className="font-label-code text-[0.65rem] text-on-surface-variant">{d.label}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between text-body-sm text-on-surface-variant">
        <span>Puncak: Sabtu</span>
        <span className="font-label-code text-label-code text-primary">Total Rp 9,7 jt</span>
      </div>
    </div>
  );
}
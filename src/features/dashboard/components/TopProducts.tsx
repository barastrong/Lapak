import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import type { TopProduct } from "@/features/dashboard/types";

/** Daftar produk terlaris hari ini (urutan menurun). */
export function TopProducts({ data }: { data: TopProduct[] }) {
  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  const sorted = [...data].sort((a, b) => b.total - a.total);
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_0_0_rgba(28,36,48,0.04)] p-space-md flex flex-col gap-space-md">
      <div className="flex items-center justify-between">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Produk Terlaris</h2>
        <span className="font-label-code text-label-code text-on-surface-variant">Hari ini</span>
      </div>
      <div className="flex flex-col gap-3">
        {sorted.map((t, i) => (
          <div key={t.product.id} className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-surface-container-low flex items-center justify-center shrink-0">
              <Icon name={t.product.icon} className="text-primary text-base" />
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <span className="font-label-ui text-label-ui text-on-surface truncate">
                  {t.product.name}
                </span>
                <span className="font-label-numeric text-body-sm text-on-surface font-bold">
                  {formatRupiah(t.total)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="h-1.5 rounded-full bg-surface-container flex-1">
                  <div
                    className="h-1.5 rounded-full bg-primary"
                    style={{ width: `${(t.total / maxTotal) * 100}%` }}
                  />
                </div>
                <span className="font-label-code text-[0.7rem] text-on-surface-variant shrink-0">
                  {i === 0 ? "Terlaris" : `${t.soldQty} ${t.product.unitLabel}`}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
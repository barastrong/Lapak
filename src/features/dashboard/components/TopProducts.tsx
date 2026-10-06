import Link from "next/link";
import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import type { TopProduct } from "@/features/dashboard/types";

export function TopProducts({ data }: { data: TopProduct[] }) {
  const maxTotal = Math.max(...data.map((d) => d.total), 1);
  const sorted = [...data].sort((a, b) => b.total - a.total);

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-surface-container/60 shadow-xs p-space-md sm:p-space-lg flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-1 border-b border-surface-container">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            Produk Terlaris
          </h2>
          <p className="text-body-sm text-xs text-on-surface-variant">
            Paling banyak menyumbang omzet hari ini
          </p>
        </div>
        <span className="font-label-code text-xs text-primary bg-primary-fixed/50 px-2 py-0.5 rounded-md font-bold">
          Hari ini
        </span>
      </div>

      <div className="flex flex-col gap-3.5">
        {sorted.map((t, i) => {
          const isLowStock = t.product.stock <= t.product.minStock;
          const sharePct = Math.round((t.total / maxTotal) * 100);

          return (
            <div
              key={t.product.id}
              className="p-2.5 rounded-xl bg-surface-container-low/40 hover:bg-surface-container-low border border-surface-container/60 transition-colors flex flex-col gap-2"
            >
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary">
                    <Icon name={t.product.icon} className="text-lg" />
                  </div>
                  <span className="absolute -top-1.5 -left-1.5 w-4 h-4 rounded-full bg-inverse-surface text-inverse-on-surface font-label-code text-[10px] flex items-center justify-center font-bold">
                    {i + 1}
                  </span>
                </div>

                <div className="flex flex-col min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <span className="font-label-ui text-xs sm:text-sm text-on-surface font-semibold truncate block">
                        {t.product.name}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                        <span className="text-[10px] font-label-code text-on-surface-variant bg-surface-container px-1.5 py-0.2 rounded">
                          {t.product.category}
                        </span>
                        {t.margin && (
                          <span className="text-[10px] font-label-code text-tertiary font-bold">
                            Untung {t.margin}%
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-label-numeric text-xs sm:text-sm font-bold text-on-surface block">
                        {formatRupiah(t.total)}
                      </span>
                      <span className="text-[11px] text-on-surface-variant font-label-code">
                        {t.soldQty} {t.product.unitLabel}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1 border-t border-surface-container/50">
                <div className="h-1.5 rounded-full bg-surface-container flex-1 overflow-hidden">
                  <div
                    className="h-1.5 rounded-full bg-primary transition-all duration-500"
                    style={{ width: `${sharePct}%` }}
                  />
                </div>

                <div className="shrink-0 font-label-code text-[11px]">
                  {isLowStock ? (
                    <span className="text-secondary font-bold flex items-center gap-0.5">
                      <Icon name="warning" className="text-xs" />
                      Sisa {t.product.stock} {t.product.unitLabel}
                    </span>
                  ) : (
                    <span className="text-on-surface-variant">
                      Sisa {t.product.stock} {t.product.unitLabel}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <Link
        href="/produk"
        className="pt-2 text-center text-xs font-label-ui text-primary font-bold hover:underline flex items-center justify-center gap-1"
      >
        <span>Kelola seluruh katalog produk</span>
        <Icon name="arrow_forward" className="text-xs" />
      </Link>
    </div>
  );
}

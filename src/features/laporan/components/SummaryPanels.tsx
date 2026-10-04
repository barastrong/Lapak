import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import type { ReportSummary } from "@/features/laporan/types";

/** Tiga panel angka utama: Omzet, Modal (HPP), Untung Bersih. */
export function SummaryPanels({ summary }: { summary: ReportSummary }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
      <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-label-ui text-label-ui text-on-surface-variant">Total Omzet (Kotor)</span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-low text-primary">
            <Icon name="point_of_sale" className="text-base" />
          </span>
        </div>
        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              {formatRupiah(summary.grossSales)}
            </span>
          </div>
          <div className="mt-space-xs flex items-center gap-space-xs text-body-sm text-on-surface-variant">
            <span className="inline-block w-2 h-2 rounded-full bg-primary-container"></span>
            <span>
              Total dari <strong>{summary.transactionCount} transaksi</strong> selesai
            </span>
          </div>
        </div>
        <div className="mt-space-md pt-space-sm bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg py-2 text-on-surface-variant font-label-code text-label-code flex justify-between items-center">
          <span>Rata-rata keranjang:</span>
          <span className="text-on-surface font-bold">{formatRupiah(summary.averageBasket)}</span>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-label-ui text-label-ui text-on-surface-variant">Total Modal (HPP Kulakan)</span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-surface-container-low text-on-surface-variant">
            <Icon name="inventory_2" className="text-base" />
          </span>
        </div>
        <div className="mt-space-md">
          <div className="flex items-baseline gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
              {formatRupiah(summary.totalModal)}
            </span>
          </div>
          <div className="mt-space-xs flex items-center gap-space-xs text-body-sm text-on-surface-variant">
            <span className="inline-block w-2 h-2 rounded-full bg-outline"></span>
            <span>Berdasarkan harga modal stok saat kulak</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-sm bg-surface-container-low -mx-space-lg -mb-space-lg px-space-lg py-2 text-on-surface-variant font-label-code text-label-code flex justify-between items-center">
          <span>Porsi beban modal:</span>
          <span className="text-on-surface font-bold">{summary.modalRatio.toLocaleString("id-ID")}%</span>
        </div>
      </div>

      <div className="bg-surface-container-lowest rounded-xl p-space-lg flex flex-col justify-between shadow-sm relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="font-label-ui text-label-ui text-tertiary">Untung Bersih (Laba)</span>
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-tertiary-fixed text-on-tertiary-fixed">
            <Icon name="trending_up" className="text-base" />
          </span>
        </div>
        <div className="mt-space-md">
          <div className="flex items-baseline justify-between gap-space-xs">
            <span className="font-headline-xl text-headline-xl text-tertiary tracking-tight">
              {formatRupiah(summary.netProfit)}
            </span>
          </div>
          <div className="mt-space-xs flex items-center gap-space-xs">
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-code text-label-code">
              <span className="material-symbols-outlined text-sm">arrow_upward</span>
              +{summary.marginPercent.toLocaleString("id-ID")}% margin bersih
            </span>
            <span className="text-body-sm text-on-surface-variant">vs bulan lalu</span>
          </div>
        </div>
        <div className="mt-space-md pt-space-sm bg-tertiary-fixed/20 -mx-space-lg -mb-space-lg px-space-lg py-2 text-tertiary font-label-code text-label-code flex justify-between items-center">
          <span>Target harian rata-rata:</span>
          <span className="font-bold text-tertiary">Tercapai ({summary.targetAchieved}%)</span>
        </div>
      </div>
    </div>
  );
}
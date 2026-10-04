import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import type { DashboardSummary } from "@/features/dashboard/types";

/** Empat kartu KPI ringkasan dashboard kasir. */
export function StatsOverview({ summary }: { summary: DashboardSummary }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col justify-between shadow-[0_4px_0_0_rgba(28,36,48,0.04)] hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="text-body-sm text-on-surface-variant">Omzet Hari Ini</span>
          <span className="flex items-center justify-center p-1 rounded-lg text-lg text-primary bg-surface-container-low">
            <Icon name="receipt_long" />
          </span>
        </div>
        <div>
          <div className="font-label-numeric text-headline-md text-on-surface tracking-tight mb-1">
            {formatRupiah(summary.omsetHariIni)}
          </div>
          <div className="flex items-center gap-1.5 text-body-sm text-on-surface-variant">
            <span className="font-bold text-on-surface">{summary.transaksiHariIni}</span> transaksi
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col justify-between shadow-[0_4px_0_0_rgba(28,36,48,0.04)] hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="text-body-sm text-on-surface-variant">Laba Bersih</span>
          <span className="flex items-center justify-center p-1 rounded-lg text-lg text-tertiary bg-tertiary-fixed/40">
            <Icon name="trending_up" />
          </span>
        </div>
        <div>
          <div className="font-label-numeric text-headline-md text-tertiary tracking-tight mb-1">
            {formatRupiah(summary.labaBersih)}
          </div>
          <div className="flex items-center gap-2">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-code text-label-code px-2 py-0.5 rounded">
              Margin {summary.margin.toLocaleString("id-ID")}%
            </span>
            <span className="text-body-sm text-on-surface-variant">{summary.produkTerjual} produk</span>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col justify-between shadow-[0_4px_0_0_rgba(28,36,48,0.04)] hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="text-body-sm text-on-surface-variant">Stok Menipis</span>
          <span className="flex items-center justify-center p-1 rounded-lg text-lg text-secondary bg-secondary-fixed/50">
            <Icon name="warning" />
          </span>
        </div>
        <div>
          <div className="font-label-numeric text-headline-md text-on-surface tracking-tight mb-1">
            {summary.stokMenipis} barang
          </div>
          <div className="flex items-center gap-1.5 text-body-sm text-on-surface-variant">
            <span className="text-secondary font-semibold">Perlu kulak hari ini</span>
          </div>
        </div>
      </div>
      <div className="bg-surface-container-lowest p-space-md rounded-xl flex flex-col justify-between shadow-[0_4px_0_0_rgba(28,36,48,0.04)] hover:shadow-md transition-shadow relative overflow-hidden">
        <div className="flex items-center justify-between mb-space-xs">
          <span className="text-body-sm text-on-surface-variant">Kasbon Belum Lunas</span>
          <span className="flex items-center justify-center p-1 rounded-lg text-lg text-error bg-error-container">
            <Icon name="pending_actions" />
          </span>
        </div>
        <div>
          <div className="font-label-numeric text-headline-md text-error tracking-tight mb-1">
            {formatRupiah(summary.kasbonBelumLunas)}
          </div>
          <div className="text-body-sm text-on-surface-variant">Perlu ditagih</div>
        </div>
      </div>
    </div>
  );
}
import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import type { StockSummary } from "@/features/stok/types";

/** Tiga kartu ringkasan stok: kritis, mendekati batas, estimasi nota kulak. */
export function StockSummaryCards({ summary }: { summary: StockSummary | null }) {
  if (!summary) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-error"></div>
        <div className="pl-space-sm flex flex-col">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-code text-label-code text-error flex items-center gap-1 uppercase tracking-wider text-xs">
              <Icon name="emergency_home" className="text-base" />
              Kritis / Kosong
            </span>
            <span className="bg-error-container text-on-error-container font-label-code text-xs px-2 py-0.5 rounded font-bold">
              {summary.criticalCount} Barang
            </span>
          </div>
          <span className="font-headline-lg text-headline-lg text-error">
            {summary.criticalLabel}
          </span>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Harus segera dibeli di pasar subuh hari ini.
          </p>
        </div>
        <div className="pl-space-sm mt-3 pt-3 flex items-center justify-between text-xs font-label-code text-on-surface-variant">
          <span>Kios utama & Etalase</span>
          <span className="text-error font-semibold">Stok: 0 unit</span>
        </div>
      </div>
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-secondary-container"></div>
        <div className="pl-space-sm flex flex-col">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-code text-label-code text-secondary flex items-center gap-1 uppercase tracking-wider text-xs">
              <Icon name="warning" className="text-base" />
              Mendekati Batas
            </span>
            <span className="bg-surface-container-high text-secondary font-label-code text-xs px-2 py-0.5 rounded font-bold">
              {summary.warningCount} Item
            </span>
          </div>
          <span className="font-headline-lg text-headline-lg text-on-surface">
            {summary.warningLabel}
          </span>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Sisa di bawah batas aman harian warung.
          </p>
        </div>
        <div className="pl-space-sm mt-3 pt-3 flex items-center justify-between text-xs font-label-code text-on-surface-variant">
          <span>Batas aman: 2 hari</span>
          <span className="text-secondary font-semibold">Tersisa 1-3 pack</span>
        </div>
      </div>
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col justify-between relative overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
        <div className="pl-space-sm flex flex-col">
          <div className="flex items-center justify-between mb-space-xs">
            <span className="font-label-code text-label-code text-primary flex items-center gap-1 uppercase tracking-wider text-xs">
              <Icon name="receipt_long" className="text-base" />
              Estimasi Nota Belanja
            </span>
            <span className="bg-surface-container-low text-primary font-label-code text-xs px-2 py-0.5 rounded font-bold">
              4 Agen
            </span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="font-headline-xl text-headline-xl text-primary font-label-numeric">
              {formatRupiah(summary.estimateTotal)}
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant mt-1">
            Perkiraan modal kulak barang prioritas hari ini.
          </p>
        </div>
        <div className="pl-space-sm mt-3 pt-3 flex items-center justify-between text-xs font-label-code text-on-surface-variant">
          <span>Kas cadangan: Rp 2.500.000</span>
          <span className="text-tertiary font-semibold">Saldo Cukup</span>
        </div>
      </div>
    </div>
  );
}
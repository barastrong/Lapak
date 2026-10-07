import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { StockSummary } from "@/features/stok/types";

type StockSummaryCardsProps = {
  summary: StockSummary | null;
  activeStatus?: string;
  onSelectStatus?: (status: string) => void;
  supplierCount?: number;
};

/** Tiga kartu ringkasan stok operasional: darurat kosong, peringatan menipis, dan estimasi modal belanja. */
export function StockSummaryCards({
  summary,
  activeStatus = "ALL",
  onSelectStatus,
  supplierCount = 4,
}: StockSummaryCardsProps) {
  if (!summary) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
      {/* Kartu 1: Habis Total */}
      <button
        type="button"
        onClick={() => onSelectStatus?.(activeStatus === "Habis" ? "ALL" : "Habis")}
        className={cn(
          "text-left p-space-md sm:p-space-lg rounded-2xl border transition-all duration-150 flex flex-col justify-between relative overflow-hidden group cursor-pointer",
          activeStatus === "Habis"
            ? "bg-error-container/25 border-error shadow-sm ring-2 ring-error/30"
            : "bg-surface-container-lowest border-surface-container/80 hover:border-error/40 hover:bg-error-container/10 shadow-xs"
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-code text-xs font-bold text-error flex items-center gap-1.5 uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-error animate-pulse" />
              <Icon name="warning" className="text-sm" />
              Darurat Kosong
            </span>
            <span className="bg-error text-on-error font-label-code text-xs px-2.5 py-0.5 rounded-full font-bold shadow-2xs">
              {summary.criticalCount} Barang
            </span>
          </div>

          <div className="mt-1">
            <div className="font-headline-xl text-3xl font-extrabold text-error tracking-tight font-headline">
              {summary.criticalLabel}
            </div>
            <p className="text-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
              Stok 0 di etalase & rak depan. Prioritas pertama kulak pasar subuh.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-error/15 flex items-center justify-between text-xs font-label-code">
          <span className="text-on-surface-variant">Etalase & Kios</span>
          <span className="text-error font-bold flex items-center gap-1">
            {activeStatus === "Habis" ? "Filter Aktif ✓" : "Klik untuk saring →"}
          </span>
        </div>
      </button>

      {/* Kartu 2: Mendekati Batas */}
      <button
        type="button"
        onClick={() => onSelectStatus?.(activeStatus === "Menipis" ? "ALL" : "Menipis")}
        className={cn(
          "text-left p-space-md sm:p-space-lg rounded-2xl border transition-all duration-150 flex flex-col justify-between relative overflow-hidden group cursor-pointer",
          activeStatus === "Menipis"
            ? "bg-secondary-fixed/40 border-secondary-container shadow-sm ring-2 ring-secondary/30"
            : "bg-surface-container-lowest border-surface-container/80 hover:border-secondary/40 hover:bg-secondary-fixed/15 shadow-xs"
        )}
      >
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-code text-xs font-bold text-secondary flex items-center gap-1.5 uppercase tracking-wider">
              <Icon name="history_toggle_off" className="text-sm" />
              Menipis / Kritis
            </span>
            <span className="bg-secondary-container text-on-secondary-container font-label-code text-xs px-2.5 py-0.5 rounded-full font-bold">
              {summary.warningCount} Item
            </span>
          </div>

          <div className="mt-1">
            <div className="font-headline-xl text-3xl font-extrabold text-on-surface tracking-tight font-headline">
              {summary.warningLabel}
            </div>
            <p className="text-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
              Tersisa di bawah batas aman harian. Amankan stok sebelum akhir pekan.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-secondary/15 flex items-center justify-between text-xs font-label-code">
          <span className="text-on-surface-variant">Batas: 1–3 hari</span>
          <span className="text-secondary font-bold flex items-center gap-1">
            {activeStatus === "Menipis" ? "Filter Aktif ✓" : "Klik untuk saring →"}
          </span>
        </div>
      </button>

      {/* Kartu 3: Estimasi Nota Belanja */}
      <div className="p-space-md sm:p-space-lg rounded-2xl border border-primary/25 bg-surface-container-lowest shadow-xs flex flex-col justify-between relative overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-label-code text-xs font-bold text-primary flex items-center gap-1.5 uppercase tracking-wider">
              <Icon name="receipt_long" className="text-sm" />
              Estimasi Modal Belanja
            </span>
            <span className="bg-primary/10 text-primary font-label-code text-xs px-2.5 py-0.5 rounded-full font-bold">
              {supplierCount} Pemasok Agen
            </span>
          </div>

          <div className="mt-1">
            <div className="font-headline-xl text-3xl font-extrabold text-primary font-label-numeric tracking-tight">
              {formatRupiah(summary.estimateTotal)}
            </div>
            <p className="text-body-sm text-xs text-on-surface-variant mt-1 leading-relaxed">
              Total perkiraan uang kulakan dari daftar catatan pasar aktif.
            </p>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-surface-container flex items-center justify-between text-xs font-label-code">
          <span className="text-on-surface-variant">Kas Cadangan: Rp 2.500.000</span>
          <span className="text-tertiary font-bold flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-tertiary" />
            Saldo Kas Cukup
          </span>
        </div>
      </div>
    </div>
  );
}
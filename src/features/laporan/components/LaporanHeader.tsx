import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { exportToCsv } from "@/lib/export";
import type { PeriodOption } from "@/features/laporan/types";

type LaporanHeaderProps = {
  active: PeriodOption;
  periods: PeriodOption[];
  onPeriod: (p: PeriodOption) => void;
};

export function LaporanHeader({ active, periods, onPeriod }: LaporanHeaderProps) {
  const handleExport = () => {
    exportToCsv(
      `ringkasan-laporan-${active.toLowerCase().replace(/\s+/g, "-")}`,
      ["Keterangan", "Nilai", "Periode"],
      [
        ["Omzet Kotor", "Rp 42.850.000", active],
        ["Laba Bersih", "Rp 6.427.500", active],
        ["Transaksi Sukses", "348", active],
        ["Kasbon Baru", "Rp 485.000", active],
        ["Rata-rata Nota", "Rp 123.132", active],
      ]
    );
  };
  return (
    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md">
      <div className="flex flex-col gap-space-xs">
        <div className="flex items-center gap-space-sm">
          <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-primary-container text-on-primary font-label-code text-label-code">
            <Icon name="monitoring" className="text-lg" />
          </span>
          <span className="font-label-code text-label-code text-primary uppercase tracking-wider">
            Buku Kas & Penjualan Harian
          </span>
        </div>
        <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
          Laporan Keuangan & Penjualan
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Pantau perputaran uang, modal kulakan, dan laba bersih warung secara akurat.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-space-sm bg-surface-container-low p-1.5 rounded-xl self-start xl:self-auto shadow-sm">
        <div className="flex items-center bg-surface-container p-1 rounded-lg">
          {periods.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPeriod(p)}
              className={cn(
                "px-space-md py-1.5 rounded-lg font-label-ui text-label-ui transition-all cursor-pointer",
                active === p
                  ? "bg-surface-container-lowest text-primary font-semibold shadow-sm"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="hidden md:flex items-center gap-space-xs px-space-md py-1.5 bg-surface-container-lowest rounded-lg text-on-surface font-label-code text-label-code shadow-sm cursor-pointer hover:bg-surface-bright transition-colors">
          <Icon name="calendar_today" className="text-primary text-base" />
          <span>1 Mei 2025 – 24 Mei 2025</span>
          <Icon name="arrow_drop_down" className="text-on-surface-variant text-base ml-1" />
        </div>
        <div className="hidden sm:flex items-center gap-space-xs px-space-sm py-1.5 bg-surface-container-lowest rounded-lg text-on-surface font-label-code text-label-code shadow-sm cursor-pointer hover:bg-surface-bright transition-colors">
          <Icon name="account_circle" className="text-on-surface-variant text-base" />
          <span>Semua Kasir</span>
          <Icon name="expand_more" className="text-on-surface-variant text-base" />
        </div>
        <button
          type="button"
          onClick={handleExport}
          className="flex items-center gap-space-xs px-space-md py-1.5 bg-primary-container text-on-primary rounded-lg font-label-ui text-label-ui hover:bg-primary transition-all active:translate-y-0.5 shadow-sm cursor-pointer"
        >
          <Icon name="download" className="text-base" />
          <span>Unduh Excel (.xlsx)</span>
        </button>
      </div>
    </div>
  );
}
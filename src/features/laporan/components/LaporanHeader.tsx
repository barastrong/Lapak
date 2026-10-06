"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { exportToCsv } from "@/lib/export";
import { formatRupiah } from "@/lib/format";
import type { PeriodOption, ReportSummary } from "@/features/laporan/types";

type LaporanHeaderProps = {
  active: PeriodOption;
  periods: PeriodOption[];
  onPeriod: (p: PeriodOption) => void;
  selectedCashier?: string;
  onCashierChange?: (cashier: string) => void;
  summary?: ReportSummary;
};

const PERIOD_DATES: Record<PeriodOption, string> = {
  "Hari Ini": "24 Mei 2025 (Shift Berjalan)",
  "Minggu Ini": "18 Mei – 24 Mei 2025 (7 Hari)",
  "Bulan Ini": "1 Mei – 24 Mei 2025 (Bulan Berjalan)",
};

export function LaporanHeader({
  active,
  periods,
  onPeriod,
  selectedCashier = "ALL",
  onCashierChange,
  summary,
}: LaporanHeaderProps) {
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleExport = () => {
    const gross = summary ? formatRupiah(summary.grossSales) : "Rp 42.850.000";
    const net = summary ? formatRupiah(summary.netProfit) : "Rp 10.712.500";
    const modal = summary ? formatRupiah(summary.totalModal) : "Rp 32.137.500";
    const count = summary ? String(summary.transactionCount) : "842";
    const avg = summary ? formatRupiah(summary.averageBasket) : "Rp 50.890";
    const cashDrawer = summary?.cashInDrawer ? formatRupiah(summary.cashInDrawer) : "-";
    const qris = summary?.digitalBalance ? formatRupiah(summary.digitalBalance) : "-";
    const kasbon = summary?.pendingKasbon ? formatRupiah(summary.pendingKasbon) : "-";

    exportToCsv(
      `buku-kas-warung-${active.toLowerCase().replace(/\s+/g, "-")}`,
      ["Indikator Keuangan", "Nominal / Keterangan", "Periode Audit", "Kasir"],
      [
        ["Omzet Penjualan Kotor", gross, active, selectedCashier === "ALL" ? "Semua Kasir" : selectedCashier],
        ["HPP Kulakan Stok (Modal)", modal, active, selectedCashier === "ALL" ? "Semua Kasir" : selectedCashier],
        ["Laba Bersih Usaha", net, active, selectedCashier === "ALL" ? "Semua Kasir" : selectedCashier],
        ["Total Transaksi Selesai", `${count} transaksi`, active, selectedCashier === "ALL" ? "Semua Kasir" : selectedCashier],
        ["Rata-rata Nilai Keranjang", avg, active, selectedCashier === "ALL" ? "Semua Kasir" : selectedCashier],
        ["Uang Fisik Kas Brankas", cashDrawer, active, selectedCashier === "ALL" ? "Semua Kasir" : selectedCashier],
        ["Saldo Digital QRIS & Bank", qris, active, selectedCashier === "ALL" ? "Semua Kasir" : selectedCashier],
        ["Piutang Kasbon Warga", kasbon, active, selectedCashier === "ALL" ? "Semua Kasir" : selectedCashier],
      ]
    );

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  return (
    <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-space-md bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-surface-container/60 shadow-xs">
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-primary-container text-on-primary font-label-code text-xs">
            <Icon name="monitoring" className="text-base" />
          </span>
          <span className="font-label-code text-xs text-primary font-bold tracking-wider uppercase">
            Buku Kas & Rekonsiliasi Warung
          </span>
        </div>
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
          Laporan Keuangan & Penjualan
        </h1>
        <p className="text-body-sm text-on-surface-variant max-w-2xl">
          Pantau perputaran uang tunai brankas, modal kulakan sembako, dan laba bersih riil Warung Bu Sari.
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2 self-start xl:self-auto">
        <div className="flex items-center bg-surface-container-low p-1 rounded-xl border border-surface-container">
          {periods.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onPeriod(p)}
              className={cn(
                "px-3 py-1.5 rounded-lg font-label-ui text-xs transition-all cursor-pointer",
                active === p
                  ? "bg-surface-container-lowest text-primary font-bold shadow-xs"
                  : "text-on-surface-variant hover:text-on-surface"
              )}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-surface-container-low rounded-xl border border-surface-container text-on-surface font-label-code text-xs">
          <Icon name="calendar_today" className="text-primary text-sm" />
          <span>{PERIOD_DATES[active]}</span>
        </div>

        {onCashierChange && (
          <div className="relative flex items-center">
            <select
              value={selectedCashier}
              onChange={(e) => onCashierChange(e.target.value)}
              className="appearance-none bg-surface-container-low text-on-surface font-label-code text-xs pl-8 pr-7 py-1.5 rounded-xl border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="ALL">Semua Kasir</option>
              <option value="Bu Sari">Bu Sari (Pemilik)</option>
              <option value="Sari">Sari (Kasir 01)</option>
              <option value="Budi">Budi (Shift Siang)</option>
            </select>
            <Icon
              name="account_circle"
              className="absolute left-2.5 text-on-surface-variant text-sm pointer-events-none"
            />
            <Icon
              name="expand_more"
              className="absolute right-2 text-on-surface-variant text-sm pointer-events-none"
            />
          </div>
        )}

        <button
          type="button"
          onClick={handleExport}
          className={cn(
            "flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl font-label-ui text-xs font-bold transition-all shadow-xs cursor-pointer",
            downloadSuccess
              ? "bg-tertiary text-on-tertiary"
              : "bg-primary text-on-primary hover:bg-primary-container"
          )}
        >
          <Icon name={downloadSuccess ? "check_circle" : "download"} className="text-sm" />
          <span>{downloadSuccess ? "Tersimpan (.csv)" : "Unduh Laporan (.csv)"}</span>
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Link from "next/link";
import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { ReceiptModal, type ReceiptData } from "@/components/ui/ReceiptModal";
import type { RecentTransaction } from "@/features/dashboard/types";

const PAYMENT_STYLE: Record<string, string> = {
  TUNAI: "bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary/20",
  QRIS: "bg-primary-fixed text-on-primary-fixed border border-primary/20",
  KASBON: "bg-error-container text-on-error-container font-bold border border-error/20",
};

export function RecentTransactions({ data }: { data: RecentTransaction[] }) {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptData | null>(null);

  const filtered = data.filter((t) => {
    if (activeFilter === "ALL") return true;
    return t.payment === activeFilter;
  });

  const handleOpenReceipt = (t: RecentTransaction) => {
    setSelectedReceipt({
      no: t.no,
      time: `Hari ini, ${t.time}`,
      cashier: t.cashier ?? "Bu Sari (Pemilik)",
      itemsLabel: t.detail,
      itemsDetail: t.customer ? `Pelanggan: ${t.customer}` : "Pelanggan Umum",
      method: t.payment === "TUNAI" ? "Tunai" : t.payment === "QRIS" ? "QRIS" : "Bon",
      amount: t.total,
    });
  };

  return (
    <>
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container/60 shadow-xs flex flex-col overflow-hidden">
        <div className="p-space-md sm:px-space-lg sm:py-4 bg-surface-container-low/60 flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-b border-surface-container">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-tertiary animate-pulse" />
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              Transaksi Terakhir
            </h2>
            <span className="font-label-code text-xs text-on-surface-variant bg-surface-container px-2 py-0.5 rounded-md">
              Hari ini
            </span>
          </div>

          <div className="flex items-center gap-1 bg-surface-container p-0.5 rounded-lg text-xs font-label-ui">
            {(["ALL", "TUNAI", "QRIS", "KASBON"] as const).map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setActiveFilter(mode)}
                className={cn(
                  "px-2.5 py-1 rounded-md transition-all cursor-pointer",
                  activeFilter === mode
                    ? "bg-surface-container-lowest text-primary font-bold shadow-xs"
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                {mode === "ALL" ? "Semua" : mode}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="font-label-code text-xs text-on-surface-variant border-b border-surface-container bg-surface-container-low/30 uppercase tracking-wider">
                <th className="py-2.5 px-space-md sm:px-space-lg font-semibold">Nota</th>
                <th className="py-2.5 px-space-md font-semibold">Waktu</th>
                <th className="py-2.5 px-space-md font-semibold">Rincian Belanja</th>
                <th className="py-2.5 px-space-md text-right font-semibold">Nominal</th>
                <th className="py-2.5 px-space-md text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container/60">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-8 text-center text-on-surface-variant text-body-sm">
                    Tidak ada transaksi dengan metode {activeFilter} hari ini.
                  </td>
                </tr>
              ) : (
                filtered.map((t) => (
                  <tr
                    key={t.id}
                    onClick={() => handleOpenReceipt(t)}
                    className={cn(
                      "hover:bg-surface-container-low/40 transition-colors cursor-pointer group",
                      t.payment === "KASBON" && "bg-error-container/10"
                    )}
                  >
                    <td className="py-3 px-space-md sm:px-space-lg">
                      <div className="flex flex-col">
                        <span className="font-label-code text-primary font-bold text-xs sm:text-sm group-hover:underline">
                          {t.no}
                        </span>
                        <span className="text-[10px] text-on-surface-variant font-label-code">
                          {t.cashier ?? "Kasir"}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-space-md font-label-code text-xs text-on-surface-variant whitespace-nowrap">
                      {t.time}
                    </td>
                    <td className="py-3 px-space-md text-body-sm text-on-surface max-w-[200px] truncate">
                      <div className="truncate font-medium">{t.detail}</div>
                      {t.customer && (
                        <div className="text-[11px] text-on-surface-variant truncate">
                          {t.customer}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-space-md text-right whitespace-nowrap">
                      <div className="flex flex-col items-end gap-1">
                        <span className="font-label-numeric font-bold text-on-surface text-xs sm:text-sm">
                          {formatRupiah(t.total)}
                        </span>
                        <span
                          className={cn(
                            "px-2 py-0.2 rounded text-[10px] font-label-code font-bold",
                            PAYMENT_STYLE[t.payment] ?? "bg-surface-container text-on-surface"
                          )}
                        >
                          {t.payment}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-space-md text-center whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => handleOpenReceipt(t)}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary-container px-2.5 py-1 rounded-lg hover:bg-surface-container font-label-ui text-xs cursor-pointer transition-colors"
                        title="Lihat & Cetak Struk"
                      >
                        <Icon name="receipt" className="text-sm" />
                        <span className="hidden sm:inline">Struk</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <Link
          href="/laporan"
          className="px-space-md sm:px-space-lg py-3 bg-surface-container-low/60 hover:bg-surface-container border-t border-surface-container flex items-center justify-between text-xs font-label-ui text-primary font-bold transition-colors"
        >
          <span>Lihat buku laporan transaksi lengkap (348 nota)</span>
          <div className="flex items-center gap-1">
            <span>Buku Laporan</span>
            <Icon name="arrow_forward" className="text-sm" />
          </div>
        </Link>
      </div>

      <ReceiptModal
        open={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        receipt={selectedReceipt}
      />
    </>
  );
}

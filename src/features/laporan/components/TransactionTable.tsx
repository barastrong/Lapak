"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";
import { ReceiptModal } from "@/components/ui/ReceiptModal";
import { exportToCsv } from "@/lib/export";
import type { TransactionRow } from "@/features/laporan/types";

const METHOD_STYLE: Record<TransactionRow["method"], string> = {
  QRIS: "bg-surface-container-high text-primary-container",
  Tunai: "bg-tertiary-fixed text-on-tertiary-fixed",
  Bon: "bg-error-container text-on-error-container font-bold",
  "Transfer BCA": "bg-secondary-fixed text-on-secondary-fixed",
};

type TransactionTableProps = {
  rows: TransactionRow[];
};

export function TransactionTable({ rows }: TransactionTableProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<TransactionRow | null>(null);
  const [search, setSearch] = useState("");

  const filteredRows = rows.filter(
    (r) =>
      r.no.toLowerCase().includes(search.toLowerCase()) ||
      r.itemsLabel.toLowerCase().includes(search.toLowerCase()) ||
      r.cashier.toLowerCase().includes(search.toLowerCase())
  );

  const handleExport = () => {
    exportToCsv(
      "laporan-transaksi-lapak",
      ["Waktu", "No. Nota", "Kasir", "Item Terjual", "Rincian", "Metode Bayar", "Total (Rp)"],
      filteredRows.map((r) => [r.time, r.no, r.cashier, r.itemsLabel, r.itemsDetail, r.method, r.amount])
    );
  };

  return (
    <>
      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface">
              Daftar Transaksi Terakhir
            </h2>
            <p className="text-body-sm text-on-surface-variant">
              Menampilkan {filteredRows.length} dari 348 transaksi pada periode terpilih
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="relative flex items-center">
              <Icon name="search" className="absolute left-3 text-on-surface-variant text-base" />
              <input
                className="bg-surface-container-low pl-9 pr-4 py-2 rounded-lg text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary w-64 md:w-80 transition-all placeholder:text-on-surface-variant"
                placeholder="Cari no. nota atau nama item..."
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-space-xs px-space-md py-2 bg-primary text-on-primary rounded-lg font-label-ui text-label-ui hover:bg-primary-container transition-all cursor-pointer shadow-xs"
            >
              <Icon name="download" className="text-base" />
              <span>Unduh Excel</span>
            </button>
          </div>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-code text-label-code text-xs uppercase tracking-wider">
                <th className="py-3 px-space-md">Waktu</th>
                <th className="py-3 px-space-md">No. Nota</th>
                <th className="py-3 px-space-md">Kasir</th>
                <th className="py-3 px-space-md">Item Terjual</th>
                <th className="py-3 px-space-md">Metode Bayar</th>
                <th className="py-3 px-space-md text-right">Total Transaksi</th>
                <th className="py-3 px-space-md text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-body-sm text-on-surface">
              {filteredRows.map((r) => (
                <tr key={r.id} className={cn("hover:bg-surface-bright transition-colors group", r.bon && "bg-error-container/20")}>
                  <td className="py-3 px-space-md whitespace-nowrap font-label-code text-label-code text-on-surface-variant">
                    {r.time}
                  </td>
                  <td className="py-3 px-space-md whitespace-nowrap font-label-code text-label-code font-bold text-primary">
                    {r.no}
                  </td>
                  <td className="py-3 px-space-md whitespace-nowrap">
                    <div className="flex items-center gap-space-xs">
                      <span className={cn("w-2 h-2 rounded-full", r.cashierActive ? "bg-tertiary" : "bg-outline")}></span>
                      <span className="font-medium">{r.cashier}</span>
                    </div>
                  </td>
                  <td className="py-3 px-space-md">
                    <span className="text-on-surface font-medium">{r.itemsLabel}</span>
                    <span className="text-on-surface-variant text-xs">{r.itemsDetail}</span>
                  </td>
                  <td className="py-3 px-space-md whitespace-nowrap">
                    <span className={cn("inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-code text-xs", METHOD_STYLE[r.method])}>
                      <Icon name={r.method === "Bon" ? "history_edu" : r.method === "QRIS" ? "qr_code_2" : r.method === "Transfer BCA" ? "account_balance" : "payments"} className="text-xs" />
                      {r.method === "Bon" ? `Bon (Pak RT)` : r.method}
                    </span>
                  </td>
                  <td className={cn("py-3 px-space-md whitespace-nowrap text-right font-label-numeric text-label-numeric font-bold", r.bon ? "text-error" : "text-on-surface")}>
                    {formatRupiah(r.amount)}
                  </td>
                  <td className="py-3 px-space-md whitespace-nowrap text-center">
                    <button
                      type="button"
                      onClick={() => setSelectedReceipt(r)}
                      className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-ui text-label-ui px-2.5 py-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                    >
                      <Icon name="receipt" className="text-base" />
                      <span>Lihat Nota</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-space-lg py-space-md bg-surface-container-low flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm font-label-code text-label-code">
          <span className="text-on-surface-variant">Menampilkan {filteredRows.length} transaksi</span>
          <div className="flex items-center gap-1 self-center sm:self-auto">
            <button type="button" disabled className="px-2.5 py-1 rounded bg-surface-container-lowest text-on-surface-variant shadow-sm disabled:opacity-50 cursor-not-allowed">
              <Icon name="chevron_left" className="text-sm align-middle" />
            </button>
            <button type="button" className="px-3 py-1 rounded bg-primary text-on-primary font-bold shadow-sm">1</button>
            <button type="button" className="px-3 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors shadow-sm cursor-pointer">2</button>
            <button type="button" className="px-3 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors shadow-sm cursor-pointer">3</button>
            <span className="px-1 text-on-surface-variant">...</span>
            <button type="button" className="px-3 py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors shadow-sm cursor-pointer">35</button>
            <button type="button" className="flex items-center gap-1 px-space-sm py-1 rounded bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-colors shadow-sm cursor-pointer">
              <span>Berikutnya</span>
              <Icon name="chevron_right" className="text-sm" />
            </button>
          </div>
        </div>
      </div>

      <ReceiptModal
        open={!!selectedReceipt}
        onClose={() => setSelectedReceipt(null)}
        receipt={selectedReceipt}
      />
    </>
  );
}

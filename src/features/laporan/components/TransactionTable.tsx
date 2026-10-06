"use client";

import { useMemo, useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import { formatRupiah } from "@/lib/format";
import { ReceiptModal } from "@/components/ui/ReceiptModal";
import { exportToCsv } from "@/lib/export";
import type { TransactionMethod, TransactionRow } from "@/features/laporan/types";

const METHOD_STYLE: Record<TransactionMethod, string> = {
  QRIS: "bg-primary-fixed text-on-primary-fixed border border-primary/20",
  Tunai: "bg-tertiary-fixed text-on-tertiary-fixed border border-tertiary/20",
  Bon: "bg-error-container text-on-error-container font-bold border border-error/20",
  "Transfer BCA": "bg-secondary-fixed text-on-secondary-fixed border border-secondary/20",
};

type TransactionTableProps = {
  rows: TransactionRow[];
  cashierFilter?: string;
};

export function TransactionTable({ rows, cashierFilter = "ALL" }: TransactionTableProps) {
  const [selectedReceipt, setSelectedReceipt] = useState<TransactionRow | null>(null);
  const [search, setSearch] = useState("");
  const [selectedMethod, setSelectedMethod] = useState<string>("ALL");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  const filteredRows = useMemo(() => {
    return rows.filter((r) => {
      const matchSearch =
        search === "" ||
        r.no.toLowerCase().includes(search.toLowerCase()) ||
        r.itemsLabel.toLowerCase().includes(search.toLowerCase()) ||
        r.itemsDetail.toLowerCase().includes(search.toLowerCase()) ||
        r.cashier.toLowerCase().includes(search.toLowerCase()) ||
        (r.customer && r.customer.toLowerCase().includes(search.toLowerCase()));

      const matchMethod = selectedMethod === "ALL" || r.method === selectedMethod;

      const matchCashier =
        cashierFilter === "ALL" ||
        r.cashier.toLowerCase().includes(cashierFilter.toLowerCase());

      return matchSearch && matchMethod && matchCashier;
    });
  }, [rows, search, selectedMethod, cashierFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedRows = filteredRows.slice(startIndex, startIndex + pageSize);

  const handleExport = () => {
    exportToCsv(
      `laporan-transaksi-warung-${selectedMethod.toLowerCase()}`,
      ["Waktu", "No. Nota", "Kasir", "Pelanggan", "Item Terjual", "Rincian", "Metode Bayar", "Total (Rp)"],
      filteredRows.map((r) => [
        r.time,
        r.no,
        r.cashier,
        r.customer ?? "Umum",
        r.itemsLabel,
        r.itemsDetail,
        r.method,
        r.amount,
      ])
    );
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  return (
    <>
      <div className="bg-surface-container-lowest rounded-2xl border border-surface-container/60 shadow-xs overflow-hidden flex flex-col">
        <div className="p-space-md sm:p-space-lg flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest border-b border-surface-container">
          <div>
            <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
              Buku Kas & Riwayat Transaksi
            </h2>
            <p className="text-body-sm text-xs text-on-surface-variant">
              Menampilkan {filteredRows.length} nota transaksi sesuai pencarian & filter
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-space-sm">
            <div className="relative flex items-center">
              <Icon name="search" className="absolute left-3 text-on-surface-variant text-base" />
              <input
                className="bg-surface-container-low pl-9 pr-4 py-2 rounded-xl text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-2 focus:ring-primary w-60 sm:w-72 transition-all placeholder:text-on-surface-variant text-xs"
                placeholder="Cari nota, barang, kasir..."
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => {
                const tr = rows.find((r) => r.no === "#NK-2025-0840") ?? rows[0];
                if (tr) setSelectedReceipt(tr);
              }}
              className="flex items-center gap-1.5 px-3 py-2 bg-surface-container hover:bg-surface-container-high text-on-surface rounded-xl font-label-ui text-xs font-bold transition-all cursor-pointer shadow-xs"
              title="Cetak struk nota contoh #NK-2025-0840"
            >
              <Icon name="print" className="text-sm text-primary" />
              <span>Cetak Struk (#NK-2025-0840)</span>
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="flex items-center gap-1.5 px-3.5 py-2 bg-primary text-on-primary rounded-xl font-label-ui text-xs font-bold hover:bg-primary-container transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Icon name="download" className="text-sm" />
              <span>Unduh Hasil (.csv)</span>
            </button>
          </div>
        </div>

        <div className="px-space-md sm:px-space-lg py-2.5 bg-surface-container-low/50 border-b border-surface-container flex items-center gap-1.5 overflow-x-auto text-xs font-label-ui">
          <span className="text-on-surface-variant font-label-code mr-1 shrink-0">Metode:</span>
          {(["ALL", "Tunai", "QRIS", "Transfer BCA", "Bon"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => {
                setSelectedMethod(m);
                setPage(1);
              }}
              className={cn(
                "px-3 py-1 rounded-lg transition-all shrink-0 cursor-pointer font-medium",
                selectedMethod === m
                  ? "bg-surface-container-lowest text-primary font-bold shadow-xs border border-primary/30"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              )}
            >
              {m === "ALL" ? "Semua Metode" : m === "Bon" ? "Kasbon (Warga)" : m}
            </button>
          ))}
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low/40 text-on-surface-variant font-label-code text-xs uppercase tracking-wider border-b border-surface-container">
                <th className="py-3 px-space-md font-semibold">Waktu</th>
                <th className="py-3 px-space-md font-semibold">No. Nota</th>
                <th className="py-3 px-space-md font-semibold">Kasir</th>
                <th className="py-3 px-space-md font-semibold">Item & Pelanggan</th>
                <th className="py-3 px-space-md font-semibold">Metode</th>
                <th className="py-3 px-space-md text-right font-semibold">Total</th>
                <th className="py-3 px-space-md text-center font-semibold">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-body-sm text-on-surface">
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-on-surface-variant text-body-sm">
                    <Icon name="search_off" className="text-3xl mb-1 text-on-surface-variant/70 block mx-auto" />
                    Tidak ada transaksi yang cocok dengan kriteria filter saat ini.
                  </td>
                </tr>
              ) : (
                paginatedRows.map((r) => (
                  <tr
                    key={r.id}
                    onClick={() => setSelectedReceipt(r)}
                    className={cn(
                      "hover:bg-surface-container-low/40 transition-colors group cursor-pointer",
                      r.bon && "bg-error-container/15"
                    )}
                  >
                    <td className="py-3 px-space-md whitespace-nowrap font-label-code text-xs text-on-surface-variant">
                      {r.time}
                    </td>
                    <td className="py-3 px-space-md whitespace-nowrap font-label-code text-xs font-bold text-primary group-hover:underline">
                      {r.no}
                    </td>
                    <td className="py-3 px-space-md whitespace-nowrap text-xs">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={cn(
                            "w-2 h-2 rounded-full shrink-0",
                            r.cashierActive ? "bg-tertiary" : "bg-outline"
                          )}
                        />
                        <span className="font-medium text-on-surface">{r.cashier}</span>
                      </div>
                    </td>
                    <td className="py-3 px-space-md max-w-[280px]">
                      <div className="flex items-center gap-1.5">
                        <span className="text-on-surface font-semibold text-xs truncate">
                          {r.itemsLabel}
                        </span>
                        {r.customer && (
                          <span className="text-[10px] font-label-code text-on-surface-variant bg-surface-container px-1 rounded truncate">
                            {r.customer}
                          </span>
                        )}
                      </div>
                      <div className="text-on-surface-variant text-[11px] truncate">
                        {r.itemsDetail}
                      </div>
                    </td>
                    <td className="py-3 px-space-md whitespace-nowrap">
                      <span
                        className={cn(
                          "inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-label-code text-[11px] font-semibold",
                          METHOD_STYLE[r.method]
                        )}
                      >
                        <Icon
                          name={
                            r.method === "Bon"
                              ? "history_edu"
                              : r.method === "QRIS"
                              ? "qr_code_2"
                              : r.method === "Transfer BCA"
                              ? "account_balance"
                              : "payments"
                          }
                          className="text-[12px]"
                        />
                        {r.method === "Bon" ? "Kasbon" : r.method}
                      </span>
                    </td>
                    <td
                      className={cn(
                        "py-3 px-space-md whitespace-nowrap text-right font-label-numeric text-xs sm:text-sm font-bold",
                        r.bon ? "text-error" : "text-on-surface"
                      )}
                    >
                      {formatRupiah(r.amount)}
                    </td>
                    <td className="py-3 px-space-md whitespace-nowrap text-center" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => setSelectedReceipt(r)}
                        className="inline-flex items-center gap-1 text-primary hover:text-primary-container font-label-ui text-xs px-2.5 py-1 rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
                        title="Lihat struk belanja"
                      >
                        <Icon name="receipt" className="text-base" />
                        <span>Lihat Nota</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <div className="px-space-md sm:px-space-lg py-3 bg-surface-container-low/60 border-t border-surface-container flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm font-label-code text-xs">
          <span className="text-on-surface-variant">
            Menampilkan {filteredRows.length > 0 ? startIndex + 1 : 0}–
            {Math.min(startIndex + pageSize, filteredRows.length)} dari {filteredRows.length} transaksi
          </span>

          <div className="flex items-center gap-1.5 self-center sm:self-auto">
            <button
              type="button"
              disabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-2.5 py-1 rounded-lg bg-surface-container-lowest border border-surface-container text-on-surface-variant shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-surface-container transition-colors"
              title="Halaman Sebelumnya"
            >
              <Icon name="chevron_left" className="text-sm align-middle" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
              <button
                key={pNum}
                type="button"
                onClick={() => handlePageChange(pNum)}
                className={cn(
                  "px-3 py-1 rounded-lg font-bold shadow-xs transition-colors cursor-pointer",
                  currentPage === pNum
                    ? "bg-primary text-on-primary"
                    : "bg-surface-container-lowest border border-surface-container text-on-surface hover:bg-surface-container"
                )}
              >
                {pNum}
              </button>
            ))}

            <button
              type="button"
              disabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="flex items-center gap-1 px-3 py-1 rounded-lg bg-surface-container-lowest border border-surface-container text-on-surface shadow-xs disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:bg-surface-container transition-colors"
              title="Halaman Berikutnya"
            >
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


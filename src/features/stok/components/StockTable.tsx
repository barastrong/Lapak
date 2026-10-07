"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { StockItem } from "@/features/stok/types";

export type StockStatusTone = Record<string, string>;

const STATUS_TONE: StockStatusTone = {
  Habis: "bg-error/10 text-error border border-error/20",
  Menipis: "bg-secondary-fixed/40 text-secondary border border-secondary/25",
  Aman: "bg-tertiary-fixed/40 text-tertiary border border-tertiary/20",
  Berlebih: "bg-primary/10 text-primary border border-primary/20",
};

const STOCK_COLOR: StockStatusTone = {
  Habis: "text-error",
  Menipis: "text-secondary",
  Aman: "text-tertiary",
  Berlebih: "text-primary",
};

type StockTableProps = {
  items: StockItem[];
  query: string;
  onQuery: (s: string) => void;
  statusFilter?: string;
  onStatusFilter?: (s: string) => void;
  rackFilter?: string;
  onRackFilter?: (r: string) => void;
  onOpenAdjustment: (item: StockItem) => void;
  onKulak?: (item: StockItem) => void;
  onOpenAddIncoming?: () => void;
};

const STATUS_OPTIONS = ["ALL", "Habis", "Menipis", "Aman", "Berlebih"];
const RACK_OPTIONS = ["ALL", "Lantai Depan", "Meja Peti Kasir", "Rak A2 Minyak", "Rak B Sembako", "Rak C Sabun", "Gantungan"];

/** Tabel data stok & pergerakan rak, dengan visual stock health gauge dan filter instan. */
export function StockTable({
  items,
  query,
  onQuery,
  statusFilter = "ALL",
  onStatusFilter,
  rackFilter = "ALL",
  onRackFilter,
  onOpenAdjustment,
  onKulak,
  onOpenAddIncoming,
}: StockTableProps) {
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  const handleKulakClick = (row: StockItem) => {
    onKulak?.(row);
    setJustAddedId(row.id);
    setTimeout(() => {
      setJustAddedId(null);
    }, 1500);
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-surface-container/70 shadow-xs p-space-md sm:p-space-lg flex flex-col gap-space-md">
      {/* Header & Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-sm pb-1 border-b border-surface-container/60">
        <div className="flex items-center gap-space-xs">
          <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon name="shelves" className="text-xl" />
          </div>
          <div>
            <h2 className="font-headline-md text-base sm:text-lg text-on-surface font-bold tracking-tight">
              Katalog Stok Rak & Gudang
            </h2>
            <p className="text-body-sm text-xs text-on-surface-variant">
              Monitoring ketersediaan fisik barang sebelum jam buka toko
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Search Input */}
          <div className="bg-surface-container-low/80 hover:bg-surface-container-low focus-within:bg-surface-container-lowest px-3 py-1.5 rounded-xl border border-surface-container focus-within:border-primary flex items-center gap-2 transition-all w-full sm:w-60">
            <Icon name="search" className="text-on-surface-variant text-sm shrink-0" />
            <input
              className="bg-transparent text-body-sm text-on-surface focus:outline-none w-full text-xs"
              placeholder="Cari barang atau kode SKU..."
              type="text"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
            />
            {query && (
              <button
                type="button"
                onClick={() => onQuery("")}
                className="text-on-surface-variant hover:text-on-surface text-xs"
                aria-label="Hapus pencarian"
              >
                <Icon name="close" className="text-sm" />
              </button>
            )}
          </div>

          {onOpenAddIncoming && (
            <button
              type="button"
              onClick={onOpenAddIncoming}
              className="px-3 py-1.5 bg-primary text-on-primary rounded-xl font-label-ui text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer shrink-0 hidden sm:flex items-center gap-1 shadow-2xs"
            >
              <Icon name="add_circle" className="text-sm" />
              <span>Stok Masuk</span>
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs: Status Kritis vs Aman */}
      <div className="flex flex-wrap items-center justify-between gap-2 pt-0.5">
        <div className="flex flex-wrap items-center gap-1.5 text-xs font-label-ui">
          {STATUS_OPTIONS.map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => onStatusFilter?.(st)}
              className={cn(
                "px-2.5 py-1 rounded-lg transition-all cursor-pointer text-xs font-medium",
                statusFilter === st
                  ? "bg-on-surface text-surface font-bold shadow-2xs"
                  : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              )}
            >
              {st === "ALL" ? "Semua Status" : st}
            </button>
          ))}
        </div>

        {/* Lokasi Rak Dropdown/Pills */}
        {onRackFilter && (
          <div className="flex items-center gap-1.5 text-xs font-label-code text-on-surface-variant">
            <Icon name="place" className="text-xs text-primary" />
            <select
              value={rackFilter}
              onChange={(e) => onRackFilter(e.target.value)}
              className="bg-surface-container-low px-2.5 py-1 rounded-lg border border-surface-container text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
            >
              <option value="ALL">Semua Lokasi Rak</option>
              {RACK_OPTIONS.filter((r) => r !== "ALL").map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto -mx-space-md sm:-mx-space-lg px-space-md sm:px-space-lg">
        <table className="w-full text-left border-collapse min-w-[700px]">
          <thead>
            <tr className="border-b border-surface-container text-on-surface-variant font-label-code text-[11px] uppercase tracking-wider">
              <th className="py-2.5 px-3">Nama Barang & SKU</th>
              <th className="py-2.5 px-3">Lokasi Rak</th>
              <th className="py-2.5 px-3 text-center">Tingkat Ketersediaan</th>
              <th className="py-2.5 px-3 text-right">Stok Fisik</th>
              <th className="py-2.5 px-3 text-right">Batas Min</th>
              <th className="py-2.5 px-3 text-center">Status</th>
              <th className="py-2.5 px-3 text-right">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container/50 text-body-sm">
            {items.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-12 text-center text-on-surface-variant font-label-code text-xs">
                  <div className="flex flex-col items-center justify-center gap-2">
                    <Icon name="inventory_2" className="text-3xl text-outline-variant" />
                    <span>Tidak ada barang yang cocok dengan kriteria pencarian / filter ini.</span>
                    {(query || statusFilter !== "ALL" || rackFilter !== "ALL") && (
                      <button
                        type="button"
                        onClick={() => {
                          onQuery("");
                          onStatusFilter?.("ALL");
                          onRackFilter?.("ALL");
                        }}
                        className="mt-1 px-3 py-1 bg-surface-container rounded-lg text-primary text-xs font-bold hover:bg-surface-container-high cursor-pointer"
                      >
                        Reset Semua Filter
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ) : (
              items.map((row) => {
                const healthRatio = row.minStock > 0 ? row.stock / row.minStock : 1;
                const isCritical = row.status === "Habis";
                const isWarning = row.status === "Menipis";

                return (
                  <tr
                    key={row.id}
                    className={cn(
                      "transition-colors group",
                      isCritical
                        ? "bg-error-container/10 hover:bg-error-container/15"
                        : isWarning
                        ? "bg-secondary-fixed/10 hover:bg-secondary-fixed/20"
                        : "hover:bg-surface-container-low/50"
                    )}
                  >
                    {/* Nama & Kode */}
                    <td className="py-3 px-3">
                      <div className="flex flex-col">
                        <span className="font-label-ui text-xs sm:text-sm font-semibold text-on-surface">
                          {row.name}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="font-label-code text-[11px] text-on-surface-variant">
                            {row.code}
                          </span>
                          <span className="text-[10px] text-on-surface-variant/70 font-label-code">
                            • Restok {row.lastRestock}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Lokasi Rak */}
                    <td className="py-3 px-3">
                      <span className="inline-flex items-center gap-1 bg-surface-container-high/80 text-on-surface px-2.5 py-0.5 rounded-md text-xs font-label-code">
                        <Icon name="shelves" className="text-[11px] text-on-surface-variant" />
                        {row.rack}
                      </span>
                    </td>

                    {/* Health Gauge Bar */}
                    <td className="py-3 px-3">
                      <div className="w-24 sm:w-28 mx-auto flex flex-col gap-1">
                        <div className="w-full h-1.5 rounded-full bg-surface-container overflow-hidden">
                          <div
                            className={cn(
                              "h-full rounded-full transition-all duration-300",
                              isCritical
                                ? "w-1 bg-error"
                                : isWarning
                                ? "bg-secondary"
                                : "bg-tertiary"
                            )}
                            style={{
                              width: isCritical ? "4%" : `${Math.min(100, Math.round(healthRatio * 100))}%`,
                            }}
                          />
                        </div>
                        <span className="text-[10px] font-label-code text-center text-on-surface-variant">
                          {isCritical
                            ? "Kosong 0%"
                            : isWarning
                            ? `${Math.round(healthRatio * 100)}% kuota`
                            : "Stok aman"}
                        </span>
                      </div>
                    </td>

                    {/* Stok Kini */}
                    <td className="py-3 px-3 text-right">
                      <span
                        className={cn(
                          "font-label-numeric font-bold text-sm",
                          STOCK_COLOR[row.status]
                        )}
                      >
                        {row.stock}{" "}
                        <span className="text-xs font-normal text-on-surface-variant font-body">
                          {row.unitLabel}
                        </span>
                      </span>
                    </td>

                    {/* Minimal */}
                    <td className="py-3 px-3 text-right font-label-numeric text-xs text-on-surface-variant">
                      {row.minStock} {row.unitLabel}
                    </td>

                    {/* Status Badge */}
                    <td className="py-3 px-3 text-center">
                      <span
                        className={cn(
                          "px-2.5 py-0.5 rounded-full text-xs font-label-ui font-semibold inline-flex items-center gap-1",
                          STATUS_TONE[row.status]
                        )}
                      >
                        <span
                          className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            row.status === "Habis"
                              ? "bg-error"
                              : row.status === "Menipis"
                              ? "bg-secondary"
                              : "bg-tertiary"
                          )}
                        />
                        {row.status}
                      </span>
                    </td>

                    {/* Aksi */}
                    <td className="py-3 px-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {row.status === "Habis" || row.status === "Menipis" ? (
                          <button
                            type="button"
                            onClick={() => handleKulakClick(row)}
                            className={cn(
                              "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-label-ui font-bold transition-all cursor-pointer shadow-2xs",
                              justAddedId === row.id
                                ? "bg-tertiary text-on-tertiary"
                                : "bg-primary text-on-primary hover:bg-primary-container"
                            )}
                            title="Tambah langsung ke daftar belanja pasar"
                          >
                            <Icon
                              name={justAddedId === row.id ? "check" : "playlist_add"}
                              className="text-base"
                            />
                            <span>{justAddedId === row.id ? "Masuk List" : "Kulak"}</span>
                          </button>
                        ) : null}

                        <button
                          type="button"
                          onClick={() => onOpenAdjustment(row)}
                          className="inline-flex items-center gap-1 text-on-surface-variant hover:text-on-surface p-1.5 rounded-lg hover:bg-surface-container transition-colors text-xs font-label-code cursor-pointer"
                          title="Koreksi stok fisik (rusak/dipakai)"
                          aria-label={`Koreksi ${row.name}`}
                        >
                          <Icon name="tune" className="text-base" />
                          <span className="hidden xl:inline text-xs">Koreksi</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination & Summary Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-surface-container/60 text-xs font-label-code text-on-surface-variant">
        <span>
          Menampilkan <strong className="text-on-surface">{items.length}</strong> barang dari rak warung
        </span>
        <div className="flex items-center gap-1">
          <span className="px-2 py-0.5 bg-surface-container-high rounded text-on-surface font-bold text-xs">
            Halaman 1 dari 1
          </span>
        </div>
      </div>
    </div>
  );
}
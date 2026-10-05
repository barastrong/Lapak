"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";
import { BarcodeScannerModal } from "@/components/ui/BarcodeScannerModal";
import type { ShiftSummary } from "@/features/kasir/types";
import type { Product, ProductCategory } from "@/types/product";

type KasirHeaderProps = {
  shift: ShiftSummary | null;
  categories: ProductCategory[];
  activeCategory: string;
  onSelectCategory: (c: string) => void;
  onOpenPayment: () => void;
  query: string;
  onQueryChange: (q: string) => void;
  products: Product[];
  onAdd: (p: Product) => void;
};

export function KasirHeader({
  shift,
  categories,
  activeCategory,
  onSelectCategory,
  onOpenPayment,
  query,
  onQueryChange,
  products,
  onAdd,
}: KasirHeaderProps) {
  const [scannerOpen, setScannerOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between pb-space-md gap-space-md">
        <div>
          <div className="flex items-center gap-space-sm">
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Kasir penjualan
            </h1>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container-high text-tertiary-container font-label-code text-label-code">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse"></span>
              Kios Aktif
            </span>
          </div>
          <p className="text-body-md text-on-surface-variant mt-0.5">
            Shift berjalan:{" "}
            <span className="font-label-numeric text-label-code text-on-surface font-semibold">
              {shift?.transactionCount ?? 0} transaksi
            </span>{" "}
            • Total omset:{" "}
            <span className="font-label-numeric text-label-code text-primary font-bold">
              Rp {(shift?.totalOmset ?? 0).toLocaleString("id-ID")}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-space-sm w-full md:w-auto">
          <button
            type="button"
            className="flex-1 md:flex-none flex items-center justify-center gap-space-xs px-space-md py-2.5 bg-surface-container-lowest text-on-surface rounded-xl hover:bg-surface-container shadow-sm transition-all text-body-sm font-label-ui"
          >
            <Icon name="pause_circle" className="text-base" />
            <span>Tahan Nota</span>
          </button>
          <button
            type="button"
            onClick={onOpenPayment}
            className="flex-1 md:flex-none flex items-center justify-center gap-space-xs px-space-lg py-2.5 bg-primary-container text-on-primary rounded-xl hover:bg-primary transition-all shadow-md active:translate-y-0.5 font-label-ui text-body-md font-bold"
          >
            <Icon name="payments" className="text-lg" />
            <span>Bayar Langsung</span>
          </button>
        </div>
      </div>
      <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-md">
        <div className="flex flex-col sm:flex-row gap-space-sm items-stretch sm:items-center">
          <div className="relative flex-1">
            <Icon
              name="search"
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-xl"
            />
            <input
              className="w-full pl-11 pr-4 py-2.5 bg-surface-container-low text-on-surface rounded-lg font-body-md text-body-md placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary-container transition-all"
              id="katalog-search"
              placeholder="Cari nama barang atau scan barcode..."
              type="text"
              value={query}
              onChange={(e) => onQueryChange(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={() => setScannerOpen(true)}
            className="px-space-md py-2.5 bg-surface-container text-primary font-label-code text-label-code rounded-lg flex items-center justify-center gap-1.5 hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            <Icon name="barcode_scanner" className="text-lg" />
            <span>Scan Barcode</span>
          </button>
        </div>
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {categories.map((c) => (
            <button
              key={c.name}
              type="button"
              onClick={() => onSelectCategory(c.id)}
              className={cn(
                "px-3.5 py-1.5 rounded-full font-label-ui text-body-sm whitespace-nowrap transition-colors",
                activeCategory === c.id
                  ? "bg-primary-container text-on-primary font-semibold shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high"
              )}
            >
              {c.name} ({c.count})
            </button>
          ))}
        </div>
      </div>

      <BarcodeScannerModal
        open={scannerOpen}
        onClose={() => setScannerOpen(false)}
        products={products}
        onAddProduct={onAdd}
      />
    </>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { ProductFilterBar } from "@/features/produk/components/ProductFilterBar";
import { ProductTable } from "@/features/produk/components/ProductTable";
import { ProductFormModal } from "@/features/produk/components/ProductFormModal";
import { BulkActionBar } from "@/features/produk/components/BulkActionBar";
import { useProducts } from "@/features/produk/hooks/useProducts";
import { productCategoriesMock } from "@/features/produk/data/products.mock";
import { siteConfig } from "@/config/site";
import { exportToCsv } from "@/lib/export";
import type { Product } from "@/types/product";

export function ProdukScreen() {
  const state = useProducts();
  const [modalOpen, setModalOpen] = useState(false);

  const handleExport = () => {
    exportToCsv(
      "katalog-produk-lapak",
      [
        "ID Produk",
        "Nama Produk",
        "Kategori",
        "SKU",
        "Harga Beli (Rp)",
        "Harga Jual (Rp)",
        "Stok",
        "Min Stok",
        "Satuan",
      ],
      state.products.map((p) => [
        p.id,
        p.name,
        p.category,
        p.sku,
        p.buyPrice,
        p.sellPrice,
        p.stock,
        p.minStock,
        p.unitLabel,
      ])
    );
  };

  if (state.isLoading || state.products.length === 0) {
    return (
      <div className="flex items-center justify-center py-24 text-on-surface-variant">
        {state.isLoading ? "Memuat produk..." : "Belum ada produk."}
      </div>
    );
  }

  const lowStockCount = state.products.filter((p) => p.stock < p.minStock).length;

  return (
    <div className="flex flex-col gap-space-md w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm border border-surface-container">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-on-surface">
              Katalog Produk & Harga Jual
            </span>
            <span className="bg-surface-container-high text-primary px-2.5 py-0.5 rounded-full font-label-code text-label-code text-xs">
              {siteConfig.storeName}
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant">
            Kelola harga beli modal, harga ecer, keuntungan margin, dan ketersediaan stok produk.
          </p>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <Button variant="surfaceContainer" onClick={handleExport}>
            <Icon name="download" className="text-lg" />
            Ekspor CSV
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <Icon name="add" className="text-lg" />
            + Tambah Produk Baru
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-label-code text-on-surface-variant uppercase tracking-wider">
              Total Produk
            </span>
            <span className="font-headline-lg text-headline-lg text-on-surface font-extrabold mt-0.5">
              142 Item
            </span>
            <span className="text-xs text-on-surface-variant mt-1">
              Semua produk aktif di etalase
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
            <Icon name="inventory_2" className="text-2xl" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-label-code text-on-surface-variant uppercase tracking-wider">
              Rata-rata Margin
            </span>
            <span className="font-headline-lg text-headline-lg text-tertiary font-extrabold mt-0.5">
              15,2%
            </span>
            <span className="text-xs text-on-surface-variant mt-1">
              Kategori margin sehat warung
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
            <Icon name="trending_up" className="text-2xl" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-label-code text-on-surface-variant uppercase tracking-wider">
              Stok Menipis / Kritis
            </span>
            <span className="font-headline-lg text-headline-lg text-error font-extrabold mt-0.5">
              {lowStockCount} Produk
            </span>
            <span className="text-xs text-on-surface-variant mt-1">
              Perlu kulakan pasar subuh
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0">
            <Icon name="warning" className="text-2xl text-error" />
          </div>
        </div>

        <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm border border-surface-container flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-label-code text-on-surface-variant uppercase tracking-wider">
              Total Kategori
            </span>
            <span className="font-headline-lg text-headline-lg text-secondary font-extrabold mt-0.5">
              6 Kategori
            </span>
            <span className="text-xs text-on-surface-variant mt-1">
              Sembako, Minuman, Makanan, dll
            </span>
          </div>
          <div className="w-11 h-11 rounded-xl bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
            <Icon name="category" className="text-2xl" />
          </div>
        </div>
      </div>

      <ProductFilterBar
        search={state.search}
        onSearch={state.setSearch}
        category={state.category}
        onCategory={state.setCategory}
        marginTier={state.marginTier}
        onMarginTier={state.setMarginTier}
        onReset={() => {
          state.setSearch("");
          state.setCategory("Semua Kategori (6)");
          state.setMarginTier("all");
        }}
        categories={productCategoriesMock}
      />

      <ProductTable
        products={state.products}
        selected={state.selected}
        onToggle={state.toggleSelected}
        onToggleAll={state.toggleAll}
      />

      <div className="p-4 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container flex flex-col md:flex-row items-center justify-between gap-4 text-body-sm">
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span>
            Menampilkan{" "}
            <strong className="text-on-surface font-label-code">
              1-{state.products.length}
            </strong>{" "}
            dari <strong className="text-on-surface font-label-code">142</strong> produk
          </span>
          <span className="hidden sm:inline-block text-outline-variant">•</span>
          <span className="hidden sm:flex items-center gap-2 font-label-code text-xs text-on-surface">
            <span className="inline-flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-tertiary"></span> Margin Sehat (&gt;12%)
            </span>
            <span className="inline-flex items-center gap-1 ml-2">
              <span className="w-2.5 h-2.5 rounded-full bg-error"></span> Stok Menipis (&lt;5)
            </span>
          </span>
        </div>
        <PaginationFooter
          page={state.page}
          totalPages={state.totalPages}
          onPage={state.setPage}
        />
      </div>

      <BulkActionBar
        count={state.selected.length}
        onHapus={() => void state.removeProducts(state.selected)}
      />

      <ProductFormModal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={({ ...input }: Omit<Product, "id">) => void input}
      />
    </div>
  );
}

function PaginationFooter({
  page,
  totalPages,
  onPage,
}: {
  page: number;
  totalPages: number;
  onPage: (p: number) => void;
}) {
  return (
    <div className="flex items-center gap-1.5 font-label-code">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Sebelumnya"
      >
        <Icon name="chevron_left" className="text-base" />
      </button>
      {[1, 2, 3].map((n) =>
        n <= totalPages ? (
          <button
            key={n}
            type="button"
            onClick={() => onPage(n)}
            className={`w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center transition-colors cursor-pointer ${
              n === page
                ? "bg-primary text-on-primary shadow-xs"
                : "bg-surface-container text-on-surface hover:bg-surface-container-high"
            }`}
          >
            {n}
          </button>
        ) : null
      )}
      {totalPages > 3 ? (
        <>
          <span className="px-1 text-on-surface-variant">...</span>
          <button
            type="button"
            onClick={() => onPage(totalPages)}
            className="w-8 h-8 rounded-lg bg-surface-container text-on-surface hover:bg-surface-container-high text-xs font-bold flex items-center justify-center transition-colors cursor-pointer"
          >
            {totalPages}
          </button>
        </>
      ) : null}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
        className="w-8 h-8 rounded-lg bg-surface-container text-on-surface-variant hover:bg-surface-container-high flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
        aria-label="Berikutnya"
      >
        <Icon name="chevron_right" className="text-base" />
      </button>
    </div>
  );
}

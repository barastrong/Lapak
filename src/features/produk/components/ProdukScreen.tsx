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
import type { Product } from "@/types/product";

/** Perakit layar katalog produk: header, filter, tabel, paginasi, aksi massal. */
export function ProdukScreen() {
  const state = useProducts();
  const [modalOpen, setModalOpen] = useState(false);

  if (state.isLoading || state.products.length === 0) {
    return (
      <div className="flex items-center justify-center py-24 text-on-surface-variant">
        {state.isLoading ? "Memuat produk..." : "Belum ada produk."}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-2 border-b border-on-surface/10">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2.5 h-2.5 bg-primary rounded-full"></span>
            <span className="font-label-code text-label-code text-primary tracking-wider uppercase">
              Buku Kas & Stok Aktif
            </span>
          </div>
          <h1 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
            Katalog Produk & Harga
          </h1>
          <p className="flex items-center gap-2 text-body-md text-on-surface-variant">
            <span>Total 142 produk aktif di {siteConfig.storeName}</span>
            <span className="text-on-surface-variant/60">•</span>
            <span className="font-label-code text-label-code text-tertiary bg-tertiary-fixed/40 px-2 py-0.5 rounded">
              Rata-rata Margin Toko: 15,2%
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="surface">
            <Icon name="file_download" className="text-base" />
            Ekspor CSV
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <Icon name="add" className="text-base" />
            Tambah produk baru
            <kbd className="font-label-code text-[0.75rem] leading-none bg-white/20 text-white px-1.5 py-0.5 rounded ml-1">
              F3
            </kbd>
          </Button>
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

      <div className="p-4 bg-[#FAFAF7] border-t border-on-surface/10 flex flex-col md:flex-row items-center justify-between gap-4 text-body-sm">
        <div className="flex items-center gap-4 text-on-surface-variant">
          <span>
            Menampilkan{" "}
            <strong className="text-on-surface font-label-code">
              1-{state.products.length}
            </strong>{" "}
            dari <strong className="text-on-surface font-label-code">142</strong> produk
          </span>
          <span className="hidden sm:inline-block text-on-surface-variant/60">•</span>
          <span className="hidden sm:flex items-center gap-1.5 font-label-code text-[0.75rem] text-on-surface">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span> Margin Sehat
            <span className="w-2 h-2 rounded-full bg-error ml-2"></span> Stok Menipis (&lt;5)
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
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPage(page - 1)}
        className="w-8 h-8 rounded border border-on-surface/15 flex items-center justify-center text-on-surface-variant hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
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
            className={
              n === page
                ? "w-8 h-8 rounded bg-primary text-white font-label-code text-xs flex items-center justify-center shadow-xs"
                : "w-8 h-8 rounded border border-on-surface/15 flex items-center justify-center text-on-surface hover:bg-white font-label-code text-xs"
            }
          >
            {n}
          </button>
        ) : null
      )}
      {totalPages > 3 ? (
        <>
          <span className="px-1 text-on-surface-variant/60">...</span>
          <button
            type="button"
            onClick={() => onPage(totalPages)}
            className="w-8 h-8 rounded border border-on-surface/15 flex items-center justify-center text-on-surface hover:bg-white font-label-code text-xs"
          >
            {totalPages}
          </button>
        </>
      ) : null}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPage(page + 1)}
        className="w-8 h-8 rounded border border-on-surface/15 flex items-center justify-center text-on-surface-variant hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Berikutnya"
      >
        <Icon name="chevron_right" className="text-base" />
      </button>
    </div>
  );
}
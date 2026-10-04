"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { deleteProducts, getProducts } from "@/features/produk/services/productService";
import type { Product } from "@/types/product";

const PAGE_SIZE = 5;

export type ProdukState = {
  products: Product[];
  isLoading: boolean;
  error: string | null;
  search: string;
  setSearch: (s: string) => void;
  category: string;
  setCategory: (c: string) => void;
  marginTier: string;
  setMarginTier: (t: string) => void;
  selected: string[];
  toggleSelected: (id: string) => void;
  toggleAll: (ids: string[]) => void;
  clearSelection: () => void;
  removeProducts: (ids: string[]) => Promise<void>;
  page: number;
  totalPages: number;
  setPage: (p: number) => void;
  refetch: () => void;
};

/** Data & interaksi halaman produk (pencarian, filter, seleksi massal, paginasi). */
export function useProducts(): ProdukState {
  const [all, setAll] = useState<Product[] | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua Kategori (6)");
  const [marginTier, setMarginTier] = useState("all");
  const [selected, setSelected] = useState<string[]>([]);
  const [page, setPage] = useState(1);

  const run = useCallback(() => {
    return getProducts()
      .then((d) => {
        setAll(d);
        setError(null);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Gagal memuat produk."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void run();
  }, [run]);

  const products = useMemo(() => {
    if (!all) return [] as Product[];
    const q = search.toLowerCase();
    return all.filter((p) => {
      const matchText = (p.name + p.sku + (p.barcode ?? "")).toLowerCase().includes(q);
      const matchCat = category.startsWith("Semua") || p.category === category;
      const margin = p.sellPrice > 0 ? ((p.sellPrice - p.buyPrice) / p.sellPrice) * 100 : 0;
      const matchMargin =
        marginTier === "all" ||
        (marginTier === "low" && margin < 12) ||
        (marginTier === "standard" && margin >= 12 && margin <= 18) ||
        (marginTier === "high" && margin > 18);
      return matchText && matchCat && matchMargin;
    });
  }, [all, search, category, marginTier]);

  const totalPages = Math.max(1, Math.ceil(products.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const pageProducts = products.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  const toggleSelected = (id: string) =>
    setSelected((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleAll = (ids: string[]) => {
    const allSelected = ids.length > 0 && ids.every((id) => selected.includes(id));
    setSelected(
      allSelected ? selected.filter((x) => !ids.includes(x)) : [...new Set([...selected, ...ids])]
    );
  };

  const clearSelection = () => setSelected([]);

  const removeProducts = async (ids: string[]) => {
    await deleteProducts(ids);
    setAll((prev) => prev?.filter((p) => !ids.includes(p.id)) ?? null);
    clearSelection();
  };

  const refetch = () => {
    setLoading(true);
    void run();
  };

  return {
    products: pageProducts,
    isLoading,
    error,
    search,
    setSearch,
    category,
    setCategory,
    marginTier,
    setMarginTier,
    selected,
    toggleSelected,
    toggleAll,
    clearSelection,
    removeProducts,
    page: current,
    totalPages,
    setPage,
    refetch,
  };
}
"use client";

import { useCallback, useEffect, useState } from "react";
import { getShoppingList, getStockItems, getStockReasons, getStockSummary } from "@/features/stok/services/stockService";
import type { ShoppingItem, StockAdjustment, StockItem, StockSummary } from "@/features/stok/types";

export type StokState = {
  items: StockItem[] | null;
  summary: StockSummary | null;
  shopping: ShoppingItem[];
  reasons: string[];
  query: string;
  rackFilter: string;
  setQuery: (s: string) => void;
  setRackFilter: (r: string) => void;
  toggleShopping: (id: string) => void;
  addShoppingItem: (name: string) => void;
  adjustStock: (a: StockAdjustment) => void;
  filteredItems: StockItem[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

/** Data stok, daftar belanja pasar, pencarian, dan koreksi fisik. */
export function useStock(): StokState {
  const [items, setItems] = useState<StockItem[] | null>(null);
  const [summary, setSummary] = useState<StockSummary | null>(null);
  const [shopping, setShopping] = useState<ShoppingItem[]>([]);
  const [reasons, setReasons] = useState<string[]>([]);
  const [query, setQuery] = useState("");
  const [rackFilter, setRackFilter] = useState("ALL");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(() => {
    return Promise.all([getStockItems(), getStockSummary(), getShoppingList(), getStockReasons()])
      .then(([it, su, sh, rs]) => {
        setItems(it);
        setSummary(su);
        setShopping(sh);
        setReasons(rs);
        setError(null);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Gagal memuat data stok."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void run();
  }, [run]);

  const filteredItems = items?.filter((i) => {
    const matchQuery = (i.name + i.code).toLowerCase().includes(query.toLowerCase());
    const matchRack = rackFilter === "ALL" || i.rack.toLowerCase().includes(rackFilter.toLowerCase());
    return matchQuery && matchRack;
  }) ?? [];

  const toggleShopping = (id: string) =>
    setShopping((prev) => prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s)));

  const addShoppingItem = (name: string) => {
    setShopping((prev) => [
      ...prev,
      {
        id: `L-${Date.now()}`,
        name,
        qty: "1 Karton",
        supplier: "Agen Grosir Mandiri",
        supplierIcon: "storefront",
        estPrice: 150_000,
        checked: false,
      },
    ]);
  };

  const adjustStock = (a: StockAdjustment) => {
    setItems((prev) =>
      prev
        ? prev.map((item) =>
            item.name === a.productName
              ? {
                  ...item,
                  stock: Math.max(0, item.stock - a.qty),
                  status:
                    Math.max(0, item.stock - a.qty) === 0
                      ? "Habis"
                      : Math.max(0, item.stock - a.qty) <= item.minStock
                      ? "Menipis"
                      : "Aman",
                }
              : item
          )
        : prev
    );
  };

  const refetch = () => {
    setLoading(true);
    void run();
  };

  return {
    items,
    summary,
    shopping,
    reasons,
    query,
    rackFilter,
    setQuery,
    setRackFilter,
    toggleShopping,
    addShoppingItem,
    adjustStock,
    filteredItems,
    isLoading,
    error,
    refetch,
  };
}
"use client";

import { useCallback, useEffect, useState } from "react";
import { getShoppingList, getStockItems, getStockReasons, getStockSummary } from "@/features/stok/services/stockService";
import type { ShoppingItem, StockItem, StockSummary } from "@/features/stok/types";

export type StokState = {
  items: StockItem[] | null;
  summary: StockSummary | null;
  shopping: ShoppingItem[];
  reasons: string[];
  query: string;
  setQuery: (s: string) => void;
  toggleShopping: (id: string) => void;
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

  const filteredItems = items?.filter((i) =>
    (i.name + i.code).toLowerCase().includes(query.toLowerCase())
  ) ?? [];

  const toggleShopping = (id: string) =>
    setShopping((prev) => prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s)));

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
    setQuery,
    toggleShopping,
    filteredItems,
    isLoading,
    error,
    refetch,
  };
}
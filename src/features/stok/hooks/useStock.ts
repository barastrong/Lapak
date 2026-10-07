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
  statusFilter: string;
  setQuery: (s: string) => void;
  setRackFilter: (r: string) => void;
  setStatusFilter: (s: string) => void;
  toggleShopping: (id: string) => void;
  addShoppingItem: (name: string, customQty?: string, customPrice?: number) => void;
  removeShoppingItem: (id: string) => void;
  clearCheckedShopping: () => void;
  recordIncomingStock: (entry: { name: string; qty: number; supplier: string; rack?: string }) => void;
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
  const [statusFilter, setStatusFilter] = useState("ALL");
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
    const matchStatus = statusFilter === "ALL" || i.status === statusFilter;
    return matchQuery && matchRack && matchStatus;
  }) ?? [];

  const dynamicSummary: StockSummary | null = items ? {
    criticalCount: items.filter((i) => i.status === "Habis").length,
    criticalLabel: `${items.filter((i) => i.status === "Habis").length} Habis Total`,
    warningCount: items.filter((i) => i.status === "Menipis").length,
    warningLabel: `${items.filter((i) => i.status === "Menipis").length} Barang Menipis`,
    estimateTotal: shopping.reduce((acc, s) => acc + s.estPrice, 0),
  } : summary;

  const toggleShopping = (id: string) =>
    setShopping((prev) => prev.map((s) => (s.id === id ? { ...s, checked: !s.checked } : s)));

  const addShoppingItem = (name: string, customQty = "1 Karton", customPrice = 150_000) => {
    setShopping((prev) => [
      ...prev,
      {
        id: `L-${Date.now()}`,
        name,
        qty: customQty,
        supplier: "Agen Grosir Mandiri",
        supplierIcon: "storefront",
        estPrice: customPrice,
        checked: false,
      },
    ]);
  };

  const removeShoppingItem = (id: string) => {
    setShopping((prev) => prev.filter((s) => s.id !== id));
  };

  const clearCheckedShopping = () => {
    setShopping((prev) => prev.filter((s) => !s.checked));
  };

  const recordIncomingStock = ({ name, qty, supplier, rack }: { name: string; qty: number; supplier: string; rack?: string }) => {
    setItems((prev) => {
      if (!prev) return prev;
      const existing = prev.find((item) => item.name.toLowerCase() === name.toLowerCase());
      if (existing) {
        return prev.map((item) => {
          if (item.name.toLowerCase() === name.toLowerCase()) {
            const nextStock = item.stock + qty;
            return {
              ...item,
              stock: nextStock,
              status: nextStock <= 0 ? "Habis" : nextStock <= item.minStock ? "Menipis" : nextStock > item.minStock * 2.5 ? "Berlebih" : "Aman",
              lastRestock: "Baru saja",
            };
          }
          return item;
        });
      }
      return [
        {
          id: `S-${Date.now()}`,
          name,
          code: `KUL-${Math.floor(100 + Math.random() * 900)}`,
          rack: rack || "Lantai Depan",
          stock: qty,
          minStock: Math.max(5, Math.round(qty * 0.4)),
          unitLabel: "unit",
          lastRestock: "Baru saja",
          status: qty > 10 ? "Aman" : "Menipis",
        },
        ...prev,
      ];
    });
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
    summary: dynamicSummary,
    shopping,
    reasons,
    query,
    rackFilter,
    statusFilter,
    setQuery,
    setRackFilter,
    setStatusFilter,
    toggleShopping,
    addShoppingItem,
    removeShoppingItem,
    clearCheckedShopping,
    recordIncomingStock,
    adjustStock,
    filteredItems,
    isLoading,
    error,
    refetch,
  };
}
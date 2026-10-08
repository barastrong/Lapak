import {
  stockItemsMock,
  stockReasonsMock,
  stockSummaryMock,
  shoppingListMock,
} from "@/features/stok/data/stok.mock";
import type { ShoppingItem, StockItem, StockSummary } from "@/features/stok/types";

/** Ambil data stok & pergerakan rak dari backend MySQL API. */
export async function getStockItems(): Promise<StockItem[]> {
  try {
    const res = await fetch("/api/stock", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil data stok.");
    const json = await res.json();
    return json.success && json.data?.items ? json.data.items : stockItemsMock;
  } catch (error) {
    console.warn("[StockService] Fallback lokal stok:", error);
    return stockItemsMock;
  }
}

export async function getStockSummary(): Promise<StockSummary> {
  try {
    const res = await fetch("/api/stock?mode=summary", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil ringkasan stok.");
    const json = await res.json();
    return json.success && json.data ? json.data : stockSummaryMock;
  } catch (error) {
    console.warn("[StockService] Fallback ringkasan stok:", error);
    return stockSummaryMock;
  }
}

export async function getShoppingList(): Promise<ShoppingItem[]> {
  try {
    const res = await fetch("/api/stock/shopping", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil catatan belanja.");
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : shoppingListMock;
  } catch (error) {
    console.warn("[StockService] Fallback catatan belanja:", error);
    return shoppingListMock;
  }
}

export async function getStockReasons(): Promise<string[]> {
  return stockReasonsMock;
}
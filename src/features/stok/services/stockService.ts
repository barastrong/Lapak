import { stockItemsMock, stockReasonsMock, stockSummaryMock, shoppingListMock } from "@/features/stok/data/stok.mock";
import type { ShoppingItem, StockItem, StockSummary } from "@/features/stok/types";

/** // TODO: hook ke API — ganti isi dengan fetch("/api/stock"). */
export async function getStockItems(): Promise<StockItem[]> {
  return stockItemsMock;
}

export async function getStockSummary(): Promise<StockSummary> {
  return stockSummaryMock;
}

export async function getShoppingList(): Promise<ShoppingItem[]> {
  return shoppingListMock;
}

export async function getStockReasons(): Promise<string[]> {
  return stockReasonsMock;
}
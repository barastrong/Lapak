import {
  kasirCatalogMock,
  initialCartMock,
  quickCashMock,
  shiftSummaryMock,
} from "@/features/kasir/data/kasir.mock";
import type { CartLine, QuickCash, ShiftSummary } from "@/features/kasir/types";
import type { Product } from "@/types/product";

/** Ambil katalog produk kasir dari MySQL backend API. */
export async function getCatalog(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil katalog dari server.");
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : kasirCatalogMock;
  } catch (error) {
    console.warn("[KasirService] Fallback katalog lokal:", error);
    return kasirCatalogMock;
  }
}

export async function getInitialCart(): Promise<CartLine[]> {
  return initialCartMock;
}

export async function getShiftSummary(): Promise<ShiftSummary> {
  return shiftSummaryMock;
}

export async function getQuickCash(): Promise<QuickCash[]> {
  return quickCashMock;
}
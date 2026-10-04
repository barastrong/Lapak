import {
  kasirCatalogMock,
  initialCartMock,
  quickCashMock,
  shiftSummaryMock,
} from "@/features/kasir/data/kasir.mock";
import type { CartLine, QuickCash, ShiftSummary } from "@/features/kasir/types";
import type { Product } from "@/types/product";

/** // TODO: hook ke API — ganti isi fungsi-fungsi ini dengan fetch ke backend. */
export async function getCatalog(): Promise<Product[]> {
  return kasirCatalogMock;
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
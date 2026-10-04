import type { Product } from "@/types/product";
import type { CartLine, PaymentMethod, ShiftSummary } from "@/features/kasir/types";

/** Katalog cepat produk di layar kasir. */
export const kasirCatalogMock: Product[] = [
  { id: "K1", name: "Minyak Goreng Kita 1L", sku: "SBK-01", category: "Sembako", unitLabel: "botol", buyPrice: 13200, sellPrice: 15500, stock: 24, minStock: 5, icon: "oil_barrel", barcode: "8992388102" },
  { id: "K2", name: "Beras Rojolele 5kg", sku: "SBK-04", category: "Sembako", unitLabel: "karung", buyPrice: 61000, sellPrice: 68000, stock: 8, minStock: 5, icon: "grain", barcode: "8993189201" },
  { id: "K3", name: "Gula Pasir Gulaku 1kg", sku: "SBK-09", category: "Sembako", unitLabel: "bungkus", buyPrice: 15000, sellPrice: 17500, stock: 15, minStock: 5, icon: "cake", barcode: "8992019441" },
  { id: "K4", name: "Telur Ayam 1kg (Isi 16)", sku: "SBK-12", category: "Sembako", unitLabel: "kg", buyPrice: 24500, sellPrice: 28000, stock: 12, minStock: 6, icon: "egg" },
  { id: "K5", name: "Indomie Goreng Original", sku: "MIE-02", category: "Camilan & Kerupuk", unitLabel: "bungkus", buyPrice: 2800, sellPrice: 3500, stock: 72, minStock: 20, icon: "ramen_dining" },
  { id: "K6", name: "Kopi Kapal Api Spesial", sku: "KOP-05", category: "Minuman & Es", unitLabel: "sachet", buyPrice: 1200, sellPrice: 1500, stock: 45, minStock: 15, icon: "coffee" },
  { id: "K7", name: "Teh Botol Sosro 250ml", sku: "MIN-08", category: "Minuman & Es", unitLabel: "kotak", buyPrice: 3200, sellPrice: 4000, stock: 18, minStock: 8, icon: "local_drink" },
  { id: "K8", name: "Kerupuk Kaleng Putih", sku: "CML-03", category: "Camilan & Kerupuk", unitLabel: "buah", buyPrice: 1600, sellPrice: 2000, stock: 30, minStock: 10, icon: "cereal" },
];

/** Transaksi terakhir yang mengisi keranjang versi statis. */
export const initialCartMock: CartLine[] = [
  { product: kasirCatalogMock[4], quantity: 3 },
  { product: kasirCatalogMock[0], quantity: 2 },
  { product: kasirCatalogMock[3], quantity: 1 },
  { product: kasirCatalogMock[5], quantity: 5 },
];

/** Ringkasan shift berjalan (angka contoh dari template). */
export const shiftSummaryMock: ShiftSummary = {
  transactionCount: 42,
  totalOmset: 1_485_500,
};

export const paymentMethodsMock: PaymentMethod[] = ["TUNAI", "QRIS", "KASBON"];

export const quickCashMock: { label: string; value: number | null }[] = [
  { label: "Uang Pas", value: null },
  { label: "Rp 80.000", value: 80_000 },
  { label: "Rp 100.000", value: 100_000 },
];
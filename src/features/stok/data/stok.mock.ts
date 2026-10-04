import type { ShoppingItem, StockAdjustment, StockItem, StockSummary } from "@/features/stok/types";

export const stockItemsMock: StockItem[] = [
  { id: "S1", name: "Beras Rojolele 5kg", code: "BRS-ROJ-005", rack: "Lantai Depan", stock: 0, minStock: 5, unitLabel: "sak", lastRestock: "3 hari lalu", status: "Habis" },
  { id: "S2", name: "Minyak Goreng Kita 1L", code: "MYK-KTA-001", rack: "Rak A2 Minyak", stock: 1, minStock: 12, unitLabel: "btl", lastRestock: "Kemarin sore", status: "Habis" },
  { id: "S3", name: "Rinso Bubuk 770g", code: "DTR-RNS-770", rack: "Rak C1 Sabun", stock: 2, minStock: 8, unitLabel: "bks", lastRestock: "4 hari lalu", status: "Menipis" },
  { id: "S4", name: "Tepung Segitiga Biru 1kg", code: "TPG-SGB-001", rack: "Rak B3 Sembako", stock: 3, minStock: 10, unitLabel: "bks", lastRestock: "5 hari lalu", status: "Menipis" },
  { id: "S5", name: "Gula Pasir Gulaku 1kg", code: "GLA-GLK-001", rack: "Rak B1 Sembako", stock: 18, minStock: 10, unitLabel: "bks", lastRestock: "1 hari lalu", status: "Aman" },
  { id: "S6", name: "Kopi Kapal Api Spesial 65g", code: "KOP-KAP-065", rack: "Gantungan Depan", stock: 42, minStock: 15, unitLabel: "renteng", lastRestock: "2 hari lalu", status: "Berlebih" },
];

export const stockSummaryMock: StockSummary = {
  criticalCount: 5,
  criticalLabel: "5 Habis Total",
  warningCount: 8,
  warningLabel: "8 Barang Menipis",
  estimateTotal: 1_450_000,
};

export const shoppingListMock: ShoppingItem[] = [
  { id: "L1", name: "Beras Rojolele 5kg", qty: "10 Karung", supplier: "Toko Beras Sumber Rejeki", supplierIcon: "store", estPrice: 680_000, checked: true },
  { id: "L2", name: "Rinso Bubuk 770g", qty: "1 Karton", supplier: "Agen Grosir Mandiri", supplierIcon: "storefront", estPrice: 240_000, checked: true },
  { id: "L3", name: "Tepung Segitiga Biru 1kg", qty: "1 Dus", supplier: "Agen Grosir Mandiri", supplierIcon: "storefront", estPrice: 150_000, checked: true },
  { id: "L4", name: "Minyak Goreng Kita 1L", qty: "2 Karton", supplier: "Distributor Resmi", supplierIcon: "local_shipping", estPrice: 380_000, checked: true },
];

export const stockReasonsMock = [
  "Dipakai Sendiri (Dapur)",
  "Kemasan Rusak / Bocor",
  "Kadaluarsa / Basi",
  "Hilang / Selisih Hitung",
];

/** Ringkasan koreksi fisik modal versi statis. */
export const initialAdjustmentMock: StockAdjustment = {
  productName: "Gula Pasir Gulaku 1kg",
  currentStock: 18,
  qty: 1,
  reason: "Dipakai Sendiri (Dapur)",
  note: "",
};
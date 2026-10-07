import type { ShoppingItem, StockAdjustment, StockItem, StockSummary } from "@/features/stok/types";

export const stockItemsMock: StockItem[] = [
  { id: "S1", name: "Beras Rojolele 5kg", code: "BRS-ROJ-005", rack: "Lantai Depan", stock: 0, minStock: 5, unitLabel: "sak", lastRestock: "3 hari lalu", status: "Habis" },
  { id: "S2", name: "Telur Ayam Negeri (Fresh)", code: "TLR-AYM-001", rack: "Meja Peti Kasir", stock: 1, minStock: 15, unitLabel: "kg", lastRestock: "Kemarin subuh", status: "Habis" },
  { id: "S3", name: "Minyak Goreng Kita 1L", code: "MYK-KTA-001", rack: "Rak A2 Minyak", stock: 1, minStock: 12, unitLabel: "btl", lastRestock: "Kemarin sore", status: "Habis" },
  { id: "S4", name: "Indomie Goreng Spesial 85g", code: "MIE-IDM-085", rack: "Rak B2 Mi Instan", stock: 4, minStock: 40, unitLabel: "bks", lastRestock: "4 hari lalu", status: "Menipis" },
  { id: "S5", name: "Rinso Bubuk 770g", code: "DTR-RNS-770", rack: "Rak C1 Sabun", stock: 2, minStock: 8, unitLabel: "bks", lastRestock: "4 hari lalu", status: "Menipis" },
  { id: "S6", name: "Tepung Segitiga Biru 1kg", code: "TPG-SGB-001", rack: "Rak B3 Sembako", stock: 3, minStock: 10, unitLabel: "bks", lastRestock: "5 hari lalu", status: "Menipis" },
  { id: "S7", name: "Susu Frisian Flag Cokelat 370g", code: "SSU-FFL-370", rack: "Rak A1 Susu", stock: 5, minStock: 12, unitLabel: "klg", lastRestock: "3 hari lalu", status: "Menipis" },
  { id: "S8", name: "Gula Pasir Gulaku 1kg", code: "GLA-GLK-001", rack: "Rak B1 Sembako", stock: 18, minStock: 10, unitLabel: "bks", lastRestock: "1 hari lalu", status: "Aman" },
  { id: "S9", name: "Kecap Manis Bango 520ml Refill", code: "KCP-BNG-520", rack: "Rak A3 Bumbu", stock: 14, minStock: 8, unitLabel: "pch", lastRestock: "2 hari lalu", status: "Aman" },
  { id: "S10", name: "Royco Kaldu Sapi 230g", code: "BMB-RYC-230", rack: "Gantungan Depan", stock: 22, minStock: 10, unitLabel: "bks", lastRestock: "1 hari lalu", status: "Aman" },
  { id: "S11", name: "Kopi Kapal Api Spesial 65g", code: "KOP-KAP-065", rack: "Gantungan Depan", stock: 42, minStock: 15, unitLabel: "renteng", lastRestock: "2 hari lalu", status: "Berlebih" },
  { id: "S12", name: "Sabun Mandi Lifebuoy Total 10 85g", code: "SBN-LFB-085", rack: "Rak C2 Kebersihan", stock: 36, minStock: 12, unitLabel: "pcs", lastRestock: "3 hari lalu", status: "Berlebih" },
];

export const stockSummaryMock: StockSummary = {
  criticalCount: 3,
  criticalLabel: "3 Habis Total",
  warningCount: 4,
  warningLabel: "4 Barang Menipis",
  estimateTotal: 2_045_000,
};

export const shoppingListMock: ShoppingItem[] = [
  { id: "L1", name: "Beras Rojolele 5kg", qty: "10 Sak", supplier: "Toko Beras Sumber Rejeki", supplierIcon: "store", estPrice: 680_000, checked: false },
  { id: "L2", name: "Telur Ayam Negeri Fresh", qty: "1 Peti (15kg)", supplier: "Agen Telur H. Mahmud", supplierIcon: "egg", estPrice: 420_000, checked: false },
  { id: "L3", name: "Minyak Goreng Kita 1L", qty: "2 Karton", supplier: "Distributor Resmi Bulog", supplierIcon: "local_shipping", estPrice: 360_000, checked: true },
  { id: "L4", name: "Indomie Goreng Spesial", qty: "3 Dus", supplier: "Agen Grosir Mandiri", supplierIcon: "storefront", estPrice: 345_000, checked: false },
  { id: "L5", name: "Rinso Bubuk 770g", qty: "1 Karton", supplier: "Agen Grosir Mandiri", supplierIcon: "storefront", estPrice: 240_000, checked: true },
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
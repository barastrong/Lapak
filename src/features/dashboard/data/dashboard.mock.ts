import type { DashboardSummary, RecentTransaction, SalesDataPoint, TopProduct } from "@/features/dashboard/types";

export const dashboardSummaryMock: DashboardSummary = {
  omsetHariIni: 1_845_000,
  transaksiHariIni: 42,
  labaBersih: 328_500,
  margin: 17.8,
  stokMenipis: 8,
  kasbonBelumLunas: 415_000,
  produkTerjual: 96,
};

export const salesWeekMock: SalesDataPoint[] = [
  { label: "Sen", omset: 1_120_000 },
  { label: "Sel", omset: 1_045_000 },
  { label: "Rab", omset: 1_380_000 },
  { label: "Kam", omset: 1_210_000 },
  { label: "Jum", omset: 1_640_000 },
  { label: "Sab", omset: 1_845_000 },
  { label: "Min", omset: 1_490_000 },
];

export const recentTransactionsMock: RecentTransaction[] = [
  { id: "T1", no: "#NK-2025-0842", time: "10:14", detail: "Rokok & Kopi (3 item)", total: 77_000, payment: "TUNAI" },
  { id: "T2", no: "#NK-2025-0841", time: "10:02", detail: "Sembako Beras 5kg", total: 45_000, payment: "QRIS" },
  { id: "T3", no: "#NK-2025-0840", time: "09:48", detail: "Minyak Goreng & Telur", total: 35_000, payment: "KASBON" },
  { id: "T4", no: "#NK-2025-0839", time: "09:31", detail: "Camilan & Minuman", total: 28_500, payment: "TUNAI" },
  { id: "T5", no: "#NK-2025-0838", time: "09:15", detail: "Sembako (4 item)", total: 96_000, payment: "QRIS" },
];

export const topProductsMock: TopProduct[] = [
  { product: { id: "TP1", name: "Beras Rojolele 5kg", sku: "SBK-04", category: "Sembako", unitLabel: "karung", buyPrice: 61_000, sellPrice: 68_000, stock: 8, minStock: 5, icon: "grain" }, soldQty: 12, total: 816_000 },
  { product: { id: "TP2", name: "Minyak Goreng Kita 1L", sku: "SBK-01", category: "Sembako", unitLabel: "botol", buyPrice: 13_200, sellPrice: 15_500, stock: 24, minStock: 5, icon: "oil_barrel" }, soldQty: 18, total: 279_000 },
  { product: { id: "TP3", name: "Indomie Goreng Original", sku: "MIE-02", category: "Camilan & Kerupuk", unitLabel: "bungkus", buyPrice: 2_800, sellPrice: 3_500, stock: 72, minStock: 20, icon: "ramen_dining" }, soldQty: 25, total: 87_500 },
  { product: { id: "TP4", name: "Telur Ayam 1kg", sku: "SBK-12", category: "Sembako", unitLabel: "kg", buyPrice: 24_500, sellPrice: 28_000, stock: 12, minStock: 6, icon: "egg" }, soldQty: 9, total: 252_000 },
];
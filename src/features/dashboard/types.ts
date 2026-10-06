import type { Product } from "@/types/product";

export type SalesDataPoint = {
  label: string;
  omset: number;
  transaksi?: number;
  laba?: number;
  isToday?: boolean;
};

export type DashboardSummary = {
  omsetHariIni: number;
  transaksiHariIni: number;
  labaBersih: number;
  margin: number;
  stokMenipis: number;
  kasbonBelumLunas: number;
  produkTerjual: number;
  omsetKemarin?: number;
  kasTunaiLaci?: number;
  qrisMasuk?: number;
  targetHarian?: number;
};

export type RecentTransaction = {
  id: string;
  no: string;
  time: string;
  detail: string;
  total: number;
  payment: "TUNAI" | "QRIS" | "KASBON";
  cashier?: string;
  customer?: string;
};

export type PaymentMethodStat = {
  method: "TUNAI" | "QRIS" | "KASBON";
  label: string;
  amount: number;
  count: number;
  percentage: number;
  note: string;
};

export type TopProduct = {
  product: Product;
  soldQty: number;
  total: number;
  margin?: number;
};

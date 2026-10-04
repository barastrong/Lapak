import type { Product } from "@/types/product";

export type SalesDataPoint = {
  label: string;
  omset: number;
};

export type DashboardSummary = {
  omsetHariIni: number;
  transaksiHariIni: number;
  labaBersih: number;
  margin: number;
  stokMenipis: number;
  kasbonBelumLunas: number;
  produkTerjual: number;
};

export type RecentTransaction = {
  id: string;
  no: string;
  time: string;
  detail: string;
  total: number;
  payment: "TUNAI" | "QRIS" | "KASBON";
};

export type TopProduct = {
  product: Product;
  soldQty: number;
  total: number;
};
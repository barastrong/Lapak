import {
  dashboardSummaryMock,
  paymentMethodStatsMock,
  recentTransactionsMock,
  salesWeekMock,
  topProductsMock,
} from "@/features/dashboard/data/dashboard.mock";
import type {
  DashboardSummary,
  PaymentMethodStat,
  RecentTransaction,
  SalesDataPoint,
  TopProduct,
} from "@/features/dashboard/types";

export type DashboardData = {
  summary: DashboardSummary;
  salesWeek: SalesDataPoint[];
  recentTransactions: RecentTransaction[];
  topProducts: TopProduct[];
  paymentStats: PaymentMethodStat[];
};

/** Ambil data dashboard ringkasan dari backend MySQL API. */
export async function getDashboardData(): Promise<DashboardData> {
  try {
    const res = await fetch("/api/dashboard", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil dashboard dari server.");
    const json = await res.json();
    if (json.success && json.data) return json.data as DashboardData;
    throw new Error(json.error || "Respons dashboard tidak valid.");
  } catch (error) {
    console.warn("[DashboardService] Fallback lokal:", error);
    return {
      summary: dashboardSummaryMock,
      salesWeek: salesWeekMock,
      recentTransactions: recentTransactionsMock,
      topProducts: topProductsMock,
      paymentStats: paymentMethodStatsMock,
    };
  }
}

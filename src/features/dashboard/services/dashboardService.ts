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

/** // TODO: hook ke API — ganti isi dengan fetch("/api/dashboard/summary"). */
export async function getDashboardData(): Promise<DashboardData> {
  return {
    summary: dashboardSummaryMock,
    salesWeek: salesWeekMock,
    recentTransactions: recentTransactionsMock,
    topProducts: topProductsMock,
    paymentStats: paymentMethodStatsMock,
  };
}

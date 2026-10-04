import {
  chartCalloutsMock,
  closeValidationMock,
  dailyProfitMock,
  periodOptionsMock,
  reportSummaryMock,
  transactionsMock,
} from "@/features/laporan/data/laporan.mock";
import type { ChartCallout, CloseValidation, DailyProfitPoint, PeriodOption, ReportSummary, TransactionRow } from "@/features/laporan/types";

export type LaporanData = {
  summary: ReportSummary;
  periods: PeriodOption[];
  dailyProfit: DailyProfitPoint[];
  callouts: ChartCallout[];
  transactions: TransactionRow[];
  closeValidation: CloseValidation;
};

/** // TODO: hook ke API — ganti isi dengan fetch(`/api/reports?period=${period}`). */
export function getLaporanData(period: PeriodOption): Promise<LaporanData> {
  void period;
  return Promise.resolve({
    summary: reportSummaryMock,
    periods: periodOptionsMock,
    dailyProfit: dailyProfitMock,
    callouts: chartCalloutsMock,
    transactions: transactionsMock,
    closeValidation: closeValidationMock,
  });
}
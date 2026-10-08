import {
  categoryProfitabilityMock,
  chartCalloutsMock,
  closeValidationMock,
  paymentMethodBreakdownMock,
  periodOptionsMock,
  periodProfitCharts,
  periodSummaries,
  reconciliationHistoryMock,
  transactionsMock,
} from "@/features/laporan/data/laporan.mock";
import type {
  CategoryProfitability,
  ChartCallout,
  CloseValidation,
  DailyProfitPoint,
  PaymentMethodBreakdown,
  PeriodOption,
  ReconciliationRecord,
  ReportSummary,
  TransactionRow,
} from "@/features/laporan/types";

export type LaporanData = {
  summary: ReportSummary;
  periods: PeriodOption[];
  dailyProfit: DailyProfitPoint[];
  callouts: ChartCallout[];
  transactions: TransactionRow[];
  closeValidation: CloseValidation;
  paymentBreakdown: PaymentMethodBreakdown[];
  categoryBreakdown: CategoryProfitability[];
  reconciliationHistory: ReconciliationRecord[];
};

export const periodCashierProfitCharts: Record<PeriodOption, Record<string, DailyProfitPoint[]>> = {
  "Hari Ini": {
    "Bu Sari": [
      { label: "06:00", profit: 18_000, omset: 100_000, transaksi: 3 },
      { label: "08:00", profit: 55_000, omset: 290_000, transaksi: 6 },
      { label: "10:00", profit: 70_000, omset: 380_000, transaksi: 8 },
      { label: "12:00", profit: 40_000, omset: 230_000, transaksi: 5 },
      { label: "14:00", profit: 28_000, omset: 160_000, transaksi: 4 },
      { label: "16:00", profit: 16_000, omset: 95_000, transaksi: 2 },
    ],
    Sari: [
      { label: "06:00", profit: 4_000, omset: 25_000, transaksi: 1 },
      { label: "08:00", profit: 15_000, omset: 80_000, transaksi: 2 },
      { label: "10:00", profit: 18_000, omset: 95_000, transaksi: 3 },
      { label: "12:00", profit: 14_000, omset: 80_000, transaksi: 2 },
      { label: "14:00", profit: 10_000, omset: 60_000, transaksi: 1 },
      { label: "16:00", profit: 5_000, omset: 35_000, transaksi: 1 },
    ],
    Budi: [
      { label: "06:00", profit: 2_000, omset: 15_000, transaksi: 0 },
      { label: "08:00", profit: 8_000, omset: 40_000, transaksi: 1 },
      { label: "10:00", profit: 7_000, omset: 45_000, transaksi: 1 },
      { label: "12:00", profit: 8_000, omset: 50_000, transaksi: 1 },
      { label: "14:00", profit: 7_000, omset: 40_000, transaksi: 1 },
      { label: "16:00", profit: 3_500, omset: 25_000, transaksi: 0 },
    ],
  },
  "Minggu Ini": {
    "Bu Sari": [
      { label: "Sen", profit: 135_000, omset: 760_000, transaksi: 19 },
      { label: "Sel", profit: 125_000, omset: 710_000, transaksi: 17 },
      { label: "Rab", profit: 165_000, omset: 940_000, transaksi: 22 },
      { label: "Kam", profit: 145_000, omset: 820_000, transaksi: 20 },
      { label: "Jum", profit: 200_000, omset: 1_120_000, transaksi: 26 },
      { label: "Sab", profit: 225_000, omset: 1_260_000, transaksi: 29 },
      { label: "Min", profit: 180_000, omset: 1_020_000, transaksi: 24 },
    ],
    Sari: [
      { label: "Sen", profit: 38_000, omset: 215_000, transaksi: 5 },
      { label: "Sel", profit: 35_000, omset: 200_000, transaksi: 5 },
      { label: "Rab", profit: 46_000, omset: 265_000, transaksi: 6 },
      { label: "Kam", profit: 41_000, omset: 230_000, transaksi: 5 },
      { label: "Jum", profit: 56_000, omset: 315_000, transaksi: 7 },
      { label: "Sab", profit: 62_000, omset: 350_000, transaksi: 8 },
      { label: "Min", profit: 51_000, omset: 285_000, transaksi: 6 },
    ],
    Budi: [
      { label: "Sen", profit: 25_000, omset: 145_000, transaksi: 4 },
      { label: "Sel", profit: 24_000, omset: 135_000, transaksi: 3 },
      { label: "Rab", profit: 31_000, omset: 175_000, transaksi: 4 },
      { label: "Kam", profit: 29_000, omset: 160_000, transaksi: 4 },
      { label: "Jum", profit: 39_000, omset: 205_000, transaksi: 5 },
      { label: "Sab", profit: 41_500, omset: 235_000, transaksi: 5 },
      { label: "Min", profit: 34_000, omset: 185_000, transaksi: 5 },
    ],
  },
  "Bulan Ini": {
    "Bu Sari": [
      { label: "18 Mei", profit: 230_000, omset: 980_000, transaksi: 22 },
      { label: "19 Mei", profit: 280_000, omset: 1_140_000, transaksi: 26 },
      { label: "20 Mei", profit: 260_000, omset: 1_030_000, transaksi: 23 },
      { label: "21 Mei", profit: 310_000, omset: 1_240_000, transaksi: 27 },
      { label: "22 Mei", profit: 265_000, omset: 1_080_000, transaksi: 25 },
      { label: "23 Mei", profit: 320_000, omset: 1_290_000, transaksi: 30 },
      { label: "24 Mei", profit: 350_000, omset: 1_400_000, transaksi: 33 },
    ],
    Sari: [
      { label: "18 Mei", profit: 65_000, omset: 280_000, transaksi: 6 },
      { label: "19 Mei", profit: 78_000, omset: 320_000, transaksi: 7 },
      { label: "20 Mei", profit: 72_000, omset: 290_000, transaksi: 6 },
      { label: "21 Mei", profit: 85_000, omset: 350_000, transaksi: 8 },
      { label: "22 Mei", profit: 74_000, omset: 310_000, transaksi: 7 },
      { label: "23 Mei", profit: 88_000, omset: 360_000, transaksi: 8 },
      { label: "24 Mei", profit: 97_000, omset: 390_000, transaksi: 9 },
    ],
    Budi: [
      { label: "18 Mei", profit: 45_000, omset: 190_000, transaksi: 4 },
      { label: "19 Mei", profit: 52_000, omset: 220_000, transaksi: 5 },
      { label: "20 Mei", profit: 48_000, omset: 200_000, transaksi: 5 },
      { label: "21 Mei", profit: 55_000, omset: 230_000, transaksi: 5 },
      { label: "22 Mei", profit: 51_000, omset: 200_000, transaksi: 4 },
      { label: "23 Mei", profit: 57_000, omset: 240_000, transaksi: 6 },
      { label: "24 Mei", profit: 63_000, omset: 260_000, transaksi: 6 },
    ],
  },
};

/** Ambil data buku kas & laporan keuangan dari backend MySQL API. */
export async function getLaporanData(period: PeriodOption): Promise<LaporanData> {
  try {
    const res = await fetch(`/api/reports?period=${encodeURIComponent(period)}`, { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil laporan dari server.");
    const json = await res.json();
    if (json.success && json.data) return json.data;
  } catch (error) {
    console.warn("[ReportService] Fallback lokal laporan:", error);
  }

  const summary = periodSummaries[period] ?? periodSummaries["Bulan Ini"];
  const dailyProfit = periodProfitCharts[period] ?? periodProfitCharts["Bulan Ini"];

  return {
    summary,
    periods: periodOptionsMock,
    dailyProfit,
    callouts: chartCalloutsMock,
    transactions: transactionsMock,
    closeValidation: closeValidationMock,
    paymentBreakdown: paymentMethodBreakdownMock,
    categoryBreakdown: categoryProfitabilityMock,
    reconciliationHistory: reconciliationHistoryMock,
  };
}

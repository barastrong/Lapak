export type PeriodOption = "Hari Ini" | "Minggu Ini" | "Bulan Ini";

export type ReportSummary = {
  grossSales: number;
  transactionCount: number;
  averageBasket: number;
  totalModal: number;
  modalRatio: number;
  netProfit: number;
  marginPercent: number;
  dailyTarget: number;
  targetAchieved: number;
};

export type DailyProfitPoint = {
  label: string;
  profit: number;
};

export type TransactionMethod = "QRIS" | "Tunai" | "Bon" | "Transfer BCA";

export type TransactionRow = {
  id: string;
  time: string;
  no: string;
  cashier: string;
  cashierActive: boolean;
  itemsLabel: string;
  itemsDetail: string;
  method: TransactionMethod;
  amount: number;
  /** Baris bon berwarna merah redup (bg-error-container/20). */
  bon?: boolean;
};

export type ChartCallout = {
  label: string;
  value: string;
  valueClassName?: string;
};

export type CloseValidation = {
  shift: string;
  name: string;
  datetime: string;
  diff: number;
};
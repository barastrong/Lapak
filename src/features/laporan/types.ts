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
  cashInDrawer?: number;
  digitalBalance?: number;
  pendingKasbon?: number;
  operationalCost?: number;
};

export type DailyProfitPoint = {
  label: string;
  profit: number;
  omset?: number;
  transaksi?: number;
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
  customer?: string;
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

export type PaymentMethodBreakdown = {
  method: TransactionMethod;
  label: string;
  amount: number;
  count: number;
  percentage: number;
  badgeClass: string;
};

export type CategoryProfitability = {
  category: string;
  omset: number;
  profit: number;
  margin: number;
  volumeLabel: string;
};

export type ReconciliationRecord = {
  id: string;
  shift: string;
  cashier: string;
  date: string;
  openingCash: number;
  cashSales: number;
  expectedDrawer: number;
  actualDrawer: number;
  diff: number;
  status: "SESUAI" | "SELISIH";
  note?: string;
};

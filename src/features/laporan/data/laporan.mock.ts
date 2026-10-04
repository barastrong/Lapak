import type { ChartCallout, CloseValidation, DailyProfitPoint, PeriodOption, ReportSummary, TransactionRow } from "@/features/laporan/types";

export const reportSummaryMock: ReportSummary = {
  grossSales: 18_450_000,
  transactionCount: 348,
  averageBasket: 53_017,
  totalModal: 13_620_000,
  modalRatio: 73.82,
  netProfit: 4_830_000,
  marginPercent: 26.18,
  dailyTarget: 200_000,
  targetAchieved: 104,
};

export const periodOptionsMock: PeriodOption[] = ["Hari Ini", "Minggu Ini", "Bulan Ini"];

export const dailyProfitMock: DailyProfitPoint[] = [
  { label: "18 Mei", profit: 340_000 },
  { label: "19 Mei", profit: 410_000 },
  { label: "20 Mei", profit: 380_000 },
  { label: "21 Mei", profit: 450_000 },
  { label: "22 Mei", profit: 390_000 },
  { label: "23 Mei", profit: 465_000 },
  { label: "24 Mei", profit: 510_000 },
];

export const chartCalloutsMock: ChartCallout[] = [
  { label: "Rata-rata Laba/Hari", value: "Rp 420.714" },
  { label: "Hari Teramai", value: "24 Mei (52 Transaksi)" },
  { label: "Produk Margin Tertinggi", value: "Kopi Seduh (52%)" },
  { label: "Status Kasbon Aktif", value: "2 Transaksi (Rp 50.500)", valueClassName: "text-secondary" },
];

export const transactionsMock: TransactionRow[] = [
  { id: "TR1", time: "Hari ini, 10:14", no: "#NK-2025-0842", cashier: "Bu Sari (Pemilik)", cashierActive: true, itemsLabel: "4 item", itemsDetail: "(Beras Rojolele 5kg, Minyak 1L, Indomie x5)", method: "QRIS", amount: 86_500 },
  { id: "TR2", time: "Hari ini, 09:48", no: "#NK-2025-0841", cashier: "Bu Sari (Pemilik)", cashierActive: true, itemsLabel: "2 item", itemsDetail: "(Telur Ayam 1kg, Gulaku 1kg)", method: "Tunai", amount: 45_000 },
  { id: "TR3", time: "Hari ini, 09:15", no: "#NK-2025-0840", cashier: "Bu Sari (Pemilik)", cashierActive: true, itemsLabel: "1 item", itemsDetail: "(Rinso Anti Noda 770g)", method: "Tunai", amount: 35_000 },
  { id: "TR4", time: "Hari ini, 08:40", no: "#NK-2025-0839", cashier: "Sari (Kasir 01)", cashierActive: false, itemsLabel: "6 item", itemsDetail: "(Kopi Kapal Api x5, Teh Pucuk x2, Roti...)", method: "Bon", amount: 28_500, bon: true },
  { id: "TR5", time: "Kemarin, 20:30", no: "#NK-2025-0838", cashier: "Budi (Shift Siang)", cashierActive: false, itemsLabel: "3 item", itemsDetail: "(Gas Elpiji 3kg, Galon Le Minerale x2)", method: "Transfer BCA", amount: 124_000 },
  { id: "TR6", time: "Kemarin, 19:15", no: "#NK-2025-0837", cashier: "Budi (Shift Siang)", cashierActive: false, itemsLabel: "2 item", itemsDetail: "(Aqua 600ml x2)", method: "Tunai", amount: 7_000 },
  { id: "TR7", time: "Kemarin, 17:50", no: "#NK-2025-0836", cashier: "Budi (Shift Siang)", cashierActive: false, itemsLabel: "5 item", itemsDetail: "(Sunlight 700ml, Royco x10, Kecap Bango...)", method: "QRIS", amount: 54_000 },
  { id: "TR8", time: "Kemarin, 16:10", no: "#NK-2025-0835", cashier: "Sari (Kasir 01)", cashierActive: false, itemsLabel: "1 item", itemsDetail: "(Rokok Sampoerna Mild 16)", method: "Tunai", amount: 34_500 },
  { id: "TR9", time: "Kemarin, 14:22", no: "#NK-2025-0834", cashier: "Sari (Kasir 01)", cashierActive: false, itemsLabel: "3 item", itemsDetail: "(Sabun Lifebuoy x3, Pepsodent 190g)", method: "Tunai", amount: 27_500 },
  { id: "TR10", time: "Kemarin, 12:05", no: "#NK-2025-0833", cashier: "Bu Sari (Pemilik)", cashierActive: true, itemsLabel: "1 item", itemsDetail: "(Token Listrik PLN Rp 100.000)", method: "QRIS", amount: 102_500 },
];

export const closeValidationMock: CloseValidation = {
  shift: "Shift Pagi",
  name: "Bu Sari",
  datetime: "23 Mei 2025 pukul 21:05",
  diff: 0,
};
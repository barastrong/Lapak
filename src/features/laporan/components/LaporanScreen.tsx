"use client";

import { useMemo, useState } from "react";
import { LaporanHeader } from "@/features/laporan/components/LaporanHeader";
import { SummaryPanels } from "@/features/laporan/components/SummaryPanels";
import { FinancialBreakdownPanels } from "@/features/laporan/components/FinancialBreakdownPanels";
import { ProfitChart } from "@/features/laporan/components/ProfitChart";
import { TransactionTable } from "@/features/laporan/components/TransactionTable";
import { CloseValidationBanner } from "@/features/laporan/components/CloseValidationBanner";
import { useReports } from "@/features/laporan/hooks/useReports";
import { periodCashierProfitCharts } from "@/features/laporan/services/reportService";

export function LaporanScreen() {
  const { data, activePeriod, setActivePeriod, isLoading } = useReports();
  const [selectedCashier, setSelectedCashier] = useState("ALL");

  const cashierFilteredData = useMemo(() => {
    if (!data) return null;
    if (selectedCashier === "ALL") return data;

    // Filter data sesuai kasir terpilih
    const filteredTrx = data.transactions.filter((r) =>
      r.cashier.toLowerCase().includes(selectedCashier.toLowerCase())
    );
    const cashierTrxTotal = filteredTrx.reduce((acc, r) => acc + r.amount, 0);
    const ratio = data.summary.grossSales > 0 ? cashierTrxTotal / data.summary.grossSales : 0.35;
    const factor = Math.max(0.15, ratio);

    const adjustedSummary = {
      ...data.summary,
      grossSales: cashierTrxTotal > 0 ? cashierTrxTotal : Math.round(data.summary.grossSales * factor),
      transactionCount: filteredTrx.length > 0 ? filteredTrx.length : Math.round(data.summary.transactionCount * factor),
      totalModal: Math.round(data.summary.totalModal * factor),
      netProfit: Math.round(data.summary.netProfit * factor),
      dailyTarget: Math.round(data.summary.dailyTarget * factor),
      cashInDrawer: data.summary.cashInDrawer ? Math.round(data.summary.cashInDrawer * factor) : undefined,
      digitalBalance: data.summary.digitalBalance ? Math.round(data.summary.digitalBalance * factor) : undefined,
      pendingKasbon: data.summary.pendingKasbon ? Math.round(data.summary.pendingKasbon * factor) : undefined,
    };

    const specificChart = periodCashierProfitCharts[activePeriod]?.[selectedCashier];
    const adjustedDailyProfit = specificChart ?? data.dailyProfit.map((dp) => ({
      ...dp,
      profit: Math.round(dp.profit * factor),
      omset: dp.omset ? Math.round(dp.omset * factor) : undefined,
    }));

    return {
      ...data,
      summary: adjustedSummary,
      dailyProfit: adjustedDailyProfit,
      transactions: filteredTrx,
    };
  }, [data, selectedCashier, activePeriod]);

  if (isLoading || !data || !cashierFilteredData) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant gap-2 font-label-code text-xs">
        <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span>Memuat buku kas & laporan keuangan...</span>
      </div>
    );
  }

  const todayLabel =
    activePeriod === "Hari Ini"
      ? "Hari Ini (24 Mei)"
      : activePeriod === "Minggu Ini"
      ? "Puncak Minggu (Sabtu)"
      : "24 Mei (Bulan Ini)";

  const rawTarget = cashierFilteredData.summary.dailyTarget;
  const chartTarget =
    activePeriod === "Bulan Ini"
      ? Math.round(rawTarget / 30)
      : activePeriod === "Minggu Ini"
      ? Math.round(rawTarget / 7)
      : Math.round(rawTarget / Math.max(1, cashierFilteredData.dailyProfit.length));

  const targetLabel = activePeriod === "Hari Ini" ? "Target Sesi" : "Target Harian";

  return (
    <div className="flex flex-col gap-space-lg max-w-7xl mx-auto w-full pb-12">
      <LaporanHeader
        active={activePeriod}
        periods={data.periods}
        onPeriod={setActivePeriod}
        selectedCashier={selectedCashier}
        onCashierChange={setSelectedCashier}
        summary={cashierFilteredData.summary}
      />

      <SummaryPanels summary={cashierFilteredData.summary} />

      <FinancialBreakdownPanels
        payments={cashierFilteredData.paymentBreakdown}
        categories={cashierFilteredData.categoryBreakdown}
      />

      <ProfitChart
        data={cashierFilteredData.dailyProfit}
        todayLabel={todayLabel}
        target={chartTarget}
        targetLabel={targetLabel}
        callouts={cashierFilteredData.callouts}
      />

      <TransactionTable
        rows={cashierFilteredData.transactions}
        cashierFilter={selectedCashier}
      />

      <CloseValidationBanner
        validation={cashierFilteredData.closeValidation}
        history={cashierFilteredData.reconciliationHistory}
      />
    </div>
  );
}

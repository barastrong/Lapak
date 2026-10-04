"use client";

import { LaporanHeader } from "@/features/laporan/components/LaporanHeader";
import { SummaryPanels } from "@/features/laporan/components/SummaryPanels";
import { ProfitChart } from "@/features/laporan/components/ProfitChart";
import { TransactionTable } from "@/features/laporan/components/TransactionTable";
import { CloseValidationBanner } from "@/features/laporan/components/CloseValidationBanner";
import { useReports } from "@/features/laporan/hooks/useReports";

/** Perakit layar laporan keuangan & penjualan. */
export function LaporanScreen() {
  const { data, activePeriod, setActivePeriod, isLoading } = useReports();

  if (isLoading || !data) {
    return (
      <div className="flex items-center justify-center py-24 text-on-surface-variant">
        Memuat laporan...
      </div>
    );
  }

  return (
    <div className="p-space-lg md:p-space-xl flex flex-col gap-space-lg max-w-7xl mx-auto w-full">
      <LaporanHeader active={activePeriod} periods={data.periods} onPeriod={setActivePeriod} />
      <SummaryPanels summary={data.summary} />
      <ProfitChart
        data={data.dailyProfit}
        todayLabel="Hari ini (24 Mei)"
        target={data.summary.dailyTarget}
        callouts={data.callouts}
      />
      <TransactionTable rows={data.transactions} />
      <CloseValidationBanner validation={data.closeValidation} />
    </div>
  );
}
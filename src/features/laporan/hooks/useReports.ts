"use client";

import { useCallback, useEffect, useState } from "react";
import { getLaporanData } from "@/features/laporan/services/reportService";
import type { LaporanData } from "@/features/laporan/services/reportService";
import type { PeriodOption } from "@/features/laporan/types";

/** Data laporan keuangan & penjualan dengan filter periode. */
export function useReports() {
  const [data, setData] = useState<LaporanData | null>(null);
  const [activePeriod, setActivePeriod] = useState<PeriodOption>("Bulan Ini");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(() => {
    return getLaporanData(activePeriod)
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Gagal memuat laporan."))
      .finally(() => setLoading(false));
  }, [activePeriod]);

  useEffect(() => {
    void run();
  }, [run]);

  const refetch = () => {
    setLoading(true);
    void run();
  };

  return { data, activePeriod, setActivePeriod, isLoading, error, refetch };
}
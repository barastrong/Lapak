"use client";

import { useCallback, useEffect, useState } from "react";
import { getDashboardData } from "@/features/dashboard/services/dashboardService";
import type { DashboardData } from "@/features/dashboard/services/dashboardService";

/** Ambil data ringkasan dashboard (statis, siap di-swap ke API backend). */
export function useDashboard(): DashboardData & { isLoading: boolean; error: string | null; refetch: () => void } {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(() => {
    return getDashboardData()
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Gagal memuat dashboard."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void run();
  }, [run]);

  const refetch = () => {
    setLoading(true);
    void run();
  };

  return {
    summary: data?.summary ?? {
      omsetHariIni: 0,
      transaksiHariIni: 0,
      labaBersih: 0,
      margin: 0,
      stokMenipis: 0,
      kasbonBelumLunas: 0,
      produkTerjual: 0,
    },
    salesWeek: data?.salesWeek ?? [],
    recentTransactions: data?.recentTransactions ?? [],
    topProducts: data?.topProducts ?? [],
    isLoading,
    error,
    refetch,
  };
}
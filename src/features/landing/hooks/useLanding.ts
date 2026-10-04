"use client";

import { useCallback, useEffect, useState } from "react";
import { getLandingSettings } from "@/features/landing/services/landingService";
import type { LandingSettings } from "@/features/landing/services/landingService";

/** Ambil data landing (statis untuk sekarang, siap di-swap ke API). */
export function useLanding() {
  const [data, setData] = useState<LandingSettings | null>(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(() => {
    return getLandingSettings()
      .then((d) => {
        setData(d);
        setError(null);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Gagal memuat data."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void run();
  }, [run]);

  const refetch = () => {
    setLoading(true);
    void run();
  };

  return { data, isLoading, error, refetch };
}
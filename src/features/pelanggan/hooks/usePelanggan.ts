"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getPelangganList, getPelangganSummary } from "@/features/pelanggan/services/pelangganService";
import type { Pelanggan, PelangganSummary, PelangganTier } from "@/features/pelanggan/types";

export type PelangganState = {
  list: Pelanggan[];
  summary: PelangganSummary | null;
  tier: PelangganTier | "Semua";
  query: string;
  isLoading: boolean;
  error: string | null;
  setTier: (t: PelangganTier | "Semua") => void;
  setQuery: (q: string) => void;
  refetch: () => void;
};

/** Data pelanggan + filter tier & pencarian. */
export function usePelanggan(): PelangganState {
  const [list, setList] = useState<Pelanggan[]>([]);
  const [summary, setSummary] = useState<PelangganSummary | null>(null);
  const [tier, setTier] = useState<PelangganTier | "Semua">("Semua");
  const [query, setQuery] = useState("");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    return Promise.all([getPelangganList(), getPelangganSummary()])
      .then(([l, s]) => {
        setList(l);
        setSummary(s);
        setError(null);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Gagal memuat pelanggan."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.toLowerCase();
    return list.filter(
      (p) =>
        (tier === "Semua" || p.tier === tier) &&
        (p.name + p.phone + p.address).toLowerCase().includes(q)
    );
  }, [list, tier, query]);

  const refetch = () => {
    setLoading(true);
    void load();
  };

  return { list: filtered, summary, tier, query, isLoading, error, setTier, setQuery, refetch };
}
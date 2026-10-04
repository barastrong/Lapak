"use client";

import { useCallback, useEffect, useState } from "react";
import { getStorePresets, getStoreProfile } from "@/features/pengaturan/services/pengaturanService";
import type { StoreProfile } from "@/features/pengaturan/types";

export type PengaturanState = {
  profile: StoreProfile | null;
  presets: StoreProfile[];
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
};

/** Data profil toko & daftar preset (untuk kesempatan ganti toko). */
export function usePengaturan(): PengaturanState {
  const [profile, setProfile] = useState<StoreProfile | null>(null);
  const [presets, setPresets] = useState<StoreProfile[]>([]);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(() => {
    return Promise.all([getStoreProfile(), getStorePresets()])
      .then(([p, ps]) => {
        setProfile(p);
        setPresets(ps);
        setError(null);
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : "Gagal memuat pengaturan."))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    void run();
  }, [run]);

  const refetch = () => {
    setLoading(true);
    void run();
  };

  return { profile, presets, isLoading, error, refetch };
}
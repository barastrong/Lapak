"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { usePelanggan } from "@/features/pelanggan/hooks/usePelanggan";
import { pelangganTiersMock } from "@/features/pelanggan/data/pelanggan.mock";
import type { PelangganTier } from "@/features/pelanggan/types";

const TIER_STYLE: Record<PelangganTier, string> = {
  Konsisten: "bg-tertiary-fixed text-tertiary",
  Biasa: "bg-surface-container-high text-on-surface-variant",
  "Bon Aktif": "bg-error-container text-on-error-container",
};

/** Layar pelanggan: ringkasan, cari, filter tier, tabel buku pelanggan. */
export function PelangganScreen() {
  const { list, summary, tier, query, isLoading, setTier, setQuery } = usePelanggan();
  const [modalOpen, setModalOpen] = useState(false);

  if (isLoading || !summary) {
    return (
      <div className="flex items-center justify-center py-24 text-on-surface-variant">
        Memuat pelanggan...
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-space-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <Icon name="group" className="text-primary text-xl" />
            <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
              Daftar Pelanggan
            </h1>
          </div>
          <p className="text-body-sm text-on-surface-variant">
            Tetangga & pelanggan warung yang tercatat, termasuk status bon utang
          </p>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <Button variant="surfaceContainer">
            <Icon name="download" className="text-lg" />
            Ekspor
          </Button>
          <Button onClick={() => setModalOpen(true)}>
            <Icon name="person_add" className="text-lg" />
            Tambah Pelanggan
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-space-md">
        <MiniStat icon="group" label="Total Pelanggan" value={`${summary.totalPelanggan} orang`} />
        <MiniStat icon="pending_actions" label="Utang Beredar" value={formatRupiah(summary.utangBeredar)} valueClassName="text-error" />
        <MiniStat icon="local_activity" label="Aktif Minggu Ini" value={`${summary.pelangganAktifMingguIni} orang`} />
      </div>

      <div className="bg-surface-container-lowest rounded-xl shadow-sm overflow-hidden flex flex-col">
        <div className="p-space-md flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm border-b border-surface-container-low">
          <div className="relative flex items-center">
            <Icon name="search" className="absolute left-3 text-on-surface-variant text-base" />
            <input
              className="bg-surface-container-low pl-9 pr-4 py-2 rounded-lg text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary w-64 md:w-80 transition-all placeholder:text-on-surface-variant"
              placeholder="Cari nama, telepon, atau alamat..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-1 bg-surface-container-low p-1 rounded-xl self-start">
            {pelangganTiersMock.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTier(t as PelangganTier | "Semua")}
                className={cn(
                  "px-3 py-1.5 rounded-lg font-label-ui text-label-ui transition-all text-xs",
                  tier === t
                    ? "bg-surface-container-lowest text-primary shadow-sm"
                    : "text-on-surface-variant hover:text-on-surface"
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-surface-container-low text-on-surface-variant font-label-code text-label-code text-xs uppercase tracking-wider">
                <th className="py-3 px-space-md">Nama</th>
                <th className="py-3 px-space-md">Kontak</th>
                <th className="py-3 px-space-md">Tier</th>
                <th className="py-3 px-space-md text-right">Total Belanja</th>
                <th className="py-3 px-space-md text-right">Utang Aktif</th>
                <th className="py-3 px-space-md">Terakhir Belanja</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container text-body-sm text-on-surface">
              {list.map((p) => (
                <tr key={p.id} className="hover:bg-surface-bright transition-colors">
                  <td className="py-3 px-space-md">
                    <div className="flex flex-col">
                      <span className="font-label-ui text-label-ui text-on-surface">{p.name}</span>
                      <span className="text-body-sm text-on-surface-variant">{p.address}</span>
                    </div>
                  </td>
                  <td className="py-3 px-space-md font-label-code text-label-code text-on-surface-variant whitespace-nowrap">
                    {p.phone}
                  </td>
                  <td className="py-3 px-space-md">
                    <span className={cn("inline-flex items-center px-2 py-0.5 rounded-full font-label-code text-xs", TIER_STYLE[p.tier])}>
                      {p.tier}
                    </span>
                  </td>
                  <td className="py-3 px-space-md text-right font-label-numeric text-label-numeric text-on-surface whitespace-nowrap">
                    {formatRupiah(p.totalBelanja)}
                  </td>
                  <td className="py-3 px-space-md text-right font-label-numeric text-label-numeric whitespace-nowrap">
                    {p.utangAktif > 0 ? (
                      <span className="text-error font-bold">{formatRupiah(p.utangAktif)}</span>
                    ) : (
                      <span className="text-on-surface-variant">Rp 0</span>
                    )}
                  </td>
                  <td className="py-3 px-space-md text-body-sm text-on-surface-variant whitespace-nowrap">
                    {p.terakhirBelanja}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-space-md py-space-sm bg-surface-container-low flex items-center justify-between font-label-code text-label-code text-on-surface-variant">
          <span>Menampilkan {list.length} dari {summary.totalPelanggan} pelanggan</span>
          <span className="text-on-surface">{formatRupiah(summary.utangBeredar)} total utang beredar</span>
        </div>
      </div>

      {modalOpen ? (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4" onClick={() => setModalOpen(false)}>
          <div className="bg-surface-container-lowest rounded-xl shadow-xl max-w-md w-full p-space-lg flex flex-col gap-space-md relative" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <Icon name="person_add" className="text-primary text-xl" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Tambah Pelanggan</h3>
              </div>
              <button type="button" className="text-on-surface-variant hover:text-on-surface p-1" onClick={() => setModalOpen(false)} aria-label="Tutup">
                <Icon name="close" />
              </button>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Form tambah pelanggan akan dihubungkan ke backend. // TODO: hook ke API
            </p>
            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <Button variant="surfaceContainer" onClick={() => setModalOpen(false)}>
                Batal
              </Button>
              <Button onClick={() => setModalOpen(false)}>Simpan</Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function MiniStat({
  icon,
  label,
  value,
  valueClassName,
}: {
  icon: string;
  label: string;
  value: string;
  valueClassName?: string;
}) {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center gap-space-md">
      <div className="w-9 h-9 rounded-lg bg-surface-container-low flex items-center justify-center text-primary shrink-0">
        <Icon name={icon} className="text-lg" />
      </div>
      <div>
        <div className="text-body-sm text-on-surface-variant">{label}</div>
        <div className={cn("font-headline-sm text-headline-sm text-on-surface", valueClassName)}>{value}</div>
      </div>
    </div>
  );
}
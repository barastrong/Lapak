"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import { usePelanggan } from "@/features/pelanggan/hooks/usePelanggan";
import { pelangganTiersMock } from "@/features/pelanggan/data/pelanggan.mock";
import { exportToCsv } from "@/lib/export";
import type { Pelanggan, PelangganTier } from "@/features/pelanggan/types";

const TIER_STYLE: Record<PelangganTier, string> = {
  Konsisten: "bg-tertiary-fixed text-tertiary",
  Biasa: "bg-surface-container-high text-on-surface-variant",
  "Bon Aktif": "bg-error-container text-on-error-container",
};

/** Layar pelanggan: ringkasan, cari, filter tier, tabel buku pelanggan. */
export function PelangganScreen() {
  const { list, summary, tier, query, isLoading, setTier, setQuery, updatePelanggan, deletePelanggan } = usePelanggan();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPelanggan, setEditingPelanggan] = useState<Pelanggan | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (isLoading || !summary) {
    return (
      <div className="flex items-center justify-center py-24 text-on-surface-variant">
        Memuat pelanggan...
      </div>
    );
  }

  const handleExport = () => {
    exportToCsv(
      "daftar-pelanggan-warung",
      ["Nama", "Nomor HP", "Alamat", "Kategori", "Total Belanja (Rp)", "Utang Aktif (Rp)", "Terakhir Belanja"],
      list.map((p) => [
        p.name,
        p.phone,
        p.address,
        p.tier,
        p.totalBelanja,
        p.utangAktif,
        p.terakhirBelanja,
      ])
    );
  };

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
          <Button variant="surfaceContainer" onClick={handleExport}>
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
                <th className="py-3 px-space-md text-right">Aksi</th>
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
                  <td className="py-3 px-space-md text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1">
                      <button
                        type="button"
                        onClick={() => setEditingPelanggan(p)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-primary hover:bg-surface-container transition-colors cursor-pointer"
                        title="Edit Data Pelanggan"
                      >
                        <Icon name="edit" className="text-base" />
                      </button>
                      <button
                        type="button"
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-1.5 rounded-lg text-on-surface-variant hover:text-error hover:bg-error-container/30 transition-colors cursor-pointer"
                        title="Hapus Pelanggan"
                      >
                        <Icon name="delete" className="text-base" />
                      </button>
                    </div>
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
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer" onClick={() => setModalOpen(false)}>
          <div className="bg-surface-container-lowest rounded-xl shadow-xl max-w-md w-full p-space-lg flex flex-col gap-space-md relative cursor-default" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <Icon name="person_add" className="text-primary text-xl" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Tambah Pelanggan</h3>
              </div>
              <button type="button" className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer" onClick={() => setModalOpen(false)} aria-label="Tutup">
                <Icon name="close" />
              </button>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Form tambah pelanggan baru akan otomatis disimpan ke sistem buku utang & profil pelanggan.
            </p>
            <div className="flex flex-col gap-2.5">
              <input
                id="new-pelanggan-name"
                placeholder="Nama Pelanggan / Tetangga"
                className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                id="new-pelanggan-phone"
                placeholder="Nomor Telepon / WhatsApp"
                className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
              />
              <input
                id="new-pelanggan-address"
                placeholder="Alamat / Blok Rumah"
                className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>
            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <Button variant="surfaceContainer" onClick={() => setModalOpen(false)}>
                Batal
              </Button>
              <Button
                onClick={() => {
                  const nameEl = document.getElementById("new-pelanggan-name") as HTMLInputElement | null;
                  const phoneEl = document.getElementById("new-pelanggan-phone") as HTMLInputElement | null;
                  const addrEl = document.getElementById("new-pelanggan-address") as HTMLInputElement | null;
                  if (nameEl?.value) {
                    updatePelanggan({
                      id: `PG-${Date.now()}`,
                      name: nameEl.value,
                      phone: phoneEl?.value || "0812-0000-0000",
                      address: addrEl?.value || "Lingkungan Warung",
                      tier: "Biasa",
                      totalTransaksi: 0,
                      totalBelanja: 0,
                      utangAktif: 0,
                      terakhirBelanja: "Baru terdaftar",
                    });
                  }
                  setModalOpen(false);
                }}
              >
                Simpan Pelanggan
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal Edit Pelanggan */}
      {editingPelanggan ? (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer" onClick={() => setEditingPelanggan(null)}>
          <div className="bg-surface-container-lowest rounded-xl shadow-xl max-w-md w-full p-space-lg flex flex-col gap-space-md relative cursor-default" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-space-xs">
                <Icon name="edit" className="text-primary text-xl" />
                <h3 className="font-headline-sm text-headline-sm text-on-surface">Ubah Data Pelanggan</h3>
              </div>
              <button type="button" className="text-on-surface-variant hover:text-on-surface p-1 cursor-pointer" onClick={() => setEditingPelanggan(null)} aria-label="Tutup">
                <Icon name="close" />
              </button>
            </div>
            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1 text-xs text-on-surface-variant font-label-ui">
                <span>Nama Pelanggan</span>
                <input
                  type="text"
                  value={editingPelanggan.name}
                  onChange={(e) => setEditingPelanggan({ ...editingPelanggan, name: e.target.value })}
                  className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-on-surface-variant font-label-ui">
                <span>Nomor Kontak</span>
                <input
                  type="text"
                  value={editingPelanggan.phone}
                  onChange={(e) => setEditingPelanggan({ ...editingPelanggan, phone: e.target.value })}
                  className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-on-surface-variant font-label-ui">
                <span>Alamat / Lokasi</span>
                <input
                  type="text"
                  value={editingPelanggan.address}
                  onChange={(e) => setEditingPelanggan({ ...editingPelanggan, address: e.target.value })}
                  className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </label>
              <label className="flex flex-col gap-1 text-xs text-on-surface-variant font-label-ui">
                <span>Status Kategori (Tier)</span>
                <select
                  value={editingPelanggan.tier}
                  onChange={(e) => setEditingPelanggan({ ...editingPelanggan, tier: e.target.value as PelangganTier })}
                  className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer"
                >
                  <option value="Biasa">Biasa</option>
                  <option value="Konsisten">Konsisten</option>
                  <option value="Bon Aktif">Bon Aktif</option>
                </select>
              </label>
            </div>
            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <Button variant="surfaceContainer" onClick={() => setEditingPelanggan(null)}>
                Batal
              </Button>
              <Button
                onClick={() => {
                  updatePelanggan(editingPelanggan);
                  setEditingPelanggan(null);
                }}
              >
                Simpan Perubahan
              </Button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Modal Konfirmasi Hapus */}
      {deleteConfirmId ? (
        <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer" onClick={() => setDeleteConfirmId(null)}>
          <div className="bg-surface-container-lowest rounded-xl shadow-xl max-w-sm w-full p-space-lg flex flex-col gap-space-md relative cursor-default" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-space-xs text-error">
              <Icon name="warning" className="text-xl" />
              <h3 className="font-headline-sm text-headline-sm">Hapus Pelanggan?</h3>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Data pelanggan ini akan dihapus dari buku pelanggan. Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <Button variant="surfaceContainer" onClick={() => setDeleteConfirmId(null)}>
                Batal
              </Button>
              <button
                type="button"
                onClick={() => {
                  deletePelanggan(deleteConfirmId);
                  setDeleteConfirmId(null);
                }}
                className="px-4 py-2 rounded-xl bg-error text-on-error font-label-ui text-body-sm font-bold hover:bg-error/90 transition-colors cursor-pointer"
              >
                Hapus
              </button>
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
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { usePengaturan } from "@/features/pengaturan/hooks/usePengaturan";

/** Layar Pengaturan: profil toko, daftar toko untuk ganti, dan preferensi cetak. */
export function PengaturanScreen() {
  const { profile, presets, isLoading } = usePengaturan();
  const [activeStore, setActiveStore] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  if (isLoading || !profile) {
    return (
      <div className="flex items-center justify-center py-24 text-on-surface-variant">
        Memuat pengaturan...
      </div>
    );
  }

  const current = presets.find((p) => p.name === activeStore) ?? profile;

  return (
    <div className="flex flex-col w-full gap-space-md">
      <div className="flex flex-col gap-space-xs">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Pengaturan
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Profil toko, daftar cabang, dan preferensi cetak nota
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <Icon name="storefront" className="text-primary text-xl" />
              <h2 className="font-headline-md text-headline-md text-on-surface">Profil Toko</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
              <Field label="Nama Toko" value={current.name} />
              <Field label="Jenis Usaha" value={current.kind} />
              <Field label="Cabang" value={current.branch} />
              <Field label="Telepon" value={current.phone} />
              <Field label="Jam Operasional" value={current.openingHours} />
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-label-ui text-xs text-on-surface">Alamat Lengkap</span>
              <input
                className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
                defaultValue={current.address}
              />
            </div>
            <div className="flex items-center justify-end gap-space-sm pt-space-xs">
              <Button
                variant="surfaceContainer"
                onClick={() => setSaved(false)}
              >
                Batal
              </Button>
              <Button
                onClick={() => {
                  setSaved(true);
                  window.setTimeout(() => setSaved(false), 2500);
                }}
              >
                <Icon name="save" className="text-base" />
                Simpan Perubahan
              </Button>
            </div>
            {saved ? (
              <p className="text-label-code text-label-code text-tertiary">
                ✓ Perubahan tersimpan (lokal).
              </p>
            ) : null}
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <Icon name="print" className="text-primary text-xl" />
              <h2 className="font-headline-md text-headline-md text-on-surface">Preferensi Cetak</h2>
            </div>
            <label className="flex items-center gap-space-sm p-space-sm rounded-lg bg-surface-container-low cursor-pointer">
              <input type="checkbox" defaultChecked className="w-4 h-4 rounded accent-primary" />
              <div className="flex flex-col">
                <span className="font-label-ui text-label-ui text-on-surface">
                  Printer thermal 58mm
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  Standar untuk nota kasir warung
                </span>
              </div>
            </label>
          </div>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <Icon name="swap_horiz" className="text-primary text-xl" />
              <h2 className="font-headline-md text-headline-md text-on-surface">Pindah Toko / Cabang</h2>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              Pilih toko lain untuk berpindah konteks kasir di aplikasi ini (data contoh).
            </p>
            <div className="flex flex-col gap-2">
              {[profile, ...presets]
                .filter((v, i, a) => a.findIndex((x) => x.name === v.name) === i)
                .map((s) => (
                  <button
                    key={s.name}
                    type="button"
                    onClick={() => setActiveStore(s.name)}
                    className={`flex flex-col items-start gap-0.5 rounded-xl p-space-sm text-left transition-all ${
                      (activeStore ?? profile.name) === s.name
                        ? "bg-primary-container text-on-primary"
                        : "bg-surface-container-low hover:bg-surface-container-lowest"
                    }`}
                  >
                    <span className="font-label-ui text-label-ui font-semibold">{s.name}</span>
                    <span className="text-body-sm text-on-surface-variant truncate w-full">
                      {s.kind} • {s.branch}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-ui text-xs text-on-surface">{label}</span>
      <input
        className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
        defaultValue={value}
      />
    </label>
  );
}
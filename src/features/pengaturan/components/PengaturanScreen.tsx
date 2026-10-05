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
          <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container p-space-md sm:p-space-lg flex flex-col gap-space-md">
            <div className="flex items-center gap-space-sm pb-1 border-b border-surface-container">
              <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Icon name="swap_horiz" className="text-2xl" />
              </div>
              <div>
                <h2 className="font-headline-md text-headline-md text-on-surface font-bold">Pindah Toko / Cabang</h2>
                <p className="text-body-xs sm:text-body-sm text-on-surface-variant">
                  Ganti konteks kasir & pembukuan ke unit toko lain.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              {[profile, ...presets]
                .filter((v, i, a) => a.findIndex((x) => x.name === v.name) === i)
                .map((s) => {
                  const isActive = (activeStore ?? profile.name) === s.name;
                  const iconName = s.kind.includes("Laundry") ? "local_laundry_service" : s.kind.includes("Sembako") ? "store" : "storefront";
                  return (
                    <button
                      key={s.name}
                      type="button"
                      onClick={() => setActiveStore(s.name)}
                      className={`relative flex flex-col gap-2 rounded-2xl p-4 text-left transition-all cursor-pointer border-2 ${
                        isActive
                          ? "border-primary bg-primary/5 shadow-xs"
                          : "border-surface-container bg-surface-container-lowest hover:border-outline-variant hover:bg-surface-container-low/60"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                              isActive ? "bg-primary text-on-primary" : "bg-surface-container text-on-surface-variant"
                            }`}
                          >
                            <Icon name={iconName} className="text-lg" />
                          </div>
                          <div>
                            <span className="font-headline-sm text-body-md font-bold text-on-surface block">
                              {s.name}
                            </span>
                            <span className="text-xs text-on-surface-variant">
                              {s.branch}
                            </span>
                          </div>
                        </div>

                        {isActive ? (
                          <span className="inline-flex items-center gap-1 bg-primary text-on-primary text-[11px] font-bold px-2.5 py-0.5 rounded-full shrink-0 shadow-xs">
                            <Icon name="check" className="text-xs" />
                            <span>Aktif</span>
                          </span>
                        ) : (
                          <span className="text-[11px] font-semibold text-primary hover:underline shrink-0">
                            Pilih Cabang →
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2 pt-1 border-t border-surface-container/60 text-xs text-on-surface-variant">
                        <span className="px-2 py-0.5 rounded bg-surface-container font-medium text-[11px]">
                          {s.kind}
                        </span>
                        <span className="truncate">{s.address}</span>
                      </div>
                    </button>
                  );
                })}
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
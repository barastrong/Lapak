"use client";

import { useState } from "react";
import Link from "next/link";
import { STORE_PRESETS } from "@/config/stores";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";

/** Kartu toko di sidebar — bisa diklik untuk pindah toko/cabang. */
export function StoreSwitcher() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(STORE_PRESETS[0].name);
  const current = STORE_PRESETS.find((s) => s.name === active) ?? STORE_PRESETS[0];

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between cursor-pointer hover:bg-surface-container transition-colors"
      >
        <div className="flex flex-col min-w-0 pr-space-xs">
          <span className="font-headline-sm text-headline-sm text-on-surface truncate">
            {current.name}
          </span>
          <span className="text-body-sm text-on-surface-variant truncate">{current.kind}</span>
          <span className="font-label-code text-label-code text-primary truncate">
            {current.branch}
          </span>
        </div>
        <Icon name="unfold_more" className="text-on-surface-variant text-base shrink-0" />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Pilih Toko / Cabang" icon="storefront">
        <p className="text-body-sm text-on-surface-variant">
          Pilih toko yang sedang aktif untuk kasir.
        </p>
        <div className="flex flex-col gap-2">
          {STORE_PRESETS.map((s) => (
            <button
              key={s.name}
              type="button"
              onClick={() => {
                setActive(s.name);
                setOpen(false);
              }}
              className={`flex flex-col items-start gap-0.5 rounded-xl p-space-sm text-left transition-all ${
                s.name === current.name
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
        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <Link href="/pengaturan">
            <Button variant="surfaceContainer" onClick={() => setOpen(false)}>
              <Icon name="settings" className="text-base" />
              Kelola Toko
            </Button>
          </Link>
          <Button onClick={() => setOpen(false)}>Tutup</Button>
        </div>
      </Modal>
    </>
  );
}
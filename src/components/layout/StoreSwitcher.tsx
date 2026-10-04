"use client";

import { useState } from "react";
import Link from "next/link";
import { STORE_PRESETS } from "@/config/stores";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";

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
        className="w-full bg-surface-container-low rounded-xl p-space-sm flex items-center gap-space-sm text-left cursor-pointer hover:bg-surface-container transition-colors group"
      >
        <div className="w-8 h-8 rounded-lg bg-primary-container text-on-primary flex items-center justify-center shrink-0">
          <Icon name="storefront" className="text-lg" />
        </div>
        <div className="flex flex-col min-w-0 flex-1">
          <span className="font-label-ui text-label-ui font-semibold text-on-surface truncate">
            {current.name}
          </span>
          <span className="text-body-sm text-on-surface-variant truncate">{current.branch}</span>
        </div>
        <Icon
          name="unfold_more"
          className="text-on-surface-variant text-base shrink-0 group-hover:text-primary transition-colors"
        />
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="Pilih Toko / Cabang" icon="storefront">
        <p className="text-body-sm text-on-surface-variant -mt-space-xs">
          Toko yang dipilih jadi konteks kasir &amp; laporan untuk shift ini.
        </p>

        <div className="flex flex-col gap-space-xs">
          {STORE_PRESETS.map((s) => {
            const isActive = s.name === current.name;
            return (
              <button
                key={s.name}
                type="button"
                onClick={() => {
                  setActive(s.name);
                  setOpen(false);
                }}
                aria-pressed={isActive}
                className={cn(
                  "group flex items-center gap-space-sm rounded-xl p-space-sm text-left transition-all",
                  isActive
                    ? "bg-primary-container ring-1 ring-primary"
                    : "bg-surface-container-lowest border border-on-surface/10 hover:bg-surface-container"
                )}
              >
                <span
                  className={cn(
                    "w-9 h-9 rounded-lg flex items-center justify-center shrink-0 transition-colors",
                    isActive
                      ? "bg-on-primary/15 text-on-primary"
                      : "bg-surface-container text-on-surface-variant group-hover:text-primary"
                  )}
                >
                  <Icon name="storefront" className="text-lg" />
                </span>
                <span className="flex flex-col min-w-0 flex-1">
                  <span
                    className={cn(
                      "font-label-ui text-label-ui font-semibold truncate",
                      isActive ? "text-on-primary" : "text-on-surface"
                    )}
                  >
                    {s.name}
                  </span>
                  <span
                    className={cn(
                      "text-body-sm truncate",
                      isActive ? "text-on-primary/75" : "text-on-surface-variant"
                    )}
                  >
                    {s.kind} · {s.branch}
                  </span>
                </span>
                <span
                  className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center shrink-0 transition-all",
                    isActive ? "bg-on-primary text-primary-container" : "bg-transparent"
                  )}
                >
                  {isActive ? <Icon name="check" className="text-xs" /> : null}
                </span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center justify-between gap-space-sm pt-space-xs border-t border-on-surface/10">
          <Link
            href="/pengaturan"
            onClick={() => setOpen(false)}
            className="inline-flex items-center gap-2 rounded-xl font-label-ui text-label-ui px-space-md py-2 text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            <Icon name="settings" className="text-base" />
            Kelola Toko
          </Link>
          <Button variant="surfaceContainer" onClick={() => setOpen(false)}>
            Tutup
          </Button>
        </div>
      </Modal>
    </>
  );
}
"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { Modal } from "@/components/ui/Modal";
import { formatRupiah } from "@/lib/format";
import type { CloseValidation, ReconciliationRecord } from "@/features/laporan/types";

type CloseValidationBannerProps = {
  validation: CloseValidation;
  history?: ReconciliationRecord[];
};

export function CloseValidationBanner({ validation, history = [] }: CloseValidationBannerProps) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="flex flex-col md:flex-row items-center justify-between p-space-md sm:p-space-lg rounded-2xl bg-surface-container-lowest border border-surface-container/60 shadow-xs gap-space-md">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed flex items-center justify-center shrink-0">
            <Icon name="verified_user" className="text-2xl" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
                Validasi Tutup Kasir & Brankas
              </span>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-code text-[11px] px-2 py-0.5 rounded-md font-bold">
                Status: Sesuai (Rp 0)
              </span>
            </div>
            <p className="text-body-sm text-xs text-on-surface-variant mt-0.5">
              {validation.shift} ditutup sesuai fisik uang laci oleh{" "}
              <strong className="text-on-surface">{validation.name}</strong> pada {validation.datetime}.
              Selisih fisik brankas: <strong>{validation.diff === 0 ? "Rp 0 (Cocok)" : "Ada selisih"}</strong>.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="shrink-0 px-4 py-2 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-ui text-xs font-semibold border border-surface-container transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Icon name="history" className="text-sm text-primary" />
          <span>Riwayat Rekonsiliasi Kas</span>
        </button>
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title="Riwayat Rekonsiliasi Kas & Tutup Shift"
        icon="account_balance_wallet"
        className="max-w-2xl"
      >
        <div className="flex flex-col gap-space-md p-space-md">
          <p className="text-body-sm text-xs text-on-surface-variant">
            Pemeriksaan fisik kas laci toko vs pencatatan sistem setiap pergantian shift:
          </p>

          <div className="flex flex-col gap-3">
            {history.map((h) => (
              <div
                key={h.id}
                className="p-3.5 rounded-xl bg-surface-container-low/60 border border-surface-container flex flex-col gap-2 font-label-code text-xs"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-on-surface">{h.shift}</span>
                    <span className="text-on-surface-variant">• {h.cashier}</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold text-[11px]">
                    {h.status}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 py-1.5 border-y border-surface-container text-[11px]">
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Kas Awal:</span>
                    <span className="font-bold text-on-surface">{formatRupiah(h.openingCash)}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Penjualan Tunai:</span>
                    <span className="font-bold text-on-surface">{formatRupiah(h.cashSales)}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Seharusnya:</span>
                    <span className="font-bold text-primary">{formatRupiah(h.expectedDrawer)}</span>
                  </div>
                  <div>
                    <span className="text-on-surface-variant block text-[10px]">Fisik Dihitung:</span>
                    <span className="font-bold text-tertiary">{formatRupiah(h.actualDrawer)}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[11px] text-on-surface-variant">
                  <span>Waktu: {h.date}</span>
                  <span className="text-tertiary font-semibold">{h.note}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() => setModalOpen(false)}
              className="px-4 py-2 rounded-xl bg-primary text-on-primary font-label-ui text-xs font-bold cursor-pointer hover:bg-primary-container"
            >
              Tutup
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

"use client";

import { formatRupiah } from "@/lib/format";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { cn } from "@/lib/utils";
import type { PaymentMethod } from "@/features/kasir/types";

type PaymentModalProps = {
  open: boolean;
  onClose: () => void;
  subtotal: number;
  paymentMethod: PaymentMethod;
  onPaymentChange: (m: PaymentMethod) => void;
  quickCash: { label: string; value: number | null }[];
};

/** Modal bayar: pilih metode (Tunai/QRIS/Kasbon) + tombol uang pas. */
export function PaymentModal({
  open,
  onClose,
  subtotal,
  paymentMethod,
  onPaymentChange,
  quickCash,
}: PaymentModalProps) {
  return (
    <Modal open={open} onClose={onClose} title="Selesaikan Transaksi" icon="point_of_sale">
      <div className="flex flex-col gap-space-md">
        <div className="flex items-center justify-between bg-surface-container-low p-space-sm rounded-lg">
          <span className="font-label-code text-label-code text-on-surface-variant">Total Tagihan</span>
          <span className="font-headline-lg text-headline-lg text-primary font-extrabold">
            {formatRupiah(subtotal)}
          </span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {(["TUNAI", "QRIS", "KASBON"] as PaymentMethod[]).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => onPaymentChange(m)}
              className={cn(
                "py-2 rounded-lg font-label-ui text-label-ui transition-colors",
                paymentMethod === m
                  ? "bg-primary-container text-on-primary shadow-sm"
                  : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
              )}
            >
              {m}
            </button>
          ))}
        </div>
        {paymentMethod === "TUNAI" ? (
          <div className="flex flex-col gap-2">
            <span className="font-label-ui text-xs text-on-surface-variant">Uang diterima:</span>
            <div className="grid grid-cols-3 gap-2">
              {quickCash.map((q) => (
                <button
                  key={q.label}
                  type="button"
                  onClick={() => {
                    onClose();
                  }}
                  className="py-2 px-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-numeric text-xs font-bold text-center transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-body-sm text-on-surface-variant">
            Pembayaran {paymentMethod === "KASBON" ? "dicatat sebagai utang pelanggan." : "dipindai lewat QRIS."}
          </p>
        )}
        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <Button variant="surfaceContainer" onClick={onClose}>
            Batal
          </Button>
          <Button
            onClick={() => {
              onClose();
            }}
          >
            Bayar
          </Button>
        </div>
      </div>
    </Modal>
  );
}
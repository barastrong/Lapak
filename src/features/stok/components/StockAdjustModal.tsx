"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { StockAdjustment, StockItem } from "@/features/stok/types";

type StockAdjustModalProps = {
  open: boolean;
  onClose: () => void;
  item: StockItem | null;
  reasons: string[];
  onSave: (adjustment: StockAdjustment) => void;
};

/** Modal koreksi stok fisik (kurangi stok karena rusak/dipakai sendiri). */
export function StockAdjustModal({ open, onClose, item, reasons, onSave }: StockAdjustModalProps) {
  const [qty, setQty] = useState(1);
  const [reason, setReason] = useState(reasons[0] ?? "");
  const [note, setNote] = useState("");

  if (!item) return null;

  const current = { productName: item.name, currentStock: item.stock, qty, reason, note };

  const submit = () => {
    onSave(current);
    onClose();
    setQty(1);
    setNote("");
  };

  return (
    <Modal open={open} onClose={onClose} title="Koreksi Stok Fisik" icon="inventory">
      <p className="text-body-sm text-on-surface-variant">
        Kurangi stok barang tanpa transaksi penjualan kasir (karena rusak, kadaluarsa, atau konsumsi
        dapur).
      </p>
      <div className="flex flex-col gap-space-sm">
        <label className="flex flex-col gap-1">
          <span className="font-label-ui text-xs text-on-surface">Pilih Barang</span>
          <select
            className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            value={item.name}
            disabled
          >
            <option value={item.name}>
              {item.name} (Stok: {item.stock})
            </option>
          </select>
        </label>
        <div className="grid grid-cols-2 gap-space-sm">
          <label className="flex flex-col gap-1">
            <span className="font-label-ui text-xs text-on-surface">Jumlah Pengurangan</span>
            <input
              type="number"
              min={1}
              max={Math.max(1, item.stock)}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="bg-surface-container-low px-3 py-2 rounded-lg font-label-numeric text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-label-ui text-xs text-on-surface">Alasan</span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
            >
              {reasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        </div>
        <label className="flex flex-col gap-1">
          <span className="font-label-ui text-xs text-on-surface">Catatan Singkat</span>
          <input
            type="text"
            placeholder="Contoh: Digigit tikus / Buat arisan keluarga"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-lg text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </label>
      </div>
      <div className="flex items-center justify-end gap-space-sm pt-space-xs">
        <Button variant="surfaceContainer" onClick={onClose}>
          Batal
        </Button>
        <Button onClick={submit}>Simpan Koreksi</Button>
      </div>
    </Modal>
  );
}
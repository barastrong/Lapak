"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/ui/Icon";
import type { StockAdjustment, StockItem } from "@/features/stok/types";

type StockAdjustModalProps = {
  open: boolean;
  onClose: () => void;
  item: StockItem | null;
  reasons: string[];
  onSave: (adjustment: StockAdjustment) => void;
};

/** Modal koreksi stok fisik (kurangi stok karena rusak/dipakai sendiri/pecah). */
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
    <Modal open={open} onClose={onClose} title="Koreksi Fisik & Berita Acara" icon="balance">
      <p className="text-body-sm text-xs text-on-surface-variant leading-relaxed">
        Penyesuaian stok non-transaksi kasir: barang pecah di rak, kemasan bocor, kadaluarsa, atau diambil untuk konsumsi dapur warung.
      </p>

      {/* Detail Barang Terpilih */}
      <div className="bg-surface-container-low/80 p-3 rounded-xl border border-surface-container/60 flex items-center justify-between">
        <div className="flex flex-col min-w-0">
          <span className="font-label-ui text-xs font-bold text-on-surface truncate">
            {item.name}
          </span>
          <span className="text-[11px] font-label-code text-on-surface-variant">
            {item.code} • Lokasi: {item.rack}
          </span>
        </div>
        <div className="text-right shrink-0">
          <span className="font-label-numeric text-xs font-bold text-primary bg-surface-container px-2 py-0.5 rounded-md">
            Stok: {item.stock} {item.unitLabel}
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2.5">
          <label className="flex flex-col gap-1">
            <span className="font-label-ui text-xs font-semibold text-on-surface">
              Jumlah Pengurangan ({item.unitLabel})
            </span>
            <input
              type="number"
              min={1}
              max={Math.max(1, item.stock)}
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
              className="bg-surface-container-low px-3 py-2 rounded-xl font-label-numeric text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container"
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className="font-label-ui text-xs font-semibold text-on-surface">Alasan Selisih</span>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="bg-surface-container-low px-3 py-2 rounded-xl text-body-sm text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container cursor-pointer"
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
          <span className="font-label-ui text-xs font-semibold text-on-surface">
            Catatan Tambahan (Opsional)
          </span>
          <input
            type="text"
            placeholder="Contoh: Telur retak saat bongkar peti / Buat arisan keluarga"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="bg-surface-container-low px-3 py-2 rounded-xl text-body-sm text-xs text-on-surface focus:outline-none focus:ring-1 focus:ring-primary border border-surface-container"
          />
        </label>
      </div>

      {/* Sisa stok preview */}
      <div className="bg-surface-container-low/40 p-2.5 rounded-xl border border-surface-container/50 flex items-center justify-between text-xs font-label-code">
        <span className="text-on-surface-variant">Estimasi sisa stok setelah koreksi:</span>
        <span className="font-bold text-on-surface">
          {Math.max(0, item.stock - qty)} {item.unitLabel}
        </span>
      </div>

      <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container/60">
        <Button variant="surfaceContainer" className="text-xs" onClick={onClose}>
          Batal
        </Button>
        <Button onClick={submit} className="text-xs">
          <Icon name="check" className="text-base" />
          <span>Simpan Koreksi Fisik</span>
        </Button>
      </div>
    </Modal>
  );
}
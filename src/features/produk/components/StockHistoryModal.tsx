import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import Link from "next/link";
import type { Product } from "@/types/product";

type StockHistoryModalProps = {
  open: boolean;
  onClose: () => void;
  product: Product | null;
};

export function StockHistoryModal({ open, onClose, product }: StockHistoryModalProps) {
  if (!product) return null;

  const mockLogs = [
    {
      time: "Hari ini, 10:14",
      type: "KELUAR",
      title: "Penjualan Kasir #NK-2025-0842",
      change: -2,
      balance: product.stock,
      actor: "Bu Sari",
    },
    {
      time: "Hari ini, 09:15",
      type: "KELUAR",
      title: "Penjualan Kasir #NK-2025-0840",
      change: -1,
      balance: product.stock + 2,
      actor: "Bu Sari",
    },
    {
      time: "Kemarin, 14:00",
      type: "MASUK",
      title: "Penerimaan Kulakan Pasar Subuh",
      change: +24,
      balance: product.stock + 3,
      actor: "Budi",
    },
    {
      time: "22 Mei 2025",
      type: "ADJUST",
      title: "Koreksi Fisik (Kemasan Rusak)",
      change: -1,
      balance: product.stock - 21,
      actor: "Bu Sari",
    },
  ];

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Riwayat Mutasi Stok Barang"
      icon="history"
      className="max-w-lg"
    >
      <div className="flex flex-col gap-space-md">
        <div className="p-3.5 rounded-xl bg-surface-container-low border border-surface-container flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-surface-container flex items-center justify-center text-primary">
              <Icon name={product.icon} className="text-xl" />
            </div>
            <div>
              <span className="font-bold text-on-surface text-sm block">{product.name}</span>
              <span className="font-label-code text-xs text-on-surface-variant">
                SKU: {product.sku} • {product.category}
              </span>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-on-surface-variant block">Sisa Stok:</span>
            <span className="font-label-numeric font-bold text-primary text-base">
              {product.stock} {product.unitLabel}
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <span className="font-label-ui text-xs font-semibold text-on-surface">
            Log Mutasi Terakhir:
          </span>
          <div className="flex flex-col gap-2 max-h-64 overflow-y-auto pr-1">
            {mockLogs.map((log, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-surface-container-lowest border border-surface-container/70 flex items-center justify-between text-xs"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-on-surface">{log.title}</span>
                  <span className="font-label-code text-[11px] text-on-surface-variant">
                    {log.time} • Petugas: {log.actor}
                  </span>
                </div>
                <div className="text-right">
                  <span
                    className={`font-label-code font-bold text-xs block ${
                      log.change > 0 ? "text-tertiary" : "text-error"
                    }`}
                  >
                    {log.change > 0 ? `+${log.change}` : log.change} {product.unitLabel}
                  </span>
                  <span className="font-label-code text-[10px] text-on-surface-variant">
                    Sisa: {log.balance}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-surface-container">
          <span className="font-label-code text-xs text-on-surface-variant">
            Harga Beli: {formatRupiah(product.buyPrice)}
          </span>
          <div className="flex items-center gap-2">
            <Link
              href="/stok"
              className="px-3 py-1.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-primary font-label-ui text-xs font-bold transition-colors"
            >
              Koreksi di Halaman Stok →
            </Link>
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 rounded-xl bg-primary text-on-primary font-label-ui text-xs font-bold cursor-pointer"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

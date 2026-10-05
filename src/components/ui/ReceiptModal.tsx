"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import { siteConfig } from "@/config/site";

export type ReceiptData = {
  no: string;
  time: string;
  cashier: string;
  itemsLabel: string;
  itemsDetail: string;
  method: string;
  amount: number;
};

type ReceiptModalProps = {
  open: boolean;
  onClose: () => void;
  receipt: ReceiptData | null;
};

export function ReceiptModal({ open, onClose, receipt }: ReceiptModalProps) {
  const [copied, setCopied] = useState(false);
  const [printFeedback, setPrintFeedback] = useState(false);

  if (!receipt) return null;

  const mockLines = [
    { name: receipt.itemsLabel.split(",")[0] || "Produk Pilihan", qty: 2, price: Math.round(receipt.amount * 0.6) },
    { name: receipt.itemsLabel.split(",")[1]?.trim() || "Item Tambahan", qty: 1, price: Math.round(receipt.amount * 0.4) },
  ];

  const subtotal = receipt.amount;
  const payAmount = receipt.method === "Tunai" ? Math.ceil(subtotal / 50000) * 50000 : subtotal;
  const change = payAmount - subtotal;

  const handlePrint = () => {
    setPrintFeedback(true);
    setTimeout(() => {
      window.print();
      setPrintFeedback(false);
    }, 300);
  };

  const handleShareWa = () => {
    const text = `*NOTA BELANJA ${siteConfig.storeName}*\nNo: ${receipt.no}\nWaktu: ${receipt.time}\nKasir: ${receipt.cashier}\nTotal: ${formatRupiah(receipt.amount)}\nMetode: ${receipt.method}\n\nTerima kasih telah berbelanja!`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(receipt.no);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Nota Transaksi Kasir"
      icon="receipt_long"
      className="max-w-md p-0 overflow-hidden"
    >
      <div className="p-4 sm:p-6 bg-surface-container-low max-h-[80vh] overflow-y-auto">
        <div className="bg-white rounded-xl shadow-md border border-surface-container p-5 font-label-code text-xs text-on-surface flex flex-col gap-3 relative">
          <div className="text-center pb-2 border-b border-dashed border-outline-variant flex flex-col gap-0.5">
            <span className="font-bold text-base text-on-surface">{siteConfig.storeName}</span>
            <span className="text-[11px] text-on-surface-variant">{siteConfig.storeKind}</span>
            <span className="text-[11px] text-on-surface-variant">{siteConfig.branch}</span>
            <span className="text-[10px] text-on-surface-variant">Telp: 0812-8900-52725</span>
          </div>

          <div className="flex flex-col gap-1 text-[11px] text-on-surface-variant pb-2 border-b border-dashed border-outline-variant">
            <div className="flex justify-between">
              <span>No. Nota:</span>
              <button
                type="button"
                onClick={handleCopy}
                className="font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
                title="Salin No Nota"
              >
                <span>{receipt.no}</span>
                <Icon name="content_copy" className="text-[12px]" />
              </button>
            </div>
            <div className="flex justify-between">
              <span>Waktu:</span>
              <span>{receipt.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Kasir:</span>
              <span>{receipt.cashier}</span>
            </div>
          </div>

          <div className="flex flex-col gap-2 py-1">
            <div className="flex justify-between font-bold text-on-surface-variant text-[11px] border-b border-surface-container pb-1">
              <span>ITEM</span>
              <span>TOTAL</span>
            </div>
            {mockLines.map((line, idx) => (
              <div key={idx} className="flex justify-between text-[11px]">
                <div className="flex flex-col">
                  <span className="font-medium text-on-surface">{line.name}</span>
                  <span className="text-on-surface-variant text-[10px]">
                    {line.qty}x @ {formatRupiah(line.price / line.qty)}
                  </span>
                </div>
                <span className="font-bold text-on-surface font-label-numeric">
                  {formatRupiah(line.price)}
                </span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-1.5 pt-2 border-t border-dashed border-outline-variant text-[11px]">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal</span>
              <span className="font-label-numeric">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Diskon</span>
              <span className="font-label-numeric">Rp 0</span>
            </div>
            <div className="flex justify-between font-bold text-sm text-on-surface pt-1 border-t border-surface-container">
              <span>TOTAL</span>
              <span className="font-label-numeric text-primary">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant pt-1">
              <span>Metode Bayar</span>
              <span className="font-semibold text-on-surface">{receipt.method}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Bayar / Tunai</span>
              <span className="font-label-numeric">{formatRupiah(payAmount)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Kembalian</span>
              <span className="font-label-numeric">{formatRupiah(change)}</span>
            </div>
          </div>

          <div className="text-center pt-3 border-t border-dashed border-outline-variant text-[10px] text-on-surface-variant">
            <p>Terima kasih telah berbelanja!</p>
            <p>Barang yang sudah dibeli tidak dapat ditukar.</p>
          </div>
        </div>

        {copied ? (
          <div className="mt-2 text-center text-xs text-tertiary font-medium">
            Nomor nota berhasil disalin ke papan klip!
          </div>
        ) : null}

        <div className="grid grid-cols-2 gap-2 mt-4">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-primary text-on-primary font-label-ui text-xs font-bold hover:bg-primary-container transition-all cursor-pointer shadow-sm"
          >
            <Icon name="print" className="text-base" />
            <span>{printFeedback ? "Mencetak..." : "Cetak Struk"}</span>
          </button>
          <button
            type="button"
            onClick={handleShareWa}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-tertiary text-on-tertiary font-label-ui text-xs font-bold hover:bg-tertiary-container transition-all cursor-pointer shadow-sm"
          >
            <Icon name="chat" className="text-base" />
            <span>Kirim WA</span>
          </button>
        </div>
      </div>
    </Modal>
  );
}

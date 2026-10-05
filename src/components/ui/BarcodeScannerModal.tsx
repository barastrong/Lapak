"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import type { Product } from "@/types/product";

type BarcodeScannerModalProps = {
  open: boolean;
  onClose: () => void;
  products: Product[];
  onAddProduct: (product: Product) => void;
};

export function BarcodeScannerModal({
  open,
  onClose,
  products,
  onAddProduct,
}: BarcodeScannerModalProps) {
  const [manualCode, setManualCode] = useState("");
  const [lastScanned, setLastScanned] = useState<Product | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const handleScanProduct = (product: Product) => {
    setErrorMessage("");
    setLastScanned(product);
    onAddProduct(product);
    setTimeout(() => {
      setLastScanned(null);
    }, 2500);
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualCode.trim()) return;

    const query = manualCode.trim().toLowerCase();
    const found = products.find(
      (p) =>
        p.sku.toLowerCase().includes(query) ||
        p.name.toLowerCase().includes(query) ||
        p.id.toLowerCase() === query
    );

    if (found) {
      handleScanProduct(found);
      setManualCode("");
    } else {
      setErrorMessage(`Barcode "${manualCode}" tidak terdaftar di katalog produk.`);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Pemindai Barcode Kasir"
      icon="barcode_scanner"
      className="max-w-lg"
    >
      <div className="flex flex-col gap-4">
        <div className="w-full h-44 bg-inverse-surface rounded-2xl relative overflow-hidden flex flex-col items-center justify-center p-4 text-inverse-on-surface shadow-inner">
          <div className="absolute inset-x-8 top-1/2 -translate-y-1/2 h-0.5 bg-red-500 shadow-[0_0_12px_3px_rgba(239,68,68,0.8)] animate-pulse" />

          <div className="w-48 h-32 border-2 border-dashed border-inverse-on-surface/50 rounded-xl flex items-center justify-center relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500" />
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500" />
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500" />
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500" />
            <Icon name="photo_camera" className="text-3xl text-inverse-on-surface/40" />
          </div>

          <div className="absolute bottom-3 inset-x-0 text-center">
            <span className="text-[11px] font-medium bg-black/60 px-3 py-1 rounded-full text-white/90">
              Arahkan kamera atau barcode scanner fisik ke kode kemasan
            </span>
          </div>
        </div>

        {lastScanned ? (
          <div className="p-3 bg-emerald-50 border border-emerald-300 rounded-xl flex items-center justify-between text-body-sm shadow-xs animate-in fade-in">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 1118 0z" />
              </svg>
              <div>
                <p className="font-bold text-emerald-950">{lastScanned.name}</p>
                <p className="text-xs text-emerald-800">Masuk ke keranjang • {formatRupiah(lastScanned.sellPrice)}</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2.5 py-1 rounded-full">
              +1 Ditambahkan
            </span>
          </div>
        ) : null}

        {errorMessage ? (
          <div className="p-2.5 bg-error-container text-on-error-container rounded-xl text-body-sm">
            {errorMessage}
          </div>
        ) : null}

        <form onSubmit={handleManualSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Icon name="barcode" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg" />
            <input
              type="text"
              placeholder="Ketik angka barcode / SKU produk..."
              value={manualCode}
              onChange={(e) => setManualCode(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-surface-container-low rounded-xl text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2.5 bg-primary text-on-primary font-label-ui text-body-sm font-bold rounded-xl hover:bg-primary-container transition-all shrink-0 cursor-pointer shadow-xs"
          >
            Pindai
          </button>
        </form>

        <div className="flex flex-col gap-2 pt-2 border-t border-surface-container">
          <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
            Simulasi Cepat (Klik untuk Scan):
          </span>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto">
            {products.slice(0, 6).map((prod) => (
              <button
                key={prod.id}
                type="button"
                onClick={() => handleScanProduct(prod)}
                className="flex items-center justify-between p-2 rounded-xl border border-surface-container bg-surface-container-lowest hover:border-primary hover:bg-primary/5 transition-all text-left cursor-pointer group"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <div className="w-7 h-7 rounded-lg bg-surface-container flex items-center justify-center shrink-0">
                    <Icon name={prod.icon} className="text-sm text-primary" />
                  </div>
                  <div className="truncate">
                    <p className="text-xs font-semibold text-on-surface truncate group-hover:text-primary">
                      {prod.name}
                    </p>
                    <p className="text-[10px] text-on-surface-variant font-label-code">
                      {prod.sku}
                    </p>
                  </div>
                </div>
                <span className="text-xs font-bold text-primary shrink-0 ml-1">
                  {formatRupiah(prod.sellPrice)}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-surface-container text-on-surface font-label-ui text-body-sm hover:bg-surface-container-high transition-colors cursor-pointer"
          >
            Selesai
          </button>
        </div>
      </div>
    </Modal>
  );
}

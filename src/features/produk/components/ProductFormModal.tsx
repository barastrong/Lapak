"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import type { Product } from "@/types/product";

type ProductFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (input: Omit<Product, "id">) => void;
};

const emptyState: Omit<Product, "id"> = {
  name: "",
  sku: "",
  category: "Sembako",
  unitLabel: "pcs",
  buyPrice: 0,
  sellPrice: 0,
  stock: 0,
  minStock: 0,
  icon: "inventory_2",
};

/** Form modal tambah produk baru (data dikirim lewat onSave). */
export function ProductFormModal({ open, onClose, onSave }: ProductFormModalProps) {
  const [form, setForm] = useState(emptyState);

  const set = <K extends keyof typeof form>(key: K, value: (typeof form)[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    onSave(form);
    setForm(emptyState);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} title="Tambah Produk Baru" icon="inventory_2">
      <div className="flex flex-col gap-space-sm">
        <Field label="Nama Produk">
          <input
            className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
            placeholder="Contoh: Beras Rojolele 5kg"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
          />
        </Field>
        <div className="grid grid-cols-2 gap-space-sm">
          <Field label="SKU / Barcode">
            <input
              className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
              value={form.sku}
              onChange={(e) => set("sku", e.target.value)}
            />
          </Field>
          <Field label="Satuan">
            <input
              className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
              value={form.unitLabel}
              onChange={(e) => set("unitLabel", e.target.value)}
            />
          </Field>
        </div>
        <Field label="Kategori">
          <select
            className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {["Sembako", "Minuman", "Bumbu Dapur", "Kebutuhan Rumah", "Makanan Ringan"].map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </Field>
        <div className="grid grid-cols-2 gap-space-sm">
          <Field label="Harga Beli (Kulak)">
            <input
              type="number"
              min={0}
              className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
              value={form.buyPrice}
              onChange={(e) => set("buyPrice", Number(e.target.value))}
            />
          </Field>
          <Field label="Harga Jual Ecer">
            <input
              type="number"
              min={0}
              className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
              value={form.sellPrice}
              onChange={(e) => set("sellPrice", Number(e.target.value))}
            />
          </Field>
        </div>
        <div className="grid grid-cols-2 gap-space-sm">
          <Field label="Stok Awal">
            <input
              type="number"
              min={0}
              className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
              value={form.stock}
              onChange={(e) => set("stock", Number(e.target.value))}
            />
          </Field>
          <Field label="Minimal Stok">
            <input
              type="number"
              min={0}
              className="bg-[#FAFAF7] border border-on-surface/15 rounded-lg px-3 py-2 text-body-sm text-on-surface focus:border-primary focus:bg-white focus:outline-none w-full"
              value={form.minStock}
              onChange={(e) => set("minStock", Number(e.target.value))}
            />
          </Field>
        </div>
        <div className="flex items-center justify-end gap-space-sm pt-space-xs">
          <Button variant="surfaceContainer" onClick={onClose}>
            Batal
          </Button>
          <Button onClick={submit} disabled={!form.name}>
            Simpan
          </Button>
        </div>
      </div>
    </Modal>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1">
      <span className="font-label-ui text-xs text-on-surface">{label}</span>
      {children}
    </label>
  );
}
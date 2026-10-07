"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { ShoppingItem } from "@/features/stok/types";

type ShoppingListProps = {
  items: ShoppingItem[];
  onToggle: (id: string) => void;
  onRemove?: (id: string) => void;
  onAddQuick?: (name: string) => void;
};

/** Daftar belanja pasar subuh (beri centang = sudah dibeli di pasar). */
export function ShoppingList({ items, onToggle, onRemove, onAddQuick }: ShoppingListProps) {
  const [quickInput, setQuickInput] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickInput.trim()) return;
    onAddQuick?.(quickInput.trim());
    setQuickInput("");
  };

  const checkedCount = items.filter((i) => i.checked).length;
  const progressPercent = items.length > 0 ? Math.round((checkedCount / items.length) * 100) : 0;

  return (
    <div className="flex flex-col gap-3">
      {/* Progress belanja pasar */}
      <div className="bg-surface-container-low/70 p-2.5 rounded-xl border border-surface-container/60 flex flex-col gap-1.5">
        <div className="flex items-center justify-between text-xs font-label-code">
          <span className="text-on-surface-variant font-medium">Progres Belanja Pasar:</span>
          <span className="font-bold text-tertiary">
            {checkedCount} dari {items.length} Barang ({progressPercent}%)
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
          <div
            className="h-full bg-tertiary rounded-full transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Input Cepat Tambah Barang */}
      <form onSubmit={handleAdd} className="flex items-center gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="+ Tambah barang belanja (tekan Enter)..."
            value={quickInput}
            onChange={(e) => setQuickInput(e.target.value)}
            className="w-full bg-surface-container-low/80 hover:bg-surface-container-low focus:bg-surface-container-lowest px-3 py-2 pl-8 rounded-xl text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs transition-colors"
          />
          <Icon
            name="edit_note"
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-on-surface-variant text-base pointer-events-none"
          />
        </div>
        {quickInput.trim() && (
          <button
            type="submit"
            className="px-3 py-2 bg-primary text-on-primary rounded-xl font-label-ui text-xs font-bold hover:bg-primary-container transition-colors cursor-pointer shrink-0"
          >
            Tambah
          </button>
        )}
      </form>

      {/* Daftar Item */}
      <div className="flex flex-col gap-1.5 max-h-[380px] overflow-y-auto pr-1">
        {items.length === 0 ? (
          <div className="py-8 text-center text-on-surface-variant text-xs font-label-code">
            Belum ada catatan belanja. Klik &quot;+ Kulak&quot; pada tabel untuk memasukkan barang.
          </div>
        ) : (
          items.map((i) => (
            <div
              key={i.id}
              className={cn(
                "flex items-start gap-2.5 p-2.5 rounded-xl border transition-all duration-150 group",
                i.checked
                  ? "bg-surface-container-low/40 border-surface-container/50 opacity-60"
                  : "bg-surface-container-lowest border-surface-container hover:border-surface-container-high hover:shadow-2xs"
              )}
            >
              <input
                type="checkbox"
                className="mt-1 w-4 h-4 rounded accent-tertiary cursor-pointer shrink-0"
                checked={i.checked}
                onChange={() => onToggle(i.id)}
                aria-label={`Tandai ${i.name} terbeli`}
              />
              <div className="flex-1 min-w-0 cursor-pointer" onClick={() => onToggle(i.id)}>
                <div className="flex items-center justify-between gap-1">
                  <span
                    className={cn(
                      "font-label-ui text-xs font-semibold text-on-surface truncate",
                      i.checked && "line-through text-on-surface-variant"
                    )}
                  >
                    {i.name}
                  </span>
                  <span className="font-label-numeric text-[11px] text-on-surface bg-surface-container px-2 py-0.5 rounded-md font-bold shrink-0">
                    {i.qty}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] mt-1 font-label-code text-on-surface-variant">
                  <span className="flex items-center gap-1 truncate text-xs">
                    <Icon name={i.supplierIcon || "store"} className="text-xs shrink-0 text-primary" />
                    <span className="truncate">{i.supplier}</span>
                  </span>
                  <span className="font-bold text-on-surface shrink-0 ml-2">
                    ~{formatRupiah(i.estPrice)}
                  </span>
                </div>
              </div>
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(i.id)}
                  className="opacity-0 group-hover:opacity-100 text-on-surface-variant hover:text-error p-1 rounded-md transition-all cursor-pointer shrink-0"
                  title="Hapus dari catatan"
                  aria-label={`Hapus ${i.name}`}
                >
                  <Icon name="delete" className="text-base" />
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
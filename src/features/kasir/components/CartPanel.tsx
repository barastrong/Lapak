import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import type { CartLine } from "@/features/kasir/types";

type CartPanelProps = {
  lines: CartLine[];
  subtotal: number;
  onChangeQuantity: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
  onGantiKasbon: () => void;
};

/** Panel nota kontan + item keranjang interaktif (tambah/kurang/ubah). */
export function CartPanel({
  lines,
  subtotal,
  onChangeQuantity,
  onRemove,
  onGantiKasbon,
}: CartPanelProps) {
  const totalQty = lines.reduce((acc, l) => acc + l.quantity, 0);
  return (
    <div className="flex flex-col gap-space-md">
      <div className="relative bg-surface-container-lowest shadow-md rounded-t-xl transition-all">
        <div className="p-space-lg flex flex-col gap-space-md pb-6 relative z-10">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline-md text-headline-md tracking-tight text-primary font-extrabold uppercase">
                  NOTA KONTAN
                </span>
                <span className="text-[10px] uppercase tracking-wider font-label-code px-1.5 py-0.5 rounded bg-surface-container text-primary font-bold">
                  ASLI
                </span>
              </div>
              <p className="text-body-sm text-xs text-on-surface-variant mt-0.5">
                Warung Bu Sari
              </p>
            </div>
            <div className="text-right">
              <span className="font-label-code text-label-code text-primary font-bold">#NK-2025-0842</span>
              <p className="font-label-code text-[11px] text-on-surface-variant">24 Mei 2025, 10:14</p>
            </div>
          </div>
          <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Icon name="person_pin" className="text-primary text-lg" />
              <div className="flex flex-col">
                <span className="font-label-ui text-body-sm text-on-surface font-semibold">
                  Pembeli Umum (Tunai)
                </span>
                <span className="text-body-sm text-[11px] text-on-surface-variant">
                  Kategori: Eceran Langsung
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onGantiKasbon}
              className="text-primary font-label-code text-xs hover:underline flex items-center gap-0.5"
            >
              <span>Ganti / Kasbon</span>
              <Icon name="chevron_right" className="text-sm" />
            </button>
          </div>
          <div className="grid grid-cols-12 text-[11px] font-label-code text-on-surface-variant uppercase tracking-wider pb-1">
            <span className="col-span-6">Nama Barang</span>
            <span className="col-span-2 text-center">Jml</span>
            <span className="col-span-4 text-right">Subtotal</span>
          </div>
          <div className="flex flex-col gap-2.5 max-h-[310px] overflow-y-auto pr-1">
            {lines.map((line) => (
              <div key={line.product.id} className="grid grid-cols-12 items-center text-body-sm py-1.5 group">
                <div className="col-span-6 flex flex-col pr-1">
                  <span className="font-label-ui text-on-surface font-semibold text-xs leading-tight">
                    {line.product.name}
                  </span>
                  <span className="font-label-code text-[11px] text-on-surface-variant">
                    @ {formatRupiah(line.product.sellPrice)}
                  </span>
                </div>
                <div className="col-span-2 flex items-center justify-center gap-1">
                  <QtyBtn label="-" onClick={() => onChangeQuantity(line.product.id, -1)} />
                  <span className="font-label-numeric text-xs font-bold text-on-surface">
                    {line.quantity}
                  </span>
                  <QtyBtn label="+" onClick={() => onChangeQuantity(line.product.id, 1)} />
                </div>
                <div className="col-span-4 flex items-center justify-end gap-1.5 text-right">
                  <span className="font-label-numeric text-xs font-bold text-on-surface">
                    {formatRupiah(line.product.sellPrice * line.quantity)}
                  </span>
                  <button
                    type="button"
                    onClick={() => onRemove(line.product.id)}
                    className="text-outline hover:text-error opacity-0 group-hover:opacity-100 transition-opacity"
                    aria-label={`Hapus ${line.product.name}`}
                  >
                    <Icon name="delete" className="text-base" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="py-1">
            <div className="w-full h-px bg-surface-container-highest"></div>
          </div>
          <div className="flex flex-col gap-1.5 text-xs">
            <div className="flex justify-between text-on-surface-variant">
              <span>Subtotal ({lines.length} item, {totalQty} buah)</span>
              <span className="font-label-numeric text-on-surface font-medium">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Diskon Langganan</span>
              <span className="font-label-numeric text-tertiary">Rp 0</span>
            </div>
            <div className="flex justify-between text-on-surface-variant">
              <span>Pajak Kios (PB1 / Non-PKP)</span>
              <span className="font-label-numeric text-on-surface-variant">Bebas</span>
            </div>
            <div className="mt-2 pt-2 bg-surface-container-low p-space-sm rounded-lg flex items-center justify-between">
              <div>
                <span className="font-label-code text-[11px] text-on-surface-variant uppercase tracking-wider block">
                  TOTAL TAGIHAN
                </span>
                <span className="font-headline-lg text-headline-lg text-primary font-extrabold tracking-tight">
                  {formatRupiah(subtotal)}
                </span>
              </div>
              <Icon name="receipt" className="text-secondary text-2xl" />
            </div>
          </div>
        </div>
        <div className="w-full h-4 bg-surface-container-lowest -mb-3.5 relative z-20" style={{ clipPath: "polygon(0% 0%, 2% 100%, 4% 0%, 6% 100%, 8% 0%, 10% 100%, 12% 0%, 14% 100%, 16% 0%, 18% 100%, 20% 0%, 22% 100%, 24% 0%, 26% 100%, 28% 0%, 30% 100%, 32% 0%, 34% 100%, 36% 0%, 38% 100%, 40% 0%, 42% 100%, 44% 0%, 46% 100%, 48% 0%, 50% 100%, 52% 0%, 54% 100%, 56% 0%, 58% 100%, 60% 0%, 62% 100%, 64% 0%, 66% 100%, 68% 0%, 70% 100%, 72% 0%, 74% 100%, 76% 0%, 78% 100%, 80% 0%, 82% 100%, 84% 0%, 86% 100%, 88% 0%, 90% 100%, 92% 0%, 94% 100%, 96% 0%, 98% 100%, 100% 0%)" }}></div>
      </div>
      <QuickTender onBayar={onGantiKasbon} />
    </div>
  );
}

function QtyBtn({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label === "+" ? "Tambah jumlah" : "Kurangi jumlah"}
      className="w-7 h-7 rounded-md bg-surface-container text-on-surface flex items-center justify-center text-sm font-bold hover:bg-surface-container-high active:bg-surface-container transition-colors"
    >
      {label}
    </button>
  );
}

function QuickTender({ onBayar }: { onBayar: () => void }) {
  return (
    <div className="bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex flex-col gap-space-sm mt-1">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: "Uang Pas", value: null },
          { label: "Rp 80.000", value: 80_000 },
          { label: "Rp 100.000", value: 100_000 },
        ].map((b) => (
          <button
            key={b.label}
            type="button"
            className="py-2 px-1 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-numeric text-xs font-bold text-center transition-colors"
          >
            {b.label}
          </button>
        ))}
      </div>
      <button
        type="button"
        onClick={onBayar}
        className="py-3.5 w-full bg-primary-container hover:bg-primary text-on-primary rounded-xl font-headline-md text-headline-sm flex items-center justify-center gap-2 shadow-md active:translate-y-0.5 transition-all"
      >
        <Icon name="payments" className="text-xl" />
        <span>Selesaikan Transaksi</span>
      </button>
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          className="py-2.5 px-2 rounded-xl bg-error-container text-on-error-container font-label-ui text-xs font-semibold flex items-center justify-center gap-1 hover:bg-opacity-80 transition-colors"
        >
          <Icon name="edit_note" className="text-base" />
          <span>Catat Kasbon</span>
        </button>
        <button
          type="button"
          className="py-2.5 px-2 rounded-xl bg-surface-container text-on-surface font-label-ui text-xs font-semibold flex items-center justify-center gap-1 hover:bg-surface-container-high transition-colors"
        >
          <Icon name="receipt_long" className="text-base" />
          <span>Cetak Ulang</span>
        </button>
      </div>
      <p className="text-center font-label-code text-[11px] text-on-surface-variant pt-1">
        Transaksi cepat, cetak struk thermal dan nota digital.
      </p>
    </div>
  );
}
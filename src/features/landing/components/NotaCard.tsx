import { formatRupiah } from "@/lib/format";
import type { ReceiptData } from "@/features/landing/types";

/**
 * Nota kontan (hero) — kartu kertas "tactile" dengan efek sobek.
 * Menerima data lewat props, tanpa hardcode.
 */
export function NotaCard({ receipt }: { receipt: ReceiptData }) {
  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-secondary-fixed-dim/20 rounded-3xl blur-2xl -rotate-3 pointer-events-none" />
      <div className="w-full max-w-[390px] bg-[#FFFDF8] text-on-surface rounded-none p-6 shadow-2xl relative rotate-2 hover:rotate-0 transition-transform duration-300 mx-auto lg:mx-0">
        <div className="w-3.5 h-3.5 rounded-full bg-surface-dim/40 absolute -top-1.5 left-1/2 -translate-x-1/2 shadow-inner" />
        <div className="text-center pb-space-sm border-b-2 border-dashed border-outline-variant/60 flex flex-col items-center">
          <div className="font-headline-md text-headline-md tracking-wider text-on-surface uppercase font-extrabold">
            {receipt.title}
          </div>
          <div className="font-headline-sm text-headline-sm text-primary-container font-bold mt-0.5">
            {receipt.storeName}
          </div>
          <div className="text-body-sm text-[0.8125rem] text-on-surface-variant">
            {receipt.address}
          </div>
          <div className="flex items-center justify-between w-full mt-3 font-label-code text-[0.75rem] text-on-surface-variant px-1">
            <span>No: {receipt.number}</span>
            <span>{receipt.datetime}</span>
          </div>
          <div className="flex items-center justify-between w-full font-label-code text-[0.75rem] text-on-surface-variant px-1">
            <span>Kasir: {receipt.cashier}</span>
            <span className="text-tertiary-container font-bold">{receipt.payment}</span>
          </div>
        </div>
        <div className="py-space-sm border-b-2 border-dashed border-outline-variant/60">
          <div className="flex justify-between font-label-code text-[0.75rem] text-on-surface-variant pb-1 font-bold">
            <span>ITEM</span>
            <span>TOTAL (RP)</span>
          </div>
          {receipt.items.map((item) => (
            <div key={item.name} className="py-1">
              <div className="flex justify-between font-label-code text-[0.8125rem] text-on-surface">
                <span className="font-bold">{item.name}</span>
                <span>{item.total.toLocaleString("id-ID")}</span>
              </div>
              <div className="flex items-center justify-between font-label-code text-[0.7rem] text-on-surface-variant">
                <span>{item.detail}</span>
                {item.promo ? (
                  <span className="text-tertiary-container font-semibold">{item.promo}</span>
                ) : null}
              </div>
            </div>
          ))}
        </div>
        <div className="py-3 flex flex-col gap-1 border-b-2 border-dashed border-outline-variant/60 font-label-code text-[0.8125rem]">
          <div className="flex justify-between text-on-surface-variant">
            <span>Subtotal ({receipt.items.length} Item)</span>
            <span>{formatRupiah(receipt.subtotal)}</span>
          </div>
          {receipt.discounts.map((d) => (
            <div key={d.label} className="flex justify-between text-error">
              <span>{d.label}</span>
              <span>{formatRupiah(d.amount)}</span>
            </div>
          ))}
        </div>
        <div className="pt-3 pb-2 flex items-center justify-between">
          <div>
            <span className="font-label-ui text-[0.75rem] uppercase tracking-wider text-on-surface-variant font-bold block">
              TOTAL AKHIR
            </span>
            <span className="text-body-sm text-[0.75rem] text-tertiary-container font-bold">
              LUNAS (Tunai Uang Pas)
            </span>
          </div>
          <div className="text-right">
            <div className="font-label-numeric text-[1.4rem] font-bold text-primary-container leading-none">
              {formatRupiah(receipt.total)}
            </div>
            <div className="font-label-code text-[0.7rem] text-on-surface-variant mt-1">
              Kembalian: {formatRupiah(receipt.change)}
            </div>
          </div>
        </div>
        <div className="pt-3 mt-1 flex items-center justify-between">
          <div className="border-2 border-dashed border-tertiary-container px-2.5 py-1 rounded rotate-[-4deg] bg-tertiary-fixed/30">
            <span className="font-headline-sm text-[0.85rem] font-extrabold text-tertiary-container tracking-widest">
              ★ LUNAS ★
            </span>
          </div>
          <div className="flex flex-col items-end">
            <div className="flex gap-0.5 items-end h-7">
              {[6, 7, 5, 7, 6, 7, 5, 7, 6, 7, 5, 7].map((h, i) => (
                <div key={i} className="w-0.5 bg-on-surface" style={{ height: `${h * 4}px` }} />
              ))}
            </div>
            <span className="font-label-code text-[0.65rem] text-on-surface-variant mt-0.5">
              89927610023
            </span>
          </div>
        </div>
        <div className="absolute -bottom-3 left-0 right-0 h-3 overflow-hidden">
          <svg className="w-full h-3 text-[#FFFDF8]" preserveAspectRatio="none" viewBox="0 0 100 10">
            <polygon
              fill="currentColor"
              points="0,0 5,10 10,0 15,10 20,0 25,10 30,0 35,10 40,0 45,10 50,0 55,10 60,0 65,10 70,0 75,10 80,0 85,10 90,0 95,10 100,0 100,0 0,0"
            />
          </svg>
        </div>
      </div>
    </div>
  );
}

/** Bilah pita fitur/badge kecil pada hero (misal "Sistem Kasir & Buku Warung Praktis"). */
export function HeroBadge() {
  return (
    <div className="inline-flex items-center gap-space-xs self-start bg-secondary-fixed/50 text-on-secondary-fixed px-space-md py-1.5 rounded-full shadow-sm">
      <span className="material-symbols-outlined text-[16px] text-secondary">receipt_long</span>
      <span className="font-label-ui text-label-ui font-bold">Sistem Kasir & Buku Warung Praktis</span>
    </div>
  );
}

/** Rekapitulasi metrik singkat di bawah hero (warung aktif, cetak nota, offline). */
export function MetricStrip() {
  const metrics = [
    { value: "3.800+", label: "Warung Aktif" },
    { value: "< 3 Detik", label: "Cetak Nota" },
    { value: "100%", label: "Bisa Offline" },
  ];
  return (
    <div className="grid grid-cols-3 gap-space-sm pt-space-md max-w-lg">
      {metrics.map((m) => (
        <div key={m.label} className="bg-surface-container-low p-space-sm rounded-xl">
          <p className="font-label-numeric text-headline-md text-primary-container">{m.value}</p>
          <p className="text-[0.8125rem] text-on-surface-variant">{m.label}</p>
        </div>
      ))}
    </div>
  );
}
import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { RecentTransaction } from "@/features/dashboard/types";

const PAYMENT_STYLE: Record<"TUNAI" | "QRIS" | "KASBON", string> = {
  TUNAI: "bg-tertiary-fixed text-on-tertiary-fixed",
  QRIS: "bg-primary-fixed text-on-primary-fixed",
  KASBON: "bg-secondary-fixed text-on-secondary-fixed",
};

/** Daftar transaksi terakhir hari ini (tabel ringkas). */
export function RecentTransactions({ data }: { data: RecentTransaction[] }) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-[0_4px_0_0_rgba(28,36,48,0.04)] flex flex-col overflow-hidden">
      <div className="px-space-md py-space-sm bg-surface-container-low flex items-center justify-between">
        <h2 className="font-headline-sm text-headline-sm text-on-surface">Transaksi Terakhir</h2>
        <span className="font-label-code text-label-code text-on-surface-variant">Hari ini</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="font-label-code text-body-sm text-on-surface-variant border-b border-surface-container-low">
              <th className="py-2 px-space-md font-semibold">Nota</th>
              <th className="py-2 px-space-md font-semibold">Waktu</th>
              <th className="py-2 px-space-md font-semibold">Detail</th>
              <th className="py-2 px-space-md text-right font-semibold">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container-low">
            {data.map((t) => (
              <tr key={t.id} className="hover:bg-surface-container-low transition-colors">
                <td className="py-2.5 px-space-md">
                  <span className="font-label-code text-primary font-bold">{t.no}</span>
                </td>
                <td className="py-2.5 px-space-md font-label-code text-body-sm text-on-surface-variant">
                  {t.time}
                </td>
                <td className="py-2.5 px-space-md text-body-sm text-on-surface-variant">{t.detail}</td>
                <td className="py-2.5 px-space-md text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className={cn("px-1.5 py-0.5 rounded text-[0.7rem] font-label-code", PAYMENT_STYLE[t.payment])}>
                      {t.payment}
                    </span>
                    <span className="font-label-numeric text-body-sm text-on-surface">
                      {formatRupiah(t.total)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="px-space-md py-2.5 bg-surface-container-low flex items-center justify-between">
        <span className="text-body-sm text-on-surface-variant">Lihat semua transaksi</span>
        <Icon name="chevron_right" className="text-on-surface-variant text-base" />
      </div>
    </div>
  );
}
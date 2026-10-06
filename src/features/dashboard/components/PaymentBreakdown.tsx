import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import type { PaymentMethodStat } from "@/features/dashboard/types";

export function PaymentBreakdown({ stats }: { stats: PaymentMethodStat[] }) {
  const total = stats.reduce((acc, s) => acc + s.amount, 0);

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-surface-container/60 shadow-xs p-space-md sm:p-space-lg flex flex-col gap-space-md">
      <div className="flex items-center justify-between pb-1 border-b border-surface-container">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            Arus Kas Hari Ini
          </h2>
          <p className="text-body-sm text-xs text-on-surface-variant">
            Pemisahan uang tunai laci vs saldo rekening QRIS
          </p>
        </div>
        <span className="font-label-code text-xs font-bold text-on-surface">
          Total: {formatRupiah(total)}
        </span>
      </div>

      <div className="h-3 w-full rounded-full bg-surface-container flex overflow-hidden">
        {stats.map((s) => (
          <div
            key={s.method}
            style={{ width: `${s.percentage}%` }}
            className={`h-full transition-all duration-500 ${
              s.method === "TUNAI"
                ? "bg-tertiary"
                : s.method === "QRIS"
                ? "bg-primary"
                : "bg-error"
            }`}
            title={`${s.label}: ${s.percentage}%`}
          />
        ))}
      </div>

      <div className="flex flex-col gap-2.5">
        {stats.map((s) => (
          <div
            key={s.method}
            className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/40 border border-surface-container/50"
          >
            <div className="flex items-center gap-2.5">
              <span
                className={`w-3 h-3 rounded-full shrink-0 ${
                  s.method === "TUNAI"
                    ? "bg-tertiary"
                    : s.method === "QRIS"
                    ? "bg-primary"
                    : "bg-error"
                }`}
              />
              <div className="flex flex-col">
                <span className="font-label-ui text-xs text-on-surface font-semibold">
                  {s.label}
                </span>
                <span className="text-[11px] text-on-surface-variant font-label-code">
                  {s.count} transaksi • {s.note}
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="font-label-numeric text-xs sm:text-sm font-bold text-on-surface">
                {formatRupiah(s.amount)}
              </div>
              <div className="font-label-code text-[11px] text-on-surface-variant">
                {s.percentage}%
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-start gap-2 p-2.5 rounded-xl bg-tertiary-fixed/25 border border-tertiary/20 text-xs">
        <Icon name="payments" className="text-tertiary text-base shrink-0 mt-0.5" />
        <div className="text-on-surface text-[11px] leading-relaxed">
          <strong>Uang fisik laci kasir saat ini:</strong> {formatRupiah(1_150_000)} (ditambah kas awal modal Rp 200.000 = <strong>{formatRupiah(1_350_000)}</strong>).
        </div>
      </div>
    </div>
  );
}

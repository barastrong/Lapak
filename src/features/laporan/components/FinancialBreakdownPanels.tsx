import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import type { CategoryProfitability, PaymentMethodBreakdown } from "@/features/laporan/types";

type FinancialBreakdownProps = {
  payments: PaymentMethodBreakdown[];
  categories: CategoryProfitability[];
};

export function FinancialBreakdownPanels({ payments, categories }: FinancialBreakdownProps) {
  const totalPayment = payments.reduce((acc, p) => acc + p.amount, 0);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-md items-start">
      <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg border border-surface-container/60 shadow-xs flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              Metode Pembayaran
            </h2>
            <p className="text-body-sm text-xs text-on-surface-variant">
              Komposisi uang masuk kasir selama periode berjalan
            </p>
          </div>
          <span className="font-label-code text-xs font-bold text-on-surface">
            {formatRupiah(totalPayment)}
          </span>
        </div>

        <div className="h-3 w-full rounded-full bg-surface-container flex overflow-hidden">
          {payments.map((p) => (
            <div
              key={p.method}
              style={{ width: `${p.percentage}%` }}
              className={`h-full transition-all duration-500 ${
                p.method === "Tunai"
                  ? "bg-tertiary"
                  : p.method === "QRIS"
                  ? "bg-primary"
                  : p.method === "Transfer BCA"
                  ? "bg-secondary"
                  : "bg-error"
              }`}
              title={`${p.label}: ${p.percentage}%`}
            />
          ))}
        </div>

        <div className="flex flex-col gap-2">
          {payments.map((p) => (
            <div
              key={p.method}
              className="flex items-center justify-between p-2.5 rounded-xl bg-surface-container-low/40 border border-surface-container/50 text-xs"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <span
                  className={`w-3 h-3 rounded-full shrink-0 ${
                    p.method === "Tunai"
                      ? "bg-tertiary"
                      : p.method === "QRIS"
                      ? "bg-primary"
                      : p.method === "Transfer BCA"
                      ? "bg-secondary"
                      : "bg-error"
                  }`}
                />
                <div className="flex flex-col min-w-0">
                  <span className="font-label-ui font-semibold text-on-surface truncate">
                    {p.label}
                  </span>
                  <span className="font-label-code text-[11px] text-on-surface-variant">
                    {p.count} transaksi selesai
                  </span>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="font-label-numeric font-bold text-on-surface text-xs sm:text-sm block">
                  {formatRupiah(p.amount)}
                </span>
                <span className="font-label-code text-[11px] text-on-surface-variant">
                  {p.percentage}% dari total
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg border border-surface-container/60 shadow-xs flex flex-col gap-space-md">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
              Kinerja Margin per Kategori
            </h2>
            <p className="text-body-sm text-xs text-on-surface-variant">
              Perbandingan omzet kotor vs persentase keuntungan bersih
            </p>
          </div>
          <span className="font-label-code text-xs text-tertiary bg-tertiary-fixed px-2 py-0.5 rounded-md font-bold">
            Margin Sehat
          </span>
        </div>

        <div className="flex flex-col gap-2.5">
          {categories.map((c) => (
            <div
              key={c.category}
              className="p-2.5 rounded-xl bg-surface-container-low/40 border border-surface-container/50 flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5">
                  <span className="font-label-ui font-semibold text-on-surface">
                    {c.category}
                  </span>
                  <span className="text-[10px] font-label-code text-on-surface-variant bg-surface-container px-1.5 py-0.2 rounded">
                    {c.volumeLabel}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-label-code text-[11px] text-tertiary font-bold bg-tertiary-fixed/30 px-1.5 py-0.2 rounded">
                    Untung {c.margin}%
                  </span>
                  <span className="font-label-numeric font-bold text-on-surface text-xs sm:text-sm">
                    {formatRupiah(c.omset)}
                  </span>
                </div>
              </div>

              <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                <div
                  className="bg-tertiary h-1.5 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, c.margin * 2.5)}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-[11px] font-label-code text-on-surface-variant">
                <span>Kontribusi laba bersih:</span>
                <span className="font-semibold text-on-surface">{formatRupiah(c.profit)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-2.5 rounded-xl bg-surface-container-low flex items-center gap-2 text-xs text-on-surface-variant">
          <Icon name="tips_and_updates" className="text-primary text-base shrink-0" />
          <span>
            <strong>Insight:</strong> Minuman dingin & kopi menghasilkan margin tertinggi (36.2%), sementara Sembako mendorong perputaran omzet kasir terbesar.
          </span>
        </div>
      </div>
    </div>
  );
}

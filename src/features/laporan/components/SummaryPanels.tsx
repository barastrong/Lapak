import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import type { ReportSummary } from "@/features/laporan/types";

export function SummaryPanels({ summary }: { summary: ReportSummary }) {
  return (
    <div className="flex flex-col gap-space-md">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md">
        <div className="bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg flex flex-col justify-between border border-surface-container/60 shadow-xs relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-ui text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                Total Omzet Kotor
              </span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-primary-fixed/50 text-primary">
                <Icon name="point_of_sale" className="text-base" />
              </span>
            </div>

            <div className="mt-2">
              <div className="font-label-numeric text-headline-xl text-on-surface tracking-tight font-bold">
                {formatRupiah(summary.grossSales)}
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="inline-block w-2 h-2 rounded-full bg-primary" />
                <span>
                  Total dari <strong>{summary.transactionCount} nota</strong> berhasil
                </span>
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-2 border-t border-surface-container text-xs text-on-surface-variant font-label-code flex justify-between items-center">
            <span>Rata-rata keranjang:</span>
            <span className="text-on-surface font-bold">{formatRupiah(summary.averageBasket)}</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg flex flex-col justify-between border border-surface-container/60 shadow-xs relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-ui text-xs text-on-surface-variant uppercase tracking-wider font-semibold">
                Total Modal (HPP Kulakan)
              </span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-surface-container text-on-surface-variant">
                <Icon name="inventory_2" className="text-base" />
              </span>
            </div>

            <div className="mt-2">
              <div className="font-label-numeric text-headline-xl text-on-surface tracking-tight font-bold">
                {formatRupiah(summary.totalModal)}
              </div>
              <div className="mt-1 flex items-center gap-2 text-xs text-on-surface-variant">
                <span className="inline-block w-2 h-2 rounded-full bg-outline" />
                <span>Beban modal pengadaan stok barang</span>
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-2 border-t border-surface-container text-xs text-on-surface-variant font-label-code flex justify-between items-center">
            <span>Porsi biaya modal:</span>
            <span className="text-on-surface font-bold">{summary.modalRatio.toLocaleString("id-ID")}%</span>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg flex flex-col justify-between border border-surface-container/60 shadow-xs relative overflow-hidden">
          <div>
            <div className="flex items-center justify-between mb-space-xs">
              <span className="font-label-ui text-xs text-tertiary uppercase tracking-wider font-semibold">
                Untung Bersih (Laba Riil)
              </span>
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl bg-tertiary-fixed text-on-tertiary-fixed">
                <Icon name="trending_up" className="text-base" />
              </span>
            </div>

            <div className="mt-2">
              <div className="font-label-numeric text-headline-xl text-tertiary tracking-tight font-bold">
                {formatRupiah(summary.netProfit)}
              </div>
              <div className="mt-1 flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-label-code text-xs font-bold">
                  <Icon name="arrow_upward" className="text-[13px]" />
                  {summary.marginPercent.toLocaleString("id-ID")}% margin bersih
                </span>
                <span className="text-xs text-on-surface-variant">setelah HPP</span>
              </div>
            </div>
          </div>

          <div className="mt-space-md pt-2 border-t border-surface-container text-xs text-tertiary font-label-code flex justify-between items-center">
            <span>Pencapaian target:</span>
            <span className="font-bold">Tercapai ({summary.targetAchieved}%)</span>
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-md rounded-2xl border border-surface-container/60 shadow-xs flex flex-col gap-2">
        <div className="flex items-center justify-between pb-1 border-b border-surface-container/60">
          <span className="font-label-ui text-xs text-on-surface-variant font-bold uppercase tracking-wider">
            Realisasi Arus Kas Buku Warung
          </span>
          <span className="text-xs font-label-code text-on-surface-variant">
            Pemisahan kas fisik vs saldo bank
          </span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-1 font-label-code">
          <div className="p-2.5 rounded-xl bg-tertiary-fixed/25 border border-tertiary/20 flex flex-col">
            <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
              <Icon name="payments" className="text-tertiary text-sm" />
              Kas Tunai Brankas
            </span>
            <span className="font-bold text-on-surface text-sm sm:text-base mt-0.5 font-label-numeric">
              {formatRupiah(summary.cashInDrawer ?? 26_500_000)}
            </span>
            <span className="text-[10px] text-tertiary font-semibold mt-0.5">Uang fisik di tempat</span>
          </div>

          <div className="p-2.5 rounded-xl bg-primary-fixed/25 border border-primary/20 flex flex-col">
            <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
              <Icon name="account_balance" className="text-primary text-sm" />
              Saldo Digital (QRIS)
            </span>
            <span className="font-bold text-on-surface text-sm sm:text-base mt-0.5 font-label-numeric">
              {formatRupiah(summary.digitalBalance ?? 14_900_000)}
            </span>
            <span className="text-[10px] text-primary font-semibold mt-0.5">Masuk rekening BCA</span>
          </div>

          <div className="p-2.5 rounded-xl bg-error-container/30 border border-error/20 flex flex-col">
            <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
              <Icon name="pending_actions" className="text-error text-sm" />
              Piutang Kasbon Warga
            </span>
            <span className="font-bold text-error text-sm sm:text-base mt-0.5 font-label-numeric">
              {formatRupiah(summary.pendingKasbon ?? 1_450_000)}
            </span>
            <span className="text-[10px] text-error font-semibold mt-0.5">Belum tertagih</span>
          </div>

          <div className="p-2.5 rounded-xl bg-surface-container-low border border-surface-container flex flex-col">
            <span className="text-[11px] text-on-surface-variant flex items-center gap-1">
              <Icon name="shopping_cart" className="text-on-surface-variant text-sm" />
              Biaya Operasional
            </span>
            <span className="font-bold text-on-surface text-sm sm:text-base mt-0.5 font-label-numeric">
              {formatRupiah(summary.operationalCost ?? 2_800_000)}
            </span>
            <span className="text-[10px] text-on-surface-variant mt-0.5">Listrik, bensin, plastik</span>
          </div>
        </div>
      </div>
    </div>
  );
}

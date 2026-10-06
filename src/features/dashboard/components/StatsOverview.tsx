import Link from "next/link";
import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import type { DashboardSummary } from "@/features/dashboard/types";

export function StatsOverview({ summary }: { summary: DashboardSummary }) {
  const avgTicket = summary.transaksiHariIni > 0
    ? Math.round(summary.omsetHariIni / summary.transaksiHariIni)
    : 0;

  const target = summary.targetHarian ?? 2_000_000;
  const targetPct = Math.min(100, Math.round((summary.omsetHariIni / target) * 100));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
      <div className="bg-surface-container-lowest p-space-md rounded-2xl flex flex-col justify-between border border-surface-container/60 shadow-xs hover:border-primary/30 transition-all">
        <div>
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-ui text-xs text-on-surface-variant uppercase tracking-wider">
              Omzet Hari Ini
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl text-primary bg-primary-fixed/50">
              <Icon name="receipt_long" className="text-base" />
            </span>
          </div>

          <div className="font-label-numeric text-headline-lg text-on-surface tracking-tight font-bold">
            {formatRupiah(summary.omsetHariIni)}
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="inline-flex items-center gap-0.5 px-2 py-0.5 rounded-md bg-tertiary-fixed text-on-tertiary-fixed font-label-code text-xs font-bold">
              <Icon name="arrow_upward" className="text-[13px]" />
              +12.8%
            </span>
            <span className="text-body-sm text-on-surface-variant text-xs">
              vs kemarin ({formatRupiah(summary.omsetKemarin ?? 1_635_000)})
            </span>
          </div>
        </div>

        <div className="mt-space-md pt-space-xs border-t border-surface-container flex flex-col gap-1.5 text-xs text-on-surface-variant font-label-code">
          <div className="flex justify-between items-center">
            <span>{summary.transaksiHariIni} nota selesai</span>
            <span className="text-on-surface font-medium">Rata-rata: {formatRupiah(avgTicket)}</span>
          </div>
          <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
            <div
              className="bg-primary h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${targetPct}%` }}
              title={`Target: ${targetPct}%`}
            />
          </div>
        </div>
      </div>

      <div className="bg-surface-container-lowest p-space-md rounded-2xl flex flex-col justify-between border border-surface-container/60 shadow-xs hover:border-tertiary/30 transition-all">
        <div>
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-ui text-xs text-on-surface-variant uppercase tracking-wider">
              Laba Bersih Warung
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl text-tertiary bg-tertiary-fixed">
              <Icon name="trending_up" className="text-base" />
            </span>
          </div>

          <div className="font-label-numeric text-headline-lg text-tertiary tracking-tight font-bold">
            {formatRupiah(summary.labaBersih)}
          </div>

          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
            <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-code text-xs px-2 py-0.5 rounded-md font-bold">
              Margin {summary.margin.toLocaleString("id-ID")}%
            </span>
            <span className="text-body-sm text-on-surface-variant text-xs">
              {summary.produkTerjual} item terjual
            </span>
          </div>
        </div>

        <div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center justify-between text-xs text-on-surface-variant font-label-code">
          <span>Modal HPP kulak:</span>
          <span className="text-on-surface font-semibold">
            {formatRupiah(summary.omsetHariIni - summary.labaBersih)}
          </span>
        </div>
      </div>

      <Link
        href="/stok"
        className="group bg-surface-container-lowest p-space-md rounded-2xl flex flex-col justify-between border border-surface-container/60 shadow-xs hover:border-secondary hover:shadow-sm transition-all cursor-pointer"
      >
        <div>
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-ui text-xs text-on-surface-variant uppercase tracking-wider">
              Stok Menipis
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl text-secondary bg-secondary-fixed">
              <Icon name="warning" className="text-base" />
            </span>
          </div>

          <div className="font-label-numeric text-headline-lg text-on-surface tracking-tight font-bold group-hover:text-secondary transition-colors">
            {summary.stokMenipis} <span className="text-body-md font-normal text-on-surface-variant">produk</span>
          </div>

          <div className="mt-1.5">
            <span className="inline-flex items-center gap-1 text-xs text-secondary font-semibold bg-secondary-fixed/30 px-2 py-0.5 rounded-md">
              Beras 5kg, Minyak, Telur
            </span>
          </div>
        </div>

        <div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center justify-between text-xs text-secondary font-label-code">
          <span className="font-semibold">Buka daftar kulakan</span>
          <Icon name="arrow_forward" className="text-sm group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>

      <Link
        href="/pelanggan"
        className="group bg-surface-container-lowest p-space-md rounded-2xl flex flex-col justify-between border border-surface-container/60 shadow-xs hover:border-error hover:shadow-sm transition-all cursor-pointer"
      >
        <div>
          <div className="flex items-center justify-between mb-space-sm">
            <span className="font-label-ui text-xs text-on-surface-variant uppercase tracking-wider">
              Kasbon Belum Lunas
            </span>
            <span className="inline-flex items-center justify-center w-8 h-8 rounded-xl text-error bg-error-container">
              <Icon name="pending_actions" className="text-base" />
            </span>
          </div>

          <div className="font-label-numeric text-headline-lg text-error tracking-tight font-bold">
            {formatRupiah(summary.kasbonBelumLunas)}
          </div>

          <div className="mt-1.5 text-xs text-on-surface-variant">
            <span>3 pelanggan aktif (Pak RT, Bu Endang...)</span>
          </div>
        </div>

        <div className="mt-space-md pt-space-xs border-t border-surface-container flex items-center justify-between text-xs text-error font-label-code">
          <span className="font-semibold">Kelola buku kasbon</span>
          <Icon name="arrow_forward" className="text-sm group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>
    </div>
  );
}

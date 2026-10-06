import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import {
  StatsOverview,
  SalesChart,
  RecentTransactions,
  TopProducts,
  PaymentBreakdown,
  getDashboardData,
} from "@/features/dashboard";

export const metadata: Metadata = {
  title: "Dashboard Kasir — Warung Bu Sari",
};

export default async function DashboardPage() {
  const { summary, salesWeek, recentTransactions, topProducts, paymentStats } =
    await getDashboardData();

  return (
    <div className="flex flex-col w-full gap-space-lg pb-10">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-surface-container/60 shadow-xs">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed font-label-code text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
              Toko Buka • Shift Pagi
            </span>
            <span className="font-label-code text-xs text-on-surface-variant">
              Kasir: Bu Sari (Pemilik)
            </span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight font-bold">
            Selamat datang, Bu Sari 👋
          </h1>
          <p className="text-body-sm text-on-surface-variant">
            Pantau arus kas, stok sembako, dan transaksi harian Warung Bu Sari secara real-time.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/kasir"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-primary text-on-primary font-label-ui text-xs font-bold hover:bg-primary-container transition-all active:scale-95 shadow-sm cursor-pointer"
          >
            <Icon name="point_of_sale" className="text-base" />
            <span>+ Buka Kasir (F2)</span>
          </Link>
          <Link
            href="/pelanggan"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-ui text-xs font-semibold border border-surface-container transition-all cursor-pointer"
          >
            <Icon name="history_edu" className="text-base text-secondary" />
            <span>Catat Kasbon</span>
          </Link>
          <Link
            href="/stok"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-ui text-xs font-semibold border border-surface-container transition-all cursor-pointer"
          >
            <Icon name="inventory_2" className="text-base text-primary" />
            <span>Kulak Barang</span>
          </Link>
          <Link
            href="/laporan"
            className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-label-ui text-xs font-semibold border border-surface-container transition-all cursor-pointer"
          >
            <Icon name="monitoring" className="text-base text-tertiary" />
            <span>Buku Kas</span>
          </Link>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3.5 px-space-md rounded-xl bg-secondary-fixed/30 border border-secondary/30">
        <div className="flex items-center gap-2.5">
          <span className="w-8 h-8 rounded-lg bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center shrink-0">
            <Icon name="warning" className="text-base" />
          </span>
          <div className="flex flex-col sm:flex-row sm:items-center sm:gap-2 text-xs">
            <span className="font-bold text-on-surface">Peringatan Operasional:</span>
            <span className="text-on-surface-variant">
              8 produk butuh kulakan segera & 2 kasbon (Rp 415.000) siap ditagih minggu ini.
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/stok"
            className="text-xs font-label-ui font-bold text-secondary hover:underline"
          >
            Cek Stok Menipis →
          </Link>
        </div>
      </div>

      <StatsOverview summary={summary} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7 flex flex-col gap-space-lg">
          <SalesChart data={salesWeek} />
          <RecentTransactions data={recentTransactions} />
        </div>

        <div className="lg:col-span-5 flex flex-col gap-space-lg">
          <PaymentBreakdown stats={paymentStats} />
          <TopProducts data={topProducts} />
        </div>
      </div>
    </div>
  );
}

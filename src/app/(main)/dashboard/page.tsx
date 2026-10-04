import type { Metadata } from "next";
import {
  StatsOverview,
  SalesChart,
  RecentTransactions,
  TopProducts,
  getDashboardData,
} from "@/features/dashboard";

export const metadata: Metadata = {
  title: "Dashboard",
};

/** Dashboard kasir (setelah login, dalam AppShell). */
export default async function DashboardPage() {
  const { summary, salesWeek, recentTransactions, topProducts } =
    await getDashboardData();

  return (
    <div className="flex flex-col w-full gap-space-md">
      <div className="flex flex-col gap-space-xs">
        <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
          Selamat datang, Bu Sari
        </h1>
        <p className="text-body-md text-on-surface-variant">
          Ringkasan operasional Warung Bu Sari hari ini
        </p>
      </div>
      <StatsOverview summary={summary} />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <SalesChart data={salesWeek} />
          <RecentTransactions data={recentTransactions} />
        </div>
        <div className="lg:col-span-5">
          <TopProducts data={topProducts} />
        </div>
      </div>
    </div>
  );
}
import { Suspense } from "react";
import type { Metadata } from "next";
import { KasirScreen } from "@/features/kasir";

export const metadata: Metadata = {
  title: "Kasir Penjualan",
};

export default function KasirPage() {
  return (
    <Suspense fallback={<div className="p-8 text-on-surface-variant text-sm">Memuat kasir...</div>}>
      <KasirScreen />
    </Suspense>
  );
}
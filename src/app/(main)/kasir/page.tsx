import type { Metadata } from "next";
import { KasirScreen } from "@/features/kasir";

export const metadata: Metadata = {
  title: "Kasir Penjualan",
};

export default function KasirPage() {
  return <KasirScreen />;
}
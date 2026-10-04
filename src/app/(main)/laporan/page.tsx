import type { Metadata } from "next";
import { LaporanScreen } from "@/features/laporan";

export const metadata: Metadata = {
  title: "Laporan Kas",
};

export default function LaporanPage() {
  return <LaporanScreen />;
}
import type { Metadata } from "next";
import { PelangganScreen } from "@/features/pelanggan";

export const metadata: Metadata = {
  title: "Pelanggan",
};

export default function PelangganPage() {
  return <PelangganScreen />;
}
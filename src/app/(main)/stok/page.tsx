import type { Metadata } from "next";
import { StokScreen } from "@/features/stok";

export const metadata: Metadata = {
  title: "Stok Barang",
};

export default function StokPage() {
  return <StokScreen />;
}
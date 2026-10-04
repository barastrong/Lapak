import type { Metadata } from "next";
import { ProdukScreen } from "@/features/produk";

export const metadata: Metadata = {
  title: "Katalog Produk",
};

export default function ProdukPage() {
  return <ProdukScreen />;
}
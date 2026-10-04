import type { Metadata } from "next";
import { PengaturanScreen } from "@/features/pengaturan";

export const metadata: Metadata = {
  title: "Pengaturan",
};

export default function PengaturanPage() {
  return <PengaturanScreen />;
}
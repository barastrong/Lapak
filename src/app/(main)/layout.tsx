import type { ReactNode } from "react";
import { AppShell } from "@/components/layout/AppShell";

/** Layout semua halaman aplikasi kasir: pasang AppShell (Sidebar + Header) sekali. */
export default function MainLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
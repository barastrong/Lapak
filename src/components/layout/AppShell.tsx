import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

/** Kerangka utama halaman ter-aplikasi: Sidebar + Header tetap, konten di tengah. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="pl-60 min-h-screen bg-surface">
      <Sidebar />
      <Header />
      <main className="w-full pt-16">
        <div className="max-w-[1240px] mx-auto px-gutter-desktop py-gutter-desktop">{children}</div>
      </main>
    </div>
  );
}
import type { ReactNode } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

/** Kerangka utama halaman ter-aplikasi: Sidebar + Header tetap, konten di tengah. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="pl-60 min-h-screen bg-surface print:pl-0 print:bg-white">
      <div className="print:hidden">
        <Sidebar />
        <Header />
      </div>
      <main className="w-full pt-16 print:pt-0">
        <div className="max-w-[1240px] mx-auto px-gutter-desktop py-gutter-desktop print:p-0 print:max-w-none">{children}</div>
      </main>
    </div>
  );
}
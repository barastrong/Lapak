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
        <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 print:p-0 print:max-w-none">
          {children}
        </div>
      </main>
    </div>
  );
}
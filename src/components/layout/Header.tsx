"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

/** Header atas halaman (shift, kas awal, pencarian cepat, tombol aksi). */
export function Header() {
  const router = useRouter();
  const [headerSearch, setHeaderSearch] = useState("");

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && headerSearch.trim()) {
      router.push(`/kasir?q=${encodeURIComponent(headerSearch.trim())}`);
    }
  };

  return (
    <header className="fixed top-0 left-60 right-0 h-16 bg-surface-container-lowest z-40 px-space-lg flex items-center justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex items-center gap-space-md">
        <div className="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant">
          <Icon name="wb_sunny" className="text-primary text-base" />
          <span>{siteConfig.shift}</span>
        </div>
        <span className="text-outline-variant font-label-code text-label-code hidden md:inline"></span>
        <div className="hidden md:flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant">
          <Icon name="payments" className="text-tertiary text-base" />
          <span>Kas awal:</span>
          <span className="font-label-numeric text-label-numeric text-on-surface">
            Rp {siteConfig.openingCash.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-space-md">
        <div className="relative hidden lg:flex items-center">
          <Icon name="search" className="absolute left-3 text-on-surface-variant text-base" />
          <input
            className="bg-surface-container-low pl-9 pr-4 py-1.5 rounded-lg text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all placeholder:text-on-surface-variant text-xs"
            placeholder="Cari produk / barcode (Enter)..."
            type="text"
            value={headerSearch}
            onChange={(e) => setHeaderSearch(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
        </div>
        <Link
          href="/kasir"
          className="bg-secondary-container hover:bg-secondary-container/80 text-on-secondary-container px-space-sm py-1.5 rounded-lg flex items-center gap-space-xs font-label-code text-label-code cursor-pointer transition-colors shadow-xs"
          title="Buka Kasir Langsung"
        >
          <Icon name="bolt" className="text-base" />
          <span>Bayar Cepat</span>
        </Link>
        <Link
          href="/pengaturan"
          className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 hover:bg-primary-container transition-colors"
          title="Pengaturan Profil"
        >
          <Icon name="person" className="text-on-primary text-lg" />
        </Link>
      </div>
    </header>
  );
}
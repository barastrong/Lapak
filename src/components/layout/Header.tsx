import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

/** Header atas halaman (shift, kas awal, pencarian cepat, tombol aksi). */
export function Header() {
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
            className="bg-surface-container-low pl-9 pr-4 py-1.5 rounded-lg text-body-sm text-on-surface focus:outline-none focus:ring-1 focus:ring-primary w-64 transition-all placeholder:text-on-surface-variant"
            placeholder="Cari menu atau kode barcode..."
            type="text"
          />
        </div>
        <div className="bg-secondary-container text-on-secondary-container px-space-sm py-1.5 rounded-lg flex items-center gap-space-xs font-label-code text-label-code">
          <Icon name="bolt" className="text-base" />
          <span>Bayar Cepat</span>
        </div>
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
          <Icon name="person" className="text-on-primary text-lg" />
        </div>
      </div>
    </header>
  );
}
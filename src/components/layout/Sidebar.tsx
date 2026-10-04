import { NAV_ITEMS } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { SidebarBrand } from "@/components/layout/SidebarBrand";
import { SidebarItem } from "@/components/layout/SidebarItem";
import { StoreSwitcher } from "@/components/layout/StoreSwitcher";
import { LogoutButton } from "@/components/layout/LogoutButton";
import { Icon } from "@/components/ui/Icon";

/** Sidebar tetap (fixed kiri) berisi brand, switch toko, dan navigasi utama. */
export function Sidebar() {
  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-surface-container-lowest z-50 flex flex-col justify-between shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="flex flex-col">
        <SidebarBrand />
        <div className="px-space-md pb-space-md">
          <StoreSwitcher />
        </div>
        <nav className="flex flex-col gap-space-xs px-space-md">
          {NAV_ITEMS.map((item) => (
            <SidebarItem key={item.href} item={item} />
          ))}
          <LogoutButton />
        </nav>
      </div>
      <div className="p-space-md flex flex-col gap-space-sm">
        <div className="bg-surface-container-low rounded-xl p-space-sm flex items-center justify-between">
          <div className="flex items-center gap-space-sm min-w-0">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
              <Icon name="person" className="text-on-primary text-lg" />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-label-ui text-label-ui text-on-surface truncate">
                {siteConfig.ownerName}
              </span>
              <span className="text-body-sm text-on-surface-variant truncate">
                {siteConfig.ownerRole}
              </span>
            </div>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-tertiary shrink-0" title="Kasir Aktif" />
        </div>
        <div className="flex items-center justify-between px-space-xs text-on-surface-variant">
          <span className="text-body-sm flex items-center gap-space-xs">
            <span className="w-2 h-2 rounded-full bg-tertiary-container"></span>
            Online / Buka
          </span>
          <a
            href="#"
            className="flex items-center gap-space-xs font-label-code text-label-code text-on-surface-variant hover:text-primary transition-colors"
          >
            <Icon name="help" className="text-sm" />
            Bantuan
          </a>
        </div>
      </div>
    </aside>
  );
}
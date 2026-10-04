import { Icon } from "@/components/ui/Icon";
import { siteConfig } from "@/config/site";

/** Bilah status kios bawah (printer, laci uang, shortcut). */
export function KioskStatusBar() {
  return (
    <div className="bg-surface-container-low p-space-sm rounded-xl flex items-center justify-between text-on-surface-variant font-label-code text-xs">
      <div className="flex items-center gap-space-sm">
        <Icon name="print" className="text-primary text-base" />
        <span>
          Printer Kasir:{" "}
          <strong className="text-on-surface font-normal">{siteConfig.printer}</strong>
        </span>
      </div>
      <div className="flex items-center gap-space-md">
        <span>
          Laci Uang: <span className="text-tertiary font-semibold">{siteConfig.cashDrawer}</span>
        </span>
        <span className="hidden sm:inline">
          Shortcut: <kbd className="bg-surface-container-highest px-1 rounded">F1-F12</kbd>
        </span>
      </div>
    </div>
  );
}
import { Icon } from "@/components/ui/Icon";
import type { BusinessType } from "@/features/landing/types";

/** Strip jenis usaha (Warung Makan, Laundry, dst). */
export function BusinessTypeStrip({ items }: { items: BusinessType[] }) {
  return (
    <section className="w-full bg-surface-container-low py-space-lg px-space-md">
      <div className="max-w-[1240px] mx-auto flex flex-col md:flex-row md:items-center justify-between gap-space-md">
        <div className="flex items-center gap-space-xs shrink-0">
          <span className="font-headline-sm text-headline-sm text-on-surface">
            Dirancang untuk berbagai jenis usaha harian:
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-space-sm w-full md:w-auto">
          {items.map((item) => (
            <div
              key={item.name}
              className={`bg-surface-container-lowest p-space-sm rounded-xl shadow-sm flex flex-col gap-0.5 hover:bg-surface-container transition-colors ${
                items.length % 2 !== 0 && item === items[items.length - 1]
                  ? "col-span-2 sm:col-span-1"
                  : ""
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-label-ui text-label-ui font-bold text-on-surface">
                  {item.name}
                </span>
                <span className={`w-2 h-2 rounded-full ${item.dotClassName}`} />
              </div>
              <span className="text-[0.75rem] text-on-surface-variant">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Ikon dekoratif kecil — dipakai dalam mockup modul (tanpa markup besar di page). */
export function MiniIcon({ name, className }: { name: string; className?: string }) {
  return <Icon name={name} className={className} />;
}
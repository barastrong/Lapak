import { Icon } from "@/components/ui/Icon";
import { formatRupiah } from "@/lib/format";
import type { ShoppingItem } from "@/features/stok/types";

type ShoppingListProps = {
  items: ShoppingItem[];
  onToggle: (id: string) => void;
};

/** Daftar belanja pasar subuh (beri centang = sudah dibeli). */
export function ShoppingList({ items, onToggle }: ShoppingListProps) {
  return (
    <div className="flex flex-col gap-space-xs">
      {items.map((i) => (
        <label
          key={i.id}
          className="flex items-start gap-space-sm p-space-sm rounded-lg hover:bg-surface-container-low transition-colors cursor-pointer group bg-surface-container-lowest"
        >
          <input
            type="checkbox"
            className="mt-1 w-4 h-4 rounded accent-primary"
            checked={i.checked}
            onChange={() => onToggle(i.id)}
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="font-label-ui text-label-ui text-on-surface group-hover:text-primary transition-colors">
                {i.name}
              </span>
              <span className="font-label-numeric text-label-code text-on-surface bg-surface-container-high px-2 py-0.5 rounded text-xs font-bold">
                {i.qty}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs mt-0.5">
              <span className="text-on-surface-variant flex items-center gap-1">
                <Icon name={i.supplierIcon} className="text-xs" />
                {i.supplier}
              </span>
              <span className="font-label-numeric text-on-surface-variant">
                ~{formatRupiah(i.estPrice)}
              </span>
            </div>
          </div>
        </label>
      ))}
    </div>
  );
}
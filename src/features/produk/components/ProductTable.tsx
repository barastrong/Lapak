import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import type { Product } from "@/types/product";

type ProductTableProps = {
  products: Product[];
  selected: string[];
  onToggle: (id: string) => void;
  onToggleAll: (ids: string[]) => void;
  onEdit?: (product: Product) => void;
  onHistory?: (product: Product) => void;
};

export function ProductTable({
  products,
  selected,
  onToggle,
  onToggleAll,
  onEdit,
  onHistory,
}: ProductTableProps) {
  const allSelected = products.length > 0 && products.every((p) => selected.includes(p.id));

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low border-b border-surface-container text-on-surface-variant font-label-code text-xs uppercase tracking-wider select-none">
              <th className="py-3.5 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                  checked={allSelected}
                  onChange={() => onToggleAll(products.map((p) => p.id))}
                  aria-label="Pilih semua"
                />
              </th>
              <th className="py-3.5 px-4 min-w-[280px]">Nama Produk & SKU</th>
              <th className="py-3.5 px-4 min-w-[130px]">Kategori</th>
              <th className="py-3.5 px-4 text-right min-w-[140px]">Harga Beli (Kulak)</th>
              <th className="py-3.5 px-4 text-right min-w-[140px]">Harga Jual Ecer</th>
              <th className="py-3.5 px-4 text-right min-w-[170px]">Margin Untung</th>
              <th className="py-3.5 px-4 text-center min-w-[130px]">Sisa Stok</th>
              <th className="py-3.5 px-4 text-center min-w-[110px]">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-surface-container text-body-sm text-on-surface">
            {products.map((p) => {
              const margin = p.sellPrice > 0 ? ((p.sellPrice - p.buyPrice) / p.sellPrice) * 100 : 0;
              const lowStock = p.stock < p.minStock;
              const profitAmount = p.sellPrice - p.buyPrice;

              return (
                <tr key={p.id} className="hover:bg-surface-bright transition-colors group">
                  <td className="py-3.5 px-4 text-center">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded accent-primary cursor-pointer"
                      checked={selected.includes(p.id)}
                      onChange={() => onToggle(p.id)}
                      aria-label={`Pilih ${p.name}`}
                    />
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary font-bold shrink-0">
                        <Icon name={p.icon} className="text-lg" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-sm text-body-md font-semibold text-on-surface group-hover:text-primary transition-colors">
                          {p.name}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-on-surface-variant">
                            Satuan: {p.unitLabel}
                          </span>
                          <span className="text-outline-variant text-xs">•</span>
                          <span className="font-label-code text-[11px] text-on-surface-variant bg-surface-container px-1.5 py-0.5 rounded">
                            {p.sku}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container-high text-on-surface">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-label-numeric text-on-surface-variant whitespace-nowrap">
                    {formatRupiah(p.buyPrice)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-label-numeric font-bold text-on-surface whitespace-nowrap">
                    {formatRupiah(p.sellPrice)}
                  </td>
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-1 font-label-code text-xs px-2.5 py-1 rounded-full font-bold ${
                        margin >= 18
                          ? "bg-tertiary-fixed text-on-tertiary-fixed"
                          : margin >= 12
                          ? "bg-tertiary-container/20 text-tertiary"
                          : "bg-secondary-fixed text-on-secondary-fixed"
                      }`}
                    >
                      <Icon name="trending_up" className="text-xs" />
                      <span>+{margin.toFixed(1).replace(".", ",")}%</span>
                      <span className="opacity-80 font-normal">({formatRupiah(profitAmount)})</span>
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    {lowStock ? (
                      <span className="inline-flex items-center gap-1 font-label-code text-xs text-error bg-error-container px-2.5 py-0.5 rounded-full font-bold">
                        <Icon name="warning" className="text-xs" />
                        <span>Sisa {p.stock}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center font-label-code text-xs text-on-surface bg-surface-container px-2.5 py-0.5 rounded-full font-medium">
                        {p.stock} {p.unitLabel}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => onEdit?.(p)}
                        className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-primary hover:text-on-primary text-primary flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-surface-container"
                        title="Ubah Produk"
                        aria-label={`Ubah produk ${p.name}`}
                      >
                        <Icon name="edit" className="text-lg" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onHistory?.(p)}
                        className="w-9 h-9 rounded-xl bg-surface-container-low hover:bg-secondary hover:text-on-secondary text-on-surface-variant flex items-center justify-center transition-all cursor-pointer shadow-2xs border border-surface-container"
                        title="Riwayat Stok"
                        aria-label={`Riwayat stok ${p.name}`}
                      >
                        <Icon name="history" className="text-lg" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

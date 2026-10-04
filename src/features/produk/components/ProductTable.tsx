import { formatRupiah } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import type { Product } from "@/types/product";

type ProductTableProps = {
  products: Product[];
  selected: string[];
  onToggle: (id: string) => void;
  onToggleAll: (ids: string[]) => void;
};

/** Tabel dense katalog produk dengan baris yang bisa dipilih massal. */
export function ProductTable({ products, selected, onToggle, onToggleAll }: ProductTableProps) {
  const allSelected = products.length > 0 && products.every((p) => selected.includes(p.id));
  return (
    <div className="bg-white rounded-xl shadow-sm border border-on-surface/10 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F4F4F0] border-b border-on-surface/15 text-on-surface-variant font-label-code text-[0.8rem] uppercase tracking-wider select-none">
              <th className="py-3 px-4 w-10 text-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded accent-primary cursor-pointer"
                  checked={allSelected}
                  onChange={() => onToggleAll(products.map((p) => p.id))}
                  aria-label="Pilih semua"
                />
              </th>
              <th className="py-3 px-4 min-w-[280px]">Nama Produk & Satuan</th>
              <th className="py-3 px-4 min-w-[130px]">Kategori</th>
              <th className="py-3 px-4 text-right min-w-[140px]">Harga Beli (Kulak)</th>
              <th className="py-3 px-4 text-right min-w-[140px]">Harga Jual Ecer</th>
              <th className="py-3 px-4 text-right min-w-[170px]">Margin Untung</th>
              <th className="py-3 px-4 text-center min-w-[130px]">Sisa Stok</th>
              <th className="py-3 px-4 text-center min-w-[110px]">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-on-surface/10 text-body-sm">
            {products.map((p) => {
              const margin = p.sellPrice > 0 ? ((p.sellPrice - p.buyPrice) / p.sellPrice) * 100 : 0;
              const lowStock = p.stock < p.minStock;
              return (
                <tr key={p.id} className="hover:bg-[#FAFAF7] transition-colors group">
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
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded bg-[#FAFAF7] border border-on-surface/10 flex items-center justify-center text-primary font-bold text-xs shrink-0">
                        <Icon name={p.icon} className="text-base" />
                      </div>
                      <div className="flex flex-col min-w-0">
                        <span className="font-headline-sm text-[0.975rem] font-semibold text-on-surface group-hover:text-primary transition-colors">
                          {p.name}
                        </span>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-body-sm text-on-surface-variant">
                            Satuan {p.unitLabel}
                          </span>
                          <span className="text-on-surface-variant/60 text-xs">•</span>
                          <span className="font-label-code text-[0.75rem] text-on-surface-variant bg-[#FAFAF7] border border-on-surface/10 px-1.5 py-0.2 rounded">
                            {p.sku}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-[#FAFAF7] text-on-surface border border-on-surface/10">
                      {p.category}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right font-label-numeric text-on-surface-variant">
                    {formatRupiah(p.buyPrice)}
                  </td>
                  <td className="py-3.5 px-4 text-right font-label-numeric font-bold text-on-surface">
                    {formatRupiah(p.sellPrice)}
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="inline-flex items-center gap-1 font-label-code text-[0.8rem] text-tertiary bg-tertiary-fixed/40 border border-tertiary/30 px-2 py-0.5 rounded">
                      <Icon name="trending_up" className="text-xs" />
                      +{margin.toFixed(1).replace(".", ",")}% (Rp {(p.sellPrice - p.buyPrice).toLocaleString("id-ID")})
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    {lowStock ? (
                      <span className="inline-flex items-center gap-1 font-label-code text-[0.8rem] text-error bg-error-container/60 border border-error/30 px-2 py-0.5 rounded font-bold">
                        <Icon name="warning" className="text-xs" />
                        Sisa {p.stock} {p.unitLabel}
                      </span>
                    ) : (
                      <span className="font-label-code text-[0.825rem] text-on-surface font-medium">
                        {p.stock} {p.unitLabel}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 text-center">
                    <div className="inline-flex items-center gap-1">
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-primary/10 text-primary transition-colors"
                        title="Ubah Harga Cepat"
                      >
                        <Icon name="edit" className="text-base" />
                      </button>
                      <button
                        type="button"
                        className="p-1.5 rounded hover:bg-on-surface-variant/10 text-on-surface-variant transition-colors"
                        title="Riwayat Kulak"
                      >
                        <Icon name="history" className="text-base" />
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
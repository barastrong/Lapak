import { formatRupiah } from "@/lib/format";
import type { Product } from "@/types/product";

type ProductGridProps = {
  products: Product[];
  onAdd: (product: Product) => void;
};

/** Grid 4-kolom produk kasir (satuan kartu di sini, kosong ditandai pesan singkat). */
export function ProductGrid({ products, onAdd }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="bg-surface-container-lowest rounded-xl shadow-sm p-6 text-center text-on-surface-variant text-body-sm">
        Tidak ada produk yang cocok.
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-space-sm">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onAdd={onAdd} />
      ))}
    </div>
  );
}

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div
      onClick={() => onAdd(product)}
      className="bg-surface-container-lowest p-space-sm rounded-xl shadow-sm hover:shadow-md transition-all flex flex-col justify-between group cursor-pointer active:scale-[0.98]"
    >
      <div className="relative overflow-hidden rounded-lg mb-2 bg-surface-container-low h-28 flex items-center justify-center">
        <span className="material-symbols-outlined text-[3rem] text-primary group-hover:scale-105 transition-transform duration-300">
          {product.icon}
        </span>
        <span className="absolute top-1.5 left-1.5 bg-surface-container-lowest/90 px-1.5 py-0.5 rounded font-label-code text-[11px] text-on-surface-variant">
          #{product.sku}
        </span>
      </div>
      <div className="flex flex-col flex-1 justify-between">
        <div>
          <h2 className="font-headline-sm text-body-md text-on-surface line-clamp-1 font-semibold">
            {product.name}
          </h2>
          <span className="text-xs text-on-surface-variant">
            Stok: {product.stock} {product.unitLabel}
          </span>
        </div>
        <div className="mt-2.5 pt-2 flex items-center justify-between">
          <span className="font-label-numeric text-body-md text-primary font-bold">
            {formatRupiah(product.sellPrice)}
          </span>
          <button
            type="button"
            className="w-7 h-7 rounded-lg bg-surface-container hover:bg-primary-container hover:text-on-primary text-primary flex items-center justify-center transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(product);
            }}
            aria-label={`Tambah ${product.name} ke keranjang`}
          >
            <span className="material-symbols-outlined text-base">add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
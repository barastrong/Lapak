import { Icon } from "@/components/ui/Icon";

type ProductFilterBarProps = {
  search: string;
  onSearch: (s: string) => void;
  category: string;
  onCategory: (c: string) => void;
  marginTier: string;
  onMarginTier: (t: string) => void;
  onReset: () => void;
  categories: string[];
};

/** Bilah filter produk: pencarian + dropdown kategori & margin + tombol reset. */
export function ProductFilterBar({
  search,
  onSearch,
  category,
  onCategory,
  marginTier,
  onMarginTier,
  onReset,
  categories,
}: ProductFilterBarProps) {
  return (
    <div className="bg-white rounded-xl p-3 shadow-sm border border-on-surface/10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
      <div className="flex-1 flex flex-wrap md:flex-nowrap items-center gap-2">
        <div className="relative w-full md:w-80">
          <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none" />
          <input
            className="w-full bg-[#FAFAF7] border border-on-surface/15 rounded-lg pl-9 pr-8 py-2 text-body-sm text-on-surface placeholder:text-on-surface-variant/70 focus:outline-none focus:border-primary focus:bg-white transition-all"
            placeholder="Cari berdasarkan nama produk, SKU, atau barcode..."
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
          <kbd className="absolute right-2.5 top-1/2 -translate-y-1/2 font-label-code text-[0.7rem] bg-[#E2E4E8] text-on-surface-variant px-1 py-0.5 rounded">
            /
          </kbd>
        </div>
        <SelectBox
          value={category}
          onChange={onCategory}
          icon="expand_more"
          options={categories}
        />
        <SelectBox
          value={marginTier}
          onChange={onMarginTier}
          icon="tune"
          options={[
            { value: "all", label: "Semua Margin Keuntungan" },
            { value: "low", label: "Margin Rendah (<12%)" },
            { value: "standard", label: "Margin Standar (12% - 18%)" },
            { value: "high", label: "Margin Tinggi (>18%)" },
          ]}
        />
        <button
          type="button"
          onClick={onReset}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-on-surface-variant hover:text-on-surface font-label-ui text-label-ui"
        >
          <Icon name="refresh" className="text-sm" />
          <span>Reset</span>
        </button>
      </div>
      <div className="flex items-center justify-end gap-2 border-t lg:border-t-0 pt-2 lg:pt-0 border-on-surface/10">
        <button
          type="button"
          className="flex items-center gap-2 bg-[#FAFAF7] hover:bg-[#F2B705]/10 text-on-surface border border-on-surface/15 px-3.5 py-2 rounded-lg font-label-ui text-label-ui transition-colors"
        >
          <Icon name="print" className="text-base text-secondary" />
          <span>Cetak daftar harga kertas (PDF)</span>
        </button>
      </div>
    </div>
  );
}

function SelectBox({
  value,
  onChange,
  icon,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  icon: string;
  options: Array<{ value: string; label: string }> | string[];
}) {
  const opts = options.map((o) => (typeof o === "string" ? { value: o, label: o } : o));
  return (
    <div className="relative w-full sm:w-auto">
      <select
        className="w-full bg-[#FAFAF7] border border-on-surface/15 rounded-lg pl-3 pr-8 py-2 text-body-sm text-on-surface focus:outline-none focus:border-primary appearance-none cursor-pointer"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {opts.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      <span className="material-symbols-outlined absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant pointer-events-none">
        {icon}
      </span>
    </div>
  );
}
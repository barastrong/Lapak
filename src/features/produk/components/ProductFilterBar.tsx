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
  const handlePrintPriceList = () => {
    window.print();
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-md shadow-sm border border-surface-container flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
      <div className="flex-1 flex flex-wrap md:flex-nowrap items-center gap-2">
        <div className="relative w-full md:w-80">
          <Icon
            name="search"
            className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-lg pointer-events-none"
          />
          <input
            className="w-full bg-surface-container-low border border-surface-container rounded-xl pl-9 pr-3 py-2 text-body-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:bg-surface-container-lowest transition-all"
            placeholder="Cari berdasarkan nama produk, SKU, atau barcode..."
            type="text"
            value={search}
            onChange={(e) => onSearch(e.target.value)}
          />
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
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-on-surface-variant hover:text-on-surface font-label-ui text-label-ui rounded-lg hover:bg-surface-container transition-colors cursor-pointer"
        >
          <Icon name="refresh" className="text-sm" />
          <span>Reset</span>
        </button>
      </div>
      <div className="flex items-center justify-end gap-2 border-t lg:border-t-0 pt-2 lg:pt-0 border-surface-container">
        <button
          type="button"
          onClick={handlePrintPriceList}
          className="flex items-center gap-2 bg-surface-container-low hover:bg-surface-container text-on-surface border border-surface-container px-3.5 py-2 rounded-xl font-label-ui text-label-ui transition-colors cursor-pointer shadow-xs"
        >
          <Icon name="print" className="text-base text-primary" />
          <span>Cetak Daftar Harga</span>
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
        className="w-full bg-surface-container-low border border-surface-container rounded-xl pl-3 pr-8 py-2 text-body-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-primary appearance-none cursor-pointer"
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

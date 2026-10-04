import { Icon } from "@/components/ui/Icon";

type BulkActionBarProps = {
  count: number;
  onHapus: () => void;
};

/** Bilah aksi massal muncul saat ada produk terpilih (nonaktifkan/cetak label). */
export function BulkActionBar({ count, onHapus }: BulkActionBarProps) {
  if (count === 0) return null;
  return (
    <div className="bg-on-surface text-white px-5 py-3 rounded-xl shadow-lg flex items-center justify-between transition-all duration-200">
      <div className="flex items-center gap-3">
        <span className="w-2.5 h-2.5 bg-secondary-container rounded-full animate-pulse"></span>
        <span className="font-label-ui text-label-ui">
          <span id="selectedCount">{count}</span> produk terpilih
        </span>
      </div>
      <div className="flex items-center gap-2">
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-label-ui text-xs transition-colors flex items-center gap-1"
        >
          <Icon name="percent" className="text-sm" />
          Ubah Margin Massal
        </button>
        <button
          type="button"
          className="px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 font-label-ui text-xs transition-colors flex items-center gap-1"
        >
          <Icon name="print" className="text-sm" />
          Cetak Label Rak
        </button>
        <button
          type="button"
          onClick={onHapus}
          className="px-3 py-1.5 rounded-lg bg-error hover:bg-error-container font-label-ui text-xs text-white transition-colors flex items-center gap-1"
        >
          <Icon name="delete" className="text-sm" />
          Nonaktifkan
        </button>
      </div>
    </div>
  );
}
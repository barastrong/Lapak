import { Icon } from "@/components/ui/Icon";
import { cn } from "@/lib/utils";
import type { StockItem } from "@/features/stok/types";

export type StockStatusTone = Record<string, string>;

/** Map warna sesuai status stok (Habis/Menipis/Aman/Berlebih). */
const STATUS_TONE: StockStatusTone = {
  Habis: "bg-error-container text-error",
  Menipis: "bg-secondary-container/40 text-on-secondary-container",
  Aman: "bg-tertiary-fixed text-tertiary",
  Berlebih: "bg-surface-container-high text-primary",
};

const STOCK_COLOR: StockStatusTone = {
  Habis: "text-error",
  Menipis: "text-secondary",
  Aman: "text-tertiary",
  Berlebih: "text-tertiary",
};

type StockTableProps = {
  items: StockItem[];
  query: string;
  onQuery: (s: string) => void;
  onOpenAdjustment: (item: StockItem) => void;
};

/** Tabel data stok & pergerakan rak, dengan pencarian live. */
export function StockTable({ items, query, onQuery, onOpenAdjustment }: StockTableProps) {
  return (
    <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm">
        <div className="flex items-center gap-space-xs">
          <Icon name="warehouse" className="text-primary text-xl" />
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Data Stok & Pergerakan Rak
          </h2>
        </div>
        <div className="flex items-center gap-space-xs">
          <div className="bg-surface-container-low px-3 py-1.5 rounded-lg flex items-center gap-2">
            <Icon name="search" className="text-on-surface-variant text-sm" />
            <input
              className="bg-transparent text-body-sm text-on-surface focus:outline-none w-32 sm:w-44"
              placeholder="Cari nama atau kode..."
              type="text"
              value={query}
              onChange={(e) => onQuery(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="bg-surface-container-high hover:bg-surface-variant text-primary font-label-ui text-label-ui px-3 py-1.5 rounded-lg flex items-center gap-1 transition-all text-xs"
            onClick={() => onOpenAdjustment(items[0])}
          >
            <Icon name="edit_note" className="text-sm" />
            <span>Koreksi Fisik</span>
          </button>
        </div>
      </div>
      <div className="overflow-x-auto -mx-space-md px-space-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-surface-container-low text-on-surface-variant font-label-code text-xs">
              <th className="py-2.5 px-3 rounded-l-lg">NAMA BARANG</th>
              <th className="py-2.5 px-3">LOKASI RAK</th>
              <th className="py-2.5 px-3 text-right">STOK KINI</th>
              <th className="py-2.5 px-3 text-right">MINIMAL</th>
              <th className="py-2.5 px-3">TERAKHIR KULAK</th>
              <th className="py-2.5 px-3 text-center">STATUS</th>
              <th className="py-2.5 px-3 text-right rounded-r-lg">TINDAKAN</th>
            </tr>
          </thead>
          <tbody className="divide-y-0 text-body-sm">
            {items.map((row) => (
              <tr key={row.id} className="hover:bg-surface-container-low/50 transition-colors">
                <td className="py-3 px-3">
                  <div className="flex flex-col">
                    <span className="font-label-ui text-label-ui text-on-surface">{row.name}</span>
                    <span className="font-label-code text-xs text-on-surface-variant">{row.code}</span>
                  </div>
                </td>
                <td className="py-3 px-3">
                  <span className="bg-surface-container-high text-on-surface-variant px-2 py-0.5 rounded text-xs font-label-code">
                    {row.rack}
                  </span>
                </td>
                <td className={`py-3 px-3 text-right font-label-numeric font-bold ${STOCK_COLOR[row.status]}`}>
                  {row.stock} {row.unitLabel}
                </td>
                <td className="py-3 px-3 text-right font-label-numeric text-on-surface-variant">
                  {row.minStock} {row.unitLabel}
                </td>
                <td className="py-3 px-3 text-xs text-on-surface-variant">{row.lastRestock}</td>
                <td className="py-3 px-3 text-center">
                  <span
                    className={cn(
                      "px-2 py-0.5 rounded text-xs font-label-ui font-semibold inline-block",
                      STATUS_TONE[row.status]
                    )}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="py-3 px-3 text-right">
                  {row.status === "Habis" || row.status === "Menipis" ? (
                    <button
                      type="button"
                      className="text-primary hover:text-primary-container p-1 rounded hover:bg-surface-container transition-colors"
                      title="Tambah ke Catatan Pasar"
                    >
                      <Icon name="playlist_add" className="text-lg" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => onOpenAdjustment(row)}
                      className="text-on-surface-variant hover:text-on-surface p-1 rounded hover:bg-surface-container transition-colors"
                      title="Sesuaikan Stok"
                    >
                      <Icon name="edit" className="text-lg" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between pt-space-xs text-xs font-label-code text-on-surface-variant">
        <span>Menampilkan {items.length} dari 84 barang terdaftar</span>
        <div className="flex items-center gap-1">
          <button type="button" className="px-2 py-1 bg-surface-container-low rounded hover:bg-surface-container">
            Sebelumnya
          </button>
          <span className="px-2 py-1 font-bold text-on-surface">1</span>
          <button type="button" className="px-2 py-1 bg-surface-container-low rounded hover:bg-surface-container">
            Selanjutnya
          </button>
        </div>
      </div>
    </div>
  );
}
import { Icon } from "@/components/ui/Icon";
import type { FeatureModule } from "@/features/landing/types";

const MOCKUPS: Record<number, React.ReactNode> = {
  /** Mockup kecil layar kasir (3 produk fiktif) untuk modul Kasir. */
  0: (
    <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-space-xs select-none">
      <div className="flex items-center justify-between text-body-sm text-on-surface-variant bg-surface-container-lowest px-2 py-1.5 rounded-lg shadow-sm">
        <span className="font-label-ui text-[0.75rem]">Cari: &quot;Kopi...&quot;</span>
      </div>
      <div className="flex flex-col gap-1 my-1">
        {[
          ["Kopi Kapal Api Special", "Rp 3.500"],
          ["Rokok Gudang Garam Filter", "Rp 26.500"],
          ["Gula Pasir Gulaku 1kg", "Rp 17.000"],
        ].map(([name, price]) => (
          <div
            key={name}
            className="flex items-center justify-between bg-surface-container-lowest px-2 py-1 rounded text-[0.8rem] font-label-code"
          >
            <span>{name}</span>
            <span className="font-bold">{price}</span>
          </div>
        ))}
      </div>
      <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-between shadow-sm">
        <div>
          <span className="text-[0.7rem] text-on-surface-variant block">Total Kasir:</span>
          <span className="font-label-numeric text-headline-sm font-bold text-primary-container">
            Rp 77.000
          </span>
        </div>
        <button
          type="button"
          className="bg-primary-container text-on-primary font-label-ui text-[0.8125rem] px-3 py-1.5 rounded-lg font-bold shadow hover:bg-primary transition-colors"
        >
          Bayar Cepat
        </button>
      </div>
    </div>
  ),
  /** Mockup kecil daftar produk gudang untuk modul Stok. */
  1: (
    <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-space-xs select-none">
      <div className="flex items-center justify-between font-label-ui text-[0.75rem] text-on-surface-variant px-1 font-semibold">
        <span>PRODUK GUDANG</span>
        <span>SISA STOK</span>
      </div>
      <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-between shadow-sm">
        <div>
          <div className="font-label-code text-[0.8rem] font-bold text-on-surface">
            Beras Rojolele 5kg
          </div>
          <div className="text-[0.7rem] text-on-surface-variant">Modal: Rp 61.000 / sak</div>
        </div>
        <div className="text-right">
          <span className="font-label-code text-[0.85rem] font-bold text-on-surface">42 sak</span>
          <span className="block text-[0.65rem] text-tertiary-container font-semibold">Aman</span>
        </div>
      </div>
      <div className="bg-surface-container-lowest p-2 rounded-lg flex items-center justify-between shadow-sm">
        <div>
          <div className="font-label-code text-[0.8rem] font-bold text-on-surface">
            Minyak Goreng Kita 1L
          </div>
          <div className="text-[0.7rem] text-on-surface-variant">Min. batas: 5 botol</div>
        </div>
        <div className="text-right">
          <span className="font-label-code text-[0.85rem] font-bold text-error">2 btl</span>
          <span className="inline-block bg-error-container text-on-error-container text-[0.65rem] font-bold px-1.5 py-0.5 rounded">
            Menipis!
          </span>
        </div>
      </div>
      <div className="bg-secondary-fixed/40 p-2 rounded-lg flex items-center justify-between">
        <span className="font-label-ui text-[0.75rem] text-on-secondary-fixed font-bold">
          1 Barang perlu kulakan hari ini
        </span>
        <span className="font-label-code text-[0.75rem] text-secondary font-bold underline cursor-pointer">
          + Kulak
        </span>
      </div>
    </div>
  ),
  /** Mockup kecil laporan omzet & kasbon untuk modul Laporan. */
  2: (
    <div className="bg-surface-container-low p-space-sm rounded-xl flex flex-col gap-space-xs select-none">
      <div className="grid grid-cols-2 gap-1.5">
        <div className="bg-surface-container-lowest p-2 rounded-lg shadow-sm">
          <span className="text-[0.7rem] text-on-surface-variant block">Omzet Hari Ini</span>
          <span className="font-label-numeric text-[0.95rem] font-bold text-on-surface">
            Rp 1.845.000
          </span>
        </div>
        <div className="bg-surface-container-lowest p-2 rounded-lg shadow-sm">
          <span className="text-[0.7rem] text-tertiary-container block font-bold">Laba Bersih</span>
          <span className="font-label-numeric text-[0.95rem] font-bold text-tertiary-container">
            Rp 328.500
          </span>
        </div>
      </div>
      <div className="bg-surface-container-lowest p-2 rounded-lg shadow-sm flex flex-col gap-1">
        <div className="flex items-center justify-between font-label-ui text-[0.7rem] text-on-surface-variant font-bold border-b border-surface-container pb-1">
          <span>CATATAN BON TETANGGA</span>
          <span>STATUS</span>
        </div>
        {[
          ["Pak RW Hadi (Beras & Rokok)", "Rp 95.000"],
          ["Mbak Nia Kos (Susu & Mi)", "Rp 32.000"],
        ].map(([name, val]) => (
          <div key={name} className="flex items-center justify-between font-label-code text-[0.75rem]">
            <span>{name}</span>
            <span className="text-error font-bold">{val}</span>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-1 text-[0.7rem] text-on-surface-variant font-label-code">
        <span>Total Kasbon Belum Lunas:</span>
        <span className="font-bold text-on-surface">Rp 127.000</span>
      </div>
    </div>
  ),
};

/** Grid 3 kolom modul fitur utama (Kasir, Stok otomatis, Laporan). */
export function FeatureModules({
  modules,
}: {
  modules: Pick<FeatureModule, "badge" | "badgeClassName" | "title" | "desc">[];
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
      {modules.map((m, i) => (
        <div
          key={m.badge}
          className="bg-surface-container-lowest p-space-lg rounded-2xl shadow-sm hover:shadow-md transition-shadow flex flex-col gap-space-md"
        >
          <div className="flex flex-col gap-1">
            <div className="flex items-center justify-between">
              <h3 className="font-headline-md text-headline-md text-on-surface font-bold">{m.title}</h3>
              <span
                className={`font-label-code text-[0.75rem] bg-surface-container px-2 py-0.5 rounded ${m.badgeClassName} font-bold`}
              >
                {m.badge}
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant">{m.desc}</p>
          </div>
          <div className="flex items-center gap-space-xs">
            <Icon name={i === 0 ? "point_of_sale" : i === 1 ? "package_2" : "monitoring"} className="text-primary" />
          </div>
          {MOCKUPS[i]}
        </div>
      ))}
    </div>
  );
}
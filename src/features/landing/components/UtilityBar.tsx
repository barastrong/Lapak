/** Bilah status operasional di puncak landing page (dari template dashboard.html). */
export function UtilityBar() {
  return (
    <section className="w-full bg-surface-container-low border-b-0 py-space-xs px-space-md">
      <div className="max-w-[1240px] mx-auto flex items-center justify-between text-body-sm text-on-surface-variant">
        <div className="flex items-center gap-space-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-tertiary-container animate-pulse"></span>
          <span className="font-label-ui text-label-ui text-on-surface font-semibold">
            Server Kasir Lapak v2.4
          </span>
          <span className="hidden sm:inline text-outline-variant">
            • Siap dipakai offline &amp; cetak nota thermal 58mm/80mm
          </span>
        </div>
        <div className="flex items-center gap-space-md">
          <span className="font-label-code text-label-code text-primary-container bg-surface-container px-space-xs py-0.5 rounded">
            F2: Bayar Cepat
          </span>
          <span className="hidden md:inline font-label-code text-label-code text-on-surface-variant">
            ESC: Batal
          </span>
        </div>
      </div>
    </section>
  );
}
"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StockSummaryCards } from "@/features/stok/components/StockSummaryCards";
import { ShoppingList } from "@/features/stok/components/ShoppingList";
import { StockTable } from "@/features/stok/components/StockTable";
import { StockAdjustModal } from "@/features/stok/components/StockAdjustModal";
import { useStock } from "@/features/stok/hooks/useStock";
import { formatRupiah } from "@/lib/format";
import type { StockAdjustment, StockItem } from "@/features/stok/types";

/** Perakit layar stok: manajemen stok rak, buku catatan belanja pasar subuh, dan berita acara selisih fisik. */
export function StokScreen() {
  const state = useStock();
  const [adjustItem, setAdjustItem] = useState<StockItem | null>(null);
  const [adjustOpen, setAdjustOpen] = useState(false);
  const [kulakModalOpen, setKulakModalOpen] = useState(false);
  const [kulakNama, setKulakNama] = useState("");
  const [kulakQty, setKulakQty] = useState(10);
  const [kulakSupplier, setKulakSupplier] = useState("Pasar Induk Kramat Jati");
  const [kulakRak, setKulakRak] = useState("Lantai Depan");

  if (state.isLoading || !state.items) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-on-surface-variant gap-2 font-label-code text-xs">
        <span className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        <span>Memuat data stok rak & inventaris pasar...</span>
      </div>
    );
  }

  const items = state.items;

  const openAdjust = (item: StockItem) => {
    setAdjustItem(item);
    setAdjustOpen(true);
  };

  const saveAdjust = (a: StockAdjustment) => {
    state.adjustStock(a);
  };

  const handleShareWa = () => {
    const lines = state.shopping
      .map(
        (s, idx) =>
          `${idx + 1}. ${s.name} — *${s.qty}* (~${formatRupiah(s.estPrice)})\n   _Pemasok: ${s.supplier}_`
      )
      .join("\n");
    const totalEst = state.shopping.reduce((acc, s) => acc + s.estPrice, 0);
    const text = `*CATATAN BELANJA PASAR SUBUH*\n*Toko Lapak / Warung Sembako*\nTanggal: 24 Mei 2025\n\n${lines}\n\n*Estimasi Total Anggaran: ${formatRupiah(totalEst)}*\n_Mohon disiapkan ya agen/distributor. Terima kasih._`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, "_blank");
  };

  const handlePrintSaku = () => {
    window.print();
  };

  const handleSaveKulak = () => {
    if (!kulakNama.trim()) return;
    state.recordIncomingStock({
      name: kulakNama.trim(),
      qty: Number(kulakQty) || 1,
      supplier: kulakSupplier,
      rack: kulakRak,
    });
    setKulakModalOpen(false);
    setKulakNama("");
    setKulakQty(10);
  };

  return (
    <div className="flex flex-col w-full gap-space-lg pb-12">
      {/* Top Header Command Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-md sm:p-space-lg rounded-2xl border border-surface-container/70 shadow-xs">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h1 className="font-headline-lg text-xl sm:text-2xl text-on-surface font-extrabold tracking-tight font-headline">
              Stok Rak & Catatan Belanja Pasar
            </h1>
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-2.5 py-0.5 rounded-full font-label-code text-xs font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
              Shift Pagi • 24 Mei 2025
            </span>
          </div>
          <p className="text-body-sm text-xs sm:text-sm text-on-surface-variant">
            Periksa komoditas kosong sebelum berangkat belanja ke pasar induk atau agen sembako.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            variant="surfaceContainer"
            className="text-xs"
            onClick={() => items.length > 0 && openAdjust(items[0])}
          >
            <Icon name="balance" className="text-base text-secondary" />
            <span>Koreksi Fisik</span>
          </Button>
          <Button onClick={() => setKulakModalOpen(true)} className="text-xs">
            <Icon name="add_shopping_cart" className="text-base" />
            <span>+ Catat Kulakan Masuk</span>
          </Button>
        </div>
      </div>

      {/* Summary KPI Cards dengan Filter Terhubung */}
      <StockSummaryCards
        summary={state.summary}
        activeStatus={state.statusFilter}
        onSelectStatus={state.setStatusFilter}
        supplierCount={new Set(state.shopping.map((s) => s.supplier)).size}
      />

      {/* Grid 2 Kolom: Buku Saku Belanja Pasar vs Katalog Rak & Gudang */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        {/* Kolom Kiri: Buku Saku Belanja Pasar Subuh (5 cols lg, 4 cols xl) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-space-md">
          {/* Card Catatan Belanja */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container/70 shadow-xs p-space-md sm:p-space-lg flex flex-col gap-3 relative">
            <div className="flex items-start justify-between pb-2 border-b border-surface-container/60">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-tertiary/10 text-tertiary flex items-center justify-center shrink-0">
                  <Icon name="fact_check" className="text-lg" />
                </div>
                <div>
                  <h2 className="font-headline-md text-base text-on-surface font-bold tracking-tight">
                    Buku Saku Belanja Pasar Subuh
                  </h2>
                  <p className="text-body-sm text-xs text-on-surface-variant">
                    Siap dibawa atau dikirim langsung ke agen pasar
                  </p>
                </div>
              </div>
              <span className="bg-tertiary-fixed text-on-tertiary-fixed font-label-code text-xs px-2.5 py-0.5 rounded-full font-bold shrink-0">
                {state.shopping.length} Barang
              </span>
            </div>

            {/* Rute Pasar */}
            <div className="bg-surface-container-low/80 p-2.5 rounded-xl border border-surface-container/60 flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-2xs shrink-0">
                <Icon name="local_shipping" className="text-lg" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-ui text-xs font-bold text-on-surface truncate">
                  Rute: Pasar Induk Kramat Jati
                </span>
                <span className="text-[11px] font-label-code text-on-surface-variant truncate">
                  Target Berangkat: Pukul 04:30 WIB • Armada Pick-up
                </span>
              </div>
            </div>

            {/* Checklist Belanja */}
            <ShoppingList
              items={state.shopping}
              onToggle={state.toggleShopping}
              onRemove={state.removeShoppingItem}
              onAddQuick={(name) => state.addShoppingItem(name)}
            />

            {/* Tombol Aksi Bagikan WA & Cetak Saku */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-surface-container/60">
              <Button
                variant="surfaceContainer"
                className="flex-1 text-xs justify-center"
                onClick={handleShareWa}
              >
                <Icon name="chat" className="text-tertiary text-base" />
                <span>Kirim WA ke Agen</span>
              </Button>
              <Button
                variant="surfaceContainer"
                className="flex-1 text-xs justify-center"
                onClick={handlePrintSaku}
              >
                <Icon name="print" className="text-primary text-base" />
                <span>Cetak Nota Saku</span>
              </Button>
            </div>
          </div>

          {/* Card Jadwal Truk & Titipan Masuk Hari Ini */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container/70 shadow-xs p-space-md sm:p-space-lg flex flex-col gap-2.5">
            <div className="flex items-center justify-between pb-1 border-b border-surface-container/60">
              <span className="font-label-code text-xs text-on-surface font-bold uppercase tracking-wider flex items-center gap-1.5">
                <Icon name="schedule" className="text-primary text-sm" />
                Jadwal Pengiriman Masuk Hari Ini
              </span>
              <span className="bg-secondary-fixed/50 text-secondary text-[11px] font-label-code px-2 py-0.5 rounded-full font-bold">
                2 Truk Menunggu
              </span>
            </div>

            {/* Titipan 1 */}
            <div className="flex items-center gap-3 p-2.5 bg-surface-container-low/70 rounded-xl border border-surface-container/50">
              <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-2xs shrink-0">
                <Icon name="water_drop" className="text-base text-primary" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-ui text-xs font-semibold text-on-surface truncate">
                  Aqua Galon 19L (40 Galon)
                </span>
                <span className="text-[11px] font-label-code text-on-surface-variant">
                  Sub-Agen Mandiri • Estimasi Pkl 14:00 WIB
                </span>
              </div>
              <span className="bg-secondary-container text-on-secondary-container font-label-code text-[11px] px-2 py-0.5 rounded-md font-bold shrink-0">
                Menunggu
              </span>
            </div>

            {/* Titipan 2 */}
            <div className="flex items-center gap-3 p-2.5 bg-surface-container-low/70 rounded-xl border border-surface-container/50">
              <div className="w-8 h-8 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-2xs shrink-0">
                <Icon name="propane" className="text-base text-secondary" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-ui text-xs font-semibold text-on-surface truncate">
                  Gas Elpiji 3kg Melon (25 Tabung)
                </span>
                <span className="text-[11px] font-label-code text-on-surface-variant">
                  Pangkalan Resmi Pertamina • Pkl 16:30 WIB
                </span>
              </div>
              <span className="bg-secondary-container text-on-secondary-container font-label-code text-[11px] px-2 py-0.5 rounded-md font-bold shrink-0">
                Menunggu
              </span>
            </div>
          </div>
        </div>

        {/* Kolom Kanan: Katalog Stok Rak & Gudang (7 cols lg, 8 cols xl) */}
        <div className="lg:col-span-7 xl:col-span-8 flex flex-col gap-space-md">
          <StockTable
            items={state.filteredItems}
            query={state.query}
            onQuery={state.setQuery}
            statusFilter={state.statusFilter}
            onStatusFilter={state.setStatusFilter}
            rackFilter={state.rackFilter}
            onRackFilter={state.setRackFilter}
            onOpenAdjustment={openAdjust}
            onKulak={(row) => state.addShoppingItem(row.name)}
            onOpenAddIncoming={() => setKulakModalOpen(true)}
          />

          {/* Banner Berita Acara Kerusakan & Konsumsi Dapur */}
          <div className="bg-surface-container-lowest rounded-2xl border border-surface-container/70 shadow-xs p-space-md sm:p-space-lg flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-error/10 text-error flex items-center justify-center shrink-0">
                <Icon name="balance" className="text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-sm sm:text-base font-bold text-on-surface">
                  Pencatatan Selisih & Barang Rusak
                </span>
                <p className="text-body-sm text-xs text-on-surface-variant">
                  Catat bila ada telur pecah, mi remuk, susu bocor, atau bahan dipakai masak dapur warung.
                </p>
              </div>
            </div>
            <Button
              variant="surfaceContainer"
              className="w-full md:w-auto text-xs shrink-0"
              onClick={() => items.length > 0 && openAdjust(items[0])}
            >
              <Icon name="remove_shopping_cart" className="text-sm text-error" />
              <span>Catat Barang Rusak / Dapur</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Modal Koreksi Stok Fisik */}
      <StockAdjustModal
        open={adjustOpen}
        onClose={() => setAdjustOpen(false)}
        item={adjustItem}
        reasons={state.reasons}
        onSave={saveAdjust}
      />

      {/* Modal Catat Kulakan Masuk */}
      {kulakModalOpen ? (
        <div
          className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setKulakModalOpen(false)}
        >
          <div
            className="bg-surface-container-lowest rounded-2xl shadow-xl max-w-md w-full p-space-lg flex flex-col gap-space-md relative cursor-default border border-surface-container"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-2 border-b border-surface-container">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                  <Icon name="add_shopping_cart" className="text-lg" />
                </div>
                <h3 className="font-headline-sm text-base text-on-surface font-bold">
                  Catat Kulakan Masuk
                </h3>
              </div>
              <button
                type="button"
                className="text-on-surface-variant hover:text-on-surface p-1 rounded-lg cursor-pointer"
                onClick={() => setKulakModalOpen(false)}
                aria-label="Tutup modal"
              >
                <Icon name="close" />
              </button>
            </div>

            <p className="text-body-sm text-xs text-on-surface-variant">
              Tambah stok barang yang baru saja tiba dari pasar subuh atau distributor resmi ke rak toko.
            </p>

            <div className="flex flex-col gap-3">
              <label className="flex flex-col gap-1">
                <span className="font-label-ui text-xs font-semibold text-on-surface">Nama Barang</span>
                <input
                  value={kulakNama}
                  onChange={(e) => setKulakNama(e.target.value)}
                  placeholder="Contoh: Beras Rojolele 5kg / Indomie Goreng"
                  className="bg-surface-container-low px-3 py-2 rounded-xl text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                />
              </label>

              <div className="grid grid-cols-2 gap-2">
                <label className="flex flex-col gap-1">
                  <span className="font-label-ui text-xs font-semibold text-on-surface">Jumlah Masuk</span>
                  <input
                    type="number"
                    min={1}
                    value={kulakQty}
                    onChange={(e) => setKulakQty(Number(e.target.value))}
                    className="bg-surface-container-low px-3 py-2 rounded-xl text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs font-label-numeric"
                  />
                </label>
                <label className="flex flex-col gap-1">
                  <span className="font-label-ui text-xs font-semibold text-on-surface">Lokasi Rak</span>
                  <select
                    value={kulakRak}
                    onChange={(e) => setKulakRak(e.target.value)}
                    className="bg-surface-container-low px-3 py-2 rounded-xl text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs cursor-pointer"
                  >
                    <option value="Lantai Depan">Lantai Depan</option>
                    <option value="Meja Peti Kasir">Meja Peti Kasir</option>
                    <option value="Rak A2 Minyak">Rak A2 Minyak</option>
                    <option value="Rak B Sembako">Rak B Sembako</option>
                    <option value="Rak C Sabun">Rak C Sabun</option>
                    <option value="Gantungan Depan">Gantungan Depan</option>
                  </select>
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="font-label-ui text-xs font-semibold text-on-surface">Pemasok / Agen</span>
                <input
                  value={kulakSupplier}
                  onChange={(e) => setKulakSupplier(e.target.value)}
                  placeholder="Contoh: Pasar Induk Kramat Jati / Agen Grosir Mandiri"
                  className="bg-surface-container-low px-3 py-2 rounded-xl text-body-sm text-on-surface border border-surface-container focus:outline-none focus:ring-1 focus:ring-primary text-xs"
                />
              </label>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-surface-container">
              <Button variant="surfaceContainer" onClick={() => setKulakModalOpen(false)}>
                Batal
              </Button>
              <Button onClick={handleSaveKulak} disabled={!kulakNama.trim()}>
                Simpan Stok Masuk
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Icon } from "@/components/ui/Icon";
import { StockSummaryCards } from "@/features/stok/components/StockSummaryCards";
import { ShoppingList } from "@/features/stok/components/ShoppingList";
import { StockTable } from "@/features/stok/components/StockTable";
import { StockAdjustModal } from "@/features/stok/components/StockAdjustModal";
import { useStock } from "@/features/stok/hooks/useStock";
import type { StockAdjustment, StockItem } from "@/features/stok/types";

/** Perakit layar stok: header, ringkasan, daftar belanja pasar, tabel lokasi. */
export function StokScreen() {
  const state = useStock();
  const [adjustItem, setAdjustItem] = useState<StockItem | null>(null);
  const [adjustOpen, setAdjustOpen] = useState(false);

  if (state.isLoading || !state.items) {
    return (
      <div className="flex items-center justify-center py-24 text-on-surface-variant">
        Memuat data stok...
      </div>
    );
  }

  const items = state.items;

  const openAdjust = (item: StockItem) => {
    setAdjustItem(item);
    setAdjustOpen(true);
  };

  const saveAdjust = (a: StockAdjustment) => {
    void a; // TODO: kirim ke API via stockService
  };

  return (
    <div className="flex flex-col w-full gap-space-md">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-space-md bg-surface-container-lowest p-space-lg rounded-xl shadow-sm">
        <div className="flex flex-col gap-space-xs">
          <div className="flex items-center gap-space-xs">
            <span className="font-headline-lg text-headline-lg text-on-surface">
              Stok Barang & Catatan Belanja Pasar
            </span>
            <span className="bg-surface-container-high text-primary px-2.5 py-0.5 rounded-full font-label-code text-label-code text-xs">
              Shift Pagi
            </span>
          </div>
          <p className="text-body-sm text-on-surface-variant">
            Periksa barang yang menipis sebelum berangkat kulakan ke pasar induk.
          </p>
        </div>
        <div className="flex items-center gap-space-sm shrink-0">
          <Button variant="surfaceContainer">
            <Icon name="tune" className="text-lg" />
            Filter Rak
          </Button>
          <Button>
            <Icon name="add_shopping_cart" className="text-lg" />
            + Catat Kulakan Masuk
          </Button>
        </div>
      </div>

      <StockSummaryCards summary={state.summary} />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-5 flex flex-col gap-space-md">
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-md relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-space-xs">
                <Icon name="fact_check" className="text-primary text-xl" />
                <div>
                  <h2 className="font-headline-md text-headline-md text-on-surface">
                    Daftar Belanja Pasar Subuh
                  </h2>
                  <p className="text-body-sm text-on-surface-variant">
                    Siap dibawa / dikirim langsung ke agen pasar.
                  </p>
                </div>
              </div>
              <span className="bg-surface-container-high px-2 py-1 rounded text-xs font-label-code text-primary font-bold">
                {state.shopping.length} Barang
              </span>
            </div>
            <div className="bg-surface-container-low p-space-sm rounded-lg flex items-center gap-space-sm">
              <div className="w-12 h-12 rounded-lg bg-surface-container-lowest flex items-center justify-center shadow-sm shrink-0">
                <Icon name="shopping_basket" className="text-primary text-xl" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-label-ui text-label-ui text-on-surface truncate">
                  Rute: Pasar Induk Kramat Jati
                </span>
                <span className="text-body-sm text-on-surface-variant truncate">
                  Target jalan: Pukul 04:30 WIB
                </span>
              </div>
            </div>
            <ShoppingList items={state.shopping} onToggle={state.toggleShopping} />
            <div className="flex flex-col sm:flex-row gap-space-sm pt-space-xs">
              <Button variant="surfaceContainer" className="flex-1">
                <Icon name="chat" className="text-tertiary text-lg" />
                <span className="truncate">Salin ke WA Agen</span>
              </Button>
              <Button variant="surfaceContainer" className="flex-1">
                <Icon name="print" className="text-primary text-lg" />
                <span className="truncate">Cetak Saku</span>
              </Button>
            </div>
          </div>

          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col gap-space-sm">
            <div className="flex items-center justify-between">
              <span className="font-label-code text-label-code text-xs text-on-surface-variant uppercase">
                Jadwal Pengiriman Masuk
              </span>
              <span className="font-label-code text-xs text-primary font-bold">Hari Ini</span>
            </div>
            <div className="flex items-center gap-space-md p-space-sm bg-surface-container-low rounded-lg">
              <div className="w-10 h-10 rounded-lg bg-surface-container-lowest flex items-center justify-center text-primary shadow-xs shrink-0">
                <Icon name="local_shipping" />
              </div>
              <div className="flex flex-col min-w-0 flex-1">
                <span className="font-label-ui text-label-ui text-on-surface truncate">
                  Galon Aqua & Gas Elpiji 3kg
                </span>
                <span className="text-body-sm text-on-surface-variant">
                  Penyedia: Sub-Agen Mandiri • Pkl 14:00
                </span>
              </div>
              <span className="bg-secondary-container text-on-secondary-container font-label-code text-xs px-2 py-0.5 rounded font-bold shrink-0">
                Menunggu
              </span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <StockTable
            items={state.filteredItems}
            query={state.query}
            onQuery={state.setQuery}
            onOpenAdjustment={openAdjust}
          />
          <div className="bg-surface-container-lowest rounded-xl shadow-sm p-space-md flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex items-center gap-space-md">
              <div className="w-12 h-12 rounded-xl bg-surface-container-low flex items-center justify-center text-primary shrink-0">
                <Icon name="scale" className="text-2xl" />
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface">
                  Selisih Fisik vs Catatan?
                </span>
                <p className="text-body-sm text-on-surface-variant">
                  Catat bila ada telur pecah, mi instan remuk, atau beras dimasak sendiri.
                </p>
              </div>
            </div>
            <Button
              variant="surfaceContainer"
              className="w-full md:w-auto"
              onClick={() => items.length > 0 && openAdjust(items[0])}
            >
              <Icon name="remove_shopping_cart" className="text-base" />
              Catat Barang Rusak / Dipakai Sendiri
            </Button>
          </div>
        </div>
      </div>

      <StockAdjustModal
        open={adjustOpen}
        onClose={() => setAdjustOpen(false)}
        item={adjustItem}
        reasons={state.reasons}
        onSave={saveAdjust}
      />
    </div>
  );
}
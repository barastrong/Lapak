"use client";

import { useMemo, useState } from "react";
import { KasirHeader } from "@/features/kasir/components/KasirHeader";
import { ProductGrid } from "@/features/kasir/components/ProductGrid";
import { CartPanel } from "@/features/kasir/components/CartPanel";
import { PaymentModal } from "@/features/kasir/components/PaymentModal";
import { KioskStatusBar } from "@/features/kasir/components/KioskStatusBar";
import { useKasir } from "@/features/kasir/hooks/useKasir";

/** Perakit layar kasir: semua state interaktif dipegang useKasir. */
export function KasirScreen() {
  const kasir = useKasir();
  const [payOpen, setPayOpen] = useState(false);

  const subtotal = useMemo(
    () => kasir.cart.reduce((acc, l) => acc + l.product.sellPrice * l.quantity, 0),
    [kasir.cart]
  );

  if (kasir.isLoading) {
    return (
      <div className="flex items-center justify-center py-24 text-on-surface-variant">
        Memuat data kasir...
      </div>
    );
  }

  if (kasir.error) {
    return (
      <div className="flex items-center justify-center py-24 text-error">
        {kasir.error}
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full gap-space-md">
      <KasirHeader
        shift={kasir.shift}
        categories={kasir.categories}
        activeCategory={kasir.activeCategory}
        onSelectCategory={kasir.setActiveCategory}
        onOpenPayment={() => setPayOpen(true)}
        query={kasir.query}
        onQueryChange={kasir.setQuery}
        products={kasir.products ?? []}
        onAdd={kasir.addToCart}
      />
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-lg items-start">
        <div className="lg:col-span-7 flex flex-col gap-space-md">
          <ProductGrid products={kasir.products ?? []} onAdd={kasir.addToCart} />
          <KioskStatusBar />
        </div>
        <div className="lg:col-span-5">
          <CartPanel
            lines={kasir.cart}
            subtotal={subtotal}
            onChangeQuantity={kasir.changeQuantity}
            onRemove={kasir.removeLine}
            onGantiKasbon={() => setPayOpen(true)}
          />
        </div>
      </div>
      <PaymentModal
        open={payOpen}
        onClose={() => setPayOpen(false)}
        subtotal={subtotal}
        paymentMethod={kasir.paymentMethod}
        onPaymentChange={kasir.setPaymentMethod}
        quickCash={kasir.quickCash}
      />
    </div>
  );
}
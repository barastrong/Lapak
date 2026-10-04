"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { getCatalog, getInitialCart, getQuickCash, getShiftSummary } from "@/features/kasir/services/kasirService";
import type { CartLine, PaymentMethod, QuickCash, ShiftSummary } from "@/features/kasir/types";
import type { Product, ProductCategory } from "@/types/product";

export type KasirState = {
  products: Product[];
  cart: CartLine[];
  query: string;
  activeCategory: string;
  categories: ProductCategory[];
  paymentMethod: PaymentMethod;
  shift: ShiftSummary | null;
  quickCash: QuickCash[];
  isLoading: boolean;
  error: string | null;
  setQuery: (q: string) => void;
  setActiveCategory: (c: string) => void;
  setPaymentMethod: (m: PaymentMethod) => void;
  addToCart: (p: Product) => void;
  changeQuantity: (id: string, delta: number) => void;
  removeLine: (id: string) => void;
  clearCart: () => void;
};

/** State utama layar kasir: katalog, keranjang, pencarian, metode bayar. */
export function useKasir(): KasirState {
  const [products, setProducts] = useState<Product[] | null>(null);
  const [cart, setCart] = useState<CartLine[]>([]);
  const [shift, setShift] = useState<ShiftSummary | null>(null);
  const [quickCash, setQuickCash] = useState<QuickCash[]>([]);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("TUNAI");
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const run = useCallback(() => {
    let cancelled = false;
    Promise.all([getCatalog(), getInitialCart(), getShiftSummary(), getQuickCash()])
      .then(([cat, initial, sum, cash]) => {
        if (cancelled) return;
        setProducts(cat);
        setCart(initial);
        setShift(sum);
        setQuickCash(cash);
        setError(null);
      })
      .catch((e: unknown) => {
        if (!cancelled) setError(e instanceof Error ? e.message : "Gagal memuat data kasir.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => run(), [run]);

  const filtered = useMemo(() => {
    if (!products) return [] as Product[];
    const q = query.toLowerCase();
    return products.filter(
      (p) =>
        (activeCategory === "all" || p.category === activeCategory) &&
        (p.name + p.sku + (p.barcode ?? "")).toLowerCase().includes(q)
    );
  }, [products, query, activeCategory]);

  const categories = useMemo(() => {
    if (!products) return [] as ProductCategory[];
    const counts = new Map<string, number>();
    for (const p of products) {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    return [
      { id: "all", name: "Semua", count: products.length },
      ...[...counts].map(([name, count]) => ({ id: name, name, count })),
    ];
  }, [products]);

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const line = prev.find((l) => l.product.id === p.id);
      if (line) {
        return prev.map((l) =>
          l.product.id === p.id ? { ...l, quantity: l.quantity + 1 } : l
        );
      }
      return [...prev, { product: p, quantity: 1 }];
    });
  };

  const changeQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((l) =>
          l.product.id === id ? { ...l, quantity: Math.max(0, l.quantity + delta) } : l
        )
        .filter((l) => l.quantity > 0)
    );
  };

  const removeLine = (id: string) => {
    setCart((prev) => prev.filter((l) => l.product.id !== id));
  };

  const clearCart = () => setCart([]);

  return {
    products: filtered,
    cart,
    query,
    activeCategory,
    categories,
    paymentMethod,
    shift,
    quickCash,
    isLoading,
    error,
    setQuery,
    setActiveCategory,
    setPaymentMethod,
    addToCart,
    changeQuantity,
    removeLine,
    clearCart,
  };
}
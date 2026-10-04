import type { Product } from "@/types/product";

export type CartLine = {
  product: Product;
  quantity: number;
};

export type PaymentMethod = "TUNAI" | "QRIS" | "KASBON";

export type ShiftSummary = {
  transactionCount: number;
  totalOmset: number;
};

export type QuickCash = {
  label: string;
  value: number | null;
};

export type CommandBarItem = {
  label: string;
  shortcut: string;
  icon: string;
  variant?: "primary" | "surface";
};
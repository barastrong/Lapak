export type StockStatus = "Habis" | "Menipis" | "Aman" | "Berlebih";

export type StockItem = {
  id: string;
  name: string;
  code: string;
  rack: string;
  stock: number;
  minStock: number;
  unitLabel: string;
  lastRestock: string;
  status: StockStatus;
};

export type StockSummary = {
  criticalCount: number;
  criticalLabel: string;
  warningCount: number;
  warningLabel: string;
  estimateTotal: number;
};

export type ShoppingItem = {
  id: string;
  name: string;
  qty: string;
  supplier: string;
  supplierIcon: string;
  estPrice: number;
  checked: boolean;
};

export type StockAdjustment = {
  productName: string;
  currentStock: number;
  qty: number;
  reason: string;
  note: string;
};
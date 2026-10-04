export type Product = {
  id: string;
  name: string;
  sku: string;
  barcode?: string;
  category: string;
  unitLabel: string;
  buyPrice: number;
  sellPrice: number;
  stock: number;
  minStock: number;
  rackLocation?: string;
  icon: string;
  lastRestock?: string;
  supplier?: string;
};

export type ProductCategory = {
  id: string;
  name: string;
  count: number;
};
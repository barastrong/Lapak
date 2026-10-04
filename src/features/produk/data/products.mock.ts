import type { Product } from "@/types/product";

/** Produk di halaman katalog (data contoh dari template). */
export const productsMock: Product[] = [
  { id: "P1", name: "Minyak Goreng Kita 1L", sku: "8992388102", category: "Sembako", unitLabel: "pouch", buyPrice: 13200, sellPrice: 15500, stock: 24, minStock: 8, icon: "oil_barrel" },
  { id: "P2", name: "Beras Rojolele Super 5kg", sku: "8993189201", category: "Sembako", unitLabel: "karung", buyPrice: 61000, sellPrice: 68000, stock: 3, minStock: 5, icon: "grain" },
  { id: "P3", name: "Telur Ayam Ras 1kg", sku: "8991004118", category: "Sembako", unitLabel: "kg", buyPrice: 24500, sellPrice: 28000, stock: 14, minStock: 5, icon: "egg" },
  { id: "P4", name: "Gula Pasir Curah 1kg", sku: "8992019441", category: "Sembako", unitLabel: "kg", buyPrice: 15000, sellPrice: 17500, stock: 18, minStock: 6, icon: "cake" },
  { id: "P5", name: "Indomie Kuah Ayam Bawang (Dus)", sku: "8998866200", category: "Sembako", unitLabel: "karton", buyPrice: 112000, sellPrice: 124000, stock: 6, minStock: 2, icon: "ramen_dining" },
  { id: "P6", name: "Rinso Molto Bubuk 770g", sku: "8999999712", category: "Kebutuhan Rumah", unitLabel: "bungkus", buyPrice: 22000, sellPrice: 26500, stock: 2, minStock: 5, icon: "cleaning_services" },
];

export const productCategoriesMock = ["Semua Kategori (6)", "Sembako", "Minuman", "Bumbu Dapur", "Kebutuhan Rumah", "Makanan Ringan"];
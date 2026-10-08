import { productsMock } from "@/features/produk/data/products.mock";
import type { Product } from "@/types/product";

/** Ambil katalog produk dari backend MySQL API. */
export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch("/api/products", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil data produk dari server.");
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : productsMock;
  } catch (error) {
    console.warn("[ProductService] Menggunakan fallback lokal:", error);
    return productsMock;
  }
}

export async function createProduct(input: Omit<Product, "id">): Promise<Product> {
  try {
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json = await res.json();
    if (json.success && json.data) return json.data;
    throw new Error(json.error || "Gagal membuat produk.");
  } catch (error) {
    console.warn("[ProductService] Simpan offline:", error);
    return { id: `P${Date.now()}`, ...input };
  }
}

export async function updateProduct(id: string, patch: Partial<Product>): Promise<Product> {
  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patch),
    });
    const json = await res.json();
    if (json.success && json.data) return json.data;
    throw new Error(json.error || "Gagal memperbarui produk.");
  } catch (error) {
    console.warn("[ProductService] Update offline:", error);
    return {
      ...productsMock.find((p) => p.id === id)!,
      ...patch,
    };
  }
}

export async function deleteProducts(ids: string[]): Promise<void> {
  try {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids }),
    });
  } catch (error) {
    console.warn("[ProductService] Hapus offline:", error);
  }
}
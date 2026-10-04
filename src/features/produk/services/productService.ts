import { productsMock } from "@/features/produk/data/products.mock";
import type { Product } from "@/types/product";

/** // TODO: hook ke API — ganti isi dengan fetch(`/api/products`). */
export async function getProducts(): Promise<Product[]> {
  return productsMock;
}

export async function createProduct(input: Omit<Product, "id">): Promise<Product> {
  return { id: `P${Date.now()}`, ...input };
}

export async function updateProduct(id: string, patch: Partial<Product>): Promise<Product> {
  return {
    ...productsMock.find((p) => p.id === id)!,
    ...patch,
  };
}

export async function deleteProducts(ids: string[]): Promise<void> {
  void ids;
}
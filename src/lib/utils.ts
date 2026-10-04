/** Gabung className secara kondisional. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/** Persentase keuntungan berdasarkan harga beli & jual. */
export function marginPercent(buyPrice: number, sellPrice: number): number {
  if (buyPrice <= 0) return 0;
  return ((sellPrice - buyPrice) / buyPrice) * 100;
}
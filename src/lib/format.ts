/** Format angka menjadi Rupiah tanpa desimal, mis. 1545000 -> "Rp 1.545.000". */
export function formatRupiah(value: number): string {
  return "Rp " + (value ?? 0).toLocaleString("id-ID");
}

/** Format tanggal menjadi standar Indonesia. */
export function formatTanggal(date: Date): string {
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(date);
}
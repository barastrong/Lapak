/** Identitas aplikasi & toko (data statis; nanti bisa diambil dari backend). */
export const siteConfig = {
  name: "Lapak",
  tagline: "Kasir & Buku Warung",
  storeName: "Warung Bu Sari",
  storeKind: "Kios Kelontong & Makanan",
  branch: "Cabang Pasar Minggu",
  ownerName: "Bu Sari",
  ownerRole: "Pemilik Kios",
  shift: "Shift Pagi (07:00)",
  openingCash: 200_000,
  printer: "Thermal 58mm (Terkoneksi)",
  cashDrawer: "Siap",
  kiosStatus: "Kios Aktif",
} as const;
export type PelangganTier = "Konsisten" | "Biasa" | "Bon Aktif";

export type Pelanggan = {
  id: string;
  name: string;
  phone: string;
  address: string;
  tier: PelangganTier;
  totalTransaksi: number;
  totalBelanja: number;
  utangAktif: number;
  terakhirBelanja: string;
};

export type PelangganSummary = {
  totalPelanggan: number;
  utangBeredar: number;
  pelangganAktifMingguIni: number;
};
import type { Pelanggan, PelangganSummary } from "@/features/pelanggan/types";

export const pelangganSummaryMock: PelangganSummary = {
  totalPelanggan: 47,
  utangBeredar: 415_000,
  pelangganAktifMingguIni: 23,
};

export const pelangganMock: Pelanggan[] = [
  { id: "PG1", name: "Pak RT Bambang", phone: "0812-3490-1122", address: "RW 03, RT 05", tier: "Bon Aktif", totalTransaksi: 12, totalBelanja: 850_000, utangAktif: 145_000, terakhirBelanja: "3 hari lalu" },
  { id: "PG2", name: "Bu Diah (Kost No. 4)", phone: "0857-8812-4091", address: "Kost Bu Diah, Lt 2", tier: "Bon Aktif", totalTransaksi: 8, totalBelanja: 480_000, utangAktif: 65_000, terakhirBelanja: "Kemarin" },
  { id: "PG3", name: "Mas Joko (Bengkel)", phone: "0877-2231-9002", address: "Bengkel Jaya Motor", tier: "Konsisten", totalTransaksi: 34, totalBelanja: 2_150_000, utangAktif: 95_000, terakhirBelanja: "5 hari lalu" },
  { id: "PG4", name: "Bu Hendra", phone: "0813-9001-4451", address: "Pasar Minggu, Blok B", tier: "Bon Aktif", totalTransaksi: 6, totalBelanja: 320_000, utangAktif: 110_000, terakhirBelanja: "1 minggu lalu" },
  { id: "PG5", name: "Bu RT Ratna", phone: "0812-7777-8888", address: "RW 03, RT 06", tier: "Konsisten", totalTransaksi: 21, totalBelanja: 1_400_000, utangAktif: 0, terakhirBelanja: "2 hari lalu" },
  { id: "PG6", name: "Mbak Nia (Kos)", phone: "0811-2222-3333", address: "Kos Melati, Kamar 2", tier: "Biasa", totalTransaksi: 4, totalBelanja: 145_000, utangAktif: 0, terakhirBelanja: "Seminggu lalu" },
  { id: "PG7", name: "Pak RW Hadi", phone: "0812-5555-6666", address: "RW 03, RT 07", tier: "Konsisten", totalTransaksi: 28, totalBelanja: 1_900_000, utangAktif: 0, terakhirBelanja: "Hari ini" },
];

export const pelangganTiersMock = ["Semua", "Bon Aktif", "Konsisten", "Biasa"];
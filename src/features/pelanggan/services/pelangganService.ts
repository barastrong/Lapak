import { pelangganMock, pelangganSummaryMock } from "@/features/pelanggan/data/pelanggan.mock";
import type { Pelanggan, PelangganSummary } from "@/features/pelanggan/types";

/** // TODO: hook ke API — ganti isi dengan fetch("/api/pelanggan"). */
export async function getPelangganList(): Promise<Pelanggan[]> {
  return pelangganMock;
}

export async function getPelangganSummary(): Promise<PelangganSummary> {
  return pelangganSummaryMock;
}
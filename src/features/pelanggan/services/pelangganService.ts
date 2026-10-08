import { pelangganMock, pelangganSummaryMock } from "@/features/pelanggan/data/pelanggan.mock";
import type { Pelanggan, PelangganSummary } from "@/features/pelanggan/types";

/** Ambil daftar pelanggan dari backend MySQL API. */
export async function getPelangganList(): Promise<Pelanggan[]> {
  try {
    const res = await fetch("/api/customers", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil pelanggan dari server.");
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : pelangganMock;
  } catch (error) {
    console.warn("[PelangganService] Fallback lokal:", error);
    return pelangganMock;
  }
}

export async function getPelangganSummary(): Promise<PelangganSummary> {
  try {
    const res = await fetch("/api/customers?mode=summary", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil ringkasan pelanggan.");
    const json = await res.json();
    return json.success && json.data ? json.data : pelangganSummaryMock;
  } catch (error) {
    console.warn("[PelangganService] Fallback ringkasan lokal:", error);
    return pelangganSummaryMock;
  }
}

export async function createPelangganApi(input: {
  name: string;
  phone?: string;
  address?: string;
  tier?: string;
  notes?: string;
}): Promise<Pelanggan> {
  const res = await fetch("/api/customers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(input),
  });
  const json = await res.json();
  if (json.success && json.data) return json.data;
  throw new Error(json.error || "Gagal membuat pelanggan.");
}

export async function payPelangganDebtApi(id: string, amount: number): Promise<Pelanggan> {
  const res = await fetch(`/api/customers/${id}/pay-debt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ amount }),
  });
  const json = await res.json();
  if (json.success && json.data) return json.data;
  throw new Error(json.error || "Gagal mencatat pembayaran utang.");
}
import { storePresetsMock, storeProfileMock } from "@/features/pengaturan/data/pengaturan.mock";
import type { SettingsForm } from "@/features/pengaturan/types";
import type { StoreProfile } from "@/types/store";

/** Ambil profil toko dari backend MySQL API. */
export async function getStoreProfile(): Promise<StoreProfile> {
  try {
    const res = await fetch("/api/settings", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil profil toko.");
    const json = await res.json();
    return json.success && json.data ? json.data : storeProfileMock;
  } catch (error) {
    console.warn("[PengaturanService] Fallback lokal:", error);
    return storeProfileMock;
  }
}

export async function getStorePresets(): Promise<StoreProfile[]> {
  try {
    const res = await fetch("/api/settings?mode=presets", { cache: "no-store" });
    if (!res.ok) throw new Error("Gagal mengambil preset cabang toko.");
    const json = await res.json();
    return json.success && Array.isArray(json.data) ? json.data : storePresetsMock;
  } catch (error) {
    console.warn("[PengaturanService] Fallback preset:", error);
    return storePresetsMock;
  }
}

export async function saveSettings(form: SettingsForm): Promise<void> {
  try {
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
  } catch (error) {
    console.warn("[PengaturanService] Simpan offline:", error);
  }
}
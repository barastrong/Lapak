import { storePresetsMock, storeProfileMock } from "@/features/pengaturan/data/pengaturan.mock";
import type { SettingsForm } from "@/features/pengaturan/types";
import type { StoreProfile } from "@/types/store";

/** // TODO: hook ke API — ganti isi dengan fetch("/api/settings"). */
export async function getStoreProfile(): Promise<StoreProfile> {
  return storeProfileMock;
}

export async function getStorePresets(): Promise<StoreProfile[]> {
  return storePresetsMock;
}

export async function saveSettings(form: SettingsForm): Promise<void> {
  void form;
  return Promise.resolve();
}
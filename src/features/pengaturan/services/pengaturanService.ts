import { storePresetsMock, storeProfileMock } from "@/features/pengaturan/data/pengaturan.mock";
import type { StoreProfile } from "@/types/store";

// ponytail: no backend (/api/settings 404), return mock; add fetch when MySQL API exists
export async function getStoreProfile(): Promise<StoreProfile> {
  return storeProfileMock;
}

export async function getStorePresets(): Promise<StoreProfile[]> {
  return storePresetsMock;
}

export async function saveSettings(): Promise<void> {}
import type { StoreProfile } from "@/types/store";

export type SettingsForm = {
  store: StoreProfile;
  cashierName: string;
  receiptFooter: string;
  printer58: boolean;
};

export type { StoreProfile };
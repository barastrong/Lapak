import type { StoreProfile } from "@/types/store";

export const storeProfileMock: StoreProfile = {
  name: "Warung Bu Sari",
  kind: "Kios Kelontong & Makanan",
  branch: "Cabang Pasar Minggu",
  address: "Jl. Tebet Timur Dalam No. 12, Kec. Tebet, Jakarta Selatan",
  phone: "0812-8900-5272",
  openingHours: "06:00 - 21:00 WIB",
};

export const storePresetsMock: StoreProfile[] = [
  { name: "Warung Bu Sari", kind: "Kios Kelontong & Makanan", branch: "Cabang Pasar Minggu", address: "Jl. Tebet Timur Dalam No. 12, Jaksel", phone: "0812-8900-5272", openingHours: "06:00 - 21:00 WIB" },
  { name: "Toko Jaya Abadi", kind: "Toko Sembako", branch: "Cabang Blok M", address: "Jl. Melawai Raya No. 21, Jaksel", phone: "0813-1111-2222", openingHours: "07:00 - 20:00 WIB" },
  { name: "Laundry Kilat Murni", kind: "Laundry Kiloan", branch: "Cabang Kemang", address: "Jl. Kemang Raya No. 8, Jaksel", phone: "0857-3333-4444", openingHours: "08:00 - 22:00 WIB" },
];
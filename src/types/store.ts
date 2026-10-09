export type StoreProfile = {
  id?: string; // ponytail: opsional agar backward-compatible tanpa merusak halaman pengaturan
  name: string;
  kind: string;
  branch: string;
  address: string;
  phone: string;
  openingHours: string;
};
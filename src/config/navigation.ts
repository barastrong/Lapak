/** Daftar menu sidebar. Satu-satunya sumber truth navigasi utama. */
export type NavItem = { label: string; href: string; icon: string };

export const NAV_ITEMS: NavItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: "space_dashboard" },
  { label: "Kasir (POS)", href: "/kasir", icon: "receipt_long" },
  { label: "Produk", href: "/produk", icon: "inventory_2" },
  { label: "Stok", href: "/stok", icon: "warehouse" },
  { label: "Laporan", href: "/laporan", icon: "bar_chart" },
  { label: "Pelanggan", href: "/pelanggan", icon: "group" },
  { label: "Pengaturan", href: "/pengaturan", icon: "settings" },
];
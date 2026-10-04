import type {
  BusinessType,
  Faq,
  FeatureModule,
  PricePlan,
  ReceiptData,
  Step,
} from "@/features/landing/types";

/** Contoh nota kontan yang ditampilkan di hero. */
export const receiptMock: ReceiptData = {
  title: "Nota Kontan",
  storeName: "Warung Bu Sari",
  address: "Jl. Tebet Timur Dalam No. 12, Jaksel",
  number: "#NK-2025-0842",
  datetime: "24 Mei 2025, 10:14",
  cashier: "Sari (Kasir 01)",
  payment: "TUNAI",
  items: [
    { name: "Beras Rojolele 5kg", detail: "1 sak x 68.000", total: 68_000 },
    { name: "Minyak Goreng Kita 1L", detail: "1 btl x 15.500", total: 15_500 },
    { name: "Indomie Goreng", detail: "3 bks x 3.500", total: 10_500, promo: "Promo Spesial" },
    { name: "Telur Ayam Negeri", detail: "0.5 kg x 28.000/kg", total: 14_000 },
  ],
  subtotal: 108_000,
  discounts: [
    { label: "Diskon Promo Pangan", amount: -20_000 },
    { label: "Diskon Langganan", amount: -1_500 },
  ],
  total: 86_500,
  change: 0,
};

export const businessTypesMock: BusinessType[] = [
  { name: "Warung Makan", desc: "Pecel lele, warteg, soto", dotClassName: "bg-secondary-container" },
  { name: "Laundry", desc: "Kiloan & satuan", dotClassName: "bg-primary-container" },
  { name: "Toko Baju", desc: "Distro, pakaian anak", dotClassName: "bg-tertiary-container" },
  { name: "Barbershop", desc: "Cukur & perawatan", dotClassName: "bg-secondary" },
  { name: "Bengkel & Motor", desc: "Servis, oli & sparepart", dotClassName: "bg-primary" },
];

export const featureModulesMock: Pick<FeatureModule, "badge" | "badgeClassName" | "title" | "desc">[] = [
  {
    badge: "MODUL 01",
    badgeClassName: "text-primary",
    title: "Kasir",
    desc: "Ketik nama barang atau tekan F2 untuk langsung bayar dan cetak nota kertas.",
  },
  {
    badge: "MODUL 02",
    badgeClassName: "text-secondary",
    title: "Stok otomatis",
    desc: "Jumlah barang otomatis berkurang setiap transaksi dan ada peringatan saat kulakan menipis.",
  },
  {
    badge: "MODUL 03",
    badgeClassName: "text-tertiary",
    title: "Laporan untung rugi",
    desc: "Ketahui keuntungan bersih harian dan siapa saja tetangga yang belum bayar bon.",
  },
];

export const stepsMock: Step[] = [
  {
    number: "1",
    title: "Buka dari Browser",
    desc: "Buka lewat Chrome di laptop, komputer kasir lawas, atau tablet toko. Tidak perlu install software rumit.",
  },
  {
    number: "2",
    title: "Isi Daftar Barang",
    desc: "Ketik nama barang dan harga jual, atau gunakan database 10.000+ produk sembako warung siap pakai.",
  },
  {
    number: "3",
    title: "Siap Layani Pembeli",
    desc: "Langsung cetak struk nota fisik atau kirim link nota via WhatsApp langsung ke nomor pembeli.",
    highlighted: true,
  },
];

export const pricePlansMock: PricePlan[] = [
  {
    packageTag: "PAKET PERINTIS",
    name: "Mulai (Gratis)",
    desc: "Untuk warung kecil yang baru buka dan mau mulai membiasakan pencatatan digital.",
    price: "Rp 0",
    priceNote: "/ bulan selamanya",
    features: [
      { text: "1 Pengguna kasir" },
      { text: "Hingga 100 produk jualan" },
      { text: "Catatan penjualan harian" },
      { text: "Cetak nota thermal standard" },
    ],
    cta: "Daftar Gratis",
    ctaHref: "#",
    tagClassName: "text-on-surface-variant bg-surface-container",
    ctaClassName: "bg-surface-container text-on-surface hover:bg-surface-container-high",
  },
  {
    packageTag: "PILIHAN TERPOPULER",
    tagClassName: "text-primary-container bg-primary-fixed/60",
    name: "Warung Aktif",
    desc: "Untuk kios dan toko kelontong harian yang butuh kontrol ketat atas stok & bon utang.",
    price: "Rp 49.000",
    priceNote: "/ bulan",
    priceClassName: "text-primary-container",
    features: [
      { text: "Produk tanpa batas (unlimited)", semibold: true },
      { text: "Stok & peringatan kulakan otomatis" },
      { text: "Buku utang & kasbon pelanggan", semibold: true },
      { text: "Kirim nota struk via WhatsApp" },
      { text: "Laporan laba bersih & ekspor Excel" },
    ],
    cta: "Mulai 14 Hari Percobaan",
    ctaHref: "#",
    tag: "Paling Pas untuk Warung",
    popular: true,
    ctaClassName: "bg-primary-container text-on-primary hover:bg-primary shadow-md",
  },
  {
    packageTag: "USAHA BESAR",
    name: "Ruko & Multi-Kasir",
    desc: "Untuk toko dengan lebih dari satu kasir, banyak shift jaga, atau memiliki beberapa cabang.",
    price: "Rp 99.000",
    priceNote: "/ bulan",
    features: [
      { text: "Hingga 3 kasir login bersamaan" },
      { text: "Multi-cabang & transfer stok gudang" },
      { text: "Hak akses karyawan & cegah manipulasi" },
      { text: "Rekonsiliasi kas laci otomatis di akhir shift" },
      { text: "Prioritas bantuan teknis WhatsApp 1-on-1" },
    ],
    cta: "Hubungi Tim",
    ctaHref: "https://wa.me/",
    ctaOuter: true,
    tagClassName: "text-on-surface-variant bg-surface-container",
    ctaClassName: "bg-surface-container text-on-surface hover:bg-surface-container-high",
  },
];

export const faqsMock: Faq[] = [
  {
    question: "Apakah bisa mencetak struk pakai printer kasir Bluetooth thermal?",
    answer:
      "Bisa. Lapak mendukung semua printer thermal 58mm dan 80mm standar USB maupun Bluetooth (seperti Panda, VSC, Iware, Epson POS).",
  },
  {
    question: "Bagaimana jika jaringan internet di pasar sedang lemot?",
    answer:
      "Lapak dilengkapi mode offline kasir. Transaksi tetap bisa diinput, nota tetap tercetak, dan data akan otomatis sinkron begitu internet tersambung kembali.",
  },
];
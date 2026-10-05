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
    desc: "Ketik nama barang untuk langsung bayar dan cetak nota kertas.",
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
    ctaHref: "/register",
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
    ctaHref: "/register",
    tag: "Paling Pas untuk Warung",
    popular: true,
    ctaClassName: "bg-primary text-on-primary hover:bg-primary-container shadow-md hover:shadow-lg",
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
    ctaHref: "https://wa.me/62812890052725",
    ctaOuter: true,
    tagClassName: "text-on-surface-variant bg-surface-container",
    ctaClassName: "bg-surface-container text-on-surface hover:bg-surface-container-high",
  },
];

export const faqsMock: Faq[] = [
  {
    category: "Umum & Penggunaan",
    question: "Apakah sistem kasir Lapak bisa digunakan saat internet mati atau lemot?",
    answer:
      "Bisa. Lapak dirancang dengan mode offline pintar. Transaksi penjualan kasir tetap bisa diproses dan nota struk tetap tercetak lancar. Semua transaksi yang tercatat offline akan otomatis tersinkronisasi ke server cloud begitu internet tersambung kembali.",
  },
  {
    category: "Umum & Penggunaan",
    question: "Bagaimana cara memindahkan daftar produk dari buku tulis ke sistem Lapak?",
    answer:
      "Sangat mudah dan cepat. Anda bisa mengimpor data produk lewat file Excel/CSV, atau menggunakan fitur scan barcode kemasan untuk input instan. Tim dukungan WhatsApp kami juga siap membantu proses input awal produk warung Anda tanpa biaya tambahan.",
  },
  {
    category: "Umum & Penggunaan",
    question: "Apakah struk belanja pelanggan bisa dikirimkan langsung via WhatsApp?",
    answer:
      "Bisa! Selain dicetak di kertas thermal, kasir bisa langsung mengirimkan nota digital resmi dengan rincian rapi ke nomor WhatsApp pelanggan hanya dengan satu ketukan tombol.",
  },
  {
    category: "Perangkat & Cetak",
    question: "Printer thermal apa saja yang kompatibel dengan aplikasi kasir Lapak?",
    answer:
      "Lapak mendukung semua jenis printer thermal standar ukuran 58mm dan 80mm, baik koneksi Bluetooth maupun kabel USB (seperti merek Panda, VSC, Iware, Zywell, Epson POS, Sunmi, dan printer kasir portabel lainnya) langsung dari browser.",
  },
  {
    category: "Perangkat & Cetak",
    question: "Apakah kasir Lapak bisa dipakai di HP Android, tablet, dan laptop sekaligus?",
    answer:
      "Bisa. Lapak adalah aplikasi web modern berbasis cloud yang sangat ringan dan responsif. Anda dapat mengaksesnya dari browser HP Android, iPhone, tablet Android/iPad, maupun laptop/PC kasir tanpa perlu instalasi aplikasi berat.",
  },
  {
    category: "Perangkat & Cetak",
    question: "Apakah bisa disambungkan ke barcode scanner dan laci kasir otomatis (cash drawer)?",
    answer:
      "Bisa. Lapak mendukung scanner barcode USB atau Bluetooth secara plug-and-play untuk pencarian kilat barang belanjaan, serta modul trigger laci kasir (RJ11) otomatis terbuka setelah pembayaran selesai.",
  },
  {
    category: "Data & Keamanan",
    question: "Bagaimana keamanan data jika HP atau laptop di meja kasir rusak atau hilang?",
    answer:
      "Data Anda 100% aman tersimpan di cloud dengan enkripsi berstandar industri. Jika perangkat Anda rusak atau ganti baru, cukup login kembali ke akun Anda dan seluruh catatan stok, barang, serta buku bon utang pelanggan langsung pulih utuh.",
  },
  {
    category: "Data & Keamanan",
    question: "Jika toko dijaga karyawan bergantian shift, bagaimana cara memantau kas uang?",
    answer:
      "Lapak dilengkapi sistem rekonsiliasi kas per shift. Karyawan mencatat modal awal kas (opening cash) dan sistem otomatis menghitung kecocokan uang fisik dengan total transaksi saat penutupan shift (closing cash) untuk mencegah kecurangan atau salah hitung.",
  },
  {
    category: "Paket & Biaya",
    question: "Apakah ada biaya transaksi tersembunyi atau potongan per penjualan?",
    answer:
      "Tidak ada sama sekali. Anda hanya membayar biaya langganan bulanan flat sesuai paket yang dipilih. Tidak ada potongan persentase per transaksi atau biaya administrasi tambahan.",
  },
  {
    category: "Paket & Biaya",
    question: "Apakah saya bisa mencoba semua fiturnya secara gratis terlebih dahulu?",
    answer:
      "Tentu saja! Kami memberikan masa uji coba gratis (free trial) selama 14 hari dengan akses semua fitur lengkap. Anda bisa langsung mencoba tanpa perlu kartu kredit dan tanpa komitmen mengikat.",
  },
  {
    category: "Paket & Biaya",
    question: "Bisakah saya mengubah atau membatalkan langganan kapan saja?",
    answer:
      "Bisa sewaktu-waktu. Anda bebas melakukan upgrade, downgrade, atau berhenti berlangganan kapan saja dari menu Pengaturan tanpa denda atau prosedur berbelit.",
  },
  {
    category: "Paket & Biaya",
    question: "Bagaimana jika saya memerlukan panduan teknis saat toko sedang ramai?",
    answer:
      "Tim customer service kami siaga setiap hari melalui WhatsApp di 0812-8900-52725 (08:00 - 20:00 WIB) untuk membantu panduan remote setting printer, pertanyaan fitur, maupun bantuan darurat kasir.",
  },
];
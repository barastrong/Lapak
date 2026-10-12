<div align="center">

<img src="./public/images/lapak-receipt-logo.png" alt="Lapak logo" align="center" height="96" />

# Lapak — Kasir & Buku Warung

*Aplikasi kasir (POS) dan pencatatan buku warung untuk UMKM Indonesia.*

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61dafb?style=flat-square&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org)
![Node version](https://img.shields.io/badge/Node.js->=20-3c873a?style=flat-square)

[Fitur](#fitur) • [Mulai](#mulai) • [Rute](#rute) • [Struktur proyek](#struktur-proyek) • [Status](#status) • [Troubleshooting](#troubleshooting)

</div>

Lapak dibuat untuk warung, kios, laundri, dan bengkel yang selama ini mencatat penjualan di buku tulis atau kalkulator. Satu aplikasi untuk kasir cepat, katalog produk, stok, laporan laba, dan buku bon utang.

> [!NOTE]
> **Status: prototype.** Semua data masih mock di memori browser — belum ada backend dan belum ada login sungguhan. Lihat [Status](#status).

## Fitur

| Modul | Kegunaan |
| ----- | -------- |
| **Kasir (POS)** | Keranjang, pencarian produk, `F2` bayar cepat, cetak nota |
| **Dashboard** | Omzet hari ini, grafik penjualan, produk terlaris, transaksi terakhir |
| **Produk** | Katalog, harga beli/jual, filter & pencarian, bulk edit |
| **Stok** | Stok masuk/keluar otomatis, peringatan kulakan menipis, daftar belanja pasar |
| **Laporan** | Omzet, modal HPP, laba bersih, ekspor |
| **Pelanggan** | Buku pelanggan & bon utang (kasbon) |
| **Pengaturan** | Profil toko, printer, kas laci, pindah cabang |

Halaman landing publik (`/`) berisi profil produk, paket harga, dan FAQ — tanpa sidebar.

## Mulai

### Prasyarat

- [Node.js 20+](https://nodejs.org/download/)
- [Git](https://git-scm.com/downloads)

### Jalankan lokal

```bash
git clone <repo-url>
cd cashier

npm install
npm run dev       # buka http://localhost:3000
```

Perintah lain:

```bash
npm run build     # production build
npm run start     # jalankan hasil build
npm run lint      # eslint
```

> [!TIP]
> Halaman aplikasi ada di dalam route group `app/(main)/` (dengan sidebar). Landing publik `/` sengaja tanpa sidebar.

## Rute

| Route | Halaman |
| ----- | ------- |
| `/` | Landing publik |
| `/dashboard` | Dashboard kasir |
| `/kasir` | Kasir (POS) + keranjang |
| `/produk` | Katalog produk & harga |
| `/stok` | Stok barang & belanja pasar |
| `/laporan` | Laporan keuangan & penjualan |
| `/pelanggan` | Buku pelanggan & bon utang |
| `/pengaturan` | Pengaturan toko & pindah cabang |
| `/login` `/register` `/otp` `/reset-password` | Alur auth (UI saja, belum fungsional) |

## Struktur proyek

Feature-based: satu fitur = satu folder self-contained di `src/features/` (`components/`, `hooks/`, `services/`, `data/`, `types.ts`, `index.ts`).

```
src/
├── app/                  # routing saja, page tipis (<30 baris)
│   ├── page.tsx          # landing publik "/" (tanpa AppShell)
│   └── (main)/           # aplikasi kasir (dengan AppShell: Sidebar + Header)
├── features/             # landing, dashboard, kasir, produk, stok, laporan, pelanggan, pengaturan
├── components/layout/    # AppShell, Sidebar, Header, StoreSwitcher
├── components/ui/        # generik: Button, Badge, Modal, Icon, StatCard
├── config/               # navigation.ts, site.ts, stores.ts
├── lib/                  # cn, formatRupiah, formatTanggal
└── types/                # shared domain types
```

Aturan impor:

- Pakai alias `@/` (`@/features/...`). Dilarang `../../..` lebih dari 1 level.
- Antar fitur **dilarang** saling impor — hanya lewat barrel `@/features/<nama>`.
- `components/ui/` generik murni, tidak boleh impor dari `features/`.

Detail lengkap: [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md).

> [!IMPORTANT]
> Semua akses data sudah lewat `services/` yang `async` dan mengembalikan `Promise`. Saat backend siap, ganti isi `src/features/*/services/*Service.ts` dengan `fetch` — hook dan UI tidak perlu disentuh. Cek cepat pelanggaran impor: `rg 'from "@/features/' src`.

## Status

Sudah selesai:

- [x] Semua halaman & komponen UI (landing, dashboard, kasir, produk, stok, laporan, pelanggan, pengaturan)
- [x] Sidebar, ganti toko/cabang, mode kasir
- [x] Struktur feature-based + dokumentasi arsitektur

Belum dikerjakan:

- [ ] Backend & database (`.env.example` sudah ada untuk MySQL, belum dipakai)
- [ ] Autentikasi & hak akses kasir
- [ ] Cetak nota thermal 58mm/80mm
- [ ] Mode offline + sinkronisasi
- [ ] Kirim nota via WhatsApp
- [ ] Ekspor laporan ke Excel

## Troubleshooting

**Port 3000 sudah dipakai:** jalankan di port lain.

```bash
npx next dev -p 3001
```

**Error versi Node:** pastikan Node 20+ dengan `node -v`. Tool versi lama (`nvm`/`fnm`/asdf) sering jadi penyebab build Next.js 16 gagal.

**Styling Tailwind tidak muncul:** proyek ini Tailwind v4 (token `@theme` di `globals.css`, tanpa config JS). Jangan tambah `tailwind.config.js`.

Kalau masih buntu, [buka issue](../../issues) dengan menyertakan output `npm run dev` dan `node -v`.

## Resources

- [Next.js docs](https://nextjs.org/docs)
- [React docs](https://react.dev)
- [Tailwind CSS v4 docs](https://tailwindcss.com/docs)
- [Material Symbols](https://fonts.google.com/icons)
- [Arsitektur proyek](docs/ARCHITECTURE.md)

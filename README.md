# Lapak — Kasir & Buku Warung

Aplikasi kasir (POS) dan pencatatan buku warung untuk UMKM Indonesia. Dibuat untuk warung,
kios, laundri, bengkel — toko yang selama ini masih mencatat penjualan di buku tulis
atau kalkulator.

> **Status: prototype.** Semua data masih mock (tersimpan di memori browser).
> Belum ada backend, belum ada login sungguhan. Lihat [Status](#status).

## Fitur

| Modul | Kegunaan |
| ----- | -------- |
| **Kasir** | POS + keranjang, pencarian produk, F2 untuk bayar cepat, cetak nota |
| **Dashboard** | Ringkasan omzet hari ini, grafik penjualan, produk terlaris, transaksi terakhir |
| **Produk** | Katalog produk, harga beli/jual, filter & pencarian, bulk edit |
| **Stok** | Stok masuk/keluar otomatis, peringatan kulakan menipis, daftar belanja pasar |
| **Laporan** | Omzet, modal HPP, laba bersih, transaksi, export |
| **Pelanggan** | Buku pelanggan & bon utang (kasbon) |
| **Pengaturan** | Profil toko, printer, kas laci, pindah cabang |

Plus landing page publik (`/`) berisi profil produk, paket harga, dan FAQ.

## Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4** (`@theme` token, tanpa config JS)
- Material Symbols Outlined untuk ikon

Tidak ada dependency runtime lain di luar empat di atas.

## Menjalankan

```bash
npm install
npm run dev       # development — buka http://localhost:3000
npm run build     # production build
npm run start     # jalankan hasil build
npm run lint      # eslint
```

Butuh Node.js 20+.

## Rute

| Route | Halaman |
| ----- | ------- |
| `/` | Landing publik (tanpa sidebar) |
| `/dashboard` | Dashboard kasir |
| `/kasir` | Kasir (POS) + keranjang |
| `/produk` | Katalog produk & harga |
| `/stok` | Stok barang & belanja pasar |
| `/laporan` | Laporan keuangan & penjualan |
| `/pelanggan` | Buku pelanggan & bon utang |
| `/pengaturan` | Pengaturan toko & pindah cabang |

## Struktur proyek

Feature-based: satu fitur = satu folder self-contained di `src/features/`
(`components/`, `hooks/`, `services/`, `data/`, `types.ts`, `index.ts`).
Antar fitur **dilarang** saling impor — cukup impor lewat barrel `@/features/<nama>`.

Baca [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) untuk pohon folder lengkap,
aturan impor, cara menambah fitur baru, dan cara mengganti mock data dengan API.

## Menjalankan backend nanti

Semua akses data sudah lewat `services/` yang `async` dan mengembalikan `Promise`.
Saat backend tersedia, ganti isi fungsi di `src/features/*/services/*Service.ts`
dengan `fetch` — hook dan komponen UI tidak perlu disentuh.

## Status

Sudah selesai:
- [x] Semua halaman & komponen UI (landing, dashboard, kasir, produk, stok, laporan, pelanggan, pengaturan)
- [x] Navigasi sidebar, ganti toko/cabang, mode kasir (kios status)
- [x] Struktur feature-based + dokumentasi arsitektur

Belum dikerjakan:
- [ ] Backend & database (sekarang masih mock)
- [ ] Autentikasi & hak akses kasir
- [ ] Cetak nota ke printer thermal 58mm/80mm
- [ ] Mode offline + sinkronisasi
- [ ] Kirim nota via WhatsApp
- [ ] Ekspor laporan ke Excel

Kontribusi welcome — buka issue dulu supaya tidak bentrok.
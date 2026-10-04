# Lapak — Kasir & Buku Warung

Aplikasi kasir praktis dan pencatatan buku warung digital untuk UMKM Indonesia. Dibangun dengan **Next.js 16 (App Router)** + **React 19** + **Tailwind CSS v4**.

## Struktur proyek

Baca [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) untuk paham struktur folder feature-based, aturan impor antar fitur, cara menambah fitur baru, dan cara mengganti mock data dengan API.

## Menjalankan

```bash
npm install
npm run dev       # development — buka http://localhost:3000
npm run build     # production build
npm run lint      # eslint
```

## Rute

| Route | Halaman |
| ----- | ------- |
| `/` | Landing publik (tanpa login, tanpa sidebar) |
| `/dashboard` | Dashboard kasir (setelah login, dengan sidebar) |
| `/kasir` | Kasir (POS) + keranjang |
| `/produk` | Katalog produk & harga |
| `/stok` | Stok barang & belanja pasar |
| `/laporan` | Laporan keuangan & penjualan |
| `/pelanggan` | Buku pelanggan & bon utang |
| `/pengaturan` | Pengaturan toko & pindah cabang |

## Data

Semua halaman memakai **mock data** (`src/features/*/data/*.mock.ts`). Saat backend sudah ada, cukup ganti isi fungsi di `src/features/*/services/*Service.ts` dengan `fetch` — hook dan UI tidak berubah.
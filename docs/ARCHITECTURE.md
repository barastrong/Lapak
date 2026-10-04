# Arsitektur

Struktur proyek dipecah **feature-based**: satu fitur = satu folder self-contained di `src/features/`. Hanya kode yang dipakai lintas fitur yang ditaruh di tempat shared.

## Pohon folder

```
src/
├── app/                  # HANYA routing. Page tipis (<30 baris), tanpa markup besar.
│   ├── layout.tsx        # root layout: font + metadata + Icon font
│   ├── globals.css       # @theme tokens (warna/spacing/type Tailwind v4) + basis CSS
│   ├── page.tsx          # Landing publik ("/") — TANPA AppShell/sidebar
│   └── (main)/           # route group APLIKASI KASIR (setelah login, punya AppShell)
│       ├── layout.tsx    # pasang AppShell sekali (Sidebar + Header)
│       └── dashboard|kasir|produk|stok|laporan|pengaturan/page.tsx
├── features/             # SATU FOLDER = SATU FITUR, self-contained
│   ├── landing/          # Halaman publik "/" (marketing, tanpa login)
│   ├── dashboard/        # Dashboard kasir (setelah login, di dalam AppShell)
│   ├── kasir/            # POS + keranjang
│   ├── produk/           # Katalog produk & harga
│   ├── stok/             # Stok barang & belanja pasar
│   ├── laporan/          # Laporan keuangan & penjualan (omzet, modal HPP, laba)
│   ├── pelanggan/        # Buku pelanggan & bon utang
│   └── pengaturan/       # Pengaturan toko & pindah cabang
│   └── <fitur>/
│       ├── components/   # komponen UI fitur (server-first; "use client" hanya saat interaktif)
│       ├── hooks/        # use<Fitur>.ts — pegang state, panggil service
│       ├── services/     # <fitur>Service.ts — async, kembalikan Promise. TODO hook ke API di sini
│       ├── data/         # <nama>.mock.ts — data contoh
│       ├── types.ts      # type/interface fitur
│       └── index.ts      # barrel — SATU-SATUNYA pintu keluar fitur
├── components/
│   ├── layout/           # AppShell, Sidebar, SidebarItem, Header, SidebarBrand, StoreSwitcher, LogoutButton
│   └── ui/               # generik: Button, Badge, Modal, Icon, Pagination, StatCard
├── types/                # shared domain type (Product, StoreProfile, ...)
├── config/               # navigation.ts (menu sidebar), site.ts, stores.ts (daftar toko)
└── lib/                  # utils.ts (cn), format.ts (formatRupiah, formatTanggal)
```

**Penting:** halaman `/` (landing) **tidak** memakai AppShell/sidebar — itu pintu masuk publik sebelum login. Semua halaman di `app/(main)/` memakai AppShell.

Kartu toko di sidebar (`StoreSwitcher`) memakai preset dari `src/config/stores.ts` dan bisa dibuka untuk pindah toko/cabang; halaman `/pengaturan` mengelola profil tersebut.

## Aturan impor

- Pakai path alias `@/` (`@/components/...`, `@/features/...`). Dilarang `../../..` naik lebih dari 1 level.
- Fitur lain hanya boleh impor dari `@/features/<nama>` (barrel `index.ts`), tidak dari dalam.
- **Antar fitur dilarang saling impor.** Butuh hal yang sama → taruh ke `src/types/`, `src/components/ui/`, atau `src/lib/`.
- `components/ui/` generik murni: tidak boleh tahu soal produk/kasir, dan tidak impor dari `features/`.
- Komponen UI tidak impor dari `data/`/`services/`. Data masuk via **props** dari page/hook.
- `app/**/page.tsx` tipis: ambil data lewat hook/service → susun komponen dari `features/`.

Cek cepat: `rg 'from "@/features/' src` → semua match harus masih di dalam fitur yang sama.

## Menambah fitur baru

1. Buat `src/features/<fitur>/` lengkap dengan `components`, `hooks`, `services`, `data`, `types.ts`, `index.ts`.
2. Tambahkan route di `src/app/(main)/<fitur>/page.tsx` — cukup render komponen screen dari barrel.
3. Daftarkan menu di `src/config/navigation.ts` (label + href + ikon Material Symbols). Sidebar aktif otomatis via `usePathname`.

## Mengganti mock data dengan API

1. Buka `src/features/<fitur>/services/<fitur>Service.ts` — semua fungsi di sana `async` dan kembalikan `Promise`.
2. Ganti isi fungsi mock dengan `fetch(...)` menuju backend. **Hook & UI tidak perlu diubah**.
3. Kalau butuh reload manual, pakai `refetch()` dari hook.
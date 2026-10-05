"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import type { Faq } from "@/features/landing/types";

export function FaqPanel({ faqs }: { faqs: Faq[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("Semua");
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const categories = [
    "Semua",
    "Umum & Penggunaan",
    "Perangkat & Cetak",
    "Data & Keamanan",
    "Paket & Biaya",
  ];

  const filteredFaqs =
    selectedCategory === "Semua"
      ? faqs
      : faqs.filter((f) => f.category === selectedCategory);

  const toggleFaq = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className="bg-surface-container-low/70 border border-surface-container-high p-space-md sm:p-space-xl rounded-3xl max-w-4xl mx-auto w-full flex flex-col gap-space-lg">
      <div className="text-center max-w-xl mx-auto flex flex-col gap-1">
        <span className="font-label-code text-label-code text-primary-container font-bold uppercase tracking-wider">
          Tanya Jawab & Bantuan
        </span>
        <h3 className="font-headline-lg text-headline-lg text-on-surface font-extrabold tracking-tight">
          Pertanyaan yang Sering Diajukan
        </h3>
        <p className="text-body-sm sm:text-body-md text-on-surface-variant">
          Punya pertanyaan seputar cara pakai, printer kasir, atau data toko? Temukan jawabannya di bawah ini.
        </p>
      </div>

      <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-body-sm font-label-ui font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? "bg-primary text-on-primary shadow-xs"
                : "bg-surface-container-lowest text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-3">
        {filteredFaqs.map((f, idx) => {
          const isOpen = openIndices.includes(idx);
          return (
            <div
              key={f.question}
              className={`rounded-2xl transition-all border ${
                isOpen
                  ? "bg-surface-container-lowest border-primary/20 shadow-sm"
                  : "bg-surface-container-lowest/80 border-surface-container hover:border-surface-container-high"
              }`}
            >
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {f.category ? (
                    <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold bg-surface-container text-on-surface-variant whitespace-nowrap">
                      {f.category}
                    </span>
                  ) : null}
                  <span className="font-headline-sm text-body-md sm:text-headline-sm font-bold text-on-surface">
                    {f.question}
                  </span>
                </div>
                <span
                  className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-transform duration-200 ${
                    isOpen
                      ? "rotate-180 bg-primary/10 text-primary"
                      : "bg-surface-container text-on-surface-variant"
                  }`}
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {isOpen ? (
                <div className="px-4 pb-4 sm:px-5 sm:pb-5 pt-0 text-body-sm sm:text-body-md text-on-surface-variant leading-relaxed border-t border-surface-container/60 mt-1 pt-3">
                  {f.answer}
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      <div className="bg-surface-container-lowest border border-surface-container rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left mt-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-tertiary-container/20 text-tertiary flex items-center justify-center shrink-0">
            <Icon name="support_agent" className="text-2xl text-tertiary" />
          </div>
          <div>
            <p className="font-bold text-on-surface text-body-sm sm:text-body-md">
              Pertanyaan Anda belum terjawab?
            </p>
            <p className="text-body-xs sm:text-body-sm text-on-surface-variant">
              Tim customer service kami siap bantu lewat pesan WhatsApp.
            </p>
          </div>
        </div>
        <a
          href="https://wa.me/62812890052725"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-tertiary text-on-tertiary px-5 py-2.5 rounded-xl font-label-ui text-body-sm font-bold hover:bg-tertiary-container transition-all shrink-0"
        >
          <Icon name="chat" className="text-lg" />
          <span>Tanya via WhatsApp</span>
        </a>
      </div>
    </div>
  );
}

export function WaSupportCallout() {
  return (
    <section id="bantuan" className="w-full bg-surface-container-highest py-space-xl px-space-md">
      <div className="max-w-[1240px] mx-auto bg-surface-container-lowest rounded-2xl p-space-lg shadow-lg flex flex-col md:flex-row items-center justify-between gap-space-lg">
        <div className="flex flex-col gap-space-xs max-w-xl">
          <div className="flex items-center gap-space-xs">
            <span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
            <span className="font-label-ui text-label-ui text-tertiary-container font-bold uppercase tracking-wider">
              Layanan Panduan Langsung
            </span>
          </div>
          <h3 className="font-headline-lg text-headline-lg text-on-surface font-extrabold">
            Ada pertanyaan atau butuh panduan setting kasir kios Anda?
          </h3>
          <p className="text-body-md text-on-surface-variant">
            Hubungi kami langsung di WhatsApp:{" "}
            <strong className="text-on-surface font-label-code">+62 812-8900-LAPAK (0812-8900-52725)</strong>.
            Tim kami siap bantu setiap hari 08:00 - 20:00 WIB.
          </p>
        </div>
        <div className="shrink-0 w-full md:w-auto">
          <a
            href="https://wa.me/62812890052725"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-space-xs bg-tertiary-container text-on-primary font-label-ui text-body-md font-bold px-7 py-4 rounded-xl shadow-md hover:bg-tertiary active:translate-y-[1px] transition-all w-full md:w-auto"
          >
            <Icon name="chat" className="text-[24px]" />
            <span>Chat via WhatsApp Sekarang</span>
          </a>
        </div>
      </div>
    </section>
  );
}

export function LandingFooter() {
  return (
    <footer className="w-full bg-surface-container-low border-t border-surface-container pt-space-xl pb-space-lg">
      <div className="max-w-[1240px] mx-auto px-space-md flex flex-col gap-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-space-lg">
          <div className="lg:col-span-5 flex flex-col gap-space-sm">
            <Link href="/" className="inline-block">
              <Image
                src="/images/lapak-receipt-logo.png"
                alt="Logo Lapak"
                className="h-9 w-auto object-contain"
                width={160}
                height={42}
              />
            </Link>
            <p className="text-body-sm text-on-surface-variant leading-relaxed max-w-sm">
              Sistem kasir pintar & buku warung digital tanpa ribet. Menggantikan buku tulis, kalkulator, dan nota manual untuk memajukan UMKM Indonesia.
            </p>
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container text-on-surface font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Server Aktif & Aman
              </span>
              <span className="px-3 py-1 rounded-full bg-surface-container text-on-surface font-medium">
                100% Karya Anak Bangsa
              </span>
            </div>
          </div>

          <div className="lg:col-span-2 sm:col-span-1 flex flex-col gap-3">
            <h4 className="font-label-ui text-label-ui font-bold text-on-surface uppercase tracking-wider text-xs">
              Fitur Utama
            </h4>
            <ul className="flex flex-col gap-2 text-body-sm text-on-surface-variant">
              <li>
                <a href="#fitur" className="hover:text-primary transition-colors">
                  Kasir POS Kilat
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-primary transition-colors">
                  Kontrol Stok & Kulak
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-primary transition-colors">
                  Buku Bon & Utang
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-primary transition-colors">
                  Cetak Nota Thermal
                </a>
              </li>
              <li>
                <a href="#fitur" className="hover:text-primary transition-colors">
                  Kirim Struk WhatsApp
                </a>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 sm:col-span-1 flex flex-col gap-3">
            <h4 className="font-label-ui text-label-ui font-bold text-on-surface uppercase tracking-wider text-xs">
              Akses & Akun
            </h4>
            <ul className="flex flex-col gap-2 text-body-sm text-on-surface-variant">
              <li>
                <Link href="/login" className="hover:text-primary transition-colors">
                  Masuk Kasir
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-primary transition-colors">
                  Daftar Akun Kios
                </Link>
              </li>
              <li>
                <Link href="/reset-password" className="hover:text-primary transition-colors">
                  Lupa Password
                </Link>
              </li>
              <li>
                <Link href="/otp" className="hover:text-primary transition-colors">
                  Verifikasi OTP
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-primary transition-colors">
                  Dashboard Demo
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-3 flex flex-col gap-3">
            <h4 className="font-label-ui text-label-ui font-bold text-on-surface uppercase tracking-wider text-xs">
              Pusat Dukungan
            </h4>
            <div className="flex flex-col gap-2 text-body-sm text-on-surface-variant">
              <p className="flex items-start gap-2">
                <Icon name="phone" className="text-base text-primary shrink-0 mt-0.5" />
                <span>+62 812-8900-52725 (WhatsApp)</span>
              </p>
              <p className="flex items-start gap-2">
                <Icon name="schedule" className="text-base text-primary shrink-0 mt-0.5" />
                <span>Setiap Hari (08:00 - 20:00 WIB)</span>
              </p>
              <p className="flex items-start gap-2">
                <Icon name="location_on" className="text-base text-primary shrink-0 mt-0.5" />
                <span>Jakarta Selatan, DKI Jakarta, Indonesia</span>
              </p>
            </div>
            <div className="pt-2">
              <a
                href="https://wa.me/62812890052725"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-tertiary hover:underline"
              >
                <Icon name="chat" className="text-sm" />
                <span>Buka WhatsApp CS Resmi →</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-space-md border-t border-surface-container flex flex-col sm:flex-row items-center justify-between gap-space-sm text-body-sm text-on-surface-variant">
          <p>© 2026 Lapak Indonesia. Hak cipta dilindungi undang-undang.</p>
          <div className="flex items-center gap-4 text-xs">
            <a href="#faq" className="hover:text-on-surface transition-colors">
              FAQ
            </a>
            <span className="text-outline-variant">•</span>
            <a href="#bantuan" className="hover:text-on-surface transition-colors">
              Bantuan
            </a>
            <span className="text-outline-variant">•</span>
            <Link href="/login" className="hover:text-on-surface transition-colors">
              Area Kasir
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

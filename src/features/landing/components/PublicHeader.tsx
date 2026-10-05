import Image from "next/image";
import Link from "next/link";

export function PublicHeader() {
  const links = [
    { label: "Fitur", href: "#fitur" },
    { label: "Cara Kerja", href: "#cara-kerja" },
    { label: "Harga", href: "#harga" },
    { label: "FAQ", href: "#faq" },
    { label: "Bantuan", href: "#bantuan" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur border-b border-surface-container-low">
      <div className="max-w-[1240px] mx-auto px-space-md py-3 flex items-center justify-between gap-space-md">
        <Link href="/" className="flex items-center shrink-0">
          <Image
            src="/images/lapak-receipt-logo.png"
            alt="Logo Lapak"
            className="h-8 md:h-9 w-auto object-contain"
            width={160}
            height={42}
            priority
          />
        </Link>
        <nav className="hidden md:flex items-center gap-space-md lg:gap-space-lg">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="font-label-ui text-label-ui text-on-surface-variant hover:text-on-surface transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-space-sm">
          <Link
            href="/login"
            className="inline-flex items-center justify-center text-primary font-label-ui text-label-ui px-space-md py-space-sm rounded-lg hover:bg-surface-container transition-colors"
          >
            Masuk
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center justify-center bg-primary-container text-on-primary font-label-ui text-label-ui px-space-md py-space-sm rounded-lg hover:bg-primary transition-colors active:translate-y-[1px]"
          >
            Coba Gratis
          </Link>
        </div>
      </div>
    </header>
  );
}

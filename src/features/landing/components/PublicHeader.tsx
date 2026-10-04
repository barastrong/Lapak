import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Icon } from "@/components/ui/Icon";

/** Header marketing landing (publik, sebelum login) — dari template dashboard.html. */
export function PublicHeader() {
  const links = [
    { label: "Fitur", href: "#fitur" },
    { label: "Harga", href: "#harga" },
  ];
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface-container-lowest/80 backdrop-blur border-b border-surface-container-low">
      <div className="max-w-[1240px] mx-auto px-space-md py-3 flex items-center justify-between gap-space-md">
        <Link href="/" className="flex items-center gap-space-sm">
          <Image
            src="/images/lapak-receipt-logo.png"
            alt="Logo Lapak UMKM"
            className="h-8 w-auto object-contain rounded"
            width={48}
            height={48}
            priority
          />
          <span className="font-headline-md text-headline-md text-on-surface tracking-tight">
            {siteConfig.name}
          </span>
        </Link>
        <nav className="hidden lg:flex items-center gap-space-lg">
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
          <a
            href="#harga"
            className="inline-flex items-center justify-center bg-primary-container text-on-primary font-label-ui text-label-ui px-space-md py-space-sm rounded-lg hover:bg-primary transition-colors active:translate-y-[1px]"
          >
            Coba Gratis Sekarang
          </a>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  );
}
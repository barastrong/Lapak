import Image from "next/image";
import Link from "next/link";

/** Logo aplikasi di puncak sidebar. */
export function SidebarBrand() {
  return (
    <div className="px-space-md pt-space-md pb-space-sm">
      <Link href="/dashboard" aria-label="Beranda">
        <Image
          src="/images/lapak-receipt-logo.png"
          alt="Logo Lapak UMKM"
          className="h-8 w-auto"
          width={1060}
          height={282}
          sizes="128px"
          preload
        />
      </Link>
    </div>
  );
}
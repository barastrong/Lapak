import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

/** Logo + nama aplikasi di puncak sidebar. */
export function SidebarBrand() {
  return (
    <div className="px-space-md pt-space-md pb-space-sm flex items-center gap-space-sm">
      <Image
        src="/images/lapak-receipt-logo.png"
        alt="Logo Lapak UMKM"
        className="h-8 w-auto object-contain rounded"
        width={48}
        height={48}
        priority
      />
      <Link href="/dashboard" className="font-headline-md text-headline-md tracking-tight text-primary">
        {siteConfig.name}
      </Link>
    </div>
  );
}
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-container-low flex flex-col items-center justify-center px-space-md py-space-xl">
      <Link href="/" className="mb-space-lg">
        <Image
          src="/images/lapak-receipt-logo.png"
          alt="Logo Lapak UMKM"
          className="h-9 w-auto"
          width={1060}
          height={282}
          sizes="170px"
          priority
        />
      </Link>
      <div className="w-full max-w-[440px] bg-surface-container-lowest rounded-2xl shadow-[0_4px_0_0_rgba(28,36,48,0.04)] p-space-lg">
        {children}
      </div>
    </div>
  );
}

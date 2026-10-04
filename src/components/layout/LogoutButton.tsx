"use client";

import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

/** Tombol Keluar/Logout — saat ini hanya mengarah ke halaman publik. */
export function LogoutButton() {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.push("/")}
      className="w-full flex items-center gap-space-sm px-space-md py-space-sm rounded-xl text-error hover:bg-error-container/60 transition-colors font-label-ui text-label-ui"
    >
      <Icon name="logout" className="text-xl" />
      <span>Keluar / Logout</span>
    </button>
  );
}
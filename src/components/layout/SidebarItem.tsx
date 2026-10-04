"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/config/navigation";

type SidebarItemProps = {
  item: NavItem;
};

/** Satu entri menu sidebar; aktif sesuai pathname saat ini. */
export function SidebarItem({ item }: SidebarItemProps) {
  const pathname = usePathname();
  const active = pathname === item.href;
  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center gap-space-sm px-space-md py-space-sm transition-all rounded-xl",
        active
          ? "bg-surface-container-low text-primary-container font-label-ui"
          : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
      )}
    >
      <span className="material-symbols-outlined text-xl">{item.icon}</span>
      <span className="font-label-ui text-label-ui">{item.label}</span>
    </Link>
  );
}
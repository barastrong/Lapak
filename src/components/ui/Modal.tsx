import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@/components/ui/Icon";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: ReactNode;
  icon: string;
  children: ReactNode;
  className?: string;
};

/** Overlay modal generik dengan backdrop gelap + header + tombol tutup. */
export function Modal({ open, onClose, title, icon, children, className }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-inverse-surface/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div
        className={cn(
          "bg-surface-container-lowest rounded-xl shadow-xl max-w-md w-full p-space-lg flex flex-col gap-space-md relative",
          className
        )}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <Icon name={icon} className="text-primary text-xl" />
            <h3 className="font-headline-sm text-headline-sm text-on-surface">{title}</h3>
          </div>
          <button
            type="button"
            className="text-on-surface-variant hover:text-on-surface p-1"
            onClick={onClose}
            aria-label="Tutup"
          >
            <Icon name="close" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
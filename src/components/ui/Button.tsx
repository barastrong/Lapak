import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type ButtonVariant =
  | "primary"
  | "primaryContainer"
  | "secondary"
  | "surface"
  | "surfaceContainer"
  | "ghost"
  | "error";

const STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-primary hover:bg-primary-container text-on-primary shadow-sm active:translate-y-0.5",
  primaryContainer:
    "bg-primary-container hover:bg-primary text-on-primary shadow-md active:translate-y-0.5",
  secondary:
    "bg-secondary-container text-on-secondary-container hover:bg-secondary hover:text-on-secondary",
  surface:
    "bg-surface-container-lowest hover:bg-surface-container text-on-surface shadow-sm",
  surfaceContainer:
    "bg-surface-container hover:bg-surface-container-high text-on-surface",
  ghost: "text-on-surface-variant hover:text-on-surface hover:bg-surface-container",
  error: "bg-error-container text-on-error-container hover:bg-opacity-80",
};

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

/** Tombol generik dengan variasi warna Material token. */
export function Button({ children, variant = "primary", className, type = "button", ...rest }: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-xl font-label-ui text-label-ui px-space-md py-2 whitespace-nowrap transition-all",
        STYLES[variant],
        className
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
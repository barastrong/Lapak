import { cn } from "@/lib/utils";

export type BadgeColor =
  | "primary"
  | "tertiary"
  | "secondary"
  | "error"
  | "neutral"
  | "subtle";

const STYLES: Record<BadgeColor, string> = {
  primary:
    "bg-primary-container text-on-primary",
  tertiary:
    "bg-tertiary-fixed text-tertiary",
  secondary:
    "bg-secondary-fixed text-on-secondary-fixed",
  error:
    "bg-error-container text-error",
  neutral:
    "bg-surface-container-high text-on-surface",
  subtle:
    "bg-surface-container text-on-surface",
};

type BadgeProps = {
  children: string;
  color?: BadgeColor;
  className?: string;
};

/** Badge/label teks kecil dengan warna Material token. */
export function Badge({ children, color = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-label-code",
        STYLES[color],
        className
      )}
    >
      {children}
    </span>
  );
}
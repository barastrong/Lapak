import { cn } from "@/lib/utils";

type IconProps = {
  name: string;
  className?: string;
};

/** Wrapper ikon Material Symbols Outlined (dimuat lewat <link>). */
export function Icon({ name, className }: IconProps) {
  return (
    <span className={cn("material-symbols-outlined", className)} aria-hidden>
      {name}
    </span>
  );
}
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type PaginationProps = {
  total: number;
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  renderPage?: (page: number) => ReactNode;
};

/** Kontrol halaman tabel generik (Previous, nomor halaman, Next). */
export function Pagination({ total, page, totalPages, onPageChange, renderPage }: PaginationProps) {
  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, start + 4);
  for (let i = start; i <= end; i++) pages.push(i);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="w-8 h-8 rounded border border-on-surface/15 flex items-center justify-center text-on-surface-variant hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Halaman sebelumnya"
      >
        <span className="material-symbols-outlined text-base">chevron_left</span>
      </button>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onPageChange(p)}
          className={cn(
            "w-8 h-8 rounded font-label-code text-xs flex items-center justify-center",
            p === page
              ? "bg-primary text-white shadow-xs"
              : "border border-on-surface/15 text-on-surface hover:bg-white"
          )}
        >
          {renderPage ? renderPage(p) : p}
        </button>
      ))}
      {end < totalPages ? (
        <>
          <span className="px-1 text-on-surface-variant">...</span>
          <button
            type="button"
            onClick={() => onPageChange(totalPages)}
            className="w-8 h-8 rounded border border-on-surface/15 flex items-center justify-center text-on-surface hover:bg-white font-label-code text-xs"
          >
            {totalPages}
          </button>
        </>
      ) : null}
      <button
        type="button"
        disabled={page >= totalPages}
        onClick={() => onPageChange(page + 1)}
        className="w-8 h-8 rounded border border-on-surface/15 flex items-center justify-center text-on-surface-variant hover:bg-white disabled:opacity-30 disabled:cursor-not-allowed"
        aria-label="Halaman berikutnya"
      >
        <span className="material-symbols-outlined text-base">chevron_right</span>
      </button>
      <span className="pl-2 text-xs text-on-surface-variant">{total} total</span>
    </div>
  );
}
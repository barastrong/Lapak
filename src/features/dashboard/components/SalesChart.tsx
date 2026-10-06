"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/format";
import { cn } from "@/lib/utils";
import type { SalesDataPoint } from "@/features/dashboard/types";

export type SalesChartProps = {
  data: SalesDataPoint[];
  title?: string;
};

type MetricMode = "omset" | "laba" | "transaksi";

/** Grafik mingguan interaktif — bar chart dinamis murni Tailwind CSS tanpa dependensi eksternal. */
export function SalesChart({ data, title = "Tren Penjualan 7 Hari" }: SalesChartProps) {
  const [mode, setMode] = useState<MetricMode>("omset");
  const [selectedIdx, setSelectedIdx] = useState<number>(data.length > 0 ? data.length - 2 : 0);

  const getValue = (d: SalesDataPoint, m: MetricMode) => {
    if (m === "omset") return d.omset;
    if (m === "laba") return d.laba ?? Math.round(d.omset * 0.18);
    return d.transaksi ?? Math.round(d.omset / 43000);
  };

  const values = data.map((d) => getValue(d, mode));
  const max = Math.max(...values, 1);
  const total = values.reduce((a, b) => a + b, 0);
  const average = Math.round(total / (data.length || 1));

  let peakIdx = 0;
  let peakVal = -1;
  values.forEach((v, idx) => {
    if (v > peakVal) {
      peakVal = v;
      peakIdx = idx;
    }
  });

  const activePoint = data[selectedIdx] ?? data[0];
  const activeVal = getValue(activePoint, mode);

  return (
    <div className="bg-surface-container-lowest rounded-2xl border border-surface-container/60 shadow-xs p-space-md md:p-space-lg flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-1">
        <div>
          <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold tracking-tight">
            {title}
          </h2>
          <p className="text-body-sm text-xs text-on-surface-variant">
            Perbandingan omzet, keuntungan, dan volume transaksi sepekan
          </p>
        </div>

        {/* Mode Switcher */}
        <div className="flex items-center bg-surface-container-low p-1 rounded-xl self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setMode("omset")}
            className={cn(
              "px-3 py-1 rounded-lg font-label-ui text-xs transition-all cursor-pointer",
              mode === "omset"
                ? "bg-surface-container-lowest text-primary font-bold shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Omzet
          </button>
          <button
            type="button"
            onClick={() => setMode("laba")}
            className={cn(
              "px-3 py-1 rounded-lg font-label-ui text-xs transition-all cursor-pointer",
              mode === "laba"
                ? "bg-surface-container-lowest text-tertiary font-bold shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Laba Bersih
          </button>
          <button
            type="button"
            onClick={() => setMode("transaksi")}
            className={cn(
              "px-3 py-1 rounded-lg font-label-ui text-xs transition-all cursor-pointer",
              mode === "transaksi"
                ? "bg-surface-container-lowest text-secondary font-bold shadow-xs"
                : "text-on-surface-variant hover:text-on-surface"
            )}
          >
            Transaksi
          </button>
        </div>
      </div>

      {/* Selected Day Info Strip */}
      <div className="flex items-center justify-between bg-surface-container-low/70 px-space-md py-2.5 rounded-xl border border-surface-container">
        <div className="flex items-center gap-2">
          <span className="font-label-code text-xs px-2 py-0.5 rounded bg-surface-container-high text-on-surface font-bold">
            {activePoint.label} {activePoint.isToday ? "(Hari Ini)" : ""}
          </span>
          <span className="text-xs text-on-surface-variant">
            {mode === "omset" ? "Omzet Harian" : mode === "laba" ? "Estimasi Laba Bersih" : "Volume Transaksi"}:
          </span>
        </div>
        <div className="font-label-numeric text-sm sm:text-base font-bold text-on-surface">
          {mode === "transaksi" ? `${activeVal} transaksi` : formatRupiah(activeVal)}
        </div>
      </div>

      <div className="relative pt-6">
        <div
          className="absolute left-0 right-0 border-t border-dashed border-outline-variant/60 pointer-events-none z-0"
          style={{ bottom: `${Math.round((average / max) * 150) + 28}px` }}
        >
          <span className="absolute left-0 -top-3 font-label-code text-[10px] font-semibold text-on-surface-variant bg-surface-container-lowest pr-1">
            {mode === "transaksi" ? `${average} trx` : formatRupiah(average)}
          </span>
        </div>

        <div className="absolute left-0 bottom-7 font-label-code text-[10px] text-on-surface-variant pointer-events-none">
          {mode === "transaksi" ? "0 trx" : "Rp 0"}
        </div>

        {mode === "laba" ? (
          /* Diagram Garis (Line Chart) untuk Tren Laba Bersih */
          <div className="h-44 relative z-10 pl-16 flex flex-col justify-end">
            <svg className="w-full h-36 overflow-visible" viewBox="0 0 500 130" preserveAspectRatio="none">
              <defs>
                <linearGradient id="labaAreaGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#004524" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#004524" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              {(() => {
                const pts = data.map((d, i) => {
                  const val = getValue(d, "laba");
                  const x = 30 + (i / Math.max(1, data.length - 1)) * 440;
                  const y = 115 - (val / max) * 100;
                  return { x, y, val, i, label: d.label };
                });
                const linePath = pts.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
                const areaPath = `${linePath} L ${pts[pts.length - 1].x} 120 L ${pts[0].x} 120 Z`;
                return (
                  <>
                    <path d={areaPath} fill="url(#labaAreaGrad)" />
                    <path d={linePath} fill="none" stroke="#004524" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                    {pts.map((p) => {
                      const isSel = p.i === selectedIdx;
                      return (
                        <g key={p.label} className="cursor-pointer" onClick={() => setSelectedIdx(p.i)}>
                          <circle cx={p.x} cy={p.y} r={isSel ? 7 : 4.5} fill={isSel ? "#004524" : "#ffffff"} stroke="#004524" strokeWidth="2.5" />
                        </g>
                      );
                    })}
                  </>
                );
              })()}
            </svg>
            <div className="flex justify-between items-center px-4 pt-2">
              {data.map((d, i) => (
                <button
                  key={d.label}
                  type="button"
                  onClick={() => setSelectedIdx(i)}
                  className="flex flex-col items-center cursor-pointer"
                >
                  <span className={cn("font-label-code text-[11px]", i === selectedIdx ? "font-bold text-tertiary" : "text-on-surface-variant")}>
                    {d.label}
                  </span>
                  {d.isToday && <span className="w-1 h-1 rounded-full bg-tertiary mt-0.5" />}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex items-end gap-2 sm:gap-4 h-44 relative z-10 pl-16">
          {data.map((d, i) => {
            const val = getValue(d, mode);
            const heightPct = Math.max(12, Math.round((val / max) * 100));
            const isSelected = i === selectedIdx;
            const isPeak = i === peakIdx;

            return (
              <button
                key={d.label}
                type="button"
                onClick={() => setSelectedIdx(i)}
                className="flex flex-col items-center gap-1.5 flex-1 group focus:outline-none cursor-pointer"
              >
                {/* Peak marker tag */}
                <div className="h-4 flex items-center justify-center">
                  {isPeak ? (
                    <span className="font-label-code text-[9px] px-1 py-0.2 rounded bg-tertiary-fixed text-on-tertiary-fixed font-bold leading-none">
                      Top
                    </span>
                  ) : isSelected ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  ) : null}
                </div>

                {/* Bar */}
                <div className="w-full h-36 flex items-end">
                  <div
                    className={cn(
                      "w-full rounded-t-lg transition-all duration-300 relative",
                      mode === "omset"
                        ? isSelected
                          ? "bg-primary shadow-sm"
                          : "bg-primary-container/60 hover:bg-primary-container"
                        : isSelected
                        ? "bg-secondary shadow-sm"
                        : "bg-secondary-fixed/80 hover:bg-secondary"
                    )}
                    style={{ height: `${heightPct}%` }}
                  >
                    {/* Top highlight bar */}
                    <div
                      className={cn(
                        "w-full h-1 rounded-t-lg",
                        isSelected ? "bg-white/40" : "bg-transparent"
                      )}
                    />
                  </div>
                </div>

                {/* Label */}
                <div className="flex flex-col items-center">
                  <span
                    className={cn(
                      "font-label-code text-[11px] transition-colors",
                      isSelected
                        ? "font-bold text-primary"
                        : "text-on-surface-variant group-hover:text-on-surface"
                    )}
                  >
                    {d.label}
                  </span>
                  {d.isToday && (
                    <span className="w-1 h-1 rounded-full bg-primary mt-0.5" />
                  )}
                </div>
              </button>
            );
          })}
          </div>
        )}
      </div>

      {/* Chart Footer summary */}
      <div className="flex flex-wrap items-center justify-between pt-2 border-t border-surface-container text-xs text-on-surface-variant font-label-code gap-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-tertiary"></span>
          <span>
            Puncak sepekan: <strong>{data[peakIdx]?.label}</strong> (
            {mode === "transaksi" ? `${peakVal} trx` : formatRupiah(peakVal)})
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Total 7 Hari:</span>
          <span className="font-bold text-on-surface">
            {mode === "transaksi" ? `${total} transaksi` : formatRupiah(total)}
          </span>
        </div>
      </div>
    </div>
  );
}

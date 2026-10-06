"use client";

import { useState } from "react";
import { formatRupiah } from "@/lib/format";
import type { ChartCallout, DailyProfitPoint } from "@/features/laporan/types";

type ProfitChartProps = {
  data: DailyProfitPoint[];
  todayLabel: string;
  target: number;
  callouts: ChartCallout[];
};

const VIEW = { w: 900, h: 240, pl: 65, pr: 860 };

/** Grafik garis tren laba harian interaktif (SVG murni, responsive, tanpa dependency). */
export function ProfitChart({ data, todayLabel, target, callouts }: ProfitChartProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  if (data.length === 0) return null;

  const currentIdx = hoveredIdx !== null && hoveredIdx < data.length ? hoveredIdx : data.length - 1;

  const maxVal = Math.max(...data.map((d) => d.profit), target * 1.25, 1);
  const minVal = 0;

  const points = data.map((d, i) => {
    const x = data.length === 1 ? (VIEW.pl + VIEW.pr) / 2 : VIEW.pl + (i / (data.length - 1)) * (VIEW.pr - VIEW.pl);
    const y = 190 - ((d.profit - minVal) / (maxVal - minVal)) * 160;
    return { ...d, x, y };
  });

  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `M ${points[0].x},190 L ${points.map((p) => `${p.x},${p.y}`).join(" L ")} L ${points[points.length - 1].x},190 Z`;
  const targetY = 190 - ((target - minVal) / (maxVal - minVal)) * 160;

  const activePoint = points[currentIdx] ?? points[points.length - 1];

  return (
    <div className="bg-surface-container-lowest rounded-2xl p-space-md sm:p-space-lg border border-surface-container/60 shadow-xs flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-1 border-b border-surface-container">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold tracking-tight">
            Tren Laba Bersih
          </h2>
          <p className="text-body-sm text-xs text-on-surface-variant">
            Perkembangan laba riil warung setelah dipotong modal HPP kulakan
          </p>
        </div>
        <div className="flex items-center gap-space-md font-label-code text-xs text-on-surface-variant">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-tertiary"></span>
            <span className="text-on-surface font-semibold">Laba Bersih</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-4 border-t border-dashed border-outline"></span>
            <span>Target Harian ({formatRupiah(target)})</span>
          </div>
        </div>
      </div>

      <div className="relative w-full pt-2">
        {/* Active Point Hover Badge */}
        {activePoint && (
          <div
            className="absolute top-0 z-10 bg-inverse-surface text-inverse-on-surface px-3 py-1.5 rounded-xl shadow-md font-label-code text-xs flex flex-col items-center pointer-events-none transition-all duration-150"
            style={{
              left: `${Math.min(85, Math.max(15, (activePoint.x / VIEW.w) * 100))}%`,
              transform: "translateX(-50%)",
            }}
          >
            <span className="text-[10px] text-inverse-on-surface/80">
              {activePoint.label === points[points.length - 1].label ? todayLabel : activePoint.label}
            </span>
            <span className="font-bold text-tertiary-fixed-dim text-sm">
              {formatRupiah(activePoint.profit)}
            </span>
            {activePoint.omset && (
              <span className="text-[10px] text-inverse-on-surface/70">
                Omzet: {formatRupiah(activePoint.omset)}
              </span>
            )}
          </div>
        )}

        <svg className="w-full h-64 overflow-visible" preserveAspectRatio="none" viewBox="0 0 900 240">
          <defs>
            <linearGradient id="profitGrad" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#88d7a1" stopOpacity="0.45" />
              <stop offset="100%" stopColor="#88d7a1" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          <GridLine x1={VIEW.pl} x2={VIEW.pr} y={40} yLabel={44} text={formatRupiah(Math.round(maxVal * 0.9))} />
          <GridLine x1={VIEW.pl} x2={VIEW.pr} y={115} yLabel={119} text={formatRupiah(Math.round(maxVal * 0.5))} />
          <GridLine x1={VIEW.pl} x2={VIEW.pr} y={190} yLabel={194} text="Rp 0" />

          {/* Target line */}
          <line
            x1={VIEW.pl}
            x2={VIEW.pr}
            y1={targetY}
            y2={targetY}
            stroke="#737783"
            strokeDasharray="4 4"
            strokeOpacity="0.6"
            strokeWidth="1.5"
          />
          <text
            textAnchor="end"
            x={VIEW.pl - 8}
            y={targetY + 4}
            fill="#737783"
            fontSize="11"
            fontFamily="Space Mono, monospace"
          >
            Target {formatRupiah(target)}
          </text>

          {/* Area gradient */}
          <path d={area} fill="url(#profitGrad)" />

          {/* Line path */}
          <path
            d={`M ${line}`}
            fill="none"
            stroke="#004524"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3.5"
          />

          {/* Hover hit targets & data points */}
          {points.map((p, i) => {
            const isHovered = i === currentIdx;
            const isLast = i === points.length - 1;
            return (
              <g
                key={`${p.label}-${i}`}
                className="cursor-pointer group"
                onMouseEnter={() => setHoveredIdx(i)}
                onClick={() => setHoveredIdx(i)}
              >
                {/* Expanded invisible hover hitbox */}
                <circle cx={p.x} cy={p.y} r={20} fill="transparent" />

                {/* Outer ring on hover or last */}
                {(isHovered || isLast) && (
                  <circle cx={p.x} cy={p.y} r={isHovered ? 9 : 7} fill="#88d7a1" opacity={0.4} />
                )}

                {/* Core dot */}
                <circle
                  cx={p.x}
                  cy={p.y}
                  r={isHovered ? 6 : 4.5}
                  fill={isHovered ? "#004524" : isLast ? "#004524" : "#ffffff"}
                  stroke="#004524"
                  strokeWidth="2.5"
                />

                {/* X axis text */}
                <text
                  textAnchor="middle"
                  x={p.x}
                  y={215}
                  fill={isHovered ? "#004524" : "#737783"}
                  className="font-label-code"
                  fontSize="11"
                  fontWeight={isHovered ? 700 : 400}
                >
                  {p.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Insight Stat Callouts */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-2 border-t border-surface-container font-label-code text-xs">
        {callouts.map((c) => (
          <div key={c.label} className="bg-surface-container-low/60 p-2.5 rounded-xl border border-surface-container/50 flex flex-col">
            <span className="text-on-surface-variant text-[11px]">{c.label}</span>
            <span className={`font-bold text-on-surface text-xs sm:text-sm mt-0.5 ${c.valueClassName ?? ""}`}>
              {c.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function GridLine({
  x1,
  x2,
  y,
  yLabel,
  text,
}: {
  x1: number;
  x2: number;
  y: number;
  yLabel: number;
  text: string;
}) {
  return (
    <g className="text-on-surface-variant font-label-code" fill="currentColor" fontSize="10">
      <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1={x1} x2={x2} y1={y} y2={y} />
      <text textAnchor="end" x={x1 - 8} y={yLabel}>
        {text}
      </text>
    </g>
  );
}

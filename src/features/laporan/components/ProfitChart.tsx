import { formatRupiah } from "@/lib/format";
import type { ChartCallout, DailyProfitPoint } from "@/features/laporan/types";

type ProfitChartProps = {
  data: DailyProfitPoint[];
  todayLabel: string;
  target: number;
  callouts: ChartCallout[];
};

const VIEW = { w: 900, h: 240, pl: 55, pr: 880 };

/** Grafik garis tren laba harian (SVG murni, tanpa dependency). */
export function ProfitChart({ data, todayLabel, target, callouts }: ProfitChartProps) {
  const max = Math.max(...data.map((d) => d.profit), target * 3);
  const points = data.map((d, i) => {
    const x = VIEW.pl + (i / (data.length - 1)) * (VIEW.pr - VIEW.pl);
    const y = 200 - (d.profit / max) * 180;
    return { ...d, x, y };
  });
  const line = points.map((p) => `${p.x},${p.y}`).join(" ");
  const area = `M ${points[0].x},200 L ${points.map((p) => `${p.x},${p.y}`).join(" L ")} L ${points[points.length - 1].x},200 Z`;
  const last = points[points.length - 1];
  const targetY = 200 - (target / max) * 180;

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-lg shadow-sm flex flex-col gap-space-md">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm pb-space-xs">
        <div>
          <h2 className="font-headline-md text-headline-md text-on-surface">
            Tren Laba Harian (7 Hari Terakhir)
          </h2>
          <p className="text-body-sm text-on-surface-variant">
            Perkembangan keuntungan bersih per hari selama periode berjalan
          </p>
        </div>
        <div className="flex items-center gap-space-md font-label-code text-label-code text-on-surface-variant">
          <div className="flex items-center gap-space-xs">
            <span className="w-3 h-3 rounded-full bg-tertiary"></span>
            <span className="text-on-surface font-medium">Laba Bersih</span>
          </div>
          <div className="flex items-center gap-space-xs">
            <span className="w-4 border-t border-dashed border-outline"></span>
            <span>Target Harian ({formatRupiah(target)})</span>
          </div>
        </div>
      </div>

      <div className="relative w-full pt-4">
        <div className="absolute right-4 top-2 sm:right-6 sm:top-4 z-10 bg-inverse-surface text-inverse-on-surface px-space-sm py-1 rounded-lg shadow-md font-label-code text-label-code flex flex-col items-center pointer-events-none">
          <span className="text-xs text-inverse-on-surface/80">{todayLabel}</span>
          <span className="font-bold text-tertiary-fixed-dim">{formatRupiah(last.profit)}</span>
        </div>
        <svg className="w-full h-64 overflow-visible" preserveAspectRatio="none" viewBox="0 0 900 240">
          <defs>
            <linearGradient id="profitGrad" x1="0%" x2="0%" y1="0%" y2="100%">
              <stop offset="0%" stopColor="#88d7a1" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#88d7a1" stopOpacity="0" />
            </linearGradient>
          </defs>
          <GridLine x1={VIEW.pl} x2={VIEW.pr} y={20} yLabel={24} text="600rb" />
          <GridLine x1={VIEW.pl} x2={VIEW.pr} y={80} yLabel={84} text="400rb" />
          <line x1={VIEW.pl} x2={VIEW.pr} y1={targetY} y2={targetY} stroke="#737783" strokeDasharray="4 4" strokeOpacity="0.6" strokeWidth="1.5" />
          <text textAnchor="end" x={VIEW.pl - 5} y={targetY + 4} fill="#737783" fontSize="11" fontFamily="Space Mono, monospace">
            {formatRupiah(target)}
          </text>
          <GridLine x1={VIEW.pl} x2={VIEW.pr} y={200} yLabel={204} text="Rp 0" />
          <path d={area} fill="url(#profitGrad)" />
          <path d={`M ${line}`} fill="none" stroke="#004524" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" />
          {points.map((p, i) => (
            <circle key={p.label} cx={p.x} cy={p.y} r={i === points.length - 1 ? 5 : 4.5} fill={i === points.length - 1 ? "#004524" : "#ffffff"} stroke="#004524" strokeWidth="2.5" />
          ))}
          <circle cx={last.x} cy={last.y} r={8} fill="#88d7a1" opacity={0.4} />
          {points.map((p, i) => (
            <text key={p.label} textAnchor="middle" x={p.x} y={222} fill={i === points.length - 1 ? "#004524" : "currentColor"} className="text-on-surface-variant font-label-code" fontSize="11" fontWeight={i === points.length - 1 ? 700 : 400}>
              {i === points.length - 1 ? `${p.label} (Hari ini)` : p.label}
            </text>
          ))}
        </svg>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-space-sm pt-space-xs font-label-code text-label-code">
        {callouts.map((c) => (
          <div key={c.label} className="bg-surface-container-low p-space-sm rounded-lg flex flex-col">
            <span className="text-on-surface-variant text-xs">{c.label}</span>
            <span className={`font-bold text-on-surface text-sm ${c.valueClassName ?? ""}`}>{c.value}</span>
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
    <g className="text-on-surface-variant font-label-code" fill="currentColor" fontSize="11">
      <line stroke="currentColor" strokeOpacity="0.1" strokeWidth="1" x1={x1} x2={x2} y1={y} y2={y} />
      <text textAnchor="end" x={x1 - 5} y={yLabel}>
        {text}
      </text>
    </g>
  );
}
import React, { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";

interface DataPoint {
  year: string;
  val: number;
  type: "live" | "predicted";
  label: string;
  note?: string;
}

const croData: DataPoint[] = [
  { year: "2021", val: 61.8, type: "live", label: "$61.8B", note: "Post-pandemic baseline" },
  { year: "2022", val: 68.4, type: "live", label: "$68.4B", note: "Trial volume rebound (+10.7%)" },
  { year: "2023", val: 74.9, type: "live", label: "$74.9B", note: "Oncology phase surge (+9.5%)" },
  { year: "2024", val: 81.2, type: "live", label: "$81.2B", note: "10,500 new trials initiated (+8.4%)" },
  { year: "2025", val: 87.1, type: "live", label: "$87.1B", note: "Emerging biopharma scale (+7.3%)" },
  { year: "2026", val: 93.0, type: "live", label: "$93.0B", note: "CURRENT LIVE TIME (8.6% YoY)" },
  { year: "2027", val: 101.0, type: "predicted", label: "$101.0B", note: "Phase II/III expansion forecast" },
  { year: "2028", val: 109.7, type: "predicted", label: "$109.7B", note: "Biotech funding deployment" },
  { year: "2029", val: 119.1, type: "predicted", label: "$119.1B", note: "Global CRO consolidation" },
  { year: "2030", val: 129.4, type: "predicted", label: "$129.4B", note: "Predicted 2030 Market Cap" },
];

const techData: DataPoint[] = [
  { year: "2021", val: 100, type: "live", label: "100 pts", note: "Base signal index" },
  { year: "2022", val: 118, type: "live", label: "118 pts", note: "Cloud infra scale (+18%)" },
  { year: "2023", val: 132, type: "live", label: "132 pts", note: "Data/AI team demand (+11.8%)" },
  { year: "2024", val: 154, type: "live", label: "154 pts", note: "Specialist role tightness (+16.6%)" },
  { year: "2025", val: 178, type: "live", label: "178 pts", note: "Capacity gap acceleration (+15.5%)" },
  { year: "2026", val: 205, type: "live", label: "205 pts", note: "CURRENT LIVE TIME (Surge peak)" },
  { year: "2027", val: 238, type: "predicted", label: "238 pts", note: "Pre-requisition private routing" },
  { year: "2028", val: 275, type: "predicted", label: "275 pts", note: "High-yield match network scale" },
  { year: "2029", val: 315, type: "predicted", label: "315 pts", note: "Autonomous signal sourcing" },
  { year: "2030", val: 360, type: "predicted", label: "360 pts", note: "Predicted 3.6x baseline growth" },
];

export function SignalGrowthChart() {
  const [activeTab, setActiveTab] = useState<"cro" | "tech">("cro");
  const [hoveredPoint, setHoveredPoint] = useState<DataPoint | null>(null);
  const [liveTimeStr, setLiveTimeStr] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setLiveTimeStr(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const data = activeTab === "cro" ? croData : techData;
  const currentHover = hoveredPoint || data[5]; // Default to 2026 (Live Time)

  // SVG Chart layout calculation
  const width = 720;
  const height = 260;
  const paddingX = 45;
  const paddingY = 35;

  const minVal = Math.min(...data.map((d) => d.val)) * 0.85;
  const maxVal = Math.max(...data.map((d) => d.val)) * 1.08;

  const getX = (index: number) => {
    return paddingX + (index / (data.length - 1)) * (width - paddingX * 2);
  };

  const getY = (val: number) => {
    return height - paddingY - ((val - minVal) / (maxVal - minVal)) * (height - paddingY * 2);
  };

  // Generate paths
  const livePoints = data.filter((d) => d.type === "live");
  const predictedPoints = data.filter((d) => d.type === "predicted" || d.year === "2026");

  const livePathD = livePoints.reduce((acc, pt, idx) => {
    const origIdx = data.findIndex((d) => d.year === pt.year);
    const x = getX(origIdx);
    const y = getY(pt.val);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  const predictedPathD = predictedPoints.reduce((acc, pt, idx) => {
    const origIdx = data.findIndex((d) => d.year === pt.year);
    const x = getX(origIdx);
    const y = getY(pt.val);
    return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
  }, "");

  // Area paths
  const liveAreaD = `${livePathD} L ${getX(5)} ${height - paddingY} L ${getX(0)} ${height - paddingY} Z`;
  const lastIdx = data.length - 1;
  const predictedAreaD = `${predictedPathD} L ${getX(lastIdx)} ${height - paddingY} L ${getX(5)} ${height - paddingY} Z`;

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm select-none">
      {/* Top Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-600"></span>
            </span>
            <span className="text-xs font-mono font-semibold tracking-wider text-emerald-800 uppercase">
              LIVE TELEMETRY · {liveTimeStr || "REAL-TIME"}
            </span>
          </div>
          <h3 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Signal Velocity &amp; Growth Trajectory
          </h3>
        </div>

        {/* Dataset Toggle Tabs */}
        <div className="flex items-center p-1 bg-gray-100 rounded-lg self-start sm:self-auto">
          <button
            type="button"
            onClick={() => {
              setActiveTab("cro");
              setHoveredPoint(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === "cro"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            CRO Market ($B)
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("tech");
              setHoveredPoint(null);
            }}
            className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              activeTab === "tech"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            US Tech Capacity Index
          </button>
        </div>
      </div>

      {/* KPI Highlight Strip */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 my-4 p-3 bg-gray-50/80 rounded-lg border border-gray-100">
        <div>
          <div className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">
            2026 Live Status
          </div>
          <div className="text-base font-bold text-gray-900 font-mono">
            {data[5].label}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">
            2030 Predicted Growth
          </div>
          <div className="text-base font-bold text-orange-600 font-mono flex items-center gap-1">
            {data[9].label}
            <ArrowUpRight className="w-4 h-4 inline" />
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">
            Annualized Rate (CAGR)
          </div>
          <div className="text-base font-bold text-gray-900 font-mono">
            {activeTab === "cro" ? "+8.6%" : "+15.2%"}
          </div>
        </div>
        <div>
          <div className="text-[11px] uppercase tracking-wider text-gray-500 font-medium">
            Active Signal Focus
          </div>
          <div className="text-xs font-semibold text-emerald-800 truncate mt-0.5">
            {currentHover.year} ({currentHover.type === "live" ? "Live Time" : "Predicted"})
          </div>
        </div>
      </div>

      {/* SVG Chart Container */}
      <div className="relative w-full overflow-hidden my-2">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-auto overflow-visible"
        >
          <defs>
            <linearGradient id="liveGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0f7659" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#0f7659" stopOpacity="0.0" />
            </linearGradient>

            <linearGradient id="predGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c2410c" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#c2410c" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => {
            const y = paddingY + ratio * (height - paddingY * 2);
            return (
              <line
                key={i}
                x1={paddingX}
                y1={y}
                x2={width - paddingX}
                y2={y}
                stroke="#f1f5f9"
                strokeWidth="1"
              />
            );
          })}

          {/* Vertical Divider for 2026 (Live Time vs Prediction Boundary) */}
          <line
            x1={getX(5)}
            y1={paddingY - 10}
            x2={getX(5)}
            y2={height - paddingY + 5}
            stroke="#0f7659"
            strokeWidth="1.5"
            strokeDasharray="4 3"
            opacity="0.6"
          />
          <text
            x={getX(5)}
            y={paddingY - 15}
            textAnchor="middle"
            fill="#0f7659"
            className="text-[10px] font-mono font-bold uppercase tracking-wider"
          >
            2026 LIVE TIME
          </text>

          {/* Area Fills */}
          <path
            d={liveAreaD}
            fill="url(#liveGradient)"
            className="transition-all duration-500 ease-out"
          />
          <path
            d={predictedAreaD}
            fill="url(#predGradient)"
            className="transition-all duration-500 ease-out"
          />

          {/* Live Path (Solid Green Line) */}
          <path
            d={livePathD}
            fill="none"
            stroke="#0f7659"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 ease-out"
          />

          {/* Predicted Path (Dashed Orange Line) */}
          <path
            d={predictedPathD}
            fill="none"
            stroke="#c2410c"
            strokeWidth="2.5"
            strokeDasharray="6 4"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="transition-all duration-500 ease-out"
          />

          {/* Interactive Data Points */}
          {data.map((pt, idx) => {
            const x = getX(idx);
            const y = getY(pt.val);
            const isHovered = currentHover.year === pt.year;
            const isLiveNow = pt.year === "2026";
            const isPredicted = pt.type === "predicted";

            return (
              <g key={pt.year} className="cursor-pointer">
                {/* Invisible hover trigger bar */}
                <rect
                  x={x - (width / data.length) / 2}
                  y={paddingY}
                  width={width / data.length}
                  height={height - paddingY * 2}
                  fill="transparent"
                  onMouseEnter={() => setHoveredPoint(pt)}
                />

                {/* Point Outer Ring on Hover */}
                {isHovered && (
                  <circle
                    cx={x}
                    cy={y}
                    r={isLiveNow ? "10" : "8"}
                    fill={isPredicted ? "#ffedd5" : "#d1fae5"}
                    stroke={isPredicted ? "#c2410c" : "#0f7659"}
                    strokeWidth="1.5"
                    opacity="0.8"
                  />
                )}

                {/* Pulsing beacon for 2026 NOW point */}
                {isLiveNow && (
                  <circle
                    cx={x}
                    cy={y}
                    r="8"
                    fill="#0f7659"
                    className="animate-ping opacity-40"
                  />
                )}

                {/* Core Point Circle */}
                <circle
                  cx={x}
                  cy={y}
                  r={isLiveNow ? "5" : isHovered ? "4.5" : "3.5"}
                  fill={isLiveNow ? "#0f7659" : isPredicted ? "#c2410c" : "#0f7659"}
                  stroke="#ffffff"
                  strokeWidth="2"
                />

                {/* Year Axis Label */}
                <text
                  x={x}
                  y={height - 10}
                  textAnchor="middle"
                  fill={isHovered ? "#111827" : isLiveNow ? "#0f7659" : "#64748b"}
                  fontWeight={isHovered || isLiveNow ? "700" : "400"}
                  className="text-[11px] font-mono"
                >
                  {pt.year}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Dynamic Hover Tooltip / Detail Card */}
      <div
        className={`mt-2 p-3 rounded-lg border text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2 transition-all duration-300 ${
          currentHover.type === "live"
            ? "bg-emerald-50/80 border-emerald-200 text-emerald-950"
            : "bg-orange-50/80 border-orange-200 text-orange-950"
        }`}
      >
        <div className="flex items-center gap-2">
          <span
            className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wide ${
              currentHover.type === "live"
                ? "bg-emerald-700 text-white"
                : "bg-orange-600 text-white"
            }`}
          >
            {currentHover.year === "2026"
              ? "LIVE TIME · NOW"
              : currentHover.type === "live"
              ? "HISTORICAL SIGNAL"
              : "PREDICTED GROWTH"}
          </span>
          <span className="font-bold font-mono text-sm">
            {currentHover.label}
          </span>
        </div>
        <div className="text-gray-700 font-medium">
          {currentHover.note}
        </div>
      </div>

      {/* Legend Footer */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-4 pt-3 border-t border-gray-100 text-[11px] text-gray-500">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-emerald-700 inline-block rounded-full"></span>
            <span>Live Time (2021–2026)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-0.5 bg-orange-600 stroke-dashed inline-block border-b border-dashed border-orange-600"></span>
            <span>Predicted Growth (2026–2030)</span>
          </div>
        </div>
        <div className="text-gray-400 italic">
          Hover points to inspect live vs. projected milestones
        </div>
      </div>
    </div>
  );
}

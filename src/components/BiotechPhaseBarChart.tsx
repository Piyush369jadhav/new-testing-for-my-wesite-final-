import React, { useState } from "react";
import { Layers, DollarSign, Clock, ArrowRight, CheckCircle2 } from "lucide-react";

interface PhaseMetric {
  id: string;
  phase: string;
  name: string;
  signals: string;
  needs: string;
  croSpendM: number; // in $ Millions
  activeTrials: number; // count
  leadTimeMonths: number; // lead time ahead of market
  tagColor: string;
  barGradient: string;
  accentBorder: string;
}

const phaseData: PhaseMetric[] = [
  {
    id: "phase1",
    phase: "Phase I",
    name: "First-in-Human Testing",
    signals: "Safety baseline established, CRO contracts signed, protocol filing complete",
    needs: "CRO selection, clinical operations, regulatory compliance, initial site onboarding",
    croSpendM: 18.5,
    activeTrials: 3850,
    leadTimeMonths: 24,
    tagColor: "bg-teal-700 text-white",
    barGradient: "from-teal-600 to-emerald-500",
    accentBorder: "border-teal-500",
  },
  {
    id: "phase2",
    phase: "Phase II",
    name: "Proof-of-Concept Stage",
    signals: "Efficacy signals validated, patient cohort expansion, multi-site trial rollout",
    needs: "Biostatistics, clinical data management, site expansion, early pharma partner talks",
    croSpendM: 52.0,
    activeTrials: 4120,
    leadTimeMonths: 18,
    tagColor: "bg-[#0f7659] text-white",
    barGradient: "from-[#0f7659] to-teal-400",
    accentBorder: "border-[#0f7659]",
  },
  {
    id: "phase3",
    phase: "Phase III",
    name: "Pivotal Trial at Scale",
    signals: "Global multi-center trials active, NDA/BLA preparation, commercial supply chain lock",
    needs: "Manufacturing readiness (CMO/CDMO), commercial strategy, hospital network & pharma distribution",
    croSpendM: 135.0,
    activeTrials: 2530,
    leadTimeMonths: 12,
    tagColor: "bg-orange-700 text-white",
    barGradient: "from-orange-600 to-amber-500",
    accentBorder: "border-orange-600",
  },
];

type ViewMode = "spend" | "trials" | "leadTime";

export function BiotechPhaseBarChart() {
  const [viewMode, setViewMode] = useState<ViewMode>("spend");
  const [selectedPhase, setSelectedPhase] = useState<PhaseMetric>(phaseData[1]); // Default Phase II

  // Max values for bar scaling
  const maxSpend = 150;
  const maxTrials = 5000;
  const maxLeadTime = 30;

  const getBarPercentage = (item: PhaseMetric) => {
    switch (viewMode) {
      case "spend":
        return (item.croSpendM / maxSpend) * 100;
      case "trials":
        return (item.activeTrials / maxTrials) * 100;
      case "leadTime":
        return (item.leadTimeMonths / maxLeadTime) * 100;
    }
  };

  const getDisplayValue = (item: PhaseMetric) => {
    switch (viewMode) {
      case "spend":
        return `$${item.croSpendM.toFixed(1)}M avg CRO spend`;
      case "trials":
        return `${item.activeTrials.toLocaleString()} active trials`;
      case "leadTime":
        return `${item.leadTimeMonths} months pre-market lead`;
    }
  };

  return (
    <div className="my-8 rounded-xl border border-gray-200 bg-white p-5 md:p-6 shadow-sm select-none">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 rounded">
              BIOTECH GRAPHIC TELEMETRY
            </span>
            <span className="text-xs text-gray-500 font-mono">Phase I · II · III Matrix</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 tracking-tight flex items-center gap-2">
            Biotech Phase Activity &amp; CRO Demand Chart
          </h3>
          <p className="text-xs text-gray-600 mt-1">
            Visualizing capital allocation, trial volume, and pre-market lead times across clinical milestones
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center p-1 bg-gray-100 rounded-lg self-start md:self-auto">
          <button
            type="button"
            onClick={() => setViewMode("spend")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              viewMode === "spend"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <DollarSign className="w-3.5 h-3.5" />
            CRO Spend ($M)
          </button>
          <button
            type="button"
            onClick={() => setViewMode("trials")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              viewMode === "trials"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            Active Trials
          </button>
          <button
            type="button"
            onClick={() => setViewMode("leadTime")}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all cursor-pointer ${
              viewMode === "leadTime"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            Lead Time
          </button>
        </div>
      </div>

      {/* Graphic Bars Section */}
      <div className="space-y-5 my-6">
        {phaseData.map((item) => {
          const pct = getBarPercentage(item);
          const isSelected = selectedPhase.id === item.id;

          return (
            <div
              key={item.id}
              onClick={() => setSelectedPhase(item)}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? "bg-gray-50/90 border-gray-300 shadow-sm ring-1 ring-emerald-600/30"
                  : "bg-white border-gray-100 hover:border-gray-200 hover:bg-gray-50/50"
              }`}
            >
              {/* Row Header */}
              <div className="flex items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2.5">
                  <span className={`px-2.5 py-0.5 font-mono text-xs font-bold rounded ${item.tagColor}`}>
                    {item.phase}
                  </span>
                  <span className="font-bold text-sm text-gray-900">{item.name}</span>
                </div>
                <div className="text-xs font-mono font-bold text-gray-800 bg-white px-2.5 py-1 rounded border border-gray-200 shadow-2xs">
                  {getDisplayValue(item)}
                </div>
              </div>

              {/* Graphic Bar Track */}
              <div className="relative w-full h-8 bg-gray-100 rounded-lg overflow-hidden flex items-center p-1">
                <div
                  className={`h-full rounded-md bg-gradient-to-r ${item.barGradient} transition-all duration-700 ease-out relative flex items-center justify-end pr-3`}
                  style={{ width: `${Math.max(pct, 8)}%` }}
                >
                  <span className="text-[11px] font-mono font-bold text-white tracking-wider drop-shadow-xs">
                    {pct.toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Quick Needs Tags underneath bar */}
              <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-gray-600">
                <span className="font-semibold text-gray-800 text-[11px] uppercase tracking-wide">
                  Key Needs:
                </span>
                {item.needs.split(", ").map((need, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 px-2 py-0.5 bg-white rounded border border-gray-200 text-[11px] text-gray-700"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {need}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Phase Deep-Dive Card */}
      <div
        className={`p-4 rounded-xl border ${selectedPhase.accentBorder} bg-gradient-to-br from-gray-900 to-gray-800 text-white shadow-md transition-all duration-300`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-gray-700/80">
          <div className="flex items-center gap-2">
            <span className={`px-2 py-0.5 font-mono text-xs font-bold rounded ${selectedPhase.tagColor}`}>
              {selectedPhase.phase} TELEMETRY
            </span>
            <span className="text-sm font-bold text-gray-100">{selectedPhase.name}</span>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-semibold">
            Signal Lead: {selectedPhase.leadTimeMonths} Months Ahead of Public Filings
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
          <div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
              Primary Intent Signals Caught:
            </span>
            <p className="text-xs text-gray-200 leading-relaxed bg-gray-800/80 p-2.5 rounded border border-gray-700">
              {selectedPhase.signals}
            </p>
          </div>
          <div>
            <span className="text-[11px] font-mono text-gray-400 uppercase tracking-wider block mb-1">
              Typical Ecosystem Requirements:
            </span>
            <p className="text-xs text-gray-200 leading-relaxed bg-gray-800/80 p-2.5 rounded border border-gray-700">
              {selectedPhase.needs}
            </p>
          </div>
        </div>

        <div className="mt-3 pt-3 border-t border-gray-700/60 flex flex-wrap items-center justify-between text-xs text-gray-300">
          <span>Average CRO Spend: <strong className="text-white font-mono">${selectedPhase.croSpendM}M</strong></span>
          <span>Active Global Pipeline: <strong className="text-white font-mono">{selectedPhase.activeTrials.toLocaleString()} trials</strong></span>
          <span className="text-emerald-400 flex items-center gap-1 font-medium">
            Click another phase bar above to inspect details <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>
    </div>
  );
}

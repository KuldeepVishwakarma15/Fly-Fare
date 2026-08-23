import React from 'react';
import { Shuffle, ArrowRight, Check, MapPin, Bus, AlertCircle } from 'lucide-react';

interface AlternativeRouteOption {
  altRoute: string;
  origin: string;
  destination: string;
  destinationCity: string;
  fare: number;
  savings: number;
  distanceDiffKm: number;
  transitNote: string;
}

interface AlternativeRouteCardProps {
  id?: string;
  currentRoute: string;
  currentFare: number;
  alternatives: AlternativeRouteOption[];
  onSelectAlternative?: (alt: AlternativeRouteOption) => void;
}

export const AlternativeRouteCard: React.FC<AlternativeRouteCardProps> = ({
  id,
  currentRoute,
  currentFare,
  alternatives,
  onSelectAlternative
}) => {
  if (!alternatives || alternatives.length === 0) return null;

  return (
    <div
      id={id}
      className="bg-white dark:bg-[#0A0A0A] rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
    >
      <div className="flex items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20">
            <Shuffle className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Alternative Route Intelligence
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Cost arbitrage suggestions for {currentRoute} (Current: ₹{currentFare.toLocaleString('en-IN')})
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 rounded">
          Smart Savings
        </span>
      </div>

      <div className="space-y-3 mb-3">
        {alternatives.map((alt, idx) => (
          <div
            key={idx}
            className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-emerald-500/40 bg-slate-50/70 dark:bg-slate-900/50 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          >
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {alt.altRoute}
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  via {alt.destinationCity} ({alt.destination})
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                <Bus className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
                <span>{alt.transitNote}</span>
              </div>
            </div>

            <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-200 dark:border-slate-800">
              <div className="text-left sm:text-right">
                <div className="text-base font-bold text-slate-900 dark:text-white">
                  ₹{alt.fare.toLocaleString('en-IN')}
                </div>
                <div className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  Save ₹{alt.savings.toLocaleString('en-IN')} ({Math.round((alt.savings / currentFare) * 100)}%)
                </div>
              </div>

              {onSelectAlternative && (
                <button
                  onClick={() => onSelectAlternative(alt)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Select</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
        <AlertCircle className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500 flex-shrink-0" />
        <span>
          Alternative routes are calculated based on multi-modal travel feasibility (Expressway/Vande Bharat).
        </span>
      </div>
    </div>
  );
};


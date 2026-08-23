import React from 'react';
import { AlertTriangle, TrendingUp, ShieldAlert, ArrowRight, Zap, Info } from 'lucide-react';

interface SurgeAlertCardProps {
  id?: string;
  route: string;
  originCity: string;
  destinationCity: string;
  currentFare: number;
  normalMin: number;
  normalMax: number;
  deviationPct: number;
  probableCause?: string;
  onViewAlternative?: () => void;
}

export const SurgeAlertCard: React.FC<SurgeAlertCardProps> = ({
  id,
  route,
  originCity,
  destinationCity,
  currentFare,
  normalMin,
  normalMax,
  deviationPct,
  probableCause = 'Abnormal demand spike combined with tight seat availability',
  onViewAlternative
}) => {
  return (
    <div
      id={id}
      className="bg-white dark:bg-[#0A0A0A] rounded-xl p-5 border border-rose-200 dark:border-rose-900/40 shadow-sm transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-rose-100 dark:border-rose-950/60">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-lg bg-rose-600 text-white shadow-sm flex-shrink-0 animate-pulse">
            <ShieldAlert className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">
                Surge Detection Engine
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border border-rose-200 dark:border-rose-800/60">
                SEVERE ANOMALY
              </span>
            </div>
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              Abnormal Fare Surge Detected: {route}
            </h4>
          </div>
        </div>

        <div className="flex items-baseline gap-1.5 self-start sm:self-auto bg-rose-50 dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-rose-200 dark:border-rose-900/50">
          <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">
            Deviation:
          </span>
          <span className="text-sm font-bold text-rose-700 dark:text-rose-300">
            +{deviationPct}%
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
        <div className="bg-slate-50 dark:bg-slate-900/70 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Current Fare
          </span>
          <span className="text-lg font-bold text-rose-600 dark:text-rose-400">
            ₹{currentFare.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/70 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Normal Historical Corridor
          </span>
          <span className="text-lg font-bold text-slate-900 dark:text-slate-200">
            ₹{normalMin.toLocaleString('en-IN')} – ₹{normalMax.toLocaleString('en-IN')}
          </span>
        </div>

        <div className="bg-slate-50 dark:bg-slate-900/70 p-3 rounded-lg border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
            Surge Status
          </span>
          <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1 mt-0.5">
            <Zap className="w-3.5 h-3.5" /> High Risk Period
          </span>
        </div>
      </div>

      <div className="p-3 bg-slate-50 dark:bg-slate-900/50 rounded-lg border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 mb-3">
        <span className="font-semibold text-slate-900 dark:text-white mr-1">
          Identified Catalyst:
        </span>
        {probableCause}
      </div>

      {onViewAlternative && (
        <button
          onClick={onViewAlternative}
          className="w-full flex items-center justify-between px-3.5 py-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs"
        >
          <span>Explore Lower-Cost Alternative Routes (Save ₹2,000+)</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};


import React from 'react';
import { HelpCircle, TrendingUp, TrendingDown, Layers, Sparkles } from 'lucide-react';

interface DriverFactor {
  factor: string;
  impactPct: number;
  type: 'positive' | 'negative';
}

interface ExplainableDriversProps {
  id?: string;
  drivers: DriverFactor[];
  primaryFactor: string;
  route?: string;
}

export const ExplainableDrivers: React.FC<ExplainableDriversProps> = ({
  id,
  drivers,
  primaryFactor,
  route = 'DEL → BOM'
}) => {
  return (
    <div
      id={id}
      className="bg-white dark:bg-[#0A0A0A] rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
    >
      <div className="flex items-center justify-between gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Explainable Fare Intelligence
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Decomposition of price movement factors for {route}
            </p>
          </div>
        </div>
        <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded">
          SHAP / Feature Weights
        </span>
      </div>

      {/* Driver Factor Decomposition Bars */}
      <div className="space-y-3 mb-4">
        {drivers.map((d, idx) => {
          const isPositive = d.impactPct >= 0;
          const absVal = Math.abs(d.impactPct);
          const maxScale = 35; // benchmark scale
          const barWidthPct = Math.min(100, Math.max(12, (absVal / maxScale) * 100));

          return (
            <div key={idx} className="group">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-medium text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isPositive ? 'bg-rose-500' : 'bg-emerald-500'
                    }`}
                  />
                  {d.factor}
                </span>
                <span
                  className={`font-semibold tabular-nums ${
                    isPositive
                      ? 'text-rose-600 dark:text-rose-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {isPositive ? `+${d.impactPct}%` : `${d.impactPct}%`}
                </span>
              </div>
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isPositive
                      ? 'bg-rose-500'
                      : 'bg-emerald-500'
                  }`}
                  style={{ width: `${barWidthPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Factor Highlight Box */}
      <div className="p-3.5 rounded-lg bg-blue-50/80 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
        <div className="flex items-start gap-2 text-xs">
          <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
          <div>
            <span className="font-semibold text-blue-900 dark:text-blue-200">
              Primary Driver:
            </span>{' '}
            <span className="text-slate-700 dark:text-slate-300">
              {primaryFactor}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


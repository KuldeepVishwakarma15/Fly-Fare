import React from 'react';
import {
  AlertTriangle,
  Zap,
  Bell,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldAlert,
  Sliders,
  TrendingUp
} from 'lucide-react';
import { SURGE_ALERTS, BASKET_ROUTES } from '../data/mockAirfareData';
import { useNotification } from '../context/NotificationContext';

interface AlertsPageProps {
  onOpenAlertModal: () => void;
  onSelectRouteForAnalysis?: (routeKey: string) => void;
}

export const AlertsPage: React.FC<AlertsPageProps> = ({
  onOpenAlertModal,
  onSelectRouteForAnalysis
}) => {
  const { triggerMockAlertHit } = useNotification();

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 1. Header (Section 15) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Airfare Surge Monitor
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 text-[11px] font-bold border border-rose-200 dark:border-rose-800/40">
              Active Watchdog
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Automated anomaly detection flagging abnormal price surges &gt;25% above corridor standard deviations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => triggerMockAlertHit('DEL-BOM', 'SURGE_WARNING')}
            className="px-3.5 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Surge Event</span>
          </button>

          <button
            onClick={onOpenAlertModal}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5" />
            <span>Set Custom Alert</span>
          </button>
        </div>
      </div>

      {/* 2. Summary Status Bar (Section 15) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Total Active Surges
          </span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            8 Active Surges
          </div>
          <p className="text-[11px] text-slate-400">Across 48 monitored corridors</p>
        </div>

        <div className="p-4 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/40 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
            Critical Surges (&gt;35% jump)
          </span>
          <div className="text-3xl font-black text-rose-600 dark:text-rose-400">
            3 Critical
          </div>
          <p className="text-[11px] text-rose-600/80">Immediate booking penalty warning</p>
        </div>

        <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
            Moderate Surges (20-35% jump)
          </span>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
            5 Moderate
          </div>
          <p className="text-[11px] text-amber-600/80">Early yield curve escalation</p>
        </div>
      </div>

      {/* 3. Detailed Surge Cards List (Section 15) */}
      <div className="space-y-4">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
          Active Surge Incidents
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {SURGE_ALERTS.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border shadow-2xs flex flex-col justify-between space-y-4 ${
                alert.severity === 'Severe' || alert.severity === 'High'
                  ? 'border-rose-200 dark:border-rose-900/50'
                  : 'border-amber-200 dark:border-amber-900/50'
              }`}
            >
              <div className="space-y-3">
                {/* Alert Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-base">🚨</span>
                    <span className="text-sm font-black text-slate-900 dark:text-white">
                      {alert.originCity} → {alert.destinationCity} ({alert.route})
                    </span>
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      alert.severity === 'Severe' || alert.severity === 'High'
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                    }`}
                  >
                    {alert.severity} surge
                  </span>
                </div>

                {/* Main Headline */}
                <div className="text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200">
                  {alert.route} airfare increased{' '}
                  <span className="text-rose-600 font-extrabold">
                    +{alert.deviationPct}%
                  </span>{' '}
                  above its normal range.
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">
                      Current Live Fare
                    </span>
                    <span className="font-black text-slate-900 dark:text-white text-base">
                      ₹{alert.currentFare.toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                    <span className="text-[10px] text-slate-400 block font-semibold">
                      Normal Range
                    </span>
                    <span className="font-bold text-slate-700 dark:text-slate-300 text-xs">
                      ₹{alert.normalMin.toLocaleString('en-IN')} – ₹{alert.normalMax.toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>

                {/* Possible Cause */}
                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-0.5">
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Detected Cause:
                  </span>{' '}
                  <span>{alert.probableCause}</span>
                </div>
              </div>

              {/* Action Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800/80 text-xs">
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Detected {alert.detectedAt}
                </span>

                <button
                  onClick={() => {
                    if (onSelectRouteForAnalysis) {
                      onSelectRouteForAnalysis(alert.route);
                    }
                  }}
                  className="px-3 py-1.5 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white dark:bg-blue-950 dark:text-blue-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  Investigate Route →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

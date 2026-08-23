import React from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Plane,
  ShieldCheck,
  Zap,
  BarChart3,
  HelpCircle
} from 'lucide-react';
import { AnimatedNumber } from './AnimatedNumber';

interface MetricCardProps {
  id?: string;
  title: string;
  value: string | number;
  prefix?: string;
  suffix?: string;
  context: string; // The crucial "So what?" explanation
  changePct?: number;
  changePeriod?: string;
  trend?: 'up' | 'down' | 'neutral';
  tone?: 'default' | 'danger' | 'warning' | 'success' | 'indigo';
  icon?: React.ReactNode;
  badge?: string;
  tooltip?: string;
  decimals?: number;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  value,
  prefix = '',
  suffix = '',
  context,
  changePct,
  changePeriod = 'vs last period',
  trend,
  tone = 'default',
  icon,
  badge,
  tooltip,
  decimals
}) => {
  const getBorderColor = () => {
    switch (tone) {
      case 'danger':
        return 'border-rose-200 bg-rose-50/40 dark:border-rose-900/40 dark:bg-rose-950/15 hover:border-rose-400 dark:hover:border-rose-700/80 hover:shadow-rose-500/5';
      case 'warning':
        return 'border-amber-200 bg-amber-50/40 dark:border-amber-900/40 dark:bg-amber-950/15 hover:border-amber-400 dark:hover:border-amber-700/80 hover:shadow-amber-500/5';
      case 'success':
        return 'border-emerald-200 bg-emerald-50/40 dark:border-emerald-900/40 dark:bg-emerald-950/15 hover:border-emerald-400 dark:hover:border-emerald-700/80 hover:shadow-emerald-500/5';
      case 'indigo':
        return 'border-blue-200 bg-blue-50/40 dark:border-blue-900/40 dark:bg-blue-950/15 hover:border-blue-400 dark:hover:border-blue-700/80 hover:shadow-blue-500/5';
      default:
        return 'border-slate-200/90 bg-white dark:border-slate-800/90 dark:bg-[#0A0D14] hover:border-slate-300 dark:hover:border-slate-700';
    }
  };

  const getAccentBg = () => {
    switch (tone) {
      case 'danger':
        return 'bg-rose-100 text-rose-700 border-rose-200 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-900/50 group-hover:scale-110';
      case 'warning':
        return 'bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-900/50 group-hover:scale-110';
      case 'success':
        return 'bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-900/50 group-hover:scale-110';
      case 'indigo':
        return 'bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-900/50 group-hover:scale-110';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800 group-hover:scale-110';
    }
  };

  return (
    <div
      id={id}
      className={`group relative rounded-xl p-5 border shadow-sm transition-all duration-200 ease-out hover:-translate-y-1 hover:shadow-md active:scale-[0.99] ${getBorderColor()}`}
    >
      <div className="flex items-center justify-between gap-3 mb-2">
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          {title}
          {tooltip && (
            <span title={tooltip} className="cursor-help text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
              <HelpCircle className="w-3.5 h-3.5" />
            </span>
          )}
        </span>
        {icon && (
          <div className={`p-1.5 rounded-lg border transition-transform duration-200 ${getAccentBg()}`}>
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-baseline gap-2 mb-2">
        <span className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white transition-transform group-hover:scale-[1.01] origin-left">
          {typeof value === 'number' ? (
            <AnimatedNumber
              value={value}
              prefix={prefix}
              suffix={suffix}
              decimals={decimals !== undefined ? decimals : value % 1 !== 0 ? 1 : 0}
            />
          ) : (
            <>
              {prefix}
              {value}
              {suffix}
            </>
          )}
        </span>

        {changePct !== undefined && (
          <span
            className={`inline-flex items-center gap-0.5 px-2 py-0.5 text-xs font-bold rounded-full transition-transform group-hover:scale-105 ${
              changePct > 0
                ? tone === 'success'
                  ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60'
                  : 'bg-rose-100 text-rose-700 border border-rose-200 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800/60'
                : changePct < 0
                ? 'bg-emerald-100 text-emerald-700 border border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-400 dark:border-emerald-800/60'
                : 'bg-slate-100 text-slate-600 border border-slate-200 dark:bg-slate-900 dark:text-slate-400 dark:border-slate-800'
            }`}
          >
            {changePct > 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : changePct < 0 ? (
              <TrendingDown className="w-3 h-3" />
            ) : null}
            {changePct > 0 ? `+${changePct}%` : `${changePct}%`}
          </span>
        )}

        {badge && (
          <span className="ml-auto px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded">
            {badge}
          </span>
        )}
      </div>

      {/* The Context Line ("So what?") */}
      <div className="pt-2.5 border-t border-slate-200 dark:border-slate-800/80">
        <p className="text-xs text-slate-600 dark:text-slate-400 flex items-start gap-1.5 font-normal leading-snug">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mt-1 flex-shrink-0 animate-pulse" />
          <span>{context}</span>
        </p>
      </div>
    </div>
  );
};


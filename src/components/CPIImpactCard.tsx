import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { CPI_SIMULATION_SERIES } from '../data/mockAirfareData';
import { Landmark, ArrowUpRight, ShieldAlert, Sparkles, Scale, Info } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface CPIImpactCardProps {
  id?: string;
  onOpenPolicyBriefing?: () => void;
}

export const CPIImpactCard: React.FC<CPIImpactCardProps> = ({
  id,
  onOpenPolicyBriefing
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      id={id}
      className="bg-white dark:bg-[#0A0A0A] rounded-xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Macroeconomic Policy Intelligence
              </span>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                High-Frequency Airfare Index vs Traditional Monthly Sampling
              </h3>
            </div>
          </div>
        </div>

        <span className="px-2.5 py-1 text-xs font-bold rounded bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300 border border-amber-200 dark:border-amber-500/20 self-start sm:self-auto">
          Experimental Policy Simulation
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
            Traditional Monthly Survey
          </span>
          <div className="text-2xl font-bold text-slate-800 dark:text-slate-300 mt-1">
            Index 112.4
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Single fixed-day manual sampling misses mid-month surges
          </p>
        </div>

        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40">
          <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
            High-Frequency Airfare Data
          </span>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mt-1">
            Index 114.1
          </div>
          <p className="text-[11px] text-blue-800/80 dark:text-blue-300/80 mt-1">
            Daily weighted multi-tier advance booking capture
          </p>
        </div>

        <div className="p-4 rounded-xl bg-rose-50/70 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40">
          <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-300 block">
            Measurement Understatement
          </span>
          <div className="text-2xl font-bold text-rose-600 dark:text-rose-400 mt-1">
            +1.7 points
          </div>
          <p className="text-[11px] text-rose-800/80 dark:text-rose-300/80 mt-1">
            Divergence in transport inflation measurement
          </p>
        </div>
      </div>

      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <LineChart data={CPI_SIMULATION_SERIES} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#1e293b' : '#e2e8f0'}
              opacity={0.8}
              vertical={false}
            />
            <XAxis
              dataKey="month"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              domain={[103, 116]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white p-3 rounded-lg shadow-xl text-xs border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1">
                        {label} Measurement Comparison
                      </div>
                      <div className="flex justify-between gap-4 text-slate-700 dark:text-slate-300">
                        <span>Traditional Sampling:</span>
                        <span className="font-bold">{payload[0]?.value}</span>
                      </div>
                      <div className="flex justify-between gap-4 text-blue-600 dark:text-blue-400">
                        <span>High-Frequency Index:</span>
                        <span className="font-bold">{payload[1]?.value}</span>
                      </div>
                      <div className="text-amber-600 dark:text-amber-400 text-[10px] pt-1">
                        Divergence: +{((payload[1]?.value as number) - (payload[0]?.value as number)).toFixed(1)} pts
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#475569' }} />
            <Line
              type="monotone"
              name="Traditional Monthly Sampling (112.4)"
              dataKey="traditionalIndex"
              stroke="#64748b"
              strokeWidth={2}
              strokeDasharray="4 3"
              dot={{ r: 4, fill: '#64748b' }}
            />
            <Line
              type="monotone"
              name="FlyFair Real-Time Airfare Index (114.1)"
              dataKey="highFrequencyIndex"
              stroke="#3b82f6"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#3b82f6' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 mt-4 flex items-start gap-2">
        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-900 dark:text-slate-200">
            Methodological Insight for Economists:
          </span>{' '}
          Traditional once-a-month spot checks lag rapid yield-management repricing by low-cost carriers. High-frequency daily basket aggregation captures dynamic load-factor surges, providing RBI and MoCA policy analysts with leading inflation signals 20–25 days ahead of official releases.
        </div>
      </div>
    </div>
  );
};


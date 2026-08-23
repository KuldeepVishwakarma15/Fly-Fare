import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { useTheme } from '../context/ThemeContext';

interface FareChartProps {
  id?: string;
  routeKey?: string;
  currentFare?: number;
  data?: {
    date: string;
    avgFare: number;
    baselineMin?: number;
    baselineMax?: number;
  }[];
  height?: number;
}

const DEFAULT_CHART_DATA = [
  { date: '1 Aug', avgFare: 5540, baselineMin: 5000, baselineMax: 6500 },
  { date: '5 Aug', avgFare: 5620, baselineMin: 5000, baselineMax: 6500 },
  { date: '9 Aug', avgFare: 5490, baselineMin: 5000, baselineMax: 6500 },
  { date: '13 Aug', avgFare: 5780, baselineMin: 5000, baselineMax: 6500 },
  { date: '17 Aug', avgFare: 5930, baselineMin: 5000, baselineMax: 6500 },
  { date: '21 Aug', avgFare: 6120, baselineMin: 5000, baselineMax: 6500 },
  { date: 'Today', avgFare: 6240, baselineMin: 5000, baselineMax: 6500 }
];

export const FareChart: React.FC<FareChartProps> = ({
  id,
  routeKey = 'DEL-BOM',
  currentFare = 6240,
  data = DEFAULT_CHART_DATA,
  height = 260
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      id={id}
      className="bg-white dark:bg-[#0A0A0A] rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
            Airfare Trajectory & Normal Corridor ({routeKey})
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            30-day moving average with shaded baseline confidence bounds
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-500 inline-block" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">Daily Fare (₹)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-slate-200 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 inline-block" />
            <span className="text-slate-500 dark:text-slate-400">Normal Range</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height }}>
        <ResponsiveContainer>
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="fareGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#1e293b' : '#e2e8f0'}
              opacity={0.8}
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickFormatter={(val) => `₹${val / 1000}k`}
              domain={['dataMin - 500', 'dataMax + 800']}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white p-3 rounded-lg shadow-xl text-xs border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-500 dark:text-slate-400">{label}</div>
                      <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                        ₹{Number(payload[0].value).toLocaleString('en-IN')}
                      </div>
                      <div className="text-slate-400 dark:text-slate-500 text-[11px]">
                        Normal: ₹5,000 – ₹6,500
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <ReferenceLine y={currentFare} stroke="#3b82f6" strokeDasharray="3 3" strokeOpacity={0.7} />
            <Area
              type="monotone"
              dataKey="avgFare"
              stroke="#3b82f6"
              strokeWidth={2}
              fillOpacity={1}
              fill="url(#fareGradient)"
              dot={{ r: 3, fill: '#3b82f6', strokeWidth: 1 }}
              activeDot={{ r: 5, fill: '#60a5fa' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


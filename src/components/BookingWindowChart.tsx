import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { BookingWindowMetric } from '../types';
import { BOOKING_WINDOW_DATA } from '../data/mockAirfareData';
import { Clock, TrendingDown, Info, ShieldCheck } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface BookingWindowChartProps {
  id?: string;
  data?: BookingWindowMetric[];
}

export const BookingWindowChart: React.FC<BookingWindowChartProps> = ({
  id,
  data = BOOKING_WINDOW_DATA
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
          <div className="flex items-center gap-2">
            <div className="p-1 rounded bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              <Clock className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Advance Booking Window & Fare Elasticity Curve
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Average price dynamic across T+1, T+7, T+15, T+30, T+45 departure horizons
          </p>
        </div>
        <div className="flex items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-sm bg-blue-500 inline-block" />
            <span className="text-slate-700 dark:text-slate-300 font-medium">Avg Fare (₹)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
            <span className="text-slate-500 dark:text-slate-400">Elasticity Index</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <ComposedChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#1e293b' : '#e2e8f0'}
              opacity={0.8}
              vertical={false}
            />
            <XAxis
              dataKey="window"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
            />
            <YAxis
              yAxisId="left"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#64748b', fontSize: 11 }}
              tickFormatter={(val) => `₹${val / 1000}k`}
              domain={[4000, 10500]}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              tickLine={false}
              axisLine={false}
              tick={{ fill: '#f59e0b', fontSize: 11 }}
              tickFormatter={(val) => `${val}x`}
              domain={[0, 3.5]}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as BookingWindowMetric;
                  return (
                    <div className="bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white p-3 rounded-lg shadow-xl text-xs border border-slate-200 dark:border-slate-800 space-y-1.5">
                      <div className="font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1">
                        Booking Window: {item.window}
                      </div>
                      <div className="text-blue-600 dark:text-blue-400 font-bold text-sm">
                        Average Fare: ₹{item.avgFare.toLocaleString('en-IN')}
                      </div>
                      <div className="text-amber-600 dark:text-amber-400 font-semibold">
                        Fare Elasticity Score: {item.fareElasticityScore}x
                      </div>
                      <div className="text-slate-500 dark:text-slate-400 text-[11px]">
                        Price Stability: {item.priceStabilityScore}% (Sample: {item.sampleCount.toLocaleString()} flights)
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar
              yAxisId="left"
              dataKey="avgFare"
              fill="#3b82f6"
              radius={[4, 4, 0, 0]}
              maxBarSize={40}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? '#ef4444' : index === 1 ? '#f59e0b' : '#3b82f6'}
                />
              ))}
            </Bar>
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="fareElasticityScore"
              stroke="#f59e0b"
              strokeWidth={2.5}
              dot={{ r: 4, fill: '#f59e0b' }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Structured Summary Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        {data.map((w, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center"
          >
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              {w.window}
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white block mt-0.5">
              ₹{w.avgFare.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] font-medium text-amber-600 dark:text-amber-400">
              {w.fareElasticityScore}x Elasticity
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};


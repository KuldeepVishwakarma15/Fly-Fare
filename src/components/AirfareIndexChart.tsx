import React, { useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ReferenceLine
} from 'recharts';
import { BASKET_ROUTES, NATIONAL_INDEX } from '../data/mockAirfareData';
import { Layers, Calendar, Info, TrendingUp, Filter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

interface AirfareIndexChartProps {
  id?: string;
  onSelectRoute?: (routeKey: string) => void;
}

const HISTORICAL_INDEX_DATA = [
  { month: 'Mar 24', national: 104.5, delBom: 104.2, delBlr: 105.1, bomBlr: 102.8, cpiTransport: 105.0 },
  { month: 'Apr 24', national: 107.2, delBom: 107.8, delBlr: 109.4, bomBlr: 106.3, cpiTransport: 106.8 },
  { month: 'May 24', national: 111.4, delBom: 112.1, delBlr: 113.8, bomBlr: 110.9, cpiTransport: 109.1 },
  { month: 'Jun 24', national: 114.6, delBom: 115.4, delBlr: 116.7, bomBlr: 114.5, cpiTransport: 110.5 },
  { month: 'Jul 24', national: 116.8, delBom: 117.2, delBlr: 119.5, bomBlr: 118.1, cpiTransport: 111.4 },
  { month: 'Aug 24', national: 118.6, delBom: 121.4, delBlr: 123.8, bomBlr: 124.2, cpiTransport: 112.4 }
];

export const AirfareIndexChart: React.FC<AirfareIndexChartProps> = ({ id, onSelectRoute }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [basePeriod, setBasePeriod] = useState<'Jan24' | 'Apr24' | 'FY24'>('Jan24');
  const [selectedSeries, setSelectedSeries] = useState<'all' | 'national' | 'routes'>('all');

  const baseAdjustment = basePeriod === 'Apr24' ? -7.2 : basePeriod === 'FY24' ? -3.8 : 0;

  const adjustedData = HISTORICAL_INDEX_DATA.map((d) => ({
    ...d,
    national: +(d.national + baseAdjustment).toFixed(1),
    delBom: +(d.delBom + baseAdjustment).toFixed(1),
    delBlr: +(d.delBlr + baseAdjustment).toFixed(1),
    bomBlr: +(d.bomBlr + baseAdjustment).toFixed(1),
    cpiTransport: +(d.cpiTransport + baseAdjustment).toFixed(1)
  }));

  return (
    <div
      id={id}
      className="bg-white dark:bg-[#0A0A0A] rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
    >
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20 rounded">
              Weighted Laspeyres Basket
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              10 Representative Indian City-Pairs
            </span>
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
            Real-Time India Airfare Price Index
          </h3>
        </div>

        {/* Base Period & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-lg text-xs font-semibold">
            <button
              onClick={() => setBasePeriod('Jan24')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                basePeriod === 'Jan24'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Base: Jan 24 = 100
            </button>
            <button
              onClick={() => setBasePeriod('Apr24')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                basePeriod === 'Apr24'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Base: Apr 24
            </button>
            <button
              onClick={() => setBasePeriod('FY24')}
              className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                basePeriod === 'FY24'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Base: FY24 Avg
            </button>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', height: 320 }}>
        <ResponsiveContainer>
          <LineChart data={adjustedData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
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
              domain={['dataMin - 3', 'dataMax + 4']}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white p-3 rounded-lg shadow-xl text-xs border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-700 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800 pb-1">
                        {label} Index Values
                      </div>
                      {payload.map((p, idx) => (
                        <div key={idx} className="flex justify-between gap-4">
                          <span style={{ color: p.color }} className="font-medium">
                            {p.name}:
                          </span>
                          <span className="font-bold tabular-nums">{p.value}</span>
                        </div>
                      ))}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px', color: isDark ? '#94a3b8' : '#475569' }}
              iconType="circle"
            />
            <ReferenceLine y={100} stroke={isDark ? '#475569' : '#cbd5e1'} strokeDasharray="2 2" />

            <Line
              type="monotone"
              name="National Airfare Index"
              dataKey="national"
              stroke="#3b82f6"
              strokeWidth={3}
              dot={{ r: 4, fill: '#3b82f6' }}
            />
            <Line
              type="monotone"
              name="DEL → BOM (18.5% Wt)"
              dataKey="delBom"
              stroke="#a855f7"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={{ r: 3, fill: '#a855f7' }}
            />
            <Line
              type="monotone"
              name="DEL → BLR (15.0% Wt)"
              dataKey="delBlr"
              stroke="#f59e0b"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={{ r: 3, fill: '#f59e0b' }}
            />
            <Line
              type="monotone"
              name="BOM → BLR (12.0% Wt)"
              dataKey="bomBlr"
              stroke="#ec4899"
              strokeWidth={2}
              strokeDasharray="4 2"
              dot={{ r: 3, fill: '#ec4899' }}
            />
            <Line
              type="monotone"
              name="CPI Transport Benchmark"
              dataKey="cpiTransport"
              stroke="#10b981"
              strokeWidth={2}
              dot={{ r: 3, fill: '#10b981' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800 text-xs">
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Current National Index</span>
          <span className="text-base font-bold text-blue-600 dark:text-blue-400">
            {adjustedData[adjustedData.length - 1].national}
          </span>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Monthly Inflation</span>
          <span className="text-base font-bold text-rose-600 dark:text-rose-400">+6.8%</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Yearly Inflation</span>
          <span className="text-base font-bold text-rose-600 dark:text-rose-400">+12.2%</span>
        </div>
        <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Basket Composition</span>
          <span className="text-base font-bold text-slate-900 dark:text-slate-200">
            10 City-Pairs
          </span>
        </div>
      </div>
    </div>
  );
};


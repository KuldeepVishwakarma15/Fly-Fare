import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { AIRLINES, SAMPLE_QUOTES } from '../data/mockAirfareData';
import { Plane, ShieldCheck, Tag, Info } from 'lucide-react';
import { AirlineLogo } from './AirlineLogos';
import { useTheme } from '../context/ThemeContext';

interface AirlineComparisonProps {
  id?: string;
  routeKey?: string;
}

const AIRLINE_COMPARISON_DATA = [
  { airline: 'IndiGo', code: '6E', base: 4420, fuel: 650, taxesFees: 990, total: 6240, marketShare: 61.4 },
  { airline: 'Air India', code: 'AI', base: 4680, fuel: 700, taxesFees: 1010, total: 6580, marketShare: 14.8 },
  { airline: 'Vistara', code: 'UK', base: 4890, fuel: 720, taxesFees: 1030, total: 6820, marketShare: 10.2 },
  { airline: 'Akasa Air', code: 'QP', base: 4120, fuel: 580, taxesFees: 940, total: 5820, marketShare: 4.9 },
  { airline: 'SpiceJet', code: 'SG', base: 3950, fuel: 550, taxesFees: 930, total: 5610, marketShare: 3.7 }
];

export const AirlineComparison: React.FC<AirlineComparisonProps> = ({
  id,
  routeKey = 'DEL → BOM'
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
              <Plane className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Airline Fare Component Decomposition ({routeKey})
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent split of Base Fare, Fuel Surcharge, and Statutory Airport Taxes (UDF/PSF/GST)
          </p>
        </div>
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Economy Direct (T+23 Departure)
        </span>
      </div>

      <div style={{ width: '100%', height: 260 }}>
        <ResponsiveContainer>
          <BarChart
            data={AIRLINE_COMPARISON_DATA}
            margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={isDark ? '#1e293b' : '#e2e8f0'}
              opacity={0.8}
              vertical={false}
            />
            <XAxis
              dataKey="airline"
              tickLine={false}
              axisLine={false}
              tick={{ fill: isDark ? '#64748b' : '#64748b', fontSize: 11 }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{ fill: isDark ? '#64748b' : '#64748b', fontSize: 11 }}
              tickFormatter={(val) => `₹${val / 1000}k`}
            />
            <Tooltip
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload;
                  return (
                    <div className="bg-white dark:bg-[#0A0A0A] text-slate-900 dark:text-white p-3 rounded-lg shadow-xl text-xs border border-slate-200 dark:border-slate-800 space-y-1">
                      <div className="font-bold text-slate-800 dark:text-slate-200 border-b border-slate-200 dark:border-slate-800 pb-1 flex justify-between gap-3">
                        <div className="flex items-center gap-1.5">
                          <AirlineLogo airlineCode={item.code} airlineName={item.airline} size={18} />
                          <span>{label}</span>
                        </div>
                        <span className="text-blue-600 dark:text-blue-400">Total: ₹{item.total.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between gap-4 text-slate-600 dark:text-slate-300">
                        <span>Base Fare:</span>
                        <span className="font-bold">₹{item.base.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between gap-4 text-amber-600 dark:text-amber-400">
                        <span>Fuel Surcharge:</span>
                        <span className="font-bold">₹{item.fuel.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="flex justify-between gap-4 text-emerald-600 dark:text-emerald-400">
                        <span>Taxes & Airport UDF/PSF:</span>
                        <span className="font-bold">₹{item.taxesFees.toLocaleString('en-IN')}</span>
                      </div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500 pt-1">
                        Domestic Market Share: {item.marketShare}%
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend wrapperStyle={{ fontSize: '11px', color: isDark ? '#94a3b8' : '#475569' }} />
            <Bar dataKey="base" name="Base Fare" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} />
            <Bar dataKey="fuel" name="Fuel Surcharge" stackId="a" fill="#f59e0b" radius={[0, 0, 0, 0]} />
            <Bar
              dataKey="taxesFees"
              name="Taxes & Airport Charges"
              stackId="a"
              fill="#10b981"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
        {AIRLINE_COMPARISON_DATA.map((a, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center justify-between"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <AirlineLogo airlineCode={a.code} airlineName={a.airline} size={20} />
              <span className="text-xs font-bold text-slate-900 dark:text-white">{a.airline}</span>
            </div>
            <div className="text-sm font-bold text-blue-600 dark:text-blue-400 my-0.5">
              ₹{a.total.toLocaleString('en-IN')}
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">
              {a.marketShare}% share
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


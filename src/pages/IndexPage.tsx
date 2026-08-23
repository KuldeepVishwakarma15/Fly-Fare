import React, { useState } from 'react';
import {
  NATIONAL_INDEX,
  BASKET_ROUTES,
  AIRLINES
} from '../data/mockAirfareData';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Layers,
  Scale,
  Sparkles,
  Info,
  Calendar,
  Activity,
  ArrowUpRight,
  PieChart as PieChartIcon
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { BookingWindowChart } from '../components/BookingWindowChart';

export const IndexPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [selectedBasketFilter, setSelectedBasketFilter] = useState<'all' | 'metro' | 'tier1'>('all');

  const historyData = [
    { month: 'Mar 24', national: 104.5, metro: 105.2, nonMetro: 102.8 },
    { month: 'Apr 24', national: 107.8, metro: 108.9, nonMetro: 104.9 },
    { month: 'May 24', national: 111.4, metro: 112.7, nonMetro: 107.5 },
    { month: 'Jun 24', national: 114.2, metro: 115.8, nonMetro: 109.8 },
    { month: 'Jul 24', national: 116.5, metro: 118.0, nonMetro: 112.4 },
    { month: 'Aug 24', national: 118.6, metro: 120.4, nonMetro: 114.1 }
  ];

  const airlineContributions = [
    { name: 'IndiGo (6E)', share: 61.4, inflation: 7.2, color: '#003399' },
    { name: 'Air India (AI)', share: 14.8, inflation: 6.5, color: '#D81E28' },
    { name: 'Vistara (UK)', share: 10.2, inflation: 5.9, color: '#582C4D' },
    { name: 'Akasa Air (QP)', share: 4.9, inflation: 4.8, color: '#FF6600' },
    { name: 'SpiceJet (SG)', share: 3.7, inflation: 8.9, color: '#ED1B24' }
  ];

  const routeRankings = [
    { rank: 1, route: 'BOM → BLR', inflation: '+12.4%', fare: '₹4,980', weight: '12.0%' },
    { rank: 2, route: 'DEL → BOM', inflation: '+8.2%', fare: '₹6,240', weight: '18.5%' },
    { rank: 3, route: 'DEL → BLR', inflation: '+7.8%', fare: '₹7,450', weight: '15.0%' },
    { rank: 4, route: 'MAA → DEL', inflation: '+5.9%', fare: '₹6,420', weight: '10.5%' },
    { rank: 5, route: 'DEL → CCU', inflation: '+5.4%', fare: '₹6,890', weight: '11.0%' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              India Airfare Price Index (IAPI)
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800/40">
              Laspeyres Weighted Basket
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            High-frequency benchmark tracking weighted price inflation across India’s core aviation corridors.
          </p>
        </div>

        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800">
          Base: Jan 2024 = 100.0
        </div>
      </div>

      {/* 2. Hero Metric Card (Section 14) */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl border border-blue-800/60 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <span className="text-xs font-extrabold uppercase tracking-widest text-blue-300 block">
              National Airfare Benchmark
            </span>
            <div className="flex items-baseline gap-4">
              <span className="text-5xl sm:text-6xl font-black tracking-tight text-white">
                118.6
              </span>
              <div className="space-y-0.5">
                <span className="text-sm sm:text-base font-extrabold text-emerald-400 block">
                  +6.8% Month-over-Month
                </span>
                <span className="text-xs font-semibold text-blue-200 block">
                  +12.2% Year-over-Year
                </span>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-blue-100/80 max-w-xl">
              Composite price level derived across 48 monitored routes and 10 representative trunk baskets weighted by DGCA passenger volume.
            </p>
          </div>

          {/* Quick Sub-Indices */}
          <div className="grid grid-cols-2 gap-3 shrink-0">
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-200">Metro Trunk Basket</span>
              <div className="text-xl font-black text-white">120.4</div>
              <span className="text-[10px] text-emerald-300 font-bold">+7.4% MoM</span>
            </div>
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 space-y-1">
              <span className="text-[10px] uppercase font-bold text-blue-200">Non-Metro Corridors</span>
              <div className="text-xl font-black text-white">114.1</div>
              <span className="text-[10px] text-emerald-300 font-bold">+5.2% MoM</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Charts: Historical Index & Route Ranking (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Historical Evolution Chart (7 cols) */}
        <div className="lg:col-span-7 p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Historical Index Evolution (2024)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Monthly trend of composite National vs Metro sub-indices
              </p>
            </div>
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400">
              Jan=100.0
            </span>
          </div>

          <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="nationalGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke={isDark ? '#1e293b' : '#e2e8f0'}
                  opacity={0.7}
                  vertical={false}
                />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                  domain={[100, 125]}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 space-y-1">
                          <div className="font-bold text-slate-400">{label}</div>
                          <div className="text-blue-400 font-bold">National: {d.national}</div>
                          <div className="text-purple-400 font-bold">Metro: {d.metro}</div>
                          <div className="text-emerald-400 font-bold">Non-Metro: {d.nonMetro}</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="national"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fill="url(#nationalGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Route Contribution & Ranking (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Route Inflation Ranking (MoM)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Top contributor routes to index movement
              </p>
            </div>
            <span className="text-[10px] uppercase font-bold text-slate-400">
              Basket Weight
            </span>
          </div>

          <div className="space-y-2.5">
            {routeRankings.map((r) => (
              <div
                key={r.rank}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold"
              >
                <div className="flex items-center gap-3">
                  <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center text-[10px] font-black">
                    {r.rank}
                  </span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {r.route}
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {r.fare}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <span className="font-black text-rose-600 dark:text-rose-400">
                    {r.inflation}
                  </span>
                  <span className="text-[10px] font-mono text-slate-400">
                    {r.weight}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Booking-Window Effect & Airline Contribution */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Booking Window Elasticity Chart (7 cols) */}
        <div className="lg:col-span-7">
          <BookingWindowChart />
        </div>

        {/* Airline Market & Price Share (5 cols) */}
        <div className="lg:col-span-5 p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Airline Contribution Breakdown
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Market share and observed carrier inflation
              </p>
            </div>
            <PieChartIcon className="w-4 h-4 text-blue-600" />
          </div>

          <div className="space-y-3">
            {airlineContributions.map((air, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-800 dark:text-slate-200">
                    {air.name}
                  </span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {air.share}% share • <span className="text-rose-600">+{air.inflation}%</span>
                  </span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width: `${air.share}%`,
                      backgroundColor: air.color
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

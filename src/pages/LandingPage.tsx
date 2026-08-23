import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  Sparkles,
  ArrowRight,
  Zap,
  Activity,
  Compass,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Shield,
  Plane,
  ChevronRight,
  Sliders
} from 'lucide-react';
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
import { BASKET_ROUTES, NATIONAL_INDEX, AIRPORTS, DEMO_SCENARIOS } from '../data/mockAirfareData';
import { NavPage } from '../components/Navbar';
import { RouteIndexData, DemoScenarioKey } from '../types';
import { useTheme } from '../context/ThemeContext';
import { RouteHeatmap } from '../components/RouteHeatmap';
import { TiltCard } from '../components/TiltCard';
import { MagneticButton } from '../components/MagneticButton';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { RouteDrawer } from '../components/RouteDrawer';
import { motion } from 'motion/react';

interface LandingPageProps {
  onNavigate: (page: NavPage) => void;
  onSelectRouteForAnalysis?: (routeKey: string) => void;
  onOpenGeminiAnalysis?: () => void;
}

type TimeHorizon = '1D' | '7D' | '30D' | '3M' | '1Y';

const TREND_DATA_BY_HORIZON: Record<
  TimeHorizon,
  Array<{ date: string; avgFare: number; index: number; baseline: number }>
> = {
  '1D': [
    { date: '06:00', avgFare: 5980, index: 116.2, baseline: 5800 },
    { date: '09:00', avgFare: 6140, index: 117.1, baseline: 5800 },
    { date: '12:00', avgFare: 6080, index: 116.8, baseline: 5800 },
    { date: '15:00', avgFare: 6190, index: 117.5, baseline: 5800 },
    { date: '18:00', avgFare: 6310, index: 119.0, baseline: 5800 },
    { date: '21:00', avgFare: 6240, index: 118.6, baseline: 5800 }
  ],
  '7D': [
    { date: 'Mon', avgFare: 5820, index: 114.3, baseline: 5800 },
    { date: 'Tue', avgFare: 5760, index: 113.8, baseline: 5800 },
    { date: 'Wed', avgFare: 5890, index: 115.1, baseline: 5800 },
    { date: 'Thu', avgFare: 6040, index: 116.9, baseline: 5800 },
    { date: 'Fri', avgFare: 6380, index: 120.2, baseline: 5800 },
    { date: 'Sat', avgFare: 6450, index: 121.0, baseline: 5800 },
    { date: 'Today', avgFare: 6240, index: 118.6, baseline: 5800 }
  ],
  '30D': [
    { date: 'W1', avgFare: 5650, index: 111.4, baseline: 5700 },
    { date: 'W2', avgFare: 5820, index: 114.2, baseline: 5700 },
    { date: 'W3', avgFare: 6050, index: 116.9, baseline: 5700 },
    { date: 'W4', avgFare: 6180, index: 118.0, baseline: 5700 },
    { date: 'Current', avgFare: 6240, index: 118.6, baseline: 5700 }
  ],
  '3M': [
    { date: 'Jun', avgFare: 5490, index: 109.2, baseline: 5500 },
    { date: 'Jul', avgFare: 5840, index: 113.8, baseline: 5500 },
    { date: 'Aug', avgFare: 6240, index: 118.6, baseline: 5500 }
  ],
  '1Y': [
    { date: 'Q3 23', avgFare: 5120, index: 101.5, baseline: 5200 },
    { date: 'Q4 23', avgFare: 5680, index: 108.9, baseline: 5200 },
    { date: 'Q1 24', avgFare: 5410, index: 106.2, baseline: 5200 },
    { date: 'Q2 24', avgFare: 5930, index: 114.7, baseline: 5200 },
    { date: 'Q3 24', avgFare: 6240, index: 118.6, baseline: 5200 }
  ]
};

export const LandingPage: React.FC<LandingPageProps> = ({
  onNavigate,
  onSelectRouteForAnalysis,
  onOpenGeminiAnalysis
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [timeHorizon, setTimeHorizon] = useState<TimeHorizon>('7D');
  const [activeScenario, setActiveScenario] = useState<DemoScenarioKey>('normal');
  const [selectedRouteKey, setSelectedRouteKey] = useState<string>('DEL-BOM');
  const [drawerRoute, setDrawerRoute] = useState<RouteIndexData | null>(null);

  const scenario = DEMO_SCENARIOS[activeScenario];

  const handleRouteClick = (routeKey: string) => {
    setSelectedRouteKey(routeKey);
    const rObj = BASKET_ROUTES.find((r) => r.routeKey === routeKey);
    if (rObj) {
      setDrawerRoute(rObj);
    }
    if (onSelectRouteForAnalysis) {
      onSelectRouteForAnalysis(routeKey);
    }
  };

  const selectedRouteObj =
    BASKET_ROUTES.find((r) => r.routeKey === selectedRouteKey) || BASKET_ROUTES[0];

  const chartData = TREND_DATA_BY_HORIZON[timeHorizon];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 1. Page Header with Compact Status & Quick CTAs */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Airfare Intelligence Overview
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-[11px] font-semibold border border-emerald-200/80 dark:border-emerald-800/40">
              <Clock className="w-3 h-3" />
              Last updated: 2 minutes ago
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Monitor Indian airfare movement, price inflation, market volatility and AI-powered fare predictions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <MagneticButton
            id="btn-overview-explore"
            onClick={() => onNavigate('explore')}
            className="px-3.5 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5" />
            <span>Explore Fares</span>
          </MagneticButton>

          <MagneticButton
            id="btn-overview-index"
            onClick={() => onNavigate('index')}
            className="px-3.5 py-2 rounded-xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>View Index</span>
          </MagneticButton>
        </div>
      </div>

      {/* 2. KPI Row: 5 Key Metrics with TiltCard and Animated Numbers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
        {/* Card 1: National Airfare Index */}
        <TiltCard maxTilt={6} className="h-full">
          <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2 h-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                National Airfare Index
              </span>
              <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/50">
                <BarChart3 className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                <AnimatedNumber value={NATIONAL_INDEX.currentIndex} decimals={1} />
              </span>
              <span className="inline-flex items-center text-xs font-extrabold text-rose-600 dark:text-rose-400">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +6.8%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Base 100 • Weighted across 10-city basket
            </p>
          </div>
        </TiltCard>

        {/* Card 2: Average Domestic Fare */}
        <TiltCard maxTilt={6} className="h-full">
          <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2 h-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Average Domestic Fare
              </span>
              <div className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50">
                <Plane className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                <AnimatedNumber value={6240} prefix="₹" />
              </span>
              <span className="inline-flex items-center text-xs font-extrabold text-rose-600 dark:text-rose-400">
                <TrendingUp className="w-3 h-3 mr-0.5" />
                +4.2%
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Average 1-way trunk fare (30-day horizon)
            </p>
          </div>
        </TiltCard>

        {/* Card 3: Routes Monitored */}
        <TiltCard maxTilt={6} className="h-full">
          <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2 h-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Routes Monitored
              </span>
              <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
                <Activity className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                <AnimatedNumber value={48} />
              </span>
              <span className="inline-flex items-center text-xs font-extrabold text-blue-600 dark:text-blue-400">
                +6 this month
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Covers 84% of all Indian air passenger traffic
            </p>
          </div>
        </TiltCard>

        {/* Card 4: Active Price Alerts */}
        <TiltCard maxTilt={6} className="h-full">
          <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2 h-full">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Active Price Alerts
              </span>
              <div className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
                <Zap className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                <AnimatedNumber value={127} />
              </span>
              <span className="inline-flex items-center text-xs font-bold text-amber-600 dark:text-amber-400">
                12 high priority
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Active real-time target watcher rules
            </p>
          </div>
        </TiltCard>

        {/* Card 5: Surge Alerts */}
        <TiltCard maxTilt={6} className="h-full">
          <div
            onClick={() => onNavigate('alerts')}
            className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-rose-200/80 dark:border-rose-900/40 shadow-2xs space-y-2 cursor-pointer hover:border-rose-400 transition-all h-full"
          >
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Surge Alerts
              </span>
              <div className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-800/50">
                <AlertTriangle className="w-3.5 h-3.5" />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-rose-600 dark:text-rose-400">
                <AnimatedNumber value={8} />
              </span>
              <span className="inline-flex items-center text-xs font-extrabold text-rose-700 dark:text-rose-300">
                3 critical
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-tight">
              Abnormal fare jumps &gt;35% over baseline
            </p>
          </div>
        </TiltCard>
      </div>

      {/* 3. Main Analytics Section: 2-Column (Chart + AI Insight) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT: Airfare Trend Chart (8 cols) */}
        <div className="lg:col-span-8 p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  India Airfare Trend & Movement
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Composite domestic average fare (₹) vs baseline reference corridor
              </p>
            </div>

            {/* Time Controls: 1D | 7D | 30D | 3M | 1Y */}
            <div className="flex items-center bg-slate-100 dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-semibold">
              {(['1D', '7D', '30D', '3M', '1Y'] as TimeHorizon[]).map((h) => (
                <button
                  key={h}
                  onClick={() => setTimeHorizon(h)}
                  className={`px-2.5 py-1 rounded-lg transition-all cursor-pointer ${
                    timeHorizon === h
                      ? 'bg-blue-600 text-white shadow-2xs font-bold'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {h}
                </button>
              ))}
            </div>
          </div>

          {/* Interactive Recharts Graph */}
          <div className="w-full h-64 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="fareTrendGrad" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="date"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }}
                  tickFormatter={(val) => `₹${val}`}
                  domain={['dataMin - 300', 'dataMax + 400']}
                />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const dataPoint = payload[0].payload;
                      return (
                        <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 space-y-1">
                          <div className="font-bold text-slate-400">{label} Horizon</div>
                          <div className="text-blue-400 font-extrabold text-sm">
                            Avg Fare: ₹{dataPoint.avgFare.toLocaleString('en-IN')}
                          </div>
                          <div className="text-emerald-400 font-semibold text-[11px]">
                            Airfare Index: {dataPoint.index}
                          </div>
                          <div className="text-slate-400 text-[10px]">
                            Corridor Baseline: ₹{dataPoint.baseline.toLocaleString('en-IN')}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine
                  y={5800}
                  stroke={isDark ? '#475569' : '#cbd5e1'}
                  strokeDasharray="4 4"
                  label={{
                    value: 'Baseline',
                    fill: isDark ? '#94a3b8' : '#64748b',
                    fontSize: 10,
                    position: 'insideBottomRight'
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="avgFare"
                  stroke="#2563eb"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#fareTrendGrad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-1">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block" />
                <span>Observed Market Fare</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-slate-400 inline-block" />
                <span>Historical Baseline (₹5,800)</span>
              </span>
            </div>
            <span className="font-semibold text-slate-700 dark:text-slate-300">
              Corridor Volatility: <span className="text-amber-500 font-bold">Moderate</span>
            </span>
          </div>
        </div>

        {/* RIGHT: AI Market Insight (4 cols) */}
        <div className="lg:col-span-4 p-5 rounded-2xl bg-gradient-to-b from-blue-50/50 via-white to-white dark:from-blue-950/20 dark:via-[#0A0D14] dark:to-[#0A0D14] border border-blue-200/80 dark:border-blue-900/40 shadow-2xs flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 text-[11px] font-bold">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>AI Market Insight</span>
              </div>
              <span className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">
                Live NLP Digest
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              “Airfares increased <span className="font-extrabold text-rose-600 dark:text-rose-400">8.2%</span> this week, primarily driven by weekend demand and short booking windows on major metro routes.”
            </p>

            <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Market Risk</span>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                  MEDIUM
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Prediction</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  Moderate upward pressure
                </span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Confidence</span>
                  <span className="font-black text-blue-600 dark:text-blue-400">84%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full" style={{ width: '84%' }} />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                if (onOpenGeminiAnalysis) {
                  onOpenGeminiAnalysis();
                } else {
                  onNavigate('prediction');
                }
              }}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>View AI Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Route Intelligence: Top Route Movements Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Top Route Movements
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              High-frequency tracking across premier Indian domestic city-pairs
            </p>
          </div>

          <button
            onClick={() => onNavigate('routes')}
            className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
          >
            <span>View All Routes</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-slate-400 dark:text-slate-500 uppercase text-[10px] font-extrabold tracking-wider">
                <th className="py-2.5 px-3">Route</th>
                <th className="py-2.5 px-3">Current Fare</th>
                <th className="py-2.5 px-3">7D Change</th>
                <th className="py-2.5 px-3">Airfare Index</th>
                <th className="py-2.5 px-3">Volatility</th>
                <th className="py-2.5 px-3">Surge Risk</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 font-medium">
              {BASKET_ROUTES.slice(0, 6).map((route) => {
                const isSelected = route.routeKey === selectedRouteKey;
                return (
                  <tr
                    key={route.routeKey}
                    onClick={() => handleRouteClick(route.routeKey)}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-900/60 transition-colors cursor-pointer ${
                      isSelected ? 'bg-blue-50/60 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900 dark:text-white">
                          {route.origin} → {route.destination}
                        </span>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">
                          ({route.originCity} to {route.destinationCity})
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-bold text-slate-900 dark:text-white">
                      ₹{route.currentFare.toLocaleString('en-IN')}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-0.5 font-bold ${
                          route.monthlyChangePct >= 8.0
                            ? 'text-rose-600 dark:text-rose-400'
                            : route.monthlyChangePct >= 5.0
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        {route.monthlyChangePct >= 0 ? '+' : ''}
                        {route.monthlyChangePct}%
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-slate-700 dark:text-slate-300">
                      {route.indexValue}
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          route.volatility === 'High'
                            ? 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {route.volatility}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <span
                        className={`inline-flex items-center gap-1 text-[11px] font-semibold ${
                          route.surgeRisk === 'High'
                            ? 'text-rose-600 dark:text-rose-400'
                            : route.surgeRisk === 'Medium'
                            ? 'text-amber-600 dark:text-amber-400'
                            : 'text-emerald-600 dark:text-emerald-400'
                        }`}
                      >
                        <span>
                          {route.surgeRisk === 'High'
                            ? '🔴'
                            : route.surgeRisk === 'Medium'
                            ? '🟡'
                            : '🟢'}
                        </span>
                        <span>{route.surgeRisk}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setDrawerRoute(route);
                        }}
                        className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 hover:bg-blue-600 hover:text-white dark:bg-blue-950/60 dark:text-blue-300 text-[11px] font-bold transition-all cursor-pointer active:scale-95"
                      >
                        Inspect Route
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. India Airfare Network Interactive Map */}
      <div className="space-y-4">
        <RouteHeatmap
          selectedRouteKey={selectedRouteKey}
          onSelectRoute={(r) => {
            setSelectedRouteKey(r.routeKey);
            setDrawerRoute(r);
          }}
        />
      </div>

      {/* 6. Hackathon Predefined Scenario Switcher */}
      <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Hackathon Demo Scenarios
            </h4>
          </div>
          <span className="text-[10px] text-slate-400 bg-slate-800 px-2 py-0.5 rounded">
            Prototype Engine
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
          {(
            [
              { key: 'scenario-1-normal', label: '1. Normal Airfare', desc: 'Baseline Economy' },
              { key: 'scenario-2-surge', label: '2. Sudden Surge', desc: '+43% spike' },
              { key: 'scenario-3-festival', label: '3. Festival Demand', desc: 'Diwali rush' },
              { key: 'scenario-4-drop', label: '4. Fare Decline', desc: 'Monsoon off-peak' },
              { key: 'scenario-5-monsoon', label: '5. Booking Window', desc: 'T+21 pricing' }
            ] as Array<{ key: DemoScenarioKey; label: string; desc: string }>
          ).map((s) => (
            <button
              key={s.key}
              onClick={() => setActiveScenario(s.key)}
              className={`p-2.5 rounded-lg text-left transition-all cursor-pointer border ${
                activeScenario === s.key
                  ? 'bg-blue-600 border-blue-400 text-white shadow-xs'
                  : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <div className="text-xs font-bold">{s.label}</div>
              <div className="text-[10px] text-slate-300/80 mt-0.5">{s.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Route Drawer */}
      <RouteDrawer
        route={drawerRoute}
        isOpen={!!drawerRoute}
        onClose={() => setDrawerRoute(null)}
        onNavigateToPrediction={() => onNavigate('prediction')}
        onNavigateToExplore={() => onNavigate('explore')}
      />
    </div>
  );
};

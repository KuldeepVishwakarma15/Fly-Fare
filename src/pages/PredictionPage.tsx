import React, { useState } from 'react';
import {
  AIRPORTS,
  BASKET_ROUTES,
  AIRLINES
} from '../data/mockAirfareData';
import {
  Sparkles,
  Search,
  Calendar,
  Plane,
  ArrowRight,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Clock,
  ShieldAlert,
  Info,
  Sliders,
  CheckCircle2
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
  AreaChart,
  Area
} from 'recharts';
import { useTheme } from '../context/ThemeContext';
import { AIAnalyzingScanner } from '../components/AIAnalyzingScanner';
import { MagneticButton } from '../components/MagneticButton';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { motion, AnimatePresence } from 'motion/react';

interface PredictionPageProps {
  onOpenGeminiAnalysis: () => void;
  onOpenAlertModal: () => void;
}

export const PredictionPage: React.FC<PredictionPageProps> = ({
  onOpenGeminiAnalysis,
  onOpenAlertModal
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('BOM');
  const [travelDate, setTravelDate] = useState('2024-09-15');
  const [airline, setAirline] = useState('ALL');
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const routeKey = `${origin}-${destination}`;
  const routeData =
    BASKET_ROUTES.find((r) => r.routeKey === routeKey) || BASKET_ROUTES[0];

  // Dynamic values depending on route
  const currentFare = routeData.currentFare || 6240;
  const predictedLow = Math.round(currentFare * 0.89);
  const predictedHigh = Math.round(currentFare * 0.95);

  // Forecast curve with distinct Historical vs Predicted segments
  const forecastData = [
    { day: 'T-14', fare: Math.round(currentFare * 0.86), type: 'Historical', isHistorical: true },
    { day: 'T-10', fare: Math.round(currentFare * 0.89), type: 'Historical', isHistorical: true },
    { day: 'T-7', fare: Math.round(currentFare * 0.93), type: 'Historical', isHistorical: true },
    { day: 'T-3', fare: Math.round(currentFare * 0.97), type: 'Historical', isHistorical: true },
    { day: 'Today', fare: currentFare, type: 'Current', isHistorical: true, isCurrent: true },
    { day: 'T+3 (Pred)', fare: Math.round(currentFare * 0.96), type: 'Predicted', isPredicted: true },
    { day: 'T+7 (Pred)', fare: Math.round(currentFare * 0.92), type: 'Predicted', isPredicted: true },
    { day: 'T+14 (Pred)', fare: predictedLow, type: 'Predicted', isPredicted: true },
    { day: 'Departure', fare: predictedHigh, type: 'Predicted', isPredicted: true }
  ];

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 1. Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              AI Fare Prediction & Yield Forecaster
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800/40">
              XGBoost + SHAP Weights
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Predict fare trajectory, calculate optimal buying windows, and inspect feature attribution before you book.
          </p>
        </div>

        <MagneticButton
          onClick={onOpenGeminiAnalysis}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs flex items-center gap-2 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-blue-200 animate-pulse" />
          <span>Ask Gemini AI Analysis</span>
        </MagneticButton>
      </div>

      {/* 2. Search & Filter Parameters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3 items-end">
          {/* Origin */}
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              From
            </label>
            <select
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {Object.values(AIRPORTS).map((a) => (
                <option key={a.code} value={a.code}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </div>

          {/* Destination */}
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              To
            </label>
            <select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              {Object.values(AIRPORTS).map((a) => (
                <option key={a.code} value={a.code} disabled={a.code === origin}>
                  {a.city} ({a.code})
                </option>
              ))}
            </select>
          </div>

          {/* Travel Date */}
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Travel Date
            </label>
            <div className="relative">
              <input
                type="date"
                value={travelDate}
                onChange={(e) => setTravelDate(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Airline */}
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Airline
            </label>
            <select
              value={airline}
              onChange={(e) => setAirline(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="ALL">All Airlines</option>
              {Object.values(AIRLINES).map((air) => (
                <option key={air.code} value={air.code}>
                  {air.name} ({air.code})
                </option>
              ))}
            </select>
          </div>

          {/* Analyze CTA */}
          <div>
            <MagneticButton
              onClick={handleAnalyze}
              disabled={isAnalyzing}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-xs flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isAnalyzing ? 'Analyzing ML Model...' : 'Analyze Fare'}</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* AI Analyzing Scanner Loading State */}
      <AnimatePresence>
        {isAnalyzing && (
          <AIAnalyzingScanner
            route={`${origin} → ${destination}`}
            date={travelDate}
            onComplete={() => setIsAnalyzing(false)}
          />
        )}
      </AnimatePresence>

      {/* 3. Main Prediction Result Visual Card */}
      {!isAnalyzing && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-6"
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800/80">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                  {origin} → {destination}
                </span>
                <span className="text-xs text-slate-400 font-semibold">
                  ({AIRPORTS[origin]?.city || origin} to {AIRPORTS[destination]?.city || destination})
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {travelDate} Departure • Economy Cabin
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenAlertModal}
                className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer active:scale-95"
              >
                Track This Route
              </button>
            </div>
          </div>

          {/* 4 Core Forecast KPI Tiles */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
            {/* Current Fare */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Current Fare
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                <AnimatedNumber value={currentFare} prefix="₹" />
              </div>
              <span className="text-[10px] text-slate-500 block">Observed live market rate</span>
            </div>

            {/* Predicted Range */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Predicted Range
              </span>
              <div className="text-xl font-black text-blue-600 dark:text-blue-400">
                <AnimatedNumber value={predictedLow} prefix="₹" /> – <AnimatedNumber value={predictedHigh} prefix="₹" />
              </div>
              <span className="text-[10px] text-slate-500 block">Expected low-price window</span>
            </div>

            {/* Expected Movement */}
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/40 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Expected Movement
              </span>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300 flex items-center">
                <TrendingDown className="w-5 h-5 mr-1" />
                ↓ 5.4%
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Potential savings window</span>
            </div>

            {/* Recommendation */}
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-800/60 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
                Recommendation
              </span>
              <div className="text-2xl font-black text-blue-700 dark:text-blue-300 tracking-tight">
                WAIT
              </div>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 block">Optimal buy in 4-6 days</span>
            </div>

            {/* Confidence */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 space-y-1 col-span-2 lg:col-span-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Model Confidence
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                <AnimatedNumber value={82} suffix="%" />
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-1">
                <div className="bg-blue-600 h-full rounded-full" style={{ width: '82%' }} />
              </div>
            </div>
          </div>

          {/* Forecast Trajectory Chart */}
          <div className="space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <span>Historical vs Predicted Price Trajectory</span>
                <span className="text-[10px] text-slate-400 font-normal">
                  (Dotted line indicates projected ML forecast)
                </span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-blue-600 inline-block" />
                  <span>Historical Observed</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                  <span>AI Predicted Trajectory</span>
                </span>
              </div>
            </div>

            <div className="w-full h-60">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={forecastData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="predGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke={isDark ? '#1e293b' : '#e2e8f0'}
                    opacity={0.7}
                    vertical={false}
                  />
                  <XAxis
                    dataKey="day"
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
                        const d = payload[0].payload;
                        return (
                          <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 space-y-1">
                            <div className="font-bold text-slate-400">
                              {label} • {d.type}
                            </div>
                            <div className="text-blue-400 font-extrabold text-sm">
                              Fare: ₹{d.fare.toLocaleString('en-IN')}
                            </div>
                            <div className="text-slate-400 text-[10px]">
                              {d.isHistorical
                                ? 'Verified GDS quotation'
                                : `AI Projected range ₹${predictedLow.toLocaleString('en-IN')} - ₹${predictedHigh.toLocaleString('en-IN')}`}
                            </div>
                          </div>
                        );
                      }
                      return null;
                    }}
                  />
                  <ReferenceLine
                    x="Today"
                    stroke="#ef4444"
                    strokeDasharray="3 3"
                    label={{
                      value: 'Current Rate',
                      fill: '#ef4444',
                      fontSize: 10,
                      position: 'top'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="fare"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fill="url(#predGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      )}

      {/* 4. Explainable AI Section: "Why did the price change?" (Section 11) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800/80">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Why is this fare changing?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Explainable feature attribution breakdown via TreeSHAP model weights
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-md bg-purple-50 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-[10px] font-bold border border-purple-200 dark:border-purple-800/40">
            Explainable AI
          </span>
        </div>

        {/* Contributing Factors Bar Chart */}
        <div className="space-y-3 pt-1">
          {(
            [
              { label: 'Weekend Demand', pct: 32, note: 'Heavy Friday/Sunday return flight pressure' },
              { label: 'Booking Window', pct: 26, note: 'T-14 days horizon entering yield curve acceleration' },
              { label: 'Seat Availability', pct: 19, note: '68% cabin load factor across 18 daily non-stops' },
              { label: 'Festival / Events', pct: 14, note: 'Business summit and festive travel week' },
              { label: 'Historical Trend', pct: 9, note: 'Seasonal Q3 monsoon fare pattern baseline' }
            ] as Array<{ label: string; pct: number; note: string }>
          ).map((factor, idx) => (
            <div key={idx} className="space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {factor.label}
                </span>
                <span className="font-extrabold text-blue-600 dark:text-blue-400">
                  {factor.pct}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${factor.pct * 2.5}%` }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  className="bg-blue-600 h-full rounded-full"
                />
              </div>
              <div className="text-[10px] text-slate-400 dark:text-slate-500">
                {factor.note}
              </div>
            </div>
          ))}
        </div>

        {/* Natural Language Rationale */}
        <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-1">
          <span className="font-bold text-blue-900 dark:text-blue-300">
            AI Market Rationale:
          </span>
          <p className="leading-relaxed">
            The current fare (₹{currentFare.toLocaleString('en-IN')}) is higher than the historical average (₹{Math.round(currentFare * 0.88).toLocaleString('en-IN')}) because demand is increasing while the departure date is approaching. Historical data indicates non-metro flight additions will ease seat scarcity 4 days before travel, creating an optimal booking dip to ₹{predictedLow.toLocaleString('en-IN')} – ₹{predictedHigh.toLocaleString('en-IN')}.
          </p>
        </div>
      </div>
    </div>
  );
};

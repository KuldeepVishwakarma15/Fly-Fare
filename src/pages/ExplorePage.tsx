import React, { useState } from 'react';
import {
  AIRPORTS,
  BASKET_ROUTES,
  AIRLINES
} from '../data/mockAirfareData';
import {
  Search,
  Compass,
  ArrowRight,
  Plane,
  Sparkles,
  TrendingDown,
  TrendingUp,
  AlertCircle,
  Bell,
  Clock,
  ShieldCheck,
  Zap,
  Info,
  Calendar,
  Users
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AlternativeRouteCard } from '../components/AlternativeRouteCard';
import { AirlineLogo } from '../components/AirlineLogos';
import { MagneticButton } from '../components/MagneticButton';
import { TiltCard } from '../components/TiltCard';
import { AnimatedNumber } from '../components/AnimatedNumber';
import { motion } from 'motion/react';

interface ExplorePageProps {
  initialRouteKey?: string;
  onOpenAlertModal: () => void;
  onOpenGeminiAnalysis: () => void;
}

export const ExplorePage: React.FC<ExplorePageProps> = ({
  initialRouteKey = 'DEL-BOM',
  onOpenAlertModal,
  onOpenGeminiAnalysis
}) => {
  const { theme } = useTheme();

  const [origin, setOrigin] = useState('DEL');
  const [destination, setDestination] = useState('BOM');
  const [travelDate, setTravelDate] = useState('2024-09-15');
  const [passengers, setPassengers] = useState('1 Adult');
  const [isSearching, setIsSearching] = useState(false);

  const routeKey = `${origin}-${destination}`;
  const routeObj =
    BASKET_ROUTES.find((r) => r.routeKey === routeKey) || BASKET_ROUTES[0];

  const currentFare = routeObj.currentFare || 6240;
  const lowestFare = Math.round(currentFare * 0.88);
  const avgFare = Math.round(currentFare * 0.97);
  const highestFare = Math.round(currentFare * 1.42);

  const handleSearch = () => {
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 400);
  };

  // Mock live quotes
  const flightQuotes = [
    {
      airlineCode: '6E',
      flightNum: '6E 5318',
      depTime: '06:15',
      arrTime: '08:30',
      duration: '2h 15m',
      nonStop: true,
      fare: Math.round(currentFare * 0.99),
      seatsLeft: 4,
      onTimePct: 89
    },
    {
      airlineCode: 'AI',
      flightNum: 'AI 865',
      depTime: '08:00',
      arrTime: '10:15',
      duration: '2h 15m',
      nonStop: true,
      fare: Math.round(currentFare * 1.03),
      seatsLeft: 7,
      onTimePct: 82
    },
    {
      airlineCode: 'UK',
      flightNum: 'UK 995',
      depTime: '11:45',
      arrTime: '14:00',
      duration: '2h 15m',
      nonStop: true,
      fare: Math.round(currentFare * 1.08),
      seatsLeft: 2,
      onTimePct: 91
    },
    {
      airlineCode: 'QP',
      flightNum: 'QP 1102',
      depTime: '17:30',
      arrTime: '19:45',
      duration: '2h 15m',
      nonStop: true,
      fare: lowestFare,
      seatsLeft: 9,
      onTimePct: 86
    }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Fare Explorer & Benchmark Engine
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800/40">
              Live GDS Feeds
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Evaluate current price position, examine flight quotes, and receive AI buying recommendations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <MagneticButton
            onClick={onOpenAlertModal}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 text-xs font-bold shadow-2xs flex items-center gap-1.5 cursor-pointer"
          >
            <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Track Airfare</span>
          </MagneticButton>
        </div>
      </div>

      {/* 2. Large Search Panel (Section 12) */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5 items-end">
          {/* FROM */}
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

          {/* TO */}
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

          {/* TRAVEL DATE */}
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Travel Date
            </label>
            <input
              type="date"
              value={travelDate}
              onChange={(e) => setTravelDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            />
          </div>

          {/* PASSENGERS */}
          <div>
            <label className="text-[11px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
              Passengers
            </label>
            <select
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-bold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
            >
              <option value="1 Adult">1 Adult (Economy)</option>
              <option value="2 Adults">2 Adults (Economy)</option>
              <option value="1 Adult, Premium">1 Adult (Premium)</option>
            </select>
          </div>

          {/* CTA */}
          <div>
            <MagneticButton
              onClick={handleSearch}
              className="w-full py-2.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-extrabold shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
              <span>{isSearching ? 'Refreshing...' : 'Analyze Fare'}</span>
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* 3. Price Position & 4 Core Fares (Section 12) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Price Position Benchmark ({origin} → {destination})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparing live market rate against historical percentile distribution
            </p>
          </div>
          <span className="text-xs font-semibold text-slate-500">
            {travelDate} Departure
          </span>
        </div>

        {/* 4 Observed Metrics with TiltCard and AnimatedNumber */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5">
          <TiltCard maxTilt={6}>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 h-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Current Market Fare
              </span>
              <div className="text-2xl font-black text-blue-600 dark:text-blue-400">
                <AnimatedNumber value={currentFare} prefix="₹" />
              </div>
              <span className="text-[10px] text-slate-500 block">Median real-time quote</span>
            </div>
          </TiltCard>

          <TiltCard maxTilt={6}>
            <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 space-y-1 h-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                Cheapest Observed
              </span>
              <div className="text-2xl font-black text-emerald-700 dark:text-emerald-300">
                <AnimatedNumber value={lowestFare} prefix="₹" />
              </div>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 block">Akasa Air evening flight</span>
            </div>
          </TiltCard>

          <TiltCard maxTilt={6}>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 space-y-1 h-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                30-Day Average
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                <AnimatedNumber value={avgFare} prefix="₹" />
              </div>
              <span className="text-[10px] text-slate-500 block">Rolling baseline norm</span>
            </div>
          </TiltCard>

          <TiltCard maxTilt={6}>
            <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-800/40 space-y-1 h-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700 dark:text-rose-400">
                Highest Observed
              </span>
              <div className="text-2xl font-black text-rose-700 dark:text-rose-300">
                <AnimatedNumber value={highestFare} prefix="₹" />
              </div>
              <span className="text-[10px] text-rose-600 dark:text-rose-400 block">Last-minute peak bucket</span>
            </div>
          </TiltCard>
        </div>

        {/* Visual Price Position Scale Bar */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
            <span>Price Position Scale</span>
            <span className="text-blue-600 font-extrabold">Current: ₹{currentFare.toLocaleString('en-IN')}</span>
          </div>

          <div className="relative pt-4 pb-2">
            <div className="w-full h-3 bg-gradient-to-r from-emerald-500 via-blue-500 to-rose-500 rounded-full opacity-80" />

            {/* Scale Markers */}
            <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-400 mt-2">
              <div>
                <div>₹{lowestFare.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-emerald-600 font-semibold">Cheapest</div>
              </div>
              <div className="text-center">
                <div>₹{avgFare.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-slate-500 font-semibold">Average</div>
              </div>
              <div className="text-center">
                <div className="text-blue-600 dark:text-blue-400 font-black">₹{currentFare.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold">Current</div>
              </div>
              <div className="text-right">
                <div>₹{highestFare.toLocaleString('en-IN')}</div>
                <div className="text-[10px] text-rose-600 font-semibold">Highest</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Book / Wait / Monitor Recommendation Engine (Section 13) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* State 1: BOOK NOW */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2.5 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              🟢 BOOK NOW
            </span>
            <span className="text-[10px] font-semibold text-slate-400">Trigger Condition</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Use when price is unusually low (&lt;10% below 30-day average) with limited seat capacity.
          </p>
          <div className="text-[11px] font-semibold text-slate-500">
            Target Price: ≤ ₹{Math.round(currentFare * 0.9).toLocaleString('en-IN')}
          </div>
        </div>

        {/* State 2: WAIT (ACTIVE FOR CURRENT ROUTE) */}
        <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border-2 border-blue-600 dark:border-blue-500 shadow-xs space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-blue-600 text-white">
              🔵 WAIT (Recommended)
            </span>
            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400">82% Confidence</span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 font-medium">
            Historical patterns strongly indicate prices will drop 4–6 days prior to departure as non-metro inventory opens.
          </p>
          <div className="text-[11px] font-bold text-blue-700 dark:text-blue-300 flex items-center justify-between">
            <span>Expected Fare: ₹{lowestFare.toLocaleString('en-IN')} – ₹{Math.round(currentFare * 0.94).toLocaleString('en-IN')}</span>
            <span className="text-emerald-600">↓ 5.4%</span>
          </div>
        </div>

        {/* State 3: MONITOR */}
        <div className="p-4 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2.5 opacity-60 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
              🟡 MONITOR
            </span>
            <span className="text-[10px] font-semibold text-slate-400">Trigger Condition</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Use when uncertainty is high or festival load factor is unpredictable across airlines.
          </p>
          <div className="text-[11px] font-semibold text-slate-500">
            Set custom threshold alert
          </div>
        </div>
      </div>

      {/* 5. Live Flight Quotes Table */}
      <div className="p-5 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Live Airline Quotes ({origin} → {destination})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct GDS inventory quotations for {travelDate}
            </p>
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold">
            ● 4 Quotes Aggregated
          </span>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60">
          {flightQuotes.map((q, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25, delay: idx * 0.05 }}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50 dark:hover:bg-slate-900/50 p-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3">
                <AirlineLogo airlineCode={q.airlineCode} size={32} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {AIRLINES[q.airlineCode]?.name || q.airlineCode}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">
                      {q.flightNum}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    {q.depTime} → {q.arrTime} • {q.duration} (Non-stop)
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-4">
                <div className="text-right">
                  <div className="text-base font-black text-slate-900 dark:text-white">
                    ₹{q.fare.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    {q.seatsLeft} seats left at this tier
                  </div>
                </div>

                <MagneticButton
                  onClick={onOpenAlertModal}
                  className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold cursor-pointer"
                >
                  Watch
                </MagneticButton>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* 6. Alternative Route Savings Suggestion */}
      {routeObj.alternatives && routeObj.alternatives.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
            Hub Arbitrage & Nearby Alternatives
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {routeObj.alternatives.map((alt, idx) => (
              <AlternativeRouteCard
                key={idx}
                alternative={alt}
                primaryRoute={`${origin} → ${destination}`}
                primaryFare={currentFare}
              />
            ))}
          </div>
        </div>
      )}

      {/* Model Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-2">
        <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
        <span>
          <strong>Scientific Notice:</strong> AI predictions are probabilistic estimations based on historical GDS load factors and seasonal curves. Predictions do not constitute guaranteed airline ticket reservations.
        </span>
      </div>
    </div>
  );
};

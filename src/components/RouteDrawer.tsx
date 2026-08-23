import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Plane,
  ArrowRight,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Bell,
  ExternalLink,
  Shield,
  Activity,
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';
import { RouteIndexData } from '../types';
import { BASKET_ROUTES, AIRPORTS } from '../data/mockAirfareData';
import { FareChart } from './FareChart';
import { AnimatedNumber } from './AnimatedNumber';

interface RouteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  routeKey: string;
  onOpenAlertModal?: () => void;
  onOpenGeminiAnalysis?: () => void;
}

export const RouteDrawer: React.FC<RouteDrawerProps> = ({
  isOpen,
  onClose,
  routeKey,
  onOpenAlertModal,
  onOpenGeminiAnalysis
}) => {
  const route =
    BASKET_ROUTES.find((r) => r.routeKey === routeKey) || BASKET_ROUTES[0];
  const origAirport = AIRPORTS[route.origin];
  const destAirport = AIRPORTS[route.destination];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs"
          />

          <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="w-screen max-w-md md:max-w-lg bg-white dark:bg-[#07090E] border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-[#07090E]/95 backdrop-blur-md z-10">
                <div className="flex items-center gap-2.5">
                  <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
                    <Plane className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-extrabold text-slate-900 dark:text-white">
                        {route.originCity} → {route.destinationCity}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                        {route.routeKey}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {route.distanceKm || 1148} km • {route.typicalDuration || '2h 10m'}
                    </p>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body */}
              <div className="p-5 space-y-5 flex-1">
                {/* 4 Core Corridor Metrics */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                      Current Median Fare
                    </span>
                    <div className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                      <AnimatedNumber value={route.currentFare} prefix="₹" />
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium block mt-0.5">
                      Base: ₹{(route.baseFare2023 || Math.round(route.currentFare * 0.85)).toLocaleString('en-IN')}
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                      Route Index Value
                    </span>
                    <div className="text-xl font-extrabold text-slate-900 dark:text-white">
                      <AnimatedNumber value={route.indexValue} decimals={1} />
                    </div>
                    <div className="flex items-center gap-1 text-[11px] font-bold text-rose-600 dark:text-rose-400 mt-0.5">
                      <TrendingUp className="w-3 h-3" />
                      <span>+{route.monthlyChangePct}% vs Base</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                      Surge Alert Risk
                    </span>
                    <span
                      className={`inline-block text-xs font-extrabold px-2 py-0.5 rounded-full ${
                        route.surgeRisk === 'High'
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                          : route.surgeRisk === 'Medium'
                          ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      {route.surgeRisk} Risk
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 block mb-1">
                      Daily Flight Frequency
                    </span>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200">
                      {route.dailyFlights || 48} Non-Stop Flights
                    </span>
                    <span className="text-[10px] text-slate-400 block mt-0.5">
                      {route.passengerSharePct || 8.4}% Pax Share
                    </span>
                  </div>
                </div>

                {/* Trajectory Chart */}
                <div>
                  <FareChart
                    routeKey={route.routeKey}
                    currentFare={route.currentFare}
                    height={200}
                  />
                </div>

                {/* Airport Hub Intelligence */}
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
                  <div className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Airport Hub Specs
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Origin:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {origAirport?.name} ({origAirport?.code}) • Tier {origAirport?.tier}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Destination:</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {destAirport?.name} ({destAirport?.code}) • Tier {destAirport?.tier}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-500 dark:text-slate-400">National Basket Weight:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {route.basketWeightPct}%
                    </span>
                  </div>
                </div>

                {/* Quick Action CTAs */}
                <div className="space-y-2 pt-2">
                  {onOpenGeminiAnalysis && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenGeminiAnalysis();
                      }}
                      className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                    >
                      <Sparkles className="w-4 h-4" />
                      <span>Run Gemini AI Diagnostic for {route.routeKey}</span>
                    </button>
                  )}

                  {onOpenAlertModal && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenAlertModal();
                      }}
                      className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 border border-slate-200 dark:border-slate-700 transition-all cursor-pointer"
                    >
                      <Bell className="w-4 h-4 text-blue-500" />
                      <span>Set Route Surge Alert</span>
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

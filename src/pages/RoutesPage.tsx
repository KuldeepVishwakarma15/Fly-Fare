import React, { useState } from 'react';
import { RouteHeatmap } from '../components/RouteHeatmap';
import { AlternativeRouteCard } from '../components/AlternativeRouteCard';
import { BASKET_ROUTES } from '../data/mockAirfareData';
import { RouteIndexData } from '../types';
import {
  Activity,
  Shuffle,
  ArrowRight,
  TrendingUp,
  MapPin,
  Bus,
  Search,
  Filter
} from 'lucide-react';

interface RoutesPageProps {
  onSelectRouteForAnalysis?: (routeKey: string) => void;
}

export const RoutesPage: React.FC<RoutesPageProps> = ({ onSelectRouteForAnalysis }) => {
  const [selectedRoute, setSelectedRoute] = useState<RouteIndexData>(BASKET_ROUTES[0]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRoutes = BASKET_ROUTES.filter(
    (r) =>
      r.routeKey.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.originCity.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.destinationCity.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          Aviation Network & Arbitrage
        </span>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white mt-1">
          Route Intelligence & Smart Alternatives
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
          Visual corridor heatmap, volatility diagnostics, and multi-modal nearby airport cost arbitrage recommendations.
        </p>
      </div>

      {/* Interactive India Map */}
      <RouteHeatmap
        selectedRouteKey={selectedRoute.routeKey}
        onSelectRoute={(route) => setSelectedRoute(route)}
      />

      {/* Alternative Route Cost Arbitrage Card */}
      {selectedRoute.alternatives && selectedRoute.alternatives.length > 0 ? (
        <AlternativeRouteCard
          currentRoute={selectedRoute.routeKey}
          currentFare={selectedRoute.currentFare}
          alternatives={selectedRoute.alternatives}
        />
      ) : (
        <div className="p-5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800 text-xs text-slate-500">
          No direct secondary airport alternatives registered for {selectedRoute.routeKey}.
        </div>
      )}

      {/* All Routes Grid */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h3 className="text-base font-bold text-slate-900 dark:text-white">
            All Domestic Aviation Corridors ({filteredRoutes.length})
          </h3>
          <div className="relative">
            <input
              type="text"
              placeholder="Search by city or airport..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1.5 pl-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-900 dark:text-white"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredRoutes.map((r) => {
            const isSelected = r.routeKey === selectedRoute.routeKey;
            return (
              <div
                key={r.routeKey}
                onClick={() => setSelectedRoute(r)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-blue-50/60 dark:bg-blue-950/40 border-blue-400 dark:border-blue-700 shadow-sm'
                    : 'bg-white dark:bg-slate-900 border-slate-200/80 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    {r.routeKey}
                  </span>
                  <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
                    ₹{r.currentFare.toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-300 font-medium mb-3">
                  {r.originCity} → {r.destinationCity}
                </div>

                <div className="grid grid-cols-3 gap-2 text-[11px]">
                  <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">Index</span>
                    <span className="font-bold text-slate-900 dark:text-white">{r.indexValue}</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">MoM</span>
                    <span className="font-bold text-rose-600">+{r.monthlyChangePct}%</span>
                  </div>
                  <div className="p-1.5 rounded bg-slate-50 dark:bg-slate-800 text-center">
                    <span className="text-slate-400 block text-[10px]">Surge</span>
                    <span
                      className={`font-bold ${
                        r.surgeRisk === 'High' ? 'text-rose-600' : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {r.surgeRisk}
                    </span>
                  </div>
                </div>

                {r.alternatives && r.alternatives.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    <span>Alternative: {r.alternatives[0].altRoute}</span>
                    <span>Save ₹{r.alternatives[0].savings.toLocaleString('en-IN')}</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

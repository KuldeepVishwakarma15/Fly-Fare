import React, { useState } from 'react';
import { AIRPORTS, BASKET_ROUTES } from '../data/mockAirfareData';
import { RouteIndexData } from '../types';
import { MapPin, Navigation, Info, ArrowUpRight, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { AnimatedNumber } from './AnimatedNumber';

interface RouteHeatmapProps {
  id?: string;
  onSelectRoute?: (route: RouteIndexData) => void;
  selectedRouteKey?: string;
}

export const RouteHeatmap: React.FC<RouteHeatmapProps> = ({
  id,
  onSelectRoute,
  selectedRouteKey = 'DEL-BOM'
}) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [metricMode, setMetricMode] = useState<'inflation' | 'fare' | 'surge' | 'volatility'>('inflation');
  const [hoveredRoute, setHoveredRoute] = useState<RouteIndexData | null>(null);

  // SVG coordinate projection bounds for Indian sub-continent
  // Lat: ~8.0 to ~32.0, Lng: ~68.0 to ~96.0
  const width = 600;
  const height = 580;

  const projectCoords = (lat: number, lng: number) => {
    const minLng = 68.0;
    const maxLng = 94.0;
    const minLat = 8.0;
    const maxLat = 32.0;

    const x = ((lng - minLng) / (maxLng - minLng)) * (width - 120) + 60;
    const y = ((maxLat - lat) / (maxLat - minLat)) * (height - 100) + 40;
    return { x, y };
  };

  const getRouteColor = (route: RouteIndexData) => {
    switch (metricMode) {
      case 'inflation':
        if (route.monthlyChangePct >= 8.0) return '#ef4444'; // red
        if (route.monthlyChangePct >= 5.0) return '#f59e0b'; // amber
        return '#10b981'; // emerald
      case 'fare':
        if (route.currentFare >= 7000) return '#ef4444';
        if (route.currentFare >= 5500) return '#3b82f6';
        return '#10b981';
      case 'surge':
        if (route.surgeRisk === 'High') return '#ef4444';
        if (route.surgeRisk === 'Medium') return '#f59e0b';
        return '#10b981';
      case 'volatility':
        if (route.volatility === 'High') return '#ec4899';
        if (route.volatility === 'Medium') return '#8b5cf6';
        return '#3b82f6';
    }
  };

  const currentSelected = BASKET_ROUTES.find((r) => r.routeKey === selectedRouteKey) || BASKET_ROUTES[0];
  const activeDetailRoute = hoveredRoute || currentSelected;

  return (
    <div
      id={id}
      className="bg-white dark:bg-[#0A0A0A] rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm transition-colors"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              <Activity className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Interactive India Airfare Route Network
            </h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Airfare intensity heatmap across primary domestic aviation corridors
          </p>
        </div>

        {/* Heatmap metric filter */}
        <div className="flex items-center bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-1 rounded-lg text-xs font-semibold">
          <button
            onClick={() => setMetricMode('inflation')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              metricMode === 'inflation'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Inflation %
          </button>
          <button
            onClick={() => setMetricMode('fare')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              metricMode === 'fare'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Fare Level
          </button>
          <button
            onClick={() => setMetricMode('surge')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              metricMode === 'surge'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Surge Risk
          </button>
          <button
            onClick={() => setMetricMode('volatility')}
            className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
              metricMode === 'volatility'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Volatility
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
        {/* SVG Route Map */}
        <div className="lg:col-span-8 relative bg-slate-50 dark:bg-[#050505] rounded-xl overflow-hidden p-2 border border-slate-200 dark:border-slate-800">
          <div className="absolute top-3 left-3 z-10 bg-white/90 dark:bg-[#0A0A0A]/90 backdrop-blur-md px-3 py-1.5 rounded border border-slate-200 dark:border-slate-800 text-[11px] text-slate-700 dark:text-slate-300 font-medium shadow-xs">
            Click any route arc or city hub to inspect
          </div>

          <svg
            viewBox={`0 0 ${width} ${height}`}
            className="w-full h-auto max-h-[460px] select-none"
          >
            {/* Background grid */}
            <defs>
              <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
                <path
                  d="M 24 0 L 0 0 0 24"
                  fill="none"
                  stroke={isDark ? '#1e293b' : '#e2e8f0'}
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width={width} height={height} fill="url(#grid)" />

            {/* Approximate India boundary silhouette glow */}
            <path
              d="M 220 50 Q 280 40 330 90 T 480 160 T 520 220 T 430 300 T 360 400 T 300 520 T 260 460 T 180 340 T 130 260 T 160 170 Z"
              fill={isDark ? '#0a0f1d' : '#f1f5f9'}
              stroke={isDark ? '#1e293b' : '#cbd5e1'}
              strokeWidth="1.5"
              opacity="0.8"
            />

            {/* Route Arcs */}
            {BASKET_ROUTES.map((route) => {
              const origAirport = AIRPORTS[route.origin];
              const destAirport = AIRPORTS[route.destination];
              if (!origAirport || !destAirport) return null;

              const p1 = projectCoords(origAirport.lat, origAirport.lng);
              const p2 = projectCoords(destAirport.lat, destAirport.lng);

              // Quadratic curve control point with arch
              const midX = (p1.x + p2.x) / 2;
              const midY = (p1.y + p2.y) / 2 - 35;

              const isSelected = route.routeKey === selectedRouteKey;
              const isHovered = hoveredRoute?.routeKey === route.routeKey;
              const strokeColor = getRouteColor(route);

              return (
                <g
                  key={route.routeKey}
                  className="cursor-pointer transition-all"
                  onClick={() => onSelectRoute && onSelectRoute(route)}
                  onMouseEnter={() => setHoveredRoute(route)}
                  onMouseLeave={() => setHoveredRoute(null)}
                >
                  {/* Subtle glowing halo on hover/select */}
                  {(isSelected || isHovered) && (
                    <path
                      d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
                      fill="none"
                      stroke={strokeColor}
                      strokeWidth={8}
                      strokeOpacity={0.25}
                    />
                  )}
                  <path
                    d={`M ${p1.x} ${p1.y} Q ${midX} ${midY} ${p2.x} ${p2.y}`}
                    fill="none"
                    stroke={strokeColor}
                    strokeWidth={isSelected || isHovered ? 3.5 : 2}
                    strokeOpacity={isSelected || isHovered ? 1 : 0.65}
                    strokeDasharray={isSelected ? 'none' : '5 3'}
                  />
                </g>
              );
            })}

            {/* Airport Nodes with Subtle Pulse Rings */}
            {Object.values(AIRPORTS).map((airport) => {
              const p = projectCoords(airport.lat, airport.lng);
              const isMetro = airport.tier === 'Metro';
              return (
                <g key={airport.code} className="cursor-pointer group">
                  {/* Animated pulse ring */}
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isMetro ? 11 : 8}
                    fill="none"
                    stroke={isMetro ? '#38bdf8' : '#94a3b8'}
                    strokeWidth="1"
                    strokeOpacity="0.4"
                    className="animate-ping"
                    style={{ animationDuration: '3s' }}
                  />
                  <circle
                    cx={p.x}
                    cy={p.y}
                    r={isMetro ? 5.5 : 4}
                    fill={isMetro ? '#0284c7' : '#64748b'}
                    stroke={isDark ? '#38bdf8' : '#ffffff'}
                    strokeWidth="2"
                    className="transition-transform group-hover:scale-125"
                  />
                  <text
                    x={p.x}
                    y={p.y - 9}
                    textAnchor="middle"
                    fill={isDark ? '#f8fafc' : '#1e293b'}
                    fontSize="9.5"
                    fontWeight="bold"
                    className="drop-shadow-xs select-none"
                  >
                    {airport.code}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Selected / Hovered Route Detail Card */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between gap-2 pb-2 mb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Route Diagnostic
              </span>
              <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                {activeDetailRoute.routeKey}
              </span>
            </div>

            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              {activeDetailRoute.originCity} → {activeDetailRoute.destinationCity}
            </h3>

            <div className="grid grid-cols-2 gap-2 my-3">
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#050505] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Current Fare</span>
                <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  <AnimatedNumber value={activeDetailRoute.currentFare} prefix="₹" />
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#050505] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Route Index</span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  <AnimatedNumber value={activeDetailRoute.indexValue} decimals={1} />
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#050505] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Monthly Change</span>
                <span
                  className={`text-sm font-bold ${
                    activeDetailRoute.monthlyChangePct > 6 ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  +{activeDetailRoute.monthlyChangePct}%
                </span>
              </div>
              <div className="p-2.5 rounded-lg bg-white dark:bg-[#050505] border border-slate-200 dark:border-slate-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Volatility</span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  {activeDetailRoute.volatility}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">Surge Risk Level:</span>
                <span
                  className={`font-semibold ${
                    activeDetailRoute.surgeRisk === 'High'
                      ? 'text-rose-600 dark:text-rose-400'
                      : activeDetailRoute.surgeRisk === 'Medium'
                      ? 'text-amber-600 dark:text-amber-400'
                      : 'text-emerald-600 dark:text-emerald-400'
                  }`}
                >
                  {activeDetailRoute.surgeRisk} Risk
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-slate-400">National Basket Weight:</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {activeDetailRoute.basketWeightPct}%
                </span>
              </div>
            </div>

            {onSelectRoute && (
              <button
                onClick={() => onSelectRoute(activeDetailRoute)}
                className="w-full mt-3 px-3 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>Deep Dive on {activeDetailRoute.routeKey}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


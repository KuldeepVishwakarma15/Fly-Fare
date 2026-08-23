import React, { useState } from 'react';
import {
  Landmark,
  Scale,
  Sparkles,
  TrendingUp,
  FileSpreadsheet,
  Layers,
  AlertTriangle,
  Info,
  Shield,
  Clock,
  ArrowRight
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { NATIONAL_INDEX } from '../data/mockAirfareData';
import { GeminiPolicyModal } from '../components/GeminiPolicyModal';
import { useTheme } from '../context/ThemeContext';

export const GovernmentPage: React.FC = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const [isPolicyModalOpen, setIsPolicyModalOpen] = useState(false);

  const cpiComparisonData = [
    { category: 'Transport CPI Weight (6.8%)', traditional: 112.4, highFrequency: 114.1, divergence: '+1.7 pts' },
    { category: 'Headline Rural/Urban CPI', traditional: 108.2, highFrequency: 108.9, divergence: '+0.7 pts' },
    { category: 'Aviation Sub-Group', traditional: 115.0, highFrequency: 118.6, divergence: '+3.6 pts' }
  ];

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 1. Header (Section 16) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Policy Intelligence & Macro Analytics
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 text-[11px] font-bold border border-indigo-200 dark:border-indigo-800/40">
              MoCA / RBI Economic Research
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            High-frequency airfare indicators for economic monitoring and CPI research.
          </p>
        </div>

        <button
          onClick={() => setIsPolicyModalOpen(true)}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <Sparkles className="w-4 h-4" />
          <span>Generate AI Policy Briefing</span>
        </button>
      </div>

      {/* 2. 4 Policy KPIs (Section 16) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            National Airfare Index
          </span>
          <div className="text-3xl font-black text-slate-900 dark:text-white">
            118.6
          </div>
          <p className="text-[11px] text-slate-400">Laspeyres weighted basket (Base: 100)</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Monthly Inflation
          </span>
          <div className="text-3xl font-black text-rose-600 dark:text-rose-400">
            +6.8%
          </div>
          <p className="text-[11px] text-slate-400">Month-over-month price level rise</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Routes With Significant Inflation
          </span>
          <div className="text-3xl font-black text-amber-600 dark:text-amber-400">
            14
          </div>
          <p className="text-[11px] text-slate-400">Corridors exceeding &gt;5.0% MoM rise</p>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-1">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
            High-Risk Routes
          </span>
          <div className="text-3xl font-black text-rose-600 dark:text-rose-400">
            5
          </div>
          <p className="text-[11px] text-slate-400">Routes at risk of severe capacity gouging</p>
        </div>
      </div>

      {/* 3. CPI Simulation Comparison (Section 16) */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              High-Frequency CPI Airfare Divergence Simulation
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Comparing traditional monthly field survey sampling vs automated high-frequency GDS ingestion
            </p>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            Lead Indicator: +18 Days
          </span>
        </div>

        {/* Prototype Warning Banner */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <strong>Disclaimer:</strong> Prototype simulation — not an official CPI calculation. High-frequency price indices serve as experimental research tools to model rapid inflation transmission before formal monthly statistical releases.
          </div>
        </div>

        {/* Comparison Recharts Bar Graph */}
        <div className="w-full h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={cpiComparisonData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#1e293b' : '#e2e8f0'} vertical={false} />
              <XAxis dataKey="category" tickLine={false} axisLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }} />
              <YAxis tickLine={false} axisLine={false} tick={{ fill: isDark ? '#94a3b8' : '#64748b', fontSize: 11 }} domain={[100, 125]} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-slate-900 text-white p-3 rounded-xl shadow-xl text-xs border border-slate-700 space-y-1">
                        <div className="font-bold text-slate-400">{label}</div>
                        <div className="text-slate-300">Traditional Sample: {d.traditional}</div>
                        <div className="text-blue-400 font-bold">High-Frequency Feeds: {d.highFrequency}</div>
                        <div className="text-rose-400 font-bold">Divergence: {d.divergence}</div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
              <Bar dataKey="traditional" name="Traditional Survey (Monthly Lag)" fill="#94a3b8" radius={[4, 4, 0, 0]} />
              <Bar dataKey="highFrequency" name="FlyFair High-Frequency (Real-time)" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gemini Policy Modal */}
      <GeminiPolicyModal
        isOpen={isPolicyModalOpen}
        onClose={() => setIsPolicyModalOpen(false)}
        nationalIndex={118.6}
        inflationPct={6.8}
        highSurgeRoutes={['DEL-BOM (+43%)', 'BOM-BLR (+31%)', 'DEL-BLR (+29%)']}
      />
    </div>
  );
};

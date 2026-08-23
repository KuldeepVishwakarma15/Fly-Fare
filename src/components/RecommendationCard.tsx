import React from 'react';
import {
  Sparkles,
  CheckCircle2,
  Clock,
  Eye,
  AlertCircle,
  TrendingDown,
  TrendingUp,
  Shield,
  Bot,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { AnimatedNumber } from './AnimatedNumber';
import { MagneticButton } from './MagneticButton';

interface RecommendationCardProps {
  id?: string;
  recommendation: 'BOOK NOW' | 'WAIT' | 'MONITOR';
  confidencePct: number;
  currentFare: number;
  expectedRange: [number, number];
  trend: 'INCREASE' | 'DECREASE' | 'STABLE';
  reason: string;
  priceRisk: 'LOW' | 'MEDIUM' | 'HIGH';
  route?: string;
  onOpenGeminiAnalysis?: () => void;
  isLoadingAi?: boolean;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  id,
  recommendation,
  confidencePct,
  currentFare,
  expectedRange,
  trend,
  reason,
  priceRisk,
  route = 'DEL → BOM',
  onOpenGeminiAnalysis,
  isLoadingAi = false
}) => {
  const getBadgeStyle = () => {
    switch (recommendation) {
      case 'BOOK NOW':
        return {
          bg: 'bg-emerald-600 text-white shadow-emerald-500/20 shadow-lg',
          glow: 'from-emerald-500/10 via-transparent to-transparent',
          badgeBg: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/60',
          icon: <CheckCircle2 className="w-6 h-6" />,
          heading: 'Favorable Booking Window',
          desc: 'Current fare is at a localized bottom. Price expected to climb soon.'
        };
      case 'WAIT':
        return {
          bg: 'bg-amber-600 text-white shadow-amber-500/20 shadow-lg',
          glow: 'from-amber-500/10 via-transparent to-transparent',
          badgeBg: 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/60',
          icon: <Clock className="w-6 h-6" />,
          heading: 'Price Softening Projected',
          desc: 'Historical yield patterns project a price dip before departure.'
        };
      case 'MONITOR':
        return {
          bg: 'bg-blue-600 text-white shadow-blue-500/20 shadow-lg',
          glow: 'from-blue-500/10 via-transparent to-transparent',
          badgeBg: 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/40 dark:text-blue-400 dark:border-blue-800/60',
          icon: <Eye className="w-6 h-6" />,
          heading: 'Neutral Price Corridor',
          desc: 'Fares are fluctuating within normal volatility bounds.'
        };
    }
  };

  const config = getBadgeStyle();

  return (
    <div
      id={id}
      className="bg-white dark:bg-[#0A0D14] rounded-2xl p-6 border border-slate-200/90 dark:border-slate-800/80 shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-lg"
    >
      {/* Background soft ambient gradient */}
      <div
        aria-hidden="true"
        className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl ${config.glow} pointer-events-none rounded-full blur-3xl`}
      />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800 relative z-10">
        <div className="flex items-center gap-3.5">
          <motion.div
            whileHover={{ scale: 1.05, rotate: 2 }}
            className={`w-12 h-12 rounded-2xl flex items-center justify-center ${config.bg} transition-transform`}
          >
            {config.icon}
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                AI Recommendation Engine
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20">
                <Sparkles className="w-3 h-3 text-blue-500 animate-pulse" />
                <span>{confidencePct}% Confidence</span>
              </span>
            </div>
            <div className="flex items-baseline gap-3 mt-1">
              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                {recommendation}
              </h3>
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
                on {route}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-right shadow-2xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Price Risk
            </span>
            <span
              className={`text-xs font-black ${
                priceRisk === 'HIGH'
                  ? 'text-rose-600 dark:text-rose-400'
                  : priceRisk === 'MEDIUM'
                  ? 'text-amber-600 dark:text-amber-400'
                  : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              {priceRisk} RISK
            </span>
          </div>

          <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 text-right shadow-2xs">
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Target Price Band
            </span>
            <span className="text-xs font-black text-slate-900 dark:text-white">
              <AnimatedNumber value={expectedRange[0]} prefix="₹" /> – <AnimatedNumber value={expectedRange[1]} prefix="₹" />
            </span>
          </div>
        </div>
      </div>

      {/* Animated Confidence Bar */}
      <div className="py-3 relative z-10">
        <div className="flex items-center justify-between text-xs font-bold text-slate-600 dark:text-slate-400 mb-1.5">
          <span>Decision Confidence Model</span>
          <span className="text-blue-600 dark:text-blue-400 font-extrabold">{confidencePct}%</span>
        </div>
        <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${confidencePct}%` }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full ${
              recommendation === 'BOOK NOW'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                : recommendation === 'WAIT'
                ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                : 'bg-gradient-to-r from-blue-500 to-indigo-400'
            }`}
          />
        </div>
      </div>

      <div className="py-2 relative z-10">
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white mr-1.5">
            Statistical Rationale:
          </span>
          "{reason}"
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800 relative z-10">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <Shield className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          <span>Grounded on 30-day historical time-series & advance booking curves</span>
        </div>

        {onOpenGeminiAnalysis && (
          <MagneticButton
            id="btn-gemini-ai-deep-dive"
            onClick={onOpenGeminiAnalysis}
            disabled={isLoadingAi}
            className="w-full sm:w-auto px-4 py-2 text-xs font-bold rounded-xl bg-blue-600 hover:bg-blue-500 text-white shadow-xs disabled:opacity-50 flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-blue-100" />
            <span>{isLoadingAi ? 'Consulting Gemini AI...' : 'Explain with Gemini AI'}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </MagneticButton>
        )}
      </div>
    </div>
  );
};


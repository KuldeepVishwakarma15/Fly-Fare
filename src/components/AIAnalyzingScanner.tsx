import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, CheckCircle2, Cpu, Activity, Database, Layers } from 'lucide-react';

interface AIAnalyzingScannerProps {
  isAnalyzing: boolean;
  onComplete?: () => void;
  routeKey?: string;
}

const ANALYSIS_STEPS = [
  { label: 'Ingesting GDS high-frequency seat quotes & inventory bins...', icon: Database },
  { label: 'Calculating advance booking window yield velocity...', icon: Activity },
  { label: 'Evaluating seasonal festival & weekend demand multipliers...', icon: Layers },
  { label: 'Running multi-horizon XGBoost gradient boosted regression...', icon: Cpu },
  { label: 'Formulating explainable SHAP feature-attribution weights...', icon: Sparkles }
];

export const AIAnalyzingScanner: React.FC<AIAnalyzingScannerProps> = ({
  isAnalyzing,
  onComplete,
  routeKey = 'DEL-BOM'
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    if (!isAnalyzing) {
      setCurrentStepIndex(0);
      return;
    }

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < ANALYSIS_STEPS.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          if (onComplete) onComplete();
          return prev;
        }
      });
    }, 240);

    return () => clearInterval(interval);
  }, [isAnalyzing, onComplete]);

  if (!isAnalyzing) return null;

  const currentStep = ANALYSIS_STEPS[currentStepIndex];
  const StepIcon = currentStep.icon;
  const progressPct = ((currentStepIndex + 1) / ANALYSIS_STEPS.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      className="p-5 rounded-2xl bg-gradient-to-r from-blue-900/20 via-indigo-900/20 to-purple-900/20 dark:from-blue-950/40 dark:via-indigo-950/40 dark:to-purple-950/40 border border-blue-500/30 dark:border-blue-500/30 shadow-lg relative overflow-hidden backdrop-blur-md"
    >
      {/* Animated glowing scanning beam */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
        className="absolute top-0 bottom-0 w-48 bg-gradient-to-r from-transparent via-blue-500/15 to-transparent pointer-events-none"
      />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-md animate-pulse">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-blue-600 dark:text-blue-400">
                AI Predictive Engine Active
              </span>
              <span className="text-[11px] font-bold text-slate-500">({routeKey})</span>
            </div>
            <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
              Evaluating 1.4M historical booking curves...
            </p>
          </div>
        </div>

        <div className="text-right">
          <span className="text-xs font-extrabold text-blue-600 dark:text-blue-400">
            {Math.round(progressPct)}%
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden mb-3">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_8px_rgba(59,130,246,0.6)]"
          style={{ width: `${progressPct}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Step description */}
      <div className="flex items-center gap-2 text-xs font-medium text-slate-700 dark:text-slate-300">
        <StepIcon className="w-3.5 h-3.5 text-blue-500 animate-spin" style={{ animationDuration: '3s' }} />
        <span>{currentStep.label}</span>
      </div>
    </motion.div>
  );
};

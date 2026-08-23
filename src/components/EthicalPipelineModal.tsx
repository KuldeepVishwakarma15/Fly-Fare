import React from 'react';
import {
  X,
  CheckCircle2,
  Shield,
  Database,
  Cpu,
  Globe,
  Server,
  Lock,
  Layers,
  ArrowDown,
  ArrowUp,
  Sparkles
} from 'lucide-react';

interface EthicalPipelineModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EthicalPipelineModal: React.FC<EthicalPipelineModalProps> = ({
  isOpen,
  onClose
}) => {
  if (!isOpen) return null;

  const techBadges = [
    'Next.js / React',
    'TypeScript',
    'FastAPI',
    'Python',
    'PostgreSQL',
    'Pandas',
    'Scikit-learn',
    'Playwright',
    'n8n',
    'Gemini 3.7 Flash'
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#0A0D14] rounded-2xl max-w-3xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[92vh] transition-colors">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                FlyFair India System Architecture
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                End-to-end data ingestion, ML forecasting & index calculation engine
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Architecture Visual Diagram (Section 18) */}
          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#05070C] border border-slate-200 dark:border-slate-800 text-center space-y-3 font-mono text-xs">
            {/* Top Node */}
            <div className="inline-block px-4 py-2 rounded-xl bg-blue-600 text-white font-bold shadow-xs">
              FlyFair India (Client Presentation)
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* API Node */}
            <div className="inline-block px-4 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold">
              High-Frequency REST API & Caching Layer
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Analytics Layer */}
            <div className="inline-block px-4 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold">
              Analytics & Anomaly Detection Layer
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Dual Core Engine Box */}
            <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-300 font-bold">
                Laspeyres Index Engine
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                  Basket weighting & CPI tracking
                </div>
              </div>

              <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-900 dark:text-purple-300 font-bold">
                AI Prediction Engine
                <div className="text-[10px] font-normal text-slate-500 mt-0.5">
                  XGBoost, SHAP & Gemini AI
                </div>
              </div>
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowDown className="w-4 h-4" />
            </div>

            {/* Database Node */}
            <div className="inline-block px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 font-bold">
              PostgreSQL (Partitioned Time-Series Corridors)
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowUp className="w-4 h-4" />
            </div>

            {/* Pipeline Node */}
            <div className="inline-block px-4 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200 font-bold">
              Automated Data Pipeline (Normalizer & Outlier Filter)
            </div>

            <div className="flex justify-center text-slate-400">
              <ArrowUp className="w-4 h-4" />
            </div>

            {/* Source Feeds */}
            <div className="inline-block px-4 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-[11px]">
              Airline Public Feeds & GDS APIs (Ethical Ingestion)
            </div>
          </div>

          {/* Technology Badges (Section 18) */}
          <div className="space-y-2">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-slate-500">
              Technology Stack
            </h4>
            <div className="flex flex-wrap gap-2">
              {techBadges.map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Ethical Principles */}
          <div className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 text-xs text-slate-700 dark:text-slate-300 space-y-1">
            <span className="font-bold text-blue-900 dark:text-blue-300">
              Ethical Scraping Standards:
            </span>{' '}
            All automated collection strictly observes rate-limited intervals, server robots.txt policies, zero CAPTCHA circumvention, and complete isolation of personal consumer identification.
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#05070C] flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors cursor-pointer"
          >
            Close Architecture View
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import {
  Layers,
  Database,
  Cpu,
  Globe,
  Shield,
  CheckCircle2,
  Lock,
  Server,
  FileText,
  Scale,
  ArrowDown,
  Info
} from 'lucide-react';

interface AboutPageProps {
  onOpenEthicalModal: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenEthicalModal }) => {
  const pipelineSteps = [
    { title: 'Airline / OTA Sources', desc: 'Direct GDS APIs, public airline endpoints, and aggregated travel feeds.' },
    { title: 'Data Collection', desc: 'Automated, rate-limited polling workers running at scheduled intervals.' },
    { title: 'Validation', desc: 'Schema verification, deduplication, and sanity checking of flight numbers and timeframes.' },
    { title: 'Normalisation', desc: 'Isolating Base Fare from UDF, PSF, Fuel Surcharges, and GST components.' },
    { title: 'Outlier Detection', desc: 'IQR filtering and Z-score anomaly rejection to eliminate erratic scraper artifacts.' },
    { title: 'Fare Database', desc: 'Partitioned PostgreSQL database tracking historical price distributions.' },
    { title: 'Index Engine', desc: 'Laspeyres multi-tier weighted price index calculation updated in real time.' },
    { title: 'AI Prediction', desc: 'Gradient boosted regression (XGBoost) and SHAP feature attribution models.' },
    { title: 'Dashboard', desc: 'Enterprise data visualization suite for consumers, analysts, and policymakers.' }
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto pb-12">
      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/80 dark:border-slate-800/80">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              System Methodology & Architecture
            </h1>
            <span className="px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 text-[11px] font-bold border border-blue-200 dark:border-blue-800/40">
              Whitepaper Standard
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Transparent data collection pipeline, index weighting formulas, and ethical compliance standards.
          </p>
        </div>

        <button
          onClick={onOpenEthicalModal}
          className="self-start md:self-auto px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-xs flex items-center gap-2 transition-all cursor-pointer"
        >
          <Cpu className="w-4 h-4" />
          <span>View Architecture Stack</span>
        </button>
      </div>

      {/* 2. Visual Pipeline Flow Diagram (Section 17) */}
      <div className="p-6 rounded-2xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          End-to-End Data Pipeline Architecture
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          9-stage transformation pipeline from raw public feeds to machine-learning forecasts
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-9 gap-2 pt-2">
          {pipelineSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-2 relative group hover:border-blue-500 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="w-5 h-5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 text-[10px] font-black flex items-center justify-center">
                  {idx + 1}
                </span>
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                  {step.title}
                </div>
                <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                  {step.desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Methodology Cards Grid (Section 17) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Data Collection */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 w-fit">
            <Globe className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            1. Data Collection
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Rate-limited polling across published GDS inventory feeds, adhering strictly to server robot headers with rotating backoff timeouts.
          </p>
        </div>

        {/* Data Cleaning */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2">
          <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 w-fit">
            <Shield className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            2. Data Cleaning
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Elimination of temporary booking fee anomalies, airport construction surcharges, and duplicate carrier codeshare inventory.
          </p>
        </div>

        {/* Laspeyres Basket Weighting */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2">
          <div className="p-2 rounded-lg bg-purple-50 dark:bg-purple-950/50 text-purple-600 dark:text-purple-400 w-fit">
            <Scale className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            3. Laspeyres Weighting
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Fixed-basket price index formulation weighting each route by DGCA annual passenger volume share (e.g. DEL-BOM = 18.5%).
          </p>
        </div>

        {/* Ethical Scraping */}
        <div className="p-4 rounded-xl bg-white dark:bg-[#0A0D14] border border-slate-200/90 dark:border-slate-800/80 shadow-2xs space-y-2">
          <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 w-fit">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
            4. Ethical Compliance
          </h4>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Strict policy against CAPTCHA bypassing, DDoS-inducing burst polling, or personal customer data ingestion.
          </p>
        </div>
      </div>

      {/* Limitations Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
        <div>
          <strong>Model Limitations:</strong> Airfare prediction relies on statistical machine learning. Sudden geopolitical shifts, abrupt extreme weather events, or unannounced airline fleet groundings may cause temporary divergence between predictions and real-time market ticket costs.
        </div>
      </div>
    </div>
  );
};

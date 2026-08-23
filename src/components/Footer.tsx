import React from 'react';
import { Plane, ShieldCheck, FileText, Database, Scale, Lock, ExternalLink } from 'lucide-react';
import { NavPage } from './Navbar';

interface FooterProps {
  onNavigate: (page: NavPage) => void;
  onOpenEthicalModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenEthicalModal }) => {
  return (
    <footer className="bg-[#0A0A0A] text-slate-400 text-xs border-t border-slate-800 pt-12 pb-8 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand & Vision */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-600 font-bold text-white shadow-sm">
                <Plane className="w-4 h-4 -rotate-45" />
              </div>
              <span className="text-base font-semibold text-white">FlyFair India</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              India's AI-Powered Airfare Intelligence Platform & Real-Time Price Index for travellers, analysts, and economic policymakers.
            </p>
            <div className="text-[11px] font-medium text-slate-500">
              Tagline: <span className="text-slate-300">Understand Prices. Predict Fares. Fly Smarter.</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
              Intelligence Modules
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('explore')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Consumer Fare Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('prediction')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  AI Fare Prediction & Surge Engine
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('index')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  India Airfare Price Index (118.6)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('routes')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Route Network & Alternatives
                </button>
              </li>
            </ul>
          </div>

          {/* Policy & Macro */}
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
              Policy & Economics
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => onNavigate('government')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Policy Intelligence Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('government')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  High-Frequency CPI Simulation
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenEthicalModal}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Data Pipeline Architecture
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Methodology & Mathematical Formulas
                </button>
              </li>
            </ul>
          </div>

          {/* Trust & Transparency */}
          <div className="space-y-2.5">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 mb-3">
              Trust & Transparency
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400 space-y-1.5 leading-relaxed">
              <div className="flex items-center gap-1.5 text-slate-200 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
                <span>Prototype / Demonstration Data</span>
              </div>
              <p>
                Calculations and indices are research simulations calibrated on Indian domestic trunk routes. Not an official publication of the NSO, RBI, or DGCA.
              </p>
            </div>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © 2026 FlyFair India. Built for Indian Aviation Transparency.
          </div>
          <div className="flex items-center gap-4">
            <span>Powered by Gemini 3.7 Flash & XGBoost Intelligence</span>
            <span>•</span>
            <button onClick={onOpenEthicalModal} className="hover:text-slate-300 underline cursor-pointer">
              Ethical Scraping Protocol
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

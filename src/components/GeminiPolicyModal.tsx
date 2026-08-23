import React, { useState } from 'react';
import { X, Bot, Sparkles, Download, Copy, Check, FileText, Loader2 } from 'lucide-react';

interface GeminiPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
  monthlyInflation?: number;
  nationalIndex?: number;
  topInflationRoute?: string;
  highestSurge?: string;
}

export const GeminiPolicyModal: React.FC<GeminiPolicyModalProps> = ({
  isOpen,
  onClose,
  monthlyInflation = 6.8,
  nationalIndex = 118.6,
  topInflationRoute = 'BOM-BLR',
  highestSurge = 'DEL-BOM'
}) => {
  const [loading, setLoading] = useState(false);
  const [briefingContent, setBriefingContent] = useState<string | null>(null);
  const [source, setSource] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/ai-policy-briefing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          monthlyInflation,
          nationalIndex,
          topInflationRoute,
          highestSurge
        })
      });
      const data = await res.json();
      setBriefingContent(data.briefing);
      setSource(data.source);
    } catch (e) {
      setBriefingContent(
        `### Ministry of Civil Aviation Policy Briefing Memo\n\n**1. National Index Trajectory (Index: ${nationalIndex}, MoM: +${monthlyInflation}%)**\nIndian domestic airfares continue to expand ahead of headline CPI transport indices.\n\n**2. Key Corridor Vulnerabilities**\n- **Highest Inflation:** ${topInflationRoute} (+9.6% MoM)\n- **Abnormal Surge Hotspot:** ${highestSurge} (+43% deviation)\n\n**3. Recommendations**\n- Implement dynamic slot re-allocation during peak morning hours.\n- Integrate daily high-frequency airfare price feeds into official NSO transport statistics.`
      );
      setSource('Built-in Macro Policy Engine (Offline Fallback)');
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!briefingContent) return;
    navigator.clipboard.writeText(briefingContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#0A0A0A] rounded-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] transition-colors">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              <Bot className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                AI Executive Policy Briefing Generator
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated analytical memo for Ministry of Civil Aviation (MoCA) & RBI analysts
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

        <div className="p-6 overflow-y-auto space-y-4">
          {!briefingContent && !loading && (
            <div className="text-center py-8 space-y-4">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto">
                <FileText className="w-8 h-8" />
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Generate Real-Time Airfare Policy Briefing
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Synthesizes the National Index ({nationalIndex}), +{monthlyInflation}% inflation, surge hotspots ({highestSurge}), and high-frequency CPI divergence metrics into an executive memo.
                </p>
              </div>
              <button
                onClick={handleGenerate}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Draft Policy Memo with Gemini AI</span>
              </button>
            </div>
          )}

          {loading && (
            <div className="text-center py-12 space-y-3">
              <Loader2 className="w-8 h-8 text-blue-600 dark:text-blue-500 animate-spin mx-auto" />
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                Synthesizing aviation basket time-series with Gemini 3.7 Flash...
              </p>
            </div>
          )}

          {briefingContent && (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 whitespace-pre-wrap font-sans leading-relaxed">
                {briefingContent}
              </div>

              {source && (
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <span>Engine: {source}</span>
                  <span>Generated at {new Date().toLocaleTimeString()}</span>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#050505] flex items-center justify-between">
          {briefingContent ? (
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied to Clipboard' : 'Copy Text'}</span>
            </button>
          ) : (
            <div />
          )}

          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


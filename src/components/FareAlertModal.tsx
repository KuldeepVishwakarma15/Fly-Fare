import React, { useState, useEffect } from 'react';
import { X, Bell, Check, ShieldCheck, Mail, ArrowRight, Zap, Sparkles } from 'lucide-react';
import { useNotification } from '../context/NotificationContext';

interface FareAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRoute?: string;
  defaultFare?: number;
}

export const FareAlertModal: React.FC<FareAlertModalProps> = ({
  isOpen,
  onClose,
  defaultRoute = 'DEL-BOM',
  defaultFare = 6240
}) => {
  const { addAlert, triggerMockAlertHit } = useNotification();

  const [route, setRoute] = useState(defaultRoute);
  const [targetPrice, setTargetPrice] = useState(Math.round(defaultFare * 0.9));
  const [alertType, setAlertType] = useState<'DROP' | 'SURGE' | 'DAILY'>('DROP');
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setRoute(defaultRoute);
      setTargetPrice(Math.round(defaultFare * 0.9));
      setSubmitted(false);
    }
  }, [isOpen, defaultRoute, defaultFare]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Register into persistent notification context
    addAlert({
      route: route.trim().toUpperCase(),
      originCity: '',
      destinationCity: '',
      targetFare: Number(targetPrice),
      currentFare: defaultFare,
      alertType,
      email: email || 'analyst@airline-intelligence.in'
    });

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2400);
  };

  const handleTestTrigger = () => {
    triggerMockAlertHit(route.trim().toUpperCase(), alertType === 'SURGE' ? 'SURGE_WARNING' : 'TARGET_HIT');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/80 backdrop-blur-xs">
      <div className="bg-white dark:bg-[#0A0A0A] rounded-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-colors">
        <div className="flex items-center justify-between p-5 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Set Airfare Price Alert
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Automated notification when fare breaches your threshold
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

        {submitted ? (
          <div className="p-8 text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 flex items-center justify-center mx-auto">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white">
              Price Watch Activated!
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You will receive an instant alert when {route} price touches ₹{targetPrice.toLocaleString('en-IN')}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Aviation Route
              </label>
              <input
                type="text"
                value={route}
                onChange={(e) => setRoute(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-900 dark:text-white uppercase focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Target Threshold Fare (₹)
              </label>
              <input
                type="number"
                value={targetPrice}
                onChange={(e) => setTargetPrice(Number(e.target.value))}
                className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-blue-600 dark:text-blue-400 focus:outline-none focus:border-blue-500"
              />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 block">
                Current baseline is ₹{defaultFare.toLocaleString('en-IN')} (Targeting -10% savings)
              </span>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Trigger Trigger Policy
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setAlertType('DROP')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                    alertType === 'DROP'
                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-500/10 dark:text-emerald-400 dark:border-emerald-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Price Drop
                </button>
                <button
                  type="button"
                  onClick={() => setAlertType('SURGE')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                    alertType === 'SURGE'
                      ? 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-500/10 dark:text-rose-400 dark:border-rose-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Surge Warning
                </button>
                <button
                  type="button"
                  onClick={() => setAlertType('DAILY')}
                  className={`py-1.5 px-2 rounded-lg text-xs font-semibold border cursor-pointer transition-all ${
                    alertType === 'DAILY'
                      ? 'bg-blue-50 text-blue-700 border-blue-300 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/30'
                      : 'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Daily Digest
                </button>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                Email for Notification
              </label>
              <input
                type="email"
                placeholder="analyst@airline-intelligence.in"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-3.5 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-900 dark:text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="space-y-2 pt-1">
              <button
                type="submit"
                className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>Enable Real-Time Airfare Watch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                type="button"
                onClick={handleTestTrigger}
                className="w-full py-2 rounded-lg bg-slate-100 dark:bg-slate-900 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <Zap className="w-3.5 h-3.5 text-amber-500" />
                <span>Simulate Immediate Alert Trigger (Toast)</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};


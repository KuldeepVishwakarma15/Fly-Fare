import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Bell,
  ArrowDownRight,
  TrendingDown,
  TrendingUp,
  X,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles
} from 'lucide-react';
import { ToastNotification, useNotification } from '../context/NotificationContext';
import { NavPage } from './Navbar';

interface NotificationToastsProps {
  onNavigate?: (page: NavPage) => void;
  onSelectRoute?: (routeKey: string) => void;
}

export const NotificationToasts: React.FC<NotificationToastsProps> = ({
  onNavigate,
  onSelectRoute
}) => {
  const { activeToasts, dismissToast, markAsRead } = useNotification();

  return (
    <div
      id="live-airfare-toasts-container"
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm sm:max-w-md w-full pointer-events-none px-3 sm:px-0"
    >
      <AnimatePresence>
        {activeToasts.map((toast) => (
          <ToastCard
            key={toast.id}
            toast={toast}
            onDismiss={() => dismissToast(toast.id)}
            onAction={() => {
              markAsRead(toast.id);
              dismissToast(toast.id);
              if (onSelectRoute) {
                onSelectRoute(toast.route);
              }
              if (onNavigate) {
                onNavigate('explore');
              }
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

interface ToastCardProps {
  toast: ToastNotification;
  onDismiss: () => void;
  onAction: () => void;
}

const ToastCard: React.FC<ToastCardProps> = ({ toast, onDismiss, onAction }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 7000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const isSurge = toast.triggerType === 'SURGE_WARNING';
  const isTargetHit = toast.triggerType === 'TARGET_HIT';

  const badgeConfig = isSurge
    ? {
        bg: 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border-rose-200 dark:border-rose-800/60',
        icon: <TrendingUp className="w-3.5 h-3.5 text-rose-500" />,
        label: 'Surge Warning'
      }
    : isTargetHit
    ? {
        bg: 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800/60',
        icon: <Sparkles className="w-3.5 h-3.5 text-emerald-500" />,
        label: 'Target Fare Hit'
      }
    : {
        bg: 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border-blue-200 dark:border-blue-800/60',
        icon: <TrendingDown className="w-3.5 h-3.5 text-blue-500" />,
        label: 'Price Drop'
      };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, y: 20 }}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      className="pointer-events-auto w-full bg-white dark:bg-[#0F1117] rounded-xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden backdrop-blur-md"
    >
      {/* Top Accent Line */}
      <div
        className={`h-1 w-full ${
          isSurge ? 'bg-rose-500' : isTargetHit ? 'bg-emerald-500' : 'bg-blue-600'
        }`}
      />

      <div className="p-4 space-y-3">
        {/* Header Badge & Close Button */}
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider border ${badgeConfig.bg}`}
            >
              {badgeConfig.icon}
              <span>{badgeConfig.label}</span>
            </span>
            <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              Live Ticker
            </span>
          </div>

          <button
            onClick={onDismiss}
            aria-label="Dismiss alert toast"
            className="p-1 rounded-md text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Route Details & Fare Delta */}
        <div>
          <div className="flex items-baseline justify-between gap-2">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>{toast.route}</span>
              <span className="text-xs font-normal text-slate-500 dark:text-slate-400">
                ({toast.originCity} → {toast.destinationCity})
              </span>
            </h4>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-snug">
            {toast.message}
          </p>
        </div>

        {/* Fare Price Comparison Tag */}
        <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-[#07090E] border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Previous Fare
            </span>
            <span className="text-xs font-semibold text-slate-500 line-through">
              ₹{toast.oldFare.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-400 block">
              Live Fare Now
            </span>
            <span
              className={`text-sm font-extrabold ${
                isSurge ? 'text-rose-600 dark:text-rose-400' : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              ₹{toast.newFare.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-2 pt-1 border-t border-slate-100 dark:border-slate-800/70">
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            {new Date(toast.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={onDismiss}
              className="px-2.5 py-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-md hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Dismiss
            </button>
            <button
              onClick={onAction}
              className="inline-flex items-center gap-1 px-3 py-1 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-md transition-colors shadow-xs cursor-pointer"
            >
              <span>Inspect Route</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

import React, { useState, useRef, useEffect } from 'react';
import {
  Bell,
  CheckCheck,
  Zap,
  TrendingDown,
  TrendingUp,
  Sparkles,
  Play,
  Pause,
  Trash2,
  ExternalLink,
  Clock
} from 'lucide-react';
import { useNotification } from '../context/NotificationContext';
import { NavPage } from './Navbar';

interface NotificationDropdownProps {
  onNavigate?: (page: NavPage) => void;
  onSelectRoute?: (routeKey: string) => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  onNavigate,
  onSelectRoute
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    notifications,
    unreadCount,
    isRealtimeSimActive,
    triggerMockAlertHit,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    toggleRealtimeSimulation
  } = useNotification();

  // Close when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer"
        title="Real-Time Airfare Alert Feed"
        aria-label="View notifications"
        aria-expanded={isOpen}
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 min-w-4 px-1 items-center justify-center rounded-full bg-rose-600 text-[10px] font-extrabold text-white shadow-xs animate-pulse">
            {unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-[#0F1117] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl z-50 overflow-hidden text-slate-800 dark:text-slate-200 animate-in fade-in zoom-in-95 duration-150">
          {/* Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 border border-blue-200 dark:border-blue-500/20">
                <Bell className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Real-Time Price Alerts
                </h4>
                <p className="text-[10px] text-slate-500">
                  {notifications.length} logged alert events
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="p-1.5 text-xs text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  title="Mark all as read"
                >
                  <CheckCheck className="w-3.5 h-3.5" />
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={clearNotifications}
                  className="p-1.5 text-xs text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-md transition-colors cursor-pointer"
                  title="Clear history"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Quick Simulation & Polling Banner */}
          <div className="px-4 py-2.5 bg-slate-50 dark:bg-[#07090E] border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={toggleRealtimeSimulation}
                className={`inline-flex items-center gap-1 px-2 py-1 rounded text-[11px] font-semibold border cursor-pointer transition-colors ${
                  isRealtimeSimActive
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800/60'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border-slate-300 dark:border-slate-700'
                }`}
                title="Toggle background price tracking ticker"
              >
                {isRealtimeSimActive ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Auto-Ticker ON</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Ticker Paused</span>
                  </>
                )}
              </button>
            </div>

            <button
              onClick={() => triggerMockAlertHit()}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold shadow-xs cursor-pointer transition-all"
            >
              <Zap className="w-3 h-3" />
              <span>Simulate Hit</span>
            </button>
          </div>

          {/* Notification List */}
          <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="py-8 text-center px-4 space-y-2">
                <Bell className="w-6 h-6 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs font-semibold text-slate-500">No alert triggers yet</p>
                <p className="text-[11px] text-slate-400">
                  Click "Simulate Hit" above to test the real-time toast alert.
                </p>
              </div>
            ) : (
              notifications.map((item) => {
                const isSurge = item.triggerType === 'SURGE_WARNING';
                const isTarget = item.triggerType === 'TARGET_HIT';

                return (
                  <div
                    key={item.id}
                    onClick={() => {
                      markAsRead(item.id);
                      if (onSelectRoute) onSelectRoute(item.route);
                      if (onNavigate) {
                        onNavigate('explore');
                        setIsOpen(false);
                      }
                    }}
                    className={`p-3.5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer flex items-start gap-3 ${
                      !item.read ? 'bg-blue-50/40 dark:bg-blue-950/20' : ''
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-lg flex-shrink-0 mt-0.5 ${
                        isSurge
                          ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                          : isTarget
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                          : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400'
                      }`}
                    >
                      {isSurge ? (
                        <TrendingUp className="w-4 h-4" />
                      ) : isTarget ? (
                        <Sparkles className="w-4 h-4" />
                      ) : (
                        <TrendingDown className="w-4 h-4" />
                      )}
                    </div>

                    <div className="flex-1 min-w-0 space-y-1">
                      <div className="flex items-center justify-between gap-1">
                        <span className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.route} ({item.originCity} → {item.destinationCity})
                        </span>
                        {!item.read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 flex-shrink-0" />
                        )}
                      </div>

                      <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug line-clamp-2">
                        {item.message}
                      </p>

                      <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          ₹{item.oldFare.toLocaleString('en-IN')} → ₹{item.newFare.toLocaleString('en-IN')}
                        </span>
                        <span>
                          {new Date(item.timestamp).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer link to alerts page */}
          <div className="p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#07090E] text-center">
            <button
              onClick={() => {
                if (onNavigate) onNavigate('alerts');
                setIsOpen(false);
              }}
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center justify-center gap-1 mx-auto cursor-pointer"
            >
              <span>Manage Price Watchdog & Trackers</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

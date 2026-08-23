import React, { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Sun,
  Moon,
  Cpu,
  Radio,
  BarChart3,
  TrendingUp,
  Sliders,
  User,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { NATIONAL_INDEX } from '../data/mockAirfareData';
import { FlyFairLogo } from './AirlineLogos';
import { useTheme } from '../context/ThemeContext';
import { NotificationDropdown } from './NotificationDropdown';
import { useNotification } from '../context/NotificationContext';

export type NavPage =
  | 'home'
  | 'explore'
  | 'prediction'
  | 'index'
  | 'routes'
  | 'alerts'
  | 'government'
  | 'about';

interface NavbarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenEthicalModal: () => void;
  onOpenAlertModal: () => void;
  onSelectRoute?: (routeKey: string) => void;
  onToggleSidebar?: () => void;
  isSidebarOpenMobile?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPage,
  onNavigate,
  onOpenEthicalModal,
  onOpenAlertModal,
  onSelectRoute,
  onToggleSidebar,
  isSidebarOpenMobile
}) => {
  const { theme, toggleTheme } = useTheme();
  const { addToast } = useNotification();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleRefreshData = () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      addToast({
        title: 'Data Feeds Synced',
        message: 'High-frequency GDS airfares and DGCA basket metrics updated.',
        type: 'success',
        durationMs: 3500
      });
    }, 900);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 border-b ${
        isScrolled
          ? 'h-13 bg-white/95 dark:bg-[#07090E]/95 backdrop-blur-xl border-slate-200 dark:border-slate-800 shadow-md'
          : 'h-14 bg-white/90 dark:bg-[#07090E]/90 backdrop-blur-md border-slate-200/80 dark:border-slate-800/80'
      } text-slate-800 dark:text-slate-200`}
    >
      <div className="w-full px-3 sm:px-5 h-full flex items-center justify-between gap-3">
        {/* Left: Mobile Toggle & Logo + Subtitle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Mobile Sidebar Hamburger Toggle */}
          <button
            onClick={onToggleSidebar}
            aria-label="Toggle navigation menu"
            className="lg:hidden p-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors cursor-pointer active:scale-95"
          >
            {isSidebarOpenMobile ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>

          {/* Logo & Product Identity */}
          <div
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 cursor-pointer select-none group flex-shrink-0"
          >
            <FlyFairLogo className="w-7 h-7 group-hover:scale-105 group-active:scale-95 transition-transform" />
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-sm sm:text-base font-extrabold tracking-tight text-slate-900 dark:text-white">
                  FlyFair
                </span>
                <span className="text-sm sm:text-base font-black text-blue-600 dark:text-blue-400">
                  India
                </span>
                <span className="px-1.5 py-0.2 text-[8px] sm:text-[9px] font-extrabold tracking-widest uppercase rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/60">
                  ENTERPRISE
                </span>
              </div>
              <span className="text-[9px] font-bold uppercase tracking-[0.16em] text-slate-400 dark:text-slate-500 block -mt-0.5 hidden xs:block">
                AIRFARE INTELLIGENCE & PRICE INDEX
              </span>
            </div>
          </div>
        </div>

        {/* Center / Right Metrics & Action Tickers */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Refresh Data Button */}
          <button
            onClick={handleRefreshData}
            disabled={isRefreshing}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold transition-all cursor-pointer active:scale-95"
            title="Sync Latest Airfare Feeds"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Feeds'}</span>
          </button>

          {/* System Status Indicator */}
          <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-800/50 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Data Pipeline Live</span>
          </div>

          {/* National Index Pill */}
          <div
            onClick={() => onNavigate('index')}
            className="hidden sm:flex items-center gap-2 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] font-semibold cursor-pointer hover:border-slate-300 dark:hover:border-slate-700 transition-colors active:scale-95"
            title="View National Airfare Index"
          >
            <span className="text-slate-500 dark:text-slate-400">National Index</span>
            <span className="font-extrabold text-slate-900 dark:text-white">
              {NATIONAL_INDEX.currentIndex}
            </span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">
              +{NATIONAL_INDEX.monthlyInflationPct}%
            </span>
          </div>

          {/* Architecture Modal Trigger */}
          <button
            onClick={onOpenEthicalModal}
            className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 text-xs font-semibold transition-colors cursor-pointer active:scale-95"
            title="View System Architecture & Ethical Pipeline"
          >
            <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>Architecture</span>
          </button>

          {/* Real-time Notifications Bell Dropdown */}
          <NotificationDropdown onNavigate={onNavigate} onSelectRoute={onSelectRoute} />

          {/* Day / Night Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 transition-all cursor-pointer active:scale-90"
            title={theme === 'dark' ? 'Switch to Day Mode (Light)' : 'Switch to Night Mode (Dark)'}
            aria-label="Toggle Day / Night Mode"
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-blue-600" />
            )}
          </button>

          {/* Profile / Demo Indicator */}
          <div className="hidden lg:flex items-center gap-1.5 pl-1.5 border-l border-slate-200 dark:border-slate-800">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center text-xs font-bold shadow-xs">
              IN
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

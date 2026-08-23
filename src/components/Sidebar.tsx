import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  BarChart3,
  Network,
  AlertTriangle,
  Landmark,
  FileText,
  Shield,
  Bell,
  Cpu,
  ExternalLink,
  ChevronRight,
  Radio
} from 'lucide-react';
import { NavPage } from './Navbar';

interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenEthicalModal: () => void;
  onOpenAlertModal: () => void;
  isOpenMobile?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onOpenEthicalModal,
  onOpenAlertModal,
  isOpenMobile = false,
  onCloseMobile
}) => {
  const navItems: Array<{
    id: NavPage;
    label: string;
    icon: React.ReactNode;
    badge?: string;
    badgeTone?: 'blue' | 'rose' | 'amber' | 'emerald';
  }> = [
    {
      id: 'home',
      label: 'Overview',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'explore',
      label: 'Fare Explorer',
      icon: <Compass className="w-4 h-4" />
    },
    {
      id: 'prediction',
      label: 'AI Prediction',
      icon: <Sparkles className="w-4 h-4" />,
      badge: 'ML'
    },
    {
      id: 'index',
      label: 'Airfare Index',
      icon: <BarChart3 className="w-4 h-4" />
    },
    {
      id: 'routes',
      label: 'Route Network',
      icon: <Network className="w-4 h-4" />
    },
    {
      id: 'alerts',
      label: 'Surge Alerts',
      icon: <AlertTriangle className="w-4 h-4" />,
      badge: '8',
      badgeTone: 'rose'
    },
    {
      id: 'government',
      label: 'Policy Intelligence',
      icon: <Landmark className="w-4 h-4" />
    },
    {
      id: 'about',
      label: 'Methodology',
      icon: <FileText className="w-4 h-4" />
    }
  ];

  const handleItemClick = (page: NavPage) => {
    onNavigate(page);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-14 bottom-0 left-0 z-40 w-60 sm:w-64 bg-white dark:bg-[#07090E] border-r border-slate-200/90 dark:border-slate-800/80 flex flex-col justify-between transition-transform duration-200 ease-out lg:translate-x-0 ${
          isOpenMobile ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        {/* Navigation Area */}
        <div className="flex-1 px-3 py-4 overflow-y-auto space-y-6">
          {/* Main Intelligence Nav */}
          <div>
            <div className="px-3 pb-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Intelligence Platform
            </div>
            <nav className="space-y-1">
              {navItems.map((item) => {
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleItemClick(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer group ${
                      isActive
                        ? 'bg-blue-600 text-white shadow-xs font-bold'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-950 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <span
                        className={`${
                          isActive
                            ? 'text-white'
                            : 'text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200'
                        }`}
                      >
                        {item.icon}
                      </span>
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold uppercase tracking-wider ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : item.badgeTone === 'rose'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                            : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Quick Action Shortcuts */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800/60 space-y-2">
            <div className="px-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 dark:text-slate-500">
              Quick Actions
            </div>

            <button
              onClick={onOpenAlertModal}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer border border-dashed border-slate-200 dark:border-slate-800"
            >
              <div className="flex items-center gap-2">
                <Bell className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>Set Price Alert</span>
              </div>
              <ChevronRight className="w-3 h-3 text-slate-400" />
            </button>

            <button
              onClick={onOpenEthicalModal}
              className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                <span>Architecture Stack</span>
              </div>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Bottom Status Block */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800/80 bg-slate-50/60 dark:bg-[#05060A]">
          <div className="p-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-2xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Pipeline Sync
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live (2m ago)
              </span>
            </div>
            <p className="text-[11px] font-medium text-slate-700 dark:text-slate-300">
              48 Corridors • 10-City Basket
            </p>
            <div className="text-[10px] text-slate-400 dark:text-slate-500">
              DGCA & GDS High-Freq Feeds
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

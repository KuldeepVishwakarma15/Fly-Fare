import React from 'react';
import {
  LayoutDashboard,
  Compass,
  Sparkles,
  BarChart3,
  AlertTriangle,
  Menu
} from 'lucide-react';
import { NavPage } from './Navbar';
import { motion } from 'motion/react';

interface MobileBottomNavProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onOpenMobileMenu: () => void;
  alertCount?: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentPage,
  onNavigate,
  onOpenMobileMenu,
  alertCount = 8
}) => {
  const tabs: Array<{
    id: NavPage | 'menu';
    label: string;
    icon: React.ReactNode;
    badge?: number;
  }> = [
    {
      id: 'home',
      label: 'Home',
      icon: <LayoutDashboard className="w-4 h-4" />
    },
    {
      id: 'explore',
      label: 'Explore',
      icon: <Compass className="w-4 h-4" />
    },
    {
      id: 'prediction',
      label: 'AI Predict',
      icon: <Sparkles className="w-4 h-4" />
    },
    {
      id: 'index',
      label: 'Index',
      icon: <BarChart3 className="w-4 h-4" />
    },
    {
      id: 'alerts',
      label: 'Alerts',
      icon: <AlertTriangle className="w-4 h-4" />,
      badge: alertCount
    }
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#07090E]/95 backdrop-blur-lg border-t border-slate-200/90 dark:border-slate-800/80 px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))] shadow-lg"
    >
      <div className="flex items-center justify-around gap-1 max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentPage === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                if (tab.id === 'menu') {
                  onOpenMobileMenu();
                } else {
                  onNavigate(tab.id as NavPage);
                }
              }}
              className={`relative flex-1 min-h-[44px] flex flex-col items-center justify-center gap-0.5 rounded-xl transition-all cursor-pointer select-none active:scale-95 ${
                isActive
                  ? 'text-blue-600 dark:text-blue-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="mobileNavActivePill"
                  className="absolute inset-0 bg-blue-50 dark:bg-blue-950/60 rounded-xl border border-blue-200/60 dark:border-blue-800/40 -z-10"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}

              <div className="relative">
                {tab.icon}
                {Boolean(tab.badge) && (
                  <span className="absolute -top-1 -right-2.5 w-3.5 h-3.5 rounded-full bg-rose-500 text-white text-[9px] font-black flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] tracking-tight">{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

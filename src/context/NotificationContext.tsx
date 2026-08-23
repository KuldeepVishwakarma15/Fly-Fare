import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import { BASKET_ROUTES, SURGE_ALERTS } from '../data/mockAirfareData';

export type AlertTriggerType = 'TARGET_HIT' | 'PRICE_DROP' | 'SURGE_WARNING' | 'SCHEDULED_DIGEST';

export interface PriceAlertWatch {
  id: string;
  route: string; // e.g. "DEL-BOM"
  originCity: string;
  destinationCity: string;
  targetFare: number;
  currentFare: number;
  previousFare: number;
  alertType: 'DROP' | 'SURGE' | 'DAILY';
  email: string;
  status: 'TRACKING' | 'TRIGGERED';
  createdAt: string;
  lastTriggeredAt?: string;
  triggerDetails?: {
    diffFare: number;
    diffPct: number;
    reason: string;
  };
}

export interface ToastNotification {
  id: string;
  watchId?: string;
  route: string;
  originCity: string;
  destinationCity: string;
  triggerType: AlertTriggerType;
  title: string;
  message: string;
  oldFare: number;
  newFare: number;
  savingsOrSurgeAmount: number;
  savingsOrSurgePct: number;
  timestamp: string;
  read: boolean;
}

export interface CustomToastOptions {
  title: string;
  message: string;
  type?: 'success' | 'warning' | 'info' | 'error';
  route?: string;
  durationMs?: number;
}

interface NotificationContextType {
  alerts: PriceAlertWatch[];
  notifications: ToastNotification[];
  activeToasts: ToastNotification[];
  unreadCount: number;
  isRealtimeSimActive: boolean;
  addAlert: (alert: Omit<PriceAlertWatch, 'id' | 'createdAt' | 'status' | 'previousFare'>) => PriceAlertWatch;
  removeAlert: (id: string) => void;
  triggerMockAlertHit: (routeKey?: string, forceType?: AlertTriggerType) => ToastNotification;
  addToast: (options: CustomToastOptions) => void;
  dismissToast: (id: string) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
  toggleRealtimeSimulation: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const INITIAL_WATCHES: PriceAlertWatch[] = [
  {
    id: 'watch-1',
    route: 'DEL-BOM',
    originCity: 'Delhi',
    destinationCity: 'Mumbai',
    targetFare: 5750,
    currentFare: 6240,
    previousFare: 6450,
    alertType: 'DROP',
    email: 'analyst@airline-intelligence.in',
    status: 'TRACKING',
    createdAt: '2026-08-20T10:00:00Z'
  },
  {
    id: 'watch-2',
    route: 'BLR-DEL',
    originCity: 'Bengaluru',
    destinationCity: 'Delhi',
    targetFare: 6000,
    currentFare: 6780,
    previousFare: 6780,
    alertType: 'DROP',
    email: 'analyst@airline-intelligence.in',
    status: 'TRACKING',
    createdAt: '2026-08-21T14:30:00Z'
  },
  {
    id: 'watch-3',
    route: 'BOM-GOI',
    originCity: 'Mumbai',
    destinationCity: 'Goa',
    targetFare: 3400,
    currentFare: 3950,
    previousFare: 3950,
    alertType: 'SURGE',
    email: 'traveler@flyfair.in',
    status: 'TRACKING',
    createdAt: '2026-08-22T08:15:00Z'
  },
  {
    id: 'watch-4',
    route: 'BLR-HYD',
    originCity: 'Bengaluru',
    destinationCity: 'Hyderabad',
    targetFare: 3100,
    currentFare: 2950,
    previousFare: 3250,
    alertType: 'DROP',
    email: 'user@corporate.in',
    status: 'TRIGGERED',
    createdAt: '2026-08-22T12:00:00Z',
    lastTriggeredAt: '2026-08-23T09:30:00Z',
    triggerDetails: {
      diffFare: 300,
      diffPct: 9.2,
      reason: 'Mid-week inventory release dropped fare below threshold.'
    }
  }
];

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [alerts, setAlerts] = useState<PriceAlertWatch[]>(INITIAL_WATCHES);
  const [notifications, setNotifications] = useState<ToastNotification[]>([
    {
      id: 'notif-init-1',
      watchId: 'watch-4',
      route: 'BLR-HYD',
      originCity: 'Bengaluru',
      destinationCity: 'Hyderabad',
      triggerType: 'TARGET_HIT',
      title: 'Target Fare Hit: BLR → HYD',
      message: 'Airfare dropped to ₹2,950, breaching your target of ₹3,100 (Savings ₹300 / 9.2%).',
      oldFare: 3250,
      newFare: 2950,
      savingsOrSurgeAmount: 300,
      savingsOrSurgePct: 9.2,
      timestamp: '2026-08-23T09:30:00Z',
      read: false
    }
  ]);
  const [activeToasts, setActiveToasts] = useState<ToastNotification[]>([]);
  const [isRealtimeSimActive, setIsRealtimeSimActive] = useState<boolean>(true);

  // Helper to extract city names
  const getCitiesForRoute = (routeKey: string) => {
    const routeObj = BASKET_ROUTES.find((r) => r.routeKey === routeKey);
    if (routeObj) {
      return { originCity: routeObj.originCity, destinationCity: routeObj.destinationCity };
    }
    const parts = routeKey.split('-');
    return { originCity: parts[0] || 'Origin', destinationCity: parts[1] || 'Destination' };
  };

  // Add new alert
  const addAlert = useCallback(
    (alertData: Omit<PriceAlertWatch, 'id' | 'createdAt' | 'status' | 'previousFare'>) => {
      const { originCity, destinationCity } = getCitiesForRoute(alertData.route);
      const newWatch: PriceAlertWatch = {
        ...alertData,
        id: `watch-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
        originCity: alertData.originCity || originCity,
        destinationCity: alertData.destinationCity || destinationCity,
        previousFare: alertData.currentFare,
        status: alertData.currentFare <= alertData.targetFare ? 'TRIGGERED' : 'TRACKING',
        createdAt: new Date().toISOString()
      };

      setAlerts((prev) => [newWatch, ...prev]);

      // If user sets a target that is already below or met, trigger immediate notification toast
      if (newWatch.status === 'TRIGGERED') {
        const notif: ToastNotification = {
          id: `toast-${Date.now()}`,
          watchId: newWatch.id,
          route: newWatch.route,
          originCity: newWatch.originCity,
          destinationCity: newWatch.destinationCity,
          triggerType: 'TARGET_HIT',
          title: `Price Target Reached: ${newWatch.route}`,
          message: `Current market price ₹${newWatch.currentFare.toLocaleString('en-IN')} meets your target of ₹${newWatch.targetFare.toLocaleString('en-IN')}!`,
          oldFare: newWatch.currentFare + 350,
          newFare: newWatch.currentFare,
          savingsOrSurgeAmount: 350,
          savingsOrSurgePct: 5.6,
          timestamp: new Date().toISOString(),
          read: false
        };

        setNotifications((prev) => [notif, ...prev]);
        setActiveToasts((prev) => [notif, ...prev]);
      }

      return newWatch;
    },
    []
  );

  const removeAlert = useCallback((id: string) => {
    setAlerts((prev) => prev.filter((a) => a.id !== id));
  }, []);

  const dismissToast = useCallback((id: string) => {
    setActiveToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const addToast = useCallback((options: CustomToastOptions) => {
    const route = options.route || 'DEL-BOM';
    const { originCity, destinationCity } = getCitiesForRoute(route);
    const triggerType: AlertTriggerType =
      options.type === 'error' || options.type === 'warning'
        ? 'SURGE_WARNING'
        : 'PRICE_DROP';

    const notif: ToastNotification = {
      id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      route,
      originCity,
      destinationCity,
      triggerType,
      title: options.title,
      message: options.message,
      oldFare: 6240,
      newFare: 6240,
      savingsOrSurgeAmount: 0,
      savingsOrSurgePct: 0,
      timestamp: new Date().toISOString(),
      read: false
    };

    setNotifications((prev) => [notif, ...prev.slice(0, 19)]);
    setActiveToasts((prev) => [notif, ...prev.slice(0, 2)]);
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    setActiveToasts([]);
  }, []);

  const toggleRealtimeSimulation = useCallback(() => {
    setIsRealtimeSimActive((prev) => !prev);
  }, []);

  // Trigger simulated alert hit
  const triggerMockAlertHit = useCallback(
    (targetRouteKey?: string, forceType?: AlertTriggerType): ToastNotification => {
      // Pick route
      const candidateRoute = targetRouteKey
        ? BASKET_ROUTES.find((r) => r.routeKey === targetRouteKey) || BASKET_ROUTES[0]
        : BASKET_ROUTES[Math.floor(Math.random() * BASKET_ROUTES.length)];

      const rKey = candidateRoute.routeKey;
      const { originCity, destinationCity } = getCitiesForRoute(rKey);

      // Determine trigger type
      const type: AlertTriggerType =
        forceType ||
        (Math.random() > 0.35 ? 'TARGET_HIT' : Math.random() > 0.5 ? 'PRICE_DROP' : 'SURGE_WARNING');

      let oldFare = candidateRoute.currentFare;
      let newFare = candidateRoute.currentFare;
      let title = '';
      let message = '';
      let amount = 0;
      let pct = 0;

      if (type === 'TARGET_HIT' || type === 'PRICE_DROP') {
        const dropPercent = Number((Math.random() * 8 + 7).toFixed(1)); // 7% to 15%
        amount = Math.round((oldFare * dropPercent) / 100);
        newFare = oldFare - amount;
        pct = dropPercent;

        if (type === 'TARGET_HIT') {
          title = `🎯 Target Price Hit: ${rKey}`;
          message = `Special fare release! Price dropped by ₹${amount.toLocaleString('en-IN')} (-${pct}%) to ₹${newFare.toLocaleString('en-IN')}.`;
        } else {
          title = `📉 Rapid Fare Drop Detected: ${rKey}`;
          message = `Off-peak capacity added. Ticket price dropped to ₹${newFare.toLocaleString('en-IN')} (Saved ₹${amount.toLocaleString('en-IN')}).`;
        }
      } else {
        const surgePercent = Number((Math.random() * 14 + 18).toFixed(1)); // 18% to 32%
        amount = Math.round((oldFare * surgePercent) / 100);
        newFare = oldFare + amount;
        pct = surgePercent;
        title = `⚠️ Dynamic Surge Warning: ${rKey}`;
        message = `Seat inventory down to 12%. Fares spiked to ₹${newFare.toLocaleString('en-IN')} (+${pct}% / +₹${amount.toLocaleString('en-IN')}).`;
      }

      const notif: ToastNotification = {
        id: `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        route: rKey,
        originCity,
        destinationCity,
        triggerType: type,
        title,
        message,
        oldFare,
        newFare,
        savingsOrSurgeAmount: amount,
        savingsOrSurgePct: pct,
        timestamp: new Date().toISOString(),
        read: false
      };

      // Update watched alerts if any match
      setAlerts((prev) =>
        prev.map((item) => {
          if (item.route === rKey) {
            return {
              ...item,
              currentFare: newFare,
              previousFare: oldFare,
              status: newFare <= item.targetFare ? 'TRIGGERED' : item.status,
              lastTriggeredAt: new Date().toISOString(),
              triggerDetails: {
                diffFare: Math.abs(amount),
                diffPct: pct,
                reason: type === 'SURGE_WARNING' ? 'Sudden demand spike' : 'Discount fare window opened'
              }
            };
          }
          return item;
        })
      );

      setNotifications((prev) => [notif, ...prev.slice(0, 19)]);
      setActiveToasts((prev) => [notif, ...prev.slice(0, 2)]);

      return notif;
    },
    []
  );

  // Background ticker simulation every 25 seconds if active
  useEffect(() => {
    if (!isRealtimeSimActive) return;

    const interval = setInterval(() => {
      // Pick a random route from watched or high-frequency list
      const watched = alerts[Math.floor(Math.random() * alerts.length)];
      const targetRoute = watched ? watched.route : undefined;
      triggerMockAlertHit(targetRoute);
    }, 28000);

    return () => clearInterval(interval);
  }, [isRealtimeSimActive, alerts, triggerMockAlertHit]);

  const unreadCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  const value = {
    alerts,
    notifications,
    activeToasts,
    unreadCount,
    isRealtimeSimActive,
    addAlert,
    removeAlert,
    triggerMockAlertHit,
    addToast,
    dismissToast,
    markAsRead,
    markAllAsRead,
    clearNotifications,
    toggleRealtimeSimulation
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};

export const useNotification = (): NotificationContextType => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

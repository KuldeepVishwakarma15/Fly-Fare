import React, { useState, useEffect } from 'react';
import { Navbar, NavPage } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { EthicalPipelineModal } from './components/EthicalPipelineModal';
import { FareAlertModal } from './components/FareAlertModal';
import { GeminiAnalysisModal } from './components/GeminiAnalysisModal';
import { AnimatedPage } from './components/AnimatedPage';
import { ThemeProvider } from './context/ThemeContext';
import { NotificationProvider } from './context/NotificationContext';
import { NotificationToasts } from './components/NotificationToasts';
import { CustomCursor } from './components/CustomCursor';
import { ScrollProgress } from './components/ScrollProgress';
import { MobileBottomNav } from './components/MobileBottomNav';

import { LandingPage } from './pages/LandingPage';
import { ExplorePage } from './pages/ExplorePage';
import { PredictionPage } from './pages/PredictionPage';
import { IndexPage } from './pages/IndexPage';
import { RoutesPage } from './pages/RoutesPage';
import { AlertsPage } from './pages/AlertsPage';
import { GovernmentPage } from './pages/GovernmentPage';
import { AboutPage } from './pages/AboutPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('home');
  const [selectedRouteKey, setSelectedRouteKey] = useState('DEL-BOM');
  const [isSidebarOpenMobile, setIsSidebarOpenMobile] = useState(false);

  // Modals state
  const [isEthicalModalOpen, setIsEthicalModalOpen] = useState(false);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [isGeminiAnalysisOpen, setIsGeminiAnalysisOpen] = useState(false);

  // Sync hash routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '') as NavPage;
      const validPages: NavPage[] = [
        'home',
        'explore',
        'prediction',
        'index',
        'routes',
        'alerts',
        'government',
        'about'
      ];
      if (validPages.includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNavigate = (page: NavPage) => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : page;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsSidebarOpenMobile(false);
  };

  const handleSelectRoute = (routeKey: string) => {
    setSelectedRouteKey(routeKey);
  };

  return (
    <ThemeProvider>
      <NotificationProvider>
        <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#07090E] text-slate-800 dark:text-slate-300 flex flex-col font-sans selection:bg-blue-600 selection:text-white transition-colors duration-200 pb-16 lg:pb-0">
          {/* Subtle Viewport Scroll Depth Indicator */}
          <ScrollProgress />

          {/* Desktop Fluid Interactive Cursor */}
          <CustomCursor />

          {/* Top Enterprise Header */}
          <Navbar
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenEthicalModal={() => setIsEthicalModalOpen(true)}
            onOpenAlertModal={() => setIsAlertModalOpen(true)}
            onSelectRoute={(routeKey) => {
              handleSelectRoute(routeKey);
              handleNavigate('explore');
            }}
            onToggleSidebar={() => setIsSidebarOpenMobile((prev) => !prev)}
            isSidebarOpenMobile={isSidebarOpenMobile}
          />

          {/* Body with Fixed Desktop Sidebar + Scrollable Content */}
          <div className="flex-1 flex w-full relative">
            {/* 240-260px Left Sidebar */}
            <Sidebar
              currentPage={currentPage}
              onNavigate={handleNavigate}
              onOpenEthicalModal={() => setIsEthicalModalOpen(true)}
              onOpenAlertModal={() => setIsAlertModalOpen(true)}
              isOpenMobile={isSidebarOpenMobile}
              onCloseMobile={() => setIsSidebarOpenMobile(false)}
            />

            {/* Main Content Area (Offset by sidebar on lg screens) */}
            <div className="flex-1 min-w-0 lg:pl-64 flex flex-col">
              <main className="flex-1 p-4 sm:p-6 lg:p-7">
                <AnimatedPage key={currentPage}>
                  {currentPage === 'home' && (
                    <LandingPage
                      onNavigate={handleNavigate}
                      onSelectRouteForAnalysis={(routeKey) => {
                        handleSelectRoute(routeKey);
                        handleNavigate('explore');
                      }}
                      onOpenGeminiAnalysis={() => setIsGeminiAnalysisOpen(true)}
                    />
                  )}

                  {currentPage === 'explore' && (
                    <ExplorePage
                      initialRouteKey={selectedRouteKey}
                      onOpenAlertModal={() => setIsAlertModalOpen(true)}
                      onOpenGeminiAnalysis={() => setIsGeminiAnalysisOpen(true)}
                    />
                  )}

                  {currentPage === 'prediction' && (
                    <PredictionPage
                      onOpenGeminiAnalysis={() => setIsGeminiAnalysisOpen(true)}
                      onOpenAlertModal={() => setIsAlertModalOpen(true)}
                    />
                  )}

                  {currentPage === 'index' && <IndexPage />}

                  {currentPage === 'routes' && (
                    <RoutesPage
                      onSelectRouteForAnalysis={(routeKey) => {
                        handleSelectRoute(routeKey);
                        handleNavigate('explore');
                      }}
                    />
                  )}

                  {currentPage === 'alerts' && (
                    <AlertsPage
                      onOpenAlertModal={() => setIsAlertModalOpen(true)}
                      onSelectRouteForAnalysis={(routeKey) => {
                        handleSelectRoute(routeKey);
                        handleNavigate('explore');
                      }}
                    />
                  )}

                  {currentPage === 'government' && <GovernmentPage />}

                  {currentPage === 'about' && (
                    <AboutPage onOpenEthicalModal={() => setIsEthicalModalOpen(true)} />
                  )}
                </AnimatedPage>
              </main>

              {/* Footer */}
              <Footer
                onNavigate={handleNavigate}
                onOpenEthicalModal={() => setIsEthicalModalOpen(true)}
              />
            </div>
          </div>

          {/* Mobile Bottom Quick Navigation Bar */}
          <MobileBottomNav
            currentPage={currentPage}
            onNavigate={handleNavigate}
            onOpenMobileMenu={() => setIsSidebarOpenMobile(true)}
            alertCount={8}
          />

          {/* Real-time Toast Notifications Container */}
          <NotificationToasts
            onNavigate={handleNavigate}
            onSelectRoute={handleSelectRoute}
          />

          {/* Modals */}
          <EthicalPipelineModal
            isOpen={isEthicalModalOpen}
            onClose={() => setIsEthicalModalOpen(false)}
          />

          <FareAlertModal
            isOpen={isAlertModalOpen}
            onClose={() => setIsAlertModalOpen(false)}
            defaultRoute={selectedRouteKey}
            defaultFare={6240}
          />

          <GeminiAnalysisModal
            isOpen={isGeminiAnalysisOpen}
            onClose={() => setIsGeminiAnalysisOpen(false)}
            routeKey={selectedRouteKey}
            currentFare={6240}
          />
        </div>
      </NotificationProvider>
    </ThemeProvider>
  );
}

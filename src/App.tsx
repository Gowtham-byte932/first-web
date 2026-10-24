import React from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { HeroBanner } from './components/HeroBanner';
import { CategoryFilter } from './components/CategoryFilter';
import { RestaurantGrid } from './components/RestaurantGrid';
import { RestaurantModal } from './components/RestaurantModal';
import { CartDrawer } from './components/CartDrawer';
import { WalletModal } from './components/WalletModal';
import { CouponModal } from './components/CouponModal';
import { CompetitorComparisonModal } from './components/CompetitorComparisonModal';
import { OrderTrackingModal } from './components/OrderTrackingModal';
import { Toast } from './components/Toast';
import { Footer } from './components/Footer';

import { ShareModal } from './components/ShareModal';
import { OrderHistoryModal } from './components/OrderHistoryModal';
import { useApp } from './context/AppContext';

function AppContent() {
  const { isShareModalOpen, setIsShareModalOpen } = useApp();

  return (
    <div className="min-h-screen flex flex-col bg-stone-50/60 selection:bg-amber-200 selection:text-stone-900">
      <Header />
      
      <main className="flex-1">
        <HeroBanner />
        <CategoryFilter />
        <RestaurantGrid />
      </main>

      <Footer />

      {/* Modals & Slide-overs */}
      <RestaurantModal />
      <CartDrawer />
      <WalletModal />
      <CouponModal />
      <CompetitorComparisonModal />
      <OrderTrackingModal />
      <OrderHistoryModal />
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Global Toast */}
      <Toast />
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

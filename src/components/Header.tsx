import React from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, Wallet, Sparkles, Smartphone, ShieldCheck, Share2, Receipt } from 'lucide-react';
import { ShareModal } from './ShareModal';

export const Header: React.FC = () => {
  const {
    walletBalance,
    cart,
    setIsCartOpen,
    setIsWalletModalOpen,
    setIsComparisonModalOpen,
    setIsCouponModalOpen,
    setIsShareModalOpen,
    setIsOrderHistoryOpen,
    activeOrder,
    setActiveOrder,
    showToast,
  } = useApp();

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      {/* Slim Top Highlight Notification Bar */}
      <div className="bg-amber-600 text-white text-xs py-1 px-3 text-center font-medium tracking-wide flex items-center justify-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 shrink-0 text-amber-200" />
        <span className="truncate">
          ₹20 Voucher on EVERY order <span className="hidden sm:inline">· Zero Platform Fees</span>
        </span>
        <button
          onClick={() => setIsComparisonModalOpen(true)}
          className="underline font-semibold hover:text-amber-100 shrink-0 cursor-pointer text-[11px] sm:text-xs ml-1"
        >
          Compare
        </button>
      </div>

      {/* Main Navigation Header: Strict 3-zone Top Bar Contract */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-2 shrink-0">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="text-2xl font-extrabold tracking-tight text-stone-900 flex items-center gap-1.5"
          >
            <span className="text-amber-600 font-black">Crave</span>
            <span>Loop</span>
          </a>
          <span className="hidden sm:inline-block text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200/80 rounded px-1.5 py-0.5 ml-1">
            +₹20 / Order
          </span>
        </div>

        {/* Zone 2: Navigation Links (single line, clean typography) */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600">
          <a
            href="#restaurants"
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0"
          >
            Restaurants
          </a>
          <button
            onClick={() => setIsWalletModalOpen(true, 'recharge')}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 text-stone-700 font-semibold cursor-pointer"
          >
            <Smartphone className="w-4 h-4 text-amber-600" />
            <span>Mobile Recharge</span>
          </button>
          <button
            onClick={() => setIsOrderHistoryOpen(true)}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-stone-700 font-semibold"
          >
            <Receipt className="w-4 h-4 text-amber-600" />
            <span>Order History</span>
          </button>
          <button
            onClick={() => setIsCouponModalOpen(true)}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Discount Coupons
          </button>
          <button
            onClick={() => setIsComparisonModalOpen(true)}
            className="hover:text-amber-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>vs Swiggy &amp; Zomato</span>
          </button>
          {activeOrder && (
            <button
              onClick={() => setActiveOrder(activeOrder)}
              className="text-amber-700 font-semibold hover:text-amber-800 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping inline-block mr-1"></span>
              <span>Live Order</span>
            </button>
          )}
        </nav>

        {/* Zone 3: Primary Actions (Share, Wallet & Cart) */}
        <div className="flex items-center gap-2.5 shrink-0">
          {/* Share App Button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            aria-label="Share CraveLoop website"
            title="Share this website"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-stone-200 hover:border-amber-400 bg-white hover:bg-stone-50 transition-colors text-xs font-semibold text-stone-700 cursor-pointer"
          >
            <Share2 className="w-4 h-4 text-stone-600" />
            <span className="hidden sm:inline">Share</span>
          </button>

          {/* Wallet Balance Action Button */}
          <button
            onClick={() => setIsWalletModalOpen(true, 'balance')}
            aria-label="View CraveLoop Wallet and Mobile Recharge"
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-stone-200 hover:border-amber-400 bg-stone-50 hover:bg-amber-50/50 transition-all text-xs font-semibold text-stone-800 shadow-xs cursor-pointer"
          >
            <Wallet className="w-4 h-4 text-amber-600" />
            <div className="flex flex-col text-left">
              <span className="text-[10px] text-stone-500 uppercase leading-none font-bold">Wallet</span>
              <span className="tabular-nums text-stone-900 font-bold leading-tight">₹{walletBalance}</span>
            </div>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            aria-label={`Open shopping cart with ${totalCartCount} items`}
            className="relative flex items-center justify-center p-2 rounded-lg bg-stone-900 hover:bg-stone-800 text-white transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalCartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-amber-500 text-stone-900 font-black text-xs w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {totalCartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

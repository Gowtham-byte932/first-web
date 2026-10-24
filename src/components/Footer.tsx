import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Sparkles, Smartphone, Gift, Receipt } from 'lucide-react';

export const Footer: React.FC = () => {
  const {
    setIsComparisonModalOpen,
    setIsWalletModalOpen,
    setIsCouponModalOpen,
    setIsOrderHistoryOpen,
  } = useApp();

  return (
    <footer className="bg-stone-900 text-stone-300 border-t border-stone-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-1.5 text-xl font-extrabold text-white">
              <span className="text-amber-500">Crave</span>
              <span>Loop</span>
            </div>
            <p className="text-xs text-stone-400 max-w-sm leading-relaxed">
              India’s first circular food delivery network with guaranteed ₹20 recharge vouchers on every order, zero platform fees, and genuine restaurant pricing.
            </p>
            <div className="pt-2 flex items-center gap-4 text-xs text-stone-400">
              <span className="flex items-center gap-1 text-emerald-400 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Zero Platform Markup
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 text-amber-400 font-medium">
                <Gift className="w-3.5 h-3.5" />
                ₹20 Voucher Guarantee
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Features</h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setIsWalletModalOpen(true, 'recharge')}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Smartphone className="w-3.5 h-3.5 text-amber-500" />
                  <span>Instant Mobile Recharge</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsWalletModalOpen(true, 'balance')}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  CraveLoop Wallet &amp; Passbook
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsOrderHistoryOpen(true)}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Receipt className="w-3.5 h-3.5 text-amber-500" />
                  <span>Past Orders &amp; Quick Reorder</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsCouponModalOpen(true)}
                  className="hover:text-amber-400 transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Discount Coupons (FEAST50)</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setIsComparisonModalOpen(true)}
                  className="hover:text-amber-400 transition-colors cursor-pointer"
                >
                  Why We Beat Swiggy &amp; Zomato
                </button>
              </li>
            </ul>
          </div>

          {/* Legal & Closed-Loop Policy */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px]">Wallet Policy</h4>
            <p className="text-[11px] text-stone-400 leading-normal">
              Wallet money is non-withdrawable to bank accounts. It is strictly redeemable for mobile phone recharges (Jio, Airtel, Vi, BSNL) and future meals on CraveLoop without expiration.
            </p>
            <div className="pt-2 text-[10px] text-stone-500">
              © {new Date().getFullYear()} CraveLoop Technologies Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

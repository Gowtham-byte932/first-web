import React from 'react';
import { useApp } from '../context/AppContext';
import { COUPONS } from '../data/mockData';
import { Coupon } from '../types';
import { X, Sparkles, Check, Gift } from 'lucide-react';

export const CouponModal: React.FC = () => {
  const {
    isCouponModalOpen,
    setIsCouponModalOpen,
    activeCoupon,
    applyCoupon,
    bill,
  } = useApp();

  if (!isCouponModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-lg w-full max-h-[90vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-black text-stone-900">Discount Coupons &amp; Offers</h2>
              <p className="text-[11px] text-stone-500">
                Apply a promo code and still earn your guaranteed ₹20 voucher!
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCouponModalOpen(false)}
            aria-label="Close coupons modal"
            className="w-7 h-7 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Coupon Cards List */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {COUPONS.map((coupon: Coupon) => {
            const isApplied = activeCoupon?.code === coupon.code;
            const isEligible = bill.subtotal >= coupon.minOrder;

            return (
              <div
                key={coupon.code}
                className={`p-4 rounded-2xl border transition-all ${
                  isApplied
                    ? 'border-amber-500 bg-amber-50/50 shadow-xs'
                    : 'border-stone-200 bg-white hover:border-stone-300'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-black text-stone-900 tracking-wider text-sm bg-stone-100 px-2 py-0.5 rounded border border-stone-200 font-mono">
                        {coupon.code}
                      </span>
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">
                        {coupon.tag}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-stone-800 mt-2">
                      {coupon.title}
                    </h3>
                    <p className="text-[11px] text-stone-500 mt-0.5 leading-normal">
                      {coupon.description}
                    </p>

                    <div className="mt-2 text-[10px] font-medium text-stone-400">
                      Minimum order: ₹{coupon.minOrder}
                    </div>
                  </div>

                  {/* Apply Button */}
                  <div className="shrink-0">
                    {isApplied ? (
                      <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg">
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </span>
                    ) : (
                      <button
                        onClick={() => applyCoupon(coupon)}
                        className="px-4 py-1.5 rounded-lg bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors cursor-pointer"
                      >
                        Apply Code
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Note */}
        <div className="p-3.5 bg-stone-50 border-t border-stone-200 text-center text-[11px] text-stone-500 flex items-center justify-center gap-1.5">
          <Gift className="w-3.5 h-3.5 text-amber-600" />
          <span>Every order on CraveLoop always gives you ₹20 voucher cash into your wallet!</span>
        </div>
      </div>
    </div>
  );
};

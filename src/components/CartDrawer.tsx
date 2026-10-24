import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  Plus,
  Minus,
  Sparkles,
  Gift,
  CheckCircle2,
  MapPin,
  Smartphone,
  Info,
  ShieldCheck,
} from 'lucide-react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    updateQuantity,
    removeFromCart,
    clearCart,
    activeCoupon,
    removeCoupon,
    setIsCouponModalOpen,
    walletBalance,
    isWalletApplied,
    toggleWalletApplied,
    bill,
    placeOrder,
  } = useApp();

  const [address, setAddress] = useState('Flat 402, Green Glen Layout, Bellandur, Bangalore - 560103');
  const [isEditingAddress, setIsEditingAddress] = useState(false);

  if (!isCartOpen) return null;

  const handlePlaceOrder = () => {
    placeOrder(address);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/60 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg h-full flex flex-col shadow-2xl relative">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-stone-200 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-black text-stone-900 tracking-tight">Your Order Cart</h2>
            <span className="text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
              +₹20 Voucher
            </span>
          </div>

          <div className="flex items-center gap-2">
            {cart.length > 0 && (
              <button
                onClick={clearCart}
                className="text-xs font-semibold text-stone-400 hover:text-red-600 transition-colors mr-2 cursor-pointer"
              >
                Clear Cart
              </button>
            )}
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart drawer"
              className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {cart.length === 0 ? (
          /* Empty Cart State */
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-600 flex items-center justify-center mb-4">
              <Gift className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-stone-900">Your cart is empty</h3>
            <p className="text-xs text-stone-500 mt-1 max-w-xs">
              Add meals from top restaurants to earn a guaranteed ₹20 recharge voucher on every single order!
            </p>
            <button
              onClick={() => setIsCartOpen(false)}
              className="mt-6 px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
            >
              Explore Restaurants
            </button>
          </div>
        ) : (
          /* Cart Content */
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-5">
            {/* Delivery Address Box */}
            <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 text-xs">
              <div className="flex items-center justify-between mb-1.5">
                <span className="font-bold text-stone-800 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-600" />
                  <span>Delivering to Home</span>
                </span>
                <button
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className="text-amber-700 font-semibold hover:underline cursor-pointer"
                >
                  {isEditingAddress ? 'Done' : 'Change'}
                </button>
              </div>

              {isEditingAddress ? (
                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={2}
                  className="w-full mt-1 p-2 bg-white border border-stone-300 rounded-lg text-xs text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              ) : (
                <p className="text-stone-600 leading-relaxed truncate">{address}</p>
              )}
            </div>

            {/* Cart Items List */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400">Items Ordered</h3>
              {cart.map((ci) => (
                <div
                  key={ci.item.id}
                  className="flex items-center justify-between gap-3 p-3 rounded-xl border border-stone-200 bg-white"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`w-3 h-3 rounded-xs border flex items-center justify-center shrink-0 ${
                          ci.item.isVeg ? 'border-emerald-600' : 'border-red-700'
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            ci.item.isVeg ? 'bg-emerald-600' : 'bg-red-700'
                          }`}
                        />
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 truncate">
                        {ci.item.name}
                      </h4>
                    </div>
                    <div className="text-xs text-stone-500 font-semibold mt-0.5 tabular-nums">
                      ₹{ci.item.price} each
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-stone-200 rounded-lg bg-stone-50 overflow-hidden shrink-0">
                    <button
                      onClick={() => updateQuantity(ci.item.id, -1)}
                      className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="px-2.5 py-1 text-xs font-bold text-stone-900 tabular-nums">
                      {ci.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(ci.item.id, 1)}
                      className="px-2 py-1 text-stone-600 hover:bg-stone-200 transition-colors cursor-pointer"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Line Total */}
                  <div className="text-right shrink-0 w-16">
                    <span className="text-sm font-extrabold text-stone-900 tabular-nums">
                      ₹{ci.item.price * ci.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Coupons Card */}
            <div className="p-3.5 rounded-xl border border-dashed border-amber-300 bg-amber-50/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-600 shrink-0" />
                  {activeCoupon ? (
                    <div>
                      <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                        <span>{activeCoupon.code}</span>
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-1.5 rounded">
                          Applied
                        </span>
                      </div>
                      <div className="text-[11px] text-stone-500">{activeCoupon.description}</div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-xs font-bold text-stone-900">Apply Discount Coupon</div>
                      <div className="text-[11px] text-stone-500">Save up to ₹100 extra</div>
                    </div>
                  )}
                </div>

                {activeCoupon ? (
                  <button
                    onClick={removeCoupon}
                    className="text-xs font-bold text-red-600 hover:underline cursor-pointer"
                  >
                    Remove
                  </button>
                ) : (
                  <button
                    onClick={() => setIsCouponModalOpen(true)}
                    className="text-xs font-bold text-amber-700 hover:underline cursor-pointer"
                  >
                    View Coupons
                  </button>
                )}
              </div>
            </div>

            {/* CraveLoop Wallet Deduction Section */}
            <div className="p-3.5 rounded-xl border border-stone-200 bg-stone-50">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    ₹
                  </div>
                  <div>
                    <div className="text-xs font-bold text-stone-900 flex items-center gap-1.5">
                      <span>CraveLoop Wallet Balance: </span>
                      <span className="tabular-nums font-black text-amber-700">₹{walletBalance}</span>
                    </div>
                    <p className="text-[11px] text-stone-500 mt-0.5">
                      {walletBalance > 0
                        ? `Use your earned voucher credits to pay for this meal`
                        : `No wallet balance yet. Earn ₹20 on this order!`}
                    </p>
                  </div>
                </div>

                {walletBalance > 0 && (
                  <label className="relative inline-flex items-center cursor-pointer shrink-0 mt-1">
                    <input
                      type="checkbox"
                      checked={isWalletApplied}
                      onChange={toggleWalletApplied}
                      className="sr-only peer"
                    />
                    <div className="w-9 h-5 bg-stone-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-stone-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
                  </label>
                )}
              </div>

              {isWalletApplied && bill.walletAmountToDeduct > 0 && (
                <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Wallet deduction applied:</span>
                  <span className="tabular-nums">- ₹{bill.walletAmountToDeduct}</span>
                </div>
              )}
            </div>

            {/* Guaranteed Voucher Earned Banner */}
            <div className="p-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-md">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                  <Gift className="w-4 h-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-black tracking-wide uppercase">
                    Guaranteed ₹20 Voucher
                  </div>
                  <div className="text-[11px] text-amber-100 mt-0.5 leading-snug">
                    Will be added to your wallet immediately! Redeemable for Mobile Recharge or your next order.
                  </div>
                </div>
              </div>
            </div>

            {/* Bill Summary Breakdown */}
            <div className="space-y-2.5 pt-3 border-t border-stone-200 text-xs">
              <h3 className="font-bold uppercase tracking-wider text-stone-400">Bill Breakdown</h3>

              <div className="flex justify-between text-stone-600">
                <span>Item Total</span>
                <span className="tabular-nums font-semibold text-stone-800">₹{bill.subtotal}</span>
              </div>

              {bill.couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Coupon Discount ({activeCoupon?.code})</span>
                  <span className="tabular-nums">- ₹{bill.couponDiscount}</span>
                </div>
              )}

              <div className="flex justify-between text-stone-600">
                <div className="flex items-center gap-1">
                  <span>Delivery Partner Fee</span>
                  {bill.subtotal >= 349 && (
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1 rounded">
                      FREE over ₹349
                    </span>
                  )}
                </div>
                <span className="tabular-nums font-semibold text-stone-800">
                  {bill.deliveryFee === 0 ? 'FREE' : `₹${bill.deliveryFee}`}
                </span>
              </div>

              {/* Zero Platform Fee Promise */}
              <div className="flex justify-between items-center text-stone-600">
                <div className="flex items-center gap-1">
                  <span>Platform Fee</span>
                  <span className="text-[10px] text-stone-400 line-through">₹8 (Swiggy/Zomato)</span>
                </div>
                <span className="font-extrabold text-emerald-600">₹0 FREE</span>
              </div>

              {bill.walletAmountToDeduct > 0 && (
                <div className="flex justify-between text-amber-700 font-bold">
                  <span>Paid from CraveLoop Wallet</span>
                  <span className="tabular-nums">- ₹{bill.walletAmountToDeduct}</span>
                </div>
              )}

              {/* Total Payable */}
              <div className="pt-2.5 border-t border-stone-200 flex justify-between items-baseline">
                <div>
                  <div className="text-sm font-black text-stone-900">To Pay</div>
                  <div className="text-[10px] text-stone-400">Inclusive of all taxes</div>
                </div>
                <div className="text-lg font-black text-stone-900 tabular-nums">
                  ₹{bill.finalPayable}
                </div>
              </div>

              {/* Competitor Savings Note */}
              {bill.savingsVsSwiggyZomato > 0 && (
                <div className="text-center text-[11px] font-semibold text-emerald-700 bg-emerald-50 rounded-lg py-1.5 px-2">
                  You save ₹{bill.savingsVsSwiggyZomato} compared to Swiggy/Zomato on this order!
                </div>
              )}
            </div>
          </div>
        )}

        {/* Drawer Footer Action Button */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-stone-200 bg-white shrink-0">
            <button
              onClick={handlePlaceOrder}
              className="w-full py-3.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-extrabold text-sm tracking-wide shadow-lg transition-all flex items-center justify-between px-5 cursor-pointer"
            >
              <div className="flex flex-col text-left">
                <span className="text-[10px] text-stone-300 font-semibold uppercase">Pay Total</span>
                <span className="text-base font-black tabular-nums">₹{bill.finalPayable}</span>
              </div>

              <div className="flex items-center gap-2">
                <span>Place Order &amp; Claim ₹20</span>
                <CheckCircle2 className="w-5 h-5 text-amber-400" />
              </div>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

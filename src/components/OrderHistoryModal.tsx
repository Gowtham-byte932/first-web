import React from 'react';
import { useApp } from '../context/AppContext';
import { Order } from '../types';
import {
  X,
  RotateCcw,
  Clock,
  MapPin,
  CheckCircle2,
  Bike,
  ChefHat,
  Gift,
  ShoppingBag,
  ArrowRight,
  Receipt,
} from 'lucide-react';

export const OrderHistoryModal: React.FC = () => {
  const {
    orders,
    isOrderHistoryOpen,
    setIsOrderHistoryOpen,
    reorder,
    setActiveOrder,
    setIsCartOpen,
  } = useApp();

  if (!isOrderHistoryOpen) return null;

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Delivered</span>
          </span>
        );
      case 'out_for_delivery':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded animate-pulse">
            <Bike className="w-3.5 h-3.5" />
            <span>Out for Delivery</span>
          </span>
        );
      case 'preparing':
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-700 bg-blue-50 border border-blue-200/80 px-2 py-0.5 rounded">
            <ChefHat className="w-3.5 h-3.5" />
            <span>In Kitchen</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-stone-700 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded">
            <Clock className="w-3.5 h-3.5" />
            <span>Confirmed</span>
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-2xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl my-auto">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-stone-200 bg-stone-50 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center shadow-xs">
              <Receipt className="w-5 h-5 text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg font-black text-stone-900 tracking-tight">Order History</h2>
              <p className="text-xs text-stone-500">
                View previous orders and reorder your favorites in 1 click
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            aria-label="Close order history"
            className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-4 flex-1">
          {orders.length === 0 ? (
            /* Empty State */
            <div className="text-center py-12 space-y-3">
              <div className="w-14 h-14 rounded-full bg-stone-100 text-stone-400 flex items-center justify-center mx-auto">
                <ShoppingBag className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-stone-900">No past orders yet</h3>
              <p className="text-xs text-stone-500 max-w-xs mx-auto">
                Place your first food order today to get guaranteed ₹20 recharge voucher cash!
              </p>
              <button
                onClick={() => {
                  setIsOrderHistoryOpen(false);
                  window.location.hash = '#restaurants';
                }}
                className="mt-2 px-5 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold transition-colors cursor-pointer"
              >
                Browse Restaurants
              </button>
            </div>
          ) : (
            orders.map((order) => {
              const totalItemsCount = order.items.reduce((sum, item) => sum + item.quantity, 0);

              return (
                <div
                  key={order.id}
                  className="p-4 sm:p-5 rounded-2xl border border-stone-200 bg-white hover:border-stone-300 transition-all space-y-4 shadow-xs"
                >
                  {/* Order Top Bar: Restaurant, ID & Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                    <div className="flex items-center gap-3">
                      {order.restaurantImage && (
                        <img
                          src={order.restaurantImage}
                          alt={order.restaurantName}
                          className="w-12 h-12 rounded-xl object-cover border border-stone-200 shrink-0"
                          referrerPolicy="no-referrer"
                        />
                      )}
                      <div>
                        <h3 className="text-sm font-extrabold text-stone-900">
                          {order.restaurantName}
                        </h3>
                        <div className="flex items-center gap-2 text-[11px] text-stone-500 mt-0.5">
                          <span className="font-mono font-semibold">#{order.id}</span>
                          <span>·</span>
                          <span>{order.date}</span>
                        </div>
                      </div>
                    </div>

                    <div className="self-start sm:self-center">
                      {getStatusBadge(order.status)}
                    </div>
                  </div>

                  {/* Items list */}
                  <div className="space-y-1.5 text-xs">
                    {order.items.map((ci) => (
                      <div key={ci.item.id} className="flex justify-between items-center text-stone-700">
                        <div className="flex items-center gap-2">
                          <span
                            className={`w-2.5 h-2.5 rounded-xs border flex items-center justify-center shrink-0 ${
                              ci.item.isVeg ? 'border-emerald-600' : 'border-red-700'
                            }`}
                          >
                            <span
                              className={`w-1 h-1 rounded-full ${
                                ci.item.isVeg ? 'bg-emerald-600' : 'bg-red-700'
                              }`}
                            />
                          </span>
                          <span className="font-medium">
                            <strong className="text-stone-900 font-bold">{ci.quantity}x</strong> {ci.item.name}
                          </span>
                        </div>
                        <span className="tabular-nums font-semibold text-stone-800">
                          ₹{ci.item.price * ci.quantity}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Pricing & Voucher Highlight */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-stone-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-stone-500">
                        Total Paid: <strong className="text-stone-900 font-black tabular-nums">₹{order.totalPaid}</strong>
                      </span>
                      {order.walletRedeemed > 0 && (
                        <span className="text-[11px] text-stone-400">
                          (₹{order.walletRedeemed} from wallet)
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded">
                      <Gift className="w-3.5 h-3.5 text-amber-600" />
                      <span>+₹{order.cashbackEarned || 20} Voucher Credited</span>
                    </div>
                  </div>

                  {/* Action Buttons: Reorder & Track */}
                  <div className="flex items-center justify-end gap-2.5 pt-2">
                    <button
                      onClick={() => {
                        setIsOrderHistoryOpen(false);
                        setActiveOrder(order);
                      }}
                      className="px-3.5 py-2 rounded-xl border border-stone-200 hover:border-stone-300 text-stone-700 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      View Details
                    </button>

                    <button
                      onClick={() => reorder(order)}
                      className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs tracking-wide shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
                      title="Load items to cart for quick checkout"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reorder ({totalItemsCount} items)</span>
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between text-xs text-stone-500">
          <span>Every reorder earns another ₹20 recharge voucher!</span>
          <button
            onClick={() => setIsOrderHistoryOpen(false)}
            className="px-4 py-1.5 rounded-lg bg-stone-900 text-white font-bold text-xs cursor-pointer hover:bg-stone-800 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

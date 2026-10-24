import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  X,
  CheckCircle2,
  Clock,
  MapPin,
  Phone,
  Gift,
  ArrowRight,
  Sparkles,
  Bike,
  ChefHat,
} from 'lucide-react';

export const OrderTrackingModal: React.FC = () => {
  const { activeOrder, setActiveOrder, setIsWalletModalOpen } = useApp();

  const [currentStage, setCurrentStage] = useState<number>(1);

  // Simulate progressive delivery stages for live feel
  useEffect(() => {
    if (!activeOrder) return;
    setCurrentStage(1);

    const t1 = setTimeout(() => setCurrentStage(2), 5000); // Chef Preparing
    const t2 = setTimeout(() => setCurrentStage(3), 12000); // Out for delivery

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [activeOrder]);

  if (!activeOrder) return null;

  const stages = [
    { title: 'Order Confirmed', time: 'Just now', icon: CheckCircle2 },
    { title: 'Chef Preparing Dish', time: 'In Kitchen', icon: ChefHat },
    { title: 'Rider on the Way', time: '18 mins away', icon: Bike },
    { title: 'Delivered', time: 'Expected ~25 mins', icon: CheckCircle2 },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl border border-stone-200 max-w-xl w-full max-h-[92vh] flex flex-col overflow-hidden shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-stone-200 bg-stone-900 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-amber-400">
                Order #{activeOrder.id}
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
                LIVE STATUS
              </span>
            </div>
            <h2 className="text-base font-extrabold mt-0.5">{activeOrder.restaurantName}</h2>
          </div>

          <button
            onClick={() => setActiveOrder(null)}
            aria-label="Close order tracker"
            className="w-8 h-8 rounded-full bg-stone-800 hover:bg-stone-700 text-stone-200 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Guaranteed ₹20 Cashback Celebration Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center font-black text-white shrink-0">
                  <Gift className="w-6 h-6" />
                </div>
                <div>
                  <div className="text-sm font-black flex items-center gap-1.5">
                    <span>+₹20 Added to Your Crave Wallet!</span>
                    <Sparkles className="w-4 h-4 text-amber-200" />
                  </div>
                  <p className="text-xs text-amber-100 mt-0.5">
                    Earned automatically with this order. Ready to use for Mobile Recharge or your next meal.
                  </p>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                setActiveOrder(null);
                setIsWalletModalOpen(true, 'recharge');
              }}
              className="mt-3 w-full py-2 rounded-xl bg-stone-950/80 hover:bg-stone-950 text-white text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>Recharge Mobile Phone Now With This ₹20</span>
              <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
            </button>
          </div>

          {/* Animated Delivery Stages Pipeline */}
          <div className="p-4 rounded-2xl border border-stone-200 bg-stone-50 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                Live Delivery Pipeline
              </h3>
              <span className="text-xs font-bold text-amber-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>ETA: {activeOrder.estimatedDeliveryTime}</span>
              </span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-stone-200">
              {stages.map((stage, idx) => {
                const isPassed = currentStage >= idx;
                const isCurrent = currentStage === idx;
                const IconComponent = stage.icon;

                return (
                  <div key={idx} className="relative flex items-center justify-between text-xs">
                    <div
                      className={`absolute -left-6 w-5 h-5 rounded-full flex items-center justify-center border-2 transition-all ${
                        isPassed
                          ? 'bg-amber-500 border-white text-white shadow-xs'
                          : 'bg-white border-stone-300 text-stone-300'
                      }`}
                    >
                      <IconComponent className="w-3 h-3" />
                    </div>

                    <div className="pl-3">
                      <div
                        className={`font-bold ${
                          isCurrent
                            ? 'text-amber-800'
                            : isPassed
                            ? 'text-stone-900'
                            : 'text-stone-400'
                        }`}
                      >
                        {stage.title}
                      </div>
                      <div className="text-[11px] text-stone-500">{stage.time}</div>
                    </div>

                    {isCurrent && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full animate-pulse">
                        In Progress
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Delivery Partner Details */}
          <div className="p-4 rounded-2xl border border-stone-200 bg-white flex items-center justify-between text-xs">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-100 flex items-center justify-center font-bold text-stone-800">
                <Bike className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="font-bold text-stone-900">{activeOrder.deliveryPerson.name}</div>
                <div className="text-stone-500 text-[11px]">
                  CraveLoop Express Partner · Rating: {activeOrder.deliveryPerson.rating} ★
                </div>
              </div>
            </div>

            <a
              href={`tel:${activeOrder.deliveryPerson.phone}`}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors cursor-pointer"
              title="Call Delivery Partner"
            >
              <Phone className="w-4 h-4 text-emerald-600" />
            </a>
          </div>

          {/* Order Summary Recap */}
          <div className="space-y-2 text-xs border-t border-stone-200 pt-4">
            <h4 className="font-bold text-stone-700">Order Items ({activeOrder.items.length})</h4>
            {activeOrder.items.map((ci) => (
              <div key={ci.item.id} className="flex justify-between text-stone-600">
                <span>{ci.quantity}x {ci.item.name}</span>
                <span className="tabular-nums font-semibold">₹{ci.item.price * ci.quantity}</span>
              </div>
            ))}

            <div className="pt-2 border-t border-stone-100 flex justify-between font-bold text-stone-900">
              <span>Total Amount Paid</span>
              <span className="tabular-nums">₹{activeOrder.totalPaid}</span>
            </div>

            <div className="text-[11px] text-stone-500 flex items-start gap-1 pt-1">
              <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
              <span>{activeOrder.deliveryAddress}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 border-t border-stone-200 flex justify-end">
          <button
            onClick={() => setActiveOrder(null)}
            className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            Close &amp; Keep Browsing
          </button>
        </div>
      </div>
    </div>
  );
};

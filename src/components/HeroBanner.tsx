import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Smartphone, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

export const HeroBanner: React.FC = () => {
  const { setIsWalletModalOpen, setIsComparisonModalOpen } = useApp();

  return (
    <section className="relative overflow-hidden bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Value Proposition & CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Value kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold text-amber-800 bg-amber-50 border border-amber-200/80 rounded-md px-3 py-1 w-fit mb-4">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>The Food Delivery Loop That Overcomes Swiggy &amp; Zomato</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-[1.15] text-balance">
              Earn a <span className="text-amber-600 underline decoration-amber-300 decoration-wavy decoration-2">₹20 Voucher</span> on every meal. Recharge your phone or feast again.
            </h1>

            <p className="mt-4 text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              Unlike other apps that charge sneaky ₹8 platform fees and give zero cashback, CraveLoop gives you a guaranteed ₹20 voucher on every single order. Use it directly for your Jio/Airtel/Vi mobile recharge or save it for your next order.
            </p>

            {/* Main Action CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#restaurants"
                className="px-6 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm tracking-wide shadow-md shadow-amber-600/20 transition-all flex items-center gap-2 cursor-pointer"
              >
                <span>Order Food &amp; Get ₹20 Voucher</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={() => setIsWalletModalOpen(true, 'recharge')}
                className="px-5 py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-900 font-bold text-sm tracking-wide border border-stone-200 transition-all flex items-center gap-2 cursor-pointer"
              >
                <Smartphone className="w-4 h-4 text-amber-600" />
                <span>Recharge Mobile From Wallet</span>
              </button>

              <button
                onClick={() => setIsComparisonModalOpen(true)}
                className="px-4 py-3 rounded-xl text-stone-600 hover:text-stone-900 font-semibold text-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Why We Beat Competitors</span>
              </button>
            </div>

            {/* Honest Loop Rule Note */}
            <div className="mt-6 flex items-center gap-2 text-xs text-stone-500 bg-stone-50 border border-stone-200 rounded-lg p-2.5 max-w-lg">
              <Zap className="w-4 h-4 text-amber-500 shrink-0" />
              <span>
                <strong>Closed Lifestyle Loop:</strong> Wallet balance cannot be withdrawn to bank accounts. It is strictly spendable on your next meal or live mobile recharges.
              </span>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-stone-200 shadow-xl bg-stone-100 aspect-4/3 sm:aspect-16/10 lg:aspect-4/3">
              <img
                src="/src/assets/images/hero_culinary_spread_1792848783908.jpg"
                alt="Gourmet dining spread on CraveLoop"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-900/20 to-transparent" />
              
              {/* Floating Highlight Badge */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-stone-200/80 shadow-lg flex items-center justify-between">
                <div>
                  <div className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Zero Rip-Off Policy</div>
                  <div className="text-sm font-bold text-stone-900">Zero Platform Fee + ₹20 Wallet Bonus</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-stone-400 line-through">₹8 Fee</div>
                  <div className="text-sm font-extrabold text-emerald-600">₹0 Fee</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillar Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-12 pt-8 border-t border-stone-100">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0">
              ₹20
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Guaranteed Order Voucher</h3>
              <p className="text-xs text-stone-600 mt-1 leading-normal">
                Every single order adds ₹20 cashback voucher directly into your Crave Wallet, with no arbitrary minimum order trap.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold shrink-0">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Direct Mobile Recharge</h3>
              <p className="text-xs text-stone-600 mt-1 leading-normal">
                Use your wallet cash to recharge Jio, Airtel, Vi, and BSNL numbers with instant telecom API confirmation.
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200 flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-stone-900">Zero Platform Markup</h3>
              <p className="text-xs text-stone-600 mt-1 leading-normal">
                We never levy the ₹6-₹10 platform surcharge or rainy weather price gouging found on dominant delivery apps.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
